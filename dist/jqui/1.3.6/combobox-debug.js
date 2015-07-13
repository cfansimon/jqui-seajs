define("jqui/1.3.6/combobox-debug", [], function(require, exports, module){
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
//require('./css/combobox.css');
require("jqui/1.3.6/combo-debug");

(function($){
	var COMBOBOX_SERNO = 0;
	
	function getRowIndex(target, value){
		var state = $.data(target, 'combobox');
		var opts = state.options;
		var data = state.data;
		for(var i=0; i<data.length; i++){
			if (data[i][opts.valueField] == value){
				return i;
			}
		}
		return -1;
	}
	
	/**
	 * scroll panel to display the specified item
	 */
	function scrollTo(target, value){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combo('panel');
		var item = opts.finder.getEl(target, value);
		if (item.length){
			if (item.position().top <= 0){
				var h = panel.scrollTop() + item.position().top;
				panel.scrollTop(h);
			} else if (item.position().top + item.outerHeight() > panel.height()){
				var h = panel.scrollTop() + item.position().top + item.outerHeight() - panel.height();
				panel.scrollTop(h);
			}
		}
	}
	
	function nav(target, dir){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combobox('panel');
		var item = panel.children('div.combobox-item-hover');
		if (!item.length){
			item = panel.children('div.combobox-item-selected');
		}
		item.removeClass('combobox-item-hover');
		var firstSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):first';
		var lastSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):last';
		if (!item.length){
			item = panel.children(dir=='next' ? firstSelector : lastSelector);
//			item = panel.children('div.combobox-item:visible:' + (dir=='next'?'first':'last'));
		} else {
			if (dir == 'next'){
				item = item.nextAll(firstSelector);
//				item = item.nextAll('div.combobox-item:visible:first');
				if (!item.length){
					item = panel.children(firstSelector);
//					item = panel.children('div.combobox-item:visible:first');
				}
			} else {
				item = item.prevAll(firstSelector);
//				item = item.prevAll('div.combobox-item:visible:first');
				if (!item.length){
					item = panel.children(lastSelector);
//					item = panel.children('div.combobox-item:visible:last');
				}
			}
		}
		if (item.length){
			item.addClass('combobox-item-hover');
			var row = opts.finder.getRow(target, item);
			if (row){
				scrollTo(target, row[opts.valueField]);
				if (opts.selectOnNavigation){
					select(target, row[opts.valueField]);
				}
			}
		}
	}
	
	/**
	 * select the specified value
	 */
	function select(target, value){
		var opts = $.data(target, 'combobox').options;
		var values = $(target).combo('getValues');
		if ($.inArray(value+'', values) == -1){
			if (opts.multiple){
				values.push(value);
			} else {
				values = [value];
			}
			setValues(target, values);
			opts.onSelect.call(target, opts.finder.getRow(target, value));
		}
	}
	
	/**
	 * unselect the specified value
	 */
	function unselect(target, value){
		var opts = $.data(target, 'combobox').options;
		var values = $(target).combo('getValues');
		var index = $.inArray(value+'', values);
		if (index >= 0){
			values.splice(index, 1);
			setValues(target, values);
			opts.onUnselect.call(target, opts.finder.getRow(target, value));
		}
	}
	
	/**
	 * set values
	 */
	function setValues(target, values, remainText){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combo('panel');
		
		panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
		var vv = [], ss = [];
		for(var i=0; i<values.length; i++){
			var v = values[i];
			var s = v;
			opts.finder.getEl(target, v).addClass('combobox-item-selected');
			var row = opts.finder.getRow(target, v);
			if (row){
				s = row[opts.textField];
			}
			vv.push(v);
			ss.push(s);
		}
		
		$(target).combo('setValues', vv);
		if (!remainText){
			$(target).combo('setText', ss.join(opts.separator));
		}
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	function loadData(target, data, remainText){
		var state = $.data(target, 'combobox');
		var opts = state.options;
		state.data = opts.loadFilter.call(target, data);
		state.groups = [];
		data = state.data;
		
		var selected = $(target).combobox('getValues');
		var dd = [];
		var group = undefined;
		for(var i=0; i<data.length; i++){
			var row = data[i];
			var v = row[opts.valueField]+'';
			var s = row[opts.textField];
			var g = row[opts.groupField];
			
			if (g){
				if (group != g){
					group = g;
					state.groups.push(g);
					dd.push('<div id="' + (state.groupIdPrefix+'_'+(state.groups.length-1)) + '" class="combobox-group">');
					dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
					dd.push('</div>');
				}
			} else {
				group = undefined;
			}
			
			var cls = 'combobox-item' + (row.disabled ? ' combobox-item-disabled' : '') + (g ? ' combobox-gitem' : '');
			dd.push('<div id="' + (state.itemIdPrefix+'_'+i) + '" class="' + cls + '">');
			dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
			dd.push('</div>');
			
//			if (item['selected']){
//				(function(){
//					for(var i=0; i<selected.length; i++){
//						if (v == selected[i]) return;
//					}
//					selected.push(v);
//				})();
//			}
			if (row['selected'] && $.inArray(v, selected) == -1){
				selected.push(v);
			}
		}
		$(target).combo('panel').html(dd.join(''));
		
		if (opts.multiple){
			setValues(target, selected, remainText);
		} else {
			setValues(target, selected.length ? [selected[selected.length-1]] : [], remainText);
		}
		
		opts.onLoadSuccess.call(target, data);
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url, param, remainText){
		var opts = $.data(target, 'combobox').options;
		if (url){
			opts.url = url;
		}
//		if (!opts.url) return;
		param = param || {};
		
		if (opts.onBeforeLoad.call(target, param) == false) return;

		opts.loader.call(target, param, function(data){
			loadData(target, data, remainText);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	/**
	 * do the query action
	 */
	function doQuery(target, q){
		var state = $.data(target, 'combobox');
		var opts = state.options;
		
		if (opts.multiple && !q){
			setValues(target, [], true);
		} else {
			setValues(target, [q], true);
		}
		
		if (opts.mode == 'remote'){
			request(target, null, {q:q}, true);
		} else {
			var panel = $(target).combo('panel');
			panel.find('div.combobox-item-selected,div.combobox-item-hover').removeClass('combobox-item-selected combobox-item-hover');
			panel.find('div.combobox-item,div.combobox-group').hide();
			var data = state.data;
			var vv = [];
			var qq = opts.multiple ? q.split(opts.separator) : [q];
			$.map(qq, function(q){
				q = $.trim(q);
				var group = undefined;
				for(var i=0; i<data.length; i++){
					var row = data[i];
					if (opts.filter.call(target, q, row)){
						var v = row[opts.valueField];
						var s = row[opts.textField];
						var g = row[opts.groupField];
						var item = opts.finder.getEl(target, v).show();
						if (s.toLowerCase() == q.toLowerCase()){
							vv.push(v);
							item.addClass('combobox-item-selected');
						}
						if (opts.groupField && group != g){
							$('#'+state.groupIdPrefix+'_'+$.inArray(g, state.groups)).show();
							group = g;
						}
					}
				}
			});
			setValues(target, vv, true);
		}
	}
	
	function doEnter(target){
		var t = $(target);
		var opts = t.combobox('options');
		var panel = t.combobox('panel');
		var item = panel.children('div.combobox-item-hover');
		if (item.length){
			var row = opts.finder.getRow(target, item);
			var value = row[opts.valueField];
			if (opts.multiple){
				if (item.hasClass('combobox-item-selected')){
					t.combobox('unselect', value);
				} else {
					t.combobox('select', value);
				}
			} else {
				t.combobox('select', value);
			}
		}
		var vv = [];
		$.map(t.combobox('getValues'), function(v){
			if (getRowIndex(target, v) >= 0){
				vv.push(v);
			}
		});
		t.combobox('setValues', vv);
		if (!opts.multiple){
			t.combobox('hidePanel');
		}
	}
	
	/**
	 * create the component
	 */
	function create(target){
		var state = $.data(target, 'combobox');
		var opts = state.options;
		
		COMBOBOX_SERNO++;
		state.itemIdPrefix = '_jqui_combobox_i' + COMBOBOX_SERNO;
		state.groupIdPrefix = '_jqui_combobox_g' + COMBOBOX_SERNO;
		
		$(target).addClass('combobox-f');
		$(target).combo($.extend({}, opts, {
			onShowPanel: function(){
				$(target).combo('panel').find('div.combobox-item,div.combobox-group').show();
				scrollTo(target, $(target).combobox('getValue'));
				opts.onShowPanel.call(target);
			}
		}));
		
		$(target).combo('panel').unbind().bind('mouseover', function(e){
			$(this).children('div.combobox-item-hover').removeClass('combobox-item-hover');
			var item = $(e.target).closest('div.combobox-item');
			if (!item.hasClass('combobox-item-disabled')){
				item.addClass('combobox-item-hover');
			}
			e.stopPropagation();
		}).bind('mouseout', function(e){
			$(e.target).closest('div.combobox-item').removeClass('combobox-item-hover');
			e.stopPropagation();
		}).bind('click', function(e){
			var item = $(e.target).closest('div.combobox-item');
			if (!item.length || item.hasClass('combobox-item-disabled')){return}
			var row = opts.finder.getRow(target, item);
			if (!row){return}
			var value = row[opts.valueField];
			if (opts.multiple){
				if (item.hasClass('combobox-item-selected')){
					unselect(target, value);
				} else {
					select(target, value);
				}
			} else {
				select(target, value);
				$(target).combo('hidePanel');
			}
			e.stopPropagation();
		});
	}
	
	$.fn.combobox = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.combobox.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'combobox');
			if (state){
				$.extend(state.options, options);
				create(this);
			} else {
				state = $.data(this, 'combobox', {
					options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options),
					data: []
				});
				create(this);
				var data = $.fn.combobox.parseData(this);
				if (data.length){
					loadData(this, data);
				}
			}
			if (state.options.data){
				loadData(this, state.options.data);
			}
			request(this);
		});
	};
	
	
	$.fn.combobox.methods = {
		options: function(jq){
			var opts = jq.combo('options');
			return $.extend($.data(jq[0], 'combobox').options, {
				originalValue: opts.originalValue,
				disabled: opts.disabled,
				readonly: opts.readonly
			});
		},
		getData: function(jq){
			return $.data(jq[0], 'combobox').data;
		},
		setValues: function(jq, values){
			return jq.each(function(){
				setValues(this, values);
			});
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValues(this, [value]);
			});
		},
		clear: function(jq){
			return jq.each(function(){
				$(this).combo('clear');
				var panel = $(this).combo('panel');
				panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
			});
		},
		reset: function(jq){
			return jq.each(function(){
				var opts = $(this).combobox('options');
				if (opts.multiple){
					$(this).combobox('setValues', opts.originalValue);
				} else {
					$(this).combobox('setValue', opts.originalValue);
				}
			});
		},
		loadData: function(jq, data){
			return jq.each(function(){
				loadData(this, data);
			});
		},
		reload: function(jq, url){
			return jq.each(function(){
				request(this, url);
			});
		},
		select: function(jq, value){
			return jq.each(function(){
				select(this, value);
			});
		},
		unselect: function(jq, value){
			return jq.each(function(){
				unselect(this, value);
			});
		}
	};
	
	$.fn.combobox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target,[
			'valueField','textField','groupField','mode','method','url'
		]));
	};
	
	$.fn.combobox.parseData = function(target){
		var data = [];
		var opts = $(target).combobox('options');
		$(target).children().each(function(){
			if (this.tagName.toLowerCase() == 'optgroup'){
				var group = $(this).attr('label');
				$(this).children().each(function(){
					_parseItem(this, group);
				});
			} else {
				_parseItem(this);
			}
		});
		return data;
		
		function _parseItem(el, group){
			var t = $(el);
			var row = {};
			row[opts.valueField] = t.attr('value')!=undefined ? t.attr('value') : t.text();
			row[opts.textField] = t.text();
			row['selected'] = t.is(':selected');
			row['disabled'] = t.is(':disabled');
			if (group){
				opts.groupField = opts.groupField || 'group';
				row[opts.groupField] = group;
			}
			data.push(row);
		}
	};
	
	$.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
		valueField: 'value',
		textField: 'text',
		groupField: null,
		groupFormatter: function(group){return group;},
		mode: 'local',	// or 'remote'
		method: 'post',
		url: null,
		data: null,
		
		keyHandler: {
			up: function(e){nav(this,'prev');e.preventDefault()},
			down: function(e){nav(this,'next');e.preventDefault()},
			left: function(e){},
			right: function(e){},
			enter: function(e){doEnter(this)},
			query: function(q,e){doQuery(this, q)}
		},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
		},
		formatter: function(row){
			var opts = $(this).combobox('options');
			return row[opts.textField];
		},
		loader: function(param, success, error){
			var opts = $(this).combobox('options');
			if (!opts.url) return false;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: 'json',
				success: function(data){
					success(data);
				},
				error: function(){
					error.apply(this, arguments);
				}
			});
		},
		loadFilter: function(data){
			return data;
		},
		finder:{
			getEl:function(target, value){
				var index = getRowIndex(target, value);
				var id = $.data(target, 'combobox').itemIdPrefix + '_' + index;
				return $('#'+id);
			},
			getRow:function(target, p){
				var state = $.data(target, 'combobox');
				var index = (p instanceof jQuery) ? p.attr('id').substr(state.itemIdPrefix.length+1) : getRowIndex(target, p);
				return state.data[parseInt(index)];
			}
		},
		
		onBeforeLoad: function(param){},
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onUnselect: function(record){}
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
