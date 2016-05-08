// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('chartService', ['$rootScope', '$http', 'plConfig', 'sampleChart', 'IOService', 'baseService', 'dataService'].concat(function($rootScope, $http, plConfig, sampleChart, IOService, baseService, dataService){
  var service, object, chartService;
  service = {
    sample: sampleChart,
    link: function(chart){
      return "/chart/" + chart.key + "/";
    },
    thumblink: function(chart){
      return "/s/chart/" + chart.key + ".png";
    },
    sharelink: function(chart){
      return plConfig.urlschema + "" + plConfig.domain + "/v/chart/" + chart.key;
    }
  };
  object = function(src, lazy){
    var k, ref$, v;
    lazy == null && (lazy = false);
    import$(this, {
      name: 'untitled',
      owner: null,
      theme: null,
      parent: null,
      description: null,
      basetype: [],
      visualencoding: [],
      category: [],
      tags: [],
      likes: 0,
      searchable: false,
      doc: {
        name: 'document',
        type: 'html',
        content: service.sample[0].doc.content
      },
      style: {
        name: 'stylesheet',
        type: 'css',
        content: service.sample[0].style.content
      },
      code: {
        name: 'code',
        type: 'javascript',
        content: service.sample[0].code.content
      },
      assets: [],
      config: {},
      dimension: {},
      _type: {
        location: 'server',
        name: 'chart'
      }
    });
    import$(this, src);
    for (k in ref$ = this.dimension || {}) {
      v = ref$[k];
      v.fields = (v.fields || []).map(fn$);
    }
    return this;
    function fn$(it){
      var field;
      field = new dataService.Field(it);
      if (!lazy) {
        field.update();
      }
      return field;
    }
  };
  object.prototype = {
    save: function(){
      var payload, k, ref$, v, this$ = this;
      payload = JSON.parse(angular.toJson(this));
      for (k in ref$ = payload.dimension) {
        v = ref$[k];
        (v.fields || []).forEach(fn$);
      }
      return chartService.save(payload).then(function(ret){
        return this$.key = ret.key;
      });
      function fn$(it){
        var ref$;
        return ref$ = it.data, delete it.data, ref$;
      }
    },
    like: function(v){
      var this$ = this;
      return new Promise(function(res, rej){
        var ref$;
        this$.likes = (ref$ = this$.likes + (v
          ? 1
          : -1)) > 0 ? ref$ : 0;
        return $http({
          url: "/d/chart/" + this$.key + "/like",
          method: 'PUT'
        }).success(function(){
          return res();
        }).error(function(d, status){
          var ref$;
          this$.likes = (ref$ = this$.likes - (v
            ? 1
            : -1)) > 0 ? ref$ : 0;
          return rej();
        });
      });
    },
    addFile: function(name, type, content){
      var file;
      content == null && (content = null);
      file = {
        name: name,
        type: type,
        content: content
      };
      this.assets.push(file);
      return file;
    },
    removeFile: function(file){
      var idx;
      idx = this.assets.indexOf(file);
      if (idx < 0) {
        return;
      }
      return this.assets.splice(idx, 1);
    },
    updateData: function(){
      var len, k, v, i$, i, ret, ref$, that, results$ = [];
      this.data = [];
      len = Math.max.apply(null, (function(){
        var ref$, results$ = [];
        for (k in ref$ = this.dimension) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }.call(this)).reduce(function(a, b){
        return a.concat(b.fields || []);
      }, []).filter(function(it){
        return it.data;
      }).map(function(it){
        return it.data.length;
      }).concat([0]));
      for (i$ = 0; i$ < len; ++i$) {
        i = i$;
        ret = {};
        for (k in ref$ = this.dimension) {
          v = ref$[k];
          if (v.multiple) {
            ret[k] = (v.fields || (v.fields = [])).length
              ? (v.fields || (v.fields = [])).map(fn$)
              : [];
            v.fieldName = (v.fields || (v.fields = [])).map(fn1$);
          } else {
            ret[k] = (that = (v.fields || (v.fields = []))[0]) ? (that.data || (that.data = []))[i] : null;
            v.fieldName = (that = (v.fields || (v.fields = []))[0]) ? that.name : null;
          }
          if (v.type.filter(fn2$).length) {
            if (Array.isArray(ret[k])) {
              ret[k] = ret[k].map(fn3$);
            } else {
              ret[k] = parseFloat(ret[k]);
            }
          }
        }
        results$.push(this.data.push(ret));
      }
      return results$;
      function fn$(it){
        return (it.data || (it.data = []))[i];
      }
      function fn1$(it){
        return it.name;
      }
      function fn2$(it){
        return it.name === 'Number';
      }
      function fn3$(it){
        return parseFloat(it);
      }
    }
  };
  chartService = baseService.derive('chart', service, object);
  return chartService;
}));
x$.controller('userChartList', ['$scope', '$http', 'dataService', 'chartService'].concat(function($scope, $http, dataService, chartService){
  var owner, that;
  owner = (that = /^\/user\/([^/]+)/.exec(window.location.pathname))
    ? that[1]
    : $scope.user.data ? $scope.user.data.key : null;
  $scope.q = {
    owner: owner
  };
  if ($scope.user.data && owner === $scope.user.data.key) {
    return $scope.showPub = true;
  }
}));
x$.controller('chartList', ['$scope', '$http', '$timeout', 'IOService', 'Paging', 'dataService', 'chartService', 'plNotify'].concat(function($scope, $http, $timeout, IOService, Paging, dataService, chartService, plNotify){
  var map, k, ref$, v;
  $scope.loading = true;
  $scope.charts = [];
  $scope.q = {
    type: null,
    enc: null,
    cat: null,
    dim: null,
    order: 'Latest'
  };
  $scope.qLazy = {
    keyword: null
  };
  if ($scope.$parent.q) {
    import$($scope.q, $scope.$parent.q);
  }
  if ($scope.$parent.qLazy) {
    import$($scope.qLazy, $scope.$parent.qLazy);
  }
  $scope.qmap = {
    type: ["Other", "Bar Chart", "Line Chart", "Pie Chart", "Area Chart", "Bubble Chart", "Radial Chart", "Calendar", "Treemap", "Choropleth", "Cartogram", "Heatmap", "Sankey", "Venn Diagram", "Word Cloud", "Timeline", "Mixed", "Pictogram", "Scatter Plot"],
    enc: ["Other", "Position", "Position ( Non-aligned )", "Length", "Direction", "Angle", "Area", "Volume", "Curvature", "Shade", "Saturation"],
    cat: ["Other", "Infographics", "Geographics", "Interactive", "Journalism", "Statistics", "Business"],
    dim: [0, 1, 2, 3, 4, 5, "> 5"]
  };
  $scope.link = function(it){
    return chartService.link(it);
  };
  $scope.paging = Paging;
  $scope.loadList = function(delay, reset){
    delay == null && (delay = 1000);
    reset == null && (reset = false);
    return Paging.load(function(){
      var payload, ref$;
      payload = import$(import$((ref$ = {}, ref$.offset = Paging.offset, ref$.limit = Paging.limit, ref$), $scope.q), $scope.qLazy);
      return IOService.listRemotely({
        name: 'chart'
      }, payload);
    }, delay, reset).then(function(ret){
      var this$ = this;
      return $scope.$apply(function(){
        var data;
        data = (ret || []).map(function(it){
          return new chartService.chart(it, true);
        });
        Paging.flexWidth(data);
        return $scope.charts = (reset
          ? []
          : $scope.charts).concat(data);
      });
    });
  };
  $scope.$watch('q', function(){
    return $scope.loadList(500, true);
  }, true);
  $scope.$watch('qLazy', function(){
    return $scope.loadList(1000, true);
  }, true);
  $scope.like = function(chart){
    var mylikes, ref$, ref1$, v;
    if (!$scope.user.authed()) {
      return $scope.auth.toggle(true);
    }
    if (!chart) {
      return;
    }
    mylikes = (ref$ = (ref1$ = $scope.user.data).likes || (ref1$.likes = {})).chart || (ref$.chart = {});
    v = mylikes[chart.key] = !mylikes[chart.key];
    return chart.like(v)['catch'](function(){
      plNotify.send('error', "You failed to love. try again later, don't give up!");
      return mylikes[chart.key] = !v;
    });
  };
  if (window.location.search) {
    map = d3.nest().key(function(it){
      return it[0];
    }).map(window.location.search.replace('?', '').split('&').map(function(it){
      return it.split('=');
    }));
    for (k in ref$ = $scope.q) {
      v = ref$[k];
      if (map[k]) {
        $scope.q[k] = map[k][0][1];
      }
    }
  }
  return Paging.loadOnScroll(function(){
    return $scope.loadList();
  }, $('#list-end'));
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}