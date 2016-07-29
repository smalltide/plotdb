// Generated by LiveScript 1.3.1
angular.module('plotDB').controller('permEdit', ['$scope'].concat(function($scope){
  $scope.spec = {
    permlist: ['list', 'read', 'comment', 'fork', 'write', 'admin'],
    'switch': ['publish', 'protected', 'draft'],
    type: ['user', 'team', 'global'],
    permissionObject: {
      list: {
        perm: "...",
        target: "...",
        type: "..."
      },
      'switch': "..."
    }
  };
  $scope.entities = [];
  $scope.tab = "permission";
  $scope.perm = {
    list: [{
      target: null,
      type: "global",
      perm: "fork",
      displayname: "Everyone",
      username: "and anonymous user"
    }],
    'switch': "draft"
  };
  $scope.original = JSON.stringify($scope.perm);
  $scope.permdefault = [{
    target: null,
    type: "global",
    perm: "fork",
    displayname: "Everyone",
    username: "and anonymous user"
  }];
  $scope.permEdit = {
    list: [],
    detail: [],
    perm: "read"
  };
  $scope.addToken = function(){
    var token;
    token = Math.round(1000000000000000 * Math.random()).toString(36);
    return $scope.perm.list.push({
      target: token,
      type: "token",
      perm: $scope.permEdit.perm,
      displayname: token,
      username: "token"
    });
  };
  $scope.addGlobal = function(){
    var ref$;
    if (!$scope.hasGlobal) {
      (ref$ = $scope.perm).list = ref$.list.concat($scope.permdefault);
      return $scope.hasGlobal = true;
    }
  };
  $scope.removeMember = function(it){
    var idx;
    idx = $scope.perm.list.indexOf(it);
    if (idx < 0) {
      return;
    }
    $scope.perm.list.splice(idx, 1);
    if ($scope.perm.list.length === 0) {
      return $scope.addEveryone();
    } else {
      return $scope.check();
    }
  };
  $scope.addMember = function(){
    var i$, ref$, len$, node, ref1$, type, target, matched, detail, ret, obj;
    for (i$ = 0, len$ = (ref$ = $scope.permEdit.list).length; i$ < len$; ++i$) {
      node = ref$[i$];
      ref1$ = node.split(':'), type = ref1$[0], target = ref1$[1];
      matched = $scope.perm.list.filter(fn$)[0];
      if (matched) {
        matched.perm = $scope.permEdit.perm;
      } else {
        detail = $scope.permEdit.detail.filter(fn1$)[0];
        ret = {
          target: target,
          type: type,
          perm: $scope.permEdit.perm
        };
        if (detail) {
          import$(ret, {
            displayname: detail.displayname,
            username: detail.type,
            avatar: detail.avatar
          });
        }
        $scope.perm.list.push(ret);
      }
    }
    ref$ = $scope.permEdit;
    ref$.detail = [];
    ref$.list = [];
    obj = {
      list: $scope.purify(),
      'switch': $scope.perm['switch']
    };
    if (JSON.stringify(obj) !== $scope.original) {
      return $scope.needSave = true;
    } else {
      return $scope.needSave = false;
    }
    function fn$(it){
      return it.type === type && it.target === +target;
    }
    function fn1$(it){
      return it.id === node;
    }
  };
  $scope.purify = function(){
    return $scope.perm.list.map(function(it){
      var ref$;
      return ref$ = {}, ref$.type = it.type, ref$.target = it.target, ref$.perm = it.perm, ref$;
    });
  };
  $scope.check = function(){
    return $scope.hasGlobal = !!$scope.perm.list.filter(function(it){
      return it.type === 'global';
    }).length;
  };
  return $scope.check();
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}