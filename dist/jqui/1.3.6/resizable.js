define("jqui/1.3.6/resizable",[],function(t){t("jqui/1.3.6/parser"),function(t){t.fn.resizable=function(e,i){function a(e){var i=e.data,a=t.data(i.target,"resizable").options;if(-1!=i.dir.indexOf("e")){var n=i.startWidth+e.pageX-i.startX;n=Math.min(Math.max(n,a.minWidth),a.maxWidth),i.width=n}if(-1!=i.dir.indexOf("s")){var r=i.startHeight+e.pageY-i.startY;r=Math.min(Math.max(r,a.minHeight),a.maxHeight),i.height=r}if(-1!=i.dir.indexOf("w")){var n=i.startWidth-e.pageX+i.startX;n=Math.min(Math.max(n,a.minWidth),a.maxWidth),i.width=n,i.left=i.startLeft+i.startWidth-i.width}if(-1!=i.dir.indexOf("n")){var r=i.startHeight-e.pageY+i.startY;r=Math.min(Math.max(r,a.minHeight),a.maxHeight),i.height=r,i.top=i.startTop+i.startHeight-i.height}}function n(e){var i=e.data,a=t(i.target);a.css({left:i.left,top:i.top}),a.outerWidth()!=i.width&&a._outerWidth(i.width),a.outerHeight()!=i.height&&a._outerHeight(i.height)}function r(e){return t.fn.resizable.isResizing=!0,t.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e),!1}function s(e){return a(e),0!=t.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)&&n(e),!1}function o(e){return t.fn.resizable.isResizing=!1,a(e,!0),n(e),t.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e),t(document).unbind(".resizable"),t("body").css("cursor",""),!1}return"string"==typeof e?t.fn.resizable.methods[e](this,i):this.each(function(){function i(e){var i=t(e.data.target),n="",r=i.offset(),s=i.outerWidth(),o=i.outerHeight(),d=a.edge;e.pageY>r.top&&e.pageY<r.top+d?n+="n":e.pageY<r.top+o&&e.pageY>r.top+o-d&&(n+="s"),e.pageX>r.left&&e.pageX<r.left+d?n+="w":e.pageX<r.left+s&&e.pageX>r.left+s-d&&(n+="e");for(var h=a.handles.split(","),u=0;u<h.length;u++){var l=h[u].replace(/(^\s*)|(\s*$)/g,"");if("all"==l||l==n)return n}return""}var a=null,n=t.data(this,"resizable");n?(t(this).unbind(".resizable"),a=t.extend(n.options,e||{})):(a=t.extend({},t.fn.resizable.defaults,t.fn.resizable.parseOptions(this),e||{}),t.data(this,"resizable",{options:a})),1!=a.disabled&&t(this).bind("mousemove.resizable",{target:this},function(e){if(!t.fn.resizable.isResizing){var a=i(e);""==a?t(e.data.target).css("cursor",""):t(e.data.target).css("cursor",a+"-resize")}}).bind("mouseleave.resizable",{target:this},function(e){t(e.data.target).css("cursor","")}).bind("mousedown.resizable",{target:this},function(e){function a(i){var a=parseInt(t(e.data.target).css(i));return isNaN(a)?0:a}var n=i(e);if(""!=n){var d={target:e.data.target,dir:n,startLeft:a("left"),startTop:a("top"),left:a("left"),top:a("top"),startX:e.pageX,startY:e.pageY,startWidth:t(e.data.target).outerWidth(),startHeight:t(e.data.target).outerHeight(),width:t(e.data.target).outerWidth(),height:t(e.data.target).outerHeight(),deltaWidth:t(e.data.target).outerWidth()-t(e.data.target).width(),deltaHeight:t(e.data.target).outerHeight()-t(e.data.target).height()};t(document).bind("mousedown.resizable",d,r),t(document).bind("mousemove.resizable",d,s),t(document).bind("mouseup.resizable",d,o),t("body").css("cursor",n+"-resize")}})})},t.fn.resizable.methods={options:function(e){return t.data(e[0],"resizable").options},enable:function(e){return e.each(function(){t(this).resizable({disabled:!1})})},disable:function(e){return e.each(function(){t(this).resizable({disabled:!0})})}},t.fn.resizable.parseOptions=function(e){var i=t(e);return t.extend({},t.parser.parseOptions(e,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:i.attr("disabled")?!0:void 0})},t.fn.resizable.defaults={disabled:!1,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:1e4,maxHeight:1e4,edge:5,onStartResize:function(){},onResize:function(){},onStopResize:function(){}},t.fn.resizable.isResizing=!1}(jQuery)}),define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={parseOptions:function(e,i){var a=t(e),n={},r=t.trim(a.attr("data-options"));if(r&&("{"!=r.substring(0,1)&&(r="{"+r+"}"),n=new Function("return "+r)()),i){for(var s={},o=0;o<i.length;o++){var d=i[o];if("string"==typeof d)s[d]="width"==d||"height"==d||"left"==d||"top"==d?parseInt(e.style[d])||void 0:a.attr(d);else for(var h in d){var u=d[h];"boolean"==u?s[h]=a.attr(h)?"true"==a.attr(h):void 0:"number"==u&&(s[h]="0"==a.attr(h)?0:parseFloat(a.attr(h))||void 0)}}t.extend(n,s)}return n}},t.fn._outerWidth=function(e){return void 0==e?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(t._boxModel?e-(t(this).outerWidth()-t(this).width()):e)})},t.fn._outerHeight=function(e){return void 0==e?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(t._boxModel?e-(t(this).outerHeight()-t(this).height()):e)})},t.fn._scrollLeft=function(e){return void 0==e?this.scrollLeft():this.each(function(){t(this).scrollLeft(e)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(e){e=void 0==e?!0:e;var i=this[0],a="BODY"==i.tagName?i:this.parent()[0],n=a.fcount||0;return e?i.fitted||(i.fitted=!0,a.fcount=n+1,t(a).addClass("panel-noscroll"),"BODY"==a.tagName&&t("html").addClass("panel-fit")):i.fitted&&(i.fitted=!1,a.fcount=n-1,0==a.fcount&&(t(a).removeClass("panel-noscroll"),"BODY"==a.tagName&&t("html").removeClass("panel-fit"))),{width:t(a).width(),height:t(a).height()}}}(jQuery),function(t){function e(e){1==e.touches.length&&(s?(clearTimeout(dblClickTimer),s=!1,n(e,"dblclick")):(s=!0,dblClickTimer=setTimeout(function(){s=!1},500)),r=setTimeout(function(){n(e,"contextmenu",3)},1e3),n(e,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function i(e){1==e.touches.length&&(r&&clearTimeout(r),n(e,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function a(e){r&&clearTimeout(r),n(e,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault()}function n(e,i,a){var n=new t.Event(i);n.pageX=e.changedTouches[0].pageX,n.pageY=e.changedTouches[0].pageY,n.which=a||1,t(e.target).trigger(n)}var r=null,s=!1;document.addEventListener&&(document.addEventListener("touchstart",e,!0),document.addEventListener("touchmove",i,!0),document.addEventListener("touchend",a,!0))}(jQuery)});