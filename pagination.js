﻿/**
 * jQuery EasyUI 1.3.6
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
require('./parser');
//require('./css/pagination.css');

(function($) {
    function _1(_2) {
        var state = $.data(_2, "pagination");
        var opts = state.options;
        var bb = state.bb = {};
        var _5 = $(_2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
        var tr = _5.find("tr");
        var aa = $.extend([], opts.layout);
        if (!opts.showPageList) {
            _6(aa, "list");
        }
        if (!opts.showRefresh) {
            _6(aa, "refresh");
        }
        if (aa[0] == "sep") {
            aa.shift();
        }
        if (aa[aa.length - 1] == "sep") {
            aa.pop();
        }
        for (var _7 = 0; _7 < aa.length; _7++) {
            var _8 = aa[_7];
            if (_8 == "list") {
                var ps = $("<select class=\"pagination-page-list\"></select>");
                ps.bind("change", function() {
                    opts.pageSize = parseInt($(this).val());
                    opts.onChangePageSize.call(_2, opts.pageSize);
                    _10(_2, opts.pageNumber);
                });
                for (var i = 0; i < opts.pageList.length; i++) {
                    $("<option></option>").text(opts.pageList[i]).appendTo(ps);
                }
                $("<td></td>").append(ps).appendTo(tr);
            } else {
                if (_8 == "sep") {
                    $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                } else {
                    if (_8 == "first") {
                        bb.first = _9("first");
                    } else {
                        if (_8 == "prev") {
                            bb.prev = _9("prev");
                        } else {
                            if (_8 == "next") {
                                bb.next = _9("next");
                            } else {
                                if (_8 == "last") {
                                    bb.last = _9("last");
                                } else {
                                    if (_8 == "manual") {
                                        $("<span style=\"padding-left:6px;\"></span>").html(opts.beforePageText).appendTo(tr).wrap("<td></td>");
                                        bb.num = $("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
                                        bb.num.unbind(".pagination").bind("keydown.pagination", function(e) {
                                            if (e.keyCode == 13) {
                                                var _a = parseInt($(this).val()) || 1;
                                                _10(_2, _a);
                                                return false;
                                            }
                                        });
                                        bb.after = $("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
                                    } else {
                                        if (_8 == "refresh") {
                                            bb.refresh = _9("refresh");
                                        } else {
                                            if (_8 == "links") {
                                                $("<td class=\"pagination-links\"></td>").appendTo(tr);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $("<div class=\"pagination-info\"></div>").appendTo(_5);
        $("<div style=\"clear:both;\"></div>").appendTo(_5);

        function _9(_c) {
            var _d = opts.nav[_c];
            var a = $("<a href=\"javascript:void(0)\" class=\"pagination-btn\"><span class=\"pagination-btn-icon "+ _d.iconCls +"\">&nbsp;</span></a>").appendTo(tr);
            a.wrap("<td></td>");
            a.unbind(".pagination").bind("click.pagination", function() {
                _d.handler.call(_2);
            });
            return a;
        };

        function _6(aa, _e) {
            var _f = $.inArray(_e, aa);
            if (_f >= 0) {
                aa.splice(_f, 1);
            }
            return aa;
        };
    };

    function _10(_11, _12) {
        var _13 = $.data(_11, "pagination").options;
        _14(_11, {
            pageNumber: _12
        });
        _13.onSelectPage.call(_11, _13.pageNumber, _13.pageSize);
    };

    function _14(_15, _16) {
        var _17 = $.data(_15, "pagination");
        var _18 = _17.options;
        var bb = _17.bb;
        $.extend(_18, _16 || {});
        var ps = $(_15).find("select.pagination-page-list");
        if (ps.length) {
            ps.val(_18.pageSize + "");
            _18.pageSize = parseInt(ps.val());
        }
        var _19 = Math.ceil(_18.total / _18.pageSize) || 1;
        if (_18.pageNumber < 1) {
            _18.pageNumber = 1;
        }
        if (_18.pageNumber > _19) {
            _18.pageNumber = _19;
        }
        if (bb.num) {
            bb.num.val(_18.pageNumber);
        }
        if (bb.after) {
            bb.after.html(_18.afterPageText.replace(/{pages}/, _19));
        }
        var td = $(_15).find("td.pagination-links");
        if (td.length) {
            td.empty();
            var _1a = _18.pageNumber - Math.floor(_18.links / 2);
            if (_1a < 1) {
                _1a = 1;
            }
            var _1b = _1a + _18.links - 1;
            if (_1b > _19) {
                _1b = _19;
            }
            _1a = _1b - _18.links + 1;
            if (_1a < 1) {
                _1a = 1;
            }
            for (var i = _1a; i <= _1b; i++) {
                var a = $("<a class=\"pagination-link\" href=\"javascript:void(0)\">"+ i +"</a>").appendTo(td);
                if (i == _18.pageNumber) {
                    a.addClass("pagination-link-selected");
                } else {
                    a.unbind(".pagination").bind("click.pagination", {
                        pageNumber: i
                    }, function(e) {
                        _10(_15, e.data.pageNumber);
                    });
                }
            }
        }
        var _1c = _18.displayMsg;
        _1c = _1c.replace(/{from}/, _18.total == 0 ? 0 : _18.pageSize * (_18.pageNumber - 1) + 1);
        _1c = _1c.replace(/{to}/, Math.min(_18.pageSize * (_18.pageNumber), _18.total));
        _1c = _1c.replace(/{total}/, _18.total);
        $(_15).find("div.pagination-info").html(_1c);
        if (bb.first) {
            if(_18.pageNumber == 1){
                bb.first.addClass('pagination-btn-disabled');
            }else{
                bb.first.removeClass('pagination-btn-disabled');
            }
        }
        if (bb.prev) {
            if(_18.pageNumber == 1){
                bb.prev.addClass('pagination-btn-disabled');
            }else{
                bb.prev.removeClass('pagination-btn-disabled');
            }
        }
        if (bb.next) {
            if(_18.pageNumber == _19){
                bb.next.addClass('pagination-btn-disabled');
            }else{
                bb.next.removeClass('pagination-btn-disabled');
            }
        }
        if (bb.last) {
            if(_18.pageNumber == _19){
                bb.last.addClass('pagination-btn-disabled');
            }else{
                bb.last.removeClass('pagination-btn-disabled');
            }
        }
        _1d(_15, _18.loading);
    };

    function _1d(_1e, _1f) {
        var _20 = $.data(_1e, "pagination");
        var _21 = _20.options;
        _21.loading = _1f;
        if (_21.showRefresh && _20.bb.refresh) {
            _20.bb.refresh.addClass(_21.loading ? "pagination-loading" : "pagination-load");
            _20.bb.refresh.removeClass(_21.loading ? "pagination-load" : "pagination-loading");
        }
    };
    $.fn.pagination = function(_22, _23) {
        if (typeof _22 == "string") {
            return $.fn.pagination.methods[_22](this, _23);
        }
        _22 = _22 || {};
        return this.each(function() {
            var _24;
            var _25 = $.data(this, "pagination");
            if (_25) {
                _24 = $.extend(_25.options, _22);
            } else {
                _24 = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), _22);
                $.data(this, "pagination", {
                    options: _24
                });
            }
            _1(this);
            _14(this);
        });
    };
    $.fn.pagination.methods = {
        options: function(jq) {
            return $.data(jq[0], "pagination").options;
        },
        loading: function(jq) {
            return jq.each(function() {
                _1d(this, true);
            });
        },
        loaded: function(jq) {
            return jq.each(function() {
                _1d(this, false);
            });
        },
        refresh: function(jq, _26) {
            return jq.each(function() {
                _14(this, _26);
            });
        },
        select: function(jq, _27) {
            return jq.each(function() {
                _10(this, _27);
            });
        }
    };
    $.fn.pagination.parseOptions = function(_28) {
        var t = $(_28);
        return $.extend({}, $.parser.parseOptions(_28, [{
            total: "number",
            pageSize: "number",
            pageNumber: "number",
            links: "number"
        }, {
            loading: "boolean",
            showPageList: "boolean",
            showRefresh: "boolean"
        }]), {
            pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined)
        });
    };
    $.fn.pagination.defaults = {
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 20, 30, 50],
        loading: false,
        showPageList: true,
        showRefresh: true,
        links: 10,
        layout: ["list", "sep", "first", "prev", "sep", "manual", "sep", "next", "last", "sep", "refresh"],
        onSelectPage: function(_29, _2a) {},
        onBeforeRefresh: function(_2b, _2c) {},
        onRefresh: function(_2d, _2e) {},
        onChangePageSize: function(_2f) {},
        beforePageText: "第",
        afterPageText: "共{pages}页",
        displayMsg: "显示{from}到{to},共{total}记录",
        nav: {
            first: {
                iconCls: "pagination-first",
                handler: function() {
                    var _30 = $(this).pagination("options");
                    if (_30.pageNumber > 1) {
                        $(this).pagination("select", 1);
                    }
                }
            },
            prev: {
                iconCls: "pagination-prev",
                handler: function() {
                    var _31 = $(this).pagination("options");
                    if (_31.pageNumber > 1) {
                        $(this).pagination("select", _31.pageNumber - 1);
                    }
                }
            },
            next: {
                iconCls: "pagination-next",
                handler: function() {
                    var _32 = $(this).pagination("options");
                    var _33 = Math.ceil(_32.total / _32.pageSize);
                    if (_32.pageNumber < _33) {
                        $(this).pagination("select", _32.pageNumber + 1);
                    }
                }
            },
            last: {
                iconCls: "pagination-last",
                handler: function() {
                    var _34 = $(this).pagination("options");
                    var _35 = Math.ceil(_34.total / _34.pageSize);
                    if (_34.pageNumber < _35) {
                        $(this).pagination("select", _35);
                    }
                }
            },
            refresh: {
                iconCls: "pagination-refresh",
                handler: function() {
                    var _36 = $(this).pagination("options");
                    if (_36.onBeforeRefresh.call(this, _36.pageNumber, _36.pageSize) != false) {
                        $(this).pagination("select", _36.pageNumber);
                        _36.onRefresh.call(this, _36.pageNumber, _36.pageSize);
                    }
                }
            }
        }
    };
})(jQuery);