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
    function createTree(target) {
        var state = $.data(target, "combotree");
        var opts = state.options;
        var tree = state.tree;
        $(target).addClass("combotree-f");
        $(target).combo(opts);
        var panel = $(target).combo("panel");
        if (!tree) {
            tree = $("<ul></ul>").appendTo(panel);
            $.data(target, "combotree").tree = tree;
        }
        tree.tree($.extend({}, opts, {
            checkbox: opts.multiple,
            onLoadSuccess: function(node, data) {
                var values = $(target).combotree("getValues");
                if (opts.multiple) {
                    var _a = tree.tree("getChecked");
                    for (var i = 0; i < _a.length; i++) {
                        var id = _a[i].id;
                        (function() {
                            for (var i = 0; i < values.length; i++) {
                                if (id == values[i]) {
                                    return;
                                }
                            }
                            values.push(id);
                        })();
                    }
                }
                var treeOpts = $(this).tree("options");
                var checkEven = treeOpts.onCheck;
                var selectEven = treeOpts.onSelect;
                treeOpts.onCheck = treeOpts.onSelect = function() {};
                $(target).combotree("setValues", values);
                treeOpts.onCheck = checkEven;
                treeOpts.onSelect = selectEven;
                opts.onLoadSuccess.call(this, node, data);
            },
            onClick: function(node) {
                if (opts.multiple) {
                    $(this).tree(node.checked ? "uncheck" : "check", node.target);
                } else {
                    $(target).combo("hidePanel");
                }
                selectNode(target);
                opts.onClick.call(this, node);
            },
            onCheck: function(node, checked) {
                selectNode(target);
                opts.onCheck.call(this, node, checked);
            }
        }));
    };

    function selectNode(target) {
        var state = $.data(target, "combotree");
        var opts = state.options;
        var tree = state.tree;
        var vv = [],
            ss = [];
        if (opts.multiple) {
            var nodes = tree.tree("getChecked");
            for (var i = 0; i < nodes.length; i++) {
                vv.push(nodes[i].id);
                ss.push(nodes[i].text);
            }
        } else {
            var node = tree.tree("getSelected");
            if (node) {
                vv.push(node.id);
                if(!opts.showParentsText){
                    ss.push(node.text);
                }else{
                    var parentNodes = tree.tree("getParents",node.target);
                    var texts = [];
                    for(var i in parentNodes) {
                        texts.push(parentNodes[i].text);
                    }
                    texts.push(node.text);
                    ss.push(texts.join(opts.showParentsTextSeparator));
                }
            }
        }
        $(target).combo("setValues", vv).combo("setText", ss.join(opts.separator));
    };

    function setValues(target, values) {
        var opts = $.data(target, "combotree").options;
        var tree = $.data(target, "combotree").tree;
        tree.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var vv = [],
            ss = [];
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            var s = v;
            var node = tree.tree("find", v);
            if (node) {
                s = node.text;
                tree.tree("check", node.target);
                tree.tree("select", node.target);
            }
            vv.push(v);
            ss.push(s);
        }
        $(target).combo("setValues", vv).combo("setText", ss.join(opts.separator));
    };
    $.fn.combotree = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.combotree.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "combotree");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "combotree", {
                    options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), options)
                });
            }
            createTree(this);
        });
    };
    $.fn.combotree.methods = {
        options: function(jq) {
            var opts = jq.combo("options");
            return $.extend($.data(jq[0], "combotree").options, {
                originalValue: opts.originalValue,
                disabled: opts.disabled,
                readonly: opts.readonly
            });
        },
        tree: function(jq) {
            return $.data(jq[0], "combotree").tree;
        },
        loadData: function(jq, data) {
            return jq.each(function() {
                var opts = $.data(this, "combotree").options;
                opts.data = data;
                var tree = $.data(this, "combotree").tree;
                tree.tree("loadData", data);
            });
        },
        reload: function(jq, url) {
            return jq.each(function() {
                var opts = $.data(this, "combotree").options;
                var tree = $.data(this, "combotree").tree;
                if (url) {
                    opts.url = url;
                }
                tree.tree({
                    url: opts.url
                });
            });
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                setValues(this, values);
            });
        },
        setValue: function(jq, values) {
            return jq.each(function() {
                setValues(this, [values]);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                var state = $.data(this, "combotree").tree;
                state.find("div.tree-node-selected").removeClass("tree-node-selected");
                var cc = state.tree("getChecked");
                for (var i = 0; i < cc.length; i++) {
                    state.tree("uncheck", cc[i].target);
                }
                $(this).combo("clear");
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var opts = $(this).combotree("options");
                if (opts.multiple) {
                    $(this).combotree("setValues", opts.originalValue);
                } else {
                    $(this).combotree("setValue", opts.originalValue);
                }
            });
        }
    };
    $.fn.combotree.parseOptions = function(target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.tree.parseOptions(target));
    };
    $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {
        editable: false,
        showParentsText: false,
        showParentsTextSeparator: ' > '
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

(function($) {
	function wrapTree(target) {
		var tree = $(target);
		tree.addClass("tree");
		return tree;
	};

	function bindTreeEvents(target) {
		var opts = $.data(target, "tree").options;
		$(target).unbind().bind("mouseover", function(e) {
			var tt = $(e.target);
			var node = tt.closest("div.tree-node");
			if (!node.length) {
				return;
			}
			node.addClass("tree-node-hover");
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
			var node = tt.closest("div.tree-node");
			if (!node.length) {
				return;
			}
			node.removeClass("tree-node-hover");
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
			var node = tt.closest("div.tree-node");
			if (!node.length) {
				return;
			}
			if (tt.hasClass("tree-hit")) {
				toggle(target, node[0]);
				return false;
			} else {
				if (tt.hasClass("tree-checkbox")) {
					check(target, node[0], !tt.hasClass("tree-checkbox1"));
					return false;
				} else {
					select(target, node[0]);
					opts.onClick.call(target, getNode(target, node[0]));
				}
			}
			e.stopPropagation();
		}).bind("dblclick", function(e) {
			var node = $(e.target).closest("div.tree-node");
			if (!node.length) {
				return;
			}
			select(target, node[0]);
			opts.onDblClick.call(target, getNode(target, node[0]));
			e.stopPropagation();
		}).bind("contextmenu", function(e) {
			var node = $(e.target).closest("div.tree-node");
			if (!node.length) {
				return;
			}
			opts.onContextMenu.call(target, e, getNode(target, node[0]));
			e.stopPropagation();
		});
	};

	function check(target, nodeDom, isChecked) {
		var opts = $.data(target, "tree").options;
		if (!opts.checkbox) {
			return;
		}
		var node = getNode(target, nodeDom);
		if (opts.onBeforeCheck.call(target, node, isChecked) == false) {
			return;
		}
		var $node = $(nodeDom);
		var ck = $node.find(".tree-checkbox");
		ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
		if (isChecked) {
			ck.addClass("tree-checkbox1");
		} else {
			ck.addClass("tree-checkbox0");
		}
		if (opts.cascadeCheck) {
			_3b($node);
			_3c($node);
		}
		opts.onCheck.call(target, node, isChecked);

		function _3c(targetNode) {
			var _3e = targetNode.next().find(".tree-checkbox");
			_3e.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if (targetNode.find(".tree-checkbox").hasClass("tree-checkbox1")) {
				_3e.addClass("tree-checkbox1");
			} else {
				_3e.addClass("tree-checkbox0");
			}
		};

		function _3b(targetNode) {
			var _40 = getParent(target, targetNode[0]);
			if (_40) {
				var ck = $(_40.target).find(".tree-checkbox");
				ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
				if (_41(targetNode)) {
					ck.addClass("tree-checkbox1");
				} else {
					if (_42(targetNode)) {
						ck.addClass("tree-checkbox0");
					} else {
						ck.addClass("tree-checkbox2");
					}
				}
				_3b($(_40.target));
			}

			function _41(targetNode) {
				var ck = targetNode.find(".tree-checkbox");
				if (ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
					return false;
				}
				var b = true;
				targetNode.parent().siblings().each(function() {
					if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
						b = false;
					}
				});
				return b;
			};

			function _42(targetNode) {
				var ck = targetNode.find(".tree-checkbox");
				if (ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
					return false;
				}
				var b = true;
				targetNode.parent().siblings().each(function() {
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
		if (isLeaf(_44, _45)) {
			var ck = _47.find(".tree-checkbox");
			if (ck.length) {
				if (ck.hasClass("tree-checkbox1")) {
					check(_44, _45, true);
				} else {
					check(_44, _45, false);
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
					check(_44, _45, true);
				} else {
					if (ck.hasClass("tree-checkbox2")) {
						var _49 = true;
						var _4a = true;
						var _4b = getChildren(_44, _45);
						for (var i = 0; i < _4b.length; i++) {
							if (_4b[i].checked) {
								_4a = false;
							} else {
								_49 = false;
							}
						}
						if (_49) {
							check(_44, _45, true);
						}
						if (_4a) {
							check(_44, _45, false);
						}
					}
				}
			}
		}
	};

	function loadData(target, ul, data, _50) {
		var state = $.data(target, "tree");
		var opts = state.options;
		var $topNode = $(ul).prevAll("div.tree-node:first");
		data = opts.loadFilter.call(target, data, $topNode[0]);
		var node = searchNode(target, "domId", $topNode.attr("id"));
		if (!_50) {
			node ? node.children = data : state.data = data;
			$(ul).empty();
		} else {
			if (node) {
				node.children ? node.children = node.children.concat(data) : node.children = data;
			} else {
				state.data = state.data.concat(data);
			}
		}
		opts.view.render.call(opts.view, target, ul, data);
		if (node) {
			update(target, node);
		}
		var _57 = [];
		var _58 = [];
		for (var i = 0; i < data.length; i++) {
			var _59 = data[i];
			if (!_59.checked) {
				_57.push(_59);
			}
		}
		traverseNodeAndItsChildren(data, function(_5b) {
			if (_5b.checked) {
				_58.push(_5b);
			}
		});
		var _5c = opts.onCheck;
		opts.onCheck = function() {};
		if (_57.length) {
			check(target, $("#" + _57[0].domId)[0], false);
		}
		for (var i = 0; i < _58.length; i++) {
			check(target, $("#" + _58[i].domId)[0], true);
		}
		opts.onCheck = _5c;
		setTimeout(function() {
			_5d(target, target);
		}, 0);
		opts.onLoadSuccess.call(target, node, data);
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

	function reload(target, ul, param, onComplete) {
		var opts = $.data(target, "tree").options;
		param = param || {};
		var parentNode = null;
		if (target != ul) {
			var $parentNode = $(ul).prev();
			parentNode = getNode(target, $parentNode[0]);
		}
		if (opts.onBeforeLoad.call(target, parentNode, param) == false) {
			return;
		}
		var folderIcon = $(ul).prev().children("span.tree-folder");
		folderIcon.addClass("tree-loading");
		var flag = opts.loader.call(target, param, function(data) {
			folderIcon.removeClass("tree-loading");
			loadData(target, ul, data);
			if (onComplete) {
				onComplete();
			}
		}, function() {
			folderIcon.removeClass("tree-loading");
			opts.onLoadError.apply(target, arguments);
			if (onComplete) {
				onComplete();
			}
		});
		if (flag == false) {
			folderIcon.removeClass("tree-loading");
		}
	};

	function expand(_76, _77, _78) {
		var _79 = $.data(_76, "tree").options;
		var hit = $(_77).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-expanded")) {
			return;
		}
		var _7a = getNode(_76, _77);
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
			reload(_76, _7b[0], {
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

	function collapse(_7d, _7e) {
		var _7f = $.data(_7d, "tree").options;
		var hit = $(_7e).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-collapsed")) {
			return;
		}
		var _80 = getNode(_7d, _7e);
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

	function toggle(_82, _83) {
		var hit = $(_83).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-expanded")) {
			collapse(_82, _83);
		} else {
			expand(_82, _83);
		}
	};

	function expandAll(_85, _86) {
		var _87 = getChildren(_85, _86);
		if (_86) {
			_87.unshift(getNode(_85, _86));
		}
		for (var i = 0; i < _87.length; i++) {
			expand(_85, _87[i].target);
		}
	};

	function expandTo(_89, _8a) {
		var _8b = [];
		var p = getParent(_89, _8a);
		while (p) {
			_8b.unshift(p);
			p = getParent(_89, p.target);
		}
		for (var i = 0; i < _8b.length; i++) {
			expand(_89, _8b[i].target);
		}
	};

	function scrollTo(_8e, _8f) {
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

	function collapseAll(_93, _94) {
		var _95 = getChildren(_93, _94);
		if (_94) {
			_95.unshift(getNode(_93, _94));
		}
		for (var i = 0; i < _95.length; i++) {
			collapse(_93, _95[i].target);
		}
	};

	function append(_97, _98) {
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
			if (isLeaf(_97, _99[0])) {
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
		loadData(_97, ul[0], _9a, true);
		_43(_97, ul.prev());
	};

	function insert(_9d, _9e) {
		var ref = _9e.before || _9e.after;
		var _9f = getParent(_9d, ref);
		var _a0 = _9e.data;
		if (!_a0) {
			return;
		}
		_a0 = $.isArray(_a0) ? _a0 : [_a0];
		if (!_a0.length) {
			return;
		}
		append(_9d, {
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

	function remove(_a3, _a4) {
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
			update(_a3, _a5);
			_43(_a3, _a5.target);
		}
		_5d(_a3, _a3);

		function del(_a7) {
			var id = $(_a7).attr("id");
			var _a8 = getParent(_a3, _a7);
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

	function update(_a9, _aa) {
		var _ab = $.data(_a9, "tree").options;
		var _ac = $(_aa.target);
		var _ad = getNode(_a9, _aa.target);
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
			check(_a9, _aa.target, _ad.checked);
		}
	};

	function getRoot(_b0) {
		var _b1 = getRoots(_b0);
		return _b1.length ? _b1[0] : null;
	};

	function getRoots(_b3) {
		var _b4 = $.data(_b3, "tree").data;
		for (var i = 0; i < _b4.length; i++) {
			appendNodeAttrs(_b4[i]);
		}
		return _b4;
	};

	function getChildren(_b6, _b7) {
		var _b8 = [];
		var n = getNode(_b6, _b7);
		var _b9 = n ? n.children : $.data(_b6, "tree").data;
		traverseNodeAndItsChildren(_b9, function(_ba) {
			_b8.push(appendNodeAttrs(_ba));
		});
		return _b8;
	};

	function getParent(target, nodeDom) {
		var p = $(nodeDom).closest("ul").prevAll("div.tree-node:first");
		return getNode(target, p[0]);
	};

	function getParents(target, nodeDom) {
		var p = $(nodeDom).closest("ul").prevAll("div.tree-node:first");
		var nodes = [];
		_getParent(target, nodeDom);
		return nodes;

		function _getParent(target, nodeDom) {
			var n = getParent(target, nodeDom);
			if(n!=null){
				nodes.unshift(n);
				_getParent(target, n.target);
			}
		};

	};

	function getChecked(target, state) {
		state = state || "checked";
		if (!$.isArray(state)) {
			state = [state];
		}
		var selectors = [];
		for (var i = 0; i < state.length; i++) {
			var s = state[i];
			if (s == "checked") {
				selectors.push("span.tree-checkbox1");
			} else {
				if (s == "unchecked") {
					selectors.push("span.tree-checkbox0");
				} else {
					if (s == "indeterminate") {
						selectors.push("span.tree-checkbox2");
					}
				}
			}
		}
		var nodes = [];
		$(target).find(selectors.join(",")).each(function() {
			var _c2 = $(this).parent();
			nodes.push(getNode(target, _c2[0]));
		});
		return nodes;
	};

	function getSelected(target) {
		var $node = $(target).find("div.tree-node-selected");
		return $node.length ? getNode(target, $node[0]) : null;
	};

	// function getData(target, nodeDom) {
	// 	var node = getNode(target, nodeDom);
	// 	if (node && node.children) {
	// 		traverseNodeAndItsChildren(node.children, function(n) {
	// 			appendNodeAttrs(n);
	// 		});
	// 	}
	// 	return node;
	// };

	function getNode(target, nodeDom) {
		return searchNode(target, "domId", $(nodeDom).attr("id"));
	};

	function find(target, id) {
		return searchNode(target, "id", id);
	};

	function searchNode(target, attr, nodeDomId) {
		var nodes = $.data(target, "tree").data;
		var node = null;
		traverseNodeAndItsChildren(nodes, function(currentNode) {
			if (currentNode[attr] == nodeDomId) {
				node = appendNodeAttrs(currentNode);
				return false;
			}
		});
		return node;
	};

	function appendNodeAttrs(node) {
		var d = $("#" + node.domId);
		node.target = d[0];
		node.checked = d.find(".tree-checkbox").hasClass("tree-checkbox1");
		return node;
	};

	function traverseNodeAndItsChildren(nodes, onCurrent) {
		var tempNodes = [];
		for (var i = 0; i < nodes.length; i++) {
			tempNodes.push(nodes[i]);
		}
		while (tempNodes.length) {
			var currentNode = tempNodes.shift();
			// callback to receive each node,inculed itself and each child node of it
			if (onCurrent(currentNode) == false) {
				return;
			}
			if (currentNode.children) {
				for (var i = currentNode.children.length - 1; i >= 0; i--) {
					tempNodes.unshift(currentNode.children[i]);
				}
			}
		}
	};

	function select(target, nodeDom) {
		var opts = $.data(target, "tree").options;
		var node = getNode(target, nodeDom);
		if (opts.onBeforeSelect.call(target, node) == false) {
			return;
		}
		$(target).find("div.tree-node-selected").removeClass("tree-node-selected");
		$(nodeDom).addClass("tree-node-selected");
		opts.onSelect.call(target, node);
	};

	function isLeaf(target, nodeDom) {
		return $(nodeDom).children("span.tree-hit").length == 0;
	};

	function beginEdit(target, nodeDom) {
		var opts = $.data(target, "tree").options;
		var node = getNode(target, nodeDom);
		if (opts.onBeforeEdit.call(target, node) == false) {
			return;
		}
		$(nodeDom).css("position", "relative");
		var nt = $(nodeDom).find(".tree-title");
		var _e6 = nt.outerWidth();
		nt.empty();
		var _e7 = $("<input class=\"tree-editor\">").appendTo(nt);
		_e7.val(node.text).focus();
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
				endEdit(target, nodeDom);
				return false;
			} else {
				if (e.keyCode == 27) {
					cancelEdit(target, nodeDom);
					return false;
				}
			}
		}).bind("blur", function(e) {
			e.stopPropagation();
			endEdit(target, nodeDom);
		});
	};

	function endEdit(target, nodeDom) {
		var opts = $.data(target, "tree").options;
		$(nodeDom).css("position", "");
		var _ec = $(nodeDom).find("input.tree-editor");
		var val = _ec.val();
		_ec.remove();
		var node = getNode(target, nodeDom);
		node.text = val;
		update(target, node);
		opts.onAfterEdit.call(target, node);
	};

	function cancelEdit(target, nodeDom) {
		var opts = $.data(target, "tree").options;
		$(nodeDom).css("position", "");
		$(nodeDom).find("input.tree-editor").remove();
		var node = getNode(target, nodeDom);
		update(target, node);
		opts.onCancelEdit.call(target, node);
	};
	$.fn.tree = function(options, param) {
		if (typeof options == "string") {
			return $.fn.tree.methods[options](this, param);
		}
		var options = options || {};
		return this.each(function() {
			var state = $.data(this, "tree");
			var opts;
			if (state) {
				opts = $.extend(state.options, options);
				state.options = opts;
			} else {
				opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), options);
				$.data(this, "tree", {
					options: opts,
					tree: wrapTree(this),
					data: []
				});
			}
			bindTreeEvents(this);
			if (opts.data) {
				loadData(this, this, $.extend(true, [], opts.data));
			}
			reload(this, this);
		});
	};
	$.fn.tree.methods = {
		options: function(jq) {
			return $.data(jq[0], "tree").options;
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				loadData(this, this, data);
			});
		},
		getNode: function(jq, nodeDom) {
			return getNode(jq[0], nodeDom);
		},
		// getData: function(jq, nodeDom) {
		// 	return getData(jq[0], nodeDom);
		// },
		reload: function(jq, nodeDom) {
			return jq.each(function() {
				if (nodeDom) {
					var node = $(nodeDom);
					var hit = node.children("span.tree-hit");
					hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
					node.next().remove();
					expand(this, nodeDom);
				} else {
					$(this).empty();
					reload(this, this);
				}
			});
		},
		getRoot: function(jq) {
			return getRoot(jq[0]);
		},
		getRoots: function(jq) {
			return getRoots(jq[0]);
		},
		getParent: function(jq, nodeDom) {
			return getParent(jq[0], nodeDom);
		},
		getParents: function(jq, nodeDom) {
			return getParents(jq[0], nodeDom);
		},
		getChildren: function(jq, nodeDom) {
			return getChildren(jq[0], nodeDom);
		},
		getChecked: function(jq, state) {
			return getChecked(jq[0], state);
		},
		getSelected: function(jq) {
			return getSelected(jq[0]);
		},
		isLeaf: function(jq, nodeDom) {
			return isLeaf(jq[0], nodeDom);
		},
		find: function(jq, id) {
			return find(jq[0], id);
		},
		select: function(jq, nodeDom) {
			return jq.each(function() {
				select(this, nodeDom);
			});
		},
		check: function(jq, nodeDom) {
			return jq.each(function() {
				check(this, nodeDom, true);
			});
		},
		uncheck: function(jq, nodeDom) {
			return jq.each(function() {
				check(this, nodeDom, false);
			});
		},
		collapse: function(jq, nodeDom) {
			return jq.each(function() {
				collapse(this, nodeDom);
			});
		},
		expand: function(jq, nodeDom) {
			return jq.each(function() {
				expand(this, nodeDom);
			});
		},
		collapseAll: function(jq, nodeDom) {
			return jq.each(function() {
				collapseAll(this, nodeDom);
			});
		},
		expandAll: function(jq, nodeDom) {
			return jq.each(function() {
				expandAll(this, nodeDom);
			});
		},
		expandTo: function(jq, nodeDom) {
			return jq.each(function() {
				expandTo(this, nodeDom);
			});
		},
		scrollTo: function(jq, nodeDom) {
			return jq.each(function() {
				scrollTo(this, nodeDom);
			});
		},
		toggle: function(jq, nodeDom) {
			return jq.each(function() {
				toggle(this, nodeDom);
			});
		},
		append: function(jq, param) {
			return jq.each(function() {
				append(this, param);
			});
		},
		insert: function(jq, param) {
			return jq.each(function() {
				insert(this, param);
			});
		},
		remove: function(jq, nodeDom) {
			return jq.each(function() {
				remove(this, nodeDom);
			});
		},
		// pop: function(jq, nodeDom) {
		// 	var node = jq.tree("getData", nodeDom);
		// 	jq.tree("remove", nodeDom);
		// 	return node;
		// },
		update: function(jq, param) {
			return jq.each(function() {
				update(this, param);
			});
		},
		beginEdit: function(jq, nodeDom) {
			return jq.each(function() {
				beginEdit(this, nodeDom);
			});
		},
		endEdit: function(jq, nodeDom) {
			return jq.each(function() {
				endEdit(this, nodeDom);
			});
		},
		cancelEdit: function(jq, nodeDom) {
			return jq.each(function() {
				cancelEdit(this, nodeDom);
			});
		}
	};
	$.fn.tree.parseOptions = function(target) {
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, ["url", "method", {
			checkbox: "boolean",
			cascadeCheck: "boolean",
			onlyLeafCheck: "boolean"
		}, {
			animate: "boolean",
			lines: "boolean"
		}]));
	};
	var nodeIndex = 1;
	var view = {
		render: function(target, ul, data) {
			var opts = $.data(target, "tree").options;
			var indentCount = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
			var cc = wrapNode(indentCount, data);
			$(ul).append(cc.join(""));

			function wrapNode(indentCount, data) {
				var cc = [];
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					if (item.state != "open" && item.state != "closed") {
						item.state = "open";
					}
					item.domId = "_jqui_tree_" + nodeIndex++;
					cc.push("<li>");
					cc.push("<div id=\"" + item.domId + "\" class=\"tree-node\">");
					for (var j = 0; j < indentCount; j++) {
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
					cc.push("<span class=\"tree-title\">" + opts.formatter.call(target, item) + "</span>");
					cc.push("</div>");
					if (item.children && item.children.length) {
						var tmp = wrapNode(indentCount + 1, item.children);
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
		data: null,
		formatter: function(node) {
			return node.text;
		},
		loader: function(param, success, error) {
			var opts = $(this).tree("options");
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: "json",
				success: function(data) {
					success(data);
				},
				error: function() {
					error.apply(this, arguments);
				}
			});
		},
		loadFilter: function(data, parent) {
			return data;
		},
		view: view,
		onBeforeLoad: function(node, param) {},
		onLoadSuccess: function(node, data) {},
		onLoadError: function() {},
		onClick: function(node) {},
		onDblClick: function(node) {},
		onBeforeExpand: function(node) {},
		onExpand: function(node) {},
		onBeforeCollapse: function(node) {},
		onCollapse: function(node) {},
		onBeforeCheck: function(node, checked) {},
		onCheck: function(node, checked) {},
		onBeforeSelect: function(node) {},
		onSelect: function(node) {},
		onContextMenu: function(e, node) {},
		onBeforeDrag: function(node) {},
		onStartDrag: function(node) {},
		onStopDrag: function(node) {},
		onDragEnter: function(target, source) {},
		onDragOver: function(target, source) {},
		onDragLeave: function(target, source) {},
		onBeforeDrop: function(target, source, point) {},
		onDrop: function(target, source, point) {},
		onBeforeEdit: function(node) {},
		onAfterEdit: function(node) {},
		onCancelEdit: function(node) {}
	};
})(jQuery);
});
