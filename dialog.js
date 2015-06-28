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
require('./dialog.css');
require('./window');
(function($) {
    function createContentPanel(target) {
        var elem = document.createElement("div");
        while (target.firstChild) {
            elem.appendChild(target.firstChild);
        }
        target.appendChild(elem);
        var cp = $(elem);
        cp.attr("style", $(target).attr("style"));
        $(target).removeAttr("style").css("overflow", "hidden");
        cp.panel({
            border: false,
            doSize: false,
            bodyCls: "dialog-content"
        });
        return cp;
    };

    function create(target) {
        var opts = $.data(target, "dialog").options;
        var cp = $.data(target, "dialog").contentPanel;
        opts.href = null;
        opts.content = null;
        cp.panel({
            closed: opts.closed,
            cache: opts.cache,
            href: opts.href,
            content: opts.content,
            onLoad: function() {
                if (opts.height == "auto") {
                    $(target).window("resize");
                }
                opts.onLoad.apply(target, arguments);
            }
        });
        $(target).window($.extend({}, opts, {
            onOpen: function() {
                if (cp.panel("options").closed) {
                    cp.panel("open");
                }
                if (opts.onOpen) {
                    opts.onOpen.call(target);
                }
            },
            onResize: function(width, height) {
                cp.panel("panel").show();
                cp.panel("resize", {
                    width: $(target).width(),
                    height: (height == "auto") ? "auto" : $(target).height() - $(target).children("div.dialog-toolbar")._outerHeight() - $(target).children("div.dialog-button")._outerHeight()
                });
                if (opts.onResize) {
                    opts.onResize.call(target, width, height);
                }
            }
        }));
    };

    function refreshPanel(target, href) {
        $.data(target, "dialog").contentPanel.panel("refresh", href);
    };
    $.fn.dialog = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.dialog.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.window(options, param);
            }
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "dialog");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), options),
                    contentPanel: createContentPanel(this)
                });
            }
            create(this);
        });
    };
    $.fn.dialog.methods = {
        options: function(jq) {
            var opts = $.data(jq[0], "dialog").options;
            var options = jq.panel("options");
            $.extend(opts, {
                closed: options.closed,
                collapsed: options.collapsed,
                minimized: options.minimized,
                maximized: options.maximized
            });
            // @todo unused
            var contentPanel = $.data(jq[0], "dialog").contentPanel;
            return opts;
        },
        dialog: function(jq) {
            return jq.window("window");
        },
        refresh: function(jq, href) {
            return jq.each(function() {
                refreshPanel(this, href);
            });
        }
    };
    $.fn.dialog.parseOptions = function(target) {
        return $.extend({}, $.fn.window.parseOptions(target), $.parser.parseOptions(target, ["toolbar", "buttons"]));
    };
    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: "Dialog",
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false
    });
})(jQuery);