var plotdomain;plotdomain="http://localhost/",window.addEventListener("click",function(){return window.parent.postMessage({type:"click",payload:""},plotdomain)}),$(document).ready(function(){var e,t,n,o,r,a,i;return e=function(e){var t;return"snapshot"===(t=e.data.type)||"getsvg"===t||"getpng"===t?r(e.data.type):"render"===e.data.type?a(e.data.payload,e.data.rebind):"parse"===e.data.type?o(e.data.payload):"reload"===e.data.type?window.location.reload():void 0},window.addEventListener("error",function(e){var t,o,r;return t=/blobhttp:%3A\/\/[^:]+:/,o=e.error.stack,t.exec(o)?(o=o.split(t).join("line "),r=e.message+" at line "+(e.lineno-1)+".",e.message.indexOf(o)<0&&(r+=" Callstack: \n"+o)):r=e.message+" at line "+(e.lineno-1)+".",n(r,e.lineno-1)}),t=function(e,t){return null==t&&(t=!0),new Promise(function(n){var o,r,a;return window.errorMessage="",o=t?"module":"moduleLocal",e="(function() { "+e+"; window."+o+" = module; })();",window.codeURL=r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=document.createElement("script"),a.onload=function(){var e;URL.revokeObjectURL(r),n(window[o]);try{return document.body.removeChild(a)}catch(t){return e=t}},a.src=r,document.body.appendChild(a)})},n=function(e,t){var n,o,r,a;return null==t&&(t=0),n=e?typeof e!=typeof{}?e+"":e.stack?e.stack:e.toString():"plot failed with unknown error",o=/blob:http%3A\/\/[^:]+:/,o.exec(n)&&(n=n.split(o).join("line ")),t||(r=/line (\d+):\d+/.exec(n),t=r?parseInt(r[1]):0),n.length>1024&&(n=n.substring(0,1024)+"..."),a=n.split("\n"),a.length>4&&(n=a.splice(0,4).join("\n")),window.parent.postMessage({type:"error",payload:{msg:n,lineno:t}},plotdomain)},o=function(e){var o;try{return t(e,!1).then(function(e){var t,n,o;return t=e.exports,n=JSON.stringify((o={},o.dimension=t.dimension,o.config=t.config,o)),window.parent.postMessage({type:"parse",payload:n},plotdomain)})}catch(r){return o=r,n(o)}},r=function(e){var t,n,o,r,a,i,d,l,s,c,u,p;null==e&&(e="snapshot");try{for(d3.selectAll("#container svg").each(function(){var e,t,n;return e=this.getBoundingClientRect(),t=e.width,n=e.height,d3.select(this).attr({xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:t,height:n})}),t=document.querySelector("#container svg"),n=t.querySelectorAll("style"),o=0,r=n.length;r>o;++o)a=o,i=n[a],i.generated&&t.removeChild(i);for(n=document.body.querySelectorAll("#wrapper > style"),o=n.length-1;o>=0;--o)a=o,i=n[a].cloneNode(!0),i.generated=!0,t.insertBefore(i,t.childNodes[0]);return d=t.getBoundingClientRect(),l=d.width,s=d.height,c=t.outerHTML,"getsvg"===e?window.parent.postMessage({type:"getsvg",payload:c},plotdomain):(u=new Image,u.onload=function(){var t,n;return n=document.createElement("canvas"),n.width=l,n.height=s,t=n,t.getContext("2d").drawImage(u,0,0),window.parent.postMessage({type:e,payload:t.toDataURL()},plotdomain)},u.src="data:image/svg+xml;charset=utf-8;base64,"+btoa(c))}catch(w){return p=w,console.log(p),window.parent.postMessage({type:e,payload:null},plotdomain)}},a=function(e,o){var r,a,i,d,l,s,c,u,p,w,g,m,h;null==o&&(o=!0),r=["code","style","doc"].map(function(t){return(e.chart||(e.chart={}))[t].content}),a=r[0],i=r[1],d=r[2],r=["data","assets"].map(function(t){return e.chart[t]}),l=r[0],s=r[1],c=e.chart.dimension||{},u=e.chart.config||{},p=e.theme||{},w=!window.module||!window.module.inited||window.module.execError,w&&sched.clear();try{return w?(g=document.getElementById("wrapper"),g||(g=document.createElement("div"),g.setAttribute("id","wrapper"),document.body.appendChild(g)),$(g).html(["<style type='text/css'>/* <![CDATA[ */"+i+"/* ]]> */</style>",(p.style||(p.style={})).content?"<style type='text/css'>/* <![CDATA[ */"+p.style.content+"/* ]]> */</style>":void 0,"<div id='container'>","<div style='height:0'>&nbsp;</div>",d,(p.doc||(p.doc={})).content?p.doc.content:void 0,"</div>"].join("")),m=t(a)):m=Promise.resolve(window.module),m.then(function(e){var t,n,r,a,i,d,p,g,m,h,y,v,f,b,x,L,k,E;window.module=e,t=document.getElementById("container"),n=e.exports,l&&l.length||!n.sample||(l=n.sample);for(r in a=u)for(i=a[r],d=0,g=(p=i.type).length;g>d;++d){m=p[d],m=plotdb[m.name];try{if(m.test&&m.parse&&m.test(i.value)){i.value=m.parse(i.value);break}}catch(A){h=A,console.log("plotdb type parsing error: "+m.name),console.log(h.stack+"")}}for(r in a=n.config)i=a[r],u[r]=null==u[r]||null==u[r].value?i["default"]:u[r].value;for(n.assets=y={},d=0,g=(a=s).length;g>d;++d){for(v=a[d],f=atob(v.content),b=new Uint8Array(f.length),x=0,L=f.length;L>x;++x)k=x,b[k]=f.charCodeAt(k);v.blob=new Blob([b],{type:v.type}),v.url=URL.createObjectURL(v.blob),v.datauri=["data:",v.type,";charset=utf-8;base64,",v.content].join(""),y[v.name]=v}return n.config=u,(o||w||!n.root||!n.data)&&(n.root=t,n.data=l,n.dimension=c),E=Promise.resolve(),w&&n.init&&(E=E.then(function(){var t;return console.log("[debug] init module... reboot: "+w+" / rebind: "+o+" / inited: "+e.inited),console.log("[debug] chart: ",n),console.log("[debug] init module... chart: ",n),console.log("[debug] init module... module: ",e),t=e.inited?null:n.init(),e.inited=!0,t})),E.then(function(){return n.resize(),(o||w)&&n.bind(),n.render(),e.execError=!1,window.parent.postMessage({type:"error",payload:window.errorMessage||""},plotdomain)})})["catch"](function(e){return module.execError=!0,n(e)})}catch(y){return h=y,n(h)}},window.addEventListener("message",e,!1),i=null,window.addEventListener("resize",function(){return i&&clearTimeout(i),i=setTimeout(function(){var e;return i=null,window.module&&window.module.exports?(e=window.module.exports,e.resize(),e.render()):void 0},700)}),window.addEventListener("keydown",function(e){return!e.metaKey&&!e.altKey||13!==e.keyCode&&13!==e.which?void 0:window.parent.postMessage({type:"alt-enter"},plotdomain)}),window.parent.postMessage({type:"loaded"},plotdomain)});