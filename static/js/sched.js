var sched;sched={timeout:{list:[],func:window.setTimeout,set:function(e,t){return this.func.call(null,e,t)}},interval:{list:[],func:window.setInterval,set:function(e,t){return this.func.call(null,e,t)}},clear:function(){var e,t,n,i,a=[];for(e=0,n=(t=this.timeout.list).length;n>e;++e)i=t[e],clearTimeout(i);for(e=0,n=(t=this.interval.list).length;n>e;++e)i=t[e],clearInterval(i);for(e=0,n=(t=this.animateframe.list).length;n>e;++e)i=t[e],a.push(window.cancelAnimationFrame(i));return a},animateframe:{list:[],func:window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,set:function(e){return this.func.call(window,e)}}},window.setTimeout=function(e,t){var n;return n=sched.timeout.set(e,t),sched.timeout.list.push(n),n},window.setInterval=function(e,t){var n;return n=sched.interval.set(e,t),sched.interval.list.push(n),n},window.requestAnimationFrame=function(e){var t;return t=sched.animateframe.set(e),sched.animateframe.list.push(t),t},delete window.mozRequestAnimationFrame,delete window.webkitRequestAnimationFrame,delete window.msRequestAnimationFrame;