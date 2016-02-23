function import$(t,e){var n={}.hasOwnProperty;for(var o in e)n.call(e,o)&&(t[o]=e[o]);return t}var x$;x$=angular.module("plotDB"),x$.config(["$compileProvider"].concat(function(t){return t.aHrefSanitizationWhitelist(/^\s*(blob:|https?:\/\/plotdb\.com\/|http:\/\/localhost\/|https:\/\/www\.facebook\.com\/|https:\/\/www\.pinterest\.com\/|mailto:\?|http:\/\/www\.linkedin\.com\/|http:\/\/twitter\.com\/)|#/)})),x$.service("eventBus",["$rootScope"].concat(function(){var t;return t=import$(this,{queues:{},handlers:{},process:function(t){var e,n,o,r,i,a=this;if(null==t&&(t=null),t)e=[[t,(r=this.queues)[t]||(r[t]=[])]];else{n=[];for(o in r=this.queues)i=r[o],n.push([o,i]);e=n}return e.map(function(e){var n,o,r,i,s,u,l,c,d;if(n=e[0],o=e[1],o&&o.length){for(r=0,s=(i=a.handlers[n]||[]).length;s>r;++r)for(u=i[r],l=0,c=o.length;c>l;++l)d=o[l],u(d);return((i=a.queues)[t]||(i[t]=[])).splice(0,((i=a.queues)[t]||(i[t]=[])).length)}})},listen:function(t,e){var n;return((n=this.handlers)[t]||(n[t]=[])).push(e),this.process(t)},fire:function(t,e){var n;return((n=this.queues)[t]||(n[t]=[])).push(e),this.process(t)}})})),x$.service("plNotify",["$rootScope","$timeout"].concat(function(t,e){var n;return n=import$(this,{queue:[],send:function(t,n){var o,r=this;return this.queue.push(o={type:t,message:n}),e(function(){return r.queue.splice(r.queue.indexOf(o),1)},2900)},alert:function(t){return this.alert.msg=t,this.alert.toggled=!0}}),(this.aux||(this.aux={})).error={io:function(t,e,o){return!o||o.length<3?n.send("error",t+" failed."):400===o[2]?n.send("error",t+" failed: malformat "+e+"."):403===o[2]?n.send("error",t+" failed: permissions denied."):404===o[2]?n.send("error",t+" failed: "+e+" doesn't exist."):413===o[2]?n.send("error",t+" failed: "+e+" is too large."):n.send("error",t+" failed.")}},this})),x$.controller("plSite",["$scope","$http","$interval","global","plNotify","dataService","chartService"].concat(function(t,e,n,o,r,i,a){var s;return t.trackEvent=function(t,e,n,o){return ga("send","event",t,e,n,o)},t.notifications=r.queue,t.alert=r.alert,t.nexturl=(s=/nexturl=([^&]+)/.exec(window.location.search||""))?s[1]:window.location.href,t.user={data:o.user},t.dataService=i,t.limitscroll=function(t){var e;return e=function(t){return t.stopPropagation(),t.preventDefault(),t.cancelBubble=!0,t.returnValue=!1,!1},t.addEventListener("mousewheel",function(t){var n,o,r,i,a,s,u;return n=this.getBoundingClientRect(),o=n.height,r={height:this.scrollHeight,top:this.scrollTop},r.height<=o?void 0:(i=t.deltaY,a=!1,s=!1,!t.target||"field-agent"!==t.target.id&&"field-agent"!==t.target.parentNode.id||(u=[!0,!0],s=u[0],a=u[1]),s?$(this).scrollTop(r.top+t.deltaY):-t.deltaY>r.top?($(this).scrollTop(0),a=!0):t.deltaY>0&&r.height-o-r.top<=0&&(a=!0),a?e(t):void 0)})},t.scrollto=function(t){return null==t&&(t=null),setTimeout(function(){var e;return e=t?$(t).offset().top-60:0,$(document.body).animate({scrollTop:e},"500","swing",function(){})},0)},t.auth={email:"",passwd:"",show:!1,stick:!1,toggle:function(t){return this.show=null!=t?!!t:!this.show},failed:"",keyHandler:function(t){return 13===t.keyCode?this.login():void 0},logout:function(){return console.log("logout.."),e({url:"/u/logout",method:"GET"}).success(function(){return console.log("logouted."),t.user.data=null,window.location.reload()}).error(function(){return r.send("danger","Failed to Logout. ")})},login:function(){var n=this;return e({url:"/u/login",method:"POST",data:$.param({email:this.email,passwd:this.passwd}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(e){return t.auth.failed="",t.user.data=e,"undefined"!=typeof ga&&null!==ga&&ga("set","&uid",e.key),n.show=!1,t.nexturl?window.location.href=t.nexturl:"/u/login"===window.location.pathname?window.location.href="/":window.location.reload()}).error(function(e,n){return t.auth.failed=403===n?(e.message||(e.message=[])).length?e.message[0]:"email or password incorrect":"system error, please try later"}),this.passwd=""}},t.$watch("auth.show",function(t){return setTimeout(function(){return $("#authpanel").modal(t?"show":"hide")},0)}),$("#authpanel").on("shown.bs.modal",function(){return t.$apply(function(){return t.auth.show=!0})}),$("#authpanel").on("hidden.bs.modal",function(){return t.$apply(function(){return t.auth.show=!1})}),window.addEventListener("scroll",function(){var t;return t=$(window).scrollTop(),60>t?($("#nav-top").removeClass("dim"),$("#subnav-top").removeClass("dim")):($("#nav-top").addClass("dim"),$("#subnav-top").addClass("dim"))}),t.load=function(t){return window.location.href=a.link(t)}}));