define("jqui/1.3.6/slider-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */

require("jqui/1.3.6/parser-debug");
require("jqui/1.3.6/slider-debug.css.js");
require("jqui/1.3.6/draggable-debug");

(function($){
	function init(target){
		var slider = $('<div class="slider">' +
				'<div class="slider-inner">' +
				'<a href="javascript:void(0)" class="slider-handle"></a>' +
				'<span class="slider-tip"></span>' +
				'</div>' +
				'<div class="slider-rule"></div>' +
				'<div class="slider-rulelabel"></div>' +
				'<div style="clear:both"></div>' +
				'<input type="hidden" class="slider-value">' +
				'</div>').insertAfter(target);
		var t = $(target);
		t.addClass('slider-f').hide();
		var name = t.attr('name');
		if (name){
			slider.find('input.slider-value').attr('name', name);
			t.removeAttr('name').attr('sliderName', name);
		}
		return slider;
	}
	
	/**
	 * set the slider size, for vertical slider, the height property is required
	 */
	function setSize(target, param){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		
		if (param){
			if (param.width) opts.width = param.width;
			if (param.height) opts.height = param.height;
		}
		if (opts.mode == 'h'){
			slider.css('height', '');
			slider.children('div').css('height', '');
			if (!isNaN(opts.width)){
				slider.width(opts.width);
			}
		} else {
			slider.css('width', '');
			slider.children('div').css('width', '');
			if (!isNaN(opts.height)){
				slider.height(opts.height);
				slider.find('div.slider-rule').height(opts.height);
				slider.find('div.slider-rulelabel').height(opts.height);
				slider.find('div.slider-inner')._outerHeight(opts.height);
			}
		}
		initValue(target);
	}
	
	/**
	 * show slider rule if needed
	 */
	function showRule(target){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		
		var aa = opts.mode == 'h' ? opts.rule : opts.rule.slice(0).reverse();
		if (opts.reversed){
			aa = aa.slice(0).reverse();
		}
		_build(aa);
		
		function _build(aa){
			var rule = slider.find('div.slider-rule');
			var label = slider.find('div.slider-rulelabel');
			rule.empty();
			label.empty();
			for(var i=0; i<aa.length; i++){
				var distance = i*100/(aa.length-1)+'%';
				var span = $('<span></span>').appendTo(rule);
				span.css((opts.mode=='h'?'left':'top'), distance);
				
				// show the labels
				if (aa[i] != '|'){
					span = $('<span></span>').appendTo(label);
					span.html(aa[i]);
					if (opts.mode == 'h'){
						span.css({
							left: distance,
							marginLeft: -Math.round(span.outerWidth()/2)
						});
					} else {
						span.css({
							top: distance,
							marginTop: -Math.round(span.outerHeight()/2)
						});
					}
				}
			}
		}
	}
	
	/**
	 * build the slider and set some properties
	 */
	function buildSlider(target){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		
		slider.removeClass('slider-h slider-v slider-disabled');
		slider.addClass(opts.mode == 'h' ? 'slider-h' : 'slider-v');
		slider.addClass(opts.disabled ? 'slider-disabled' : '');
		
		slider.find('a.slider-handle').draggable({
			axis:opts.mode,
			cursor:'pointer',
			disabled: opts.disabled,
			onDrag:function(e){
				var left = e.data.left;
				var width = slider.width();
				if (opts.mode!='h'){
					left = e.data.top;
					width = slider.height();
				}
				if (left < 0 || left > width) {
					return false;
				} else {
					var value = pos2value(target, left);
					adjustValue(value);
					return false;
				}
			},
			onBeforeDrag:function(){
				state.isDragging = true;
			},
			onStartDrag:function(){
				opts.onSlideStart.call(target, opts.value);
			},
			onStopDrag:function(e){
				var value = pos2value(target, (opts.mode=='h'?e.data.left:e.data.top));
				adjustValue(value);
				opts.onSlideEnd.call(target, opts.value);
				opts.onComplete.call(target, opts.value);
				state.isDragging = false;
			}
		});
		slider.find('div.slider-inner').unbind('.slider').bind('mousedown.slider', function(e){
			if (state.isDragging){return}
			var pos = $(this).offset();
			var value = pos2value(target, (opts.mode=='h'?(e.pageX-pos.left):(e.pageY-pos.top)));
			adjustValue(value);
			opts.onComplete.call(target, opts.value);
		});
		
		function adjustValue(value){
			var s = Math.abs(value % opts.step);
			if (s < opts.step/2){
				value -= s;
			} else {
				value = value - s + opts.step;
			}
			setValue(target, value);
		}
	}
	
	/**
	 * set a specified value to slider
	 */
	function setValue(target, value){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		var oldValue = opts.value;
		if (value < opts.min) value = opts.min;
		if (value > opts.max) value = opts.max;
		
		opts.value = value;
		$(target).val(value);
		slider.find('input.slider-value').val(value);
		
		var pos = value2pos(target, value);
		var tip = slider.find('.slider-tip');
		if (opts.showTip){
			tip.show();
			tip.html(opts.tipFormatter.call(target, opts.value));
		} else {
			tip.hide();
		}
		
		if (opts.mode == 'h'){
			var style = 'left:'+pos+'px;';
			slider.find('.slider-handle').attr('style', style);
			tip.attr('style', style +  'margin-left:' + (-Math.round(tip.outerWidth()/2)) + 'px');
		} else {
			var style = 'top:' + pos + 'px;';
			slider.find('.slider-handle').attr('style', style);
			tip.attr('style', style + 'margin-left:' + (-Math.round(tip.outerWidth())) + 'px');
		}
		
		if (oldValue != value){
			opts.onChange.call(target, value, oldValue);
		}
	}
	
	function initValue(target){
		var opts = $.data(target, 'slider').options;
		var fn = opts.onChange;
		opts.onChange = function(){};
		setValue(target, opts.value);
		opts.onChange = fn;
	}
	
	/**
	 * translate value to slider position
	 */
//	function value2pos(target, value){
//		var state = $.data(target, 'slider');
//		var opts = state.options;
//		var slider = state.slider;
//		if (opts.mode == 'h'){
//			var pos = (value-opts.min)/(opts.max-opts.min)*slider.width();
//			if (opts.reversed){
//				pos = slider.width() - pos;
//			}
//		} else {
//			var pos = slider.height() - (value-opts.min)/(opts.max-opts.min)*slider.height();
//			if (opts.reversed){
//				pos = slider.height() - pos;
//			}
//		}
//		return pos.toFixed(0);
//	}
	function value2pos(target, value){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		var size = opts.mode == 'h' ? slider.width() : slider.height();
		var pos = opts.converter.toPosition.call(target, value, size);
		if (opts.mode == 'v'){
			pos = slider.height() - pos;
		}
		if (opts.reversed){
			pos = size - pos;
		}
		return pos.toFixed(0);
	}
	
	/**
	 * translate slider position to value
	 */
//	function pos2value(target, pos){
//		var state = $.data(target, 'slider');
//		var opts = state.options;
//		var slider = state.slider;
//		if (opts.mode == 'h'){
//			var value = opts.min + (opts.max-opts.min)*(pos/slider.width());
//		} else {
//			var value = opts.min + (opts.max-opts.min)*((slider.height()-pos)/slider.height());
//		}
//		return opts.reversed ? opts.max - value.toFixed(0) : value.toFixed(0);
//	}
	function pos2value(target, pos){
		var state = $.data(target, 'slider');
		var opts = state.options;
		var slider = state.slider;
		var size = opts.mode == 'h' ? slider.width() : slider.height();
		var value = opts.converter.toValue.call(target, opts.mode=='h'?(opts.reversed?(size-pos):pos):(size-pos), size);
		return value.toFixed(0);
//		var value = opts.converter.toValue.call(target, opts.mode=='h'?pos:(size-pos), size);
//		return opts.reversed ? opts.max - value.toFixed(0) : value.toFixed(0);
	}
	
	$.fn.slider = function(options, param){
		if (typeof options == 'string'){
			return $.fn.slider.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'slider');
			if (state){
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'slider', {
					options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), options),
					slider: init(this)
				});
				$(this).removeAttr('disabled');
			}
			
			var opts = state.options;
			opts.min = parseFloat(opts.min);
			opts.max = parseFloat(opts.max);
			opts.value = parseFloat(opts.value);
			opts.step = parseFloat(opts.step);
			opts.originalValue = opts.value;
			
			buildSlider(this);
			showRule(this);
			setSize(this);
		});
	};
	
	$.fn.slider.methods = {
		options: function(jq){
			return $.data(jq[0], 'slider').options;
		},
		destroy: function(jq){
			return jq.each(function(){
				$.data(this, 'slider').slider.remove();
				$(this).remove();
			});
		},
		resize: function(jq, param){
			return jq.each(function(){
				setSize(this, param);
			});
		},
		getValue: function(jq){
			return jq.slider('options').value;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		clear: function(jq){
			return jq.each(function(){
				var opts = $(this).slider('options');
				setValue(this, opts.min);
			});
		},
		reset: function(jq){
			return jq.each(function(){
				var opts = $(this).slider('options');
				setValue(this, opts.originalValue);
			});
		},
		enable: function(jq){
			return jq.each(function(){
				$.data(this, 'slider').options.disabled = false;
				buildSlider(this);
			});
		},
		disable: function(jq){
			return jq.each(function(){
				$.data(this, 'slider').options.disabled = true;
				buildSlider(this);
			});
		}
	};
	
	$.fn.slider.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [
			'width','height','mode',{reversed:'boolean',showTip:'boolean',min:'number',max:'number',step:'number'}
		]), {
			value: (t.val() || undefined),
			disabled: (t.attr('disabled') ? true : undefined),
			rule: (t.attr('rule') ? eval(t.attr('rule')) : undefined)
		});
	};
	
	$.fn.slider.defaults = {
		width: 'auto',
		height: 'auto',
		mode: 'h',	// 'h'(horizontal) or 'v'(vertical)
		reversed: false,
		showTip: false,
		disabled: false,
		value: 0,
		min: 0,
		max: 100,
		step: 1,
		rule: [],	// [0,'|',100]
		tipFormatter: function(value){return value},
		converter:{
			toPosition:function(value, size){
				var opts = $(this).slider('options');
				return (value-opts.min)/(opts.max-opts.min)*size;
			},
			toValue:function(pos, size){
				var opts = $(this).slider('options');
				return opts.min + (opts.max-opts.min)*(pos/size);
			}
		},
		onChange: function(value, oldValue){},
		onSlideStart: function(value){},
		onSlideEnd: function(value){},
		onComplete: function(value){}
	};
})(jQuery);

});
define("jqui/1.3.6/parser-debug", [], function(require, exports, module){
﻿/**
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
			if ($._boxModel){
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			} else {
				$(this).width(width);
			}
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
			if ($._boxModel){
				$(this).height(height - ($(this).outerHeight() - $(this).height()));
			} else {
				$(this).height(height);
			}
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


});
define("jqui/1.3.6/slider-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.slider-disabled{opacity:.5;filter:alpha(opacity=50);}.slider-h{height:22px;}.slider-v{width:22px;}.slider-inner{position:relative;height:6px;top:7px;border-width:1px;border-style:solid;border-radius:5px;}.slider-handle{position:absolute;display:block;outline:none;width:20px;height:20px;top:-7px;margin-left:-10px;}.slider-tip{position:absolute;display:inline-block;line-height:12px;font-size:12px;white-space:nowrap;top:-22px;}.slider-rule{position:relative;top:15px;}.slider-rule span{position:absolute;display:inline-block;font-size:0;height:5px;border-width:0 0 0 1px;border-style:solid;}.slider-rulelabel{position:relative;top:20px;}.slider-rulelabel span{position:absolute;display:inline-block;font-size:12px;}.slider-v .slider-inner{width:6px;left:7px;top:0;float:left;}.slider-v .slider-handle{left:3px;margin-top:-10px;}.slider-v .slider-tip{left:-10px;margin-top:-6px;}.slider-v .slider-rule{float:left;top:0;left:16px;}.slider-v .slider-rule span{width:5px;height:"auto";border-left:0;border-width:1px 0 0 0;border-style:solid;}.slider-v .slider-rulelabel{float:left;top:0;left:23px;}.slider-handle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALxSURBVHjalFTfS5NRGD7ffn1zvxy4aFghIf6qkSF05Qz0IuzCy6QRgX+CoDeuKIjwXxBqV7vxWpToTgh2FRT+qBGUJLK50HBTN+d0Oz7P4Tsx1wb1wsP5vnPe9znv+5z3HEO0Nlsikbjb1tYW9fv91zhxfHycqVQqqampqc/4rTULMpoRzc/PPxwcHHzZ3d19LxQKCZfLpRZAJvb29sTW1tbHtbW1V/F4/F0rYm3OxcXFN7u7u/Ls7ExWq1U1gkiB3+fn52rMZrMymUwmGNOSbGFhIYGyZLFYlPl8Xh4eHsqjo6NL4FyhUFA+9EXM23pSux5jsdjk9PT0aymlODk5EbVaTQFZ/gVkKcrlsgrs6+sbyuVy39bX17/iV2oNfcvLyz+j0WjHwcGBsNvtwmazCcMwBDe4JLo1pzdsb28XqVRqf2Ji4ibPzcHsxsbGJvv7+zsoODMgIQNpDNaknKufpy8PCrGh0dHRR6urq0kb1sze3t5x0zQF9BGlUkmBZRMsrR56XvtBV9UFKP0BuZihGQgEOtFvgqQ4QQVmoLNpNL3GSkjm8XhEOBzuwZLbYZ2QyUmfz6fIKLoem5XscDiE0+n8MzIZ+JDHQUKBgyhxJxJSE01IUCeKrzoeB8WsSNKITCaT554krG1sbPyAFveDwaDSqZ5Qk6reakLmdruV9mib73BRjgGU+wRtU5OW8YbwZkB01cSoQEE39Onpqbox2lZWVqper/cpuUhoArdGRkY+kKiZoWSFZsYYxpLD4hJsnSso5/Hs7Oy+/E+bmZnZR2yMHBaX0Fn2oG1ezM3NFf6VjL6Iec5YnV39M+YH7kDoZ8PDw+mlpSWlYaNRQ67hmqbpyxgr1mh8D23WwnWUcBttND4wMDAUiUSudnV1eemwvb1d3Nzc/JVOpz/h0N5Dvy+Y3uEd1u9i41UgqRvoAMLou07gBr6D1noeh7MDZPGdA34D5fpH1mjxitstYmbmAVzWWgUoAUWLiH136Tm6EGAA9KaN+oVolfYAAAAASUVORK5CYII=) no-repeat;}.slider-inner{background:#E0ECFF;}.slider-inner,.slider-rule span{border-color:#95B8E7;}.slider-rulelabel span{color:#000;}');

});
define("jqui/1.3.6/draggable-debug", [], function(require, exports, module){
﻿/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
/**
 * draggable - jQuery EasyUI
 * 
 */
require("jqui/1.3.6/parser-debug");

(function($){
//	var isDragging = false;
	function drag(e){
		var state = $.data(e.data.target, 'draggable');
		var opts = state.options;
		var proxy = state.proxy;
		
		var dragData = e.data;
		var left = dragData.startLeft + e.pageX - dragData.startX;
		var top = dragData.startTop + e.pageY - dragData.startY;
		
		if (proxy){
			if (proxy.parent()[0] == document.body){
				if (opts.deltaX != null && opts.deltaX != undefined){
					left = e.pageX + opts.deltaX;
				} else {
					left = e.pageX - e.data.offsetWidth;
				}
				if (opts.deltaY != null && opts.deltaY != undefined){
					top = e.pageY + opts.deltaY;
				} else {
					top = e.pageY - e.data.offsetHeight;
				}
			} else {
				if (opts.deltaX != null && opts.deltaX != undefined){
					left += e.data.offsetWidth + opts.deltaX;
				}
				if (opts.deltaY != null && opts.deltaY != undefined){
					top += e.data.offsetHeight + opts.deltaY;
				}
			}
		}
		
//		if (opts.deltaX != null && opts.deltaX != undefined){
//			left = e.pageX + opts.deltaX;
//		}
//		if (opts.deltaY != null && opts.deltaY != undefined){
//			top = e.pageY + opts.deltaY;
//		}
		
		if (e.data.parent != document.body) {
			left += $(e.data.parent).scrollLeft();
			top += $(e.data.parent).scrollTop();
		}
		
		if (opts.axis == 'h') {
			dragData.left = left;
		} else if (opts.axis == 'v') {
			dragData.top = top;
		} else {
			dragData.left = left;
			dragData.top = top;
		}
	}
	
	function applyDrag(e){
		var state = $.data(e.data.target, 'draggable');
		var opts = state.options;
		var proxy = state.proxy;
		if (!proxy){
			proxy = $(e.data.target);
		}
//		if (proxy){
//			proxy.css('cursor', opts.cursor);
//		} else {
//			proxy = $(e.data.target);
//			$.data(e.data.target, 'draggable').handle.css('cursor', opts.cursor);
//		}
		proxy.css({
			left:e.data.left,
			top:e.data.top
		});
		$('body').css('cursor', opts.cursor);
	}
	
	function doDown(e){
//		isDragging = true;
		$.fn.draggable.isDragging = true;
		var state = $.data(e.data.target, 'draggable');
		var opts = state.options;
		
		var droppables = $('.droppable').filter(function(){
			return e.data.target != this;
		}).filter(function(){
			var accept = $.data(this, 'droppable').options.accept;
			if (accept){
				return $(accept).filter(function(){
					return this == e.data.target;
				}).length > 0;
			} else {
				return true;
			}
		});
		state.droppables = droppables;
		
		var proxy = state.proxy;
		if (!proxy){
			if (opts.proxy){
				if (opts.proxy == 'clone'){
					proxy = $(e.data.target).clone().insertAfter(e.data.target);
				} else {
					proxy = opts.proxy.call(e.data.target, e.data.target);
				}
				state.proxy = proxy;
			} else {
				proxy = $(e.data.target);
			}
		}
		
		proxy.css('position', 'absolute');
		drag(e);
		applyDrag(e);
		
		opts.onStartDrag.call(e.data.target, e);
		return false;
	}
	
	function doMove(e){
		var state = $.data(e.data.target, 'draggable');
		drag(e);
		if (state.options.onDrag.call(e.data.target, e) != false){
			applyDrag(e);
		}
		
		var source = e.data.target;
		state.droppables.each(function(){
			var dropObj = $(this);
			if (dropObj.droppable('options').disabled){return;}
			
			var p2 = dropObj.offset();
			if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth()
					&& e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()){
				if (!this.entered){
					$(this).trigger('_dragenter', [source]);
					this.entered = true;
				}
				$(this).trigger('_dragover', [source]);
			} else {
				if (this.entered){
					$(this).trigger('_dragleave', [source]);
					this.entered = false;
				}
			}
		});
		
		return false;
	}
	
	function doUp(e){
//		isDragging = false;
		$.fn.draggable.isDragging = false;
//		drag(e);
		doMove(e);
		
		var state = $.data(e.data.target, 'draggable');
		var proxy = state.proxy;
		var opts = state.options;
		if (opts.revert){
			if (checkDrop() == true){
				$(e.data.target).css({
					position:e.data.startPosition,
					left:e.data.startLeft,
					top:e.data.startTop
				});
			} else {
				if (proxy){
					var left, top;
					if (proxy.parent()[0] == document.body){
						left = e.data.startX - e.data.offsetWidth;
						top = e.data.startY - e.data.offsetHeight;
					} else {
						left = e.data.startLeft;
						top = e.data.startTop;
					}
					proxy.animate({
						left: left,
						top: top
					}, function(){
						removeProxy();
					});
				} else {
					$(e.data.target).animate({
						left:e.data.startLeft,
						top:e.data.startTop
					}, function(){
						$(e.data.target).css('position', e.data.startPosition);
					});
				}
			}
		} else {
			$(e.data.target).css({
				position:'absolute',
				left:e.data.left,
				top:e.data.top
			});
			checkDrop();
		}
		
		opts.onStopDrag.call(e.data.target, e);
		
		$(document).unbind('.draggable');
		setTimeout(function(){
			$('body').css('cursor','');
		},100);
		
		function removeProxy(){
			if (proxy){
				proxy.remove();
			}
			state.proxy = null;
		}
		
		function checkDrop(){
			var dropped = false;
			state.droppables.each(function(){
				var dropObj = $(this);
				if (dropObj.droppable('options').disabled){return;}
				
				var p2 = dropObj.offset();
				if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth()
						&& e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()){
					if (opts.revert){
						$(e.data.target).css({
							position:e.data.startPosition,
							left:e.data.startLeft,
							top:e.data.startTop
						});
					}
					$(this).trigger('_drop', [e.data.target]);
					removeProxy();
					dropped = true;
					this.entered = false;
					return false;
				}
			});
			if (!dropped && !opts.revert){
				removeProxy();
			}
			return dropped;
		}
		
		return false;
	}
	
	$.fn.draggable = function(options, param){
		if (typeof options == 'string'){
			return $.fn.draggable.methods[options](this, param);
		}
		
		return this.each(function(){
			var opts;
			var state = $.data(this, 'draggable');
			if (state) {
				state.handle.unbind('.draggable');
				opts = $.extend(state.options, options);
			} else {
				opts = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), options || {});
			}
			var handle = opts.handle ? (typeof opts.handle=='string' ? $(opts.handle, this) : opts.handle) : $(this);
			
			$.data(this, 'draggable', {
				options: opts,
				handle: handle
			});
			
			if (opts.disabled) {
				$(this).css('cursor', '');
				return;
			}
			
			handle.unbind('.draggable').bind('mousemove.draggable', {target:this}, function(e){
//				if (isDragging) return;
				if ($.fn.draggable.isDragging){return}
				var opts = $.data(e.data.target, 'draggable').options;
				if (checkArea(e)){
					$(this).css('cursor', opts.cursor);
				} else {
					$(this).css('cursor', '');
				}
			}).bind('mouseleave.draggable', {target:this}, function(e){
				$(this).css('cursor', '');
			}).bind('mousedown.draggable', {target:this}, function(e){
				if (checkArea(e) == false) return;
				$(this).css('cursor', '');

				var position = $(e.data.target).position();
				var offset = $(e.data.target).offset();
				var data = {
					startPosition: $(e.data.target).css('position'),
					startLeft: position.left,
					startTop: position.top,
					left: position.left,
					top: position.top,
					startX: e.pageX,
					startY: e.pageY,
					offsetWidth: (e.pageX - offset.left),
					offsetHeight: (e.pageY - offset.top),
					target: e.data.target,
					parent: $(e.data.target).parent()[0]
				};
				
				$.extend(e.data, data);
				var opts = $.data(e.data.target, 'draggable').options;
				if (opts.onBeforeDrag.call(e.data.target, e) == false) return;
				
				$(document).bind('mousedown.draggable', e.data, doDown);
				$(document).bind('mousemove.draggable', e.data, doMove);
				$(document).bind('mouseup.draggable', e.data, doUp);
//				$('body').css('cursor', opts.cursor);
			});
			
			// check if the handle can be dragged
			function checkArea(e) {
				var state = $.data(e.data.target, 'draggable');
				var handle = state.handle;
				var offset = $(handle).offset();
				var width = $(handle).outerWidth();
				var height = $(handle).outerHeight();
				var t = e.pageY - offset.top;
				var r = offset.left + width - e.pageX;
				var b = offset.top + height - e.pageY;
				var l = e.pageX - offset.left;
				
				return Math.min(t,r,b,l) > state.options.edge;
			}
			
		});
	};
	
	$.fn.draggable.methods = {
		options: function(jq){
			return $.data(jq[0], 'draggable').options;
		},
		proxy: function(jq){
			return $.data(jq[0], 'draggable').proxy;
		},
		enable: function(jq){
			return jq.each(function(){
				$(this).draggable({disabled:false});
			});
		},
		disable: function(jq){
			return jq.each(function(){
				$(this).draggable({disabled:true});
			});
		}
	};
	
	$.fn.draggable.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, 
				$.parser.parseOptions(target, ['cursor','handle','axis',
				       {'revert':'boolean','deltaX':'number','deltaY':'number','edge':'number'}]), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
	$.fn.draggable.defaults = {
		proxy:null,	// 'clone' or a function that will create the proxy object, 
					// the function has the source parameter that indicate the source object dragged.
		revert:false,
		cursor:'move',
		deltaX:null,
		deltaY:null,
		handle: null,
		disabled: false,
		edge:0,
		axis:null,	// v or h
		
		onBeforeDrag: function(e){},
		onStartDrag: function(e){},
		onDrag: function(e){},
		onStopDrag: function(e){}
	};
	
	$.fn.draggable.isDragging = false;
	
//	$(function(){
//		function touchHandler(e) {
//			var touches = e.changedTouches, first = touches[0], type = "";
//
//			switch(e.type) {
//				case "touchstart": type = "mousedown"; break;
//				case "touchmove":  type = "mousemove"; break;        
//				case "touchend":   type = "mouseup";   break;
//				default: return;
//			}
//			var simulatedEvent = document.createEvent("MouseEvent");
//			simulatedEvent.initMouseEvent(type, true, true, window, 1,
//									  first.screenX, first.screenY,
//									  first.clientX, first.clientY, false,
//									  false, false, false, 0/*left*/, null);
//
//			first.target.dispatchEvent(simulatedEvent);
//			if (isDragging){
//				e.preventDefault();
//			}
//		}
//		
//		if (document.addEventListener){
//			document.addEventListener("touchstart", touchHandler, true);
//			document.addEventListener("touchmove", touchHandler, true);
//			document.addEventListener("touchend", touchHandler, true);
//			document.addEventListener("touchcancel", touchHandler, true); 
//		}
//	});
})(jQuery);

});
