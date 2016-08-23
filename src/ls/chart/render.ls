plotdb-domain = "#{window.plConfig.urlschema}#{window.plConfig.domain}"
brand-new = true

# bubbling up click outside renderer. for ColorPicker
window.addEventListener \click, ->
  window.parent.postMessage {type: \click, payload: ""}, plotdb-domain

window.thread = do
  count: 0
  inc: (t) -> if t => @count = (@count or 0) + 1
  dec: (t) -> if t => @count = (@count or 1) - 1
  racing: -> @count > 1

<- $ document .ready

dispatcher = (evt) ->
  if (evt.data.type in <[snapshot getsvg getpng]>) => snapshot evt.data.type
  else if evt.data.type == \render => render evt.data.payload, evt.data.rebind
  else if evt.data.type == \get-sample-data =>
    window.parent.postMessage {type: \get-sample-data, data: (window.sample-data or null)}, plotdb-domain
  else if evt.data.type == \parse-chart => parse evt.data.payload, \chart
  else if evt.data.type == \parse-theme => parse evt.data.payload, \theme
  else if evt.data.type == \reload =>
    if !brand-new => window.location.reload!
    else window.parent.postMessage {type: \loaded}, plotdb-domain
  else if evt.data.type == \colorblind-emu => colorblind evt.data.payload

window.addEventListener \error, (e) ->
  re-bloburl = /blobhttp:%3A\/\/[^:]+:/
  stack = e.error.stack
  if re-bloburl.exec(stack) =>
    stack = stack.split re-bloburl .join "line "
    msg = "#{e.message} at line #{e.lineno - 1}."
    if e.message.indexOf(stack) < 0 => msg += " Callstack: \n#stack"
  else msg = "#{e.message} at line #{e.lineno - 1}."
  error-handling msg, e.lineno - 1

loadscript = (lib, url) -> new Promise (res,rej) ->
  node = document.createElement \script
    ..type = \text/javascript
    ..src = url
    ..onload = -> res lib
  document.head.appendChild node

loadlib = (payload) ->
  head = document.getElementsByTagName("head")[0]
  module-backup = window.module
  #TODO all chart.json shall not use module.exports pattern in the future!
  delete window.module
  if !([k for k of (payload.library or {})].length) =>
    payload.library['legacy/0.0.1'] = "#{plotdb-domain}/js/pack/legacy.js"
  promise = Promise.each [{lib,url} for lib,url of payload.library], (d) -> loadscript(d.lib, d.url)
    .then -> window.module = module-backup
  return promise

proper-eval = (code, updateModule = true) -> new Promise (res, rej) ->
  empty="{exports:{init:function(){},update:function(){},resize:function(){},bind:function(){},render:function(){}}}"
  window.error-message = ""
  module = if updateModule => \module else \moduleLocal
  code := "(function() { #code; window.#module = (typeof(module)=='undefined'?#empty:module); })()"
  window.codeURL = codeURL = URL.createObjectURL new Blob [code], {type: "text/javascript"}
  codeNode = document.createElement("script")
  codeNode.onload = ->
    URL.revokeObjectURL codeURL
    if window[module] => window[module].identity = parseInt(Math.random!*1000)
    #TODO: potential race condition?
    res window[module]
    try
      document.body.removeChild codeNode
    catch e
  codeNode.src = codeURL
  document.body.appendChild codeNode

error-handling = (e, lineno = 0) ->
  if !e => msg = "plot failed with unknown error"
  else if typeof(e) != typeof({}) => msg = "#e"
  else if !e.stack => msg = e.toString!
  else msg = e.stack

  re-bloburl = /blob:http%3A\/\/[^:]+:/
  if re-bloburl.exec(msg) => msg = msg.split re-bloburl .join "line "
  if !lineno =>
    ret = /line (\d+):\d+/.exec(msg)
    lineno = if ret => parseInt(ret.1) else 0

  if msg.length > 1024 => msg = msg.substring(0,1024) + "..."
  lines = msg.split(\\n)
  if lines.length > 4 => msg = lines.splice(0,4).join(\\n)
  window.parent.postMessage {type: \error, payload: {msg, lineno}}, plotdb-domain

