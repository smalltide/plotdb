// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.controller('palEditor', ['$scope', '$http', '$timeout', 'paletteService', 'eventBus', 'plNotify'].concat(function($scope, $http, $timeout, paletteService, eventBus, plNotify){
  var circles, outCircle, sel, path;
  $scope.scale = {
    map: d3.scaleQuantile(),
    bubble: d3.scaleOrdinal()
  };
  $scope.tooltip = plotd3.html.tooltip(document.getElementById('pal-editor-preview-wrap')).on('mousemove', function(d, i, popup){
    popup.select(".value").text(d.value);
    return popup.style({
      "margin-left": '15px'
    });
  });
  $scope.preview = {
    type: 'map',
    init: function(){
      return $scope.$watch('preview.type', function(){
        return $scope.render();
      });
    }
  };
  $scope.preview.init();
  $scope.type = 1;
  $scope.loading = true;
  $scope.count = 6;
  $scope.blindtest = 'normal';
  $scope.palette = new paletteService.palette();
  $scope.rgb2hex = function(v){
    return "#" + ['r', 'g', 'b'].map(function(k, i){
      var d;
      d = Math.round(v[k]);
      d >= 0 || (d = 0);
      d <= 255 || (d = 255);
      return d.toString(16);
    }).map(function(it){
      return repeatString$("0", 2 - it.length) + it;
    }).join("");
  };
  $scope.palList = {
    isOn: false,
    toggle: function(e){
      this.isOn = !this.isOn;
      e.stopPropagation();
      return e.cancelBubble = true;
    }
  };
  $scope.setPalette = function(pal){
    $scope.palette = new paletteService.palette(pal);
    $scope.count = $scope.palette.colors.length;
    $scope.generate();
    return $scope.render();
  };
  $scope.create = function(){
    $scope.palette = new paletteService.palette();
    $scope.generate(true);
    return $scope.render();
  };
  $scope['delete'] = function(){
    eventBus.fire('loading.dimmer.on');
    return $scope.palette['delete']().then(function(){
      return $scope.$apply(function(){
        return $timeout(function(){
          eventBus.fire('loading.dimmer.off');
          eventBus.fire('paledit.delete', $scope.palette.key);
          plNotify.send('success', "palette delete");
          $scope.palette = new paletteService.palette();
          $scope.generate();
          return $scope.render();
        }, 500);
      });
    })['catch'](function(){
      return $scope.$apply(function(){
        return $timeout(function(){
          eventBus.fire('loading.dimmer.off');
          return plNotify.send('error', "failed to delete. try again later?");
        }, 500);
      });
    });
  };
  $scope.save = function(){
    var ref$;
    if (!$scope.palette.name) {
      return setTimeout(function(){
        return $('#pal-editor-name').tooltip('show');
      }, 0);
    }
    if ($scope.palette._type.location !== 'server') {
      ref$ = $scope.palette._type;
      ref$.location = 'server';
      ref$.name = 'palette';
      delete $scope.palette.key;
    }
    eventBus.fire('loading.dimmer.on');
    return $scope.palette.save().then(function(){
      return $scope.$apply(function(){
        return $timeout(function(){
          eventBus.fire('loading.dimmer.off');
          eventBus.fire('paledit.update', $scope.palette);
          return plNotify.send('success', "palette saved");
        }, 500);
      });
    })['catch'](function(){
      return $scope.$apply(function(){
        return $timeout(function(){
          eventBus.fire('loading.dimmer.off');
          return plNotify.send('error', "save failed. try again later?");
        }, 500);
      });
    });
  };
  $scope.generate = function(rand){
    var pal, list, order, i$, to$, i, h, c, l, ref$, v1, v2, hclint, len, len2, v3, v4, hclint1, hclint2;
    pal = $scope.palette;
    if (!($scope.count != null)) {
      $scope.count = 6;
    }
    if ($scope.count < 2) {
      $scope.count = 2;
    }
    if ($scope.count > 10) {
      $scope.count = 10;
    }
    if (rand || !pal.colors) {
      pal.colors = [];
    }
    list = pal.colors.map(function(it){
      return import$({}, it);
    });
    if (list.length < $scope.count) {
      list = list.concat(d3.range($scope.count - list.length).map(function(){
        var v;
        v = parseInt(Math.random() * 16777216).toString(16);
        return v = "#" + repeatString$('0', 6 - v.length) + v;
      }).map(function(d, i){
        return {
          hex: d,
          idx: i
        };
      }));
    } else if (list.length > $scope.count) {
      list.splice($scope.count, list.length - $scope.count);
    }
    if ($scope.type === 1 && rand) {
      order = d3.shuffle(d3.range(list.length));
      for (i$ = 0, to$ = list.length; i$ < to$; ++i$) {
        i = i$;
        h = parseInt(360 * i / list.length + Math.random() * 4 - 2);
        c = Math.round(Math.random() * 40 + 40);
        l = Math.round(50 + 25 * order[i] / list.length);
        list[i].hex = $scope.rgb2hex(d3.rgb(d3.hcl(h, c, l)));
      }
    } else if ($scope.type === 2) {
      ref$ = [list[0].hex, list[list.length - 1].hex], v1 = ref$[0], v2 = ref$[1];
      hclint = d3.interpolateHcl(v1, v2);
      list.map(function(d, i){
        var v;
        v = d3.rgb(hclint(i / (list.length - 1 || 1)));
        return d.hex = $scope.rgb2hex(v);
      });
    } else if ($scope.type === 3) {
      len = list.length;
      len2 = parseInt(len / 2);
      ref$ = [list[0].hex, list[len2 - (len + 1) % 2].hex], v1 = ref$[0], v2 = ref$[1];
      ref$ = [list[len2 - len % 2].hex, list[list.length - 1].hex], v3 = ref$[0], v4 = ref$[1];
      v2 = d3.hcl(v1);
      v3 = d3.hcl(v4);
      v2.l = (100 - v2.l) * 0.9 + v2.l;
      v2.c = 10;
      v3.l = (100 - v3.l) * 0.9 + v3.l;
      v3.c = 10;
      v2 = v2.toString();
      v3 = v3.toString();
      hclint1 = d3.interpolateHcl(v1, v2);
      hclint2 = d3.interpolateHcl(v3, v4);
      len2 += len % 2;
      list.map(function(d, i){
        var v;
        if (i < len2) {
          v = d3.rgb(hclint1(i / (len2 - 1 || 1)));
        } else {
          i -= len2 - len % 2;
          v = d3.rgb(hclint2(i / (len2 - 1 || 1)));
        }
        return d.hex = "#" + ['r', 'g', 'b'].map(function(it){
          return v[it].toString(16);
        }).map(function(it){
          return repeatString$("0", 2 - it.length) + it;
        }).join("");
      });
    }
    $scope.jsonOutput = "[" + list.map(function(d){
      return "\"" + d.hex + "\"";
    }).join(',') + "]";
    $scope.palette.colors = list;
    return $scope.palette.width = 100 / (list.length || 1);
  };
  $scope.generate();
  $scope.$watch('count', function(){
    $scope.generate();
    return $scope.render();
  });
  circles = d3.range(150).map(function(d, i){
    var v;
    v = Math.random() * 30;
    return {
      r: Math.pow(v, 0.5),
      value: v,
      category: d
    };
  });
  d3.packSiblings(circles);
  outCircle = d3.packEnclose(circles);
  $scope.circleGroup = d3.select('#pal-editor-preview').append('g');
  sel = $scope.circleGroup.selectAll('circle').data(circles).enter().append('circle').attrs({
    cx: function(it){
      return it.x;
    },
    cy: function(it){
      return it.y;
    },
    r: function(it){
      return it.r;
    }
  });
  $scope.tooltip.nodes(sel);
  $scope.circleGroup.attrs({
    transform: function(){
      var r, rate;
      r = outCircle.r;
      rate = 190 / r;
      return "translate(400 250) scale(" + rate + ")";
    }
  });
  path = d3.geoPath().projection(d3.geoAlbersUsa().scale(900).translate([400, 200]));
  $http({
    url: '/assets/misc/us.json',
    method: 'GET'
  }).success(function(d){
    var features;
    features = topojson.feature(d, d.objects.counties).features;
    return d3.csv('/assets/misc/us-unemployment-rate-2015.csv', function(data){
      return $scope.$apply(function(){
        var hash, i$, ref$, len$, item, id, sel;
        $scope.loading = false;
        hash = {};
        $scope.values = data.map(function(it){
          return it.percent = parseFloat(it.percent);
        });
        $scope.valueRange = d3.extent($scope.values);
        $scope.scale.map.domain($scope.values);
        for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
          item = ref$[i$];
          hash[item.code] = item.percent;
        }
        for (i$ = 0, len$ = (ref$ = features).length; i$ < len$; ++i$) {
          item = ref$[i$];
          id = (item.id < 10000 ? "0" : "") + item.id;
          item.value = parseInt(hash[id] || 0);
        }
        $scope.pathGroup = d3.select('#pal-editor-preview').append('g').attrs({
          transform: "translate(0 18)"
        });
        sel = $scope.pathGroup.selectAll('path').data(features).enter().append('path').attrs({
          d: path,
          stroke: '#fff',
          "stroke-width": 0.5
        });
        $scope.tooltip.nodes(sel);
        return $scope.render();
      });
    });
  }).error(function(d){
    return $scope.loading = false;
  });
  $scope.handler = {
    handle: null,
    set: function(){
      if (this.handle) {
        $timeout.cancel(this.handle);
      }
      return this.handle = $timeout(function(){
        return $scope.generate();
      }, 100);
    }
  };
  $scope.picker = {
    node: null,
    disabled: function(idx){
      var ref$, len, type;
      ref$ = [$scope.palette.colors.length, $scope.type], len = ref$[0], type = ref$[1];
      if (type === 1) {
        return false;
      }
      if ((type === 2 || type === 3) && (idx > 0 && idx < len - 1)) {
        return true;
      }
      return false;
    },
    toggle: function(e, c){
      var ref$, this$ = this;
      if ($scope.type === 2 && c.idx > 0 && c.idx < $scope.palette.colors.length - 1) {
        return;
      }
      if (c.idx === this.idx) {
        this.isOn = !this.isOn;
      } else {
        this.isOn = true;
      }
      this.idx = c.idx;
      this.ptr = {
        left: (ref$ = e.target.getBoundingClientRect()).left,
        top: ref$.top
      };
      this.ptr.left -= 297;
      this.ptr.top += document.body.scrollTop;
      setTimeout(function(){
        return this$.ldcp.setColor($scope.palette.colors[this$.idx].hex);
      }, 0);
      e.preventDefault();
      e.cancelBubble = true;
      return e.stopPropagation();
    },
    idx: 0,
    isOn: false,
    config: {
      oncolorchange: function(c){
        return $scope.$apply(function(){
          $scope.palette.colors[$scope.picker.idx].hex = c;
          $scope.generate();
          return $scope.render();
        });
      }
    },
    init: function(){
      this.node = document.querySelector('#pal-editor-ldcp .ldColorPicker');
      return this.ldcp = new ldColorPicker(null, this.config, this.node);
    }
  };
  $scope.valueRange = [0, 1];
  $scope.render = function(){
    var type, that;
    type = $scope.preview.type;
    $scope.scale.map.range(($scope.palette.colors || []).map(function(it){
      return it.hex;
    }));
    if (that = $scope.pathGroup) {
      that.attr('opacity', type !== 'bubble' ? '1' : '0');
      that.selectAll('path').attrs({
        fill: function(it){
          return $scope.scale.map(it.value);
        }
      });
    }
    if (that = $scope.circleGroup) {
      $scope.scale.bubble.domain(d3.range($scope.palette.colors.length)).range(($scope.palette.colors || []).map(function(it){
        return it.hex;
      }));
      that.attr('opacity', type === 'bubble' ? '1' : '0');
      return that.selectAll('circle').attrs({
        fill: function(it){
          return $scope.scale.bubble(it.category % $scope.palette.colors.length);
        }
      });
    }
  };
  $scope.$watch('type', function(){
    $scope.generate();
    return $scope.render();
  });
  $scope.picker.init();
  document.body.addEventListener('click', function(e){
    return $scope.$apply(function(){
      $scope.picker.isOn = false;
      return $scope.palList.isOn = false;
    });
  });
  return ['#pal-editor-output', '#pal-editor-output-copy'].map(function(eventsrc){
    var clipboard;
    clipboard = new Clipboard(eventsrc);
    clipboard.on('success', function(){
      $(eventsrc).tooltip({
        title: 'copied',
        trigger: 'click'
      }).tooltip('show');
      return setTimeout(function(){
        return $(eventsrc).tooltip('hide');
      }, 1000);
    });
    return clipboard.on('error', function(){
      $(eventsrc).tooltip({
        title: 'Press Ctrl+C to Copy',
        trigger: 'click'
      }).tooltip('show');
      return setTimeout(function(){
        return $(eventsrc).tooltip('hide');
      }, 1000);
    });
  });
}));
function repeatString$(str, n){
  for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
  return r;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}