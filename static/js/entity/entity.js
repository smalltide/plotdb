// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('entityService', ['$rootScope', '$http', 'plConfig', 'IOService', 'baseService'].concat(function($rootScope, $http, plConfig, IOService, baseService){
  var service, select2Config, ref$;
  service = {};
  select2Config = {
    base: {
      escapeMarkup: function(it){
        return it;
      },
      language: {
        inputTooShort: function(it){
          return "<span class='grayed'>type " + (it.minimum - (it.input || '').length) + " more chars to search</span>";
        },
        errorLoading: function(){
          return "<span class='grayed'>something is wrong... try again later.</span>";
        },
        loadingMore: function(){
          return "<img src='/assets/img/loading.gif'>";
        },
        noResults: function(){
          return "<span class='grayed'>no result.</span>";
        },
        searching: function(){
          return "<img src='/assets/img/loading.gif'><span class='grayed'>searching...</span>";
        }
      },
      minimumInputLength: 3,
      templateResult: function(it){
        if (!it || !it.displayname) {
          return "<img src='/assets/img/loading.gif'>";
        }
        return "<div class=\"select2-user\">\n<img src=\"/s/avatar/" + (it.avatar || 0) + ".jpg\">\n<span>" + it.displayname + "</span>\n<small class=\"grayed\">" + (it.type === "team" ? "(team)" : "") + "</small>\n</div>";
      },
      templateSelection: function(it){
        return "<div class=\"select2-user selected\">\n<img src=\"/s/avatar/" + (it.avatar || 0) + ".jpg\">\n<span>" + it.displayname + "</span>\n<small class=\"grayed\">" + (it.type === "team" ? "(team)" : "") + "</small>\n</div>";
      }
    },
    ajax: {
      dataType: "json",
      delay: 250,
      data: function(params){
        return {
          keyword: params.term,
          offset: (params.page || 0) * 20,
          limit: 20
        };
      },
      processResults: function(data, params){
        params.page = params.page || 0;
        return {
          results: data.map(function(it){
            return it.id = it.key, it;
          }),
          pagination: {
            more: data && data.length
          }
        };
      },
      cache: true
    }
  };
  select2Config.chart = import$(import$({}, select2Config.base), {
    placeholder: "search by chart name or id ...",
    templateResult: function(it){
      if (!it || !it.key) {
        return "<img src='/assets/img/loading.gif'>";
      }
      return "<div class=\"select2-chart\">\n<div class=\"avatar\" style=\"background-image:url(/s/chart/" + it.key + ".png)\"></div>\n<span>" + it.name + "</span>\n<small class=\"grayed\">(chart)</small>\n</div>";
    },
    templateSelection: function(it){
      return "<div class=\"select2-chart selected\">\n<div class=\"avatar xs\" style=\"background-image:url(/s/chart/" + it.key + ".png)\"></div>\n<span>" + it.name + "</span>\n<small class=\"grayed\">(chart)</small>\n</div>";
    }
  });
  select2Config.chart.ajax = (ref$ = import$({}, select2Config.ajax), ref$.url = "http://localhost/d/chart/?simple=true", ref$);
  select2Config.entity = import$(import$({}, select2Config.base), {
    placeholder: "search by user, team name or email address..."
  });
  select2Config.entity.ajax = (ref$ = import$({}, select2Config.ajax), ref$.url = "http://localhost/d/entity/", ref$);
  select2Config.entity.ajax.processResults = function(data, params){
    params.page = params.page || 0;
    return {
      results: data.map(function(it){
        return it.id = it.type + ":" + it.key, it;
      }),
      pagination: {
        more: data && data.length
      }
    };
  };
  select2Config.team = import$(import$({}, select2Config.base), {
    placeholder: "search by team name or email address..."
  });
  select2Config.team.ajax = (ref$ = import$({}, select2Config.ajax), ref$.url = "http://localhost/d/team/", ref$);
  select2Config.user = import$(import$({}, select2Config.base), {
    placeholder: "search by user name or email address..."
  });
  select2Config.user.ajax = (ref$ = import$({}, select2Config.ajax), ref$.url = "http://localhost/d/user/", ref$);
  (service.config || (service.config = {})).select2 = select2Config;
  return service;
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}