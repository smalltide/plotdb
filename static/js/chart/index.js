function import$(t,n){var e={}.hasOwnProperty;for(var r in n)e.call(n,r)&&(t[r]=n[r]);return t}var x$;x$=angular.module("plotDB"),x$.filter("tags",function(){return function(t){return(t||"").split(",")}}),x$.filter("length",function(){return function(t){var n;return function(){var e=[];for(n in t)e.push(n);return e}().length}}),x$.service("chartService",["$rootScope","sampleChart","IOService","baseService"].concat(function(t,n,e,r){var i,o,a;return i={sample:[],link:function(t){return"/chart/?k="+t.type.location+"|"+t.type.name+"|"+t.key}},o=function(){},o.prototype={name:"untitled",desc:null,tags:null,doc:{name:"document",type:"html",content:n.doc.content},style:{name:"stylesheet",type:"css",content:n.style.content},code:{name:"code",type:"javascript",content:n.code.content},config:{},dimension:{},assets:[],thumbnail:null,isType:!1,addFile:function(t,n,e){var r;return null==e&&(e=null),r={name:t,type:n,content:e},this.assets.push(r),r},removeFile:function(t){var n;return n=this.assets.indexOf(t),0>n?void 0:this.assets.splice(n,1)},updateData:function(){function t(t){return"Number"===t.name}var n,e,r,i,o,a,c,s,u=[];for(this.data=[],n=Math.max.apply(null,function(){var t,n=[];for(e in t=this.dimension)r=t[e],n.push(r);return n}.call(this).reduce(function(t,n){return t.concat(n.fields||[])},[]).filter(function(t){return t.data}).map(function(t){return t.data.length}).concat([0])),i=0;n>i;++i){o=i,a={};for(e in c=this.dimension)r=c[e],a[e]=(s=(r.fields||(r.fields=[]))[0])?(s.data||(s.data=[]))[o]:null,r.type.filter(t).length&&(a[name]=parseFloat(a[name]));u.push(this.data.push(a))}return u}},a=r.derive("chart",i,o)})),x$.controller("chartEditor",["$scope","$http","$timeout","$interval","dataService","chartService","plNotify"].concat(function(t,n,e,r,i,o,a){return import$(t,{showsrc:!0,vis:"preview",lastvis:null,plotdomain:"http://localhost/",error:null,codemirror:{code:{lineWrapping:!0,lineNumbers:!0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,mode:"xml"},objs:[]},chart:new o.chart,canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow}}),import$(t,{save:function(t){return null==t&&(t=!1),t&&"chart"===this.chart.type.name&&(this.chart.type.name="charttype",this.chart.key=null),this.canvas.window.postMessage({type:"snapshot"},this.plotdomain)},load:function(t,n){var e=this;return o.load(t,n).then(function(t){return import$(e.chart,t)})},"delete":function(){var t=this;if(this.chart.key)return this.chart["delete"]().then(function(){return a.send("success","chart deleted"),t.chart=new o.chart,setTimeout(function(){return window.location.href="/chart/me.html"},1e3)})},dimension:{bind:function(n,e,r){return null==r&&(r={}),r.update().then(function(){return e.fields=[r],t.render()})},unbind:function(t,n,e){var r;return null==e&&(e={}),r=n.fields.indexOf(e),0>r?void 0:n.fields.splice(r,1)}},reset:function(){return this.render()},render:function(n){var e,r,i,o;null==n&&(n=!0),this.chart.updateData();for(e in r=this.chart)i=r[e],"function"!=typeof i&&(this.chart[e]=i);return o=JSON.parse(angular.toJson(this.chart)),r=t.render,r.payload=o,r.rebind=n,n?this.canvas.window.postMessage({type:"reload"},this.plotdomain):this.canvas.window.postMessage({type:"render",payload:o,rebind:n},this.plotdomain)},renderAsync:function(t){var n=this;return null==t&&(t=!0),this.renderAsync.handler&&e.cancel(this.renderAsync.handler),this.renderAsync.handler=e(function(){return n.renderAsync.handler=null,n.render(t)},500)},countline:function(){var t=this;return["code","style","doc"].map(function(n){return t.chart[n].lines=t.chart[n].content.split("\n").length,t.chart[n].size=t.chart[n].content.length})}}),import$(t,{editor:{"class":"",update:function(){return this["class"]=[this.fullscreen.toggled?"fullscreen":"",this.color.modes[this.color.idx]].join(" ")},fullscreen:{toggle:function(){return this.toggled=!this.toggled,t.editor.update()},toggled:!1},color:{modes:["normal","dark"],idx:0,toggle:function(){return this.idx=(this.idx+1)%this.modes.length,t.editor.update()}}},sharePanel:{toggle:function(){return this.toggled=!this.toggled},toggled:!1,setPrivate:function(){return this.isPublic=!1},setPublic:function(){return this.isPublic=!0}},coloredit:{config:function(t,n){return{"class":"no-palette",context:"context"+n,exclusive:!0,palette:[t.value]}}},paledit:{ldcp:null,item:null,init:function(){var n=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change",function(){return setTimeout(function(){return t.$apply(function(){return n.update()})},0)})},update:function(){return this.item?this.item.value=this.ldcp.getPalette():void 0},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(t){return this.item=t,Array.isArray(t.value)&&(t.value={colors:t.value.map(function(t){return{hex:t}})}),this.ldcp.setPalette(t.value),this.toggled=!0}},hidHandler:function(){var n,e=this;return n=function(){return setTimeout(function(){return t.$apply(function(){var t;return t=e.vis,e.vis="preview"===e.vis&&e.lastvis?e.lastvis:"preview"===e.vis?"code":"preview",e.lastvis=t})},0)},t.codemirrored=function(n){return t.codemirror.objs.push(n)},document.body.addEventListener("keydown",function(e){return!e.metaKey&&!e.altKey||13!==e.keyCode&&13!==e.which?void 0:t.$apply(function(){return n()})})},checkParam:function(){var n,e,r,i,o;if(window.location.search&&(n=/[?&]k=([^&#|]+)\|([^&#|]+)\|([^&#|]+)/.exec(window.location.search)))return e=[n[1],n[2],n[3]],r=e[0],i=e[1],o=e[2],"charttype"!==i&&(i="chart"),t.load({name:i,location:r},o)},assets:{read:function(n){return new Promise(function(e){var r,i,o,a,c;return r=(i=/([^/]+\.?[^/.]*)$/.exec(n.name))?i[1]:"unnamed",o="unknown",a=t.chart.addFile(r,o,null),c=new FileReader,c.onload=function(){var n,r,i,o;return n=c.result,r=n.indexOf(";"),i=n.substring(5,r),o=n.substring(r+8),a.type=i,a.content=o,t.$applyAsync(function(){return a.type=i,a.content=o,a}),e(a)},c.readAsDataURL(n)})},handle:function(t){var n,e,r,i=[];for(n=0,e=t.length;e>n;++n)r=t[n],i.push(this.read(r));return i},node:null,init:function(){var t,n=this;return t=this.node=$("#code-editor-assets input"),t.on("change",function(){return n.handle(n.node[0].files)}),t}},monitor:function(){var n=this;return this.assets.init(),this.$watch("vis",function(e){return setTimeout(function(){return n.codemirror.objs.map(function(n){var r,i,o;return r=function(){var n,e=[];for(i in n=t.codemirror)o=n[i],e.push([i,o]);return e}().filter(function(t){return t[1].mode===n.options.mode})[0],r&&e.startsWith(r[0])&&(setTimeout(function(){return n.focus()},10),!r[1].refreshed)?(n.refresh(),setTimeout(function(){return n.refresh()},0),r[1].refreshed=!0):void 0})},0)}),this.$watch("chart.doc.content",function(){return n.countline()}),this.$watch("chart.style.content",function(){return n.countline()}),this.$watch("chart.code.content",function(){return n.countline()}),this.$watch("chart.doc.content",function(){return n.renderAsync()}),this.$watch("chart.style.content",function(){return n.renderAsync()}),this.$watch("chart.code.content",function(t){return n.communicate.parseHandler&&e.cancel(n.communicate.parseHandler),n.communicate.parseHandler=e(function(){return n.communicate.parseHandler=null,n.canvas.window.postMessage({type:"parse",payload:t},n.plotdomain)},500)}),this.$watch("chart.config",function(){return n.renderAsync(!1)},!0)},communicate:function(){var n=this;return window.addEventListener("message",function(e){var r,i,c,s,u,l,d,h,p;if(r=e.data,r&&"object"==typeof r){if("error"===r.type)return t.$apply(function(){return t.error=r.payload});if("alt-enter"===r.type)return t.$apply(function(){return t.vis="code"});if("snapshot"===r.type)return n.chart.thumbnail=r.payload,n.chart.save().then(function(n){var e;return a.send("success","chart saved"),t.$apply(function(){return import$(t.chart,n)}),e=o.link(t.chart),window.location.search?void 0:window.location.href=e});if("parse"===r.type){i=JSON.parse(r.payload),c=i.config,s=i.dimension;for(u in i=n.chart.dimension)l=i[u],null!=s[u]&&(s[u].fields=l.fields);for(u in i=n.chart.config)l=i[u],null!=c[u]&&(c[u].value=l.value);for(u in c)l=c[u],null==l.value&&(l.value=l["default"]);return i=n.chart,i.config=c,i.dimension=s,t.render()}return"loaded"===r.type?t.render.payload?(d=t.render.payload,h=t.render.rebind,n.canvas.window.postMessage({type:"render",payload:d,rebind:h},n.plotdomain),t.render.payload=null):n.canvas.window.postMessage({type:"parse",payload:n.chart.code.content},n.plotdomain):"click"===r.type?document.dispatchEvent?(p=document.createEvent("MouseEvents"),p.initEvent("click",!0,!0),p.synthetic=!0,document.dispatchEvent(p)):(p=document.createEventObject(),p.synthetic=!0,document.fireEvent("onclick",p)):void 0}},!1)},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init()}}),t.init()})),x$.controller("mychart",["$scope","$http","dataService","chartService"].concat(function(t,n,e,r){return r.list().then(function(n){return t.$apply(function(){return t.mycharts=n,t["goto"]=function(t){return window.location.href=r.link(t)}})})})),x$.controller("chartList",["$scope","$http","dataService","chartService"].concat(function(t,n,e,r){return t.charttypes=[],r.list({name:"charttype",location:"any"}).then(function(n){return t.charttypes=n})}));