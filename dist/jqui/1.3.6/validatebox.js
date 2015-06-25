define("jqui/1.3.6/validatebox",["import-style/1.0.0/index"],function(require,exports,module){require("jqui/1.3.6/parser"),require("jqui/1.3.6/validatebox.css.js"),require("jqui/1.3.6/tooltip"),function($){function _1(t){$(t).addClass("validatebox-text")}function _3(t){var o=$.data(t,"validatebox");o.validating=!1,o.timer&&clearTimeout(o.timer),$(t).tooltip("destroy"),$(t).unbind(),$(t).remove()}function _6(t){var o=$(t),e=$.data(t,"validatebox");o.unbind(".validatebox"),e.options.novalidate||o.bind("focus.validatebox",function(){e.validating=!0,e.value=void 0,function(){e.validating&&(e.value!=o.val()?(e.value=o.val(),e.timer&&clearTimeout(e.timer),e.timer=setTimeout(function(){$(t).validatebox("validate")},e.options.delay)):_f(t),setTimeout(arguments.callee,200))}()}).bind("blur.validatebox",function(){e.timer&&(clearTimeout(e.timer),e.timer=void 0),e.validating=!1,_a(t)}).bind("mouseenter.validatebox",function(){o.hasClass("validatebox-invalid")&&_b(t)}).bind("mouseleave.validatebox",function(){e.validating||_a(t)})}function _b(t){var o=$.data(t,"validatebox"),e=o.options;$(t).tooltip($.extend({},e.tipOptions,{content:o.message,position:e.tipPosition,deltaX:e.deltaX})).tooltip("show"),o.tip=!0}function _f(t){var o=$.data(t,"validatebox");o&&o.tip&&$(t).tooltip("reposition")}function _a(t){var o=$.data(t,"validatebox");o.tip=!1,$(t).tooltip("hide")}function _14(_15){function _19(t){_16.message=t}function _1a(_1b,_1c){var _1d=/([a-zA-Z_]+)(.*)/.exec(_1b),_1e=_17.rules[_1d[1]];if(_1e&&_18){var _1f=_1c||_17.validParams||eval(_1d[2]);if(!_1e.validator.call(_15,_18,_1f)){box.addClass("validatebox-invalid");var _20=_1e.message;if(_1f)for(var i=0;i<_1f.length;i++)_20=_20.replace(new RegExp("\\{"+i+"\\}","g"),_1f[i]);return _19(_17.invalidMessage||_20),_16.validating&&_b(_15),!1}}return!0}var _16=$.data(_15,"validatebox"),_17=_16.options,box=$(_15),_18=box.val();if(box.removeClass("validatebox-invalid"),_a(_15),_17.novalidate||box.is(":disabled"))return!0;if(_17.required&&""==_18)return box.addClass("validatebox-invalid"),_19(_17.missingMessage),_16.validating&&_b(_15),!1;if(_17.validType)if($.isArray(_17.validType)){for(var i=0;i<_17.validType.length;i++)if(!_1a(_17.validType[i]))return!1}else if("string"==typeof _17.validType){if(!_1a(_17.validType))return!1}else for(var _21 in _17.validType){var _22=_17.validType[_21];if(!_1a(_21,_22))return!1}return!0}function _23(t,o){var e=$.data(t,"validatebox").options;void 0!=o&&(e.novalidate=o),e.novalidate&&($(t).removeClass("validatebox-invalid"),_a(t)),_6(t)}$.fn.validatebox=function(t,o){return"string"==typeof t?$.fn.validatebox.methods[t](this,o):(t=t||{},this.each(function(){var o=$.data(this,"validatebox");o?$.extend(o.options,t):(_1(this),$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),t)})),_23(this),_14(this)}))},$.fn.validatebox.methods={options:function(t){return $.data(t[0],"validatebox").options},destroy:function(t){return t.each(function(){_3(this)})},validate:function(t){return t.each(function(){_14(this)})},isValid:function(t){return _14(t[0])},enableValidation:function(t){return t.each(function(){_23(this,!1)})},disableValidation:function(t){return t.each(function(){_23(this,!0)})}},$.fn.validatebox.parseOptions=function(t){var o=$(t);return $.extend({},$.parser.parseOptions(t,["validType","missingMessage","invalidMessage","tipPosition",{delay:"number",deltaX:"number"}]),{required:o.attr("required")?!0:void 0,novalidate:void 0!=o.attr("novalidate")?!0:void 0})},$.fn.validatebox.defaults={required:!1,validType:null,validParams:null,delay:200,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",deltaX:0,novalidate:!1,tipOptions:{showEvent:"none",hideEvent:"none",showDelay:0,hideDelay:0,zIndex:"",onShow:function(){$(this).tooltip("tip").css({color:"#000",borderColor:"#CC9933",backgroundColor:"#FFFFCC"})},onHide:function(){$(this).tooltip("destroy")}},rules:{email:{validator:function(t){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(t)},message:"Please enter a valid email address."},url:{validator:function(t){return/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},message:"Please enter a valid URL."},length:{validator:function(t,o){var e=$.trim(t).length;return e>=o[0]&&e<=o[1]},message:"Please enter a value between {0} and {1}."},remote:{validator:function(t,o){var e={};e[o[1]]=t;var i=$.ajax({url:o[0],dataType:"json",data:e,async:!1,cache:!1,type:"post"}).responseText;return"true"==i},message:"Please fix this field."}}}}(jQuery)}),define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={auto:!0,onComplete:function(){},plugins:["draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","progressbar","tree","combobox","combotree","combogrid","numberbox","validatebox","searchbox","numberspinner","timespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","tabs","accordion","window","dialog"],parse:function(o){for(var e=[],i=0;i<t.parser.plugins.length;i++){var a=t.parser.plugins[i],n=t(".jq-"+a,o);n.length&&(n[a]?n[a]():e.push({name:a,jq:n}))}if(e.length&&window.easyloader){for(var r=[],i=0;i<e.length;i++)r.push(e[i].name);easyloader.load(r,function(){for(var i=0;i<e.length;i++){var a=e[i].name,n=e[i].jq;n[a]()}t.parser.onComplete.call(t.parser,o)})}else t.parser.onComplete.call(t.parser,o)},parseOptions:function(o,e){var i=t(o),a={},n=t.trim(i.attr("data-options"));if(n&&("{"!=n.substring(0,1)&&(n="{"+n+"}"),a=new Function("return "+n)()),e){for(var r={},u=0;u<e.length;u++){var l=e[u];if("string"==typeof l)r[l]="width"==l||"height"==l||"left"==l||"top"==l?parseInt(o.style[l])||void 0:i.attr(l);else for(var d in l){var s=l[d];"boolean"==s?r[d]=i.attr(d)?"true"==i.attr(d):void 0:"number"==s&&(r[d]="0"==i.attr(d)?0:parseFloat(i.attr(d))||void 0)}}t.extend(a,r)}return a}},t(function(){var o=t('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");o.width(100),t._boxModel=100==parseInt(o.width()),o.remove(),!window.easyloader&&t.parser.auto&&t.parser.parse()}),t.fn._outerWidth=function(o){return void 0==o?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(t._boxModel?o-(t(this).outerWidth()-t(this).width()):o)})},t.fn._outerHeight=function(o){return void 0==o?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(t._boxModel?o-(t(this).outerHeight()-t(this).height()):o)})},t.fn._scrollLeft=function(o){return void 0==o?this.scrollLeft():this.each(function(){t(this).scrollLeft(o)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(o){o=void 0==o?!0:o;var e=this[0],i="BODY"==e.tagName?e:this.parent()[0],a=i.fcount||0;return o?e.fitted||(e.fitted=!0,i.fcount=a+1,t(i).addClass("panel-noscroll"),"BODY"==i.tagName&&t("html").addClass("panel-fit")):e.fitted&&(e.fitted=!1,i.fcount=a-1,0==i.fcount&&(t(i).removeClass("panel-noscroll"),"BODY"==i.tagName&&t("html").removeClass("panel-fit"))),{width:t(i).width(),height:t(i).height()}}}(jQuery),function(t){function o(o){1==o.touches.length&&(r?(clearTimeout(dblClickTimer),r=!1,a(o,"dblclick")):(r=!0,dblClickTimer=setTimeout(function(){r=!1},500)),n=setTimeout(function(){a(o,"contextmenu",3)},1e3),a(o,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault())}function e(o){1==o.touches.length&&(n&&clearTimeout(n),a(o,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault())}function i(o){n&&clearTimeout(n),a(o,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault()}function a(o,e,i){var a=new t.Event(e);a.pageX=o.changedTouches[0].pageX,a.pageY=o.changedTouches[0].pageY,a.which=i||1,t(o.target).trigger(a)}var n=null,r=!1;document.addEventListener&&(document.addEventListener("touchstart",o,!0),document.addEventListener("touchmove",e,!0),document.addEventListener("touchend",i,!0))}(jQuery)}),define("jqui/1.3.6/validatebox.css.js",["import-style/1.0.0/index"],function(t){t("import-style/1.0.0/index")(".validatebox-invalid{background-repeat:no-repeat;background-position:right center;border-color:#ff7000!important;background-color:#fff3f3!important;color:#000;}")}),define("jqui/1.3.6/tooltip",["import-style/1.0.0/index"],function(t){t("jqui/1.3.6/parser"),t("jqui/1.3.6/tooltip.css.js"),function(t){function o(o){t(o).addClass("tooltip-f")}function e(o){var e=t.data(o,"tooltip").options;t(o).unbind(".tooltip").bind(e.showEvent+".tooltip",function(t){n(o,t)}).bind(e.hideEvent+".tooltip",function(t){r(o,t)}).bind("mousemove.tooltip",function(t){e.trackMouse&&(e.trackMouseX=t.pageX,e.trackMouseY=t.pageY,a(o))})}function i(o){var e=t.data(o,"tooltip");e.showTimer&&(clearTimeout(e.showTimer),e.showTimer=null),e.hideTimer&&(clearTimeout(e.hideTimer),e.hideTimer=null)}function a(o){var e=t.data(o,"tooltip");if(e&&e.tip){var i=e.options,a=e.tip;if(i.trackMouse){u=t();var n=i.trackMouseX+i.deltaX,r=i.trackMouseY+i.deltaY}else var u=t(o),n=u.offset().left+i.deltaX,r=u.offset().top+i.deltaY;switch(i.position){case"right":n+=u._outerWidth()+12+(i.trackMouse?12:0),r-=(a._outerHeight()-u._outerHeight())/2;break;case"left":n-=a._outerWidth()+12+(i.trackMouse?12:0),r-=(a._outerHeight()-u._outerHeight())/2;break;case"top":n-=(a._outerWidth()-u._outerWidth())/2,r-=a._outerHeight()+12+(i.trackMouse?12:0);break;case"bottom":n-=(a._outerWidth()-u._outerWidth())/2,r+=u._outerHeight()+12+(i.trackMouse?12:0)}t(o).is(":visible")||(n=-1e5,r=-1e5),a.css({left:n,top:r,zIndex:void 0!=i.zIndex?i.zIndex:t.fn.window?t.fn.window.defaults.zIndex++:""}),i.onPosition.call(o,n,r)}}function n(o,e){var n=t.data(o,"tooltip"),r=n.options,l=n.tip;l||(l=t('<div tabindex="-1" class="tooltip"><div class="tooltip-content"></div><div class="tooltip-arrow-outer"></div><div class="tooltip-arrow"></div></div>').appendTo("body"),n.tip=l,u(o)),l.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+r.position),i(o),n.showTimer=setTimeout(function(){a(o),l.show(),r.onShow.call(o,e);var t=l.children(".tooltip-arrow-outer"),i=l.children(".tooltip-arrow"),n="border-"+r.position+"-color";t.add(i).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""}),t.css(n,l.css(n)),i.css(n,l.css("backgroundColor"))},r.showDelay)}function r(o,e){var a=t.data(o,"tooltip");a&&a.tip&&(i(o),a.hideTimer=setTimeout(function(){a.tip.hide(),a.options.onHide.call(o,e)},a.options.hideDelay))}function u(o,e){var i=t.data(o,"tooltip"),a=i.options;if(e&&(a.content=e),i.tip){var n="function"==typeof a.content?a.content.call(o):a.content;i.tip.children(".tooltip-content").html(n),a.onUpdate.call(o,n)}}function l(o){var e=t.data(o,"tooltip");if(e){i(o);var a=e.options;e.tip&&e.tip.remove(),a._title&&t(o).attr("title",a._title),t.removeData(o,"tooltip"),t(o).unbind(".tooltip").removeClass("tooltip-f"),a.onDestroy.call(o)}}t.fn.tooltip=function(i,a){return"string"==typeof i?t.fn.tooltip.methods[i](this,a):(i=i||{},this.each(function(){var a=t.data(this,"tooltip");a?t.extend(a.options,i):(t.data(this,"tooltip",{options:t.extend({},t.fn.tooltip.defaults,t.fn.tooltip.parseOptions(this),i)}),o(this)),e(this),u(this)}))},t.fn.tooltip.methods={options:function(o){return t.data(o[0],"tooltip").options},tip:function(o){return t.data(o[0],"tooltip").tip},arrow:function(t){return t.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow")},show:function(t,o){return t.each(function(){n(this,o)})},hide:function(t,o){return t.each(function(){r(this,o)})},update:function(t,o){return t.each(function(){u(this,o)})},reposition:function(t){return t.each(function(){a(this)})},destroy:function(t){return t.each(function(){l(this)})}},t.fn.tooltip.parseOptions=function(o){var e=t(o),i=t.extend({},t.parser.parseOptions(o,["position","showEvent","hideEvent","content",{deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:e.attr("title")});return e.attr("title",""),i.content||(i.content=i._title),i},t.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:!1,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(){},onHide:function(){},onUpdate:function(){},onPosition:function(){},onDestroy:function(){}}}(jQuery)}),define("jqui/1.3.6/tooltip.css.js",["import-style/1.0.0/index"],function(t){t("import-style/1.0.0/index")(".tooltip{position:absolute;display:none;z-index:9900000;outline:none;opacity:1;filter:alpha(opacity=100);padding:5px;border-width:1px;border-style:solid;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;}.tooltip-content{font-size:12px;}.tooltip-arrow-outer,.tooltip-arrow{position:absolute;width:0;height:0;line-height:0;font-size:0;border-style:solid;border-width:6px;border-color:transparent;_border-color:tomato;_filter:chroma(color=tomato);}.tooltip-right .tooltip-arrow-outer{left:0;top:50%;margin:-6px 0 0 -13px;}.tooltip-right .tooltip-arrow{left:0;top:50%;margin:-6px 0 0 -12px;}.tooltip-left .tooltip-arrow-outer{right:0;top:50%;margin:-6px -13px 0 0;}.tooltip-left .tooltip-arrow{right:0;top:50%;margin:-6px -12px 0 0;}.tooltip-top .tooltip-arrow-outer{bottom:0;left:50%;margin:0 0 -13px -6px;}.tooltip-top .tooltip-arrow{bottom:0;left:50%;margin:0 0 -12px -6px;}.tooltip-bottom .tooltip-arrow-outer{top:0;left:50%;margin:-13px 0 0 -6px;}.tooltip-bottom .tooltip-arrow{top:0;left:50%;margin:-12px 0 0 -6px;}.tooltip{background-color:#fff;border-color:#95B8E7;color:#000;}.tooltip-right .tooltip-arrow-outer{border-right-color:#95B8E7;}.tooltip-right .tooltip-arrow{border-right-color:#fff;}.tooltip-left .tooltip-arrow-outer{border-left-color:#95B8E7;}.tooltip-left .tooltip-arrow{border-left-color:#fff;}.tooltip-top .tooltip-arrow-outer{border-top-color:#95B8E7;}.tooltip-top .tooltip-arrow{border-top-color:#fff;}.tooltip-bottom .tooltip-arrow-outer{border-bottom-color:#95B8E7;}.tooltip-bottom .tooltip-arrow{border-bottom-color:#fff;}")});