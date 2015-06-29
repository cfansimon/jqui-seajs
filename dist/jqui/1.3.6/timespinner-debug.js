define("jqui/1.3.6/timespinner-debug", [], function(require, exports, module){
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
