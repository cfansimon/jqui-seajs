define("jqui/1.3.6/dialog-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
require("jqui/1.3.6/dialog-debug.css.js");
require("jqui/1.3.6/linkbutton-debug");
require("jqui/1.3.6/window-debug");

(function($) {
    function _1(_2) {
        var cp = document.createElement("div");
        while (_2.firstChild) {
            cp.appendChild(_2.firstChild);
        }
        _2.appendChild(cp);
        var _3 = $(cp);
        _3.attr("style", $(_2).attr("style"));
        $(_2).removeAttr("style").css("overflow", "hidden");
        _3.panel({
            border: false,
            doSize: false,
            bodyCls: "dialog-content"
        });
        return _3;
    };

    function _4(_5) {
        var _6 = $.data(_5, "dialog").options;
        var _7 = $.data(_5, "dialog").contentPanel;
        if (_6.toolbar) {
            if ($.isArray(_6.toolbar)) {
                $(_5).find("div.dialog-toolbar").remove();
                var _8 = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_5);
                var tr = _8.find("tr");
                for (var i = 0; i < _6.toolbar.length; i++) {
                    var _9 = _6.toolbar[i];
                    if (_9 == "-") {
                        $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var _a = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        _a[0].onclick = eval(_9.handler || function() {});
                        _a.linkbutton($.extend({}, _9, {
                            plain: true
                        }));
                    }
                }
            } else {
                $(_6.toolbar).addClass("dialog-toolbar").prependTo(_5);
                $(_6.toolbar).show();
            }
        } else {
            $(_5).find("div.dialog-toolbar").remove();
        }
        if (_6.buttons) {
            if ($.isArray(_6.buttons)) {
                $(_5).find("div.dialog-button").remove();
                var _b = $("<div class=\"dialog-button\"></div>").appendTo(_5);
                for (var i = 0; i < _6.buttons.length; i++) {
                    var p = _6.buttons[i];
                    var _c = $("<a href=\"javascript:void(0)\"></a>").appendTo(_b);
                    if (p.handler) {
                        _c[0].onclick = p.handler;
                    }
                    _c.linkbutton(p);
                }
            } else {
                $(_6.buttons).addClass("dialog-button").appendTo(_5);
                $(_6.buttons).show();
            }
        } else {
            $(_5).find("div.dialog-button").remove();
        }
        var _d = _6.href;
        var _e = _6.content;
        _6.href = null;
        _6.content = null;
        _7.panel({
            closed: _6.closed,
            cache: _6.cache,
            href: _d,
            content: _e,
            onLoad: function() {
                if (_6.height == "auto") {
                    $(_5).window("resize");
                }
                _6.onLoad.apply(_5, arguments);
            }
        });
        $(_5).window($.extend({}, _6, {
            onOpen: function() {
                if (_7.panel("options").closed) {
                    _7.panel("open");
                }
                if (_6.onOpen) {
                    _6.onOpen.call(_5);
                }
            },
            onResize: function(_f, _10) {
                var _11 = $(_5);
                _7.panel("panel").show();
                _7.panel("resize", {
                    width: _11.width(),
                    height: (_10 == "auto") ? "auto" : _11.height() - _11.children("div.dialog-toolbar")._outerHeight() - _11.children("div.dialog-button")._outerHeight()
                });
                if (_6.onResize) {
                    _6.onResize.call(_5, _f, _10);
                }
            }
        }));
        _6.href = _d;
        _6.content = _e;
    };

    function _12(_13, _14) {
        var _15 = $.data(_13, "dialog").contentPanel;
        _15.panel("refresh", _14);
    };
    $.fn.dialog = function(_16, _17) {
        if (typeof _16 == "string") {
            var _18 = $.fn.dialog.methods[_16];
            if (_18) {
                return _18(this, _17);
            } else {
                return this.window(_16, _17);
            }
        }
        _16 = _16 || {};
        return this.each(function() {
            var _19 = $.data(this, "dialog");
            if (_19) {
                $.extend(_19.options, _16);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _16),
                    contentPanel: _1(this)
                });
            }
            _4(this);
        });
    };
    $.fn.dialog.methods = {
        options: function(jq) {
            var _1a = $.data(jq[0], "dialog").options;
            var _1b = jq.panel("options");
            $.extend(_1a, {
                closed: _1b.closed,
                collapsed: _1b.collapsed,
                minimized: _1b.minimized,
                maximized: _1b.maximized
            });
            var _1c = $.data(jq[0], "dialog").contentPanel;
            return _1a;
        },
        dialog: function(jq) {
            return jq.window("window");
        },
        refresh: function(jq, _1d) {
            return jq.each(function() {
                _12(this, _1d);
            });
        }
    };
    $.fn.dialog.parseOptions = function(_1e) {
        return $.extend({}, $.fn.window.parseOptions(_1e), $.parser.parseOptions(_1e, ["toolbar", "buttons"]));
    };
    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: "New Dialog",
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        toolbar: null,
        buttons: null
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
		auto: true,
		onComplete: function(context){},
		plugins:['draggable','droppable','resizable','pagination','tooltip',
		         'linkbutton','menu','menubutton','splitbutton','progressbar',
				 'tree','combobox','combotree','combogrid','numberbox','validatebox','searchbox',
				 'numberspinner','timespinner','calendar','datebox','datetimebox','slider',
				 'layout','panel','datagrid','propertygrid','treegrid','tabs','accordion','window','dialog'
		],
		parse: function(context){
			var aa = [];
			for(var i=0; i<$.parser.plugins.length; i++){
				var name = $.parser.plugins[i];
				var r = $('.jq-' + name, context);
				if (r.length){
					if (r[name]){
						r[name]();
					} else {
						aa.push({name:name,jq:r});
					}
				}
			}
			if (aa.length && window.easyloader){
				var names = [];
				for(var i=0; i<aa.length; i++){
					names.push(aa[i].name);
				}
				easyloader.load(names, function(){
					for(var i=0; i<aa.length; i++){
						var name = aa[i].name;
						var jq = aa[i].jq;
						jq[name]();
					}
					$.parser.onComplete.call($.parser, context);
				});
			} else {
				$.parser.onComplete.call($.parser, context);
			}
		},
		
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
	$(function(){
		var d = $('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo('body');
		d.width(100);
		$._boxModel = parseInt(d.width()) == 100;
		d.remove();
		
		if (!window.easyloader && $.parser.auto){
			$.parser.parse();
		}
	});
	
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
define("jqui/1.3.6/dialog-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.dialog-content{overflow:auto;}.dialog-toolbar{padding:2px 5px;}.dialog-tool-separator{float:left;height:24px;border-left:1px solid #ccc;border-right:1px solid #fff;margin:2px 1px;}.dialog-button{padding:5px;text-align:right;}.dialog-button .l-btn{margin-left:5px;}.dialog-toolbar,.dialog-button{background:#F5F5F5;}.dialog-toolbar{border-bottom:1px solid #e6e6e6;}.dialog-button{border-top:1px solid #e6e6e6;}');

});
define("jqui/1.3.6/linkbutton-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
 * linkbutton - jQuery EasyUI
 * 
 */

require("jqui/1.3.6/parser-debug");
require("jqui/1.3.6/linkbutton-debug.css.js");

(function($){
	
	function createButton(target) {
		var opts = $.data(target, 'linkbutton').options;
		var t = $(target).empty();
		
		t.addClass('l-btn').removeClass('l-btn-plain l-btn-selected l-btn-plain-selected');
		t.removeClass('l-btn-small l-btn-medium l-btn-large').addClass('l-btn-'+opts.size);
		if (opts.plain){t.addClass('l-btn-plain')}
		if (opts.selected){
			t.addClass(opts.plain ? 'l-btn-selected l-btn-plain-selected' : 'l-btn-selected');
		}
		t.attr('group', opts.group || '');
		t.attr('id', opts.id || '');
		
		var inner = $('<span class="l-btn-left"></span>').appendTo(t);
		if (opts.text){
			$('<span class="l-btn-text"></span>').html(opts.text).appendTo(inner);
		} else {
			$('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(inner);
		}
		if (opts.iconCls){
			$('<span class="l-btn-icon">&nbsp;</span>').addClass(opts.iconCls).appendTo(inner);
			inner.addClass('l-btn-icon-'+opts.iconAlign);
		}
		
		t.unbind('.linkbutton').bind('focus.linkbutton',function(){
			if (!opts.disabled){
				$(this).addClass('l-btn-focus');
			}
		}).bind('blur.linkbutton',function(){
			$(this).removeClass('l-btn-focus');
		}).bind('click.linkbutton',function(){
			if (!opts.disabled){
				if (opts.toggle){
					if (opts.selected){
						$(this).linkbutton('unselect');
					} else {
						$(this).linkbutton('select');
					}
				}
				opts.onClick.call(this);
			}
			return false;
		});
//		if (opts.toggle && !opts.disabled){
//			t.bind('click.linkbutton', function(){
//				if (opts.selected){
//					$(this).linkbutton('unselect');
//				} else {
//					$(this).linkbutton('select');
//				}
//			});
//		}
		
		setSelected(target, opts.selected)
		setDisabled(target, opts.disabled);
	}
	
	function setSelected(target, selected){
		var opts = $.data(target, 'linkbutton').options;
		if (selected){
			if (opts.group){
				$('a.l-btn[group="'+opts.group+'"]').each(function(){
					var o = $(this).linkbutton('options');
					if (o.toggle){
						$(this).removeClass('l-btn-selected l-btn-plain-selected');
						o.selected = false;
					}
				});
			}
			$(target).addClass(opts.plain ? 'l-btn-selected l-btn-plain-selected' : 'l-btn-selected');
			opts.selected = true;
		} else {
			if (!opts.group){
				$(target).removeClass('l-btn-selected l-btn-plain-selected');
				opts.selected = false;
			}
		}
	}
	
	function setDisabled(target, disabled){
		var state = $.data(target, 'linkbutton');
		var opts = state.options;
		$(target).removeClass('l-btn-disabled l-btn-plain-disabled');
		if (disabled){
			opts.disabled = true;
			var href = $(target).attr('href');
			if (href){
				state.href = href;
				$(target).attr('href', 'javascript:void(0)');
			}
			if (target.onclick){
				state.onclick = target.onclick;
				target.onclick = null;
			}
			opts.plain ? $(target).addClass('l-btn-disabled l-btn-plain-disabled') : $(target).addClass('l-btn-disabled');
		} else {
			opts.disabled = false;
			if (state.href) {
				$(target).attr('href', state.href);
			}
			if (state.onclick) {
				target.onclick = state.onclick;
			}
		}
	}
	
	$.fn.linkbutton = function(options, param){
		if (typeof options == 'string'){
			return $.fn.linkbutton.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'linkbutton');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'linkbutton', {
					options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
				});
				$(this).removeAttr('disabled');
			}
			
			createButton(this);
		});
	};
	
	$.fn.linkbutton.methods = {
		options: function(jq){
			return $.data(jq[0], 'linkbutton').options;
		},
		enable: function(jq){
			return jq.each(function(){
				setDisabled(this, false);
			});
		},
		disable: function(jq){
			return jq.each(function(){
				setDisabled(this, true);
			});
		},
		select: function(jq){
			return jq.each(function(){
				setSelected(this, true);
			});
		},
		unselect: function(jq){
			return jq.each(function(){
				setSelected(this, false);
			});
		}
	};
	
	$.fn.linkbutton.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, 
			['id','iconCls','iconAlign','group','size',{plain:'boolean',toggle:'boolean',selected:'boolean'}]
		), {
			disabled: (t.attr('disabled') ? true : undefined),
			text: $.trim(t.html()),
			iconCls: (t.attr('icon') || t.attr('iconCls'))
		});
	};
	
	$.fn.linkbutton.defaults = {
		id: null,
		disabled: false,
		toggle: false,
		selected: false,
		group: null,
		plain: false,
		text: '',
		iconCls: null,
		iconAlign: 'left',
		size: 'small',	// small,large
		onClick: function(){}
	};
	
})(jQuery);

});
define("jqui/1.3.6/linkbutton-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.l-btn{text-decoration:none;display:inline-block;margin:0;padding:0;cursor:pointer;outline:none;text-align:center;vertical-align:middle;}.l-btn-plain{padding:1px;}.l-btn-disabled{opacity:.5;filter:alpha(opacity=50);cursor:default;}.l-btn-left{position:relative;overflow:hidden;margin:0;}.l-btn-left,.l-btn-text{display:inline-block;vertical-align:top;padding:0;}.l-btn-text{width:auto;line-height:24px;font-size:12px;margin:0 4px;}.l-btn-icon{height:16px;line-height:16px;position:absolute;top:50%;margin-top:-8px;}.l-btn-icon,.l-btn span span .l-btn-empty{display:inline-block;width:16px;font-size:1px;}.l-btn span span .l-btn-empty{margin:0;height:24px;vertical-align:top;}.l-btn span .l-btn-icon-left{padding:0 0 0 20px;background-position:left center;}.l-btn span .l-btn-icon-right{padding:0 20px 0 0;background-position:right center;}.l-btn-icon-left .l-btn-text{margin:0 4px 0 24px;}.l-btn-icon-left .l-btn-icon{left:4px;}.l-btn-icon-right .l-btn-text{margin:0 24px 0 4px;}.l-btn-icon-right .l-btn-icon{right:4px;}.l-btn-icon-top .l-btn-text{margin:20px 4px 0;}.l-btn-icon-top .l-btn-icon{top:4px;left:50%;margin:0 0 0 -8px;}.l-btn-icon-bottom .l-btn-text{margin:0 4px 20px;}.l-btn-icon-bottom .l-btn-icon{top:auto;bottom:4px;left:50%;margin:0 0 0 -8px;}.l-btn-left .l-btn-empty{margin:0 4px;width:16px;}.l-btn-plain:hover{padding:0;}.l-btn-focus{outline:#00f dotted thin;}.l-btn-large .l-btn-text{line-height:40px;}.l-btn-large .l-btn-icon{width:32px;height:32px;line-height:32px;margin-top:-16px;}.l-btn-large .l-btn-icon-left .l-btn-text{margin-left:40px;}.l-btn-large .l-btn-icon-right .l-btn-text{margin-right:40px;}.l-btn-large .l-btn-icon-top .l-btn-text{margin-top:36px;line-height:24px;min-width:32px;}.l-btn-large .l-btn-icon-top .l-btn-icon{margin:0 0 0 -16px;}.l-btn-large .l-btn-icon-bottom .l-btn-text{margin-bottom:36px;line-height:24px;min-width:32px;}.l-btn-large .l-btn-icon-bottom .l-btn-icon{margin:0 0 0 -16px;}.l-btn-large .l-btn-left .l-btn-empty{margin:0 4px;width:32px;}.l-btn{color:#444;background:#fafafa;border:1px solid #bbb;background:-webkit-linear-gradient(top,#fff 0,#eee 100%);background:-moz-linear-gradient(top,#fff 0,#eee 100%);background:-o-linear-gradient(top,#fff 0,#eee 100%);background:linear-gradient(to bottom,#fff 0,#eee 100%);background-repeat:repeat-x;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;}.l-btn:hover{background:#eaf2ff;color:#000;border:1px solid #b7d2ff;filter:none;}.l-btn-plain{background:0 0;border:0;filter:none;}.l-btn-plain:hover{background:#eaf2ff;color:#000;border:1px solid #b7d2ff;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;}.l-btn-disabled,.l-btn-disabled:hover{background:#fafafa;color:#444;background:-webkit-linear-gradient(top,#fff 0,#eee 100%);background:-moz-linear-gradient(top,#fff 0,#eee 100%);background:-o-linear-gradient(top,#fff 0,#eee 100%);background:linear-gradient(to bottom,#fff 0,#eee 100%);background-repeat:repeat-x;}.l-btn-plain-disabled,.l-btn-plain-disabled:hover{background:0 0;filter:alpha(opacity=50);}.l-btn-selected,.l-btn-selected:hover{background:#ddd;filter:none;}.l-btn-plain-selected,.l-btn-plain-selected:hover{background:#ddd;}');

});
define("jqui/1.3.6/window-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
 * window - jQuery EasyUI
 * 
 * Dependencies:
 * 	 panel
 *   draggable
 *   resizable
 * 
 */
require("jqui/1.3.6/parser-debug");
require("jqui/1.3.6/window-debug.css.js");
require("jqui/1.3.6/resizable-debug");
require("jqui/1.3.6/draggable-debug");
require("jqui/1.3.6/panel-debug");

(function($){
	function setSize(target, param){
		var opts = $.data(target, 'window').options;
		if (param){
			$.extend(opts, param);
//			if (param.width) opts.width = param.width;
//			if (param.height) opts.height = param.height;
//			if (param.left != null) opts.left = param.left;
//			if (param.top != null) opts.top = param.top;
		}
		$(target).panel('resize', opts);
	}
	
	function moveWindow(target, param){
		var state = $.data(target, 'window');
		if (param){
			if (param.left != null) state.options.left = param.left;
			if (param.top != null) state.options.top = param.top;
		}
		$(target).panel('move', state.options);
		if (state.shadow){
			state.shadow.css({
				left: state.options.left,
				top: state.options.top
			});
		}
	}
	
	/**
	 *  center the window only horizontally
	 */
	function hcenter(target, tomove){
		var state = $.data(target, 'window');
		var opts = state.options;
		var width = opts.width;
		if (isNaN(width)){
			width = state.window._outerWidth();
		}
		if (opts.inline){
			var parent = state.window.parent();
			opts.left = (parent.width() - width) / 2 + parent.scrollLeft();
		} else {
			opts.left = ($(window)._outerWidth() - width) / 2 + $(document).scrollLeft();
		}
		if (tomove){moveWindow(target);}
	}
	
	/**
	 * center the window only vertically
	 */
	function vcenter(target, tomove){
		var state = $.data(target, 'window');
		var opts = state.options;
		var height = opts.height;
		if (isNaN(height)){
			height = state.window._outerHeight();
		}
		if (opts.inline){
			var parent = state.window.parent();
			opts.top = (parent.height() - height) / 2 + parent.scrollTop();
		} else {
			opts.top = ($(window)._outerHeight() - height) / 2 + $(document).scrollTop();
		}
		if (tomove){moveWindow(target);}
	}
	
	function create(target){
		var state = $.data(target, 'window');
		var winClosed = state.options.closed;
		var win = $(target).panel($.extend({}, state.options, {
			border: false,
			doSize: true,	// size the panel, the property undefined in window component
			closed: true,	// close the panel
			cls: 'window',
			headerCls: 'window-header',
			bodyCls: 'window-body ' + (state.options.noheader ? 'window-body-noheader' : ''),
			
			onBeforeDestroy: function(){
				if (state.options.onBeforeDestroy.call(target) == false) return false;
				if (state.shadow) state.shadow.remove();
				if (state.mask) state.mask.remove();
			},
			onClose: function(){
				if (state.shadow) state.shadow.hide();
				if (state.mask) state.mask.hide();
				
				state.options.onClose.call(target);
			},
			onOpen: function(){
				if (state.mask){
					state.mask.css({
						display:'block',
						zIndex: $.fn.window.defaults.zIndex++
					});
				}
				if (state.shadow){
					state.shadow.css({
						display:'block',
						zIndex: $.fn.window.defaults.zIndex++,
						left: state.options.left,
						top: state.options.top,
						width: state.window._outerWidth(),
						height: state.window._outerHeight()
					});
				}
				state.window.css('z-index', $.fn.window.defaults.zIndex++);
				
				state.options.onOpen.call(target);
			},
			onResize: function(width, height){
				var opts = $(this).panel('options');
				$.extend(state.options, {
					width: opts.width,
					height: opts.height,
					left: opts.left,
					top: opts.top
				});
				if (state.shadow){
					state.shadow.css({
						left: state.options.left,
						top: state.options.top,
						width: state.window._outerWidth(),
						height: state.window._outerHeight()
					});
				}
				
				state.options.onResize.call(target, width, height);
			},
			onMinimize: function(){
				if (state.shadow) state.shadow.hide();
				if (state.mask) state.mask.hide();
				
				state.options.onMinimize.call(target);
			},
			onBeforeCollapse: function(){
				if (state.options.onBeforeCollapse.call(target) == false) return false;
				if (state.shadow) state.shadow.hide();
			},
			onExpand: function(){
				if (state.shadow) state.shadow.show();
				state.options.onExpand.call(target);
			}
		}));
		
		state.window = win.panel('panel');
		
		// create mask
		if (state.mask) state.mask.remove();
		if (state.options.modal == true){
			state.mask = $('<div class="window-mask"></div>').insertAfter(state.window);
			state.mask.css({
				width: (state.options.inline ? state.mask.parent().width() : getPageArea().width),
				height: (state.options.inline ? state.mask.parent().height() : getPageArea().height),
				display: 'none'
			});
		}
		
		// create shadow
		if (state.shadow) state.shadow.remove();
		if (state.options.shadow == true){
			state.shadow = $('<div class="window-shadow"></div>').insertAfter(state.window);
			state.shadow.css({
				display: 'none'
			});
		}
		
		// if require center the window
		if (state.options.left == null){hcenter(target);}
		if (state.options.top == null){vcenter(target);}
		moveWindow(target);
		
		if (!winClosed){
			win.window('open');	// open the window
		}
	}
	
	
	/**
	 * set window drag and resize property
	 */
	function setProperties(target){
		var state = $.data(target, 'window');
		
		state.window.draggable({
			handle: '>div.panel-header>div.panel-title',
			disabled: state.options.draggable == false,
			onStartDrag: function(e){
				if (state.mask) state.mask.css('z-index', $.fn.window.defaults.zIndex++);
				if (state.shadow) state.shadow.css('z-index', $.fn.window.defaults.zIndex++);
				state.window.css('z-index', $.fn.window.defaults.zIndex++);
				
				if (!state.proxy){
					state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
				}
				state.proxy.css({
					display:'none',
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top
				});
				state.proxy._outerWidth(state.window._outerWidth());
				state.proxy._outerHeight(state.window._outerHeight());
				setTimeout(function(){
					if (state.proxy) state.proxy.show();
				}, 500);
			},
			onDrag: function(e){
				state.proxy.css({
					display:'block',
					left: e.data.left,
					top: e.data.top
				});
				return false;
			},
			onStopDrag: function(e){
				state.options.left = e.data.left;
				state.options.top = e.data.top;
				$(target).window('move');
				state.proxy.remove();
				state.proxy = null;
			}
		});
		
		state.window.resizable({
			disabled: state.options.resizable == false,
			onStartResize:function(e){
				state.pmask = $('<div class="window-proxy-mask"></div>').insertAfter(state.window);
				state.pmask.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: state.window._outerWidth(),
					height: state.window._outerHeight()
				});
				if (!state.proxy){
					state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
				}
				state.proxy.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top
				});
				state.proxy._outerWidth(e.data.width);
				state.proxy._outerHeight(e.data.height);
			},
			onResize: function(e){
				state.proxy.css({
					left: e.data.left,
					top: e.data.top
				});
				state.proxy._outerWidth(e.data.width);
				state.proxy._outerHeight(e.data.height);
				return false;
			},
			onStopResize: function(e){
				$.extend(state.options, {
					left: e.data.left,
					top: e.data.top,
					width: e.data.width,
					height: e.data.height
				});
				setSize(target);
				state.pmask.remove();
				state.pmask = null;
				state.proxy.remove();
				state.proxy = null;
			}
		});
	}
	
	function getPageArea() {
		if (document.compatMode == 'BackCompat') {
			return {
				width: Math.max(document.body.scrollWidth, document.body.clientWidth),
				height: Math.max(document.body.scrollHeight, document.body.clientHeight)
			}
		} else {
			return {
				width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
				height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
			}
		}
	}
	
	// when window resize, reset the width and height of the window's mask
	$(window).resize(function(){
		$('body>div.window-mask').css({
			width: $(window)._outerWidth(),
			height: $(window)._outerHeight()
		});
		setTimeout(function(){
			$('body>div.window-mask').css({
				width: getPageArea().width,
				height: getPageArea().height
			});
		}, 50);
	});
	
	$.fn.window = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.window.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.panel(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'window');
			if (state){
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'window', {
					options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), options)
				});
				if (!state.options.inline){
//					$(this).appendTo('body');
					document.body.appendChild(this);
				}
			}
			create(this);
			setProperties(this);
		});
	};
	
	$.fn.window.methods = {
		options: function(jq){
			var popts = jq.panel('options');
			var wopts = $.data(jq[0], 'window').options;
			return $.extend(wopts, {
				closed: popts.closed,
				collapsed: popts.collapsed,
				minimized: popts.minimized,
				maximized: popts.maximized
			});
		},
		window: function(jq){
			return $.data(jq[0], 'window').window;
		},
		resize: function(jq, param){
			return jq.each(function(){
				setSize(this, param);
			});
		},
		move: function(jq, param){
			return jq.each(function(){
				moveWindow(this, param);
			});
		},
		hcenter: function(jq){
			return jq.each(function(){
				hcenter(this, true);
			});
		},
		vcenter: function(jq){
			return jq.each(function(){
				vcenter(this, true);
			});
		},
		center: function(jq){
			return jq.each(function(){
				hcenter(this);
				vcenter(this);
				moveWindow(this);
			});
		}
	};
	
	$.fn.window.parseOptions = function(target){
		return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [
			{draggable:'boolean',resizable:'boolean',shadow:'boolean',modal:'boolean',inline:'boolean'}
		]));
	};
	
	// Inherited from $.fn.panel.defaults
	$.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {
		zIndex: 9000,
		draggable: true,
		resizable: true,
		shadow: true,
		modal: false,
		inline: false,	// true to stay inside its parent, false to go on top of all elements
		
		// window's property which difference from panel
		title: 'New Window',
		collapsible: true,
		minimizable: true,
		maximizable: true,
		closable: true,
		closed: false
	});
})(jQuery);

});
define("jqui/1.3.6/window-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.window{overflow:hidden;padding:5px;border-width:1px;border-style:solid;}.window .window-header{background:0 0;padding:0 0 6px;}.window .window-body{border-width:1px;border-style:solid;border-top-width:0;}.window .window-body-noheader{border-top-width:1px;}.window .window-header .panel-icon,.window .window-header .panel-tool{top:50%;margin-top:-11px;}.window .window-header .panel-icon{left:1px;}.window .window-header .panel-tool{right:1px;}.window .window-header .panel-with-icon{padding-left:18px;}.window-proxy{position:absolute;overflow:hidden;}.window-proxy-mask{position:absolute;filter:alpha(opacity=5);opacity:.05;}.window-mask{position:absolute;left:0;top:0;width:100%;height:100%;filter:alpha(opacity=40);opacity:.4;font-size:1px;*zoom:1;overflow:hidden;}.window,.window-shadow{position:absolute;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;}.window-shadow{background:#ccc;-moz-box-shadow:2px 2px 3px #ccc;-webkit-box-shadow:2px 2px 3px #ccc;box-shadow:2px 2px 3px #ccc;}.window,.window .window-body{border-color:#D4D4D4;}.window{background-color:#F2F2F2;background:-webkit-linear-gradient(top,#fff 0,#F2F2F2 20%);background:-moz-linear-gradient(top,#fff 0,#F2F2F2 20%);background:-o-linear-gradient(top,#fff 0,#F2F2F2 20%);background:linear-gradient(to bottom,#fff 0,#F2F2F2 20%);background-repeat:repeat-x;}.window-proxy{border:1px dashed #D4D4D4;}.window-proxy-mask,.window-mask{background:#666;}');

});
define("jqui/1.3.6/resizable-debug", [], function(require, exports, module){
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
 * resizable - jQuery EasyUI
 * 
 */
require("jqui/1.3.6/parser-debug");

(function($){
//	var isResizing = false;
	$.fn.resizable = function(options, param){
		if (typeof options == 'string'){
			return $.fn.resizable.methods[options](this, param);
		}
		
		function resize(e){
			var resizeData = e.data;
			var options = $.data(resizeData.target, 'resizable').options;
			if (resizeData.dir.indexOf('e') != -1) {
				var width = resizeData.startWidth + e.pageX - resizeData.startX;
				width = Math.min(
							Math.max(width, options.minWidth),
							options.maxWidth
						);
				resizeData.width = width;
			}
			if (resizeData.dir.indexOf('s') != -1) {
				var height = resizeData.startHeight + e.pageY - resizeData.startY;
				height = Math.min(
						Math.max(height, options.minHeight),
						options.maxHeight
				);
				resizeData.height = height;
			}
			if (resizeData.dir.indexOf('w') != -1) {
				var width = resizeData.startWidth - e.pageX + resizeData.startX;
				width = Math.min(
							Math.max(width, options.minWidth),
							options.maxWidth
						);
				resizeData.width = width;
				resizeData.left = resizeData.startLeft + resizeData.startWidth - resizeData.width;
				
//				resizeData.width = resizeData.startWidth - e.pageX + resizeData.startX;
//				if (resizeData.width >= options.minWidth && resizeData.width <= options.maxWidth) {
//					resizeData.left = resizeData.startLeft + e.pageX - resizeData.startX;
//				}
			}
			if (resizeData.dir.indexOf('n') != -1) {
				var height = resizeData.startHeight - e.pageY + resizeData.startY;
				height = Math.min(
							Math.max(height, options.minHeight),
							options.maxHeight
						);
				resizeData.height = height;
				resizeData.top = resizeData.startTop + resizeData.startHeight - resizeData.height;
				
//				resizeData.height = resizeData.startHeight - e.pageY + resizeData.startY;
//				if (resizeData.height >= options.minHeight && resizeData.height <= options.maxHeight) {
//					resizeData.top = resizeData.startTop + e.pageY - resizeData.startY;
//				}
			}
		}
		
		function applySize(e){
			var resizeData = e.data;
			var t = $(resizeData.target);
			t.css({
				left: resizeData.left,
				top: resizeData.top
			});
			if (t.outerWidth() != resizeData.width){t._outerWidth(resizeData.width)}
			if (t.outerHeight() != resizeData.height){t._outerHeight(resizeData.height)}
//			t._outerWidth(resizeData.width)._outerHeight(resizeData.height);
		}
		
		function doDown(e){
//			isResizing = true;
			$.fn.resizable.isResizing = true;
			$.data(e.data.target, 'resizable').options.onStartResize.call(e.data.target, e);
			return false;
		}
		
		function doMove(e){
			resize(e);
			if ($.data(e.data.target, 'resizable').options.onResize.call(e.data.target, e) != false){
				applySize(e)
			}
			return false;
		}
		
		function doUp(e){
//			isResizing = false;
			$.fn.resizable.isResizing = false;
			resize(e, true);
			applySize(e);
			$.data(e.data.target, 'resizable').options.onStopResize.call(e.data.target, e);
			$(document).unbind('.resizable');
			$('body').css('cursor','');
//			$('body').css('cursor','auto');
			return false;
		}
		
		return this.each(function(){
			var opts = null;
			var state = $.data(this, 'resizable');
			if (state) {
				$(this).unbind('.resizable');
				opts = $.extend(state.options, options || {});
			} else {
				opts = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), options || {});
				$.data(this, 'resizable', {
					options:opts
				});
			}
			
			if (opts.disabled == true) {
				return;
			}
			
			// bind mouse event using namespace resizable
			$(this).bind('mousemove.resizable', {target:this}, function(e){
//				if (isResizing) return;
				if ($.fn.resizable.isResizing){return}
				var dir = getDirection(e);
				if (dir == '') {
					$(e.data.target).css('cursor', '');
				} else {
					$(e.data.target).css('cursor', dir + '-resize');
				}
			}).bind('mouseleave.resizable', {target:this}, function(e){
				$(e.data.target).css('cursor', '');
			}).bind('mousedown.resizable', {target:this}, function(e){
				var dir = getDirection(e);
				if (dir == '') return;
				
				function getCssValue(css) {
					var val = parseInt($(e.data.target).css(css));
					if (isNaN(val)) {
						return 0;
					} else {
						return val;
					}
				}
				
				var data = {
					target: e.data.target,
					dir: dir,
					startLeft: getCssValue('left'),
					startTop: getCssValue('top'),
					left: getCssValue('left'),
					top: getCssValue('top'),
					startX: e.pageX,
					startY: e.pageY,
					startWidth: $(e.data.target).outerWidth(),
					startHeight: $(e.data.target).outerHeight(),
					width: $(e.data.target).outerWidth(),
					height: $(e.data.target).outerHeight(),
					deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
					deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
				};
				$(document).bind('mousedown.resizable', data, doDown);
				$(document).bind('mousemove.resizable', data, doMove);
				$(document).bind('mouseup.resizable', data, doUp);
				$('body').css('cursor', dir+'-resize');
			});
			
			// get the resize direction
			function getDirection(e) {
				var tt = $(e.data.target);
				var dir = '';
				var offset = tt.offset();
				var width = tt.outerWidth();
				var height = tt.outerHeight();
				var edge = opts.edge;
				if (e.pageY > offset.top && e.pageY < offset.top + edge) {
					dir += 'n';
				} else if (e.pageY < offset.top + height && e.pageY > offset.top + height - edge) {
					dir += 's';
				}
				if (e.pageX > offset.left && e.pageX < offset.left + edge) {
					dir += 'w';
				} else if (e.pageX < offset.left + width && e.pageX > offset.left + width - edge) {
					dir += 'e';
				}
				
				var handles = opts.handles.split(',');
				for(var i=0; i<handles.length; i++) {
					var handle = handles[i].replace(/(^\s*)|(\s*$)/g, '');
					if (handle == 'all' || handle == dir) {
						return dir;
					}
				}
				return '';
			}
			
			
		});
	};
	
	$.fn.resizable.methods = {
		options: function(jq){
			return $.data(jq[0], 'resizable').options;
		},
		enable: function(jq){
			return jq.each(function(){
				$(this).resizable({disabled:false});
			});
		},
		disable: function(jq){
			return jq.each(function(){
				$(this).resizable({disabled:true});
			});
		}
	};
	
	$.fn.resizable.parseOptions = function(target){
		var t = $(target);
		return $.extend({},
				$.parser.parseOptions(target, [
					'handles',{minWidth:'number',minHeight:'number',maxWidth:'number',maxHeight:'number',edge:'number'}
				]), {
			disabled: (t.attr('disabled') ? true : undefined)
		})
	};
	
	$.fn.resizable.defaults = {
		disabled:false,
		handles:'n, e, s, w, ne, se, sw, nw, all',
		minWidth: 10,
		minHeight: 10,
		maxWidth: 10000,//$(document).width(),
		maxHeight: 10000,//$(document).height(),
		edge:5,
		onStartResize: function(e){},
		onResize: function(e){},
		onStopResize: function(e){}
	};
	
	$.fn.resizable.isResizing = false;
	
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
define("jqui/1.3.6/panel-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
require("jqui/1.3.6/panel-debug.css.js");

(function($) {
    $.fn._remove = function() {
        return this.each(function() {
            $(this).remove();
            try {
                this.outerHTML = "";
            } catch (err) {}
        });
    };

    function _1(_2) {
        _2._remove();
    };

    function _3(_4, _5) {
        var _6 = $.data(_4, "panel").options;
        var _7 = $.data(_4, "panel").panel;
        var _8 = _7.children("div.panel-header");
        var _9 = _7.children("div.panel-body");
        if (_5) {
            $.extend(_6, {
                width: _5.width,
                height: _5.height,
                left: _5.left,
                top: _5.top
            });
        }
        _6.fit ? $.extend(_6, _7._fit()) : _7._fit(false);
        _7.css({
            left: _6.left,
            top: _6.top
        });
        if (!isNaN(_6.width)) {
            _7._outerWidth(_6.width);
        } else {
            _7.width("auto");
        }
        _8.add(_9)._outerWidth(_7.width());
        if (!isNaN(_6.height)) {
            _7._outerHeight(_6.height);
            _9._outerHeight(_7.height() - _8._outerHeight());
        } else {
            _9.height("auto");
        }
        _7.css("height", "");
        _6.onResize.apply(_4, [_6.width, _6.height]);
        $(_4).find(">div:visible,>form>div:visible").triggerHandler("_resize");
    };

    function _a(_b, _c) {
        var _d = $.data(_b, "panel").options;
        var _e = $.data(_b, "panel").panel;
        if (_c) {
            if (_c.left != null) {
                _d.left = _c.left;
            }
            if (_c.top != null) {
                _d.top = _c.top;
            }
        }
        _e.css({
            left: _d.left,
            top: _d.top
        });
        _d.onMove.apply(_b, [_d.left, _d.top]);
    };

    function _f(_10) {
        $(_10).addClass("panel-body");
        var _11 = $("<div class=\"panel\"></div>").insertBefore(_10);
        _11[0].appendChild(_10);
        _11.bind("_resize", function() {
            var _12 = $.data(_10, "panel").options;
            if (_12.fit == true) {
                _3(_10);
            }
            return false;
        });
        return _11;
    };

    function _13(_14) {
        var _15 = $.data(_14, "panel").options;
        var _16 = $.data(_14, "panel").panel;
        if (_15.tools && typeof _15.tools == "string") {
            _16.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(_15.tools);
        }
        _1(_16.children("div.panel-header"));
        if (_15.title && !_15.noheader) {
            var _17 = $("<div class=\"panel-header\"><div class=\"panel-title\">" + _15.title + "</div></div>").prependTo(_16);
            if (_15.iconCls) {
                _17.find(".panel-title").addClass("panel-with-icon");
                $("<div class=\"panel-icon\"></div>").addClass(_15.iconCls).appendTo(_17);
            }
            var _18 = $("<div class=\"panel-tool\"></div>").appendTo(_17);
            _18.bind("click", function(e) {
                e.stopPropagation();
            });
            if (_15.tools) {
                if ($.isArray(_15.tools)) {
                    for (var i = 0; i < _15.tools.length; i++) {
                        var t = $("<a href=\"javascript:void(0)\"></a>").addClass(_15.tools[i].iconCls).appendTo(_18);
                        if (_15.tools[i].handler) {
                            t.bind("click", eval(_15.tools[i].handler));
                        }
                    }
                } else {
                    $(_15.tools).children().each(function() {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_18);
                    });
                }
            }
            if (_15.collapsible) {
                $("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click", function() {
                    if (_15.collapsed == true) {
                        _3e(_14, true);
                    } else {
                        _2e(_14, true);
                    }
                    return false;
                });
            }
            if (_15.minimizable) {
                $("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click", function() {
                    _49(_14);
                    return false;
                });
            }
            if (_15.maximizable) {
                $("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click", function() {
                    if (_15.maximized == true) {
                        _4d(_14);
                    } else {
                        _2d(_14);
                    }
                    return false;
                });
            }
            if (_15.closable) {
                $("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click", function() {
                    _19(_14);
                    return false;
                });
            }
            _16.children("div.panel-body").removeClass("panel-body-noheader");
        } else {
            _16.children("div.panel-body").addClass("panel-body-noheader");
        }
    };

    function _1a(_1b, _1c) {
        var _1d = $.data(_1b, "panel");
        var _1e = _1d.options;
        if (_1f) {
            _1e.queryParams = _1c;
        }
        if (_1e.href) {
            if (!_1d.isLoaded || !_1e.cache) {
                var _1f = $.extend({}, _1e.queryParams);
                if (_1e.onBeforeLoad.call(_1b, _1f) == false) {
                    return;
                }
                _1d.isLoaded = false;
                _20(_1b);
                if (_1e.loadingMessage) {
                    $(_1b).html($("<div class=\"panel-loading\"></div>").html(_1e.loadingMessage));
                }
                _1e.loader.call(_1b, _1f, function(_21) {
                    _22(_1e.extractor.call(_1b, _21));
                    _1e.onLoad.apply(_1b, arguments);
                    _1d.isLoaded = true;
                }, function() {
                    _1e.onLoadError.apply(_1b, arguments);
                });
            }
        } else {
            if (_1e.content) {
                if (!_1d.isLoaded) {
                    _20(_1b);
                    _22(_1e.content);
                    _1d.isLoaded = true;
                }
            }
        }

        function _22(_23) {
            $(_1b).html(_23);
            $.parser.parse($(_1b));
        };
    };

    function _20(_24) {
        var t = $(_24);
        t.find(".combo-f").each(function() {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function() {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function() {
            $(this).splitbutton("destroy");
        });
        t.find(".tooltip-f").each(function() {
            $(this).tooltip("destroy");
        });
        t.children("div").each(function() {
            $(this)._fit(false);
        });
    };

    function _25(_26) {
        $(_26).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
            $(this).triggerHandler("_resize", [true]);
        });
    };

    function _27(_28, _29) {
        var _2a = $.data(_28, "panel").options;
        var _2b = $.data(_28, "panel").panel;
        if (_29 != true) {
            if (_2a.onBeforeOpen.call(_28) == false) {
                return;
            }
        }
        _2b.show();
        _2a.closed = false;
        _2a.minimized = false;
        var _2c = _2b.children("div.panel-header").find("a.panel-tool-restore");
        if (_2c.length) {
            _2a.maximized = true;
        }
        _2a.onOpen.call(_28);
        if (_2a.maximized == true) {
            _2a.maximized = false;
            _2d(_28);
        }
        if (_2a.collapsed == true) {
            _2a.collapsed = false;
            _2e(_28);
        }
        if (!_2a.collapsed) {
            _1a(_28);
            _25(_28);
        }
    };

    function _19(_2f, _30) {
        var _31 = $.data(_2f, "panel").options;
        var _32 = $.data(_2f, "panel").panel;
        if (_30 != true) {
            if (_31.onBeforeClose.call(_2f) == false) {
                return;
            }
        }
        _32._fit(false);
        _32.hide();
        _31.closed = true;
        _31.onClose.call(_2f);
    };

    function _33(_34, _35) {
        var _36 = $.data(_34, "panel").options;
        var _37 = $.data(_34, "panel").panel;
        if (_35 != true) {
            if (_36.onBeforeDestroy.call(_34) == false) {
                return;
            }
        }
        _20(_34);
        _1(_37);
        _36.onDestroy.call(_34);
    };

    function _2e(_38, _39) {
        var _3a = $.data(_38, "panel").options;
        var _3b = $.data(_38, "panel").panel;
        var _3c = _3b.children("div.panel-body");
        var _3d = _3b.children("div.panel-header").find("a.panel-tool-collapse");
        if (_3a.collapsed == true) {
            return;
        }
        _3c.stop(true, true);
        if (_3a.onBeforeCollapse.call(_38) == false) {
            return;
        }
        _3d.addClass("panel-tool-expand");
        if (_39 == true) {
            _3c.slideUp("normal", function() {
                _3a.collapsed = true;
                _3a.onCollapse.call(_38);
            });
        } else {
            _3c.hide();
            _3a.collapsed = true;
            _3a.onCollapse.call(_38);
        }
    };

    function _3e(_3f, _40) {
        var _41 = $.data(_3f, "panel").options;
        var _42 = $.data(_3f, "panel").panel;
        var _43 = _42.children("div.panel-body");
        var _44 = _42.children("div.panel-header").find("a.panel-tool-collapse");
        if (_41.collapsed == false) {
            return;
        }
        _43.stop(true, true);
        if (_41.onBeforeExpand.call(_3f) == false) {
            return;
        }
        _44.removeClass("panel-tool-expand");
        if (_40 == true) {
            _43.slideDown("normal", function() {
                _41.collapsed = false;
                _41.onExpand.call(_3f);
                _1a(_3f);
                _25(_3f);
            });
        } else {
            _43.show();
            _41.collapsed = false;
            _41.onExpand.call(_3f);
            _1a(_3f);
            _25(_3f);
        }
    };

    function _2d(_45) {
        var _46 = $.data(_45, "panel").options;
        var _47 = $.data(_45, "panel").panel;
        var _48 = _47.children("div.panel-header").find("a.panel-tool-max");
        if (_46.maximized == true) {
            return;
        }
        _48.addClass("panel-tool-restore");
        if (!$.data(_45, "panel").original) {
            $.data(_45, "panel").original = {
                width: _46.width,
                height: _46.height,
                left: _46.left,
                top: _46.top,
                fit: _46.fit
            };
        }
        _46.left = 0;
        _46.top = 0;
        _46.fit = true;
        _3(_45);
        _46.minimized = false;
        _46.maximized = true;
        _46.onMaximize.call(_45);
    };

    function _49(_4a) {
        var _4b = $.data(_4a, "panel").options;
        var _4c = $.data(_4a, "panel").panel;
        _4c._fit(false);
        _4c.hide();
        _4b.minimized = true;
        _4b.maximized = false;
        _4b.onMinimize.call(_4a);
    };

    function _4d(_4e) {
        var _4f = $.data(_4e, "panel").options;
        var _50 = $.data(_4e, "panel").panel;
        var _51 = _50.children("div.panel-header").find("a.panel-tool-max");
        if (_4f.maximized == false) {
            return;
        }
        _50.show();
        _51.removeClass("panel-tool-restore");
        $.extend(_4f, $.data(_4e, "panel").original);
        _3(_4e);
        _4f.minimized = false;
        _4f.maximized = false;
        $.data(_4e, "panel").original = null;
        _4f.onRestore.call(_4e);
    };

    function _52(_53) {
        var _54 = $.data(_53, "panel").options;
        var _55 = $.data(_53, "panel").panel;
        var _56 = $(_53).panel("header");
        var _57 = $(_53).panel("body");
        _55.css(_54.style);
        _55.addClass(_54.cls);
        if (_54.border) {
            _56.removeClass("panel-header-noborder");
            _57.removeClass("panel-body-noborder");
        } else {
            _56.addClass("panel-header-noborder");
            _57.addClass("panel-body-noborder");
        }
        _56.addClass(_54.headerCls);
        _57.addClass(_54.bodyCls);
        if (_54.id) {
            $(_53).attr("id", _54.id);
        } else {
            $(_53).attr("id", "");
        }
    };

    function _58(_59, _5a) {
        $.data(_59, "panel").options.title = _5a;
        $(_59).panel("header").find("div.panel-title").html(_5a);
    };
    var TO = false;
    var _5b = true;
    $(window).unbind(".panel").bind("resize.panel", function() {
        if (!_5b) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function() {
            _5b = false;
            var _5c = $("body.layout");
            if (_5c.length) {
                _5c.layout("resize");
            } else {
                $("body").children("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").triggerHandler("_resize");
            }
            _5b = true;
            TO = false;
        }, 200);
    });
    $.fn.panel = function(_5d, _5e) {
        if (typeof _5d == "string") {
            return $.fn.panel.methods[_5d](this, _5e);
        }
        _5d = _5d || {};
        return this.each(function() {
            var _5f = $.data(this, "panel");
            var _60;
            if (_5f) {
                _60 = $.extend(_5f.options, _5d);
                _5f.isLoaded = false;
            } else {
                _60 = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), _5d);
                $(this).attr("title", "");
                _5f = $.data(this, "panel", {
                    options: _60,
                    panel: _f(this),
                    isLoaded: false
                });
            }
            _13(this);
            _52(this);
            if (_60.doSize == true) {
                _5f.panel.css("display", "block");
                _3(this);
            }
            if (_60.closed == true || _60.minimized == true) {
                _5f.panel.hide();
            } else {
                _27(this);
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
            return $.data(jq[0], "panel").panel.find(">div.panel-body");
        },
        setTitle: function(jq, _61) {
            return jq.each(function() {
                _58(this, _61);
            });
        },
        open: function(jq, _62) {
            return jq.each(function() {
                _27(this, _62);
            });
        },
        close: function(jq, _63) {
            return jq.each(function() {
                _19(this, _63);
            });
        },
        destroy: function(jq, _64) {
            return jq.each(function() {
                _33(this, _64);
            });
        },
        refresh: function(jq, _65) {
            return jq.each(function() {
                var _66 = $.data(this, "panel");
                _66.isLoaded = false;
                if (_65) {
                    if (typeof _65 == "string") {
                        _66.options.href = _65;
                    } else {
                        _66.options.queryParams = _65;
                    }
                }
                _1a(this);
            });
        },
        resize: function(jq, _67) {
            return jq.each(function() {
                _3(this, _67);
            });
        },
        move: function(jq, _68) {
            return jq.each(function() {
                _a(this, _68);
            });
        },
        maximize: function(jq) {
            return jq.each(function() {
                _2d(this);
            });
        },
        minimize: function(jq) {
            return jq.each(function() {
                _49(this);
            });
        },
        restore: function(jq) {
            return jq.each(function() {
                _4d(this);
            });
        },
        collapse: function(jq, _69) {
            return jq.each(function() {
                _2e(this, _69);
            });
        },
        expand: function(jq, _6a) {
            return jq.each(function() {
                _3e(this, _6a);
            });
        }
    };
    $.fn.panel.parseOptions = function(_6b) {
        var t = $(_6b);
        return $.extend({}, $.parser.parseOptions(_6b, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", {
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
        loader: function(_6c, _6d, _6e) {
            var _6f = $(this).panel("options");
            if (!_6f.href) {
                return false;
            }
            $.ajax({
                type: _6f.method,
                url: _6f.href,
                cache: false,
                data: _6c,
                dataType: "html",
                success: function(_70) {
                    _6d(_70);
                },
                error: function() {
                    _6e.apply(this, arguments);
                }
            });
        },
        extractor: function(_71) {
            var _72 = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var _73 = _72.exec(_71);
            if (_73) {
                return _73[1];
            } else {
                return _71;
            }
        },
        onBeforeLoad: function(_74) {},
        onLoad: function() {},
        onLoadError: function() {},
        onBeforeOpen: function() {},
        onOpen: function() {},
        onBeforeClose: function() {},
        onClose: function() {},
        onBeforeDestroy: function() {},
        onDestroy: function() {},
        onResize: function(_75, _76) {},
        onMove: function(_77, top) {},
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
define("jqui/1.3.6/panel-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.panel{overflow:hidden;font-size:12px;text-align:left;}.panel-header,.panel-body{border-width:1px;border-style:solid;}.panel-header{padding:5px;position:relative;}.panel-title{background:0 0;}.panel-header-noborder{border-width:0 0 1px 0;}.panel-body{overflow:auto;border-top-width:0;}.panel-body-noheader{border-top-width:1px;}.panel-body-noborder{border-width:0;}.panel-with-icon{padding-left:18px;}.panel-icon,.panel-tool{position:absolute;top:50%;margin-top:-8px;height:16px;overflow:hidden;}.panel-icon{left:5px;width:16px;}.panel-tool{right:5px;width:auto;}.panel-tool a{display:inline-block;width:16px;height:16px;opacity:.6;margin:0 0 0 2px;vertical-align:top;}.panel-tool a:hover{opacity:1;background-color:#e6e6e6;-moz-border-radius:3px 3px 3px 3px;-webkit-border-radius:3px 3px 3px 3px;border-radius:3px 3px 3px 3px;}.panel-loading{padding:11px 0 10px 30px;}.panel-noscroll{overflow:hidden;}.panel-fit,.panel-fit body{height:100%;margin:0;padding:0;border:0;overflow:hidden;}.panel-loading{background:url(data:image/gif;base64,R0lGODlhEAAQAPYAAOfn5xhFjMPL15CiwGWBrkttok5vo3GLs5urxcvR2p2txjRbmDhemT5inENnn0psoW2Isa+7zi5WlXSNtNfa39nc4LXA0YecvFh3p2SArbK9z8HJ1kZpoClTk4mdvaGwyGJ/rHyTt8/U3ISZuyJNkGyGsJanw2qFr6u4zFBwpCBLj6e1ypGkwSpTkxxIjdTX3t3f4nmRtoOZu9/h44GXuqCvx+Pk5eXl5rO+0LvF0+Hi5MXM2KWzytvd4cLJ1tHW3czR2r/I1bnD0rC7zs3T28fO2N3f4snP2XqRtqm3y6i1ylV1p1p4qGB9q2eDrk1vo0hqoLfB0XePtUBkndXZ3zpfmoufvl99qzthmzBXlpmqxFZ1pyZQkoabvGiDrkJlnrrD0r3G1NPX3q26zX6UuI6hv5ipw117qoyfvlRzplJypTJZl56txiROkSBLj6OyyRpGjJWnwzZcmShRkkRnn3aOtTxhmx5JjnKLszFZl1x6qW+Jsn+WuQAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA) no-repeat 10px 10px;}.panel-tool-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -16px 0;}.panel-tool-min{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat 0 0;}.panel-tool-max{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat 0 -16px;}.panel-tool-restore{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -16px -16px;}.panel-tool-collapse{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -32px 0;}.panel-tool-expand{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -32px -16px;}.panel-header,.panel-body{border-color:#D4D4D4;}.panel-header{background-color:#F2F2F2;background:-webkit-linear-gradient(top,#fff 0,#F2F2F2 100%);background:-moz-linear-gradient(top,#fff 0,#F2F2F2 100%);background:-o-linear-gradient(top,#fff 0,#F2F2F2 100%);background:linear-gradient(to bottom,#fff 0,#F2F2F2 100%);background-repeat:repeat-x;}.panel-body{background-color:#fff;color:#333;}.panel-title{font-weight:700;color:#777;height:20px;line-height:20px;}');

});
