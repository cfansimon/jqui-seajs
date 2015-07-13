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
require('./combo');
require('./tree');

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
