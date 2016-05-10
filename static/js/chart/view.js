// Generated by LiveScript 1.3.1
plotdb.view = {
  host: plConfig.urlschema + "" + plConfig.domainIO,
  loader: function(key, cb){
    var req;
    req = new XMLHttpRequest();
    req.onload = function(){
      var e;
      try {
        return cb(JSON.parse(this.responseText));
      } catch (e$) {
        e = e$;
        console.error("load chart " + key + " failed when parsing response: ");
        return console.error(e);
      }
    };
    req.open('get', this.host + "/d/chart/" + key, true);
    return req.send();
  },
  render: function(arg$, cb){
    var root, chart, theme, fields, fieldhash, k, ref$, v, resize;
    root = arg$.root, chart = arg$.chart, theme = arg$.theme, fields = arg$.fields;
    if (chart) {
      chart = import$(eval(chart.code.content), chart);
    }
    if (theme) {
      theme = import$(eval(theme.code.content), theme);
    }
    fieldhash = d3.map(fields, function(it){
      return it.key;
    });
    root.setAttribute("class", (root.getAttribute("class").split(" ").filter(function(it){
      return it !== 'pdb-root';
    }).concat(['pdb-root'])).join(" "));
    root.innerHTML = [chart && chart.style ? "<style type='text/css'>/* <![CDATA[ */" + chart.style.content + "/* ]]> */</style>" : void 8, theme && theme.style ? "<style type='text/css'>/* <![CDATA[ */" + theme.style.content + "/* ]]> */</style>" : void 8, "<div style='position:relative;width:100%;height:100%;'><div style='height:0;'>&nbsp;</div>", chart.doc.content, "</div>", theme && (theme.doc || (theme.doc = {})).content ? theme.doc.content : void 8].join("");
    for (k in ref$ = chart.dimension) {
      v = ref$[k];
      v.fields = v.fields.map(fn$).filter(fn1$);
      v.fields.forEach(fn2$);
    }
    plotdb.chart.updateData(chart);
    plotdb.chart.updateConfig(chart, chart.config);
    plotdb.chart.updateAssets(chart, chart.assets);
    if (!chart.data || !chart.data.length) {
      chart.data = plotdb.chart.getSampleData(chart);
    }
    chart.root = root.querySelector("div:first-of-type");
    chart.init();
    chart.resize();
    chart.bind();
    chart.render();
    root.setAttribute('class', (root.getAttribute('class') || "").split(' ').filter(function(it){
      return it !== 'loading';
    }).join(" ").trim());
    resize = function(){
      var this$ = this;
      if (resize.handle) {
        clearTimeout(resize.handle);
      }
      return resize.handle = setTimeout(function(){
        resize.handle = null;
        chart.resize();
        return chart.render();
      }, 500);
    };
    window.addEventListener('resize', function(){
      return resize();
    });
    if (cb) {
      return setTimeout(function(){
        return cb({
          root: root,
          chart: chart,
          theme: theme,
          fields: fields
        });
      }, 0);
    }
    function fn$(it){
      return fieldhash.get(it.key);
    }
    function fn1$(it){
      return it;
    }
    function fn2$(it){
      return it.data = it.data.map(function(it){
        return parseFloat(it);
      });
    }
  }
};
plotdb.load = function(arg$, cb){
  var root, chart;
  root = arg$.root, chart = arg$.chart;
  if (typeof chart === 'object') {
    return plotdb.view.render({
      root: root,
      chart: chart.chart,
      theme: chart.theme,
      fields: chart.fields
    }, cb);
  } else if (typeof chart === 'number') {
    return plotdb.view.loader(chart, function(r){
      return plotdb.view.render({
        root: root,
        chart: r
      }, cb);
    });
  }
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}