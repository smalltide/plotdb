// Generated by LiveScript 1.3.1
$(document).ready(function(){
  var lastDataIdx, lastIdx, setdata, update, data, d1value, name, d1cat1, d1cat2, d2value, d2cat1, d2cat2, pal, charts;
  lastDataIdx = 0;
  lastIdx = 0;
  setdata = function(i){
    var chart;
    chart = charts[lastIdx];
    chart.data(data[i]);
    chart.parse();
    chart.bind();
    chart.resize();
    return chart.render();
  };
  update = function(idx, color){
    var chart;
    idx == null && (idx = -1);
    if (idx >= 0) {
      pal.colors[idx].hex = color;
    }
    chart = charts[lastIdx];
    chart.config({
      palette: pal
    });
    chart.resize();
    return chart.render();
  };
  $('#land-edit-pick').on('click', function(e){
    var idx;
    idx = +(e.target.getAttribute('idx') || e.target.parentNode.getAttribute('idx'));
    $("#land-pdb-root > div:nth-child(" + (lastIdx + 1) + ")").hide();
    $("#land-edit-pick > .ib:nth-child(" + (lastIdx + 1) + ")").removeClass('active');
    lastIdx = idx;
    $("#land-pdb-root > div:nth-child(" + (idx + 1) + ")").show();
    $("#land-edit-pick > .ib:nth-child(" + (lastIdx + 1) + ")").addClass('active');
    return update();
  });
  data = [null, null];
  d1value = d3.range(12).map(function(){
    return Math.round(Math.random() * 100);
  });
  name = ['James', 'Peter', 'David', 'Ben', 'Cathy', 'Tim', 'Rob', 'Edward', 'Frank', 'Eve', 'Helen', 'Stan'];
  d1cat1 = ['HR', 'FIN', 'GM', 'RD', 'IT'];
  d1cat2 = ['M', 'F'];
  data[0] = {
    category: [{
      name: "",
      data: d1value.map(function(d, i){
        return d1cat1[i % 5];
      })
    }],
    src: [{
      name: "",
      data: d1value.map(function(d, i){
        return d1cat1[i % 5];
      })
    }],
    des: [{
      name: "",
      data: d1value.map(function(d, i){
        return d1cat2[i % 2];
      })
    }],
    name: [{
      name: "",
      data: d1value.map(function(){
        return "";
      })
    }],
    value: [{
      name: "",
      data: d1value
    }],
    size: [{
      name: "",
      data: d1value
    }],
    values: [{
      name: "KPI",
      data: d1value
    }],
    value1: [{
      name: "",
      data: d1value
    }],
    value2: [{
      name: "",
      data: d1value.map(function(it){
        return Math.round((100 - it) * Math.random());
      })
    }]
  };
  data[0].value3 = [{
    name: "",
    data: d1value.map(function(d, i){
      return 100 - d - data[0].value2[0].data[i];
    })
  }];
  d2value = d3.range(12).map(function(){
    return Math.round(Math.random() * 100);
  });
  name = ['James', 'Peter', 'David', 'Ben', 'Cathy', 'Tim', 'Rob', 'Edward', 'Frank', 'Eve', 'Helen', 'Stan'];
  d2cat1 = ['HR', 'FIN', 'GM', 'RD', 'IT'];
  d2cat2 = ['M', 'F'];
  data[1] = {
    category: [{
      name: "",
      data: d2value.map(function(d, i){
        return d2cat1[i % 5];
      })
    }],
    src: [{
      name: "",
      data: d2value.map(function(d, i){
        return d2cat1[i % 5];
      })
    }],
    des: [{
      name: "",
      data: d2value.map(function(d, i){
        return d2cat2[i % 2];
      })
    }],
    name: [{
      name: "",
      data: d2value.map(function(){
        return "";
      })
    }],
    value: [{
      name: "",
      data: d2value
    }],
    size: [{
      name: "",
      data: d2value
    }],
    values: [{
      name: "KPI",
      data: d2value
    }],
    value1: [{
      name: "",
      data: d2value
    }],
    value2: [{
      name: "",
      data: d2value.map(function(it){
        return Math.round((100 - it) * Math.random());
      })
    }]
  };
  data[1].value3 = [{
    name: "",
    data: d2value.map(function(d, i){
      return 100 - d - data[1].value2[0].data[i];
    })
  }];
  pal = {
    colors: [
      {
        hex: '#d54876'
      }, {
        hex: '#eaac34'
      }, {
        hex: '#f2e336'
      }, {
        hex: '#66b2a2'
      }, {
        hex: '#3c5496'
      }
    ]
  };
  charts = [];
  return plotdb.load('/assets/json/samples.json', function(ret){
    var i$, to$, i, node, chart, results$ = [];
    charts = ret;
    for (i$ = 0, to$ = charts.length; i$ < to$; ++i$) {
      i = i$;
      node = $("#land-pdb-root > div:nth-child(" + (i + 1) + ")")[0];
      chart = charts[i];
      chart.config({
        palette: pal
      });
      chart.data(data[0]);
      chart.attach(node);
      if (i === 0) {
        $(node).show();
      } else {
        $(node).hide();
      }
    }
    for (i$ = 1; i$ < 3; ++i$) {
      i = i$;
      fn$(i);
    }
    for (i$ = 0; i$ < 5; ++i$) {
      i = i$;
      results$.push(fn1$(i));
    }
    return results$;
    function fn$(v){
      var node;
      node = $("#land-edit-cog .btn-group .btn-default:nth-child(" + v + ")");
      return node.on('click', function(){
        var node;
        node = $("#land-edit-cog .btn-group .btn-default:nth-child(" + lastDataIdx + ")").removeClass('active');
        setdata(v - 1);
        lastDataIdx = v;
        return node = $("#land-edit-cog .btn-group .btn-default:nth-child(" + lastDataIdx + ")").addClass('active');
      });
    }
    function fn1$(v){
      var node, ldcp;
      node = $("#land-edit-cog .color:nth-of-type(" + (v + 1))[0];
      ldcp = new ldColorPicker(node, {
        index: v,
        exclusive: true,
        'class': 'no-palette no-alpha',
        palette: pal
      });
      return ldcp.on('change', function(it){
        node.style.background = it;
        return update(v, it);
      });
    }
  });
});