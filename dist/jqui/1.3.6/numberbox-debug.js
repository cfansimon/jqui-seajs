define("jqui/1.3.6/numberbox-debug", [], function(require, exports, module){
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
//require('./css/numberbox.css');

(function($) {
    function _1(_2) {
        $(_2).addClass("numberbox numberbox-f");
        var v = $("<input type=\"hidden\">").insertAfter(_2);
        var _3 = $(_2).attr("name");
        if (_3) {
            v.attr("name", _3);
            $(_2).removeAttr("name").attr("numberboxName", _3);
        }
        return v;
    };

    function _4(_5) {
        var _6 = $.data(_5, "numberbox").options;
        var fn = _6.onChange;
        _6.onChange = function() {};
        _7(_5, _6.parser.call(_5, _6.value));
        _6.onChange = fn;
        _6.originalValue = _8(_5);
    };

    function _9(_a, _b) {
        var _c = $.data(_a, "numberbox").options;
        if (_b) {
            _c.width = _b;
        }
        var t = $(_a);
        var _d = $("<div style=\"display:none\"></div>").insertBefore(t);
        t.appendTo("body");
        if (isNaN(_c.width)) {
            _c.width = t.outerWidth();
        }
        t._outerWidth(_c.width)._outerHeight(_c.height);
        t.css("line-height", t.height() + "px");
        t.insertAfter(_d);
        _d.remove();
    };

    function _8(_e) {
        return $.data(_e, "numberbox").field.val();
    };

    function _7(_f, _10) {
        var _11 = $.data(_f, "numberbox");
        var _12 = _11.options;
        var _13 = _8(_f);
        _10 = _12.parser.call(_f, _10);
        _12.value = _10;
        _11.field.val(_10);
        $(_f).val(_12.formatter.call(_f, _10));
        if (_13 != _10) {
            _12.onChange.call(_f, _10, _13);
        }
    };

    function _14(_15) {
        var _16 = $.data(_15, "numberbox").options;
        $(_15).unbind(".numberbox").bind("keypress.numberbox", function(e) {
            return _16.filter.call(_15, e);
        }).bind("blur.numberbox", function() {
            _7(_15, $(this).val());
            $(this).val(_16.formatter.call(_15, _8(_15)));
        }).bind("focus.numberbox", function() {
            var vv = _8(_15);
            if (vv != _16.parser.call(_15, $(this).val())) {
                $(this).val(_16.formatter.call(_15, vv));
            }
        });
    };

    function _1a(_1b, _1c) {
        var _1d = $.data(_1b, "numberbox").options;
        if (_1c) {
            _1d.disabled = true;
            $(_1b).attr("disabled", true);
        } else {
            _1d.disabled = false;
            $(_1b).removeAttr("disabled");
        }
    };
    $.fn.numberbox = function(options, param) {
        if (typeof options == "string") {
            return $.fn.numberbox.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var numberbox = $.data(this, "numberbox");
            if (numberbox) {
                $.extend(numberbox.options, options);
            } else {
                numberbox = $.data(this, "numberbox", {
                    options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), options),
                    field: _1(this)
                });
                $(this).removeAttr("disabled");
                $(this).css({
                    imeMode: "disabled"
                });
            }
            _1a(this, numberbox.options.disabled);
            _9(this);
            _14(this);
            _4(this);
        });
    };
    $.fn.numberbox.methods = {
        options: function(jq) {
            return $.data(jq[0], "numberbox").options;
        },
        destroy: function(jq) {
            return jq.each(function() {
                $.data(this, "numberbox").field.remove();
                $(this).remove();
            });
        },
        resize: function(jq, _22) {
            return jq.each(function() {
                _9(this, _22);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                _1a(this, true);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                _1a(this, false);
            });
        },
        fix: function(jq) {
            return jq.each(function() {
                _7(this, $(this).val());
            });
        },
        setValue: function(jq, _23) {
            return jq.each(function() {
                _7(this, _23);
            });
        },
        getValue: function(jq) {
            return _8(jq[0]);
        },
        clear: function(jq) {
            return jq.each(function() {
                var _24 = $.data(this, "numberbox");
                _24.field.val("");
                $(this).val("");
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var _25 = $(this).numberbox("options");
                $(this).numberbox("setValue", _25.originalValue);
            });
        }
    };
    $.fn.numberbox.parseOptions = function(_26) {
        var t = $(_26);
        return $.extend({}, $.parser.parseOptions(_26, ["width", "height", "decimalSeparator", "groupSeparator", "suffix", {
            min: "number",
            max: "number",
            precision: "number"
        }]), {
            prefix: (t.attr("prefix") ? t.attr("prefix") : undefined),
            disabled: (t.attr("disabled") ? true : undefined),
            value: (t.val() || undefined)
        });
    };
    $.fn.numberbox.defaults = $.extend({}, {
        width: "auto",
        height: 28,
        disabled: false,
        value: "",
        min: null,
        max: null,
        precision: 0,
        decimalSeparator: ".",
        groupSeparator: "",
        prefix: "",
        suffix: "",
        filter: function(e) {
            var _27 = $(this).numberbox("options");
            if (e.which == 45) {
                return ($(this).val().indexOf("-") == -1 ? true : false);
            }
            var c = String.fromCharCode(e.which);
            if (c == _27.decimalSeparator) {
                return ($(this).val().indexOf(c) == -1 ? true : false);
            } else {
                if (c == _27.groupSeparator) {
                    return true;
                } else {
                    if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                        return true;
                    } else {
                        if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        formatter: function(_28) {
            if (!_28) {
                return _28;
            }
            _28 = _28 + "";
            var _29 = $(this).numberbox("options");
            var s1 = _28,
                s2 = "";
            var _2a = _28.indexOf(".");
            if (_2a >= 0) {
                s1 = _28.substring(0, _2a);
                s2 = _28.substring(_2a + 1, _28.length);
            }
            if (_29.groupSeparator) {
                var p = /(\d+)(\d{3})/;
                while (p.test(s1)) {
                    s1 = s1.replace(p, "$1" + _29.groupSeparator + "$2");
                }
            }
            if (s2) {
                return _29.prefix + s1 + _29.decimalSeparator + s2 + _29.suffix;
            } else {
                return _29.prefix + s1 + _29.suffix;
            }
        },
        parser: function(s) {
            s = s + "";
            var _2b = $(this).numberbox("options");
            if (parseFloat(s) != s) {
                if (_2b.prefix) {
                    s = $.trim(s.replace(new RegExp("\\" + $.trim(_2b.prefix), "g"), ""));
                }
                if (_2b.suffix) {
                    s = $.trim(s.replace(new RegExp("\\" + $.trim(_2b.suffix), "g"), ""));
                }
                if (_2b.groupSeparator) {
                    s = $.trim(s.replace(new RegExp("\\" + _2b.groupSeparator, "g"), ""));
                }
                if (_2b.decimalSeparator) {
                    s = $.trim(s.replace(new RegExp("\\" + _2b.decimalSeparator, "g"), "."));
                }
                s = s.replace(/\s/g, "");
            }
            var val = parseFloat(s).toFixed(_2b.precision);
            if (isNaN(val)) {
                val = "";
            } else {
                if (typeof(_2b.min) == "number" && val < _2b.min) {
                    val = _2b.min.toFixed(_2b.precision);
                } else {
                    if (typeof(_2b.max) == "number" && val > _2b.max) {
                        val = _2b.max.toFixed(_2b.precision);
                    }
                }
            }
            return val;
        },
        onChange: function(_2c, _2d) {}
    });
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


});
