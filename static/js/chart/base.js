function import$(e,t){var r={}.hasOwnProperty;for(var n in t)r.call(t,n)&&(e[n]=t[n]);return e}function in$(e,t){for(var r=-1,n=t.length>>>0;++r<n;)if(e===t[r])return!0;return!1}var plotdb;plotdb={},import$(plotdb,{Number:{name:"Number",test:function(e){return!isNaN(+e)},level:3,parse:function(e){return parseFloat(e)}},String:{name:"String",test:function(){return!0},level:1,parse:function(e){return e}},Date:{name:"Date",level:2,test:function(e){var t;return t=new Date(e),t instanceof Date&&!isNaN(t.getTime())?!0:!1},parse:function(e){return new Date(e)}},Choice:function(e){return{name:"Choice",level:4,test:function(t){return e&&e.length&&in$(t,e)},values:e}},Percent:{name:"Percent",level:3,test:function(e){return!!/[0-9.]+%/.exec(e)}},Color:{name:"Color",level:4,test:function(e){return!/(rgba?|hsla?)\([0-9.,]+\)|#[0-9a-f]{3,6}|[a-z0-9]+/.exec(e.trim())}},Palette:{name:"Palette",level:5,re:/^((rgb|hsl)\((\s*[0-9.]+\s*,){2}\s*[0-9.]+\s*\)|(rgb|hsl)a\((\s*[0-9.]+\s*,){3}\s*[0-9.]+\s*\)|\#[0-9a-f]{3}|\#[0-9a-f]{6}|[a-zA-Z][a-zA-Z0-9]*)$/,test:function(e){var t,r=this;if(!e)return!0;if("string"==typeof e)if("["!==e.charAt(0))e=e.split(",");else try{e=JSON.parse(e)}catch(n){return t=n,!1}else{if(Array.isArray(e))return e.filter(function(e){return!r.re.exec(e.trim())}).length?!1:!0;if("object"==typeof e){if(null==e.colors)return!0;if(e.colors.filter(function(e){return!e.hex}).length)return!0}}return!1},parse:function(e){var t;if(!e)return e;if(Array.isArray(e))return e;if("string"==typeof e)try{return JSON.parse(e)}catch(r){return t=r,e.split(",").map(function(e){return{hex:e.trim()}})}return e},"default":["#1d3263","#226c87","#f8d672","#e48e11","#e03215","#ab2321"].map(function(e){return{hex:e}})},Boolean:{name:"Boolean",level:2,test:function(e){return!!/^(true|false|1|0|yes|no)$/.exec(e)},parse:function(e){return e&&"string"==typeof e?/^(yes|true)$/.exec(e.trim())?!0:/\d+/.exec(e.trim())&&"0"!==e.trim()?!0:!1:e?!0:!1}}}),plotdb.chart={corelib:{},create:function(e){return import$(import$({},this.base),e)},base:{name:"base",title:"chart template",desc:null,mapping:{value:{type:[],require:!1}},config:{padding:{type:[plotdb.Number],"default":10}},init:function(){},bind:function(){},resize:function(){},render:function(){}}};