var sched;sched={timeout:{list:[],func:window.setTimeout,set:function(e,t){return this.func.call(null,e,t)}},interval:{list:[],func:window.setInterval,set:function(e,t){return this.func.call(null,e,t)}},clear:function(){var e,t,n,o,a=[];for(e=0,n=(t=this.timeout.list).length;n>e;++e)o=t[e],clearTimeout(o);for(e=0,n=(t=this.interval.list).length;n>e;++e)o=t[e],a.push(clearInterval(o));return a}},window.setTimeout=function(e,t){var n;return n=sched.timeout.set(e,t),sched.timeout.list.push(n),n},window.setInterval=function(e,t){var n;return n=sched.interval.set(e,t),sched.interval.list.push(n),n},$(document).ready(function(){var plotdomain,dispatcher,errorHandling,parse,snapshot,render;return plotdomain="http://localhost/",dispatcher=function(e){return"snapshot"===e.data.type?snapshot():"render"===e.data.type?render(e.data.payload,e.data.rebind):"parse"===e.data.type?parse(e.data.payload):void 0},errorHandling=function(e){var t,n;return t=e?typeof e!=typeof{}?e+"":e.stack?e.stack:e.toString():"plot failed with unknown error",t.length>1024&&(t=t.substring(0,1024)+"..."),n=t.split("\n"),n.length>4&&(t=n.splice(0,4).join("\n")),window.parent.postMessage({type:"error",payload:t},plotdomain)},parse=function(payload){var chart,ref$,e;try{return eval(payload),chart=module.exports,payload=JSON.stringify((ref$={},ref$.dimension=chart.dimension,ref$.config=chart.config,ref$)),window.parent.postMessage({type:"parse",payload:payload},plotdomain)}catch(e$){return e=e$,errorHandling(e)}},snapshot=function(){var e,t,n;return e=document.createElement("canvas"),document.body.appendChild(e),t=document.getElementById("container").innerHTML,canvg(e,t),n=e.toDataURL(),window.parent.postMessage({type:"snapshot",payload:n},plotdomain)},render=function(payload,rebind){var code,style,doc,data,config,ret,root,chart,k,v,i$,ref$,len$,type,e;null==rebind&&(rebind=!0),code=payload.code.content,style=payload.style.content,doc=payload.doc.content,data=payload.data,config=payload.config||{},sched.clear();try{rebind&&($(document.body).html("<style type='text/css'>"+style+"</style><div id='container'>"+doc+"</div>"),window.module={},eval(code),window.module=module),root=document.getElementById("container"),chart=module.exports;for(k in config)for(v=config[k],i$=0,len$=(ref$=v.type).length;len$>i$;++i$){type=ref$[i$],type=plotdb[type.name];try{if(type.test&&type.parse&&type.test(v.value)){v.value=type.parse(v.value);break}}catch(e$){e=e$,console.log("plotdb type parsing error: "+type.name),console.log(e.stack+"")}}for(k in ref$=chart.config)v=ref$[k],config[k]=null==config[k]||null==config[k].value?v["default"]:config[k].value;return rebind&&(chart.init&&chart.init(root,data,config),chart.bind(root,data,config)),chart.resize(root,data,config),chart.render(root,data,config),window.parent.postMessage({type:"error",payload:""},plotdomain)}catch(e$){return e=e$,errorHandling(e)}},window.addEventListener("message",dispatcher,!1),window.addEventListener("keydown",function(e){return!e.metaKey&&!e.altKey||13!==e.keyCode&&13!==e.which?void 0:window.parent.postMessage({type:"alt-enter"},plotdomain)}),window.parent.postMessage({type:"loaded"},plotdomain)});