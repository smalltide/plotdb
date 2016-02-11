function import$(t,e){var n={}.hasOwnProperty;for(var r in e)n.call(e,r)&&(t[r]=e[r]);return t}var x$;x$=angular.module("plotDB"),x$.filter("tags",function(){return function(t){return(t||"").split(",")}}),x$.filter("length",function(){return function(t){var e;return function(){var n=[];for(e in t)n.push(e);return n}().length}}),x$.service("chartService",["$rootScope","sampleChart","IOService","baseService"].concat(function(t,e,n,r){var i,o,a;return i={sample:[],link:function(t){return"/chart/?k="+t.type.location+"|"+t.type.name+"|"+t.key}},o=function(){},o.prototype={name:"untitled",desc:null,tags:null,doc:{name:"document",type:"html",content:e.doc.content},style:{name:"stylesheet",type:"css",content:e.style.content},code:{name:"code",type:"javascript",content:e.code.content},config:{},dimension:{},assets:[],thumbnail:null,isType:!1,addFile:function(t,e,n){var r;return null==n&&(n=null),r={name:t,type:e,content:n},this.assets.push(r),r},removeFile:function(t){var e;return e=this.assets.indexOf(t),0>e?void 0:this.assets.splice(e,1)},updateData:function(){function t(t){return"Number"===t.name}var e,n,r,i,o,a,c,s,u=[];for(this.data=[],e=Math.max.apply(null,function(){var t,e=[];for(n in t=this.dimension)r=t[n],e.push(r);return e}.call(this).reduce(function(t,e){return t.concat(e.fields||[])},[]).filter(function(t){return t.data}).map(function(t){return t.data.length}).concat([0])),i=0;e>i;++i){o=i,a={};for(n in c=this.dimension)r=c[n],a[n]=(s=(r.fields||(r.fields=[]))[0])?(s.data||(s.data=[]))[o]:null,r.type.filter(t).length&&(a[name]=parseFloat(a[name]));u.push(this.data.push(a))}return u}},a=r.derive("chart",i,o)})),x$.controller("chartEditor",["$scope","$http","$timeout","$interval","dataService","chartService","plNotify"].concat(function(t,e,n,r,i,o,a){return import$(t,{showsrc:!0,vis:"preview",lastvis:null,plotdomain:"http://localhost/",error:{msg:null,lineno:0},codemirror:{code:{lineWrapping:!0,lineNumbers:!0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,mode:"xml"},objs:[]},chart:new o.chart,canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow}}),import$(t,{save:function(t){return null==t&&(t=!1),t&&"chart"===this.chart.type.name&&(this.chart.type.name="charttype",this.chart.key=null),this.canvas.window.postMessage({type:"snapshot"},this.plotdomain)},load:function(t,e){var n=this;return o.load(t,e).then(function(t){return import$(n.chart,t)})},"delete":function(){var t=this;if(this.chart.key)return this.chart["delete"]().then(function(){return a.send("success","chart deleted"),t.chart=new o.chart,setTimeout(function(){return window.location.href="/chart/me.html"},1e3)})},dimension:{bind:function(e,n,r){return null==r&&(r={}),r.update().then(function(){return n.fields=[r],t.render()})},unbind:function(t,e,n){var r;return null==n&&(n={}),r=e.fields.indexOf(n),0>r?void 0:e.fields.splice(r,1)}},reset:function(){return this.render()},render:function(e){var n,r,i,o;null==e&&(e=!0),this.chart.updateData();for(n in r=this.chart)i=r[n],"function"!=typeof i&&(this.chart[n]=i);return o=JSON.parse(angular.toJson(this.chart)),r=t.render,r.payload=o,r.rebind=e,e?this.canvas.window.postMessage({type:"reload"},this.plotdomain):this.canvas.window.postMessage({type:"render",payload:o,rebind:e},this.plotdomain)},renderAsync:function(t){var e=this;return null==t&&(t=!0),this.renderAsync.handler&&n.cancel(this.renderAsync.handler),this.renderAsync.handler=n(function(){return e.renderAsync.handler=null,e.render(t)},500)},countline:function(){var t=this;return["code","style","doc"].map(function(e){return t.chart[e].lines=t.chart[e].content.split("\n").length,t.chart[e].size=t.chart[e].content.length})}}),import$(t,{editor:{"class":"",update:function(){return this["class"]=[this.fullscreen.toggled?"fullscreen":"","preview"!==this.vis?"active":"",this.color.modes[this.color.idx]].join(" ")},fullscreen:{toggle:function(){return this.toggled=!this.toggled,t.editor.update()},toggled:!1},color:{modes:["normal","dark"],idx:0,toggle:function(){return this.idx=(this.idx+1)%this.modes.length,t.editor.update()}}},sharePanel:{toggle:function(){return this.toggled=!this.toggled},toggled:!1,setPrivate:function(){return this.isPublic=!1},setPublic:function(){return this.isPublic=!0}},coloredit:{config:function(t,e){return{"class":"no-palette",context:"context"+e,exclusive:!0,palette:[t.value]}}},paledit:{ldcp:null,item:null,init:function(){var e=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change",function(){return setTimeout(function(){return t.$apply(function(){return e.update()})},0)})},update:function(){return this.item?this.item.value=this.ldcp.getPalette():void 0},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(t){return this.item=t,Array.isArray(t.value)&&(t.value={colors:t.value.map(function(t){return{hex:t}})}),this.ldcp.setPalette(t.value),this.toggled=!0}},hidHandler:function(){var e,n=this;return e=function(){return setTimeout(function(){return t.$apply(function(){var t;return t=n.vis,n.vis="preview"===n.vis&&n.lastvis?n.lastvis:"preview"===n.vis?"code":"preview",n.lastvis=t})},0)},t.codemirrored=function(e){return t.codemirror.objs.push(e)},document.body.addEventListener("keydown",function(n){return!n.metaKey&&!n.altKey||13!==n.keyCode&&13!==n.which?void 0:t.$apply(function(){return e()})})},checkParam:function(){var e,n,r,i,o;if(window.location.search&&(e=/[?&]k=([^&#|]+)\|([^&#|]+)\|([^&#|]+)/.exec(window.location.search)))return n=[e[1],e[2],e[3]],r=n[0],i=n[1],o=n[2],"charttype"!==i&&(i="chart"),t.load({name:i,location:r},o)},assets:{read:function(e){return new Promise(function(n){var r,i,o,a,c;return r=(i=/([^/]+\.?[^/.]*)$/.exec(e.name))?i[1]:"unnamed",o="unknown",a=t.chart.addFile(r,o,null),c=new FileReader,c.onload=function(){var e,r,i,o;return e=c.result,r=e.indexOf(";"),i=e.substring(5,r),o=e.substring(r+8),a.type=i,a.content=o,t.$applyAsync(function(){return a.type=i,a.content=o,a}),n(a)},c.readAsDataURL(e)})},handle:function(t){var e,n,r,i=[];for(e=0,n=t.length;n>e;++e)r=t[e],i.push(this.read(r));return i},node:null,init:function(){var t,e=this;return t=this.node=$("#code-editor-assets input"),t.on("change",function(){return e.handle(e.node[0].files)}),t}},monitor:function(){var e=this;return this.assets.init(),this.$watch("vis",function(n){return setTimeout(function(){return e.codemirror.objs.map(function(e){var r,i,o;return r=function(){var e,n=[];for(i in e=t.codemirror)o=e[i],n.push([i,o]);return n}().filter(function(t){return t[1].mode===e.options.mode})[0],r&&n.startsWith(r[0])&&(setTimeout(function(){return e.focus()},10),!r[1].refreshed)?(e.refresh(),setTimeout(function(){return e.refresh()},0),r[1].refreshed=!0):void 0})},0)}),this.$watch("chart.doc.content",function(){return e.countline()}),this.$watch("chart.style.content",function(){return e.countline()}),this.$watch("chart.code.content",function(){return e.countline()}),this.$watch("chart.doc.content",function(){return e.renderAsync()}),this.$watch("chart.style.content",function(){return e.renderAsync()}),this.$watch("chart.code.content",function(t){return e.communicate.parseHandler&&n.cancel(e.communicate.parseHandler),e.communicate.parseHandler=n(function(){return e.communicate.parseHandler=null,e.canvas.window.postMessage({type:"parse",payload:t},e.plotdomain)},500)}),this.$watch("chart.config",function(){return e.renderAsync(!1)},!0)},communicate:function(){var e=this;return window.addEventListener("message",function(n){var r,i,c,s,u,l,d,h,p;if(r=n.data,r&&"object"==typeof r){if("error"===r.type)return t.$apply(function(){return t.error.lineno&&$(".CodeMirror-code > div:nth-of-type("+t.error.lineno+")").removeClass("error"),t.error.msg=(r.payload||(r.payload={})).msg||"",t.error.lineno=(r.payload||(r.payload={})).lineno||0,t.error.lineno?$(".CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error"):void 0});if("alt-enter"===r.type)return t.$apply(function(){return t.vis="code"});if("snapshot"===r.type)return r.payload&&(e.chart.thumbnail=r.payload),e.chart.save().then(function(e){var n;return a.send("success","chart saved"),t.$apply(function(){return import$(t.chart,e)}),n=o.link(t.chart),window.location.search?void 0:window.location.href=n});if("parse"===r.type){i=JSON.parse(r.payload),c=i.config,s=i.dimension;for(u in i=e.chart.dimension)l=i[u],null!=s[u]&&(s[u].fields=l.fields);for(u in i=e.chart.config)l=i[u],null!=c[u]&&(c[u].value=l.value);for(u in c)l=c[u],null==l.value&&(l.value=l["default"]);return i=e.chart,i.config=c,i.dimension=s,t.render()}return"loaded"===r.type?t.render.payload?(d=t.render.payload,h=t.render.rebind,e.canvas.window.postMessage({type:"render",payload:d,rebind:h},e.plotdomain),t.render.payload=null):e.canvas.window.postMessage({type:"parse",payload:e.chart.code.content},e.plotdomain):"click"===r.type?document.dispatchEvent?(p=document.createEvent("MouseEvents"),p.initEvent("click",!0,!0),p.synthetic=!0,document.dispatchEvent(p)):(p=document.createEventObject(),p.synthetic=!0,document.fireEvent("onclick",p)):void 0}},!1)},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init()}}),t.init()})),x$.controller("mychart",["$scope","$http","dataService","chartService"].concat(function(t,e,n,r){return r.list().then(function(e){return t.$apply(function(){return t.mycharts=e,t["goto"]=function(t){return window.location.href=r.link(t)}})})})),x$.controller("chartList",["$scope","$http","dataService","chartService"].concat(function(t,e,n,r){return t.charttypes=[],r.list({name:"charttype",location:"any"}).then(function(e){return t.charttypes=e})}));