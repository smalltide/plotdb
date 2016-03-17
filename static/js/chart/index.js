function import$(t,e){var n={}.hasOwnProperty;for(var r in e)n.call(e,r)&&(t[r]=e[r]);return t}function in$(t,e){for(var n=-1,r=e.length>>>0;++n<r;)if(t===e[n])return!0;return!1}var x$;x$=angular.module("plotDB"),x$.filter("tags",function(){return function(t){return Array.isArray(t)?t:(t||"").split(",")}}),x$.filter("date",function(){return function(t){return new Date(t)}}),x$.filter("length",function(){return function(t){var e;return function(){var n=[];for(e in t)n.push(e);return n}().length}}),x$.service("chartService",["$rootScope","$http","sampleChart","IOService","baseService"].concat(function(t,e,n,r,i){var o,a,c;return o={sample:n,link:function(t){return"/chart/?k="+t.type.location.charAt(0)+t.key},thumblink:function(t){return this.sharelink(t)+"/thumb"},sharelink:function(t){return"http://localhost/v/chart/"+t.key}},a=function(){return"string"==typeof this.tags?this.tags=this.tags.split(","):void 0},a.prototype={name:"untitled",desc:null,tags:[],theme:null,doc:{name:"document",type:"html",content:o.sample[0].doc.content},style:{name:"stylesheet",type:"css",content:o.sample[0].style.content},code:{name:"code",type:"javascript",content:o.sample[0].code.content},config:{},dimension:{},assets:[],thumbnail:null,isType:!1,likes:0,parent:null,like:function(t){var n=this;return new Promise(function(r,i){var o;return n.likes=(o=n.likes+(t?1:-1))>0?o:0,e({url:"/d/chart/"+n.key+"/like",method:"PUT"}).success(function(){return r()}).error(function(){var e;return n.likes=(e=n.likes-(t?1:-1))>0?e:0,i()})})},addFile:function(t,e,n){var r;return null==n&&(n=null),r={name:t,type:e,content:n},this.assets.push(r),r},removeFile:function(t){var e;return e=this.assets.indexOf(t),0>e?void 0:this.assets.splice(e,1)},updateData:function(){function t(t){return(t.data||(t.data=[]))[s]}function e(t){return t.name}function n(t){return"Number"===t.name}function r(t){return parseFloat(t)}var i,o,a,c,s,l,u,h,d=[];for(this.data=[],i=Math.max.apply(null,function(){var t,e=[];for(o in t=this.dimension)a=t[o],e.push(a);return e}.call(this).reduce(function(t,e){return t.concat(e.fields||[])},[]).filter(function(t){return t.data}).map(function(t){return t.data.length}).concat([0])),c=0;i>c;++c){s=c,l={};for(o in u=this.dimension)a=u[o],a.multiple?(l[o]=(a.fields||(a.fields=[])).length?(a.fields||(a.fields=[])).map(t):[],a.fieldName=(a.fields||(a.fields=[])).map(e)):(l[o]=(h=(a.fields||(a.fields=[]))[0])?(h.data||(h.data=[]))[s]:null,a.fieldName=(h=(a.fields||(a.fields=[]))[0])?h.name:null),a.type.filter(n).length&&(l[o]=Array.isArray(l[o])?l[o].map(r):parseFloat(l[o]));d.push(this.data.push(l))}return d}},c=i.derive("chart",o,a)})),x$.controller("chartEditor",["$scope","$http","$timeout","$interval","dataService","chartService","paletteService","themeService","plNotify"].concat(function(t,n,r,i,o,a,c,s,l){return import$(t,{theme:null,showsrc:!0,vis:"preview",lastvis:null,plotdomain:"http://localhost/",error:{msg:null,lineno:0},codemirror:{code:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"xml"},objs:[]},chart:new a.chart,canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow}}),import$(t,{_save:function(n){var i,o,c;return null==n&&(n=!1),this.chart.owner!==t.user.data.key&&(i="server"===this.chart.type.location?this.chart.key:null,o=this.chart,o.key=null,o.owner=null,o.permission=a.chart.prototype.permission,i&&(this.chart.parent=i)),c=this.chart.key?!1:!0,Array.isArray(this.chart.tags)||(this.chart.tags=this.chart.tags.split(",")),this.chart.save().then(function(){return t.$apply(function(){var e;return n?l.send("warning","chart saved, but thumbnail failed to update"):l.send("success","chart saved"),e=a.link(t.chart),(c||!window.location.search)&&(window.location.href=e),t.save.handle&&r.cancel(t.save.handle),t.save.handle=null})})["catch"](function(n){return t.$apply(function(){return l.aux.error.io("save","chart",e),console.error("[save chart]",n),t.save.handle&&r.cancel(t.save.handle),t.save.handle=null})})},save:function(){var e=this;if(!t.user.data||!t.user.data.key)return t.auth.toggle(!0);if(!this.save.handle)return this.save.handle=r(function(){return e.save.handle=null,e._save(!0)},3e3),this.canvas.window.postMessage({type:"snapshot"},this.plotdomain)},clone:function(){var t,e;return this.chart.name=this.chart.name+" - Copy",t="server"===this.chart.type.location?this.chart.key:null,e=this.chart,e.key=null,e.owner=null,e.parent=t,e.permission=a.chart.prototype.permission,this.save()},load:function(t,e){var n=this;return a.load(t,e).then(function(t){return n.chart=new a.chart(import$(n.chart,t)),n.backup.check()})["catch"](function(t){return console.error(t),l.send("error","failed to load chart. please try reloading"),"forbidden"===t[1]?window.location.href=window.location.pathname:void 0})},"delete":function(){var t=this;if(this.chart.key)return this["delete"].handle=!0,this.chart["delete"]().then(function(){return l.send("success","chart deleted"),t.chart=new a.chart,setTimeout(function(){return window.location.href="/chart/me.html"},1e3),t["delete"].handle=!1})["catch"](function(){return l.send("error","failed to delete chart"),t["delete"].handle=!1})},resetConfig:function(){var t,e,n,r=[];for(t in e=this.chart.config)n=e[t],r.push(n.value=n["default"]);return r},migrate:function(){var e,n=this;if(this.chart.key)return e=this.chart.clone(),e.type.location="local"===this.chart.type.location?"server":"local",e.save().then(function(){return n.chart["delete"]().then(function(){return t.chart=e,window.location.href=a.link(t.chart)})})},dimension:{bind:function(e,n,r){return null==r&&(r={}),r.update().then(function(){return n.multiple?(n.fields||(n.fields=[])).push(r):n.fields=[r],t.render()})["catch"](function(t){return l.send("error","failed to bind field. try again later."),console.error("chart.ls / dimension field binding failed due to : ",t)})},unbind:function(e,n,r){var i;return null==r&&(r={}),i=n.fields.indexOf(r),0>i?void 0:(n.fields.splice(i,1),t.render())}},reset:function(){return this.render()},render:function(e){var n,r,i,o;null==e&&(e=!0),this.chart.updateData();for(n in r=this.chart)i=r[n],"function"!=typeof i&&(this.chart[n]=i);return o=JSON.parse(angular.toJson({theme:this.theme,chart:this.chart})),r=t.render,r.payload=o,r.rebind=e,e?this.canvas.window.postMessage({type:"reload"},this.plotdomain):this.canvas.window.postMessage({type:"render",payload:o,rebind:e},this.plotdomain)},renderAsync:function(t){var e=this;return null==t&&(t=!0),this.renderAsync.handler&&r.cancel(this.renderAsync.handler),this.renderAsync.handler=r(function(){return e.renderAsync.handler=null,e.render(t)},500)},countline:function(){var t=this;return["code","style","doc"].map(function(e){return t.chart[e].lines=t.chart[e].content.split("\n").length,t.chart[e].size=t.chart[e].content.length})},download:{prepare:function(){var e=this;return["svg","png","plotdb"].map(function(n){return setTimeout(function(){return t.$apply(function(){return[e[n].url="",e[n]()]})},300)})},svg:function(){return t.canvas.window.postMessage({type:"getsvg"},t.plotdomain)},png:function(){return t.canvas.window.postMessage({type:"getpng"},t.plotdomain)},plotdb:function(){var e;return e=angular.toJson(t.chart),this.plotdb.url=URL.createObjectURL(new Blob([e],{type:"application/json"})),this.plotdb.size=e.length}},colorblind:function(e){var n;return n=["normal","protanopia","protanomaly","deuteranopia","deuteranomaly","tritanopia","tritanomaly","achromatopsia","achromatomaly"],in$(e,n)?this.canvas.window.postMessage({type:"colorblind-emu",payload:e},t.plotdomain):void 0}}),import$(t,{backup:{enabled:!1,init:function(){var e=this;return t.$watch("chart",function(){return e.enabled?(e.handle&&r.cancel(e.handle),e.handle=r(function(){return e.handle=null,t.chart.backup().then(function(){})},2e3)):void 0},!0)},recover:function(){var e=this;if(this.last&&this.last.object)return t.chart.recover(this.last.object),this.enabled=!1,t.chart.cleanBackups().then(function(){return t.$apply(function(){return e.check()})})},check:function(){var e=this;return t.chart.backups().then(function(n){return t.$apply(function(){return e.list=n,e.last=n[0],r(function(){return e.enabled=!0},4e3)})["catch"](function(t){return console.error("fecth backup failed: #",t)})})}},themes:{list:s.sample,set:function(e){return t.theme=e},init:function(){var e=this;return s.list().then(function(n){return t.$apply(function(){return e.list=n})})}},editor:{"class":"",focus:function(){return setTimeout(function(){return t.codemirror.objs.map(function(e){var n,r,i;return n=function(){var e,n=[];for(r in e=t.codemirror)i=e[r],n.push([r,i]);return n}().filter(function(t){return t[1].mode===e.options.mode})[0],n&&t.vis.startsWith(n[0])&&(setTimeout(function(){return e.focus()},10),!n[1].refreshed)?(e.refresh(),n[1].refreshed=!0,setTimeout(function(){return e.refresh(),t.error.lineno?$("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error"):void 0},0)):void 0})},0)},update:function(){return this["class"]=[this.fullscreen.toggled?"fullscreen":"","preview"!==this.vis?"active":"",this.color.modes[this.color.idx]].join(" ")},fullscreen:{toggle:function(){return this.toggled=!this.toggled,t.editor.update(),t.editor.focus()},toggled:!1},color:{modes:["normal","dark"],idx:0,toggle:function(){return this.idx=(this.idx+1)%this.modes.length,t.editor.update()}}},settingPanel:{toggle:function(){return this.toggled=!this.toggled},toggled:!1},sharePanel:{social:{facebook:null},isForkable:function(){var e,n,r;return e=(n=t.chart.permission).value||(n.value=[]),r=!!e.filter(function(t){return"fork"===t.perm&&"public"===t["switch"]}).length},init:function(){var e=this;return["#chartedit-sharelink","#chartedit-embedcode"].map(function(n){var r;return r=new Clipboard(n),r.on("success",function(){return $(n).tooltip({title:"copied",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),r.on("error",function(){return $(n).tooltip({title:"Press Ctrl+C to Copy",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),t.$watch("sharePanel.link",function(n){var r,i,o,c,s,l,u;return e.embedcode='<iframe src="'+n+'"><iframe>',e.thumblink=a.thumblink(t.chart),r={app_id:"1546734828988373",display:"popup",caption:t.chart.name,picture:e.thumblink,link:e.link,name:t.chart.name,redirect_uri:"http://plotdb.com/",description:t.chart.desc||""},e.social.facebook=["https://www.facebook.com/dialog/feed?"].concat(function(){var t,e=[];for(i in t=r)o=t[i],e.push(i+"="+encodeURIComponent(o));return e}()).join("&"),c={url:e.link,media:e.thumblink,description:t.chart.desc||""},e.social.pinterest=["https://www.pinterest.com/pin/create/button/?"].concat(function(){var t,e=[];for(i in t=c)o=t[i],e.push(i+"="+encodeURIComponent(o));return e}()).join("&"),s={subject:"plotdb: "+t.chart.name,body:t.chart.desc+" : "+e.link},e.social.email=["mailto:?"].concat(function(){var t,e=[];for(i in t=s)o=t[i],e.push(i+"="+encodeURIComponent(o));return e}()).join("&"),l={mini:!0,url:e.link,title:t.chart.name+" on PlotDB",summary:t.chart.desc,source:"plotdb.com"},e.social.linkedin=["http://www.linkedin.com/shareArticle?"].concat(function(){var t,e=[];for(i in t=l)o=t[i],e.push(i+"="+encodeURIComponent(o));return e}()).join("&"),u={url:e.link,text:t.chart.name+" - "+(t.chart.desc||""),hashtags:"dataviz,chart,visualization",via:"plotdb"},e.social.twitter=["http://twitter.com/intent/tweet?"].concat(function(){var t,e=[];for(i in t=u)o=t[i],e.push(i+"="+encodeURIComponent(o));return e}()).join("&")}),t.$watch("sharePanel.forkable",function(n){var r;return r=e.isForkable(),r!==e.forkable&&null!=e.forkable?(t.chart.permission.value=n?[{"switch":"public",perm:"fork"}]:[],e.saveHint=!0):void 0}),t.$watch("chart.permission.value",function(){var t;return t=e.isForkable(),e.forkable!==t&&null!=e.forkable&&(e.saveHint=!0),e.forkable=t},!0)})},saveHint:!1,embedcode:"",link:"",toggle:function(){return this.init&&this.init(),this.init=null,this.toggled=!this.toggled,this.saveHint=!1},toggled:!1,isPublic:function(){return in$("public",t.chart.permission["switch"])},setPrivate:function(){var e;return((e=t.chart).permission||(e.permission={}))["switch"]=["private"],this.saveHint=!0},setPublic:function(){var e;return((e=t.chart).permission||(e.permission={}))["switch"]=["public"],this.saveHint=!0}},coloredit:{config:function(t,e){return{"class":"no-palette",context:"context"+e,exclusive:!0,palette:[t.value]}}},paledit:{convert:function(t){return t.map(function(t){return{id:t.key||Math.random()+"",text:t.name,data:t.colors}})},ldcp:null,item:null,fromTheme:function(t){var e,n,r;return t&&t.config&&t.config.palette?(e=this.list.filter(function(t){return"Theme"===t.text})[0],e||(e={text:"Theme",id:"456",children:null},this.list=[e].concat(this.list)),e.children=this.convert(function(){var e,i=[];for(n in e=t.config.palette)r=e[n],i.push((r.name=n,r));return i}()),$("#pal-select option").remove(),$("#pal-select optgroup").remove(),$("#pal-select").select2({allowedMethods:["updateResults"],templateResult:function(t){var e,n;return t.data?(e=function(){var e,r,i,o=[];for(e=0,i=(r=t.data).length;i>e;++e)n=r[e],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/t.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+t.text+"</div>"+("<div class='palette-color'>"+e+"</div></div>"))):t.text},data:this.list})):this.list=this.list.filter(function(t){return"Theme"!==t.text})},init:function(){var e,n,r=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change-palette",function(){return setTimeout(function(){return t.$apply(function(){return r.update()})},0)}),this.list=[{text:"Default",id:"123",children:this.convert(c.sample)}],e=$("#pal-select"),e.select2(n={allowedMethods:["updateResults"],templateResult:function(t){var e,n;return t.data?(e=function(){var e,r,i,o=[];for(e=0,i=(r=t.data).length;i>e;++e)n=r[e],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/t.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+t.text+"</div>"+("<div class='palette-color'>"+e+"</div></div>"))):t.text},data:this.list}),e.on("select2:closing",function(e){function n(t){return t.id===$(e.target).val()}var i,o,a,c,s;for(i=0,a=(o=r.list).length;a>i&&(c=o[i],!(s=c.children.filter(n)[0]));++i);if(s)return t.$apply(function(){return r.item.value=JSON.parse(JSON.stringify({colors:s.data}))}),r.ldcp.setPalette(r.item.value)}),e},update:function(){function t(t){return t.hex===c.hex}var e,n,r,i,o,a,c,s,l,u;if(this.item){for(e=this.item.value,n=this.ldcp.getPalette(),r=[],i=0,a=(o=e.colors).length;a>i;++i)c=o[i],s=n.colors.filter(t)[0],s&&n.colors.splice(n.colors.indexOf(s),1),s||r.push(c);for(i=0,l=r.length;l>i;++i)u=i,r[u].hex=(n.colors[u]||{}).hex;return e.colors=n.colors.concat(e.colors).filter(function(t){return t.hex})}},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(t){return this.item=t,this.ldcp.setPalette(t.value),this.toggled=!0}},switchPanel:function(){var e=this;return setTimeout(function(){return t.$apply(function(){var n;return n=e.vis,e.vis="preview"!==e.vis||e.lastvis&&"preview"!==e.lastvis?"preview"===e.vis?e.lastvis:"preview":"code",e.lastvis=n,t.codemirror.objs.forEach("preview"===e.vis?function(t){return t.getInputField().blur()}:function(t){return t.refresh()})})},0)},hidHandler:function(){var e=this;return t.codemirrored=function(e){return t.codemirror.objs.push(e)},document.body.addEventListener("keydown",function(n){return!n.metaKey&&!n.altKey||13!==n.keyCode&&13!==n.which?void 0:t.$apply(function(){return e.switchPanel()})})},checkParam:function(){var e,n,r,i;if(window.location.search){if("?demo"===window.location.search)return t.chart.doc.content=a.sample[1].doc.content,t.chart.style.content=a.sample[1].style.content,void(t.chart.code.content=a.sample[1].code.content);if(e=/[?&]k=([sl])([^&#|?]+)/.exec(window.location.search))return n=e[2],r=["s"===e[1]?"server":"local",e[2]],i=r[0],n=r[1],t.load({name:"chart",location:i},n)}},assets:{measure:function(){return t.chart.assets.size=t.chart.assets.map(function(t){return t.content.length}).reduce(function(t,e){return t+e},0)},preview:function(t){var e,n;return this.preview.toggled=!0,e=["data:",t.type,";charset=utf-8;base64,",t.content].join(""),n=document.createElement("iframe"),$("#assets-preview .iframe")[0].innerHTML="<iframe></iframe>",$("#assets-preview .iframe iframe")[0].src=e},read:function(e){return new Promise(function(n){var r,i,o,a,c;return r=(i=/([^/]+\.?[^/.]*)$/.exec(e.name))?i[1]:"unnamed",o="unknown",a=t.chart.addFile(r,o,null),c=new FileReader,c.onload=function(){var e,r,i,o,s;return e=c.result,r=e.indexOf(";"),i=e.substring(5,r),o=e.substring(r+8),s=t.chart.assets.map(function(t){return(t.content||"").length}).reduce(function(t,e){return t+e},0)+o.length,s>3e6&&t.$apply(function(){l.alert("Assets size limit (3MB) exceeded. won't upload."),t.chart.removeFile(a)}),a.type=i,a.content=o,t.$applyAsync(function(){return a.type=i,a.content=o,a}),n(a)},c.readAsDataURL(e)})},handle:function(t){var e,n,r,i=[];for(e=0,n=t.length;n>e;++e)r=t[e],i.push(this.read(r));return i},node:null,init:function(){var t,e=this;return t=this.node=$("#code-editor-assets input"),t.on("change",function(){return e.handle(e.node[0].files)}),t}},monitor:function(){var e=this;return this.assets.init(),this.$watch("vis",function(){return t.editor.focus()}),this.$watch("chart.assets",function(){return e.assets.measure()},!0),this.$watch("chart.doc.content",function(){return e.countline()}),this.$watch("chart.style.content",function(){return e.countline()}),this.$watch("chart.code.content",function(){return e.countline()}),this.$watch("chart.doc.content",function(){return e.renderAsync()}),this.$watch("chart.style.content",function(){return e.renderAsync()}),this.$watch("theme",function(t){return e.renderAsync(),e.chart.theme=t?t.key:null}),this.$watch("chart.theme",function(t){return e.theme=e.themes.list.filter(function(e){return e.key===t})[0]}),this.$watch("chart.code.content",function(t){return e.communicate.parseHandler&&r.cancel(e.communicate.parseHandler),e.communicate.parseHandler=r(function(){return e.communicate.parseHandler=null,e.canvas.window.postMessage({type:"parse",payload:t},e.plotdomain)},500)}),this.$watch("theme.code.content",function(t){return e.theme?(e.communicate.parseThemeHandler&&r.cancel(e.communicate.parseThemeHandler),e.communicate.parseThemeHandler=r(function(){return e.communicate.parseThemeHandler=null,e.canvas.window.postMessage({type:"parse-theme",payload:t},e.plotdomain)},500)):void 0}),this.$watch("chart.config",function(t,n){var r,i,o;return null==n&&(n={}),r=!!function(){var e,n=[];for(i in e=t)o=e[i],n.push([i,o]);return n}().filter(function(t){var e,r;return e=t[0],r=t[1],!n[e]||r.value!==n[e].value}).map(function(){return o.rebindOnChange}).filter(function(t){return t}).length,e.renderAsync(r)},!0),this.$watch("chart.key",function(){return e.sharePanel.link=a.sharelink(e.chart)}),t.limitscroll($("#data-fields")[0]),t.limitscroll($("#chart-configs")[0])},communicate:function(){var e=this;return window.addEventListener("message",function(n){var r;return r=n.data,t.$apply(function(){var n,i,o,a,c,s,l,u,h,d,f,p,m,v,g,y,w;if(r&&"object"==typeof r)if("error"===r.type){if($("#code-editor-code .CodeMirror-code > .error").removeClass("error"),t.error.msg=(r.payload||(r.payload={})).msg||"",t.error.lineno=(r.payload||(r.payload={})).lineno||0,t.error.lineno)return $("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error")}else{if("alt-enter"===r.type)return t.switchPanel();if("snapshot"===r.type)return r.payload&&(e.chart.thumbnail=r.payload),e._save();if("parse"===r.type){n=JSON.parse(r.payload),i=n.config,o=n.dimension;for(a in n=e.chart.dimension)c=n[a],null!=o[a]&&(o[a].fields=c.fields);for(a in n=e.chart.config)c=n[a],null!=i[a]&&(i[a].value=c.value);for(a in i)c=i[a],null==c.value&&(c.value=c["default"]);return n=e.chart,n.config=i,n.dimension=o,t.render()}if("parse-theme"===r.type){if(i=JSON.parse(r.payload).config,e.theme.config=i,e.chart){for(a in n=e.chart.config)c=n[a],c._bytheme&&delete e.chart.config[a];for(a in n=e.theme.config)c=n[a],s=e.chart.config[a]?e.chart.config[a].hint:"default",l=null!=e.theme.config[a][s]?e.theme.config[a][s]:null!=e.theme.config[a]["default"]?e.theme.config[a]["default"]:"object"!=typeof e.theme.config[a]?e.theme.config[a]:void 0,e.chart.config[a]&&e.chart.config[a].value?e.chart.config[a].value=l:e.chart.config[a]={value:l,type:[],_bytheme:!0}}return e.paledit.fromTheme(e.theme),t.render()}if("loaded"===r.type){if(t.render.payload)return u=t.render.payload,h=t.render.rebind,e.canvas.window.postMessage({type:"render",payload:u,rebind:h},e.plotdomain),t.render.payload=null;if(e.canvas.window.postMessage({type:"parse",payload:e.chart.code.content},e.plotdomain),e.theme)return e.canvas.window.postMessage({type:"parse-theme",payload:e.theme.code.content},e.plotdomain)}else{if("click"===r.type)return document.dispatchEvent?(d=document.createEvent("MouseEvents"),d.initEvent("click",!0,!0),d.synthetic=!0,document.dispatchEvent(d)):(d=document.createEventObject(),d.synthetic=!0,document.fireEvent("onclick",d));if("getsvg"===r.type)return r.payload?(t.download.svg.url=URL.createObjectURL(new Blob([r.payload],{type:"image/svg+xml"})),t.download.svg.size=r.payload.length):t.download.svg.url="#";if("getpng"===r.type){if(!r.payload)return t.download.png.url="#";if(f=atob(r.payload.split(",")[1]),p=r.payload.split(",")[0].split(":")[1].split(";")[0],"image/png"!==p)return t.download.png.url="#";for(m=new ArrayBuffer(f.length),v=new Uint8Array(m),g=0,y=f.length;y>g;++g)w=g,v[w]=f.charCodeAt(w);return t.download.png.url=URL.createObjectURL(new Blob([m],{type:"image/png"})),t.download.png.size=f.length}}}})},!1)},fieldAgent:{init:function(){var t=this;return $("#field-agent").on("mousewheel",function(){return t.setPosition()})},data:null,drag:{ging:!1,start:function(){return this.ging=!0},end:function(){return this.ging=!1}},setPosition:function(){var t,e,n;if(this.node)return t=this.node.getBoundingClientRect(),e=this.node.parentNode.parentNode.getBoundingClientRect(),n={left:$("#data-fields").scrollLeft(),top:$("#data-fields").scrollTop()},$("#field-agent").css({top:t.top-e.top+55-n.top+"px",left:t.left-e.left-n.left+"px",width:t.width+"px",height:t.height+"px"})},setProxy:function(t,e){var n,r,i=this;if(!this.drag.ging){for(n=[e,t.target],this.data=n[0],r=n[1];!(r.getAttribute("class").indexOf("data-field")>=0);)if(r=r.parentNode,"body"===r.nodeName.toLowerCase())return;return setTimeout(function(){return i.node=r,i.setPosition()},0)}}},settings:{changed:function(e,n){var r,i,o;return r=[t.chart[n],$(e).val()],i=r[0],o=r[1],Array.isArray(i)?(r=[i,o].map(function(t){return(t||[]).join(",")}),i=r[0],o=r[1],i!==o):i!==o},bind:function(e,n,r){var i=this;return null==r&&(r={}),$(e).select2(),$(e).select2(r).on("change",function(){return i.changed(e,n)?setTimeout(function(){return t.$apply(function(){return t.chart[n]=$(e).val()})},0):void 0}),t.$watch("chart."+n,function(t){var o,a,c,s,l;if(o="",r.tags){for(a=0,s=(c=t||[]).length;s>a;++a)l=c[a],o+=$("<option></option>").val(l).text(l)[0].outerHTML;$(e).html(o)}return i.changed(e,n)?$(e).val(t).trigger("change"):void 0})},init:function(){return this.bind($("#chart-setting-type"),"basetype"),this.bind($("#chart-setting-encoding"),"visualencoding"),this.bind($("#chart-setting-category"),"category"),this.bind($("#chart-setting-tags"),"tags",{tags:!0,tokenSeparators:[","," "]})}},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init(),this.backup.init(),this.fieldAgent.init(),this.themes.init(),this.settings.init()}}),t.init()})),x$.controller("mychart",["$scope","$http","dataService","chartService"].concat(function(t,e,n,r){return r.list().then(function(e){return t.$apply(function(){return t.charts=e,t["goto"]=function(t){return window.location.href=r.link(t)}})})})),x$.controller("chartList",["$scope","$http","IOService","dataService","chartService","plNotify"].concat(function(t,e,n,r,i,o){return t.like=function(e){var n,r,i,a;if(e)return n=(r=(i=t.user.data).likes||(i.likes={})).chart||(r.chart={}),a=n[e.key]=!n[e.key],e.like(a)["catch"](function(){return o.error("Can't do favorite. try again later?"),n[e.key]=!a})},t.charts=[],Promise.all([new Promise(function(t,e){return n.aux.listLocally({name:"chart"},t,e)}),new Promise(function(t,e){return n.aux.listRemotely({name:"chart"},t,e,"q=all")})]).then(function(e){return t.$apply(function(){var n,r,o,a,c,s,l=[];for(t.charts=e[0].concat(e[1]).map(function(t){return new i.chart(t)}),n=!1,r=0,o=t.charts.length;o>r;++r)a=r,c=t.charts[a],s=320,Math.random()>.6&&!n&&(s=Math.random()>.8?960:640,n=!0),a%3===2&&(n||(s=640),n=!1),l.push(c.width=s);return l})})}));