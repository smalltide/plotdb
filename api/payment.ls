require! <[fs bluebird]>
require! <[../engine/aux ../engine/share/model/ ./thumb ./perm]>
(engine,io) <- (->module.exports = it)  _

stripe = require(\stripe) engine.config.stripe.secret

date-offset = (date, year=0, month=0, day=0, hour=0, minute=0) ->
  now = if date => new Date(date) else new Date!
  now = new Date!
  y = now.getYear! + 1900  + year
  m = now.getMonth!        + month
  d = now.getDate!         + day
  h = now.getHours!        + hour
  M = now.getMinutes!      + minute
  s = now.getSeconds! + 1
  new Date(y,m,d,h,M,s)

engine.router.api.post \/testpay, (req, res) ->
  if !req.user or !req.user.key => return aux.r403 res
  if !req.body or !req.body.id => return aux.r400 res
  if req.user.payment => return aux.r400 res
  token = req.body.token
  (err, customer) <- stripe.customers.create {
    source: token, plan: "pro plan", email: req.user.username
  }, _
  if err => return aux.r500 res
  active-until = next-month!
  payment-object = do
    stripe: customer
    active-until: active-until
  io.query "update users set (payment) = ($2) where key = $1", [req.user.key,payment-object]
    .then ->
      req.user.payment = payment-object
      req.login req.user, -> res.send!
      return null
    .catch aux.error-handler res

create-customer = (req, user, token) -> new bluebird (res, rej) ->
  if !token => return rej aux.error 400, "get customer"
  stripe.customers.create {
    source: token, email: user.username
  }, (err, customer) ->
    if err => return rej aux.error 400, "create customer"
    io.query(
      "update users set (payment) = ($2) where key = $1",
      [user.key, (user.payment or {}) <<< {stripe: {id: customer.id}}]
    )
      .then ->
        user.payment = payment-object
        req.login user, -> res customer
      .catch -> rej it
    res customer

get-customer = (req, user) -> new bluebird (res, rej) ->
  if user.{}payment.{}stripe.id =>
    stripe.customers.retrieve user.payment.stripe.id, (err, customer) ->
      if err => return rej aux.error 400, "get customer"
      res customer
      #if !customer or customer.deleted => create-customer(req, user, token).then(->res it).catch(->rej it)
      #else res customer
  else res null
  #else => create-customer(req, user, token).then(->res it).catch(->rej it)

make-subscription = (customer-id, subscription-id, plan-name) ->
  new bluebird (res, rej) ->
    if subscription-id =>
      stripe.subscriptions.update subscription-id, {plan: plan-name}, (err,subscription) ->
        if err => return rej aux.error 400, "update subscription"
        else res subscription
    else => stripe.subscriptions.create {customer: customer-id, plan: plan-name}, (err, subscription) ->
      if err => return rej aux.error 400, "create subscription"
      else res subscription

engine.router.api.post \/payment-method/, (req, res) ->
  if !req.user or !req.user.key => return aux.r403 res
  if !req.body or (!req.user.payment.stripe and (!req.body.token)) => return aux.r400 res
  token = req.body.token
  get-customer req, req.user
    .then (customer) ->
      if !customer => return create-customer(req, req.user, token)
      stripe.customers.update customer.id, {source: token}, (err, customer) ->
        if err => return aux.reject 400, "update customer"
        return customer
    .then (customer) -> res.send!
    .catch aux.error-handler res

engine.router.api.post \/subscribe/, (req, res) ->
  if !req.user or !req.user.key => return aux.r403 res
  if !req.body or !req.body.settings => return aux.r400 res
  plans = <[free basic expert]>
  period = <[monthly annually]>
  settings = req.body.settings
  plan-name = "#{plans[settings.plan]}-plan#{if settings.plan => '-'+period[settings.period] else ''}"
  if plan-name != \free and !req.user.payment.stripe and !req.body.token => return aux.r400 res
  promise = (
    if plan-name == \free and !req.user.payment.stripe and !req.body.token => bluebird.resolve!
    else
      get-customer req, req.user
        .then (customer) ->
          if !customer or customer.deleted => create-customer req, req.user, req.body.token
          else bluebird.resolve customer
        .then (customer) ->
          sub = customer.subscriptions.data.filter(->!it.deleted).0 or {}
          if sub.{}plan.id == plan-name => return aux.reject 400, "same plan"
          make-subscription customer.id, sub.id, plan-name
  )
  promise
    .then ->
      if settings.period == 1 =>      [dy, dm] = [1,0]
      else if settings.period == 0 => [dy, dm] = [0,1]
      payment = req.user.payment <<< settings{plan, period}
      payment.expiredate = date-offset (new Date!), dy, dm
      io.query(
        "update users set (payment) = ($2) where key = $1",
        [req.user.key, payment]
      )
    .then ->
      req.login req.user, -> res.send {payment: req.user.payment}
      return null
    .catch aux.error-handler res

engine.app.get \/me/billing/, (req, res) ->
  if !req.user => return aux.r403 res, "", true
  payload = {}
  get-customer req, req.user, null
    .then (customer) ->
      subscription = (customer and customer.{}subscriptions.[]data[0]) or {}
      data = (customer and customer.{}sources.[]data[0]) or {}
      ccn = (if data.last4 => "xxxx-xxxx-xxxx-#{data.last4}" else "N/A")
      payload <<< {
        ccn: ccn
        amount: (if subscription => (subscription.{}plan.amount or 0) else 0)/100
      } <<< req.user.payment{plan, period, expiredate}
      io.query "select * from paymenthistory where owner = $1", [req.user.key]
    .then (r={}) ->
      payload.history = r.[]rows
      res.render \view/me/billing.jade, payload
