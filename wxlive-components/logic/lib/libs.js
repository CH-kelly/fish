function r(r){try{var t=r.split("&"),e=Object.create(null),n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var l=a.value.replace("=","&&&").split("&&&");e[l[0]]=l[1]}}catch(r){o=!0,i=r}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return e}catch(r){return{}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports._witHookBefore=function(r,t){return function(){return t.apply(this,arguments),r.apply(this,arguments)}},exports._witHookAfter=function(r,t){return function(){var e=r.apply(this,arguments);return t.apply(this,arguments),e}},exports._randomName=function(r){r=r||23;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",e=t.length,n="",o=0;o<r;o++)n+=t.charAt(Math.floor(Math.random()*e));return(new Date).getTime()+n},exports.MOCKServerGetCgiPath=function(r,t){if(!t)return r;var e=!0,n=!1,o=void 0;try{for(var i,a=t[Symbol.iterator]();!(e=(i=a.next()).done);e=!0){var u=i.value;if(r.indexOf(u)>=0)return r.replace(u,"")}}catch(r){n=!0,o=r}finally{try{!e&&a.return&&a.return()}finally{if(n)throw o}}return r},exports.MOCKServerGetUrlQuery=r,exports.MOCKServerGetUrlQueryValue=function(t){return location?r(location.search.split("?")[1])[t]:""},exports.MOCKServerIsPc=function(){for(var r=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),e=0;v<t.length;e++)if(r.indexOf(t[e])>0)return!0;return!1};