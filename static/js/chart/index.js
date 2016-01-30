function import$(t,n){var e={}.hasOwnProperty;for(var r in n)e.call(n,r)&&(t[r]=n[r]);return t}var x$;x$=angular.module("plotDB"),x$.filter("tags",function(){return function(t){return(t||"").split(",")}}),x$.filter("length",function(){return function(t){var n;return function(){var e=[];for(n in t)e.push(n);return e}().length}}),x$.service("chartService",["$rootScope","sampleChart","IOService"].concat(function(t,n,e){var r,i;return r=function(t){return null==t&&(t={}),import$(this,t)},r.prototype={name:"untitled",desc:null,tags:null,owner:null,key:null,type:{name:"chart",location:"server"},doc:{name:"document",type:"html",content:n.doc.content},style:{name:"stylesheet",type:"css",content:n.style.content},code:{name:"code",type:"javascript",content:n.code.content},permission:{"switch":[],value:[]},config:{},dimension:{},assets:[],thumbnail:null,isType:!1,save:function(){var t=this;return i.save(this).then(function(n){return import$(t,n)})},sync:function(){var t=this;return i.load(this.type,this.key).then(function(n){return import$(t,n)})},updateData:function(){function t(t){return"Number"===t.name}var n,e,r,i,o,a,c,u,s=[];for(this.data=[],n=Math.max.apply(null,function(){var t,n=[];for(e in t=this.dimension)r=t[e],n.push(r);return n}.call(this).reduce(function(t,n){return t.concat(n.fields||[])},[]).filter(function(t){return t.data}).map(function(t){return t.data.length}).concat([0])),i=0;n>i;++i){o=i,a={};for(e in c=this.dimension)r=c[e],a[e]=(u=(r.fields||(r.fields=[]))[0])?(u.data||(u.data=[]))[o]:null,r.type.filter(t).length&&(a[name]=parseFloat(a[name]));s.push(this.data.push(a))}return s}},i={init:function(){},create:function(t){return new r(t)},save:function(t){return e.save(t)},load:function(t,n){return e.load(t,n)},list:function(t,n){return null==t&&(t={name:"chart",location:"any"}),null==n&&(n={}),e.list(t)},sample:n},i.init(),i})),x$.controller("chartEditor",["$scope","$http","$timeout","$interval","dataService","chartService","plNotify"].concat(function(t,n,e,r,i,o,a){return import$(t,{showsrc:!0,vis:"preview",lastvis:null,plotdomain:"http://localhost/",error:null,codemirror:{code:{lineWrapping:!0,lineNumbers:!0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,mode:"xml"},objs:[]},chart:o.create(),canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow}}),import$(t,{save:function(t){return null==t&&(t=!1),t&&"chart"===this.chart.type.name&&(this.chart.type.name="charttype",this.chart.key=null),this.canvas.window.postMessage({type:"snapshot"},this.plotdomain)},load:function(n,e){var r=this;return o.load(n,e).then(function(n){return t.$apply(function(){return import$(r.chart,n)})})},dimension:{bind:function(n,e,r){var o;return null==r&&(r={}),(o=i.find(r))?(i.field.update(r),e.fields=[r],t.render()):void 0},unbind:function(t,n,e){var r;return null==e&&(e={}),r=n.fields.indexOf(e),0>r?void 0:n.fields.splice(r,1)}},render:function(){var t,n,e;this.chart.updateData();for(t in n=this.chart)e=n[t],"function"!=typeof e&&(this.chart[t]=e);return this.canvas.window.postMessage({type:"render",payload:this.chart},this.plotdomain)},countline:function(){var t=this;return["code","style","doc"].map(function(n){return t.chart[n].lines=t.chart[n].content.split("\n").length,t.chart[n].size=t.chart[n].content.length})}}),import$(t,{paledit:{ldcp:null,item:null,init:function(){var n=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change",function(){return setTimeout(function(){return t.$apply(function(){return n.update()})},0)})},update:function(){return this.item?this.item.value=this.ldcp.getPalette():void 0},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(t){return this.item=t,Array.isArray(t.value)&&(t.value={colors:t.value.map(function(t){return{hex:t}})}),this.ldcp.setPalette(t.value),this.toggled=!0}},hidHandler:function(){var n,e=this;return n=function(){return setTimeout(function(){return t.$apply(function(){var t;return t=e.vis,e.vis="preview"===e.vis&&e.lastvis?e.lastvis:"preview"===e.vis?"code":"preview",e.lastvis=t})},0)},t.codemirrored=function(n){return t.codemirror.objs.push(n)},document.body.addEventListener("keydown",function(e){return!e.metaKey&&!e.altKey||13!==e.keyCode&&13!==e.which?void 0:t.$apply(function(){return n()})})},checkParam:function(){var n,e,r,i,o;if(window.location.search&&(n=/[?&]k=([^&#|]+)\|([^&#|]+)\|([^&#|]+)/.exec(window.location.search)))return e=[n[1],n[2],n[3]],r=e[0],i=e[1],o=e[2],"charttype"!==i&&(i="chart"),t.load({name:i,location:r},o)},monitor:function(){var t=this;return this.$watch("vis",function(){return setTimeout(function(){return t.codemirror.objs.map(function(t){return t.refresh()})},0)}),this.$watch("chart.doc.content",function(){return t.countline()}),this.$watch("chart.style.content",function(){return t.countline()}),this.$watch("chart.code.content",function(){return t.countline()}),this.$watch("chart.doc.content",function(){return t.render()}),this.$watch("chart.style.content",function(){return t.render()}),this.$watch("chart.code.content",function(n){return t.canvas.window.postMessage({type:"parse",payload:n},t.plotdomain)}),this.$watch("chart.config",function(){return t.render()},!0)},communicate:function(){var n=this;return window.addEventListener("message",function(e){var r,i,o,c,u,s;if(r=e.data,r&&"object"==typeof r){if("error"===r.type)return t.$apply(function(){return t.error=r.payload});if("alt-enter"===r.type)return t.$apply(function(){return t.vis="code"});if("snapshot"===r.type)return n.chart.thumbnail=r.payload,n.chart.save().then(function(n){return a.send("success","chart saved"),t.$apply(function(){return import$(t.chart,n)})});if("parse"===r.type){i=JSON.parse(r.payload),o=i.config,c=i.dimension;for(u in i=n.chart.dimension)s=i[u],null!=c[u]&&(c[u].fields=s.fields);for(u in i=n.chart.config)s=i[u],null!=o[u]&&(o[u].value=s.value);for(u in o)s=o[u],null==s.value&&(s.value=s["default"]);return i=n.chart,i.config=o,i.dimension=c,t.render()}return"loaded"===r.type?n.canvas.window.postMessage({type:"parse",payload:n.chart.code.content},n.plotdomain):void 0}},!1)},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init()}}),t.init()})),x$.controller("mychart",["$scope","$http","dataService","chartService"].concat(function(t,n,e,r){return r.list().then(function(n){return t.$apply(function(){return t.mycharts=n,t["goto"]=function(t){return window.location.href="/chart/?k="+t.type.location+"|"+t.type.name+"|"+t.key}})})})),x$.controller("chartList",["$scope","$http","dataService","chartService"].concat(function(t,n,e,r){return t.charttypes=[],r.list({name:"charttype",location:"any"}).then(function(n){return t.charttypes=n})}));