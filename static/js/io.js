// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('IOService', ['$rootScope', '$http'].concat(function($rootScope, $http){
  var aux, ret;
  aux = {
    usedkey: {},
    localkey: function(){
      return (Math.random().toString(36) + "").substring(2);
    },
    saveLocally: function(item, res, rej, param){
      var list, i$, i, key;
      list = JSON.parse(localStorage.getItem("/db/list/" + item._type.name)) || [];
      if (!item.key) {
        for (i$ = 0; i$ <= 10; ++i$) {
          i = i$;
          key = this.localkey();
          if (i === 10 || (!in$(key, list) && !this.usedkey[key])) {
            break;
          }
        }
        if (i === 10) {
          return rej([true, "generate local key failed"]);
        }
        item.key = key;
        this.usedkey[key] = true;
      }
      if (item.key && !in$(item.key, list)) {
        list.push(item.key);
      }
      item[!item.createdtime ? "createdtime" : "modifiedtime"] = new Date().getTime();
      localStorage.setItem("/db/list/" + item._type.name, angular.toJson(list));
      localStorage.setItem("/db/" + item._type.name + "/" + item.key, angular.toJson(item));
      return res(item);
    },
    saveRemotely: function(item, res, rej, params){
      var config;
      item[!item.createdtime ? "createdtime" : "modifiedtime"] = new Date().getTime();
      config = import$({
        data: item
      }, item.key
        ? {
          url: "/d/" + item._type.name + "/" + item.key,
          method: 'PUT'
        }
        : {
          url: "/d/" + item._type.name,
          method: 'POST'
        });
      if (typeof params === 'object') {
        config.params = params;
      }
      return $http(config).success(function(ret){
        return res(ret);
      }).error(function(d, status){
        return rej([true, d, status]);
      });
    },
    loadLocally: function(_type, key, res, rej){
      var ret;
      ret = JSON.parse(localStorage.getItem("/db/" + _type.name + "/" + key));
      if (ret) {
        return res((ret._type = _type, ret));
      } else {
        return rej([true, "no such item"]);
      }
    },
    loadRemotely: function(_type, key, res, rej){
      var config;
      config = {
        url: "/d/" + _type.name + "/" + key,
        method: 'GET'
      };
      return $http(config).success(function(ret){
        return res((ret._type = _type, ret));
      }).error(function(d){
        return rej([true, d.toString()]);
      });
    },
    deleteLocally: function(_type, key, res, rej){
      var list;
      list = JSON.parse(localStorage.getItem("/db/list/" + _type.name)) || [];
      if (!in$(key, list)) {
        return rej([true, "no such item"]);
      }
      list = list.filter(function(it){
        return it !== key;
      });
      localStorage.setItem("/db/list/" + _type.name, angular.toJson(list));
      localStorage.setItem("/db/" + _type.name + "/" + key, null);
      return res();
    },
    deleteRemotely: function(_type, key, res, rej){
      var config;
      config = {
        url: "/d/" + _type.name + "/" + key,
        method: 'DELETE'
      };
      return $http(config).success(function(ret){
        return res(ret);
      }).error(function(d){
        d == null && (d = "");
        return rej([true, d.toString()]);
      });
    },
    verifyType: function(item){
      if (!item || !item._type || typeof item._type !== 'object') {
        return true;
      }
      if (!item._type.name || !item._type.location) {
        return true;
      }
      return false;
    }
  };
  return ret = {
    aux: aux,
    save: function(item, param){
      var this$ = this;
      return new Promise(function(res, rej){
        if (aux.verifyType(item)) {
          return rej([true, "type incorrect"]);
        }
        if (item._type.location === 'local') {
          return aux.saveLocally(item, res, rej, param);
        } else if (item._type.location === 'server') {
          return aux.saveRemotely(item, res, rej, param);
        } else {
          return rej([true, "not support type"]);
        }
      });
    },
    load: function(_type, key){
      var this$ = this;
      return new Promise(function(res, rej){
        if (aux.verifyType({
          _type: _type
        })) {
          return rej([true, "type incorrect"]);
        }
        if (_type.location === 'local') {
          return aux.loadLocally(_type, key, res, rej);
        } else if (_type.location === 'server') {
          return aux.loadRemotely(_type, key, res, rej);
        } else {
          return rej([true, "not support type"]);
        }
      });
    },
    listLocally: function(_type){
      return new Promise(function(res, rej){
        var list, ret, i$, len$, item, obj;
        list = JSON.parse(localStorage.getItem("/db/list/" + _type.name)) || [];
        ret = [];
        for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
          item = list[i$];
          obj = JSON.parse(localStorage.getItem("/db/" + _type.name + "/" + item));
          if (obj && obj.key) {
            ret.push(obj);
          }
        }
        return res(ret);
      });
    },
    listRemotely: function(_type, query){
      query == null && (query = null);
      return new Promise(function(res, rej){
        var k, v;
        query = typeof query === 'object' ? (function(){
          var ref$, results$ = [];
          for (k in ref$ = query) {
            v = ref$[k];
            results$.push([k, v]);
          }
          return results$;
        }()).filter(function(it){
          return it[1];
        }).map(function(arg$){
          var k, v;
          k = arg$[0], v = arg$[1];
          return k + "=" + (Array.isArray(v) ? v.join(',') : v);
        }).join("&") : query;
        return $http({
          url: "/d/" + _type.name + (query ? '?' + query : ''),
          method: 'GET'
        }).success(function(ret){
          return res(ret);
        }).error(function(d){
          return rej([true, d.toString()]);
        });
      });
    }
    /*
    list: (_type, filter = {}) -> new Promise (res, rej) ~>
      if aux.verify-type({_type}) => return rej [true, "type incorrect"]
      if _type.location == \local => return aux.list-locally _type, res, rej
      else if _type.location == \server => return aux.list-remotely _type, res, rej
      else if _type.location == \any =>
        Promise.all [
          new Promise (res, rej) -> aux.list-locally _type, res, rej
          new Promise (res, rej) -> aux.list-remotely _type, res, rej
        ] .then (ret) -> res ret.0 ++ ret.1
      else return rej [true, "not support type"]
    */,
    'delete': function(_type, key){
      var this$ = this;
      return new Promise(function(res, rej){
        if (!_type || !key) {
          return rej([true, "param not sufficient"]);
        }
        if (_type.location === 'local') {
          return aux.deleteLocally(_type, key, res, rej);
        } else if (_type.location === 'server') {
          return aux.deleteRemotely(_type, key, res, rej);
        } else {
          return rej([true, "not support type"]);
        }
      });
    },
    backup: function(item){
      var this$ = this;
      return new Promise(function(res, rej){
        var path, list, now, remains, i$, len$, p, timestamp, e;
        path = "/db/backup/" + item._type.name + "/" + item.key;
        list = JSON.parse(localStorage.getItem("/db/list/backups") || "[]");
        now = new Date().getTime();
        remains = [];
        for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
          p = list[i$];
          timestamp = JSON.parse(localstorage.getItem(p + "/timestamp") || 0);
          if (now - timestamp > 3600000) {
            localstorage.removeItem(p + "");
            localstorage.removeItem(p + "/timestamp");
          } else {
            remains.push(p);
          }
        }
        if (remains.indexOf(path) < 0) {
          remains.push(path);
        }
        try {
          localStorage.setItem(path + "", angular.toJson(item));
          localStorage.setItem(path + "/timestamp", angular.toJson(new Date().getTime()));
        } catch (e$) {
          e = e$;
          console.log(e);
        }
        return res();
      });
    },
    backups: function(item){
      var this$ = this;
      return new Promise(function(res, rej){
        var path, object, timestamp, e;
        path = "/db/backup/" + item._type.name + "/" + item.key;
        try {
          object = JSON.parse(localStorage.getItem(path + "") || "{}");
          timestamp = JSON.parse(localStorage.getItem(path + "/timestamp") || "0");
          return res(timestamp
            ? [{
              object: object,
              timestamp: timestamp
            }]
            : []);
        } catch (e$) {
          e = e$;
          console.error("failed to parse backups for " + item._type.location + " / " + item._type.name + " / " + item.key + ": \n" + e);
          return res([]);
        }
      });
    },
    cleanBackups: function(item){
      var this$ = this;
      return new Promise(function(res, rej){
        var path;
        path = "/db/backup/" + item._type.name + "/" + item.key;
        localStorage.setItem(path + "/count", "0");
        return res();
      });
    }
  };
}));
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}