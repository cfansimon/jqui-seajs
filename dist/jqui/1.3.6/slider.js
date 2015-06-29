define("jqui/1.3.6/slider",["import-style/1.0.0/index"],function(require,exports,module){require("jqui/1.3.6/parser"),require("jqui/1.3.6/slider.css.js"),require("jqui/1.3.6/draggable"),function($){function init(t){var e=$('<div class="slider"><div class="slider-inner"><a href="javascript:void(0)" class="slider-handle"></a><span class="slider-tip"></span></div><div class="slider-rule"></div><div class="slider-rulelabel"></div><div style="clear:both"></div><input type="hidden" class="slider-value"></div>').insertAfter(t),a=$(t);a.addClass("slider-f").hide();var i=a.attr("name");return i&&(e.find("input.slider-value").attr("name",i),a.removeAttr("name").attr("sliderName",i)),e}function setSize(t,e){var a=$.data(t,"slider"),i=a.options,r=a.slider;e&&(e.width&&(i.width=e.width),e.height&&(i.height=e.height)),"h"==i.mode?(r.css("height",""),r.children("div").css("height",""),isNaN(i.width)||r.width(i.width)):(r.css("width",""),r.children("div").css("width",""),isNaN(i.height)||(r.height(i.height),r.find("div.slider-rule").height(i.height),r.find("div.slider-rulelabel").height(i.height),r.find("div.slider-inner")._outerHeight(i.height))),initValue(t)}function showRule(t){function e(t){var e=r.find("div.slider-rule"),a=r.find("div.slider-rulelabel");e.empty(),a.empty();for(var n=0;n<t.length;n++){var o=100*n/(t.length-1)+"%",d=$("<span></span>").appendTo(e);d.css("h"==i.mode?"left":"top",o),"|"!=t[n]&&(d=$("<span></span>").appendTo(a),d.html(t[n]),d.css("h"==i.mode?{left:o,marginLeft:-Math.round(d.outerWidth()/2)}:{top:o,marginTop:-Math.round(d.outerHeight()/2)}))}}var a=$.data(t,"slider"),i=a.options,r=a.slider,n="h"==i.mode?i.rule:i.rule.slice(0).reverse();i.reversed&&(n=n.slice(0).reverse()),e(n)}function buildSlider(t){function e(e){var a=Math.abs(e%i.step);a<i.step/2?e-=a:e=e-a+i.step,setValue(t,e)}var a=$.data(t,"slider"),i=a.options,r=a.slider;r.removeClass("slider-h slider-v slider-disabled"),r.addClass("h"==i.mode?"slider-h":"slider-v"),r.addClass(i.disabled?"slider-disabled":""),r.find("a.slider-handle").draggable({axis:i.mode,cursor:"pointer",disabled:i.disabled,onDrag:function(a){var n=a.data.left,o=r.width();if("h"!=i.mode&&(n=a.data.top,o=r.height()),0>n||n>o)return!1;var d=pos2value(t,n);return e(d),!1},onBeforeDrag:function(){a.isDragging=!0},onStartDrag:function(){i.onSlideStart.call(t,i.value)},onStopDrag:function(r){var n=pos2value(t,"h"==i.mode?r.data.left:r.data.top);e(n),i.onSlideEnd.call(t,i.value),i.onComplete.call(t,i.value),a.isDragging=!1}}),r.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(r){if(!a.isDragging){var n=$(this).offset(),o=pos2value(t,"h"==i.mode?r.pageX-n.left:r.pageY-n.top);e(o),i.onComplete.call(t,i.value)}})}function setValue(t,e){var a=$.data(t,"slider"),i=a.options,r=a.slider,n=i.value;e<i.min&&(e=i.min),e>i.max&&(e=i.max),i.value=e,$(t).val(e),r.find("input.slider-value").val(e);var o=value2pos(t,e),d=r.find(".slider-tip");if(i.showTip?(d.show(),d.html(i.tipFormatter.call(t,i.value))):d.hide(),"h"==i.mode){var s="left:"+o+"px;";r.find(".slider-handle").attr("style",s),d.attr("style",s+"margin-left:"+-Math.round(d.outerWidth()/2)+"px")}else{var s="top:"+o+"px;";r.find(".slider-handle").attr("style",s),d.attr("style",s+"margin-left:"+-Math.round(d.outerWidth())+"px")}n!=e&&i.onChange.call(t,e,n)}function initValue(t){var e=$.data(t,"slider").options,a=e.onChange;e.onChange=function(){},setValue(t,e.value),e.onChange=a}function value2pos(t,e){var a=$.data(t,"slider"),i=a.options,r=a.slider,n="h"==i.mode?r.width():r.height(),o=i.converter.toPosition.call(t,e,n);return"v"==i.mode&&(o=r.height()-o),i.reversed&&(o=n-o),o.toFixed(0)}function pos2value(t,e){var a=$.data(t,"slider"),i=a.options,r=a.slider,n="h"==i.mode?r.width():r.height(),o=i.converter.toValue.call(t,"h"==i.mode?i.reversed?n-e:e:n-e,n);return o.toFixed(0)}$.fn.slider=function(t,e){return"string"==typeof t?$.fn.slider.methods[t](this,e):(t=t||{},this.each(function(){var e=$.data(this,"slider");e?$.extend(e.options,t):(e=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),t),slider:init(this)}),$(this).removeAttr("disabled"));var a=e.options;a.min=parseFloat(a.min),a.max=parseFloat(a.max),a.value=parseFloat(a.value),a.step=parseFloat(a.step),a.originalValue=a.value,buildSlider(this),showRule(this),setSize(this)}))},$.fn.slider.methods={options:function(t){return $.data(t[0],"slider").options},destroy:function(t){return t.each(function(){$.data(this,"slider").slider.remove(),$(this).remove()})},resize:function(t,e){return t.each(function(){setSize(this,e)})},getValue:function(t){return t.slider("options").value},setValue:function(t,e){return t.each(function(){setValue(this,e)})},clear:function(t){return t.each(function(){var t=$(this).slider("options");setValue(this,t.min)})},reset:function(t){return t.each(function(){var t=$(this).slider("options");setValue(this,t.originalValue)})},enable:function(t){return t.each(function(){$.data(this,"slider").options.disabled=!1,buildSlider(this)})},disable:function(t){return t.each(function(){$.data(this,"slider").options.disabled=!0,buildSlider(this)})}},$.fn.slider.parseOptions=function(target){var t=$(target);return $.extend({},$.parser.parseOptions(target,["width","height","mode",{reversed:"boolean",showTip:"boolean",min:"number",max:"number",step:"number"}]),{value:t.val()||void 0,disabled:t.attr("disabled")?!0:void 0,rule:t.attr("rule")?eval(t.attr("rule")):void 0})},$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",reversed:!1,showTip:!1,disabled:!1,value:0,min:0,max:100,step:1,rule:[],tipFormatter:function(t){return t},converter:{toPosition:function(t,e){var a=$(this).slider("options");return(t-a.min)/(a.max-a.min)*e},toValue:function(t,e){var a=$(this).slider("options");return a.min+(a.max-a.min)*(t/e)}},onChange:function(){},onSlideStart:function(){},onSlideEnd:function(){},onComplete:function(){}}}(jQuery)}),define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={parseOptions:function(e,a){var i=t(e),r={},n=t.trim(i.attr("data-options"));if(n&&("{"!=n.substring(0,1)&&(n="{"+n+"}"),r=new Function("return "+n)()),a){for(var o={},d=0;d<a.length;d++){var s=a[d];if("string"==typeof s)o[s]="width"==s||"height"==s||"left"==s||"top"==s?parseInt(e.style[s])||void 0:i.attr(s);else for(var l in s){var u=s[l];"boolean"==u?o[l]=i.attr(l)?"true"==i.attr(l):void 0:"number"==u&&(o[l]="0"==i.attr(l)?0:parseFloat(i.attr(l))||void 0)}}t.extend(r,o)}return r}},t.fn._outerWidth=function(e){return void 0==e?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(t._boxModel?e-(t(this).outerWidth()-t(this).width()):e)})},t.fn._outerHeight=function(e){return void 0==e?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(t._boxModel?e-(t(this).outerHeight()-t(this).height()):e)})},t.fn._scrollLeft=function(e){return void 0==e?this.scrollLeft():this.each(function(){t(this).scrollLeft(e)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(e){e=void 0==e?!0:e;var a=this[0],i="BODY"==a.tagName?a:this.parent()[0],r=i.fcount||0;return e?a.fitted||(a.fitted=!0,i.fcount=r+1,t(i).addClass("panel-noscroll"),"BODY"==i.tagName&&t("html").addClass("panel-fit")):a.fitted&&(a.fitted=!1,i.fcount=r-1,0==i.fcount&&(t(i).removeClass("panel-noscroll"),"BODY"==i.tagName&&t("html").removeClass("panel-fit"))),{width:t(i).width(),height:t(i).height()}}}(jQuery),function(t){function e(e){1==e.touches.length&&(o?(clearTimeout(dblClickTimer),o=!1,r(e,"dblclick")):(o=!0,dblClickTimer=setTimeout(function(){o=!1},500)),n=setTimeout(function(){r(e,"contextmenu",3)},1e3),r(e,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function a(e){1==e.touches.length&&(n&&clearTimeout(n),r(e,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function i(e){n&&clearTimeout(n),r(e,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault()}function r(e,a,i){var r=new t.Event(a);r.pageX=e.changedTouches[0].pageX,r.pageY=e.changedTouches[0].pageY,r.which=i||1,t(e.target).trigger(r)}var n=null,o=!1;document.addEventListener&&(document.addEventListener("touchstart",e,!0),document.addEventListener("touchmove",a,!0),document.addEventListener("touchend",i,!0))}(jQuery)}),define("jqui/1.3.6/slider.css.js",["import-style/1.0.0/index"],function(t){t("import-style/1.0.0/index")('.slider-disabled{opacity:.5;filter:alpha(opacity=50);}.slider-h{height:22px;}.slider-v{width:22px;}.slider-inner{position:relative;height:6px;top:7px;border-width:1px;border-style:solid;border-radius:5px;}.slider-handle{position:absolute;display:block;outline:none;width:20px;height:20px;top:-7px;margin-left:-10px;}.slider-tip{position:absolute;display:inline-block;line-height:12px;font-size:12px;white-space:nowrap;top:-22px;}.slider-rule{position:relative;top:15px;}.slider-rule span{position:absolute;display:inline-block;font-size:0;height:5px;border-width:0 0 0 1px;border-style:solid;}.slider-rulelabel{position:relative;top:20px;}.slider-rulelabel span{position:absolute;display:inline-block;font-size:12px;}.slider-v .slider-inner{width:6px;left:7px;top:0;float:left;}.slider-v .slider-handle{left:3px;margin-top:-10px;}.slider-v .slider-tip{left:-10px;margin-top:-6px;}.slider-v .slider-rule{float:left;top:0;left:16px;}.slider-v .slider-rule span{width:5px;height:"auto";border-left:0;border-width:1px 0 0 0;border-style:solid;}.slider-v .slider-rulelabel{float:left;top:0;left:23px;}.slider-handle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALxSURBVHjalFTfS5NRGD7ffn1zvxy4aFghIf6qkSF05Qz0IuzCy6QRgX+CoDeuKIjwXxBqV7vxWpToTgh2FRT+qBGUJLK50HBTN+d0Oz7P4Tsx1wb1wsP5vnPe9znv+5z3HEO0Nlsikbjb1tYW9fv91zhxfHycqVQqqampqc/4rTULMpoRzc/PPxwcHHzZ3d19LxQKCZfLpRZAJvb29sTW1tbHtbW1V/F4/F0rYm3OxcXFN7u7u/Ls7ExWq1U1gkiB3+fn52rMZrMymUwmGNOSbGFhIYGyZLFYlPl8Xh4eHsqjo6NL4FyhUFA+9EXM23pSux5jsdjk9PT0aymlODk5EbVaTQFZ/gVkKcrlsgrs6+sbyuVy39bX17/iV2oNfcvLyz+j0WjHwcGBsNvtwmazCcMwBDe4JLo1pzdsb28XqVRqf2Ji4ibPzcHsxsbGJvv7+zsoODMgIQNpDNaknKufpy8PCrGh0dHRR6urq0kb1sze3t5x0zQF9BGlUkmBZRMsrR56XvtBV9UFKP0BuZihGQgEOtFvgqQ4QQVmoLNpNL3GSkjm8XhEOBzuwZLbYZ2QyUmfz6fIKLoem5XscDiE0+n8MzIZ+JDHQUKBgyhxJxJSE01IUCeKrzoeB8WsSNKITCaT554krG1sbPyAFveDwaDSqZ5Qk6reakLmdruV9mib73BRjgGU+wRtU5OW8YbwZkB01cSoQEE39Onpqbox2lZWVqper/cpuUhoArdGRkY+kKiZoWSFZsYYxpLD4hJsnSso5/Hs7Oy+/E+bmZnZR2yMHBaX0Fn2oG1ezM3NFf6VjL6Iec5YnV39M+YH7kDoZ8PDw+mlpSWlYaNRQ67hmqbpyxgr1mh8D23WwnWUcBttND4wMDAUiUSudnV1eemwvb1d3Nzc/JVOpz/h0N5Dvy+Y3uEd1u9i41UgqRvoAMLou07gBr6D1noeh7MDZPGdA34D5fpH1mjxitstYmbmAVzWWgUoAUWLiH136Tm6EGAA9KaN+oVolfYAAAAASUVORK5CYII=) no-repeat;}.slider-inner{background:#E0ECFF;}.slider-inner,.slider-rule span{border-color:#95B8E7;}.slider-rulelabel span{color:#000;}')}),define("jqui/1.3.6/draggable",[],function(t){t("jqui/1.3.6/parser"),function(t){function e(e){var a=t.data(e.data.target,"draggable"),i=a.options,r=a.proxy,n=e.data,o=n.startLeft+e.pageX-n.startX,d=n.startTop+e.pageY-n.startY;r&&(r.parent()[0]==document.body?(o=null!=i.deltaX&&void 0!=i.deltaX?e.pageX+i.deltaX:e.pageX-e.data.offsetWidth,d=null!=i.deltaY&&void 0!=i.deltaY?e.pageY+i.deltaY:e.pageY-e.data.offsetHeight):(null!=i.deltaX&&void 0!=i.deltaX&&(o+=e.data.offsetWidth+i.deltaX),null!=i.deltaY&&void 0!=i.deltaY&&(d+=e.data.offsetHeight+i.deltaY))),e.data.parent!=document.body&&(o+=t(e.data.parent).scrollLeft(),d+=t(e.data.parent).scrollTop()),"h"==i.axis?n.left=o:"v"==i.axis?n.top=d:(n.left=o,n.top=d)}function a(e){var a=t.data(e.data.target,"draggable"),i=a.options,r=a.proxy;r||(r=t(e.data.target)),r.css({left:e.data.left,top:e.data.top}),t("body").css("cursor",i.cursor)}function i(i){t.fn.draggable.isDragging=!0;var r=t.data(i.data.target,"draggable"),n=r.options,o=t(".droppable").filter(function(){return i.data.target!=this}).filter(function(){var e=t.data(this,"droppable").options.accept;return e?t(e).filter(function(){return this==i.data.target}).length>0:!0});r.droppables=o;var d=r.proxy;return d||(n.proxy?(d="clone"==n.proxy?t(i.data.target).clone().insertAfter(i.data.target):n.proxy.call(i.data.target,i.data.target),r.proxy=d):d=t(i.data.target)),d.css("position","absolute"),e(i),a(i),n.onStartDrag.call(i.data.target,i),!1}function r(i){var r=t.data(i.data.target,"draggable");e(i),0!=r.options.onDrag.call(i.data.target,i)&&a(i);var n=i.data.target;return r.droppables.each(function(){var e=t(this);if(!e.droppable("options").disabled){var a=e.offset();i.pageX>a.left&&i.pageX<a.left+e.outerWidth()&&i.pageY>a.top&&i.pageY<a.top+e.outerHeight()?(this.entered||(t(this).trigger("_dragenter",[n]),this.entered=!0),t(this).trigger("_dragover",[n])):this.entered&&(t(this).trigger("_dragleave",[n]),this.entered=!1)}}),!1}function n(e){function a(){o&&o.remove(),n.proxy=null}function i(){var i=!1;return n.droppables.each(function(){var r=t(this);if(!r.droppable("options").disabled){var n=r.offset();return e.pageX>n.left&&e.pageX<n.left+r.outerWidth()&&e.pageY>n.top&&e.pageY<n.top+r.outerHeight()?(d.revert&&t(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop}),t(this).trigger("_drop",[e.data.target]),a(),i=!0,this.entered=!1,!1):void 0}}),i||d.revert||a(),i}t.fn.draggable.isDragging=!1,r(e);var n=t.data(e.data.target,"draggable"),o=n.proxy,d=n.options;if(d.revert)if(1==i())t(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});else if(o){var s,l;o.parent()[0]==document.body?(s=e.data.startX-e.data.offsetWidth,l=e.data.startY-e.data.offsetHeight):(s=e.data.startLeft,l=e.data.startTop),o.animate({left:s,top:l},function(){a()})}else t(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){t(e.data.target).css("position",e.data.startPosition)});else t(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top}),i();return d.onStopDrag.call(e.data.target,e),t(document).unbind(".draggable"),setTimeout(function(){t("body").css("cursor","")},100),!1}t.fn.draggable=function(e,a){return"string"==typeof e?t.fn.draggable.methods[e](this,a):this.each(function(){function a(e){var a=t.data(e.data.target,"draggable"),i=a.handle,r=t(i).offset(),n=t(i).outerWidth(),o=t(i).outerHeight(),d=e.pageY-r.top,s=r.left+n-e.pageX,l=r.top+o-e.pageY,u=e.pageX-r.left;return Math.min(d,s,l,u)>a.options.edge}var o,d=t.data(this,"draggable");d?(d.handle.unbind(".draggable"),o=t.extend(d.options,e)):o=t.extend({},t.fn.draggable.defaults,t.fn.draggable.parseOptions(this),e||{});var s=o.handle?"string"==typeof o.handle?t(o.handle,this):o.handle:t(this);return t.data(this,"draggable",{options:o,handle:s}),o.disabled?void t(this).css("cursor",""):void s.unbind(".draggable").bind("mousemove.draggable",{target:this},function(e){if(!t.fn.draggable.isDragging){var i=t.data(e.data.target,"draggable").options;a(e)?t(this).css("cursor",i.cursor):t(this).css("cursor","")}}).bind("mouseleave.draggable",{target:this},function(){t(this).css("cursor","")}).bind("mousedown.draggable",{target:this},function(e){if(0!=a(e)){t(this).css("cursor","");var o=t(e.data.target).position(),d=t(e.data.target).offset(),s={startPosition:t(e.data.target).css("position"),startLeft:o.left,startTop:o.top,left:o.left,top:o.top,startX:e.pageX,startY:e.pageY,offsetWidth:e.pageX-d.left,offsetHeight:e.pageY-d.top,target:e.data.target,parent:t(e.data.target).parent()[0]};t.extend(e.data,s);var l=t.data(e.data.target,"draggable").options;0!=l.onBeforeDrag.call(e.data.target,e)&&(t(document).bind("mousedown.draggable",e.data,i),t(document).bind("mousemove.draggable",e.data,r),t(document).bind("mouseup.draggable",e.data,n))}})})},t.fn.draggable.methods={options:function(e){return t.data(e[0],"draggable").options},proxy:function(e){return t.data(e[0],"draggable").proxy},enable:function(e){return e.each(function(){t(this).draggable({disabled:!1})})},disable:function(e){return e.each(function(){t(this).draggable({disabled:!0})})}},t.fn.draggable.parseOptions=function(e){var a=t(e);return t.extend({},t.parser.parseOptions(e,["cursor","handle","axis",{revert:"boolean",deltaX:"number",deltaY:"number",edge:"number"}]),{disabled:a.attr("disabled")?!0:void 0})},t.fn.draggable.defaults={proxy:null,revert:!1,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:!1,edge:0,axis:null,onBeforeDrag:function(){},onStartDrag:function(){},onDrag:function(){},onStopDrag:function(){}},t.fn.draggable.isDragging=!1}(jQuery)});