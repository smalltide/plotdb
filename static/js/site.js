function import$(e,t){var n={}.hasOwnProperty;for(var o in t)n.call(t,o)&&(e[o]=t[o]);return e}var x$;x$=angular.module("plotDB"),x$.config(["$compileProvider"].concat(function(e){return e.aHrefSanitizationWhitelist(/^\s*(blob:|https?:\/\/plotdb\.com\/)|#/)})),x$.service("eventBus",["$rootScope"].concat(function(){var e;return e=import$(this,{queues:{},handlers:{},process:function(e){var t,n,o,r,a,i=this;if(null==e&&(e=null),e)t=[[e,(r=this.queues)[e]||(r[e]=[])]];else{n=[];for(o in r=this.queues)a=r[o],n.push([o,a]);t=n}return t.map(function(t){var n,o,r,a,u,s,l,c,h;if(n=t[0],o=t[1],o&&o.length){for(r=0,u=(a=i.handlers[n]||[]).length;u>r;++r)for(s=a[r],l=0,c=o.length;c>l;++l)h=o[l],s(h);return((a=i.queues)[e]||(a[e]=[])).splice(0,((a=i.queues)[e]||(a[e]=[])).length)}})},listen:function(e,t){var n;return((n=this.handlers)[e]||(n[e]=[])).push(t),this.process(e)},fire:function(e,t){var n;return((n=this.queues)[e]||(n[e]=[])).push(t),this.process(e)}})})),x$.service("plNotify",["$rootScope","$timeout"].concat(function(e,t){return import$(this,{queue:[],send:function(e,n){var o,r=this;return this.queue.push(o={type:e,message:n}),t(function(){return r.queue.splice(r.queue.indexOf(o),1)},2900)}})})),x$.controller("plSite",["$scope","$http","$interval","global","plNotify","dataService"].concat(function(e,t,n,o,r,a){var i,u,s,l,c,h;for(e.trackEvent=function(e,t,n,o){return ga("send","event",e,t,n,o)},e.notifications=r.queue,e.nexturl=(i=/nexturl=([^&]+)/.exec(window.location.search||""))?i[1]:window.location.href,e.user={data:o.user},e.dataService=a,e.auth={email:"",passwd:"",show:!1,stick:!1,failed:"",keyHandler:function(e){return 13===e.keyCode?this.login():void 0},logout:function(){return console.log("logout.."),t({url:"/u/logout",method:"GET"}).success(function(){return console.log("logouted."),e.user.data=null,window.location.reload()}).error(function(){return r.send("danger","Failed to Logout. ")})},login:function(){var n=this;return t({url:"/u/login",method:"POST",data:$.param({email:this.email,passwd:this.passwd}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(t){return e.auth.failed="",e.user.data=t,"undefined"!=typeof ga&&null!==ga&&ga("set","&uid",t.key),n.show=!1,e.nexturl?window.location.href=e.nexturl:"/u/login"===window.location.pathname?window.location.href="/":window.location.reload()}).error(function(t,n){return e.auth.failed=403===n?(t.message||(t.message=[])).length?t.message[0]:"email or password incorrect":"system error, please try later"}),this.passwd=""}},e.$watch("auth.show",function(e){return setTimeout(function(){return $("#authpanel").modal(e?"show":"hide")},0)}),window.addEventListener("scroll",function(){var e;return e=$(window).scrollTop(),60>e?$("#nav-top").removeClass("dim"):$("#nav-top").addClass("dim")}),e.charts=[],u=JSON.parse(localStorage.getItem("/list/charttype")),s=0,l=u.length;l>s;++s)c=u[s],h=JSON.parse(localStorage.getItem("/charttype/"+c)),e.charts.push(h);return e.load=function(e){return window.location.href="/chart/?k="+((e.type||(e.type={})).name||"local")+"|charttype|"+e.key}}));