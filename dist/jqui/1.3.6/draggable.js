define("jqui/1.3.6/draggable",[],function(t){t("jqui/1.3.6/parser"),function(t){function a(a){var e=t.data(a.data.target,"draggable"),r=e.options,n=e.proxy,o=a.data,i=o.startLeft+a.pageX-o.startX,d=o.startTop+a.pageY-o.startY;n&&(n.parent()[0]==document.body?(i=null!=r.deltaX&&void 0!=r.deltaX?a.pageX+r.deltaX:a.pageX-a.data.offsetWidth,d=null!=r.deltaY&&void 0!=r.deltaY?a.pageY+r.deltaY:a.pageY-a.data.offsetHeight):(null!=r.deltaX&&void 0!=r.deltaX&&(i+=a.data.offsetWidth+r.deltaX),null!=r.deltaY&&void 0!=r.deltaY&&(d+=a.data.offsetHeight+r.deltaY))),a.data.parent!=document.body&&(i+=t(a.data.parent).scrollLeft(),d+=t(a.data.parent).scrollTop()),"h"==r.axis?o.left=i:"v"==r.axis?o.top=d:(o.left=i,o.top=d)}function e(a){var e=t.data(a.data.target,"draggable"),r=e.options,n=e.proxy;n||(n=t(a.data.target)),n.css({left:a.data.left,top:a.data.top}),t("body").css("cursor",r.cursor)}function r(r){t.fn.draggable.isDragging=!0;var n=t.data(r.data.target,"draggable"),o=n.options,i=t(".droppable").filter(function(){return r.data.target!=this}).filter(function(){var a=t.data(this,"droppable").options.accept;return a?t(a).filter(function(){return this==r.data.target}).length>0:!0});n.droppables=i;var d=n.proxy;return d||(o.proxy?(d="clone"==o.proxy?t(r.data.target).clone().insertAfter(r.data.target):o.proxy.call(r.data.target,r.data.target),n.proxy=d):d=t(r.data.target)),d.css("position","absolute"),a(r),e(r),o.onStartDrag.call(r.data.target,r),!1}function n(r){var n=t.data(r.data.target,"draggable");a(r),0!=n.options.onDrag.call(r.data.target,r)&&e(r);var o=r.data.target;return n.droppables.each(function(){var a=t(this);if(!a.droppable("options").disabled){var e=a.offset();r.pageX>e.left&&r.pageX<e.left+a.outerWidth()&&r.pageY>e.top&&r.pageY<e.top+a.outerHeight()?(this.entered||(t(this).trigger("_dragenter",[o]),this.entered=!0),t(this).trigger("_dragover",[o])):this.entered&&(t(this).trigger("_dragleave",[o]),this.entered=!1)}}),!1}function o(a){function e(){i&&i.remove(),o.proxy=null}function r(){var r=!1;return o.droppables.each(function(){var n=t(this);if(!n.droppable("options").disabled){var o=n.offset();return a.pageX>o.left&&a.pageX<o.left+n.outerWidth()&&a.pageY>o.top&&a.pageY<o.top+n.outerHeight()?(d.revert&&t(a.data.target).css({position:a.data.startPosition,left:a.data.startLeft,top:a.data.startTop}),t(this).trigger("_drop",[a.data.target]),e(),r=!0,this.entered=!1,!1):void 0}}),r||d.revert||e(),r}t.fn.draggable.isDragging=!1,n(a);var o=t.data(a.data.target,"draggable"),i=o.proxy,d=o.options;if(d.revert)if(1==r())t(a.data.target).css({position:a.data.startPosition,left:a.data.startLeft,top:a.data.startTop});else if(i){var s,g;i.parent()[0]==document.body?(s=a.data.startX-a.data.offsetWidth,g=a.data.startY-a.data.offsetHeight):(s=a.data.startLeft,g=a.data.startTop),i.animate({left:s,top:g},function(){e()})}else t(a.data.target).animate({left:a.data.startLeft,top:a.data.startTop},function(){t(a.data.target).css("position",a.data.startPosition)});else t(a.data.target).css({position:"absolute",left:a.data.left,top:a.data.top}),r();return d.onStopDrag.call(a.data.target,a),t(document).unbind(".draggable"),setTimeout(function(){t("body").css("cursor","")},100),!1}t.fn.draggable=function(a,e){return"string"==typeof a?t.fn.draggable.methods[a](this,e):this.each(function(){function e(a){var e=t.data(a.data.target,"draggable"),r=e.handle,n=t(r).offset(),o=t(r).outerWidth(),i=t(r).outerHeight(),d=a.pageY-n.top,s=n.left+o-a.pageX,g=n.top+i-a.pageY,l=a.pageX-n.left;return Math.min(d,s,g,l)>e.options.edge}var i,d=t.data(this,"draggable");d?(d.handle.unbind(".draggable"),i=t.extend(d.options,a)):i=t.extend({},t.fn.draggable.defaults,t.fn.draggable.parseOptions(this),a||{});var s=i.handle?"string"==typeof i.handle?t(i.handle,this):i.handle:t(this);return t.data(this,"draggable",{options:i,handle:s}),i.disabled?void t(this).css("cursor",""):void s.unbind(".draggable").bind("mousemove.draggable",{target:this},function(a){if(!t.fn.draggable.isDragging){var r=t.data(a.data.target,"draggable").options;e(a)?t(this).css("cursor",r.cursor):t(this).css("cursor","")}}).bind("mouseleave.draggable",{target:this},function(){t(this).css("cursor","")}).bind("mousedown.draggable",{target:this},function(a){if(0!=e(a)){t(this).css("cursor","");var i=t(a.data.target).position(),d=t(a.data.target).offset(),s={startPosition:t(a.data.target).css("position"),startLeft:i.left,startTop:i.top,left:i.left,top:i.top,startX:a.pageX,startY:a.pageY,offsetWidth:a.pageX-d.left,offsetHeight:a.pageY-d.top,target:a.data.target,parent:t(a.data.target).parent()[0]};t.extend(a.data,s);var g=t.data(a.data.target,"draggable").options;0!=g.onBeforeDrag.call(a.data.target,a)&&(t(document).bind("mousedown.draggable",a.data,r),t(document).bind("mousemove.draggable",a.data,n),t(document).bind("mouseup.draggable",a.data,o))}})})},t.fn.draggable.methods={options:function(a){return t.data(a[0],"draggable").options},proxy:function(a){return t.data(a[0],"draggable").proxy},enable:function(a){return a.each(function(){t(this).draggable({disabled:!1})})},disable:function(a){return a.each(function(){t(this).draggable({disabled:!0})})}},t.fn.draggable.parseOptions=function(a){var e=t(a);return t.extend({},t.parser.parseOptions(a,["cursor","handle","axis",{revert:"boolean",deltaX:"number",deltaY:"number",edge:"number"}]),{disabled:e.attr("disabled")?!0:void 0})},t.fn.draggable.defaults={proxy:null,revert:!1,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:!1,edge:0,axis:null,onBeforeDrag:function(){},onStartDrag:function(){},onDrag:function(){},onStopDrag:function(){}},t.fn.draggable.isDragging=!1}(jQuery)}),define("jqui/1.3.6/parser",[],function(){!function(t){t.parser={parseOptions:function(a,e){var r=t(a),n={},o=t.trim(r.attr("data-options"));if(o&&("{"!=o.substring(0,1)&&(o="{"+o+"}"),n=new Function("return "+o)()),e){for(var i={},d=0;d<e.length;d++){var s=e[d];if("string"==typeof s)i[s]="width"==s||"height"==s||"left"==s||"top"==s?parseInt(a.style[s])||void 0:r.attr(s);else for(var g in s){var l=s[g];"boolean"==l?i[g]=r.attr(g)?"true"==r.attr(g):void 0:"number"==l&&(i[g]="0"==r.attr(g)?0:parseFloat(r.attr(g))||void 0)}}t.extend(n,i)}return n}},t.fn._outerWidth=function(a){return void 0==a?this[0]==window?this.width()||document.body.clientWidth:this.outerWidth()||0:this.each(function(){t(this).width(t._boxModel?a-(t(this).outerWidth()-t(this).width()):a)})},t.fn._outerHeight=function(a){return void 0==a?this[0]==window?this.height()||document.body.clientHeight:this.outerHeight()||0:this.each(function(){t(this).height(t._boxModel?a-(t(this).outerHeight()-t(this).height()):a)})},t.fn._scrollLeft=function(a){return void 0==a?this.scrollLeft():this.each(function(){t(this).scrollLeft(a)})},t.fn._propAttr=t.fn.prop||t.fn.attr,t.fn._fit=function(a){a=void 0==a?!0:a;var e=this[0],r="BODY"==e.tagName?e:this.parent()[0],n=r.fcount||0;return a?e.fitted||(e.fitted=!0,r.fcount=n+1,t(r).addClass("panel-noscroll"),"BODY"==r.tagName&&t("html").addClass("panel-fit")):e.fitted&&(e.fitted=!1,r.fcount=n-1,0==r.fcount&&(t(r).removeClass("panel-noscroll"),"BODY"==r.tagName&&t("html").removeClass("panel-fit"))),{width:t(r).width(),height:t(r).height()}}}(jQuery),function(t){function a(a){1==a.touches.length&&(i?(clearTimeout(dblClickTimer),i=!1,n(a,"dblclick")):(i=!0,dblClickTimer=setTimeout(function(){i=!1},500)),o=setTimeout(function(){n(a,"contextmenu",3)},1e3),n(a,"mousedown"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&a.preventDefault())}function e(a){1==a.touches.length&&(o&&clearTimeout(o),n(a,"mousemove"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&a.preventDefault())}function r(a){o&&clearTimeout(o),n(a,"mouseup"),(t.fn.draggable.isDragging||t.fn.resizable.isResizing)&&a.preventDefault()}function n(a,e,r){var n=new t.Event(e);n.pageX=a.changedTouches[0].pageX,n.pageY=a.changedTouches[0].pageY,n.which=r||1,t(a.target).trigger(n)}var o=null,i=!1;document.addEventListener&&(document.addEventListener("touchstart",a,!0),document.addEventListener("touchmove",e,!0),document.addEventListener("touchend",r,!0))}(jQuery)});