define("jqui/1.3.6/combotree-debug", [], function(require, exports, module){
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
require("jqui/1.3.6/combo-debug");
require("jqui/1.3.6/tree-debug");

(function($) {
    function _1(_2) {
        var _3 = $.data(_2, "combotree");
        var _4 = _3.options;
        var _5 = _3.tree;
        $(_2).addClass("combotree-f");
        $(_2).combo(_4);
        var _6 = $(_2).combo("panel");
        if (!_5) {
            _5 = $("<ul></ul>").appendTo(_6);
            $.data(_2, "combotree").tree = _5;
        }
        _5.tree($.extend({}, _4, {
            checkbox: _4.multiple,
            onLoadSuccess: function(_7, _8) {
                var _9 = $(_2).combotree("getValues");
                if (_4.multiple) {
                    var _a = _5.tree("getChecked");
                    for (var i = 0; i < _a.length; i++) {
                        var id = _a[i].id;
                        (function() {
                            for (var i = 0; i < _9.length; i++) {
                                if (id == _9[i]) {
                                    return;
                                }
                            }
                            _9.push(id);
                        })();
                    }
                }
                var _b = $(this).tree("options");
                var _c = _b.onCheck;
                var _d = _b.onSelect;
                _b.onCheck = _b.onSelect = function() {};
                $(_2).combotree("setValues", _9);
                _b.onCheck = _c;
                _b.onSelect = _d;
                _4.onLoadSuccess.call(this, _7, _8);
            },
            onClick: function(_e) {
                if (_4.multiple) {
                    $(this).tree(_e.checked ? "uncheck" : "check", _e.target);
                } else {
                    $(_2).combo("hidePanel");
                }
                _11(_2);
                _4.onClick.call(this, _e);
            },
            onCheck: function(_f, _10) {
                _11(_2);
                _4.onCheck.call(this, _f, _10);
            }
        }));
    };

    function _11(_12) {
        var _13 = $.data(_12, "combotree");
        var _14 = _13.options;
        var _15 = _13.tree;
        var vv = [],
            ss = [];
        if (_14.multiple) {
            var _16 = _15.tree("getChecked");
            for (var i = 0; i < _16.length; i++) {
                vv.push(_16[i].id);
                ss.push(_16[i].text);
            }
        } else {
            var _17 = _15.tree("getSelected");
            if (_17) {
                vv.push(_17.id);
                ss.push(_17.text);
            }
        }
        $(_12).combo("setValues", vv).combo("setText", ss.join(_14.separator));
    };

    function _18(_19, _1a) {
        var _1b = $.data(_19, "combotree").options;
        var _1c = $.data(_19, "combotree").tree;
        _1c.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var vv = [],
            ss = [];
        for (var i = 0; i < _1a.length; i++) {
            var v = _1a[i];
            var s = v;
            var _1d = _1c.tree("find", v);
            if (_1d) {
                s = _1d.text;
                _1c.tree("check", _1d.target);
                _1c.tree("select", _1d.target);
            }
            vv.push(v);
            ss.push(s);
        }
        $(_19).combo("setValues", vv).combo("setText", ss.join(_1b.separator));
    };
    $.fn.combotree = function(_1e, _1f) {
        if (typeof _1e == "string") {
            var _20 = $.fn.combotree.methods[_1e];
            if (_20) {
                return _20(this, _1f);
            } else {
                return this.combo(_1e, _1f);
            }
        }
        _1e = _1e || {};
        return this.each(function() {
            var _21 = $.data(this, "combotree");
            if (_21) {
                $.extend(_21.options, _1e);
            } else {
                $.data(this, "combotree", {
                    options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), _1e)
                });
            }
            _1(this);
        });
    };
    $.fn.combotree.methods = {
        options: function(jq) {
            var _22 = jq.combo("options");
            return $.extend($.data(jq[0], "combotree").options, {
                originalValue: _22.originalValue,
                disabled: _22.disabled,
                readonly: _22.readonly
            });
        },
        tree: function(jq) {
            return $.data(jq[0], "combotree").tree;
        },
        loadData: function(jq, _23) {
            return jq.each(function() {
                var _24 = $.data(this, "combotree").options;
                _24.data = _23;
                var _25 = $.data(this, "combotree").tree;
                _25.tree("loadData", _23);
            });
        },
        reload: function(jq, url) {
            return jq.each(function() {
                var _26 = $.data(this, "combotree").options;
                var _27 = $.data(this, "combotree").tree;
                if (url) {
                    _26.url = url;
                }
                _27.tree({
                    url: _26.url
                });
            });
        },
        setValues: function(jq, _28) {
            return jq.each(function() {
                _18(this, _28);
            });
        },
        setValue: function(jq, _29) {
            return jq.each(function() {
                _18(this, [_29]);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                var _2a = $.data(this, "combotree").tree;
                _2a.find("div.tree-node-selected").removeClass("tree-node-selected");
                var cc = _2a.tree("getChecked");
                for (var i = 0; i < cc.length; i++) {
                    _2a.tree("uncheck", cc[i].target);
                }
                $(this).combo("clear");
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var _2b = $(this).combotree("options");
                if (_2b.multiple) {
                    $(this).combotree("setValues", _2b.originalValue);
                } else {
                    $(this).combotree("setValue", _2b.originalValue);
                }
            });
        }
    };
    $.fn.combotree.parseOptions = function(_2c) {
        return $.extend({}, $.fn.combo.parseOptions(_2c), $.fn.tree.parseOptions(_2c));
    };
    $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {
        editable: false
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
define("jqui/1.3.6/combo-debug", [], function(require, exports, module){
﻿/**
 * jQuery EasyUI 1.3.6
 *
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
require("jqui/1.3.6/parser-debug");
//require('./css/combo.css');
require("jqui/1.3.6/panel-debug");

(function($) {
    function resize(target, width) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var combo = state.combo;
        var panel = state.panel;
        if (width) {
            opts.width = width;
        }
        if (isNaN(opts.width)) {
            var c = $(target).clone();
            c.css("visibility", "hidden");
            c.appendTo("body");
            opts.width = c.outerWidth();
            c.remove();
        }
        combo.appendTo("body");
        var comboText = combo.find("input.combo-text");
        var comboArrow = combo.find(".combo-arrow");
        var comboArrowIcon = comboArrow.find(".combo-arrow-icon");
        var comboArrowWidth = 0;
        if(opts.hasDownArrow){
            var comboArrowWidth = comboArrow._outerWidth()!=0?comboArrow._outerWidth():28;
        }
        combo._outerWidth(opts.width).height(opts.height);
        comboText._outerWidth(opts.width - 11 - comboArrowWidth);
        //todo messager引入时，导致combo.width和height出错，具体看combobox/actions.html
        comboText.css({
            padding: '0 5px',
            'border-right': '1px solid #ccc',
            height: opts.height + "px",
            lineHeight: opts.height + "px"
        });
        comboArrow._outerHeight(opts.height);
        comboArrowIcon._outerHeight(opts.height);
        panel.panel("resize", {
            width: (opts.panelWidth ? opts.panelWidth : opts.width),
            height: opts.panelHeight
        });
        combo.insertAfter(target);
    };

    function create(target) {
        $(target).addClass("combo-f").hide();
        var combo = $("<span class=\"combo\">" + "<input type=\"text\" class=\"combo-text\">" + "<span class=\"combo-arrow\"><span class=\"combo-arrow-icon\"></span></span>" + "<input type=\"hidden\" class=\"combo-value\">" + "</span>").insertAfter(target);
        var panel = $("<div class=\"combo-panel\"></div>").appendTo("body");
        panel.panel({
            doSize: false,
            closed: true,
            cls: "combo-p",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var p = $(this).panel("panel");
                if ($.fn.window) {
                    p.css("z-index", $.fn.window.defaults.zIndex++);
                }
                $(this).panel("resize");
            },
            onBeforeClose: function() {
                hidePanelEach(this);
            },
            onClose: function() {
                var _state = $.data(target, "combo");
                if (_state) {
                    _state.options.onHidePanel.call(target);
                }
            }
        });
        var name = $(target).attr("name");
        if (name) {
            combo.find("input.combo-value").attr("name", name);
            $(target).removeAttr("name").attr("comboName", name);
        }
        return {
            combo: combo,
            panel: panel
        };
    };

    function initStyle(target) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var combo = state.combo;
        if (opts.hasDownArrow) {
            combo.find(".combo-arrow").show();
        } else {
            combo.find(".combo-arrow").hide();
        }
        setDisabled(target, opts.disabled);
        setReadonly(target, opts.readonly);
    };

    function destroy(target) {
        var state = $.data(target, "combo");
        state.panel.panel("destroy");
        state.combo.remove();
        $(target).remove();
    };

    function hidePanelEach(target) {
        $(target).find(".combo-f").each(function() {
            var p = $(this).combo("panel");
            if (p.is(":visible")) {
                p.panel("close");
            }
        });
    };

    function init(target) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var panel = state.panel;
        var combo = state.combo;
        var comboText = combo.find(".combo-text");
        var comboArrow = combo.find(".combo-arrow");
        $(document).unbind(".combo").bind("mousedown.combo", function(e) {
            var p = $(e.target).closest("span.combo,div.combo-p");
            if (p.length) {
                hidePanelEach(p);
                return;
            }
            $("body>div.combo-p>div.combo-panel:visible").panel("close");
        });
        comboText.unbind(".combo");
        comboArrow.unbind(".combo");
        if (!opts.disabled && !opts.readonly) {
            comboText.bind("click.combo", function(e) {
                if (!opts.editable) {
                    _displayPanel.call(this);
                } else {
                    var p = $(this).closest("div.combo-panel");
                    $("div.combo-panel:visible").not(panel).not(p).panel("close");
                }
            }).bind("keydown.combo paste.combo drop.combo", function(e) {
                switch (e.keyCode) {
                    case 38:
                        opts.keyHandler.up.call(target, e);
                        break;
                    case 40:
                        opts.keyHandler.down.call(target, e);
                        break;
                    case 37:
                        opts.keyHandler.left.call(target, e);
                        break;
                    case 39:
                        opts.keyHandler.right.call(target, e);
                        break;
                    case 13:
                        e.preventDefault();
                        opts.keyHandler.enter.call(target, e);
                        return false;
                    case 9:
                    case 27:
                        hidePanel(target);
                        break;
                    default:
                        if (opts.editable) {
                            if (state.timer) {
                                clearTimeout(state.timer);
                            }
                            state.timer = setTimeout(function() {
                                var q = comboText.val();
                                if (state.previousValue != q) {
                                    state.previousValue = q;
                                    $(target).combo("showPanel");
                                    opts.keyHandler.query.call(target, comboText.val(), e);
                                }
                            }, opts.delay);
                        }
                }
            });
            comboArrow.bind("click.combo", function() {
                _displayPanel.call(this);
            }).bind("mouseenter.combo", function() {
                $(this).addClass("combo-arrow-hover");
            }).bind("mouseleave.combo", function() {
                $(this).removeClass("combo-arrow-hover");
            });
        }

        function _displayPanel() {
            if (panel.is(":visible")) {
                hidePanel(target);
            } else {
                var p = $(this).closest("div.combo-panel");
                $("div.combo-panel:visible").not(panel).not(p).panel("close");
                $(target).combo("showPanel");
            }
            comboText.focus();
        };
    };

    function showPanel(target) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var combo = state.combo;
        var panel = state.panel;
        panel.panel("move", {
            left: getPanelLeft(),
            top: getPanelTop()
        });
        if (panel.panel("options").closed) {
            panel.panel("open");
            opts.onShowPanel.call(target);
        }
        (function() {
            if (panel.is(":visible")) {
                panel.panel("move", {
                    left: getPanelLeft(),
                    top: getPanelTop()
                });
                setTimeout(arguments.callee, 200);
            }
        })();

        function getPanelLeft() {
            var left = combo.offset().left;
            if (opts.panelAlign == "right") {
                left += combo._outerWidth() - panel._outerWidth();
            }
            if (left + panel._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - panel._outerWidth();
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        };

        function getPanelTop() {
            var top = combo.offset().top + combo._outerHeight();
            if (top + panel._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = combo.offset().top - panel._outerHeight();
            }
            if (top < $(document).scrollTop()) {
                top = combo.offset().top + combo._outerHeight();
            }
            return top;
        };
    };

    function hidePanel(target) {
        var panel = $.data(target, "combo").panel;
        panel.panel("close");
    };

    function setDisabled(target, mode) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var combo = state.combo;
        if (mode) {
            opts.disabled = true;
            $(target).attr("disabled", true);
            combo.find(".combo-value").attr("disabled", true);
            combo.find(".combo-text").attr("disabled", true);
        } else {
            opts.disabled = false;
            $(target).removeAttr("disabled");
            combo.find(".combo-value").removeAttr("disabled");
            combo.find(".combo-text").removeAttr("disabled");
        }
    };

    function setReadonly(target, mode) {
        var state = $.data(target, "combo");
        var opts = state.options;
        opts.readonly = mode == undefined ? true : mode;
        var readonly = opts.readonly ? true : (!opts.editable);
        state.combo.find(".combo-text").attr("readonly", readonly).css("cursor", readonly ? "pointer" : "");
    };

    function clear(target) {
        var state = $.data(target, "combo");
        var opts = state.options;
        var combo = state.combo;
        if (opts.multiple) {
            combo.find("input.combo-value").remove();
        } else {
            combo.find("input.combo-value").val("");
        }
        combo.find("input.combo-text").val("");
    };

    function getText(target) {
        var combo = $.data(target, "combo").combo;
        return combo.find("input.combo-text").val();
    };

    function setText(target, text) {
        var state = $.data(target, "combo");
        var comboText = state.combo.find("input.combo-text");
        if (comboText.val() != text) {
            comboText.val(text);
            state.previousValue = text;
        }
    };

    function getValues(target) {
        var values = [];
        var combo = $.data(target, "combo").combo;
        combo.find("input.combo-value").each(function() {
            values.push($(this).val());
        });
        return values;
    };

    function setValues(target, values) {
        var opts = $.data(target, "combo").options;
        var oldValues = getValues(target);
        var combo = $.data(target, "combo").combo;
        combo.find("input.combo-value").remove();
        var comboNameame = $(target).attr("comboName");
        for (var i = 0; i < values.length; i++) {
            var input = $("<input type=\"hidden\" class=\"combo-value\">").appendTo(combo);
            if (comboNameame) {
                input.attr("name", comboNameame);
            }
            input.val(values[i]);
        }
        var tmp = [];
        for (var i = 0; i < oldValues.length; i++) {
            tmp[i] = oldValues[i];
        }
        var aa = [];
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (values[i] == tmp[j]) {
                    aa.push(values[i]);
                    tmp.splice(j, 1);
                    break;
                }
            }
        }
        if (aa.length != values.length || values.length != oldValues.length) {
            if (opts.multiple) {
                opts.onChange.call(target, values, oldValues);
            } else {
                opts.onChange.call(target, values[0], oldValues[0]);
            }
        }
    };

    function getValue(target) {
        var values = getValues(target);
        return values[0];
    };

    function setValue(target, value) {
        setValues(target, [value]);
    };

    function _60(target) {
        var opts = $.data(target, "combo").options;
        var fn = opts.onChange;
        opts.onChange = function() {};
        if (opts.multiple) {
            if (opts.value) {
                if (typeof opts.value == "object") {
                    setValues(target, opts.value);
                } else {
                    setValue(target, opts.value);
                }
            } else {
                setValues(target, []);
            }
            opts.originalValue = getValues(target);
        } else {
            setValue(target, opts.value);
            opts.originalValue = opts.value;
        }
        opts.onChange = fn;
    };
    $.fn.combo = function(options, param) {
        if (typeof options == "string") {
            return $.fn.combo.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "combo");
            if (state) {
                $.extend(state.options, options);
            } else {
                var r = create(this);
                state = $.data(this, "combo", {
                    options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), options),
                    combo: r.combo,
                    panel: r.panel,
                    previousValue: null
                });
                $(this).removeAttr("disabled");
            }
            initStyle(this);
            resize(this);
            init(this);
            _60(this);
        });
    };
    $.fn.combo.methods = {
        options: function(jq) {
            return $.data(jq[0], "combo").options;
        },
        panel: function(jq) {
            return $.data(jq[0], "combo").panel;
        },
        textbox: function(jq) {
            return $.data(jq[0], "combo").combo.find("input.combo-text");
        },
        destroy: function(jq) {
            return jq.each(function() {
                destroy(this);
            });
        },
        resize: function(jq, width) {
            return jq.each(function() {
                resize(this, width);
            });
        },
        showPanel: function(jq) {
            return jq.each(function() {
                showPanel(this);
            });
        },
        hidePanel: function(jq) {
            return jq.each(function() {
                hidePanel(this);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                setDisabled(this, true);
                init(this);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                setDisabled(this, false);
                init(this);
            });
        },
        readonly: function(jq, mode) {
            return jq.each(function() {
                setReadonly(this, mode);
                init(this);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                clear(this);
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var opts = $.data(this, "combo").options;
                if (opts.multiple) {
                    $(this).combo("setValues", opts.originalValue);
                } else {
                    $(this).combo("setValue", opts.originalValue);
                }
            });
        },
        getText: function(jq) {
            return getText(jq[0]);
        },
        setText: function(jq, text) {
            return jq.each(function() {
                setText(this, text);
            });
        },
        getValues: function(jq) {
            return getValues(jq[0]);
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                setValues(this, values);
            });
        },
        getValue: function(jq) {
            return getValue(jq[0]);
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                setValue(this, value);
            });
        }
    };
    $.fn.combo.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ["width", "height", "separator", "panelAlign", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        }]), {
            panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined),
            multiple: (t.attr("multiple") ? true : undefined),
            disabled: (t.attr("disabled") ? true : undefined),
            readonly: (t.attr("readonly") ? true : undefined),
            value: (t.val() || undefined)
        });
    };
    $.fn.combo.defaults = $.extend({}, {
        width: "auto",
        height: 30,
        panelWidth: null,
        panelHeight: 200,
        panelAlign: "left",
        multiple: false,
        selectOnNavigation: true,
        separator: ",",
        editable: true,
        disabled: false,
        readonly: false,
        hasDownArrow: true,
        value: "",
        delay: 200,
        deltaX: 19,
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {},
            query: function(q, e) {}
        },
        onShowPanel: function() {},
        onHidePanel: function() {},
        onChange: function(newValue, oldValue) {}
    });
})(jQuery);

});
define("jqui/1.3.6/panel-debug", [], function(require, exports, module){
﻿/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
require("jqui/1.3.6/parser-debug");
//require('./css/panel.css');

(function($) {
    $.fn._remove = function() {
        return this.each(function() {
            $(this).remove();
            try {
                this.outerHTML = "";
            } catch (err) {}
        });
    };

    function removeEach(target) {
        target._remove();
    };

    function resize(target, options) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var panelHeader = panel.children("div.panel-header");
        var panelContent = panel.children("div.panel-content");
        if (options) {
            $.extend(opts, {
                width: options.width,
                height: options.height,
                left: options.left,
                top: options.top
            });
        }
        opts.fit ? $.extend(opts, panel._fit()) : panel._fit(false);
        panel.css({
            left: opts.left,
            top: opts.top
        });
        if (!isNaN(opts.width)) {
            panel._outerWidth(opts.width);
        } else {
            panel.width("auto");
        }
        if (!isNaN(opts.height)) {
            panel._outerHeight(opts.height);
            panelContent._outerHeight(panel.height() - panelHeader._outerHeight());
        } else {
            panelContent.height("auto");
        }
        panel.css("height", "");
        opts.onResize.apply(target, [opts.width, opts.height]);
        $(target).find(">div:visible,>form>div:visible").triggerHandler("_resize");
    };

    function move(target, options) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (options) {
            if (options.left != null) {
                opts.left = options.left;
            }
            if (options.top != null) {
                opts.top = options.top;
            }
        }
        panel.css({
            left: opts.left,
            top: opts.top
        });
        opts.onMove.apply(target, [opts.left, opts.top]);
    };

    function create(target) {
        $(target).addClass("panel-content");
        var panel = $("<div class=\"panel\"></div>").insertBefore(target);
        panel[0].appendChild(target);
        panel.bind("_resize", function() {
            var opts = $.data(target, "panel").options;
            if (opts.fit == true) {
                resize(target);
            }
            return false;
        });
        return panel;
    };

    function init(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (opts.tools && typeof opts.tools == "string") {
            panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
        }
        removeEach(panel.children("div.panel-header"));
        if (opts.title && !opts.noheader) {
            var panelHeader = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(panel);
            if (opts.iconCls) {
                panelHeader.find(".panel-title").addClass("panel-with-icon");
                $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(panelHeader);
            }
            var panelTool = $("<div class=\"panel-tool\"></div>").appendTo(panelHeader);
            panelTool.bind("click", function(e) {
                e.stopPropagation();
            });
            if (opts.tools) {
                if ($.isArray(opts.tools)) {
                    for (var i = 0; i < opts.tools.length; i++) {
                        var t = $("<a href=\"javascript:void(0)\"></a>").addClass(opts.tools[i].iconCls).appendTo(panelTool);
                        if (opts.tools[i].handler) {
                            t.bind("click", eval(opts.tools[i].handler));
                        }
                    }
                } else {
                    $(opts.tools).children().each(function() {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(panelTool);
                    });
                }
            }
            if (opts.collapsible) {
                $("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(panelTool).bind("click", function() {
                    if (opts.collapsed == true) {
                        showPanelContent(target, true);
                    } else {
                        hidePanelContent(target, true);
                    }
                    return false;
                });
            }
            if (opts.minimizable) {
                $("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(panelTool).bind("click", function() {
                    minimize(target);
                    return false;
                });
            }
            if (opts.maximizable) {
                $("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(panelTool).bind("click", function() {
                    if (opts.maximized == true) {
                        restore(target);
                    } else {
                        maximize(target);
                    }
                    return false;
                });
            }
            if (opts.closable) {
                $("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(panelTool).bind("click", function() {
                    hidePanel(target);
                    return false;
                });
            }
            panel.children("div.panel-content").removeClass("panel-content-noheader");
        } else {
            panel.children("div.panel-content").addClass("panel-content-noheader");
        }
    };

    function refreshPanelContent(target, params) {
        var state = $.data(target, "panel");
        var opts = state.options;
        if (params) {
            opts.queryParams = params;
        }
        if (opts.href) {
            if (!state.isLoaded || !opts.cache) {
                var queryParams = $.extend({}, opts.queryParams);
                if (opts.onBeforeLoad.call(target, queryParams) == false) {
                    return;
                }
                state.isLoaded = false;
                destroyPanelContent(target);
                if (opts.loadingMessage) {
                    $(target).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
                }
                opts.loader.call(target, queryParams, function(data) {  //success callback
                    reloadContent(opts.extractor.call(target, data)); //format remote data
                    opts.onLoad.apply(target, arguments);
                    state.isLoaded = true;
                }, function() { //error callback
                    opts.onLoadError.apply(target, arguments);
                });
            }
        } else {
            if (opts.content) {
                if (!state.isLoaded) {
                    destroyPanelContent(target);
                    reloadContent(opts.content);
                    state.isLoaded = true;
                }
            }
        }

        function reloadContent(content) {
            $(target).html(content);
            $.parser.parse($(target));
        };
    };

    function destroyPanelContent(target) {
        var t = $(target);
        t.find(".combo-f").each(function() {
            $(this).combo("destroy");
        });
        t.find(".tooltip-f").each(function() {
            $(this).tooltip("destroy");
        });
        t.children("div").each(function() {
            $(this)._fit(false);
        });
    };

    function resizePanel(target) {
        $(target).find("div.panel:visible").each(function() {
            $(this).triggerHandler("_resize", [true]);
        });
    };

    function showPanel(target, force) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (force != true) {
            if (opts.onBeforeOpen.call(target) == false) {
                return;
            }
        }
        panel.show();
        opts.closed = false;
        opts.minimized = false;
        var restoreBtn = panel.children("div.panel-header").find("a.panel-tool-restore");
        if (restoreBtn.length) {
            opts.maximized = true;
        }
        opts.onOpen.call(target);
        if (opts.maximized == true) {
            opts.maximized = false;
            maximize(target);
        }
        if (opts.collapsed == true) {
            opts.collapsed = false;
            hidePanelContent(target);
        }
        if (!opts.collapsed) {
            refreshPanelContent(target);
            resizePanel(target);
        }
    };

    function hidePanel(target, force) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (force != true) {
            if (opts.onBeforeClose.call(target) == false) {
                return;
            }
        }
        panel._fit(false);
        panel.hide();
        opts.closed = true;
        opts.onClose.call(target);
    };

    function destroy(target, force) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (force != true) {
            if (opts.onBeforeDestroy.call(target) == false) {
                return;
            }
        }
        destroyPanelContent(target);
        removeEach(panel);
        opts.onDestroy.call(target);
    };

    function hidePanelContent(target, animate) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var panelContent = panel.children("div.panel-content");
        var collapseBtn = panel.children("div.panel-header").find("a.panel-tool-collapse");
        if (opts.collapsed == true) {
            return;
        }
        panelContent.stop(true, true);
        if (opts.onBeforeCollapse.call(target) == false) {
            return;
        }
        collapseBtn.addClass("panel-tool-expand");
        if (animate == true) {
            panelContent.slideUp("normal", function() {
                opts.collapsed = true;
                opts.onCollapse.call(target);
            });
        } else {
            panelContent.hide();
            opts.collapsed = true;
            opts.onCollapse.call(target);
        }
    };

    function showPanelContent(target, animate) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var panelContent = panel.children("div.panel-content");
        var collapseBtn = panel.children("div.panel-header").find("a.panel-tool-collapse");
        if (opts.collapsed == false) {
            return;
        }
        panelContent.stop(true, true);
        if (opts.onBeforeExpand.call(target) == false) {
            return;
        }
        collapseBtn.removeClass("panel-tool-expand");
        if (animate == true) {
            panelContent.slideDown("normal", function() {
                opts.collapsed = false;
                opts.onExpand.call(target);
                refreshPanelContent(target);
                resizePanel(target);
            });
        } else {
            panelContent.show();
            opts.collapsed = false;
            opts.onExpand.call(target);
            refreshPanelContent(target);
            resizePanel(target);
        }
    };

    function maximize(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var maxBtn = panel.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == true) {
            return;
        }
        maxBtn.addClass("panel-tool-restore");
        if (!$.data(target, "panel").original) {
            $.data(target, "panel").original = {
                width: opts.width,
                height: opts.height,
                left: opts.left,
                top: opts.top,
                fit: opts.fit
            };
        }
        opts.left = 0;
        opts.top = 0;
        opts.fit = true;
        resize(target);
        opts.minimized = false;
        opts.maximized = true;
        opts.onMaximize.call(target);
    };

    function minimize(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        panel._fit(false);
        panel.hide();
        opts.minimized = true;
        opts.maximized = false;
        opts.onMinimize.call(target);
    };

    function restore(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var maxBtn = panel.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == false) {
            return;
        }
        panel.show();
        maxBtn.removeClass("panel-tool-restore");
        $.extend(opts, $.data(target, "panel").original);
        resize(target);
        opts.minimized = false;
        opts.maximized = false;
        $.data(target, "panel").original = null;
        opts.onRestore.call(target);
    };

    function initStyle(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var panelHeader = $(target).panel("header");
        var panelContent = $(target).panel("body");
        panel.css(opts.style);
        panel.addClass(opts.cls);
        if (opts.border) {
            panel.removeClass("panel-noborder");
        } else {
            panel.addClass("panel-noborder");
        }
        panelHeader.addClass(opts.headerCls);
        panelContent.addClass(opts.bodyCls);
        if (opts.id) {
            $(target).attr("id", opts.id);
        } else {
            $(target).attr("id", "");
        }
    };

    function setTitle(target, title) {
        $.data(target, "panel").options.title = title;
        $(target).panel("header").find("div.panel-title").html(title);
    };
    var TO = false;  //timeout obj
    var _5b = true;
    // @todo unkown func
    $(window).unbind(".panel").bind("resize.panel", function() {
        if (!_5b) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function() {
            _5b = false;
            $("body").children("div.panel:visible").triggerHandler("_resize");
            _5b = true;
            TO = false;
        }, 200);
    });
    $.fn.panel = function(options, param) {
        if (typeof options == "string") {
            return $.fn.panel.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "panel");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.isLoaded = false;
            } else {
                opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), options);
                $(this).attr("title", "");
                state = $.data(this, "panel", {
                    options: opts,
                    panel: create(this),
                    isLoaded: false
                });
            }
            init(this);
            initStyle(this);
            if (opts.doSize == true) {
                state.panel.css("display", "block");
                resize(this);
            }
            if (opts.closed == true || opts.minimized == true) {
                state.panel.hide();
            } else {
                showPanel(this);
            }
        });
    };
    $.fn.panel.methods = {
        options: function(jq) {
            return $.data(jq[0], "panel").options;
        },
        panel: function(jq) {
            return $.data(jq[0], "panel").panel;
        },
        header: function(jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-header");
        },
        body: function(jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-content");
        },
        setTitle: function(jq, title) {
            return jq.each(function() {
                setTitle(this, title);
            });
        },
        open: function(jq, forceOpen) {
            return jq.each(function() {
                showPanel(this, forceOpen);
            });
        },
        close: function(jq, forceClose) {
            return jq.each(function() {
                hidePanel(this, forceClose);
            });
        },
        destroy: function(jq, forceDestroy) {
            return jq.each(function() {
                destroy(this, forceDestroy);
            });
        },
        refresh: function(jq, params) {
            return jq.each(function() {
                var panel = $.data(this, "panel");
                panel.isLoaded = false;
                if (params) {
                    if (typeof params == "string") {
                        panel.options.href = params;
                    } else {
                        panel.options.queryParams = params;
                    }
                }
                refreshPanelContent(this);
            });
        },
        resize: function(jq, options) {
            return jq.each(function() {
                resize(this, options);
            });
        },
        move: function(jq, options) {
            return jq.each(function() {
                move(this, options);
            });
        },
        maximize: function(jq) {
            return jq.each(function() {
                maximize(this);
            });
        },
        minimize: function(jq) {
            return jq.each(function() {
                minimize(this);
            });
        },
        restore: function(jq) {
            return jq.each(function() {
                restore(this);
            });
        },
        collapse: function(jq, animate) {
            return jq.each(function() {
                hidePanelContent(this, animate);
            });
        },
        expand: function(jq, animate) {
            return jq.each(function() {
                showPanelContent(this, animate);
            });
        }
    };
    $.fn.panel.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", {
            cache: "boolean",
            fit: "boolean",
            border: "boolean",
            noheader: "boolean"
        }, {
            collapsible: "boolean",
            minimizable: "boolean",
            maximizable: "boolean"
        }, {
            closable: "boolean",
            collapsed: "boolean",
            minimized: "boolean",
            maximized: "boolean",
            closed: "boolean"
        }]), {
            loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined)
        });
    };
    $.fn.panel.defaults = {
        id: null,
        title: null,
        iconCls: null,
        width: "auto",
        height: "auto",
        left: null,
        top: null,
        cls: null,
        headerCls: null,
        bodyCls: null,
        style: {},
        href: null,
        cache: true,
        fit: false,
        border: true,
        doSize: true,
        noheader: false,
        content: null,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        closed: false,
        tools: null,
        queryParams: {},
        method: "get",
        href: null,
        loadingMessage: "Loading...",
        loader: function(param, successCallback, errorCallback) {
            var opts = $(this).panel("options");
            if (!opts.href) {
                return false;
            }
            $.ajax({
                type: opts.method,
                url: opts.href,
                cache: false,
                data: param,
                dataType: "html",
                success: function(data) {
                    successCallback(data);
                },
                error: function() {
                    errorCallback.apply(this, arguments);
                }
            });
        },
        extractor: function(data) {
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches = pattern.exec(data);
            if (matches) {
                return matches[1];
            } else {
                return data;
            }
        },
        onBeforeLoad: function(param) {},
        onLoad: function() {},
        onLoadError: function() {},
        onBeforeOpen: function() {},
        onOpen: function() {},
        onBeforeClose: function() {},
        onClose: function() {},
        onBeforeDestroy: function() {},
        onDestroy: function() {},
        onResize: function(width, height) {},
        onMove: function(left, top) {},
        onMaximize: function() {},
        onRestore: function() {},
        onMinimize: function() {},
        onBeforeCollapse: function() {},
        onBeforeExpand: function() {},
        onCollapse: function() {},
        onExpand: function() {}
    };
})(jQuery);

});
define("jqui/1.3.6/tree-debug", [], function(require, exports, module){
﻿/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
require("jqui/1.3.6/parser-debug");
//require('./css/tree.css');
require("jqui/1.3.6/draggable-debug");
require("jqui/1.3.6/droppable-debug");
(function($) {
    function _1(_2) {
        var _3 = $(_2);
        _3.addClass("tree");
        return _3;
    };

    function _4(_5) {
        var _6 = $.data(_5, "tree").options;
        $(_5).unbind().bind("mouseover", function(e) {
            var tt = $(e.target);
            var _7 = tt.closest("div.tree-node");
            if (!_7.length) {
                return;
            }
            _7.addClass("tree-node-hover");
            if (tt.hasClass("tree-hit")) {
                if (tt.hasClass("tree-expanded")) {
                    tt.addClass("tree-expanded-hover");
                } else {
                    tt.addClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("mouseout", function(e) {
            var tt = $(e.target);
            var _8 = tt.closest("div.tree-node");
            if (!_8.length) {
                return;
            }
            _8.removeClass("tree-node-hover");
            if (tt.hasClass("tree-hit")) {
                if (tt.hasClass("tree-expanded")) {
                    tt.removeClass("tree-expanded-hover");
                } else {
                    tt.removeClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("click", function(e) {
            var tt = $(e.target);
            var _9 = tt.closest("div.tree-node");
            if (!_9.length) {
                return;
            }
            if (tt.hasClass("tree-hit")) {
                _81(_5, _9[0]);
                return false;
            } else {
                if (tt.hasClass("tree-checkbox")) {
                    _34(_5, _9[0], !tt.hasClass("tree-checkbox1"));
                    return false;
                } else {
                    _da(_5, _9[0]);
                    _6.onClick.call(_5, _c(_5, _9[0]));
                }
            }
            e.stopPropagation();
        }).bind("dblclick", function(e) {
            var _a = $(e.target).closest("div.tree-node");
            if (!_a.length) {
                return;
            }
            _da(_5, _a[0]);
            _6.onDblClick.call(_5, _c(_5, _a[0]));
            e.stopPropagation();
        }).bind("contextmenu", function(e) {
            var _b = $(e.target).closest("div.tree-node");
            if (!_b.length) {
                return;
            }
            _6.onContextMenu.call(_5, e, _c(_5, _b[0]));
            e.stopPropagation();
        });
    };

    function _d(_e) {
        var _f = $.data(_e, "tree").options;
        _f.dnd = false;
        var _10 = $(_e).find("div.tree-node");
        _10.draggable("disable");
        _10.css("cursor", "pointer");
    };

    function _11(_12) {
        var _13 = $.data(_12, "tree");
        var _14 = _13.options;
        var _15 = _13.tree;
        _13.disabledNodes = [];
        _14.dnd = true;
        _15.find("div.tree-node").draggable({
            disabled: false,
            revert: true,
            cursor: "pointer",
            proxy: function(_16) {
                var p = $("<div class=\"tree-node-proxy\"></div>").appendTo("body");
                p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>" + $(_16).find(".tree-title").html());
                p.hide();
                return p;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function(e) {
                if (_14.onBeforeDrag.call(_12, _c(_12, this)) == false) {
                    return false;
                }
                if ($(e.target).hasClass("tree-hit") || $(e.target).hasClass("tree-checkbox")) {
                    return false;
                }
                if (e.which != 1) {
                    return false;
                }
                $(this).next("ul").find("div.tree-node").droppable({
                    accept: "no-accept"
                });
                var _17 = $(this).find("span.tree-indent");
                if (_17.length) {
                    e.data.offsetWidth -= _17.length * _17.width();
                }
            },
            onStartDrag: function() {
                $(this).draggable("proxy").css({
                    left: -10000,
                    top: -10000
                });
                _14.onStartDrag.call(_12, _c(_12, this));
                var _18 = _c(_12, this);
                if (_18.id == undefined) {
                    _18.id = "jqui_tree_node_id_temp";
                    _56(_12, _18);
                }
                _13.draggingNodeId = _18.id;
            },
            onDrag: function(e) {
                var x1 = e.pageX,
                    y1 = e.pageY,
                    x2 = e.data.startX,
                    y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 3) {
                    $(this).draggable("proxy").show();
                }
                this.pageY = e.pageY;
            },
            onStopDrag: function() {
                $(this).next("ul").find("div.tree-node").droppable({
                    accept: "div.tree-node"
                });
                for (var i = 0; i < _13.disabledNodes.length; i++) {
                    $(_13.disabledNodes[i]).droppable("enable");
                }
                _13.disabledNodes = [];
                var _19 = _cd(_12, _13.draggingNodeId);
                if (_19 && _19.id == "jqui_tree_node_id_temp") {
                    _19.id = "";
                    _56(_12, _19);
                }
                _14.onStopDrag.call(_12, _19);
            }
        }).droppable({
            accept: "div.tree-node",
            onDragEnter: function(e, _1a) {
                if (_14.onDragEnter.call(_12, this, _1b(_1a)) == false) {
                    _1c(_1a, false);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    $(this).droppable("disable");
                    _13.disabledNodes.push(this);
                }
            },
            onDragOver: function(e, _1d) {
                if ($(this).droppable("options").disabled) {
                    return;
                }
                var _1e = _1d.pageY;
                var top = $(this).offset().top;
                var _1f = top + $(this).outerHeight();
                _1c(_1d, true);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                if (_1e > top + (_1f - top) / 2) {
                    if (_1f - _1e < 5) {
                        $(this).addClass("tree-node-bottom");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                } else {
                    if (_1e - top < 5) {
                        $(this).addClass("tree-node-top");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                }
                if (_14.onDragOver.call(_12, this, _1b(_1d)) == false) {
                    _1c(_1d, false);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    $(this).droppable("disable");
                    _13.disabledNodes.push(this);
                }
            },
            onDragLeave: function(e, _20) {
                _1c(_20, false);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                _14.onDragLeave.call(_12, this, _1b(_20));
            },
            onDrop: function(e, _21) {
                var _22 = this;
                var _23, _24;
                if ($(this).hasClass("tree-node-append")) {
                    _23 = _25;
                    _24 = "append";
                } else {
                    _23 = _26;
                    _24 = $(this).hasClass("tree-node-top") ? "top" : "bottom";
                }
                if (_14.onBeforeDrop.call(_12, _22, _1b(_21), _24) == false) {
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    return;
                }
                _23(_21, _22, _24);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            }
        });

        function _1b(_27, pop) {
            return $(_27).closest("ul.tree").tree(pop ? "pop" : "getData", _27);
        };

        function _1c(_28, _29) {
            var _2a = $(_28).draggable("proxy").find("span.tree-dnd-icon");
            _2a.removeClass("tree-dnd-yes tree-dnd-no").addClass(_29 ? "tree-dnd-yes" : "tree-dnd-no");
        };

        function _25(_2b, _2c) {
            if (_c(_12, _2c).state == "closed") {
                _75(_12, _2c, function() {
                    _2d();
                });
            } else {
                _2d();
            }

            function _2d() {
                var _2e = _1b(_2b, true);
                $(_12).tree("append", {
                    parent: _2c,
                    data: [_2e]
                });
                _14.onDrop.call(_12, _2c, _2e, "append");
            };
        };

        function _26(_2f, _30, _31) {
            var _32 = {};
            if (_31 == "top") {
                _32.before = _30;
            } else {
                _32.after = _30;
            }
            var _33 = _1b(_2f, true);
            _32.data = _33;
            $(_12).tree("insert", _32);
            _14.onDrop.call(_12, _30, _33, _31);
        };
    };

    function _34(_35, _36, _37) {
        var _38 = $.data(_35, "tree").options;
        if (!_38.checkbox) {
            return;
        }
        var _39 = _c(_35, _36);
        if (_38.onBeforeCheck.call(_35, _39, _37) == false) {
            return;
        }
        var _3a = $(_36);
        var ck = _3a.find(".tree-checkbox");
        ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        if (_37) {
            ck.addClass("tree-checkbox1");
        } else {
            ck.addClass("tree-checkbox0");
        }
        if (_38.cascadeCheck) {
            _3b(_3a);
            _3c(_3a);
        }
        _38.onCheck.call(_35, _39, _37);

        function _3c(_3d) {
            var _3e = _3d.next().find(".tree-checkbox");
            _3e.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
            if (_3d.find(".tree-checkbox").hasClass("tree-checkbox1")) {
                _3e.addClass("tree-checkbox1");
            } else {
                _3e.addClass("tree-checkbox0");
            }
        };

        function _3b(_3f) {
            var _40 = _8c(_35, _3f[0]);
            if (_40) {
                var ck = $(_40.target).find(".tree-checkbox");
                ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                if (_41(_3f)) {
                    ck.addClass("tree-checkbox1");
                } else {
                    if (_42(_3f)) {
                        ck.addClass("tree-checkbox0");
                    } else {
                        ck.addClass("tree-checkbox2");
                    }
                }
                _3b($(_40.target));
            }

            function _41(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function() {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
                        b = false;
                    }
                });
                return b;
            };

            function _42(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function() {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
                        b = false;
                    }
                });
                return b;
            };
        };
    };

    function _43(_44, _45) {
        var _46 = $.data(_44, "tree").options;
        if (!_46.checkbox) {
            return;
        }
        var _47 = $(_45);
        if (_48(_44, _45)) {
            var ck = _47.find(".tree-checkbox");
            if (ck.length) {
                if (ck.hasClass("tree-checkbox1")) {
                    _34(_44, _45, true);
                } else {
                    _34(_44, _45, false);
                }
            } else {
                if (_46.onlyLeafCheck) {
                    $("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_47.find(".tree-title"));
                }
            }
        } else {
            var ck = _47.find(".tree-checkbox");
            if (_46.onlyLeafCheck) {
                ck.remove();
            } else {
                if (ck.hasClass("tree-checkbox1")) {
                    _34(_44, _45, true);
                } else {
                    if (ck.hasClass("tree-checkbox2")) {
                        var _49 = true;
                        var _4a = true;
                        var _4b = _4c(_44, _45);
                        for (var i = 0; i < _4b.length; i++) {
                            if (_4b[i].checked) {
                                _4a = false;
                            } else {
                                _49 = false;
                            }
                        }
                        if (_49) {
                            _34(_44, _45, true);
                        }
                        if (_4a) {
                            _34(_44, _45, false);
                        }
                    }
                }
            }
        }
    };

    function _4d(_4e, ul, _4f, _50) {
        var _51 = $.data(_4e, "tree");
        var _52 = _51.options;
        var _53 = $(ul).prevAll("div.tree-node:first");
        _4f = _52.loadFilter.call(_4e, _4f, _53[0]);
        var _54 = _55(_4e, "domId", _53.attr("id"));
        if (!_50) {
            _54 ? _54.children = _4f : _51.data = _4f;
            $(ul).empty();
        } else {
            if (_54) {
                _54.children ? _54.children = _54.children.concat(_4f) : _54.children = _4f;
            } else {
                _51.data = _51.data.concat(_4f);
            }
        }
        _52.view.render.call(_52.view, _4e, ul, _4f);
        if (_52.dnd) {
            _11(_4e);
        }
        if (_54) {
            _56(_4e, _54);
        }
        var _57 = [];
        var _58 = [];
        for (var i = 0; i < _4f.length; i++) {
            var _59 = _4f[i];
            if (!_59.checked) {
                _57.push(_59);
            }
        }
        _5a(_4f, function(_5b) {
            if (_5b.checked) {
                _58.push(_5b);
            }
        });
        var _5c = _52.onCheck;
        _52.onCheck = function() {};
        if (_57.length) {
            _34(_4e, $("#" + _57[0].domId)[0], false);
        }
        for (var i = 0; i < _58.length; i++) {
            _34(_4e, $("#" + _58[i].domId)[0], true);
        }
        _52.onCheck = _5c;
        setTimeout(function() {
            _5d(_4e, _4e);
        }, 0);
        _52.onLoadSuccess.call(_4e, _54, _4f);
    };

    function _5d(_5e, ul, _5f) {
        var _60 = $.data(_5e, "tree").options;
        if (_60.lines) {
            $(_5e).addClass("tree-lines");
        } else {
            $(_5e).removeClass("tree-lines");
            return;
        }
        if (!_5f) {
            _5f = true;
            $(_5e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            $(_5e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var _61 = $(_5e).tree("getRoots");
            if (_61.length > 1) {
                $(_61[0].target).addClass("tree-root-first");
            } else {
                if (_61.length == 1) {
                    $(_61[0].target).addClass("tree-root-one");
                }
            }
        }
        $(ul).children("li").each(function() {
            var _62 = $(this).children("div.tree-node");
            var ul = _62.next("ul");
            if (ul.length) {
                if ($(this).next().length) {
                    _63(_62);
                }
                _5d(_5e, ul, _5f);
            } else {
                _64(_62);
            }
        });
        var _65 = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
        _65.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");

        function _64(_66, _67) {
            var _68 = _66.find("span.tree-icon");
            _68.prev("span.tree-indent").addClass("tree-join");
        };

        function _63(_69) {
            var _6a = _69.find("span.tree-indent, span.tree-hit").length;
            _69.next().find("div.tree-node").each(function() {
                $(this).children("span:eq(" + (_6a - 1) + ")").addClass("tree-line");
            });
        };
    };

    function _6b(_6c, ul, _6d, _6e) {
        var _6f = $.data(_6c, "tree").options;
        _6d = _6d || {};
        var _70 = null;
        if (_6c != ul) {
            var _71 = $(ul).prev();
            _70 = _c(_6c, _71[0]);
        }
        if (_6f.onBeforeLoad.call(_6c, _70, _6d) == false) {
            return;
        }
        var _72 = $(ul).prev().children("span.tree-folder");
        _72.addClass("tree-loading");
        var _73 = _6f.loader.call(_6c, _6d, function(_74) {
            _72.removeClass("tree-loading");
            _4d(_6c, ul, _74);
            if (_6e) {
                _6e();
            }
        }, function() {
            _72.removeClass("tree-loading");
            _6f.onLoadError.apply(_6c, arguments);
            if (_6e) {
                _6e();
            }
        });
        if (_73 == false) {
            _72.removeClass("tree-loading");
        }
    };

    function _75(_76, _77, _78) {
        var _79 = $.data(_76, "tree").options;
        var hit = $(_77).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            return;
        }
        var _7a = _c(_76, _77);
        if (_79.onBeforeExpand.call(_76, _7a) == false) {
            return;
        }
        hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        hit.next().addClass("tree-folder-open");
        var ul = $(_77).next();
        if (ul.length) {
            if (_79.animate) {
                ul.slideDown("normal", function() {
                    _7a.state = "open";
                    _79.onExpand.call(_76, _7a);
                    if (_78) {
                        _78();
                    }
                });
            } else {
                ul.css("display", "block");
                _7a.state = "open";
                _79.onExpand.call(_76, _7a);
                if (_78) {
                    _78();
                }
            }
        } else {
            var _7b = $("<ul style=\"display:none\"></ul>").insertAfter(_77);
            _6b(_76, _7b[0], {
                id: _7a.id
            }, function() {
                if (_7b.is(":empty")) {
                    _7b.remove();
                }
                if (_79.animate) {
                    _7b.slideDown("normal", function() {
                        _7a.state = "open";
                        _79.onExpand.call(_76, _7a);
                        if (_78) {
                            _78();
                        }
                    });
                } else {
                    _7b.css("display", "block");
                    _7a.state = "open";
                    _79.onExpand.call(_76, _7a);
                    if (_78) {
                        _78();
                    }
                }
            });
        }
    };

    function _7c(_7d, _7e) {
        var _7f = $.data(_7d, "tree").options;
        var hit = $(_7e).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-collapsed")) {
            return;
        }
        var _80 = _c(_7d, _7e);
        if (_7f.onBeforeCollapse.call(_7d, _80) == false) {
            return;
        }
        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        hit.next().removeClass("tree-folder-open");
        var ul = $(_7e).next();
        if (_7f.animate) {
            ul.slideUp("normal", function() {
                _80.state = "closed";
                _7f.onCollapse.call(_7d, _80);
            });
        } else {
            ul.css("display", "none");
            _80.state = "closed";
            _7f.onCollapse.call(_7d, _80);
        }
    };

    function _81(_82, _83) {
        var hit = $(_83).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            _7c(_82, _83);
        } else {
            _75(_82, _83);
        }
    };

    function _84(_85, _86) {
        var _87 = _4c(_85, _86);
        if (_86) {
            _87.unshift(_c(_85, _86));
        }
        for (var i = 0; i < _87.length; i++) {
            _75(_85, _87[i].target);
        }
    };

    function _88(_89, _8a) {
        var _8b = [];
        var p = _8c(_89, _8a);
        while (p) {
            _8b.unshift(p);
            p = _8c(_89, p.target);
        }
        for (var i = 0; i < _8b.length; i++) {
            _75(_89, _8b[i].target);
        }
    };

    function _8d(_8e, _8f) {
        var c = $(_8e).parent();
        while (c[0].tagName != "BODY" && c.css("overflow-y") != "auto") {
            c = c.parent();
        }
        var n = $(_8f);
        var _90 = n.offset().top;
        if (c[0].tagName != "BODY") {
            var _91 = c.offset().top;
            if (_90 < _91) {
                c.scrollTop(c.scrollTop() + _90 - _91);
            } else {
                if (_90 + n.outerHeight() > _91 + c.outerHeight() - 18) {
                    c.scrollTop(c.scrollTop() + _90 + n.outerHeight() - _91 - c.outerHeight() + 18);
                }
            }
        } else {
            c.scrollTop(_90);
        }
    };

    function _92(_93, _94) {
        var _95 = _4c(_93, _94);
        if (_94) {
            _95.unshift(_c(_93, _94));
        }
        for (var i = 0; i < _95.length; i++) {
            _7c(_93, _95[i].target);
        }
    };

    function _96(_97, _98) {
        var _99 = $(_98.parent);
        var _9a = _98.data;
        if (!_9a) {
            return;
        }
        _9a = $.isArray(_9a) ? _9a : [_9a];
        if (!_9a.length) {
            return;
        }
        var ul;
        if (_99.length == 0) {
            ul = $(_97);
        } else {
            if (_48(_97, _99[0])) {
                var _9b = _99.find("span.tree-icon");
                _9b.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_9b);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
            ul = _99.next();
            if (!ul.length) {
                ul = $("<ul></ul>").insertAfter(_99);
            }
        }
        _4d(_97, ul[0], _9a, true);
        _43(_97, ul.prev());
    };

    function _9c(_9d, _9e) {
        var ref = _9e.before || _9e.after;
        var _9f = _8c(_9d, ref);
        var _a0 = _9e.data;
        if (!_a0) {
            return;
        }
        _a0 = $.isArray(_a0) ? _a0 : [_a0];
        if (!_a0.length) {
            return;
        }
        _96(_9d, {
            parent: (_9f ? _9f.target : null),
            data: _a0
        });
        var _a1 = _9f ? _9f.children : $(_9d).tree("getRoots");
        for (var i = 0; i < _a1.length; i++) {
            if (_a1[i].domId == $(ref).attr("id")) {
                for (var j = _a0.length - 1; j >= 0; j--) {
                    _a1.splice((_9e.before ? i : (i + 1)), 0, _a0[j]);
                }
                _a1.splice(_a1.length - _a0.length, _a0.length);
                break;
            }
        }
        var li = $();
        for (var i = 0; i < _a0.length; i++) {
            li = li.add($("#" + _a0[i].domId).parent());
        }
        if (_9e.before) {
            li.insertBefore($(ref).parent());
        } else {
            li.insertAfter($(ref).parent());
        }
    };

    function _a2(_a3, _a4) {
        var _a5 = del(_a4);
        $(_a4).parent().remove();
        if (_a5) {
            if (!_a5.children || !_a5.children.length) {
                var _a6 = $(_a5.target);
                _a6.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                _a6.find(".tree-hit").remove();
                $("<span class=\"tree-indent\"></span>").prependTo(_a6);
                _a6.next().remove();
            }
            _56(_a3, _a5);
            _43(_a3, _a5.target);
        }
        _5d(_a3, _a3);

        function del(_a7) {
            var id = $(_a7).attr("id");
            var _a8 = _8c(_a3, _a7);
            var cc = _a8 ? _a8.children : $.data(_a3, "tree").data;
            for (var i = 0; i < cc.length; i++) {
                if (cc[i].domId == id) {
                    cc.splice(i, 1);
                    break;
                }
            }
            return _a8;
        };
    };

    function _56(_a9, _aa) {
        var _ab = $.data(_a9, "tree").options;
        var _ac = $(_aa.target);
        var _ad = _c(_a9, _aa.target);
        var _ae = _ad.checked;
        if (_ad.iconCls) {
            _ac.find(".tree-icon").removeClass(_ad.iconCls);
        }
        $.extend(_ad, _aa);
        _ac.find(".tree-title").html(_ab.formatter.call(_a9, _ad));
        if (_ad.iconCls) {
            _ac.find(".tree-icon").addClass(_ad.iconCls);
        }
        if (_ae != _ad.checked) {
            _34(_a9, _aa.target, _ad.checked);
        }
    };

    function _af(_b0) {
        var _b1 = _b2(_b0);
        return _b1.length ? _b1[0] : null;
    };

    function _b2(_b3) {
        var _b4 = $.data(_b3, "tree").data;
        for (var i = 0; i < _b4.length; i++) {
            _b5(_b4[i]);
        }
        return _b4;
    };

    function _4c(_b6, _b7) {
        var _b8 = [];
        var n = _c(_b6, _b7);
        var _b9 = n ? n.children : $.data(_b6, "tree").data;
        _5a(_b9, function(_ba) {
            _b8.push(_b5(_ba));
        });
        return _b8;
    };

    function _8c(_bb, _bc) {
        var p = $(_bc).closest("ul").prevAll("div.tree-node:first");
        return _c(_bb, p[0]);
    };

    function _bd(_be, _bf) {
        _bf = _bf || "checked";
        if (!$.isArray(_bf)) {
            _bf = [_bf];
        }
        var _c0 = [];
        for (var i = 0; i < _bf.length; i++) {
            var s = _bf[i];
            if (s == "checked") {
                _c0.push("span.tree-checkbox1");
            } else {
                if (s == "unchecked") {
                    _c0.push("span.tree-checkbox0");
                } else {
                    if (s == "indeterminate") {
                        _c0.push("span.tree-checkbox2");
                    }
                }
            }
        }
        var _c1 = [];
        $(_be).find(_c0.join(",")).each(function() {
            var _c2 = $(this).parent();
            _c1.push(_c(_be, _c2[0]));
        });
        return _c1;
    };

    function _c3(_c4) {
        var _c5 = $(_c4).find("div.tree-node-selected");
        return _c5.length ? _c(_c4, _c5[0]) : null;
    };

    function _c6(_c7, _c8) {
        var _c9 = _c(_c7, _c8);
        if (_c9 && _c9.children) {
            _5a(_c9.children, function(_ca) {
                _b5(_ca);
            });
        }
        return _c9;
    };

    function _c(_cb, _cc) {
        return _55(_cb, "domId", $(_cc).attr("id"));
    };

    function _cd(_ce, id) {
        return _55(_ce, "id", id);
    };

    function _55(_cf, _d0, _d1) {
        var _d2 = $.data(_cf, "tree").data;
        var _d3 = null;
        _5a(_d2, function(_d4) {
            if (_d4[_d0] == _d1) {
                _d3 = _b5(_d4);
                return false;
            }
        });
        return _d3;
    };

    function _b5(_d5) {
        var d = $("#" + _d5.domId);
        _d5.target = d[0];
        _d5.checked = d.find(".tree-checkbox").hasClass("tree-checkbox1");
        return _d5;
    };

    function _5a(_d6, _d7) {
        var _d8 = [];
        for (var i = 0; i < _d6.length; i++) {
            _d8.push(_d6[i]);
        }
        while (_d8.length) {
            var _d9 = _d8.shift();
            if (_d7(_d9) == false) {
                return;
            }
            if (_d9.children) {
                for (var i = _d9.children.length - 1; i >= 0; i--) {
                    _d8.unshift(_d9.children[i]);
                }
            }
        }
    };

    function _da(_db, _dc) {
        var _dd = $.data(_db, "tree").options;
        var _de = _c(_db, _dc);
        if (_dd.onBeforeSelect.call(_db, _de) == false) {
            return;
        }
        $(_db).find("div.tree-node-selected").removeClass("tree-node-selected");
        $(_dc).addClass("tree-node-selected");
        _dd.onSelect.call(_db, _de);
    };

    function _48(_df, _e0) {
        return $(_e0).children("span.tree-hit").length == 0;
    };

    function _e1(_e2, _e3) {
        var _e4 = $.data(_e2, "tree").options;
        var _e5 = _c(_e2, _e3);
        if (_e4.onBeforeEdit.call(_e2, _e5) == false) {
            return;
        }
        $(_e3).css("position", "relative");
        var nt = $(_e3).find(".tree-title");
        var _e6 = nt.outerWidth();
        nt.empty();
        var _e7 = $("<input class=\"tree-editor\">").appendTo(nt);
        _e7.val(_e5.text).focus();
        _e7.width(_e6 + 20);
        _e7.height(document.compatMode == "CSS1Compat" ? (18 - (_e7.outerHeight() - _e7.height())) : 18);
        _e7.bind("click", function(e) {
            return false;
        }).bind("mousedown", function(e) {
            e.stopPropagation();
        }).bind("mousemove", function(e) {
            e.stopPropagation();
        }).bind("keydown", function(e) {
            if (e.keyCode == 13) {
                _e8(_e2, _e3);
                return false;
            } else {
                if (e.keyCode == 27) {
                    _ee(_e2, _e3);
                    return false;
                }
            }
        }).bind("blur", function(e) {
            e.stopPropagation();
            _e8(_e2, _e3);
        });
    };

    function _e8(_e9, _ea) {
        var _eb = $.data(_e9, "tree").options;
        $(_ea).css("position", "");
        var _ec = $(_ea).find("input.tree-editor");
        var val = _ec.val();
        _ec.remove();
        var _ed = _c(_e9, _ea);
        _ed.text = val;
        _56(_e9, _ed);
        _eb.onAfterEdit.call(_e9, _ed);
    };

    function _ee(_ef, _f0) {
        var _f1 = $.data(_ef, "tree").options;
        $(_f0).css("position", "");
        $(_f0).find("input.tree-editor").remove();
        var _f2 = _c(_ef, _f0);
        _56(_ef, _f2);
        _f1.onCancelEdit.call(_ef, _f2);
    };
    $.fn.tree = function(options, param) {
        if (typeof options == "string") {
            return $.fn.tree.methods[options](this, param);
        }
        var options = options || {};
        return this.each(function() {
            var _f5 = $.data(this, "tree");
            var _f6;
            if (_f5) {
                _f6 = $.extend(_f5.options, options);
                _f5.options = _f6;
            } else {
                _f6 = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), options);
                $.data(this, "tree", {
                    options: _f6,
                    tree: _1(this),
                    data: []
                });
                var _f7 = $.fn.tree.parseData(this);
                if (_f7.length) {
                    _4d(this, this, _f7);
                }
            }
            _4(this);
            if (_f6.data) {
                _4d(this, this, $.extend(true, [], _f6.data));
            }
            _6b(this, this);
        });
    };
    $.fn.tree.methods = {
        options: function(jq) {
            return $.data(jq[0], "tree").options;
        },
        loadData: function(jq, _f8) {
            return jq.each(function() {
                _4d(this, this, _f8);
            });
        },
        getNode: function(jq, _f9) {
            return _c(jq[0], _f9);
        },
        getData: function(jq, _fa) {
            return _c6(jq[0], _fa);
        },
        reload: function(jq, _fb) {
            return jq.each(function() {
                if (_fb) {
                    var _fc = $(_fb);
                    var hit = _fc.children("span.tree-hit");
                    hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    _fc.next().remove();
                    _75(this, _fb);
                } else {
                    $(this).empty();
                    _6b(this, this);
                }
            });
        },
        getRoot: function(jq) {
            return _af(jq[0]);
        },
        getRoots: function(jq) {
            return _b2(jq[0]);
        },
        getParent: function(jq, _fd) {
            return _8c(jq[0], _fd);
        },
        getChildren: function(jq, _fe) {
            return _4c(jq[0], _fe);
        },
        getChecked: function(jq, _ff) {
            return _bd(jq[0], _ff);
        },
        getSelected: function(jq) {
            return _c3(jq[0]);
        },
        isLeaf: function(jq, _100) {
            return _48(jq[0], _100);
        },
        find: function(jq, id) {
            return _cd(jq[0], id);
        },
        select: function(jq, _101) {
            return jq.each(function() {
                _da(this, _101);
            });
        },
        check: function(jq, _102) {
            return jq.each(function() {
                _34(this, _102, true);
            });
        },
        uncheck: function(jq, _103) {
            return jq.each(function() {
                _34(this, _103, false);
            });
        },
        collapse: function(jq, _104) {
            return jq.each(function() {
                _7c(this, _104);
            });
        },
        expand: function(jq, _105) {
            return jq.each(function() {
                _75(this, _105);
            });
        },
        collapseAll: function(jq, _106) {
            return jq.each(function() {
                _92(this, _106);
            });
        },
        expandAll: function(jq, _107) {
            return jq.each(function() {
                _84(this, _107);
            });
        },
        expandTo: function(jq, _108) {
            return jq.each(function() {
                _88(this, _108);
            });
        },
        scrollTo: function(jq, _109) {
            return jq.each(function() {
                _8d(this, _109);
            });
        },
        toggle: function(jq, _10a) {
            return jq.each(function() {
                _81(this, _10a);
            });
        },
        append: function(jq, _10b) {
            return jq.each(function() {
                _96(this, _10b);
            });
        },
        insert: function(jq, _10c) {
            return jq.each(function() {
                _9c(this, _10c);
            });
        },
        remove: function(jq, _10d) {
            return jq.each(function() {
                _a2(this, _10d);
            });
        },
        pop: function(jq, _10e) {
            var node = jq.tree("getData", _10e);
            jq.tree("remove", _10e);
            return node;
        },
        update: function(jq, _10f) {
            return jq.each(function() {
                _56(this, _10f);
            });
        },
        enableDnd: function(jq) {
            return jq.each(function() {
                _11(this);
            });
        },
        disableDnd: function(jq) {
            return jq.each(function() {
                _d(this);
            });
        },
        beginEdit: function(jq, _110) {
            return jq.each(function() {
                _e1(this, _110);
            });
        },
        endEdit: function(jq, _111) {
            return jq.each(function() {
                _e8(this, _111);
            });
        },
        cancelEdit: function(jq, _112) {
            return jq.each(function() {
                _ee(this, _112);
            });
        }
    };
    $.fn.tree.parseOptions = function(_113) {
        var t = $(_113);
        return $.extend({}, $.parser.parseOptions(_113, ["url", "method", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean",
            lines: "boolean",
            dnd: "boolean"
        }]));
    };
    $.fn.tree.parseData = function(_114) {
        var data = [];
        _115(data, $(_114));
        return data;

        function _115(aa, tree) {
            tree.children("li").each(function() {
                var node = $(this);
                var item = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), {
                    checked: (node.attr("checked") ? true : undefined)
                });
                item.text = node.children("span").html();
                if (!item.text) {
                    item.text = node.html();
                }
                var _116 = node.children("ul");
                if (_116.length) {
                    item.children = [];
                    _115(item.children, _116);
                }
                aa.push(item);
            });
        };
    };
    var _117 = 1;
    var _118 = {
        render: function(_119, ul, data) {
            var opts = $.data(_119, "tree").options;
            var _11a = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
            var cc = _11b(_11a, data);
            $(ul).append(cc.join(""));

            function _11b(_11c, _11d) {
                var cc = [];
                for (var i = 0; i < _11d.length; i++) {
                    var item = _11d[i];
                    if (item.state != "open" && item.state != "closed") {
                        item.state = "open";
                    }
                    item.domId = "_jqui_tree_" + _117++;
                    cc.push("<li>");
                    cc.push("<div id=\"" + item.domId + "\" class=\"tree-node\">");
                    for (var j = 0; j < _11c; j++) {
                        cc.push("<span class=\"tree-indent\"></span>");
                    }
                    var _11e = false;
                    if (item.state == "closed") {
                        cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
                        cc.push("<span class=\"tree-icon tree-folder " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                    } else {
                        if (item.children && item.children.length) {
                            cc.push("<span class=\"tree-hit tree-expanded\"></span>");
                            cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                        } else {
                            cc.push("<span class=\"tree-indent\"></span>");
                            cc.push("<span class=\"tree-icon tree-file " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                            _11e = true;
                        }
                    }
                    if (opts.checkbox) {
                        if ((!opts.onlyLeafCheck) || _11e) {
                            cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
                        }
                    }
                    cc.push("<span class=\"tree-title\">" + opts.formatter.call(_119, item) + "</span>");
                    cc.push("</div>");
                    if (item.children && item.children.length) {
                        var tmp = _11b(_11c + 1, item.children);
                        cc.push("<ul style=\"display:" + (item.state == "closed" ? "none" : "block") + "\">");
                        cc = cc.concat(tmp);
                        cc.push("</ul>");
                    }
                    cc.push("</li>");
                }
                return cc;
            };
        }
    };
    $.fn.tree.defaults = {
        url: null,
        method: "post",
        animate: false,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        dnd: false,
        data: null,
        formatter: function(node) {
            return node.text;
        },
        loader: function(_11f, _120, _121) {
            var opts = $(this).tree("options");
            if (!opts.url) {
                return false;
            }
            $.ajax({
                type: opts.method,
                url: opts.url,
                data: _11f,
                dataType: "json",
                success: function(data) {
                    _120(data);
                },
                error: function() {
                    _121.apply(this, arguments);
                }
            });
        },
        loadFilter: function(data, _122) {
            return data;
        },
        view: _118,
        onBeforeLoad: function(node, _123) {},
        onLoadSuccess: function(node, data) {},
        onLoadError: function() {},
        onClick: function(node) {},
        onDblClick: function(node) {},
        onBeforeExpand: function(node) {},
        onExpand: function(node) {},
        onBeforeCollapse: function(node) {},
        onCollapse: function(node) {},
        onBeforeCheck: function(node, _124) {},
        onCheck: function(node, _125) {},
        onBeforeSelect: function(node) {},
        onSelect: function(node) {},
        onContextMenu: function(e, node) {},
        onBeforeDrag: function(node) {},
        onStartDrag: function(node) {},
        onStopDrag: function(node) {},
        onDragEnter: function(_126, _127) {},
        onDragOver: function(_128, _129) {},
        onDragLeave: function(_12a, _12b) {},
        onBeforeDrop: function(_12c, _12d, _12e) {},
        onDrop: function(_12f, _130, _131) {},
        onBeforeEdit: function(node) {},
        onAfterEdit: function(node) {},
        onCancelEdit: function(node) {}
    };
})(jQuery);
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
define("jqui/1.3.6/droppable-debug", [], function(require, exports, module){
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
 * droppable - jQuery EasyUI
 * 
 */
require("jqui/1.3.6/parser-debug");

(function($){
	function init(target){
		$(target).addClass('droppable');
		$(target).bind('_dragenter', function(e, source){
			$.data(target, 'droppable').options.onDragEnter.apply(target, [e, source]);
		});
		$(target).bind('_dragleave', function(e, source){
			$.data(target, 'droppable').options.onDragLeave.apply(target, [e, source]);
		});
		$(target).bind('_dragover', function(e, source){
			$.data(target, 'droppable').options.onDragOver.apply(target, [e, source]);
		});
		$(target).bind('_drop', function(e, source){
			$.data(target, 'droppable').options.onDrop.apply(target, [e, source]);
		});
	}
	
	$.fn.droppable = function(options, param){
		if (typeof options == 'string'){
			return $.fn.droppable.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'droppable');
			if (state){
				$.extend(state.options, options);
			} else {
				init(this);
				$.data(this, 'droppable', {
					options: $.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), options)
				});
			}
		});
	};
	
	$.fn.droppable.methods = {
		options: function(jq){
			return $.data(jq[0], 'droppable').options;
		},
		enable: function(jq){
			return jq.each(function(){
				$(this).droppable({disabled:false});
			});
		},
		disable: function(jq){
			return jq.each(function(){
				$(this).droppable({disabled:true});
			});
		}
	};
	
	$.fn.droppable.parseOptions = function(target){
		var t = $(target);
		return $.extend({},	$.parser.parseOptions(target, ['accept']), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
	$.fn.droppable.defaults = {
		accept:null,
		disabled:false,
		onDragEnter:function(e, source){},
		onDragOver:function(e, source){},
		onDragLeave:function(e, source){},
		onDrop:function(e, source){}
	};
})(jQuery);

});
