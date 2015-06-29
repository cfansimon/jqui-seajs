/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
/**
 * parser - jQuery EasyUI
 * 
 */

(function($){
	$.parser = {
		
		/**
		 * parse options, including standard 'data-options' attribute.
		 * 
		 * calling examples:
		 * $.parser.parseOptions(target);
		 * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
		 */
		parseOptions: function(target, properties){
			var t = $(target);
			var options = {};
			
			var s = $.trim(t.attr('data-options'));
			if (s){
//				var first = s.substring(0,1);
//				var last = s.substring(s.length-1,1);
//				if (first != '{') s = '{' + s;
//				if (last != '}') s = s + '}';
				if (s.substring(0, 1) != '{'){
					s = '{' + s + '}';
				}
				options = (new Function('return ' + s))();
			}
				
			if (properties){
				var opts = {};
				for(var i=0; i<properties.length; i++){
					var pp = properties[i];
					if (typeof pp == 'string'){
						if (pp == 'width' || pp == 'height' || pp == 'left' || pp == 'top'){
							opts[pp] = parseInt(target.style[pp]) || undefined;
						} else {
							opts[pp] = t.attr(pp);
						}
					} else {
						for(var name in pp){
							var type = pp[name];
							if (type == 'boolean'){
								opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
							} else if (type == 'number'){
								opts[name] = t.attr(name)=='0' ? 0 : parseFloat(t.attr(name)) || undefined;
							}
						}
					}
				}
				$.extend(options, opts);
			}
			return options;
		}
	};
	
	/**
	 * extend plugin to set box model width
	 */
	$.fn._outerWidth = function(width){
		if (width == undefined){
			if (this[0] == window){
				return this.width() || document.body.clientWidth;
			}
			return this.outerWidth()||0;
		}
		return this.each(function(){
			$(this).width(width - ($(this).outerWidth() - $(this).width()));
		});
	};
	
	/**
	 * extend plugin to set box model height
	 */
	$.fn._outerHeight = function(height){
		if (height == undefined){
			if (this[0] == window){
				return this.height() || document.body.clientHeight;
			}
			return this.outerHeight()||0;
		}
		return this.each(function(){
			$(this).height(height - ($(this).outerHeight() - $(this).height()));
		});
	};
	
	$.fn._scrollLeft = function(left){
		if (left == undefined){
			return this.scrollLeft();
		} else {
			return this.each(function(){$(this).scrollLeft(left)});
		}
	}
	
	$.fn._propAttr = $.fn.prop || $.fn.attr;
	
	/**
	 * set or unset the fit property of parent container, return the width and height of parent container
	 */
	$.fn._fit = function(fit){
		fit = fit == undefined ? true : fit;
		var t = this[0];
		var p = (t.tagName == 'BODY' ? t : this.parent()[0]);
		var fcount = p.fcount || 0;
		if (fit){
			if (!t.fitted){
				t.fitted = true;
				p.fcount = fcount + 1;
				$(p).addClass('panel-noscroll');
				if (p.tagName == 'BODY'){
					$('html').addClass('panel-fit');
				}
			}
		} else {
			if (t.fitted){
				t.fitted = false;
				p.fcount = fcount - 1;
				if (p.fcount == 0){
					$(p).removeClass('panel-noscroll');
					if (p.tagName == 'BODY'){
						$('html').removeClass('panel-fit');
					}
				}
			}
		}
		return {
			width: $(p).width(),
			height: $(p).height()
		}
	}
	
})(jQuery);

/**
 * support for mobile devices
 */
(function($){
	var longTouchTimer = null;
	var dblTouchTimer = null;
	var isDblClick = false;
	
	function onTouchStart(e){
		if (e.touches.length != 1){return}
		if (!isDblClick){
			isDblClick = true;
			dblClickTimer = setTimeout(function(){
				isDblClick = false;
			}, 500);
		} else {
			clearTimeout(dblClickTimer);
			isDblClick = false;
			fire(e, 'dblclick');
//			e.preventDefault();
		}
		longTouchTimer = setTimeout(function(){
			fire(e, 'contextmenu', 3);
		}, 1000);
		fire(e, 'mousedown');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	function onTouchMove(e){
		if (e.touches.length != 1){return}
		if (longTouchTimer){
			clearTimeout(longTouchTimer);
		}
		fire(e, 'mousemove');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	function onTouchEnd(e){
//		if (e.touches.length > 0){return}
		if (longTouchTimer){
			clearTimeout(longTouchTimer);
		}
		fire(e, 'mouseup');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	
	function fire(e, name, which){
		var event = new $.Event(name);
		event.pageX = e.changedTouches[0].pageX;
		event.pageY = e.changedTouches[0].pageY;
		event.which = which || 1;
		$(e.target).trigger(event);
	}
	
	if (document.addEventListener){
		document.addEventListener("touchstart", onTouchStart, true);
		document.addEventListener("touchmove", onTouchMove, true);
		document.addEventListener("touchend", onTouchEnd, true);
	}
})(jQuery);

