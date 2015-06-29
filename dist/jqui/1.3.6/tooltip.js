define("jqui/1.3.6/tooltip",[],function(t){t("jqui/1.3.6/parser"),function(t){function o(o){t(o).addClass("tooltip-f")}function e(o){var e=t.data(o,"tooltip").options;t(o).unbind(".tooltip").bind(e.showEvent+".tooltip",function(t){r(o,t)}).bind(e.hideEvent+".tooltip",function(t){a(o,t)}).bind("mousemove.tooltip",function(t){e.trackMouse&&(e.trackMouseX=t.pageX,e.trackMouseY=t.pageY,n(o))})}function i(o){var e=t.data(o,"tooltip");e.showTimer&&(clearTimeout(e.showTimer),e.showTimer=null),e.hideTimer&&(clearTimeout(e.hideTimer),e.hideTimer=null)}function n(o){var e=t.data(o,"tooltip");if(e&&e.tip){var i=e.options,n=e.tip;if(i.trackMouse){s=t();var r=i.trackMouseX+i.deltaX,a=i.trackMouseY+i.deltaY}else var s=t(o),r=s.offset().left+i.deltaX,a=s.offset().top+i.deltaY;switch(i.position){case"right":r+=s._outerWidth()+12+(i.trackMouse?12:0),a-=(n._outerHeight()-s._outerHeight())/2;break;case"left":r-=n._outerWidth()+12+(i.trackMouse?12:0),a-=(n._outerHeight()-s._outerHeight())/2;break;case"top":r-=(n._outerWidth()-s._outerWidth())/2,a-=n._outerHeight()+12+(i.trackMouse?12:0);break;case"bottom":r-=(n._outerWidth()-s._outerWidth())/2,a+=s._outerHeight()+12+(i.trackMouse?12:0)}t(o).is(":visible")||(r=-1e5,a=-1e5),n.css({left:r,top:a,zIndex:void 0!=i.zIndex?i.zIndex:t.fn.window?t.fn.window.defaults.zIndex++:""}),i.onPosition.call(o,r,a)}}function r(o,e){var r=t.data(o,"tooltip"),a=r.options,u=r.tip;u||(u=t('<div tabindex="-1" class="tooltip"><div class="tooltip-content"></div><div class="tooltip-arrow-outer"></div><div class="tooltip-arrow"></div></div>').appendTo("body"),r.tip=u,s(o)),u.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+a.position),i(o),r.showTimer=setTimeout(function(){n(o),u.show(),a.onShow.call(o,e);var t=u.children(".tooltip-arrow-outer"),i=u.children(".tooltip-arrow"),r="border-"+a.position+"-color";t.add(i).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""}),t.css(r,u.css(r)),i.css(r,u.css("backgroundColor"))},a.showDelay)}function a(o,e){var n=t.data(o,"tooltip");n&&n.tip&&(i(o),n.hideTimer=setTimeout(function(){n.tip.hide(),n.options.onHide.call(o,e)},n.options.hideDelay))}function s(o,e){var i=t.data(o,"tooltip"),n=i.options;if(e&&(n.content=e),i.tip){var r="function"==typeof n.content?n.content.call(o):n.content;i.tip.children(".tooltip-content").html(r),n.onUpdate.call(o,r)}}function u(o){var e=t.data(o,"tooltip");if(e){i(o);var n=e.options;e.tip&&e.tip.remove(),n._title&&t(o).attr("title",n._title),t.removeData(o,"tooltip"),t(o).unbind(".tooltip").removeClass("tooltip-f"),n.onDestroy.call(o)}}t.fn.tooltip=function(i,n){return"string"==typeof i?t.fn.tooltip.methods[i](this,n):(i=i||{},this.each(function(){var n=t.data(this,"tooltip");n?t.extend(n.options,i):(t.data(this,"tooltip",{options:t.extend({},t.fn.tooltip.defaults,t.fn.tooltip.parseOptions(this),i)}),o(this)),e(this),s(this)}))},t.fn.tooltip.methods={options:function(o){return t.data(o[0],"tooltip").options},tip:function(o){return t.data(o[0],"tooltip").tip},arrow:function(t){return t.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow")},show:function(t,o){return t.each(function(){r(this,o)})},hide:function(t,o){return t.each(function(){a(this,o)})},update:function(t,o){return t.each(function(){s(this,o)})},reposition:function(t){return t.each(function(){n(this)})},destroy:function(t){return t.each(function(){u(this)})}},t.fn.tooltip.parseOptions=function(o){var e=t(o),i=t.extend({},t.parser.parseOptions(o,["position","showEvent","hideEvent","content",{deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:e.attr("title")});return e.attr("title",""),i.content||(i.content=i._title),i},t.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:!1,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(){},onHide:function(){},onUpdate:function(){},onPosition:function(){},onDestroy:function(){}}}(jQuery)}),define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={parseOptions:function(o,e){var i=t(o),n={},r=t.trim(i.attr("data-options"));if(r&&("{"!=r.substring(0,1)&&(r="{"+r+"}"),n=new Function("return "+r)()),e){for(var a={},s=0;s<e.length;s++){var u=e[s];if("string"==typeof u)a[u]="width"==u||"height"==u||"left"==u||"top"==u?parseInt(o.style[u])||void 0:i.attr(u);else for(var l in u){var c=u[l];"boolean"==c?a[l]=i.attr(l)?"true"==i.attr(l):void 0:"number"==c&&(a[l]="0"==i.attr(l)?0:parseFloat(i.attr(l))||void 0)}}t.extend(n,a)}return n}},t.fn._outerWidth=function(o){return void 0==o?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(o-(t(this).outerWidth()-t(this).width()))})},t.fn._outerHeight=function(o){return void 0==o?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(o-(t(this).outerHeight()-t(this).height()))})},t.fn._scrollLeft=function(o){return void 0==o?this.scrollLeft():this.each(function(){t(this).scrollLeft(o)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(o){o=void 0==o?!0:o;var e=this[0],i="BODY"==e.tagName?e:this.parent()[0],n=i.fcount||0;return o?e.fitted||(e.fitted=!0,i.fcount=n+1,t(i).addClass("panel-noscroll"),"BODY"==i.tagName&&t("html").addClass("panel-fit")):e.fitted&&(e.fitted=!1,i.fcount=n-1,0==i.fcount&&(t(i).removeClass("panel-noscroll"),"BODY"==i.tagName&&t("html").removeClass("panel-fit"))),{width:t(i).width(),height:t(i).height()}}}(jQuery),function(t){function o(o){1==o.touches.length&&(a?(clearTimeout(dblClickTimer),a=!1,n(o,"dblclick")):(a=!0,dblClickTimer=setTimeout(function(){a=!1},500)),r=setTimeout(function(){n(o,"contextmenu",3)},1e3),n(o,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault())}function e(o){1==o.touches.length&&(r&&clearTimeout(r),n(o,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault())}function i(o){r&&clearTimeout(r),n(o,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&o.preventDefault()}function n(o,e,i){var n=new t.Event(e);n.pageX=o.changedTouches[0].pageX,n.pageY=o.changedTouches[0].pageY,n.which=i||1,t(o.target).trigger(n)}var r=null,a=!1;document.addEventListener&&(document.addEventListener("touchstart",o,!0),document.addEventListener("touchmove",e,!0),document.addEventListener("touchend",i,!0))}(jQuery)});