function e(e,r,o){return new Promise(function(s,n){(0,t.default)({url:e,type:o,data:r,dataType:"json",success:function(e,t){s(e,t)},fail:function(e){n(e)}})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.MOCKServerStraightOut=exports.MOCKServerGetConfigs=exports.XMLHttpRequestNew=exports.XMLHttpRequest=exports.MOCKServerAjaxCommon=void 0;var t=function(e){return e&&e.__esModule?e:{default:e}}(require("./ajax.js")),r=require("./libs.js"),o={};exports.MOCKServerAjaxCommon=e,exports.XMLHttpRequest=function(){return window.XMLHttpRequest},exports.XMLHttpRequestNew=function(){var t=window.XMLHttpRequest;t.prototype.open=(0,r._witHookAfter)(t.prototype.open,function(e,t){var r=this;this._url=t,this._method=e,this.addEventListener("readystatechange",function(){r._readyState=r.readyState,r._status=r.status,r._statusText=r.statusText,r._response=r.response,r._responseURL=r.responseURL,r._responseType=r.responseType,r._responseXML=r.responseXML,r._responseText=r.responseText,r._onreadystatechange()})}),t.prototype._onreadystatechange=function(){if(4===this._readyState&&this._url.indexOf(o.requestTargetOriginal)<0&&"record"===o.actionType){if(!(0,r.MOCKServerGetUrlQueryValue)("rtx"))return void alert("页面url参数需有有rtx。例如：weixin.qq.com/a?rtx=gabyliu");console.log("testcase path"),console.log(o.configsFrom+"__"+(0,r._randomName)(5)),console.log("this._response"),console.log(this._response);var t=JSON.stringify({path:o.configsFrom+"__"+(0,r._randomName)(5),testCase:this._response});console.log("MOCKServerXMLHttpRequestOriginConfigs.requestRecordTargetOriginal"),console.log(o.requestRecordTargetOriginal),e(o.requestRecordTargetOriginal,{rtx:(0,r.MOCKServerGetUrlQueryValue)("rtx"),date:Date.parse(new Date),contentType:this.getResponseHeader("content-type"),method:this._method,from:o.configsFrom,project:JSON.stringify({path:o.configsTarget}),cgi:JSON.stringify({path:(0,r.MOCKServerGetCgiPath)(this._url.split("?")[0],o.configsOriginal)}),reqdata:JSON.stringify(this._reqData),testcase:t},"POST")}},t.prototype.send=(0,r._witHookBefore)(t.prototype.send,function(e){var t=this._url.split("?")[1];this._reqData={body:arguments[0]?(0,r.MOCKServerGetUrlQuery)(arguments[0]):{},query:t?(0,r.MOCKServerGetUrlQuery)(t):{}}}),console.log("XMLHttpRequestNew end")},exports.MOCKServerGetConfigs=function(e){o=e},exports.MOCKServerStraightOut=function(){if("record"===o.actionType&&o.configsGetStraightOut){if(!(0,r.MOCKServerGetUrlQueryValue)("rtx"))return void alert("页面url参数需有有rtx。例如：weixin.qq.com/a?rtx=gabyliu");var t=Object.assign((0,r.MOCKServerGetUrlQuery)(o.configsGetStraightOut),(0,r.MOCKServerGetUrlQuery)(location.href.split("?")[1]));e(location.href.split("?")[0],t,"GET")}};