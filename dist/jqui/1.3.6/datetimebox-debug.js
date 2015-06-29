define("jqui/1.3.6/datetimebox-debug", [], function(require, exports, module){
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
require("jqui/1.3.6/datebox-debug");
require("jqui/1.3.6/timespinner-debug");
(function($) {
    function _1(_2) {
        var _3 = $.data(_2, "datetimebox");
        var _4 = _3.options;
        $(_2).datebox($.extend({}, _4, {
            onShowPanel: function() {
                var _5 = $(_2).datetimebox("getValue");
                _8(_2, _5, true);
                _4.onShowPanel.call(_2);
            },
            formatter: $.fn.datebox.defaults.formatter,
            parser: $.fn.datebox.defaults.parser
        }));
        $(_2).removeClass("datebox-f").addClass("datetimebox-f");
        $(_2).datebox("calendar").calendar({
            onSelect: function(_6) {
                _4.onSelect.call(_2, _6);
            }
        });
        var _7 = $(_2).datebox("panel");
        if (!_3.spinner) {
            var p = $("<div style=\"padding:2px\"><input style=\"width:80px\"></div>").insertAfter(_7.children("div.datebox-calendar-inner"));
            _3.spinner = p.children("input");
        }
        _3.spinner.timespinner({
            showSeconds: _4.showSeconds,
            separator: _4.timeSeparator
        }).unbind(".datetimebox").bind("mousedown.datetimebox", function(e) {
            e.stopPropagation();
        });
        _8(_2, _4.value);
    };

    function _9(_a) {
        var c = $(_a).datetimebox("calendar");
        var t = $(_a).datetimebox("spinner");
        var _b = c.calendar("options").current;
        return new Date(_b.getFullYear(), _b.getMonth(), _b.getDate(), t.timespinner("getHours"), t.timespinner("getMinutes"), t.timespinner("getSeconds"));
    };

    function _c(_d, q) {
        _8(_d, q, true);
    };

    function _e(_f) {
        var _10 = $.data(_f, "datetimebox").options;
        var _11 = _9(_f);
        _8(_f, _10.formatter.call(_f, _11));
        $(_f).combo("hidePanel");
    };

    function _8(_12, _13, _14) {
        var _15 = $.data(_12, "datetimebox").options;
        $(_12).combo("setValue", _13);
        if (!_14) {
            if (_13) {
                var _16 = _15.parser.call(_12, _13);
                $(_12).combo("setValue", _15.formatter.call(_12, _16));
                $(_12).combo("setText", _15.formatter.call(_12, _16));
            } else {
                $(_12).combo("setText", _13);
            }
        }
        var _16 = _15.parser.call(_12, _13);
        $(_12).datetimebox("calendar").calendar("moveTo", _16);
        $(_12).datetimebox("spinner").timespinner("setValue", _17(_16));

        function _17(_18) {
            function _19(_1a) {
                return (_1a < 10 ? "0" : "") + _1a;
            };
            var tt = [_19(_18.getHours()), _19(_18.getMinutes())];
            if (_15.showSeconds) {
                tt.push(_19(_18.getSeconds()));
            }
            return tt.join($(_12).datetimebox("spinner").timespinner("options").separator);
        };
    };
    $.fn.datetimebox = function(_1b, _1c) {
        if (typeof _1b == "string") {
            var _1d = $.fn.datetimebox.methods[_1b];
            if (_1d) {
                return _1d(this, _1c);
            } else {
                return this.datebox(_1b, _1c);
            }
        }
        _1b = _1b || {};
        return this.each(function() {
            var _1e = $.data(this, "datetimebox");
            if (_1e) {
                $.extend(_1e.options, _1b);
            } else {
                $.data(this, "datetimebox", {
                    options: $.extend({}, $.fn.datetimebox.defaults, $.fn.datetimebox.parseOptions(this), _1b)
                });
            }
            _1(this);
        });
    };
    $.fn.datetimebox.methods = {
        options: function(jq) {
            var _1f = jq.datebox("options");
            return $.extend($.data(jq[0], "datetimebox").options, {
                originalValue: _1f.originalValue,
                disabled: _1f.disabled,
                readonly: _1f.readonly
            });
        },
        spinner: function(jq) {
            return $.data(jq[0], "datetimebox").spinner;
        },
        setValue: function(jq, _20) {
            return jq.each(function() {
                _8(this, _20);
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var _21 = $(this).datetimebox("options");
                $(this).datetimebox("setValue", _21.originalValue);
            });
        }
    };
    $.fn.datetimebox.parseOptions = function(_22) {
        var t = $(_22);
        return $.extend({}, $.fn.datebox.parseOptions(_22), $.parser.parseOptions(_22, ["timeSeparator", {
            showSeconds: "boolean"
        }]));
    };
    $.fn.datetimebox.defaults = $.extend({}, $.fn.datebox.defaults, {
        showSeconds: true,
        timeSeparator: ":",
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                _e(this);
            },
            query: function(q, e) {
                _c(this, q);
            }
        },
        buttons: [{
            text: function(_23) {
                return $(_23).datetimebox("options").currentText;
            },
            handler: function(_24) {
                $(_24).datetimebox("calendar").calendar({
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    current: new Date()
                });
                _e(_24);
            }
        }, {
            text: function(_25) {
                return $(_25).datetimebox("options").okText;
            },
            handler: function(_26) {
                _e(_26);
            }
        }, {
            text: function(_27) {
                return $(_27).datetimebox("options").closeText;
            },
            handler: function(_28) {
                $(this).closest("div.combo-panel").panel("close");
            }
        }],
        formatter: function(_29) {
            var h = _29.getHours();
            var M = _29.getMinutes();
            var s = _29.getSeconds();

            function _2a(_2b) {
                return (_2b < 10 ? "0" : "") + _2b;
            };
            var _2c = $(this).datetimebox("spinner").timespinner("options").separator;
            var r = $.fn.datebox.defaults.formatter(_29) + " " + _2a(h) + _2c + _2a(M);
            if ($(this).datetimebox("options").showSeconds) {
                r += _2c + _2a(s);
            }
            return r;
        },
        parser: function(s) {
            if ($.trim(s) == "") {
                return new Date();
            }
            var dt = s.split(" ");
            var d = $.fn.datebox.defaults.parser(dt[0]);
            if (dt.length < 2) {
                return d;
            }
            var _2d = $(this).datetimebox("spinner").timespinner("options").separator;
            var tt = dt[1].split(_2d);
            var _2e = parseInt(tt[0], 10) || 0;
            var _2f = parseInt(tt[1], 10) || 0;
            var _30 = parseInt(tt[2], 10) || 0;
            return new Date(d.getFullYear(), d.getMonth(), d.getDate(), _2e, _2f, _30);
        }
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
define("jqui/1.3.6/datebox-debug", [], function(require, exports, module){
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
//require('./css/datebox.css');
require("jqui/1.3.6/calendar-debug");
require("jqui/1.3.6/combo-debug");

(function($){
	/**
	 * create date box
	 */
	function createBox(target){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		
		$(target).addClass('datebox-f').combo($.extend({}, opts, {
			onShowPanel:function(){
				setCalendar();
				setValue(target, $(target).datebox('getText'), true);
//				setValue(target, $(target).datebox('getText'));
				opts.onShowPanel.call(target);
			}
		}));
		$(target).combo('textbox').parent().addClass('datebox');
		
		/**
		 * if the calendar isn't created, create it.
		 */
		if (!state.calendar){
			createCalendar();
		}
		setValue(target, opts.value);
		
		function createCalendar(){
			var panel = $(target).combo('panel').css('overflow','hidden');
			panel.panel('options').onBeforeDestroy = function(){
				var sc = $(this).find('.calendar-shared');
				if (sc.length){
					sc.insertBefore(sc[0].pholder);
				}
			};
			var cc = $('<div class="datebox-calendar-inner"></div>').appendTo(panel);
			if (opts.sharedCalendar){
				var sc = $(opts.sharedCalendar);
				if (!sc[0].pholder){
					sc[0].pholder = $('<div class="calendar-pholder" style="display:none"></div>').insertAfter(sc);
				}
				sc.addClass('calendar-shared').appendTo(cc);
				if (!sc.hasClass('calendar')){
					sc.calendar();
				}
				state.calendar = sc;
//				state.calendar = $(opts.sharedCalendar).appendTo(cc);
//				if (!state.calendar.hasClass('calendar')){
//					state.calendar.calendar();
//				}
			} else {
				state.calendar = $('<div></div>').appendTo(cc).calendar();
			}
			$.extend(state.calendar.calendar('options'), {
				fit:true,
				border:false,
				onSelect:function(date){
					var opts = $(this.target).datebox('options');
					setValue(this.target, opts.formatter.call(this.target, date));
					$(this.target).combo('hidePanel');
					opts.onSelect.call(target, date);
				}
			});
//			setValue(target, opts.value);
			
			var button = $('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(panel);
			var tr = button.find('tr');
			for(var i=0; i<opts.buttons.length; i++){
				var td = $('<td></td>').appendTo(tr);
				var btn = opts.buttons[i];
				var t = $('<a href="javascript:void(0)"></a>').html($.isFunction(btn.text) ? btn.text(target) : btn.text).appendTo(td);
				t.bind('click', {target: target, handler: btn.handler}, function(e){
					e.data.handler.call(this, e.data.target);
				});
			}
			tr.find('td').css('width', (100/opts.buttons.length)+'%');
		}
		
		function setCalendar(){
			var panel = $(target).combo('panel');
			var cc = panel.children('div.datebox-calendar-inner');
			panel.children()._outerWidth(panel.width());
			state.calendar.appendTo(cc);
			state.calendar[0].target = target;
			if (opts.panelHeight != 'auto'){
				var height = panel.height();
				panel.children().not(cc).each(function(){
					height -= $(this).outerHeight();
				});
				cc._outerHeight(height);
			}
			state.calendar.calendar('resize');
		}
	}
	
	/**
	 * called when user inputs some value in text box
	 */
	function doQuery(target, q){
		setValue(target, q, true);
	}
	
	/**
	 * called when user press enter key
	 */
	function doEnter(target){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		var current = state.calendar.calendar('options').current;
		if (current){
			setValue(target, opts.formatter.call(target, current));
			$(target).combo('hidePanel');
		}
	}
	
	function setValue(target, value, remainText){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		var calendar = state.calendar;
		$(target).combo('setValue', value);
		calendar.calendar('moveTo', opts.parser.call(target, value));
		if (!remainText){
			if (value){
				value = opts.formatter.call(target, calendar.calendar('options').current);
				$(target).combo('setValue', value).combo('setText', value);
			} else {
				$(target).combo('setText', value);
			}
		}
	}
	
	$.fn.datebox = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.datebox.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'datebox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'datebox', {
					options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options)
				});
			}
			createBox(this);
		});
	};
	
	$.fn.datebox.methods = {
		options: function(jq){
			var copts = jq.combo('options');
			return $.extend($.data(jq[0], 'datebox').options, {
				originalValue: copts.originalValue,
				disabled: copts.disabled,
				readonly: copts.readonly
			});
		},
		calendar: function(jq){	// get the calendar object
			return $.data(jq[0], 'datebox').calendar;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		reset: function(jq){
			return jq.each(function(){
				var opts = $(this).datebox('options');
				$(this).datebox('setValue', opts.originalValue);
			});
		}
	};
	
	$.fn.datebox.parseOptions = function(target){
		return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, ['sharedCalendar']));
	};
	
	$.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
		panelWidth:180,
		panelHeight:'auto',
		sharedCalendar:null,
		
		keyHandler: {
			up:function(e){},
			down:function(e){},
			left: function(e){},
			right: function(e){},
			enter:function(e){doEnter(this)},
			query:function(q,e){doQuery(this, q)}
		},
		
		currentText:'今天',
		closeText:'关闭',
		okText:'确定',
		
		buttons:[{
			text: function(target){return $(target).datebox('options').currentText;},
			handler: function(target){
				$(target).datebox('calendar').calendar({
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					current:new Date()
				});
				doEnter(target);
			}
		},{
			text: function(target){return $(target).datebox('options').closeText;},
			handler: function(target){
				$(this).closest('div.combo-panel').panel('close');
			}
		}],
		
		formatter:function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
		},
		parser:function(s){
			if (!s) return new Date();
			var ss = s.split('-');
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		},
		
		onSelect:function(date){}
	});
})(jQuery);

});
define("jqui/1.3.6/calendar-debug", [], function(require, exports, module){
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
 * calendar - jQuery EasyUI
 * 
 */
require("jqui/1.3.6/parser-debug");
//require('./css/calendar.css');

(function($){
	
	function setSize(target){
		var opts = $.data(target, 'calendar').options;
		var t = $(target);
//		if (opts.fit == true){
//			var p = t.parent();
//			opts.width = p.width();
//			opts.height = p.height();
//		}
		opts.fit ? $.extend(opts, t._fit()) : t._fit(false);
		var header = t.find('.calendar-header');
		t._outerWidth(opts.width);
		t._outerHeight(opts.height);
		t.find('.calendar-body')._outerHeight(t.height() - header._outerHeight());
	}
	
	function init(target){
		$(target).addClass('calendar').html(
				'<div class="calendar-header">' +
					'<div class="calendar-prevmonth"></div>' +
					'<div class="calendar-nextmonth"></div>' +
					'<div class="calendar-prevyear"></div>' +
					'<div class="calendar-nextyear"></div>' +
					'<div class="calendar-title">' +
						'<span>Aprial 2010</span>' +
					'</div>' +
				'</div>' +
				'<div class="calendar-body">' +
					'<div class="calendar-menu">' +
						'<div class="calendar-menu-year-inner">' +
							'<span class="calendar-menu-prev"></span>' +
							'<span><input class="calendar-menu-year" type="text"></input></span>' +
							'<span class="calendar-menu-next"></span>' +
						'</div>' +
						'<div class="calendar-menu-month-inner">' +
						'</div>' +
					'</div>' +
				'</div>'
		);
		
		$(target).find('.calendar-title span').hover(
			function(){$(this).addClass('calendar-menu-hover');},
			function(){$(this).removeClass('calendar-menu-hover');}
		).click(function(){
			var menu = $(target).find('.calendar-menu');
			if (menu.is(':visible')){
				menu.hide();
			} else {
				showSelectMenus(target);
			}
		});
		
		$('.calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear', target).hover(
			function(){$(this).addClass('calendar-nav-hover');},
			function(){$(this).removeClass('calendar-nav-hover');}
		);
		$(target).find('.calendar-nextmonth').click(function(){
			showMonth(target, 1);
		});
		$(target).find('.calendar-prevmonth').click(function(){
			showMonth(target, -1);
		});
		$(target).find('.calendar-nextyear').click(function(){
			showYear(target, 1);
		});
		$(target).find('.calendar-prevyear').click(function(){
			showYear(target, -1);
		});
		
		$(target).bind('_resize', function(){
			var opts = $.data(target, 'calendar').options;
			if (opts.fit == true){
				setSize(target);
			}
			return false;
		});
	}
	
	/**
	 * show the calendar corresponding to the current month.
	 */
	function showMonth(target, delta){
		var opts = $.data(target, 'calendar').options;
		opts.month += delta;
		if (opts.month > 12){
			opts.year++;
			opts.month = 1;
		} else if (opts.month < 1){
			opts.year--;
			opts.month = 12;
		}
		show(target);
		
		var menu = $(target).find('.calendar-menu-month-inner');
		menu.find('td.calendar-selected').removeClass('calendar-selected');
		menu.find('td:eq(' + (opts.month-1) + ')').addClass('calendar-selected');
	}
	
	/**
	 * show the calendar corresponding to the current year.
	 */
	function showYear(target, delta){
		var opts = $.data(target, 'calendar').options;
		opts.year += delta;
		show(target);
		
		var menu = $(target).find('.calendar-menu-year');
		menu.val(opts.year);
	}
	
	/**
	 * show the select menu that can change year or month, if the menu is not be created then create it.
	 */
	function showSelectMenus(target){
		var opts = $.data(target, 'calendar').options;
		$(target).find('.calendar-menu').show();
		
		if ($(target).find('.calendar-menu-month-inner').is(':empty')){
			$(target).find('.calendar-menu-month-inner').empty();
			var t = $('<table class="calendar-mtable"></table>').appendTo($(target).find('.calendar-menu-month-inner'));
			var idx = 0;
			for(var i=0; i<3; i++){
				var tr = $('<tr></tr>').appendTo(t);
				for(var j=0; j<4; j++){
					$('<td class="calendar-menu-month"></td>').html(opts.months[idx++]).attr('abbr',idx).appendTo(tr);
				}
			}
			
			$(target).find('.calendar-menu-prev,.calendar-menu-next').hover(
					function(){$(this).addClass('calendar-menu-hover');},
					function(){$(this).removeClass('calendar-menu-hover');}
			);
			$(target).find('.calendar-menu-next').click(function(){
				var y = $(target).find('.calendar-menu-year');
				if (!isNaN(y.val())){
					y.val(parseInt(y.val()) + 1);
					setDate();
				}
			});
			$(target).find('.calendar-menu-prev').click(function(){
				var y = $(target).find('.calendar-menu-year');
				if (!isNaN(y.val())){
					y.val(parseInt(y.val() - 1));
					setDate();
				}
			});
			
			$(target).find('.calendar-menu-year').keypress(function(e){
				if (e.keyCode == 13){
					setDate(true);
				}
			});
			
			$(target).find('.calendar-menu-month').hover(
					function(){$(this).addClass('calendar-menu-hover');},
					function(){$(this).removeClass('calendar-menu-hover');}
			).click(function(){
				var menu = $(target).find('.calendar-menu');
				menu.find('.calendar-selected').removeClass('calendar-selected');
				$(this).addClass('calendar-selected');
				setDate(true);
			});
		}
		
		function setDate(hideMenu){
			var menu = $(target).find('.calendar-menu');
			var year = menu.find('.calendar-menu-year').val();
			var month = menu.find('.calendar-selected').attr('abbr');
			if (!isNaN(year)){
				opts.year = parseInt(year);
				opts.month = parseInt(month);
				show(target);
			}
			if (hideMenu){menu.hide()}
		}
		
		var body = $(target).find('.calendar-body');
		var sele = $(target).find('.calendar-menu');
		var seleYear = sele.find('.calendar-menu-year-inner');
		var seleMonth = sele.find('.calendar-menu-month-inner');
		
		seleYear.find('input').val(opts.year).focus();
		seleMonth.find('td.calendar-selected').removeClass('calendar-selected');
		seleMonth.find('td:eq('+(opts.month-1)+')').addClass('calendar-selected');
		
		sele._outerWidth(body._outerWidth());
		sele._outerHeight(body._outerHeight());
		seleMonth._outerHeight(sele.height() - seleYear._outerHeight());
	}
	
	/**
	 * get weeks data.
	 */
	function getWeeks(target, year, month){
		var opts = $.data(target, 'calendar').options;
		var dates = [];
		var lastDay = new Date(year, month, 0).getDate();
		for(var i=1; i<=lastDay; i++) dates.push([year,month,i]);
		
		// group date by week
		var weeks = [], week = [];
//		var memoDay = 0;
		var memoDay = -1;
		while(dates.length > 0){
			var date = dates.shift();
			week.push(date);
			var day = new Date(date[0],date[1]-1,date[2]).getDay();
			if (memoDay == day){
				day = 0;
			} else if (day == (opts.firstDay==0 ? 7 : opts.firstDay) - 1){
				weeks.push(week);
				week = [];
			}
			memoDay = day;
		}
		if (week.length){
			weeks.push(week);
		}
		
		var firstWeek = weeks[0];
		if (firstWeek.length < 7){
			while(firstWeek.length < 7){
				var firstDate = firstWeek[0];
				var date = new Date(firstDate[0],firstDate[1]-1,firstDate[2]-1)
				firstWeek.unshift([date.getFullYear(), date.getMonth()+1, date.getDate()]);
			}
		} else {
			var firstDate = firstWeek[0];
			var week = [];
			for(var i=1; i<=7; i++){
				var date = new Date(firstDate[0], firstDate[1]-1, firstDate[2]-i);
				week.unshift([date.getFullYear(), date.getMonth()+1, date.getDate()]);
			}
			weeks.unshift(week);
		}
		
		var lastWeek = weeks[weeks.length-1];
		while(lastWeek.length < 7){
			var lastDate = lastWeek[lastWeek.length-1];
			var date = new Date(lastDate[0], lastDate[1]-1, lastDate[2]+1);
			lastWeek.push([date.getFullYear(), date.getMonth()+1, date.getDate()]);
		}
		if (weeks.length < 6){
			var lastDate = lastWeek[lastWeek.length-1];
			var week = [];
			for(var i=1; i<=7; i++){
				var date = new Date(lastDate[0], lastDate[1]-1, lastDate[2]+i);
				week.push([date.getFullYear(), date.getMonth()+1, date.getDate()]);
			}
			weeks.push(week);
		}
		
		return weeks;
	}
	
	/**
	 * show the calendar day.
	 */
	function show(target){
		var opts = $.data(target, 'calendar').options;
		if (opts.current && !opts.validator.call(target, opts.current)){
			opts.current = null;
		}
		
		var now = new Date();
		var todayInfo = now.getFullYear()+','+(now.getMonth()+1)+','+now.getDate();
		var currentInfo = opts.current ? (opts.current.getFullYear()+','+(opts.current.getMonth()+1)+','+opts.current.getDate()) : '';
		// calulate the saturday and sunday index
		var saIndex = 6 - opts.firstDay;
		var suIndex = saIndex + 1;
		if (saIndex >= 7) saIndex -= 7;
		if (suIndex >= 7) suIndex -= 7;
		
		$(target).find('.calendar-title span').html(opts.months[opts.month-1] + ' ' + opts.year);
		
		var body = $(target).find('div.calendar-body');
		body.children('table').remove();
		
		var data = ['<table class="calendar-dtable" cellspacing="0" cellpadding="0" border="0">'];
		data.push('<thead><tr>');
		for(var i=opts.firstDay; i<opts.weeks.length; i++){
			data.push('<th>'+opts.weeks[i]+'</th>');
		}
		for(var i=0; i<opts.firstDay; i++){
			data.push('<th>'+opts.weeks[i]+'</th>');
		}
		data.push('</tr></thead>');
		
		data.push('<tbody>');
		var weeks = getWeeks(target, opts.year, opts.month);
		for(var i=0; i<weeks.length; i++){
			var week = weeks[i];
			var cls = '';
			if (i == 0){cls = 'calendar-first';}
			else if (i == weeks.length - 1){cls = 'calendar-last';}
			data.push('<tr class="' + cls + '">');
			for(var j=0; j<week.length; j++){
				var day = week[j];
				var s = day[0]+','+day[1]+','+day[2];
				var dvalue = new Date(day[0], parseInt(day[1])-1, day[2]);
				var d = opts.formatter.call(target, dvalue);
				var css = opts.styler.call(target, dvalue);
				var classValue = '';
				var styleValue = '';
				if (typeof css == 'string'){
					styleValue = css;
				} else if (css){
					classValue = css['class'] || '';
					styleValue = css['style'] || '';
				}
				
				var cls = 'calendar-day';
				if (!(opts.year == day[0] && opts.month == day[1])){
					cls += ' calendar-other-month';
				}
				if (s == todayInfo){cls += ' calendar-today';}
				if (s == currentInfo){cls += ' calendar-selected';}
				if (j == saIndex){cls += ' calendar-saturday';}
				else if (j == suIndex){cls += ' calendar-sunday';}
				if (j == 0){cls += ' calendar-first';}
				else if (j == week.length-1){cls += ' calendar-last';}
				
				cls += ' ' + classValue;
				if (!opts.validator.call(target, dvalue)){
					cls += ' calendar-disabled';
				}
				
				data.push('<td class="' + cls + '" abbr="' + s + '" style="' + styleValue + '">' + d + '</td>');
			}
			data.push('</tr>');
		}
		data.push('</tbody>');
		data.push('</table>');
		
		body.append(data.join(''));
		
		var t = body.children('table.calendar-dtable').prependTo(body);
		
		t.find('td.calendar-day:not(.calendar-disabled)').hover(
			function(){$(this).addClass('calendar-hover');},
			function(){$(this).removeClass('calendar-hover');}
		).click(function(){
			var oldValue = opts.current;
			t.find('.calendar-selected').removeClass('calendar-selected');
			$(this).addClass('calendar-selected');
			var parts = $(this).attr('abbr').split(',');
			opts.current = new Date(parts[0], parseInt(parts[1])-1, parts[2]);
			opts.onSelect.call(target, opts.current);
			if (!oldValue || oldValue.getTime() != opts.current.getTime()){
				opts.onChange.call(target, opts.current, oldValue);
			}
		});
	}
	
	$.fn.calendar = function(options, param){
		if (typeof options == 'string'){
			return $.fn.calendar.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'calendar');
			if (state){
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'calendar', {
					options:$.extend({}, $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), options)
				});
				init(this);
			}
			if (state.options.border == false){
				$(this).addClass('calendar-noborder');
			}
			setSize(this);
			show(this);
			$(this).find('div.calendar-menu').hide();	// hide the calendar menu
		});
	};
	
	$.fn.calendar.methods = {
		options: function(jq){
			return $.data(jq[0], 'calendar').options;
		},
		resize: function(jq){
			return jq.each(function(){
				setSize(this);
			});
		},
		moveTo: function(jq, date){
			return jq.each(function(){
				var opts = $(this).calendar('options');
				if (opts.validator.call(this, date)){
					var oldValue = opts.current;
					$(this).calendar({
						year: date.getFullYear(),
						month: date.getMonth()+1,
						current: date
					});
					if (!oldValue || oldValue.getTime() != date.getTime()){
						opts.onChange.call(this, opts.current, oldValue);
					}
				}
			});
		}
	};
	
	$.fn.calendar.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [
			'width','height',{firstDay:'number',fit:'boolean',border:'boolean'}
		]));
	};
	
	$.fn.calendar.defaults = {
		width:180,
		height:180,
		fit:false,
		border:true,
		firstDay:0,
		weeks:['日','一','二','三','四','五','六'],
		months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		year:new Date().getFullYear(),
		month:new Date().getMonth()+1,
		current:(function(){
			var d = new Date();
			return new Date(d.getFullYear(), d.getMonth(), d.getDate());
		})(),
		
		formatter:function(date){return date.getDate()},
		styler:function(date){return ''},
		validator:function(date){return true},
		
		onSelect: function(date){},
		onChange: function(newDate, oldDate){}
	};
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
define("jqui/1.3.6/timespinner-debug", [], function(require, exports, module){
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
require("jqui/1.3.6/spinner-debug");

(function($){
function _1(_2){
var _3=$.data(_2,"timespinner").options;
$(_2).addClass("timespinner-f");
$(_2).spinner(_3);
$(_2).unbind(".timespinner");
$(_2).bind("click.timespinner",function(){
var _4=0;
if(this.selectionStart!=null){
_4=this.selectionStart;
}else{
if(this.createTextRange){
var _5=_2.createTextRange();
var s=document.selection.createRange();
s.setEndPoint("StartToStart",_5);
_4=s.text.length;
}
}
if(_4>=0&&_4<=2){
_3.highlight=0;
}else{
if(_4>=3&&_4<=5){
_3.highlight=1;
}else{
if(_4>=6&&_4<=8){
_3.highlight=2;
}
}
}
_7(_2);
}).bind("blur.timespinner",function(){
_6(_2);
});
};
function _7(_8){
var _9=$.data(_8,"timespinner").options;
var _a=0,_b=0;
if(_9.highlight==0){
_a=0;
_b=2;
}else{
if(_9.highlight==1){
_a=3;
_b=5;
}else{
if(_9.highlight==2){
_a=6;
_b=8;
}
}
}
if(_8.selectionStart!=null){
_8.setSelectionRange(_a,_b);
}else{
if(_8.createTextRange){
var _c=_8.createTextRange();
_c.collapse();
_c.moveEnd("character",_b);
_c.moveStart("character",_a);
_c.select();
}
}
$(_8).focus();
};
function _d(_e,_f){
var _10=$.data(_e,"timespinner").options;
if(!_f){
return null;
}
var vv=_f.split(_10.separator);
for(var i=0;i<vv.length;i++){
if(isNaN(vv[i])){
return null;
}
}
while(vv.length<3){
vv.push(0);
}
return new Date(1900,0,0,vv[0],vv[1],vv[2]);
};
function _6(_11){
var _12=$.data(_11,"timespinner").options;
var _13=$(_11).val();
var _14=_d(_11,_13);
if(!_14){
_12.value="";
$(_11).spinner("setValue","");
return;
}
var _15=_d(_11,_12.min);
var _16=_d(_11,_12.max);
if(_15&&_15>_14){
_14=_15;
}
if(_16&&_16<_14){
_14=_16;
}
var tt=[_17(_14.getHours()),_17(_14.getMinutes())];
if(_12.showSeconds){
tt.push(_17(_14.getSeconds()));
}
var val=tt.join(_12.separator);
_12.value=val;
$(_11).spinner("setValue",val);
function _17(_18){
return (_18<10?"0":"")+_18;
};
};
function _19(_1a,_1b){
var _1c=$.data(_1a,"timespinner").options;
var val=$(_1a).val();
if(val==""){
val=[0,0,0].join(_1c.separator);
}
var vv=val.split(_1c.separator);
for(var i=0;i<vv.length;i++){
vv[i]=parseInt(vv[i],10);
}
if(_1b==true){
vv[_1c.highlight]-=_1c.increment;
}else{
vv[_1c.highlight]+=_1c.increment;
}
$(_1a).val(vv.join(_1c.separator));
_6(_1a);
_7(_1a);
};
$.fn.timespinner=function(_1d,_1e){
if(typeof _1d=="string"){
var _1f=$.fn.timespinner.methods[_1d];
if(_1f){
return _1f(this,_1e);
}else{
return this.spinner(_1d,_1e);
}
}
_1d=_1d||{};
return this.each(function(){
var _20=$.data(this,"timespinner");
if(_20){
$.extend(_20.options,_1d);
}else{
$.data(this,"timespinner",{options:$.extend({},$.fn.timespinner.defaults,$.fn.timespinner.parseOptions(this),_1d)});
}
_1(this);
});
};
$.fn.timespinner.methods={options:function(jq){
var _21=$.data(jq[0],"timespinner").options;
return $.extend(_21,{value:jq.val(),originalValue:jq.spinner("options").originalValue});
},setValue:function(jq,_22){
return jq.each(function(){
$(this).val(_22);
_6(this);
});
},getHours:function(jq){
var _23=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_23.separator);
return parseInt(vv[0],10);
},getMinutes:function(jq){
var _24=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_24.separator);
return parseInt(vv[1],10);
},getSeconds:function(jq){
var _25=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_25.separator);
return parseInt(vv[2],10)||0;
}};
$.fn.timespinner.parseOptions=function(_26){
return $.extend({},$.fn.spinner.parseOptions(_26),$.parser.parseOptions(_26,["separator",{showSeconds:"boolean",highlight:"number"}]));
};
$.fn.timespinner.defaults=$.extend({},$.fn.spinner.defaults,{separator:":",showSeconds:false,highlight:0,spin:function(_27){
_19(this,_27);
}});
})(jQuery);


});
define("jqui/1.3.6/spinner-debug", [], function(require, exports, module){
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
//require('./css/spinner.css');

(function($) {
    function _1(_2) {
        var _3 = $("<span class=\"spinner\">" + "<span class=\"spinner-arrow\">" + "<span class=\"spinner-arrow-up\"></span>" + "<span class=\"spinner-arrow-down\"></span>" + "</span>" + "</span>").insertAfter(_2);
        $(_2).addClass("spinner-text spinner-f").prependTo(_3);
        return _3;
    };

    function _4(_5, _6) {
        var _7 = $.data(_5, "spinner").options;
        var _8 = $.data(_5, "spinner").spinner;
        if (_6) {
            _7.width = _6;
        }
        var _9 = $("<div style=\"display:none\"></div>").insertBefore(_8);
        _8.appendTo("body");
        if (isNaN(_7.width)) {
            _7.width = $(_5).outerWidth();
        }
        var _a = _8.find(".spinner-arrow");
        _8._outerWidth(_7.width)._outerHeight(_7.height);
        $(_5)._outerWidth(_8.width() - _a.outerWidth());
        $(_5).css({
            height: _8.height() + "px",
            lineHeight: _8.height() + "px"
        });
        _a._outerHeight(_8.height());
        _a.find("span")._outerHeight(_a.height() / 2);
        _8.insertAfter(_9);
        _9.remove();
    };

    function _b(_c) {
        var _d = $.data(_c, "spinner").options;
        var _e = $.data(_c, "spinner").spinner;
        $(_c).unbind(".spinner");
        _e.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        if (!_d.disabled && !_d.readonly) {
            _e.find(".spinner-arrow-up").bind("mouseenter.spinner", function() {
                $(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                $(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                _d.spin.call(_c, false);
                _d.onSpinUp.call(_c);
            });
            _e.find(".spinner-arrow-down").bind("mouseenter.spinner", function() {
                $(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                $(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                _d.spin.call(_c, true);
                _d.onSpinDown.call(_c);
            });
            $(_c).bind("change.spinner", function() {
                $(this).spinner("setValue", $(this).val());
            });
        }
    };

    function _f(_10, _11) {
        var _12 = $.data(_10, "spinner").options;
        if (_11) {
            _12.disabled = true;
            $(_10).attr("disabled", true);
        } else {
            _12.disabled = false;
            $(_10).removeAttr("disabled");
        }
    };

    function _13(_14, _15) {
        var _16 = $.data(_14, "spinner");
        var _17 = _16.options;
        _17.readonly = _15 == undefined ? true : _15;
        var _18 = _17.readonly ? true : (!_17.editable);
        $(_14).attr("readonly", _18).css("cursor", _18 ? "pointer" : "");
    };
    $.fn.spinner = function(_19, _1a) {
        if (typeof _19 == "string") {
            return $.fn.spinner.methods[_19](this,_1a);
        }
        _19 = _19 || {};
        return this.each(function() {
            var _1c = $.data(this, "spinner");
            if (_1c) {
                $.extend(_1c.options, _19);
            } else {
                _1c = $.data(this, "spinner", {
                    options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _19),
                    spinner: _1(this)
                });
                $(this).removeAttr("disabled");
            }
            _1c.options.originalValue = _1c.options.value;
            $(this).val(_1c.options.value);
            _f(this, _1c.options.disabled);
            _13(this, _1c.options.readonly);
            _4(this);
            _b(this);
        });
    };
    $.fn.spinner.methods = {
        options: function(jq) {
            var _1d = $.data(jq[0], "spinner").options;
            return $.extend(_1d, {
                value: jq.val()
            });
        },
        destroy: function(jq) {
            return jq.each(function() {
                var _1e = $.data(this, "spinner").spinner;
                _1e.remove();
            });
        },
        resize: function(jq, _1f) {
            return jq.each(function() {
                _4(this, _1f);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                _f(this, false);
                _b(this);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                _f(this, true);
                _b(this);
            });
        },
        readonly: function(jq, _20) {
            return jq.each(function() {
                _13(this, _20);
                _b(this);
            });
        },
        getValue: function(jq) {
            return jq.val();
        },
        setValue: function(jq, _21) {
            return jq.each(function() {
                var _22 = $.data(this, "spinner").options;
                var _23 = _22.value;
                _22.value = _21;
                $(this).val(_21);
                if (_23 != _21) {
                    _22.onChange.call(this, _21, _23);
                }
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                var _24 = $.data(this, "spinner").options;
                _24.value = "";
                $(this).val("");
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var _25 = $(this).spinner("options");
                $(this).spinner("setValue", _25.originalValue);
            });
        }
    };
    $.fn.spinner.parseOptions = function(_26) {
        var t = $(_26);
        return $.extend({}, $.parser.parseOptions(_26, ["width", "height", "min", "max", {
            increment: "number",
            editable: "boolean"
        }]), {
            value: (t.val() || undefined),
            disabled: (t.attr("disabled") ? true : undefined),
            readonly: (t.attr("readonly") ? true : undefined)
        });
    };
    $.fn.spinner.defaults = $.extend({}, {
        width: "auto",
        height: 28,
        deltaX: 19,
        value: "",
        min: null,
        max: null,
        increment: 1,
        editable: true,
        disabled: false,
        readonly: false,
        spin: function(_27) {},
        onSpinUp: function() {},
        onSpinDown: function() {},
        onChange: function(_28, _29) {}
    });
})(jQuery);

});
