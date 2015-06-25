define("jqui/1.3.6/layout-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
require("jqui/1.3.6/layout-debug.css.js");
require("jqui/1.3.6/resizable-debug");
require("jqui/1.3.6/panel-debug");

(function($) {
    var _1 = false;

    function _2(_3) {
        var _4 = $.data(_3, "layout");
        var _5 = _4.options;
        var _6 = _4.panels;
        var cc = $(_3);
        if (_3.tagName == "BODY") {
            cc._fit();
        } else {
            _5.fit ? cc.css(cc._fit()) : cc._fit(false);
        }
        var _7 = {
            top: 0,
            left: 0,
            width: cc.width(),
            height: cc.height()
        };
        _8(_9(_6.expandNorth) ? _6.expandNorth : _6.north, "n");
        _8(_9(_6.expandSouth) ? _6.expandSouth : _6.south, "s");
        _a(_9(_6.expandEast) ? _6.expandEast : _6.east, "e");
        _a(_9(_6.expandWest) ? _6.expandWest : _6.west, "w");
        _6.center.panel("resize", _7);

        function _b(pp) {
            var _c = pp.panel("options");
            return Math.min(Math.max(_c.height, _c.minHeight), _c.maxHeight);
        };

        function _d(pp) {
            var _e = pp.panel("options");
            return Math.min(Math.max(_e.width, _e.minWidth), _e.maxWidth);
        };

        function _8(pp, _f) {
            if (!pp.length || !_9(pp)) {
                return;
            }
            var _10 = pp.panel("options");
            var _11 = _b(pp);
            pp.panel("resize", {
                width: cc.width(),
                height: _11,
                left: 0,
                top: (_f == "n" ? 0 : cc.height() - _11)
            });
            _7.height -= _11;
            if (_f == "n") {
                _7.top += _11;
                if (!_10.split && _10.border) {
                    _7.top--;
                }
            }
            if (!_10.split && _10.border) {
                _7.height++;
            }
        };

        function _a(pp, _12) {
            if (!pp.length || !_9(pp)) {
                return;
            }
            var _13 = pp.panel("options");
            var _14 = _d(pp);
            pp.panel("resize", {
                width: _14,
                height: _7.height,
                left: (_12 == "e" ? cc.width() - _14 : 0),
                top: _7.top
            });
            _7.width -= _14;
            if (_12 == "w") {
                _7.left += _14;
                if (!_13.split && _13.border) {
                    _7.left--;
                }
            }
            if (!_13.split && _13.border) {
                _7.width++;
            }
        };
    };

    function _15(_16) {
        var cc = $(_16);
        cc.addClass("layout");

        function _17(cc) {
            cc.children("div").each(function() {
                var _18 = $.fn.layout.parsePanelOptions(this);
                if ("north,south,east,west,center".indexOf(_18.region) >= 0) {
                    _1b(_16, _18, this);
                }
            });
        };
        cc.children("form").length ? _17(cc.children("form")) : _17(cc);
        cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
        cc.bind("_resize", function(e, _19) {
            var _1a = $.data(_16, "layout").options;
            if (_1a.fit == true || _19) {
                _2(_16);
            }
            return false;
        });
    };

    function _1b(_1c, _1d, el) {
        _1d.region = _1d.region || "center";
        var _1e = $.data(_1c, "layout").panels;
        var cc = $(_1c);
        var dir = _1d.region;
        if (_1e[dir].length) {
            return;
        }
        var pp = $(el);
        if (!pp.length) {
            pp = $("<div></div>").appendTo(cc);
        }
        var _1f = $.extend({}, $.fn.layout.paneldefaults, {
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
            height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
            doSize: false,
            collapsible: true,
            cls: ("layout-panel layout-panel-" + dir),
            bodyCls: "layout-body",
            onOpen: function() {
                var _20 = $(this).panel("header").children("div.panel-tool");
                _20.children("a.panel-tool-collapse").hide();
                var _21 = {
                    north: "up",
                    south: "down",
                    east: "right",
                    west: "left"
                };
                if (!_21[dir]) {
                    return;
                }
                var _22 = "layout-button-" + _21[dir];
                var t = _20.children("a." + _22);
                if (!t.length) {
                    t = $("<a href=\"javascript:void(0)\"></a>").addClass(_22).appendTo(_20);
                    t.bind("click", {
                        dir: dir
                    }, function(e) {
                        _2f(_1c, e.data.dir);
                        return false;
                    });
                }
                $(this).panel("options").collapsible ? t.show() : t.hide();
            }
        }, _1d);
        pp.panel(_1f);
        _1e[dir] = pp;
        if (pp.panel("options").split) {
            var _23 = pp.panel("panel");
            _23.addClass("layout-split-" + dir);
            var _24 = "";
            if (dir == "north") {
                _24 = "s";
            }
            if (dir == "south") {
                _24 = "n";
            }
            if (dir == "east") {
                _24 = "w";
            }
            if (dir == "west") {
                _24 = "e";
            }
            _23.resizable($.extend({}, {
                handles: _24,
                onStartResize: function(e) {
                    _1 = true;
                    if (dir == "north" || dir == "south") {
                        var _25 = $(">div.layout-split-proxy-v", _1c);
                    } else {
                        var _25 = $(">div.layout-split-proxy-h", _1c);
                    }
                    var top = 0,
                        _26 = 0,
                        _27 = 0,
                        _28 = 0;
                    var pos = {
                        display: "block"
                    };
                    if (dir == "north") {
                        pos.top = parseInt(_23.css("top")) + _23.outerHeight() - _25.height();
                        pos.left = parseInt(_23.css("left"));
                        pos.width = _23.outerWidth();
                        pos.height = _25.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_23.css("top"));
                            pos.left = parseInt(_23.css("left"));
                            pos.width = _23.outerWidth();
                            pos.height = _25.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_23.css("top")) || 0;
                                pos.left = parseInt(_23.css("left")) || 0;
                                pos.width = _25.width();
                                pos.height = _23.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_23.css("top")) || 0;
                                    pos.left = _23.outerWidth() - _25.width();
                                    pos.width = _25.width();
                                    pos.height = _23.outerHeight();
                                }
                            }
                        }
                    }
                    _25.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                },
                onResize: function(e) {
                    if (dir == "north" || dir == "south") {
                        var _29 = $(">div.layout-split-proxy-v", _1c);
                        _29.css("top", e.pageY - $(_1c).offset().top - _29.height() / 2);
                    } else {
                        var _29 = $(">div.layout-split-proxy-h", _1c);
                        _29.css("left", e.pageX - $(_1c).offset().left - _29.width() / 2);
                    }
                    return false;
                },
                onStopResize: function(e) {
                    cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    pp.panel("resize", e.data);
                    _2(_1c);
                    _1 = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _1d));
        }
    };

    function _2a(_2b, _2c) {
        var _2d = $.data(_2b, "layout").panels;
        if (_2d[_2c].length) {
            _2d[_2c].panel("destroy");
            _2d[_2c] = $();
            var _2e = "expand" + _2c.substring(0, 1).toUpperCase() + _2c.substring(1);
            if (_2d[_2e]) {
                _2d[_2e].panel("destroy");
                _2d[_2e] = undefined;
            }
        }
    };

    function _2f(_30, _31, _32) {
        if (_32 == undefined) {
            _32 = "normal";
        }
        var _33 = $.data(_30, "layout").panels;
        var p = _33[_31];
        var _34 = p.panel("options");
        if (_34.onBeforeCollapse.call(p) == false) {
            return;
        }
        var _35 = "expand" + _31.substring(0, 1).toUpperCase() + _31.substring(1);
        if (!_33[_35]) {
            _33[_35] = _36(_31);
            _33[_35].panel("panel").bind("click", function() {
                var _37 = _38();
                p.panel("expand", false).panel("open").panel("resize", _37.collapse);
                p.panel("panel").animate(_37.expand, function() {
                    $(this).unbind(".layout").bind("mouseleave.layout", {
                        region: _31
                    }, function(e) {
                        if (_1 == true) {
                            return;
                        }
                        _2f(_30, e.data.region);
                    });
                });
                return false;
            });
        }
        var _39 = _38();
        if (!_9(_33[_35])) {
            _33.center.panel("resize", _39.resizeC);
        }
        p.panel("panel").animate(_39.collapse, _32, function() {
            p.panel("collapse", false).panel("close");
            _33[_35].panel("open").panel("resize", _39.expandP);
            $(this).unbind(".layout");
        });

        function _36(dir) {
            var _3a;
            if (dir == "east") {
                _3a = "layout-button-left";
            } else {
                if (dir == "west") {
                    _3a = "layout-button-right";
                } else {
                    if (dir == "north") {
                        _3a = "layout-button-down";
                    } else {
                        if (dir == "south") {
                            _3a = "layout-button-up";
                        }
                    }
                }
            }
            var p = $("<div></div>").appendTo(_30);
            p.panel($.extend({}, $.fn.layout.paneldefaults, {
                cls: ("layout-expand layout-expand-" + dir),
                title: "&nbsp;",
                closed: true,
                minWidth: 0,
                minHeight: 0,
                doSize: false,
                tools: [{
                    iconCls: _3a,
                    handler: function() {
                        _3d(_30, _31);
                        return false;
                    }
                }]
            }));
            p.panel("panel").hover(function() {
                $(this).addClass("layout-expand-over");
            }, function() {
                $(this).removeClass("layout-expand-over");
            });
            return p;
        };

        function _38() {
            var cc = $(_30);
            var _3b = _33.center.panel("options");
            var _3c = _34.collapsedSize;
            if (_31 == "east") {
                var ww = _3b.width + _34.width - _3c;
                if (_34.split || !_34.border) {
                    ww++;
                }
                return {
                    resizeC: {
                        width: ww
                    },
                    expand: {
                        left: cc.width() - _34.width
                    },
                    expandP: {
                        top: _3b.top,
                        left: cc.width() - _3c,
                        width: _3c,
                        height: _3b.height
                    },
                    collapse: {
                        left: cc.width(),
                        top: _3b.top,
                        height: _3b.height
                    }
                };
            } else {
                if (_31 == "west") {
                    var ww = _3b.width + _34.width - _3c;
                    if (_34.split || !_34.border) {
                        ww++;
                    }
                    return {
                        resizeC: {
                            width: ww,
                            left: _3c - 1
                        },
                        expand: {
                            left: 0
                        },
                        expandP: {
                            left: 0,
                            top: _3b.top,
                            width: _3c,
                            height: _3b.height
                        },
                        collapse: {
                            left: -_34.width,
                            top: _3b.top,
                            height: _3b.height
                        }
                    };
                } else {
                    if (_31 == "north") {
                        var hh = _3b.height;
                        if (!_9(_33.expandNorth)) {
                            hh += _34.height - _3c + ((_34.split || !_34.border) ? 1 : 0);
                        }
                        _33.east.add(_33.west).add(_33.expandEast).add(_33.expandWest).panel("resize", {
                            top: _3c - 1,
                            height: hh
                        });
                        return {
                            resizeC: {
                                top: _3c - 1,
                                height: hh
                            },
                            expand: {
                                top: 0
                            },
                            expandP: {
                                top: 0,
                                left: 0,
                                width: cc.width(),
                                height: _3c
                            },
                            collapse: {
                                top: -_34.height,
                                width: cc.width()
                            }
                        };
                    } else {
                        if (_31 == "south") {
                            var hh = _3b.height;
                            if (!_9(_33.expandSouth)) {
                                hh += _34.height - _3c + ((_34.split || !_34.border) ? 1 : 0);
                            }
                            _33.east.add(_33.west).add(_33.expandEast).add(_33.expandWest).panel("resize", {
                                height: hh
                            });
                            return {
                                resizeC: {
                                    height: hh
                                },
                                expand: {
                                    top: cc.height() - _34.height
                                },
                                expandP: {
                                    top: cc.height() - _3c,
                                    left: 0,
                                    width: cc.width(),
                                    height: _3c
                                },
                                collapse: {
                                    top: cc.height(),
                                    width: cc.width()
                                }
                            };
                        }
                    }
                }
            }
        };
    };

    function _3d(_3e, _3f) {
        var _40 = $.data(_3e, "layout").panels;
        var p = _40[_3f];
        var _41 = p.panel("options");
        if (_41.onBeforeExpand.call(p) == false) {
            return;
        }
        var _42 = _43();
        var _44 = "expand" + _3f.substring(0, 1).toUpperCase() + _3f.substring(1);
        if (_40[_44]) {
            _40[_44].panel("close");
            p.panel("panel").stop(true, true);
            p.panel("expand", false).panel("open").panel("resize", _42.collapse);
            p.panel("panel").animate(_42.expand, function() {
                _2(_3e);
            });
        }

        function _43() {
            var cc = $(_3e);
            var _45 = _40.center.panel("options");
            if (_3f == "east" && _40.expandEast) {
                return {
                    collapse: {
                        left: cc.width(),
                        top: _45.top,
                        height: _45.height
                    },
                    expand: {
                        left: cc.width() - _40["east"].panel("options").width
                    }
                };
            } else {
                if (_3f == "west" && _40.expandWest) {
                    return {
                        collapse: {
                            left: -_40["west"].panel("options").width,
                            top: _45.top,
                            height: _45.height
                        },
                        expand: {
                            left: 0
                        }
                    };
                } else {
                    if (_3f == "north" && _40.expandNorth) {
                        return {
                            collapse: {
                                top: -_40["north"].panel("options").height,
                                width: cc.width()
                            },
                            expand: {
                                top: 0
                            }
                        };
                    } else {
                        if (_3f == "south" && _40.expandSouth) {
                            return {
                                collapse: {
                                    top: cc.height(),
                                    width: cc.width()
                                },
                                expand: {
                                    top: cc.height() - _40["south"].panel("options").height
                                }
                            };
                        }
                    }
                }
            }
        };
    };

    function _9(pp) {
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel("panel").is(":visible");
        } else {
            return false;
        }
    };

    function _46(_47) {
        var _48 = $.data(_47, "layout").panels;
        if (_48.east.length && _48.east.panel("options").collapsed) {
            _2f(_47, "east", 0);
        }
        if (_48.west.length && _48.west.panel("options").collapsed) {
            _2f(_47, "west", 0);
        }
        if (_48.north.length && _48.north.panel("options").collapsed) {
            _2f(_47, "north", 0);
        }
        if (_48.south.length && _48.south.panel("options").collapsed) {
            _2f(_47, "south", 0);
        }
    };
    $.fn.layout = function(_49, _4a) {
        if (typeof _49 == "string") {
            return $.fn.layout.methods[_49](this, _4a);
        }
        _49 = _49 || {};
        return this.each(function() {
            var _4b = $.data(this, "layout");
            if (_4b) {
                $.extend(_4b.options, _49);
            } else {
                var _4c = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _49);
                $.data(this, "layout", {
                    options: _4c,
                    panels: {
                        center: $(),
                        north: $(),
                        south: $(),
                        east: $(),
                        west: $()
                    }
                });
                _15(this);
            }
            _2(this);
            _46(this);
        });
    };
    $.fn.layout.methods = {
        resize: function(jq) {
            return jq.each(function() {
                _2(this);
            });
        },
        panel: function(jq, _4d) {
            return $.data(jq[0], "layout").panels[_4d];
        },
        collapse: function(jq, _4e) {
            return jq.each(function() {
                _2f(this, _4e);
            });
        },
        expand: function(jq, _4f) {
            return jq.each(function() {
                _3d(this, _4f);
            });
        },
        add: function(jq, _50) {
            return jq.each(function() {
                _1b(this, _50);
                _2(this);
                if ($(this).layout("panel", _50.region).panel("options").collapsed) {
                    _2f(this, _50.region, 0);
                }
            });
        },
        remove: function(jq, _51) {
            return jq.each(function() {
                _2a(this, _51);
                _2(this);
            });
        }
    };
    $.fn.layout.parseOptions = function(_52) {
        return $.extend({}, $.parser.parseOptions(_52, [{
            fit: "boolean"
        }]));
    };
    $.fn.layout.defaults = {
        fit: false
    };
    $.fn.layout.parsePanelOptions = function(_53) {
        var t = $(_53);
        return $.extend({}, $.fn.panel.parseOptions(_53), $.parser.parseOptions(_53, ["region", {
            split: "boolean",
            collpasedSize: "number",
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number"
        }]));
    };
    $.fn.layout.paneldefaults = $.extend({}, $.fn.panel.defaults, {
        region: null,
        split: false,
        collapsedSize: 28,
        minWidth: 10,
        minHeight: 10,
        maxWidth: 10000,
        maxHeight: 10000
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
define("jqui/1.3.6/layout-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.layout{position:relative;overflow:hidden;margin:0;padding:0;z-index:0;}.layout-panel{position:absolute;overflow:hidden;}.layout-panel-east,.layout-panel-west{z-index:2;}.layout-panel-north,.layout-panel-south{z-index:3;}.layout-expand{position:absolute;padding:0;font-size:1px;cursor:pointer;z-index:1;}.layout-expand .panel-header,.layout-expand .panel-body{background:0 0;filter:none;overflow:hidden;}.layout-expand .panel-header{border-bottom-width:0;}.layout-split-proxy-h,.layout-split-proxy-v{position:absolute;font-size:1px;display:none;z-index:5;}.layout-split-proxy-h{width:5px;cursor:e-resize;}.layout-split-proxy-v{height:5px;cursor:n-resize;}.layout-mask{position:absolute;background:#fafafa;filter:alpha(opacity=10);opacity:.1;z-index:4;}.layout-button-up{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3MTZDODAzQjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3MTZDODA0QjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTcxNkM4MDFCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTcxNkM4MDJCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6cg/0MAAADLklEQVR42uxWu4oiQRTt9pn4WDBRwcDHxtPKhgvj/IPJpsL8gpGaaOYnTOAH6D+MCxsOqHkriIEGJqMmPsCt0/RtbldX97qwMCzMhaLtU22dU/feurf02+2mfaTpnwJIQLVatX7MZjOdJg3DSIvHRGBVGZtOp1V5MbHGtFAoGPF43HrH2rqua/Imk8mkORwOf4ifbyECy+WyVqlUNE4UjUZ/YkGORSIRFyZZfbvdzs/ns0PKySEmlUqZnU7nGXsFFlKtQuTZbPaBdkNYPp9/iMVifh59v1wuj5vNZi6eLmJYIpEw2+32c6lU+iVery4B5CoiyuVyFhEw4VpHUAC5RwQ8wd2OnXNylwCKF1zMiYCFw2GXN4JMhMcjAjvn5M1m0/k+wv8MEXznHAP5HSdmimghn7gdj8dKq9V6pQ3BG+KnOwkxgZHJZEyKGeHA+Dd83i8JeexJOJEjDzxJSB/BVXAZX5Vj+M7PE4Lg/Xq9Pson4a4kpMUxCULbTZapMJXZ4qz4kwhK7j8mIakUzysntJPTwqAeWEAIqJY4Ik6nk4e80Wh4k1AqGFfxbono9XovfpjKCVTUeAWkJJSq4hMqKu8FdZtowkRBoCGwNxlDBitK8Q0ekGMvbxA2Ho89Aj7b8X8voC6y+1U+VaqjulgsNNHOddcxRC9H0+HVToXVarUb3R0UhUiuCcqWzC3EmoiBjmdfOHwxcZY1udbbhtOji+zGiA4Ggyecf9SB1Wo1N03zixhgp+EWgAaEjscJgaERySL8bDQaWbVluVx+R63A+edriLm0EKH2AAwdDyLQkkEId4k/OhiFI8Ac8sPhUKEWT+uSCF8B+AM+ZoodYcAg4h5y7FwuQH4ilFcyCgdPGlogIMMNIucJyL9l6048vYDqNLkNdwC4kc9xTGEozV95HvT7/ZfdblfBzQhtGk3KvjGpQ8D7NpoOv1BQRwtKAHHVdoViv987SWiHL71er/0FyJdHciNdpYH9TRLy8PGT4CuAXx7RfmVBhN1LzgsRP+bKJAR5t9v1kAMrFosu8qAkpByRqx8GhYMnoZN4Ynyzez2fU2F1e2j/Ynx4N/wtwADoFI0AAx4etAAAAABJRU5ErkJggg==) no-repeat -16px -16px;}.layout-button-down{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3MTZDODAzQjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3MTZDODA0QjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTcxNkM4MDFCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTcxNkM4MDJCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6cg/0MAAADLklEQVR42uxWu4oiQRTt9pn4WDBRwcDHxtPKhgvj/IPJpsL8gpGaaOYnTOAH6D+MCxsOqHkriIEGJqMmPsCt0/RtbldX97qwMCzMhaLtU22dU/feurf02+2mfaTpnwJIQLVatX7MZjOdJg3DSIvHRGBVGZtOp1V5MbHGtFAoGPF43HrH2rqua/Imk8mkORwOf4ifbyECy+WyVqlUNE4UjUZ/YkGORSIRFyZZfbvdzs/ns0PKySEmlUqZnU7nGXsFFlKtQuTZbPaBdkNYPp9/iMVifh59v1wuj5vNZi6eLmJYIpEw2+32c6lU+iVery4B5CoiyuVyFhEw4VpHUAC5RwQ8wd2OnXNylwCKF1zMiYCFw2GXN4JMhMcjAjvn5M1m0/k+wv8MEXznHAP5HSdmimghn7gdj8dKq9V6pQ3BG+KnOwkxgZHJZEyKGeHA+Dd83i8JeexJOJEjDzxJSB/BVXAZX5Vj+M7PE4Lg/Xq9Pson4a4kpMUxCULbTZapMJXZ4qz4kwhK7j8mIakUzysntJPTwqAeWEAIqJY4Ik6nk4e80Wh4k1AqGFfxbono9XovfpjKCVTUeAWkJJSq4hMqKu8FdZtowkRBoCGwNxlDBitK8Q0ekGMvbxA2Ho89Aj7b8X8voC6y+1U+VaqjulgsNNHOddcxRC9H0+HVToXVarUb3R0UhUiuCcqWzC3EmoiBjmdfOHwxcZY1udbbhtOji+zGiA4Ggyecf9SB1Wo1N03zixhgp+EWgAaEjscJgaERySL8bDQaWbVluVx+R63A+edriLm0EKH2AAwdDyLQkkEId4k/OhiFI8Ac8sPhUKEWT+uSCF8B+AM+ZoodYcAg4h5y7FwuQH4ilFcyCgdPGlogIMMNIucJyL9l6048vYDqNLkNdwC4kc9xTGEozV95HvT7/ZfdblfBzQhtGk3KvjGpQ8D7NpoOv1BQRwtKAHHVdoViv987SWiHL71er/0FyJdHciNdpYH9TRLy8PGT4CuAXx7RfmVBhN1LzgsRP+bKJAR5t9v1kAMrFosu8qAkpByRqx8GhYMnoZN4Ynyzez2fU2F1e2j/Ynx4N/wtwADoFI0AAx4etAAAAABJRU5ErkJggg==) no-repeat -16px 0;}.layout-button-left{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3MTZDODAzQjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3MTZDODA0QjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTcxNkM4MDFCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTcxNkM4MDJCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6cg/0MAAADLklEQVR42uxWu4oiQRTt9pn4WDBRwcDHxtPKhgvj/IPJpsL8gpGaaOYnTOAH6D+MCxsOqHkriIEGJqMmPsCt0/RtbldX97qwMCzMhaLtU22dU/feurf02+2mfaTpnwJIQLVatX7MZjOdJg3DSIvHRGBVGZtOp1V5MbHGtFAoGPF43HrH2rqua/Imk8mkORwOf4ifbyECy+WyVqlUNE4UjUZ/YkGORSIRFyZZfbvdzs/ns0PKySEmlUqZnU7nGXsFFlKtQuTZbPaBdkNYPp9/iMVifh59v1wuj5vNZi6eLmJYIpEw2+32c6lU+iVery4B5CoiyuVyFhEw4VpHUAC5RwQ8wd2OnXNylwCKF1zMiYCFw2GXN4JMhMcjAjvn5M1m0/k+wv8MEXznHAP5HSdmimghn7gdj8dKq9V6pQ3BG+KnOwkxgZHJZEyKGeHA+Dd83i8JeexJOJEjDzxJSB/BVXAZX5Vj+M7PE4Lg/Xq9Pson4a4kpMUxCULbTZapMJXZ4qz4kwhK7j8mIakUzysntJPTwqAeWEAIqJY4Ik6nk4e80Wh4k1AqGFfxbono9XovfpjKCVTUeAWkJJSq4hMqKu8FdZtowkRBoCGwNxlDBitK8Q0ekGMvbxA2Ho89Aj7b8X8voC6y+1U+VaqjulgsNNHOddcxRC9H0+HVToXVarUb3R0UhUiuCcqWzC3EmoiBjmdfOHwxcZY1udbbhtOji+zGiA4Ggyecf9SB1Wo1N03zixhgp+EWgAaEjscJgaERySL8bDQaWbVluVx+R63A+edriLm0EKH2AAwdDyLQkkEId4k/OhiFI8Ac8sPhUKEWT+uSCF8B+AM+ZoodYcAg4h5y7FwuQH4ilFcyCgdPGlogIMMNIucJyL9l6048vYDqNLkNdwC4kc9xTGEozV95HvT7/ZfdblfBzQhtGk3KvjGpQ8D7NpoOv1BQRwtKAHHVdoViv987SWiHL71er/0FyJdHciNdpYH9TRLy8PGT4CuAXx7RfmVBhN1LzgsRP+bKJAR5t9v1kAMrFosu8qAkpByRqx8GhYMnoZN4Ynyzez2fU2F1e2j/Ynx4N/wtwADoFI0AAx4etAAAAABJRU5ErkJggg==) no-repeat 0 0;}.layout-button-right{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3MTZDODAzQjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3MTZDODA0QjY0ODExRTNBOThCQjFGNkUzNEY2N0NFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTcxNkM4MDFCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTcxNkM4MDJCNjQ4MTFFM0E5OEJCMUY2RTM0RjY3Q0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6cg/0MAAADLklEQVR42uxWu4oiQRTt9pn4WDBRwcDHxtPKhgvj/IPJpsL8gpGaaOYnTOAH6D+MCxsOqHkriIEGJqMmPsCt0/RtbldX97qwMCzMhaLtU22dU/feurf02+2mfaTpnwJIQLVatX7MZjOdJg3DSIvHRGBVGZtOp1V5MbHGtFAoGPF43HrH2rqua/Imk8mkORwOf4ifbyECy+WyVqlUNE4UjUZ/YkGORSIRFyZZfbvdzs/ns0PKySEmlUqZnU7nGXsFFlKtQuTZbPaBdkNYPp9/iMVifh59v1wuj5vNZi6eLmJYIpEw2+32c6lU+iVery4B5CoiyuVyFhEw4VpHUAC5RwQ8wd2OnXNylwCKF1zMiYCFw2GXN4JMhMcjAjvn5M1m0/k+wv8MEXznHAP5HSdmimghn7gdj8dKq9V6pQ3BG+KnOwkxgZHJZEyKGeHA+Dd83i8JeexJOJEjDzxJSB/BVXAZX5Vj+M7PE4Lg/Xq9Pson4a4kpMUxCULbTZapMJXZ4qz4kwhK7j8mIakUzysntJPTwqAeWEAIqJY4Ik6nk4e80Wh4k1AqGFfxbono9XovfpjKCVTUeAWkJJSq4hMqKu8FdZtowkRBoCGwNxlDBitK8Q0ekGMvbxA2Ho89Aj7b8X8voC6y+1U+VaqjulgsNNHOddcxRC9H0+HVToXVarUb3R0UhUiuCcqWzC3EmoiBjmdfOHwxcZY1udbbhtOji+zGiA4Ggyecf9SB1Wo1N03zixhgp+EWgAaEjscJgaERySL8bDQaWbVluVx+R63A+edriLm0EKH2AAwdDyLQkkEId4k/OhiFI8Ac8sPhUKEWT+uSCF8B+AM+ZoodYcAg4h5y7FwuQH4ilFcyCgdPGlogIMMNIucJyL9l6048vYDqNLkNdwC4kc9xTGEozV95HvT7/ZfdblfBzQhtGk3KvjGpQ8D7NpoOv1BQRwtKAHHVdoViv987SWiHL71er/0FyJdHciNdpYH9TRLy8PGT4CuAXx7RfmVBhN1LzgsRP+bKJAR5t9v1kAMrFosu8qAkpByRqx8GhYMnoZN4Ynyzez2fU2F1e2j/Ynx4N/wtwADoFI0AAx4etAAAAABJRU5ErkJggg==) no-repeat 0 -16px;}.layout-split-proxy-h,.layout-split-proxy-v{background-color:#bbb;}.layout-split-north{border-bottom:3px solid #dfdfdf;}.layout-split-south{border-top:3px solid #dfdfdf;}.layout-split-east{border-left:3px solid #dfdfdf;}.layout-split-west{border-right:3px solid #dfdfdf;}.layout-expand,.layout-expand-over{background-color:#F2F2F2;}');

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
