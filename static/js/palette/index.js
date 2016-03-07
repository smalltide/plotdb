// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('paletteService', ['$rootScope', 'samplePalette', 'IOService', 'baseService'].concat(function($rootScope, samplePalette, IOService, baseService){
  var service, object, paletteService;
  service = {
    sample: samplePalette,
    list2pal: function(name, list){
      return {
        name: name,
        colors: list.map(function(it){
          return {
            hex: it
          };
        })
      };
    }
  };
  object = function(){
    return this;
  };
  paletteService = baseService.derive(name, service, object);
  return paletteService;
}));