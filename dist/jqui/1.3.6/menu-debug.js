define("jqui/1.3.6/menu-debug", ["import-style/1.0.0/index-debug"], function(require, exports, module){
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
 * menu - jQuery EasyUI
 * 
 */
require("jqui/1.3.6/parser-debug");
require("jqui/1.3.6/menu-debug.css.js");

(function($){
	
	/**
	 * initialize the target menu, the function can be invoked only once
	 */
	function init(target){
		$(target).appendTo('body');
		$(target).addClass('menu-top');	// the top menu
		
		$(document).unbind('.menu').bind('mousedown.menu', function(e){
//			var allMenu = $('body>div.menu:visible');
//			var m = $(e.target).closest('div.menu', allMenu);
			var m = $(e.target).closest('div.menu,div.combo-p');
			if (m.length){return}
			$('body>div.menu-top:visible').menu('hide');
		});
		
		var menus = splitMenu($(target));
		for(var i=0; i<menus.length; i++){
			createMenu(menus[i]);
		}
		
		function splitMenu(menu){
			var menus = [];
			menu.addClass('menu');
			menus.push(menu);
			if (!menu.hasClass('menu-content')){
				menu.children('div').each(function(){
					var submenu = $(this).children('div');
					if (submenu.length){
						submenu.insertAfter(target);
						this.submenu = submenu;		// point to the sub menu
						var mm = splitMenu(submenu);
						menus = menus.concat(mm);
					}
				});
			}
			return menus;
		}
		
		function createMenu(menu){
			var wh = $.parser.parseOptions(menu[0], ['width','height']);
			menu[0].originalHeight = wh.height || 0;
			if (menu.hasClass('menu-content')){
				menu[0].originalWidth = wh.width || menu._outerWidth();
			} else {
				menu[0].originalWidth = wh.width || 0;
				menu.children('div').each(function(){
					var item = $(this);
					var itemOpts = $.extend({}, $.parser.parseOptions(this,['name','iconCls','href',{separator:'boolean'}]), {
						disabled: (item.attr('disabled') ? true : undefined)
					});
					if (itemOpts.separator){
						item.addClass('menu-sep');
					}
					if (!item.hasClass('menu-sep')){
						item[0].itemName = itemOpts.name || '';
						item[0].itemHref = itemOpts.href || '';
						
						var text = item.addClass('menu-item').html();
						item.empty().append($('<div class="menu-text"></div>').html(text));
						if (itemOpts.iconCls){
							$('<div class="menu-icon"></div>').addClass(itemOpts.iconCls).appendTo(item);
						}
						if (itemOpts.disabled){
							setDisabled(target, item[0], true);
						}
						if (item[0].submenu){
							$('<div class="menu-rightarrow"></div>').appendTo(item);	// has sub menu
						}
						
						bindMenuItemEvent(target, item);
					}
				});
				$('<div class="menu-line"></div>').prependTo(menu);
			}
			setMenuWidth(target, menu);
			menu.hide();
			
			bindMenuEvent(target, menu);
		}
	}
	
	function setMenuWidth(target, menu){
		var opts = $.data(target, 'menu').options;
		var style = menu.attr('style') || '';
		menu.css({
			display: 'block',
			left:-10000,
			height: 'auto',
			overflow: 'hidden'
		});
		
		var el = menu[0];
		var width = el.originalWidth || 0;
		if (!width){
			width = 0;
			menu.find('div.menu-text').each(function(){
				if (width < $(this)._outerWidth()){
					width = $(this)._outerWidth();
				}
				$(this).closest('div.menu-item')._outerHeight($(this)._outerHeight()+2);
			});
			width += 40;
		}
		
		width = Math.max(width, opts.minWidth);
		var height = el.originalHeight || menu.outerHeight();
		var lineHeight = Math.max(el.originalHeight, menu.outerHeight()) - 2;
		menu._outerWidth(width)._outerHeight(height);
		menu.children('div.menu-line')._outerHeight(lineHeight);
		
//		menu._outerWidth(Math.max((menu[0].originalWidth || 0), width, opts.minWidth));
//		
//		menu.children('div.menu-line')._outerHeight(menu.outerHeight());
		
		style += ';width:' + el.style.width + ';height:' + el.style.height;
		
		menu.attr('style', style);
	}
	
	/**
	 * bind menu event
	 */
	function bindMenuEvent(target, menu){
		var state = $.data(target, 'menu');
		menu.unbind('.menu').bind('mouseenter.menu', function(){
			if (state.timer){
				clearTimeout(state.timer);
				state.timer = null;
			}
		}).bind('mouseleave.menu', function(){
			if (state.options.hideOnUnhover){
				state.timer = setTimeout(function(){
					hideAll(target);
				}, 100);
			}
		});
	}
	
	/**
	 * bind menu item event
	 */
	function bindMenuItemEvent(target, item){
		if (!item.hasClass('menu-item')){return}
		item.unbind('.menu');
		item.bind('click.menu', function(){
			if ($(this).hasClass('menu-item-disabled')){
				return;
			}
			// only the sub menu clicked can hide all menus
			if (!this.submenu){
				hideAll(target);
				var href = $(this).attr('href');
				if (href){
					location.href = href;
				}
			}
			var item = $(target).menu('getItem', this);
			$.data(target, 'menu').options.onClick.call(target, item);
		}).bind('mouseenter.menu', function(e){
			// hide other menu
			item.siblings().each(function(){
				if (this.submenu){
					hideMenu(this.submenu);
				}
				$(this).removeClass('menu-active');
			});
			// show this menu
			item.addClass('menu-active');
			
			if ($(this).hasClass('menu-item-disabled')){
				item.addClass('menu-active-disabled');
				return;
			}
			
			var submenu = item[0].submenu;
			if (submenu){
				$(target).menu('show', {
					menu: submenu,
					parent: item
				});
			}
		}).bind('mouseleave.menu', function(e){
			item.removeClass('menu-active menu-active-disabled');
			var submenu = item[0].submenu;
			if (submenu){
				if (e.pageX>=parseInt(submenu.css('left'))){
					item.addClass('menu-active');
				} else {
					hideMenu(submenu);
				}
				
			} else {
				item.removeClass('menu-active');
			}
		});
	}
	
	/**
	 * hide top menu and it's all sub menus
	 */
	function hideAll(target){
		var state = $.data(target, 'menu');
		if (state){
			if ($(target).is(':visible')){
				hideMenu($(target));
				state.options.onHide.call(target);
			}
		}
		return false;
	}
	
	/**
	 * show the menu, the 'param' object has one or more properties:
	 * left: the left position to display
	 * top: the top position to display
	 * menu: the menu to display, if not defined, the 'target menu' is used
	 * parent: the parent menu item to align to
	 * alignTo: the element object to align to
	 */
	function showMenu(target, param){
		var left,top;
		param = param || {};
		var menu = $(param.menu || target);
		if (menu.hasClass('menu-top')){
			var opts = $.data(target, 'menu').options;
			$.extend(opts, param);
			left = opts.left;
			top = opts.top;
			if (opts.alignTo){
				var at = $(opts.alignTo);
				left = at.offset().left;
				top = at.offset().top + at._outerHeight();
				if (opts.align == 'right'){
					left += at.outerWidth() - menu.outerWidth();
				}
			}
			if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()){
				left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
			}
			if (left < 0){left = 0;}
			if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()){
				top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
			}
		} else {
			var parent = param.parent;	// the parent menu item
			left = parent.offset().left + parent.outerWidth() - 2;
			if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()){
				left = parent.offset().left - menu.outerWidth() + 2;
			}
			var top = parent.offset().top - 3;
			if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()){
				top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
			}
		}
		menu.css({left:left,top:top});
		menu.show(0, function(){
			if (!menu[0].shadow){
				menu[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(menu);
			}
			menu[0].shadow.css({
				display:'block',
				zIndex:$.fn.menu.defaults.zIndex++,
				left:menu.css('left'),
				top:menu.css('top'),
				width:menu.outerWidth(),
				height:menu.outerHeight()
			});
			menu.css('z-index', $.fn.menu.defaults.zIndex++);
			if (menu.hasClass('menu-top')){
				$.data(menu[0], 'menu').options.onShow.call(menu[0]);
			}
		});
	}
	
	function hideMenu(menu){
		if (!menu) return;
		
		hideit(menu);
		menu.find('div.menu-item').each(function(){
			if (this.submenu){
				hideMenu(this.submenu);
			}
			$(this).removeClass('menu-active');
		});
		
		function hideit(m){
			m.stop(true,true);
			if (m[0].shadow){
				m[0].shadow.hide();
			}
			m.hide();
		}
	}
	
	function findItem(target, text){
		var result = null;
		var tmp = $('<div></div>');
		function find(menu){
			menu.children('div.menu-item').each(function(){
				var item = $(target).menu('getItem', this);
				var s = tmp.empty().html(item.text).text();
				if (text == $.trim(s)) {
					result = item;
				} else if (this.submenu && !result){
					find(this.submenu);
				}
			});
		}
		find($(target));
		tmp.remove();
		return result;
	}
	
	function setDisabled(target, itemEl, disabled){
		var t = $(itemEl);
		if (!t.hasClass('menu-item')){return}
		
		if (disabled){
			t.addClass('menu-item-disabled');
			if (itemEl.onclick){
				itemEl.onclick1 = itemEl.onclick;
				itemEl.onclick = null;
			}
		} else {
			t.removeClass('menu-item-disabled');
			if (itemEl.onclick1){
				itemEl.onclick = itemEl.onclick1;
				itemEl.onclick1 = null;
			}
		}
	}
	
	function appendItem(target, param){
		var menu = $(target);
		if (param.parent){
			if (!param.parent.submenu){
				var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo('body');
				submenu.hide();
				param.parent.submenu = submenu;
				$('<div class="menu-rightarrow"></div>').appendTo(param.parent);
			}
			menu = param.parent.submenu;
		}
		if (param.separator){
			var item = $('<div class="menu-sep"></div>').appendTo(menu);
		} else {
			var item = $('<div class="menu-item"></div>').appendTo(menu);
			$('<div class="menu-text"></div>').html(param.text).appendTo(item);
		}
		if (param.iconCls) $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item);
		if (param.id) item.attr('id', param.id);
		if (param.name){item[0].itemName = param.name}
		if (param.href){item[0].itemHref = param.href}
		if (param.onclick){
			if (typeof param.onclick == 'string'){
				item.attr('onclick', param.onclick);
			} else {
				item[0].onclick = eval(param.onclick);
			}
		}
		if (param.handler){item[0].onclick = eval(param.handler)}
		if (param.disabled){setDisabled(target, item[0], true)}
		
		bindMenuItemEvent(target, item);
		bindMenuEvent(target, menu);
		setMenuWidth(target, menu);
	}
	
	function removeItem(target, itemEl){
		function removeit(el){
			if (el.submenu){
				el.submenu.children('div.menu-item').each(function(){
					removeit(this);
				});
				var shadow = el.submenu[0].shadow;
				if (shadow) shadow.remove();
				el.submenu.remove();
			}
			$(el).remove();
		}
		removeit(itemEl);
	}
	
	function destroyMenu(target){
		$(target).children('div.menu-item').each(function(){
			removeItem(target, this);
		});
		if (target.shadow) target.shadow.remove();
		$(target).remove();
	}
	
	$.fn.menu = function(options, param){
		if (typeof options == 'string'){
			return $.fn.menu.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'menu');
			if (state){
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'menu', {
					options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), options)
				});
				init(this);
			}
			$(this).css({
				left: state.options.left,
				top: state.options.top
			});
		});
	};
	
	$.fn.menu.methods = {
		options: function(jq){
			return $.data(jq[0], 'menu').options;
		},
		show: function(jq, pos){
			return jq.each(function(){
				showMenu(this, pos);
			});
		},
		hide: function(jq){
			return jq.each(function(){
				hideAll(this);
			});
		},
		destroy: function(jq){
			return jq.each(function(){
				destroyMenu(this);
			});
		},
		/**
		 * set the menu item text
		 * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	text: string, the new text
		 * }
		 */
		setText: function(jq, param){
			return jq.each(function(){
				$(param.target).children('div.menu-text').html(param.text);
			});
		},
		/**
		 * set the menu icon class
		 * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	iconCls: the menu item icon class
		 * }
		 */
		setIcon: function(jq, param){
			return jq.each(function(){
				$(param.target).children('div.menu-icon').remove();
				if (param.iconCls){
					$('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(param.target);
				}
			});
		},
		/**
		 * get the menu item data that contains the following property:
		 * {
		 * 	target: DOM object, the menu item
		 *  id: the menu id
		 * 	text: the menu item text
		 * 	iconCls: the icon class
		 *  href: a remote address to redirect to
		 *  onclick: a function to be called when the item is clicked
		 * }
		 */
		getItem: function(jq, itemEl){
			var t = $(itemEl);
			var item = {
				target: itemEl,
				id: t.attr('id'),
				text: $.trim(t.children('div.menu-text').html()),
				disabled: t.hasClass('menu-item-disabled'),
//				href: t.attr('href'),
//				name: t.attr('name'),
				name: itemEl.itemName,
				href: itemEl.itemHref,
				onclick: itemEl.onclick
			}
			var icon = t.children('div.menu-icon');
			if (icon.length){
				var cc = [];
				var aa = icon.attr('class').split(' ');
				for(var i=0; i<aa.length; i++){
					if (aa[i] != 'menu-icon'){
						cc.push(aa[i]);
					}
				}
				item.iconCls = cc.join(' ');
			}
			return item;
		},
		findItem: function(jq, text){
			return findItem(jq[0], text);
		},
		/**
		 * append menu item, the param contains following properties:
		 * parent,id,text,iconCls,href,onclick
		 * when parent property is assigned, append menu item to it
		 */
		appendItem: function(jq, param){
			return jq.each(function(){
				appendItem(this, param);
			});
		},
		removeItem: function(jq, itemEl){
			return jq.each(function(){
				removeItem(this, itemEl);
			});
		},
		enableItem: function(jq, itemEl){
			return jq.each(function(){
				setDisabled(this, itemEl, false);
			});
		},
		disableItem: function(jq, itemEl){
			return jq.each(function(){
				setDisabled(this, itemEl, true);
			});
		}
	};
	
	$.fn.menu.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, ['left','top',{minWidth:'number',hideOnUnhover:'boolean'}]));
	};
	
	$.fn.menu.defaults = {
		zIndex:110000,
		left: 0,
		top: 0,
		alignTo: null,
		align: 'left',
		minWidth: 120,
		hideOnUnhover: true,	// Automatically hides the menu when mouse exits it
		onShow: function(){},
		onHide: function(){},
		onClick: function(item){}
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
define("jqui/1.3.6/menu-debug.css.js", ["import-style/1.0.0/index-debug"], function(require, exports, module){
require("import-style/1.0.0/index-debug")('.menu{position:absolute;padding:2px;}.menu,.menu-item{margin:0;overflow:hidden;border-width:1px;border-style:solid;}.menu-item{position:relative;padding:0;white-space:nowrap;cursor:pointer;}.menu-text{height:20px;line-height:20px;float:left;padding-left:28px;}.menu-icon{left:2px;}.menu-icon,.menu-rightarrow{position:absolute;width:16px;height:16px;top:50%;margin-top:-8px;}.menu-rightarrow{right:0;}.menu-line{position:absolute;left:26px;top:0;height:2000px;font-size:1px;}.menu-sep{margin:3px 0 3px 25px;font-size:1px;}.menu-active{-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;}.menu-item-disabled{opacity:.5;filter:alpha(opacity=50);cursor:default;}.menu-text,.menu-text span{font-size:12px;}.menu-shadow{position:absolute;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;border-radius:5px 5px 5px 5px;background:#ccc;-moz-box-shadow:2px 2px 3px #ccc;-webkit-box-shadow:2px 2px 3px #ccc;box-shadow:2px 2px 3px #ccc;}.menu-rightarrow{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAZ0lEQVR42u2VMQ7AMAgD+f9XeYBHd+mA2IqrJFJ8EkMGrNiCJMIYY86Eh2otDYA7dNgq2/kLEEzwhxDGGrURQxGlN97gUUrxQCU9DM33ALjYQA0vlRGCcPEUjGxdgasfQX+DxphreAA2tk8BzQnbmgAAAABJRU5ErkJggg==) no-repeat -32px center;}.menu-line{border-left:1px solid #ccc;border-right:1px solid #fff;}.menu-sep{border-top:1px solid #ccc;border-bottom:1px solid #fff;}.menu{background-color:#fafafa;border-color:#ddd;color:#444;}.menu-content{background:#fff;}.menu-item{border-color:transparent;_border-color:#fafafa;}.menu-active{border-color:#b7d2ff;color:#000;background:#eaf2ff;}.menu-active-disabled{border-color:transparent;background:0 0;color:#444;}');

});
