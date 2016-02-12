function import$(t,e){var n={}.hasOwnProperty;for(var a in e)n.call(e,a)&&(t[a]=e[a]);return t}var x$;x$=angular.module("plotDB"),x$.filter("size",function(){return function(t){return!t||isNaN(t)?"0B":1e3>t?t+"B":1048576>t?parseInt(t/102.4)/10+"KB":parseInt(t/104857.6)/10+"MB"}}),x$.service("plUtil",["$rootScope"].concat(function(){var t;return t={format:{size:function(t){return 1e3>t?t+"bytes":1048576>t?parseInt(t/102.4)/10+"KB":parseInt(t/104857.6)/10+"MB"}}}})),x$.service("dataService",["$rootScope","$http","IOService","sampleData","baseService","plUtil","plNotify","eventBus"].concat(function(t,e,n,a,r){var i,s,u,o,l;return i="dataset",s={sample:a,init:function(){var t=this;return this.list().then(function(){return t.localinfo.update()})},localinfo:{rows:0,size:0,update:function(){var t,e,n,a,r=[];for(this.rows=0,this.size=0,t=0,n=(e=s.items).length;n>t;++t)a=e[t],"local"===a.type.location&&(this.rows+=a.rows,r.push(this.size+=a.size));return r}}},u=function(t,e,n){return null==e&&(e=null),null==n&&(n=null),!n&&e&&(n=e.fields.filter(function(e){return e.name===t})[0]),n&&import$(this,n),this.name=t,this._=function(){},e&&(this.dataset={type:e.type,key:e.key},this._.dataset=e),this},u.prototype={dataset:{type:{},key:null,ref:null},name:null,type:null,update:function(){var t=this;return this.getDataset().then(function(e){return t.data=(e.data||(e.data=[])).map(function(e){return e[t.name]}),t.settype()})},getDataset:function(){var t,e=this;return(t=this._.dataset)?Promise.resolve(t):this.dataset.type&&dataset.key?l.load(this.dataset.type,this.dataset.key).then(function(t){var n,a;return a=e.dataset,a.ref=t,n=a,n.type=t.type,n.key=t.key,e.dataset.ref}):Promise.reject(null)},settype:function(){function t(t){return plotdb[i].test(t)}function e(t){return!t}var n,a,r,i;for(n=["Boolean","Percent","Number","Date","String"].concat([null]),a=0,r=n.length;r>a;++a){if(i=n[a],!i)return this.type="String";if(!this.data.map(t).filter(e).length){this.type=i;break}}}},o=function(){var t,e,n,a,r;for(t=[],e=0,a=(n=this.fields||[]).length;a>e;++e)r=n[e],t.push(new u(r.name,this,r));return this.fields=t,this.save=function(){var t=this;return this.fields.map(function(t){var e;return e=t.data,delete t.data,e}),o.prototype.save.call(this).then(function(){return t.fields.map(function(e){var n;return n=e.dataset,n.type=t.type,n.key=t.key,n}),t.update()})},this.load=function(){var t=this;return o.prototype.load.call(this).then(function(){return o.call(t)})},this.update(),this},o.prototype={bind:function(){},update:function(t){var e,n,a,r,i,s,o,l,d=this;null==t&&(t=null),t&&(this.data=t),this.data||(this.data=[]),n=[];for(a in this.data[0])n.push(a);for(e=n,n=[],i=0,s=e.length;s>i;++i)o=i,(l=this.fields[o])||this.fields.push(new u(e[o],this)),this.fields[o].name=e[o],n.push(this.fields[o].update());return r=n,Promise.all(r).then(function(){return d.size=angular.toJson(d.data).length,d.rows=d.data.length})}},l=r.derive(i,s,o)})),x$.controller("dataEditCtrl",["$scope","$timeout","$http","dataService","plUtil","eventBus","plNotify"].concat(function(t,e,n,a,r,i,s){return t.name=null,t.dataset=null,t.save=function(e){var n;return null==e&&(e=!1),t.dataset&&t.dataset.type.location!==(e?"local":"server")?void 0:(t.data.parse(!0),t.dataset||(n={name:t.name,type:{location:e?"local":"server",name:"dataset"},owner:null,permission:{"switch":["public"],value:[]},datatype:"csv"},t.dataset=new a.dataset(n)),t.dataset.name=t.name,t.dataset.update(t.data.parsed).then(function(){return t.dataset.save().then(function(){return t.$apply(function(){return s.send("success","dataset saved")})})}))},t.loadDataset=function(e){var n;return t.dataset=e,t.name=e.name,n=e.fields.map(function(t){return t.name}),t.data.raw=[n.join(",")].concat(e.data.map(function(t){return n.map(function(e){return t[e]}).join(",")})).join("\n")},t.data={init:function(){return t.$watch("data.raw",function(){return t.data.parse()})},reset:function(e){return null==e&&(e=""),t.dataset=null,t.data.raw=e},raw:"",rows:0,size:0,parsed:null,parse:function(t){var n,a=this;return null==t&&(t=!1),n=function(){return t||(a.handler=null),a.parsed=Papa.parse(a.raw,{header:!0}).data,a.rows=a.parsed.length,a.size=a.raw.length},t?n():(this.handler&&e.cancel(this.handler),this.handler=e(function(){return n()},t?0:1e3))}},t.data.init(),t.parser={encoding:"UTF-8",csv:{toggle:function(){return setTimeout(function(){return $("#data-edit-csv-modal").modal("show")},0)},read:function(){var e,n;return e=$("#data-edit-csv-file")[0].files[0],n=new FileReader,n.onload=function(e){return t.$apply(function(){return t.data.reset(e.target.result.trim())}),$("#data-edit-csv-modal").modal("hide")},n.onerror=function(){},n.readAsText(e,t.parser.encoding)}},gsheet:{url:null,toggle:function(){return setTimeout(function(){return $("#data-edit-gsheet-modal").modal("show")},0)},read:function(){var e,a,r;return(e=/\/d\/([^\/]+)/.exec(t.parser.gsheet.url))?(a=e[1],r="https://spreadsheets.google.com/feeds/list/"+a+"/1/public/values?alt=json",n({url:r,method:"GET"}).success(function(e){var n,a,r,i;n={},e.feed.entry.map(function(t){var e,a,r=[];for(e in t)(a=/^gsx\$(.+)$/.exec(e))&&r.push(n[a[1]]=1);return r}),a=[];for(r in n)a.push(r);return n=a,i=[n.join(",")].concat(e.feed.entry.map(function(t){var e;return function(){var a,r,i,s=[];for(a=0,i=(r=n).length;i>a;++a)e=r[a],s.push((t["gsx$"+e]||{$t:""}).$t);return s}().join(",")})),t.$apply(function(){return t.data.reset(i.join("\n"))}),setTimeout(function(){return $("#data-edit-gsheet-modal").modal("hide")},0)})):void 0}},link:{url:null,toggle:function(){return setTimeout(function(){return $("#data-edit-link-modal").modal("show")},0)},read:function(){return n({url:"http://crossorigin.me/"+t.parser.link.url,method:"GET"}).success(function(e){return t.$apply(function(){return t.data.reset(e.trim())}),$("#data-edit-link-modal").modal("hide")})}}},i.listen("dataset.delete",function(e){return t.dataset.key===e?t.dataset=null:void 0}),i.listen("dataset.edit",function(e){return t.loadDataset(e)})})),x$.controller("dataFiles",["$scope","dataService","plNotify","eventBus"].concat(function(t,e,n,a){return t.datasets=e.datasets,e.list().then(function(e){return t.datasets=e,t.edit=function(t){return a.fire("dataset.edit",t)},t.remove=function(e){return e["delete"]().then(function(){return t.$apply(function(){return t.datasets=t.datasets.filter(function(t){return t.key!==e.key})})})}})}));