colorblind = (payload) ->
  val = <[normal protanopia protanomaly deuteranopia deuteranomaly tritanopia
  tritanomaly achromatopsia achromatomaly]>
  if !(payload in val) => payload = \normal
  d3.select(\body).style do
    "-webkit-filter": "url('\##payload')"
    "filter": "url('\##payload')"

config-preset = (config) ->
  for k,v of (config or {}) =>
    p = if plotdb.config[k] => k else if plotdb.config[v.extend] => v.extend else null
    if !p => continue
    for field,value of plotdb.config[p] =>
      if !(v[field]?) => v[field] = value

parse = (payload, type) ->
  loadlib payload .then ->
    try
      code = payload.code
      if type == \chart =>
        (module) <- proper-eval code, false .then
        chart = module.exports
        config-preset chart.config
        payload = JSON.stringify({} <<< chart{dimension, config})
        window.parent.postMessage {type: \parse-chart, payload}, plotdb-domain
      else if type == \theme =>
        (module) <- proper-eval code, false .then
        theme = module.exports
        payload = JSON.stringify({} <<< theme{typedef, config})
        window.parent.postMessage {type: \parse-theme, payload}, plotdb-domain
    catch e
      error-handling e

snapshot = (type='snapshot') ->
  try
    d3.selectAll('#container svg').each ->
      {width, height} = @getBoundingClientRect!
      d3.select(@).attr do
        "xmlns": "http://www.w3.org/2000/svg"
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
        "width": width
        "height": height
    #save the first svg #TODO save all?
    svgnode = document.querySelector '#container svg'
    styles = svgnode.querySelectorAll("style")
    for idx from 0 til styles.length
      style = styles[idx]
      if !style.generated => continue
      svgnode.removeChild(style)
    # this insert styles into svg everytime.
    # yet cloneNode(true) on svgnode will fail the png generation
    styles = document.querySelectorAll('html style')
    for idx from styles.length - 1 to 0 by -1
      style = styles[idx].cloneNode(true)
      style.generated = true
      svgnode.insertBefore style, svgnode.childNodes.0
    {width, height} = svgnode.getBoundingClientRect!
    svg = svgnode.outerHTML
    if type == \getsvg =>
      return window.parent.postMessage {type: \getsvg, payload: svg}, plotdb-domain
    img = new Image!
    img.onload = ->
      #newHeight = (if height > width => width else height ) #TODO crop image in server / service
      canvas = document.createElement("canvas") <<< {width, height}
      canvas.getContext \2d .drawImage img, 0, 0, width, height, 0, 0, width, height
      window.parent.postMessage {type, payload: canvas.toDataURL!}, plotdb-domain
    # btoa doesn't work for utf-8 string
    encoded = base64.encode(utf8.encode(svg))
    img.src = "data:image/svg+xml;charset=utf-8;base64," + encoded
  catch e
    console.log e
    window.parent.postMessage {type, payload: null}, plotdb-domain


