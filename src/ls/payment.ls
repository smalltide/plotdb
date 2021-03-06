angular.module \plotDB
  ..controller \payment,
  <[$scope $http $timeout plNotify eventBus]> ++
  ($scope, $http, $timeout, plNotify, eventBus) ->
    if !(Stripe?) => return
    Stripe.setPublishableKey \pk_test_DE53QFrgknntLkCNsVr1MqrV
    $scope.payinfo = {cvc:null,exp_month:null,exp_year:null,number:null}
    #$scope.payinfo = {cvc:'123',exp_month:'02',exp_year:'18',number:'4242424242424242'}
    $scope.error = {all: true}
    $scope.prices = [[0,20,50],[0,16,40]]
    $scope.check = (target) ->
      if $scope.check.handler => $timeout.cancel $scope.check.handler
      $scope.check.handler = $timeout (->
        if !target or target == \exp_month =>
          $scope.error.exp_month = !!!(/^0[1-9]|1[0-2]$/.exec($scope.payinfo.exp_month))
        if !target or target == \exp_year =>
          year = $scope.payinfo.exp_year
          if year.length < 4 => year = "20#year"
          $scope.error.exp_year = !!!(/^2[01][0-9]{2}$/.exec(year)) or (new Date!getYear! + 1900) > +year
        if !target or target == \cvc =>
          $scope.error.cvc = !!!(/^[0-9][0-9][0-9]$/.exec($scope.payinfo.cvc))
        if !target or target == \number =>
          $scope.error.number = (
            !!!(/^[0-9]{16}$/.exec($scope.payinfo.number)) or
            !Stripe.card.validateCardNumber($scope.payinfo.number)
          )
          $scope.cardtype = Stripe.card.cardType $scope.payinfo.number
        $scope.error.all = false
        $scope.error.all = (
          [v for k,v of $scope.error].filter(->it).length or
          [v for k,v of $scope.payinfo].filter(->!it).length
        )
      ), 500
    $scope.settings = do
      plan: 1
      period: 0

    $scope.update = ->
      eventBus.fire \loading.dimmer.on
      Stripe.card.create-token $scope.payinfo, (state, token) -> $scope.$apply ->
        if state != 200 =>
          alert "We can't verify this card, please check if the information you provided is correct."
          eventBus.fire \loading.dimmer.off
          plNotify.send \danger, "update payment info failed."
          return
        $http do
          url: \/d/payment-method
          method: \POST
          data: {token: token.id}
        .success (d) ->
          plNotify.send \success, "payment info updated"
          $timeout (-> window.location.reload!), 500
        .error (d) ->
          plNotify.send \danger, "something wrong, try again later? "
          eventBus.fire \loading.dimmer.off
    $scope.subscribe = ->
      if $scope.settings.plan and $scope.error.all => return
      eventBus.fire \loading.dimmer.on
      _subscribe = (token = {})->
        $http do
          url: \/d/subscribe
          method: \POST
          data: {settings: $scope.settings, token: token.id}
        .success (d) ->
          $scope.user.data.payment <<< d.payment
          if !d.payment.plan => plNotify.send \success, "you've switched to free plan."
          else plNotify.send \success, "you've subscribed!"
          eventBus.fire \loading.dimmer.off
        .error (d) ->
          plNotify.send \danger, "something wrong, try again later? "
          eventBus.fire \loading.dimmer.off
      if $scope.settings.plan == 0 => return _subscribe!
      Stripe.card.create-token $scope.payinfo, (state, token) -> $scope.$apply ->
        if state != 200 =>
          #TODO detail error handling
          alert "failed to make payment, please check if the information you provided is correct."
          eventBus.fire \loading.dimmer.off
          plNotify.send \danger, "payment failed."
          return
        _subscribe token

