/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
require('./parser');
require('./messager.css');
require('./window');

(function($) {
    function _1(el, _2, _3, _4) {
        var _5 = $(el).window("window"); 
        if (!_5) {
            return;
        }
        switch (_2) {
            case null:
                _5.show();
                break;
            case "slide":
                _5.slideDown(_3);
                break;
            case "fade":
                _5.fadeIn(_3);
                break;
            case "show":
                _5.show(_3);
                break;
        }
        var _6 = null;
        if (_4 > 0) {
            _6 = setTimeout(function() {
                _7(el, _2, _3);
            }, _4);
        }
        _5.hover(function() {
            if (_6) {
                clearTimeout(_6);
            }
        }, function() {
            if (_4 > 0) {
                _6 = setTimeout(function() {
                    _7(el, _2, _3);
                }, _4);
            }
        });
    };

    function _7(el, _8, _9) {
        if (el.locked == true) {
            return;
        }
        el.locked = true;
        var _a = $(el).window("window");
        if (!_a) {
            return;
        }
        switch (_8) {
            case null:
                _a.hide();
                break;
            case "slide":
                _a.slideUp(_9);
                break;
            case "fade":
                _a.fadeOut(_9);
                break;
            case "show":
                _a.hide(_9);
                break;
        }
        setTimeout(function() {
            $(el).window("destroy");
        }, _9);
    };

    function _b(_c) {
        var _d = $.extend({}, $.fn.window.defaults, {
            collapsible: false,
            minimizable: false,
            maximizable: false,
            shadow: false,
            draggable: false,
            resizable: false,
            closed: true,
            style: {
                left: "",
                top: "",
                right: 0,
                zIndex: $.fn.window.defaults.zIndex++,
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            },
            onBeforeOpen: function() {
                _1(this, _d.showType, _d.showSpeed, _d.timeout);
                return false;
            },
            onBeforeClose: function() {
                _7(this, _d.showType, _d.showSpeed);
                return false;
            }
        }, {
            title: "",
            width: 250,
            height: 100,
            showType: "slide",
            showSpeed: 600,
            msg: "",
            timeout: 4000
        }, _c);
        _d.style.zIndex = $.fn.window.defaults.zIndex++;
        var _e = $("<div class=\"messager-body\"></div>").html(_d.msg).appendTo("body");
        _e.window(_d);
        _e.window("window").css(_d.style);
        _e.window("open");
        return _e;
    };

    function _f(_10, _11, buttons) {
        var win = $("<div class=\"messager-body\"></div>").appendTo("body");
        win.append(_11);
        if (buttons) {
            console.log(buttons);
            var tb = $("<div class=\"messager-button-group\"></div>").appendTo(win);
            for (var name in buttons) {
                var btn = $("<a class=\"messager-button\"></a>");
                if(name==$.messager.defaults.ok){
                    btn.addClass("messager-button-ok");
                }else if(name==$.messager.defaults.cancel){
                    btn.addClass("messager-button-cancel");
                }
                btn.attr("href", "javascript:void(0)").text(name).css("margin-left", 10).bind("click", eval(buttons[name])).appendTo(tb);
            }
        }
        win.window({
            title: _10,
            noheader: (_10 ? false : true),
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function() {
                setTimeout(function() {
                    win.window("destroy");
                }, 100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").children("a:first").focus();
        return win;
    };
    $.messager = {
        show: function(_14) {
            return _b(_14);
        },
        alert: function(_15, msg, _16, fn) {
            var _17 = "<div>" + msg + "</div>";
            switch (_16) {
                case "error":
                    _17 = "<div class=\"messager-icon messager-error\"></div>" + _17;
                    break;
                case "info":
                    _17 = "<div class=\"messager-icon messager-info\"></div>" + _17;
                    break;
                case "question":
                    _17 = "<div class=\"messager-icon messager-question\"></div>" + _17;
                    break;
                case "warning":
                    _17 = "<div class=\"messager-icon messager-warning\"></div>" + _17;
                    break;
            }
            _17 += "<div style=\"clear:both;\"/>";
            var _18 = {};
            _18[$.messager.defaults.ok] = function() {
                win.window("close");
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = _f(_15, _17, _18);
            return win;
        },
        confirm: function(_19, msg, fn) {
            var _1a = "<div class=\"messager-icon messager-question\"></div>" + "<div>" + msg + "</div>" + "<div style=\"clear:both;\"/>";
            var _1b = {};
            _1b[$.messager.defaults.ok] = function() {
                win.window("close");
                if (fn) {
                    fn(true);
                    return false;
                }
            };
            _1b[$.messager.defaults.cancel] = function() {
                win.window("close");
                if (fn) {
                    fn(false);
                    return false;
                }
            };
            var win = _f(_19, _1a, _1b);
            return win;
        },
        prompt: function(_1c, msg, fn) {
            var _1d = "<div class=\"messager-icon messager-question\"></div>" + "<div>" + msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>";
            var _1e = {};
            _1e[$.messager.defaults.ok] = function() {
                win.window("close");
                if (fn) {
                    fn($(".messager-input", win).val());
                    return false;
                }
            };
            _1e[$.messager.defaults.cancel] = function() {
                win.window("close");
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = _f(_1c, _1d, _1e);
            win.children("input.messager-input").focus();
            return win;
        },
    };
    $.messager.defaults = {
        ok: "Ok",
        cancel: "Cancel"
    };
})(jQuery);