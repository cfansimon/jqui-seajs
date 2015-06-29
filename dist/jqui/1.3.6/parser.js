define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={parseOptions:function(e,i){var n=t(e),o={},r=t.trim(n.attr("data-options"));if(r&&("{"!=r.substring(0,1)&&(r="{"+r+"}"),o=new Function("return "+r)()),i){for(var a={},s=0;s<i.length;s++){var u=i[s];if("string"==typeof u)a[u]="width"==u||"height"==u||"left"==u||"top"==u?parseInt(e.style[u])||void 0:n.attr(u);else for(var h in u){var c=u[h];"boolean"==c?a[h]=n.attr(h)?"true"==n.attr(h):void 0:"number"==c&&(a[h]="0"==n.attr(h)?0:parseFloat(n.attr(h))||void 0)}}t.extend(o,a)}return o}},t.fn._outerWidth=function(e){return void 0==e?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(e-(t(this).outerWidth()-t(this).width()))})},t.fn._outerHeight=function(e){return void 0==e?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(e-(t(this).outerHeight()-t(this).height()))})},t.fn._scrollLeft=function(e){return void 0==e?this.scrollLeft():this.each(function(){t(this).scrollLeft(e)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(e){e=void 0==e?!0:e;var i=this[0],n="BODY"==i.tagName?i:this.parent()[0],o=n.fcount||0;return e?i.fitted||(i.fitted=!0,n.fcount=o+1,t(n).addClass("panel-noscroll"),"BODY"==n.tagName&&t("html").addClass("panel-fit")):i.fitted&&(i.fitted=!1,n.fcount=o-1,0==n.fcount&&(t(n).removeClass("panel-noscroll"),"BODY"==n.tagName&&t("html").removeClass("panel-fit"))),{width:t(n).width(),height:t(n).height()}}}(jQuery),function(t){function e(e){1==e.touches.length&&(a?(clearTimeout(dblClickTimer),a=!1,o(e,"dblclick")):(a=!0,dblClickTimer=setTimeout(function(){a=!1},500)),r=setTimeout(function(){o(e,"contextmenu",3)},1e3),o(e,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function i(e){1==e.touches.length&&(r&&clearTimeout(r),o(e,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault())}function n(e){r&&clearTimeout(r),o(e,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&e.preventDefault()}function o(e,i,n){var o=new t.Event(i);o.pageX=e.changedTouches[0].pageX,o.pageY=e.changedTouches[0].pageY,o.which=n||1,t(e.target).trigger(o)}var r=null,a=!1;document.addEventListener&&(document.addEventListener("touchstart",e,!0),document.addEventListener("touchmove",i,!0),document.addEventListener("touchend",n,!0))}(jQuery)});