render = (payload, rebind = true) ->
  [code,style,doc] = <[code style doc]>.map(->payload.{}chart[it].content)
  [data,assets] = <[data assets]>.map(->payload.chart[it])
  dimension = payload.chart.dimension or {}
  config = payload.chart.config or {}
  theme = payload.theme or {}
  reboot = !window.module or !window.module.inited or window.module.exec-error
  if reboot => sched.clear!
  # sometimes multiple thread enter this function
  # they stop at proper-eval which overwrite module again and again
  # this leads to the reinit of chart, then duplicate charts.
  # use thread.racing to prevent this situaiton.
  thread.inc reboot
  try
    if false and "script tag disallow" =>
      ret = /<\s*script[^>]*>.*<\s*\/\s*script\s*>/g.exec(doc.toLowerCase!)
      if ret => throw new Error("script tag is not allowed in document.")
    if reboot =>
      node = document.getElementById("wrapper")
      if !node =>
        node = document.createElement("div")
        node.setAttribute("id", "wrapper")
        node.setAttribute("class", "pdb-root")
        document.body.appendChild(node)
      $(node).html([
        "<style type='text/css'>/* <![CDATA[ */#style/* ]]> */</style>"
        "<style type='text/css'>/* <![CDATA[ */#{theme.style.content}/* ]]> */</style>" if theme.{}style.content
        "<div id='container' style='position:relative;width:100%;height:100%;'>"
        # the first space in container is crucial for elliminating margin collapsing
        "<div style='height:0'>&nbsp;</div>"
        doc
        theme.doc.content if theme.{}doc.content
        "</div>"
      ].join(""))
      promise = loadlib payload .then -> proper-eval code

    else promise = Promise.resolve window.module
    promise.then (module) ->
      if thread.racing! => return thread.dec reboot
      #window.module = module
      root = document.getElementById \container
      chart = module.exports
      if chart.sample =>
        window.sample-data = plotdb.chart.get-sample-data chart, dimension
        if (!data or !data.length) => data := window.sample-data
      config-preset config
      for k,v of (config or {}) =>
        for type in (v.type or [])=>
          try
            type = plotdb[type.name]
            if type.test and type.parse and type.test(v.value) =>
              v.value = type.parse v.value
              break
          catch e
            console.log "chart config: type parsing exception ( #k / #type )"
            console.log "#{e.stack}"
            thread.dec reboot
            return error-handling "Exception parsing chart config '#k'"
      for k,v of chart.config =>
        if !(config[k]?) or !(config[k].value?)=> config[k] = (v or config[k] or {}).default or 0
        else config[k] = config[k].value
      chart.assets = assetsmap = {}
      for file in assets =>
        raw = atob(file.content)
        array = new Uint8Array(raw.length)
        for idx from 0 til raw.length => array[idx] = raw.charCodeAt idx
        file.blob = new Blob([array],{type: file.type})
        file.url = URL.createObjectURL(file.blob)
        file.datauri = [ "data:", file.type, ";charset=utf-8;base64,", file.content ].join("")
        assetsmap[file.name] = file
      chart <<< {config}
      if rebind or reboot or !(chart.root and chart.data) => chart <<< {root, data, dimension}
      promise = Promise.resolve!
      if reboot => promise = promise.then ->
        if thread.racing! => return
        ret = if !module.inited =>
          if chart.init => chart.init!
          if chart.parse => chart.parse!
        else null
        module.inited = true
        ret
      <~ promise.then
      if thread.racing! => return thread.dec reboot
      chart.resize!
      if rebind or reboot => chart.bind!
      chart.render!
      module.exec-error = false
      window.parent.postMessage {type: \error, payload: window.error-message or ""}, plotdb-domain
    .catch (e) ->
      module.exec-error = true
      thread.dec reboot
      return error-handling e
  catch e
    thread.dec reboot
    error-handling e
  brand-new := false

window.addEventListener \message, dispatcher, false
resize-handler = null
window.addEventListener \resize, ->
  if resize-handler => clearTimeout resize-handler
  resize-handler := setTimeout (->
    resize-handler := null
    if !window.module or !window.module.exports => return
    chart = window.module.exports
    chart.resize!
    chart.render!
  ), 400

window.addEventListener \keydown, (e) ->
  if (e.metaKey or e.altKey) and (e.keyCode==13 or e.which==13) =>
    window.parent.postMessage {type: \alt-enter}, plotdb-domain

window.parent.postMessage {type: \loaded}, plotdb-domain

# dont enable it for now
/*
hover-box = document.createElement("div")
hover-box.setAttribute("class", "hover-box")
document.body.appendChild(hover-box)
hover-margin = document.createElement("div")
hover-margin.setAttribute("class", "hover-margin")
document.body.appendChild(hover-margin)
html = document.querySelector("html")
window.addEventListener \mousemove, (e) ->
  rect = e.target.getBoundingClientRect!
  scroll = top: (document.body.scrollTop or html.scrollTop), left: (document.body.scrollLeft or html.scrollTop)
  style = e.target.currentStyle || window.getComputedStyle(e.target);

  margin = do
    top: +style.marginTop.replace(\px,''), left: +style.marginLeft.replace(\px,'')
    bottom: +style.marginBottom.replace(\px,''), right: +style.marginRight.replace(\px,'')

  hover-box.style
    ..top    = "#{rect.top + scroll.top}px"
    ..left   = "#{rect.left + scroll.left}px"
    ..height = "#{rect.height}px"
    ..width  = "#{rect.width}px"

  hover-margin.style
    ..top    = "#{rect.top + scroll.top - margin.top}px"
    ..left   = "#{rect.left + scroll.left - margin.left}px"
    ..height = "#{rect.height + margin.top + margin.bottom}px"
    ..width  = "#{rect.width + margin.left + margin.right}px"
*/
