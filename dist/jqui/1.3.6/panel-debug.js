define("jqui/1.3.6/panel-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
define("jqui/1.3.6/panel-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.panel{overflow:hidden;font-size:12px;text-align:left;}.panel-header,.panel-body{border-width:1px;border-style:solid;}.panel-header{padding:5px;position:relative;}.panel-title{background:0 0;}.panel-header-noborder{border-width:0 0 1px 0;}.panel-body{overflow:auto;border-top-width:0;}.panel-body-noheader{border-top-width:1px;}.panel-body-noborder{border-width:0;}.panel-with-icon{padding-left:18px;}.panel-icon,.panel-tool{position:absolute;top:50%;margin-top:-8px;height:16px;overflow:hidden;}.panel-icon{left:5px;width:16px;}.panel-tool{right:5px;width:auto;}.panel-tool a{display:inline-block;width:16px;height:16px;opacity:.6;margin:0 0 0 2px;vertical-align:top;}.panel-tool a:hover{opacity:1;background-color:#e6e6e6;-moz-border-radius:3px 3px 3px 3px;-webkit-border-radius:3px 3px 3px 3px;border-radius:3px 3px 3px 3px;}.panel-loading{padding:11px 0 10px 30px;}.panel-noscroll{overflow:hidden;}.panel-fit,.panel-fit body{height:100%;margin:0;padding:0;border:0;overflow:hidden;}.panel-loading{background:url(data:image/gif;base64,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) no-repeat 10px 10px;}.panel-tool-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -16px 0;}.panel-tool-min{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat 0 0;}.panel-tool-max{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat 0 -16px;}.panel-tool-restore{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -16px -16px;}.panel-tool-collapse{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -32px 0;}.panel-tool-expand{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAiUlEQVR42u2YSwqAMAwFeytv5g09l+LOhZ/a92wamQE3hYYMTeVpKQBgZZqXdX9q14cVODZ7tpZGQmk+VNrVfJiE0oDrBENG6GpvdQ21QPgldgmkfY0CAMA/8ryaR8LyDAIPtbsIKA3ciSv7X6XRLwQckbrbCThGp3l0RxFojuDOD5p0fyMAErIB7kio3inCu1EAAAAASUVORK5CYII=) no-repeat -32px -16px;}.panel-header,.panel-body{border-color:#D4D4D4;}.panel-header{background-color:#F2F2F2;background:-webkit-linear-gradient(top,#fff 0,#F2F2F2 100%);background:-moz-linear-gradient(top,#fff 0,#F2F2F2 100%);background:-o-linear-gradient(top,#fff 0,#F2F2F2 100%);background:linear-gradient(to bottom,#fff 0,#F2F2F2 100%);background-repeat:repeat-x;}.panel-body{background-color:#fff;color:#333;}.panel-title{font-weight:700;color:#777;height:20px;line-height:20px;}');

});
