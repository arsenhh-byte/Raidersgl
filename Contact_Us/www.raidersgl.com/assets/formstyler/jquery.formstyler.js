var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(b, k, e) {
    b instanceof String && (b = String(b));
    for (var l = b.length, c = 0; c < l; c++) {
        var a = b[c];
        if (k.call(e, a, c, b)) return {
            i: c,
            v: a
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, k, e) {
    b != Array.prototype && b != Object.prototype && (b[k] = e.value)
};
$jscomp.getGlobal = function(b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, k, e, l) {
    if (k) {
        e = $jscomp.global;
        b = b.split(".");
        for (l = 0; l < b.length - 1; l++) {
            var c = b[l];
            c in e || (e[c] = {});
            e = e[c]
        }
        b = b[b.length - 1];
        l = e[b];
        k = k(l);
        k != l && null != k && $jscomp.defineProperty(e, b, {
            configurable: !0,
            writable: !0,
            value: k
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(b) {
    return b ? b : function(b, e) {
        return $jscomp.findInternal(this, b, e).v
    }
}, "es6", "es3");
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : "object" === typeof exports ? module.exports = b($ || require("jquery")) : b(jQuery)
})(function(b) {
    function k(c, a) {
        this.element = c;
        this.options = b.extend({}, l, a);
        c = this.options.locale;
        void 0 !== this.options.locales[c] && b.extend(this.options, this.options.locales[c]);
        this.init()
    }

    function e(c) {
        if (!b(c.target).parents().hasClass("jq-selectbox") && "OPTION" != c.target.nodeName && b("div.jq-selectbox.opened").length) {
            c = b("div.jq-selectbox.opened");
            var a = b("div.jq-selectbox__search input", c),
                g = b("div.jq-selectbox__dropdown", c);
            c.find("select").data("_styler").options.onSelectClosed.call(c);
            a.length && a.val("").keyup();
            g.hide().find("li.sel").addClass("selected");
            c.removeClass("focused opened dropup dropdown")
        }
    }
    var l = {
        idSuffix: "-styler",
        filePlaceholder: "\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",
        fileBrowse: "\u041e\u0431\u0437\u043e\u0440...",
        fileNumber: "\u0412\u044b\u0431\u0440\u0430\u043d\u043e \u0444\u0430\u0439\u043b\u043e\u0432: %s",
        selectPlaceholder: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435...",
        selectSearch: !1,
        selectSearchLimit: 10,
        selectSearchNotFound: "\u0421\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
        selectSearchPlaceholder: "\u041f\u043e\u0438\u0441\u043a...",
        selectVisibleOptions: 0,
        selectSmartPositioning: !0,
        locale: "ru",
        locales: {
            en: {
                filePlaceholder: "No file selected",
                fileBrowse: "Browse...",
                fileNumber: "Selected files: %s",
                selectPlaceholder: "Select...",
                selectSearchNotFound: "No matches found",
                selectSearchPlaceholder: "Search..."
            }
        },
        onSelectOpened: function() {},
        onSelectClosed: function() {},
        onFormStyled: function() {}
    };
    k.prototype = {
        init: function() {
            function c() {
                void 0 !== a.attr("id") && "" !== a.attr("id") && (this.id = a.attr("id") + g.idSuffix);
                this.title = a.attr("title");
                this.classes = a.attr("class");
                this.data = a.data()
            }
            var a = b(this.element),
                g = this.options,
                k = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i) ? !0 : !1,
                l = navigator.userAgent.match(/Android/i) &&
                !navigator.userAgent.match(/(Windows\sPhone)/i) ? !0 : !1;
            if (a.is(":checkbox")) {
                var C = function() {
                    var m = new c,
                        d = b('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
                            id: m.id,
                            title: m.title
                        }).addClass(m.classes).data(m.data);
                    a.after(d).prependTo(d);
                    a.is(":checked") && d.addClass("checked");
                    a.is(":disabled") && d.addClass("disabled");
                    d.click(function(b) {
                        b.preventDefault();
                        a.triggerHandler("click");
                        d.is(".disabled") || (a.is(":checked") ? (a.prop("checked", !1), d.removeClass("checked")) : (a.prop("checked", !0), d.addClass("checked")), a.focus().change())
                    });
                    a.closest("label").add('label[for="' + a.attr("id") + '"]').on("click.styler", function(a) {
                        b(a.target).is("a") || b(a.target).closest(d).length || (d.triggerHandler("click"), a.preventDefault())
                    });
                    a.on("change.styler", function() {
                        a.is(":checked") ? d.addClass("checked") : d.removeClass("checked")
                    }).on("keydown.styler", function(a) {
                        32 == a.which && d.click()
                    }).on("focus.styler", function() {
                        d.is(".disabled") || d.addClass("focused")
                    }).on("blur.styler", function() {
                        d.removeClass("focused")
                    })
                };
                C();
                a.on("refresh", function() {
                    a.closest("label").add('label[for="' + a.attr("id") + '"]').off(".styler");
                    a.off(".styler").parent().before(a).remove();
                    C()
                })
            } else if (a.is(":radio")) {
                var K = function() {
                    var m = new c,
                        d = b('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
                            id: m.id,
                            title: m.title
                        }).addClass(m.classes).data(m.data);
                    a.after(d).prependTo(d);
                    a.is(":checked") && d.addClass("checked");
                    a.is(":disabled") && d.addClass("disabled");
                    b.fn.commonParents = function() {
                        var a = this;
                        return a.first().parents().filter(function() {
                            return b(this).find(a).length ===
                                a.length
                        })
                    };
                    b.fn.commonParent = function() {
                        return b(this).commonParents().first()
                    };
                    d.click(function(c) {
                        c.preventDefault();
                        a.triggerHandler("click");
                        d.is(".disabled") || (c = b('input[name="' + a.attr("name") + '"]'), c.commonParent().find(c).prop("checked", !1).parent().removeClass("checked"), a.prop("checked", !0).parent().addClass("checked"), a.focus().change())
                    });
                    a.closest("label").add('label[for="' + a.attr("id") + '"]').on("click.styler", function(a) {
                        b(a.target).is("a") || b(a.target).closest(d).length || (d.triggerHandler("click"),
                            a.preventDefault())
                    });
                    a.on("change.styler", function() {
                        a.parent().addClass("checked")
                    }).on("focus.styler", function() {
                        d.is(".disabled") || d.addClass("focused")
                    }).on("blur.styler", function() {
                        d.removeClass("focused")
                    })
                };
                K();
                a.on("refresh", function() {
                    a.closest("label").add('label[for="' + a.attr("id") + '"]').off(".styler");
                    a.off(".styler").parent().before(a).remove();
                    K()
                })
            } else if (a.is(":file")) {
                var L = function() {
                    var m = new c,
                        d = a.data("placeholder");
                    void 0 === d && (d = g.filePlaceholder);
                    var e = a.data("browse");
                    if (void 0 ===
                        e || "" === e) e = g.fileBrowse;
                    var v = b('<div class="jq-file"><div class="jq-file__name">' + d + '</div><div class="jq-file__browse">' + e + "</div></div>").attr({
                        id: m.id,
                        title: m.title
                    }).addClass(m.classes).data(m.data);
                    a.after(v).appendTo(v);
                    a.is(":disabled") && v.addClass("disabled");
                    m = a.val();
                    var r = b("div.jq-file__name", v);
                    m && r.text(m.replace(/.+[\\\/]/, ""));
                    a.on("change.styler", function() {
                        var b = a.val();
                        if (a.is("[multiple]")) {
                            b = "";
                            var c = a[0].files.length;
                            0 < c && (b = a.data("number"), void 0 === b && (b = g.fileNumber), b =
                                b.replace("%s", c))
                        }
                        r.text(b.replace(/.+[\\\/]/, ""));
                        "" === b ? (r.text(d), v.removeClass("changed")) : v.addClass("changed")
                    }).on("focus.styler", function() {
                        v.addClass("focused")
                    }).on("blur.styler", function() {
                        v.removeClass("focused")
                    }).on("click.styler", function() {
                        v.removeClass("focused")
                    })
                };
                L();
                a.on("refresh", function() {
                    a.off(".styler").parent().before(a).remove();
                    L()
                })
            } else if (a.is('input[type="number"]')) {
                var M = function() {
                    var m = new c,
                        d = b('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
                            id: m.id,
                            title: m.title
                        }).addClass(m.classes).data(m.data);
                    a.after(d).prependTo(d).wrap('<div class="jq-number__field"></div>');
                    a.is(":disabled") && d.addClass("disabled");
                    var e, g, r = null,
                        k = null;
                    void 0 !== a.attr("min") && (e = a.attr("min"));
                    void 0 !== a.attr("max") && (g = a.attr("max"));
                    var x = void 0 !== a.attr("step") && b.isNumeric(a.attr("step")) ? Number(a.attr("step")) : Number(1);
                    var f = function(c) {
                        var f = a.val(),
                            d;
                        b.isNumeric(f) || (f = 0, a.val("0"));
                        c.is(".minus") ? d = Number(f) - x : c.is(".plus") && (d = Number(f) + x);
                        c = (x.toString().split(".")[1] || []).length;
                        if (0 < c) {
                            for (f = "1"; f.length <= c;) f += "0";
                            d = Math.round(d * f) / f
                        }
                        b.isNumeric(e) && b.isNumeric(g) ? d >= e && d <= g && a.val(d) : b.isNumeric(e) && !b.isNumeric(g) ? d >= e && a.val(d) : !b.isNumeric(e) && b.isNumeric(g) ? d <= g && a.val(d) : a.val(d)
                    };
                    d.is(".disabled") || (d.on("mousedown", "div.jq-number__spin", function() {
                        var a = b(this);
                        f(a);
                        r = setTimeout(function() {
                            k = setInterval(function() {
                                f(a)
                            }, 40)
                        }, 350)
                    }).on("mouseup mouseout", "div.jq-number__spin", function() {
                        clearTimeout(r);
                        clearInterval(k)
                    }).on("mouseup", "div.jq-number__spin",
                        function() {
                            a.change().trigger("input")
                        }), a.on("focus.styler", function() {
                        d.addClass("focused")
                    }).on("blur.styler", function() {
                        d.removeClass("focused")
                    }))
                };
                M();
                a.on("refresh", function() {
                    a.off(".styler").closest(".jq-number").before(a).remove();
                    M()
                })
            } else if (a.is("select")) {
                var O = function() {
                    function m(a) {
                        var b = a.prop("scrollHeight") - a.outerHeight(),
                            c = null,
                            d = null;
                        a.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(f) {
                            c = 0 > f.originalEvent.detail || 0 < f.originalEvent.wheelDelta ? 1 : -1;
                            d = a.scrollTop();
                            if (d >= b && 0 > c || 0 >= d && 0 < c) f.stopPropagation(), f.preventDefault()
                        })
                    }

                    function d() {
                        for (var a = 0; a < r.length; a++) {
                            var b = r.eq(a),
                                c, d = "",
                                e = c = "",
                                m = "",
                                u = "",
                                y = "",
                                h = "",
                                k = "";
                            b.prop("selected") && (d = "selected sel");
                            b.is(":disabled") && (d = "disabled");
                            b.is(":selected:disabled") && (d = "selected sel disabled");
                            void 0 !== b.attr("id") && "" !== b.attr("id") && (e = ' id="' + b.attr("id") + g.idSuffix + '"');
                            void 0 !== b.attr("title") && "" !== r.attr("title") && (m = ' title="' + b.attr("title") + '"');
                            void 0 !== b.attr("class") && (y = " " +
                                b.attr("class"), k = ' data-jqfs-class="' + b.attr("class") + '"');
                            var l = b.data(),
                                w;
                            for (w in l) "" !== l[w] && (u += " data-" + w + '="' + l[w] + '"');
                            "" !== d + y && (c = ' class="' + d + y + '"');
                            c = "<li" + k + u + c + m + e + ">" + b.html() + "</li>";
                            b.parent().is("optgroup") && (void 0 !== b.parent().attr("class") && (h = " " + b.parent().attr("class")), c = "<li" + k + u + ' class="' + d + y + " option" + h + '"' + m + e + ">" + b.html() + "</li>", b.is(":first-child") && (c = '<li class="optgroup' + h + '">' + b.parent().attr("label") + "</li>" + c));
                            H += c
                        }
                    }

                    function z() {
                        var x = new c,
                            f = "",
                            A = a.data("placeholder"),
                            n = a.data("search"),
                            l = a.data("search-limit"),
                            v = a.data("search-not-found"),
                            u = a.data("search-placeholder"),
                            y = a.data("smart-positioning");
                        void 0 === A && (A = g.selectPlaceholder);
                        if (void 0 === n || "" === n) n = g.selectSearch;
                        if (void 0 === l || "" === l) l = g.selectSearchLimit;
                        if (void 0 === v || "" === v) v = g.selectSearchNotFound;
                        void 0 === u && (u = g.selectSearchPlaceholder);
                        if (void 0 === y || "" === y) y = g.selectSmartPositioning;
                        var h = b('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({
                            id: x.id,
                            title: x.title
                        }).addClass(x.classes).data(x.data);
                        a.after(h).prependTo(h);
                        var z = h.css("z-index");
                        z = 0 < z ? z : 1;
                        var N = b("div.jq-selectbox__select", h),
                            w = b("div.jq-selectbox__select-text", h);
                        x = r.filter(":selected");
                        d();
                        n && (f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + u + '"></div><div class="jq-selectbox__not-found">' + v + "</div>");
                        var p = b('<div class="jq-selectbox__dropdown">' + f + "<ul>" + H + "</ul></div>");
                        h.append(p);
                        var t = b("ul", p),
                            q = b("li", p),
                            D = b("input", p),
                            I = b("div.jq-selectbox__not-found",
                                p).hide();
                        q.length < l && D.parent().hide();
                        "" === r.first().text() && r.first().is(":selected") && !1 !== A ? w.text(A).addClass("placeholder") : w.text(x.text());
                        var E = 0,
                            C = 0;
                        q.css({
                            display: "inline-block"
                        });
                        q.each(function() {
                            var a = b(this);
                            a.innerWidth() > E && (E = a.innerWidth(), C = a.width())
                        });
                        q.css({
                            display: ""
                        });
                        w.is(".placeholder") && w.width() > E ? w.width(w.width()) : (f = h.clone().appendTo("body").width("auto"), n = f.outerWidth(), f.remove(), n == h.outerWidth() && w.width(C));
                        E > h.width() && p.width(E);
                        "" === r.first().text() && "" !==
                            a.data("placeholder") && q.first().hide();
                        var J = h.outerHeight(!0),
                            F = D.parent().outerHeight(!0) || 0,
                            B = t.css("max-height");
                        f = q.filter(".selected");
                        1 > f.length && q.first().addClass("selected sel");
                        void 0 === q.data("li-height") && (n = q.outerHeight(), !1 !== A && (n = q.eq(1).outerHeight()), q.data("li-height", n));
                        var G = p.css("top");
                        "auto" == p.css("left") && p.css({
                            left: 0
                        });
                        "auto" == p.css("top") && (p.css({
                            top: J
                        }), G = J);
                        p.hide();
                        f.length && (r.first().text() != x.text() && h.addClass("changed"), h.data("jqfs-class", f.data("jqfs-class")),
                            h.addClass(f.data("jqfs-class")));
                        if (a.is(":disabled")) return h.addClass("disabled"), !1;
                        N.click(function() {
                            b("div.jq-selectbox").filter(".opened").length && g.onSelectClosed.call(b("div.jq-selectbox").filter(".opened"));
                            a.focus();
                            if (!k) {
                                var c = b(window),
                                    d = q.data("li-height"),
                                    f = h.offset().top,
                                    e = c.height() - J - (f - c.scrollTop()),
                                    u = a.data("visible-options");
                                if (void 0 === u || "" === u) u = g.selectVisibleOptions;
                                var l = 5 * d,
                                    n = d * u;
                                0 < u && 6 > u && (l = n);
                                0 === u && (n = "auto");
                                u = function() {
                                    p.height("auto").css({
                                        bottom: "auto",
                                        top: G
                                    });
                                    var a = function() {
                                        t.css("max-height", Math.floor((e - 20 - F) / d) * d)
                                    };
                                    a();
                                    t.css("max-height", n);
                                    "none" != B && t.css("max-height", B);
                                    e < p.outerHeight() + 20 && a()
                                };
                                var x = function() {
                                    p.height("auto").css({
                                        top: "auto",
                                        bottom: G
                                    });
                                    var a = function() {
                                        t.css("max-height", Math.floor((f - c.scrollTop() - 20 - F) / d) * d)
                                    };
                                    a();
                                    t.css("max-height", n);
                                    "none" != B && t.css("max-height", B);
                                    f - c.scrollTop() - 20 < p.outerHeight() + 20 && a()
                                };
                                !0 === y || 1 === y ? e > l + F + 20 ? (u(), h.removeClass("dropup").addClass("dropdown")) : (x(), h.removeClass("dropdown").addClass("dropup")) :
                                    !1 === y || 0 === y ? e > l + F + 20 && (u(), h.removeClass("dropup").addClass("dropdown")) : (p.height("auto").css({
                                        bottom: "auto",
                                        top: G
                                    }), t.css("max-height", n), "none" != B && t.css("max-height", B));
                                h.offset().left + p.outerWidth() > c.width() && p.css({
                                    left: "auto",
                                    right: 0
                                });
                                b("div.jqselect").css({
                                    zIndex: z - 1
                                }).removeClass("opened");
                                h.css({
                                    zIndex: z
                                });
                                p.is(":hidden") ? (b("div.jq-selectbox__dropdown:visible").hide(), p.show(), h.addClass("opened focused"), g.onSelectOpened.call(h)) : (p.hide(), h.removeClass("opened dropup dropdown"),
                                    b("div.jq-selectbox").filter(".opened").length && g.onSelectClosed.call(h));
                                D.length && (D.val("").keyup(), I.hide(), D.keyup(function() {
                                    var c = b(this).val();
                                    q.each(function() {
                                        b(this).html().match(new RegExp(".*?" + c + ".*?", "i")) ? b(this).show() : b(this).hide()
                                    });
                                    "" === r.first().text() && "" !== a.data("placeholder") && q.first().hide();
                                    1 > q.filter(":visible").length ? I.show() : I.hide()
                                }));
                                q.filter(".selected").length && ("" === a.val() ? t.scrollTop(0) : (0 !== t.innerHeight() / d % 2 && (d /= 2), t.scrollTop(t.scrollTop() + q.filter(".selected").position().top -
                                    t.innerHeight() / 2 + d)));
                                m(t)
                            }
                        });
                        q.hover(function() {
                            b(this).siblings().removeClass("selected")
                        });
                        q.filter(".selected").text();
                        q.filter(":not(.disabled):not(.optgroup)").click(function() {
                            a.focus();
                            var c = b(this),
                                d = c.text();
                            if (!c.is(".selected")) {
                                var f = c.index();
                                f -= c.prevAll(".optgroup").length;
                                c.addClass("selected sel").siblings().removeClass("selected sel");
                                r.prop("selected", !1).eq(f).prop("selected", !0);
                                w.text(d);
                                h.data("jqfs-class") && h.removeClass(h.data("jqfs-class"));
                                h.data("jqfs-class", c.data("jqfs-class"));
                                h.addClass(c.data("jqfs-class"));
                                a.change()
                            }
                            p.hide();
                            h.removeClass("opened dropup dropdown");
                            g.onSelectClosed.call(h)
                        });
                        p.mouseout(function() {
                            b("li.sel", p).addClass("selected")
                        });
                        a.on("change.styler", function() {
                            w.text(r.filter(":selected").text()).removeClass("placeholder");
                            q.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
                            r.first().text() != q.filter(".selected").text() ? h.addClass("changed") : h.removeClass("changed")
                        }).on("focus.styler", function() {
                            h.addClass("focused");
                            b("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
                        }).on("blur.styler", function() {
                            h.removeClass("focused")
                        }).on("keydown.styler keyup.styler", function(b) {
                            var c = q.data("li-height");
                            "" === a.val() ? w.text(A).addClass("placeholder") : w.text(r.filter(":selected").text());
                            q.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
                            if (38 == b.which || 37 == b.which || 33 == b.which || 36 == b.which) "" === a.val() ? t.scrollTop(0) :
                                t.scrollTop(t.scrollTop() + q.filter(".selected").position().top);
                            40 != b.which && 39 != b.which && 34 != b.which && 35 != b.which || t.scrollTop(t.scrollTop() + q.filter(".selected").position().top - t.innerHeight() + c);
                            13 == b.which && (b.preventDefault(), p.hide(), h.removeClass("opened dropup dropdown"), g.onSelectClosed.call(h))
                        }).on("keydown.styler", function(a) {
                            32 == a.which && (a.preventDefault(), N.click())
                        });
                        e.registered || (b(document).on("click", e), e.registered = !0)
                    }

                    function v() {
                        var e = new c,
                            f = b('<div class="jq-select-multiple jqselect"></div>').attr({
                                id: e.id,
                                title: e.title
                            }).addClass(e.classes).data(e.data);
                        a.after(f);
                        d();
                        f.append("<ul>" + H + "</ul>");
                        var g = b("ul", f),
                            n = b("li", f);
                        e = a.attr("size");
                        var l = g.outerHeight(),
                            k = n.outerHeight();
                        void 0 !== e && 0 < e ? g.css({
                            height: k * e
                        }) : g.css({
                            height: 4 * k
                        });
                        l > f.height() && (g.css("overflowY", "scroll"), m(g), n.filter(".selected").length && g.scrollTop(g.scrollTop() + n.filter(".selected").position().top));
                        a.prependTo(f);
                        if (a.is(":disabled")) f.addClass("disabled"), r.each(function() {
                            b(this).is(":selected") && n.eq(b(this).index()).addClass("selected")
                        });
                        else if (n.filter(":not(.disabled):not(.optgroup)").click(function(c) {
                                a.focus();
                                var d = b(this);
                                c.ctrlKey || c.metaKey || d.addClass("selected");
                                c.shiftKey || d.addClass("first");
                                c.ctrlKey || c.metaKey || c.shiftKey || d.siblings().removeClass("selected first");
                                if (c.ctrlKey || c.metaKey) d.is(".selected") ? d.removeClass("selected first") : d.addClass("selected first"), d.siblings().removeClass("first");
                                if (c.shiftKey) {
                                    var e = !1,
                                        f = !1;
                                    d.siblings().removeClass("selected").siblings(".first").addClass("selected");
                                    d.prevAll().each(function() {
                                        b(this).is(".first") &&
                                            (e = !0)
                                    });
                                    d.nextAll().each(function() {
                                        b(this).is(".first") && (f = !0)
                                    });
                                    e && d.prevAll().each(function() {
                                        if (b(this).is(".selected")) return !1;
                                        b(this).not(".disabled, .optgroup").addClass("selected")
                                    });
                                    f && d.nextAll().each(function() {
                                        if (b(this).is(".selected")) return !1;
                                        b(this).not(".disabled, .optgroup").addClass("selected")
                                    });
                                    1 == n.filter(".selected").length && d.addClass("first")
                                }
                                r.prop("selected", !1);
                                n.filter(".selected").each(function() {
                                    var a = b(this),
                                        c = a.index();
                                    a.is(".option") && (c -= a.prevAll(".optgroup").length);
                                    r.eq(c).prop("selected", !0)
                                });
                                a.change()
                            }), r.each(function(a) {
                                b(this).data("optionIndex", a)
                            }), a.on("change.styler", function() {
                                n.removeClass("selected");
                                var a = [];
                                r.filter(":selected").each(function() {
                                    a.push(b(this).data("optionIndex"))
                                });
                                n.not(".optgroup").filter(function(c) {
                                    return -1 < b.inArray(c, a)
                                }).addClass("selected")
                            }).on("focus.styler", function() {
                                f.addClass("focused")
                            }).on("blur.styler", function() {
                                f.removeClass("focused")
                            }), l > f.height()) a.on("keydown.styler", function(a) {
                            38 != a.which && 37 != a.which &&
                                33 != a.which || g.scrollTop(g.scrollTop() + n.filter(".selected").position().top - k);
                            40 != a.which && 39 != a.which && 34 != a.which || g.scrollTop(g.scrollTop() + n.filter(".selected:last").position().top - g.innerHeight() + 2 * k)
                        })
                    }
                    var r = b("option", a),
                        H = "";
                    a.is("[multiple]") ? l || k || v() : z()
                };
                O();
                a.on("refresh", function() {
                    a.off(".styler").parent().before(a).remove();
                    O()
                })
            } else if (a.is(":reset")) a.on("click", function() {
                setTimeout(function() {
                    a.closest("form").find("input, select").trigger("refresh")
                }, 1)
            })
        },
        destroy: function() {
            var c =
                b(this.element);
            c.is(":checkbox") || c.is(":radio") ? (c.removeData("_styler").off(".styler refresh").removeAttr("style").parent().before(c).remove(), c.closest("label").add('label[for="' + c.attr("id") + '"]').off(".styler")) : c.is('input[type="number"]') ? c.removeData("_styler").off(".styler refresh").closest(".jq-number").before(c).remove() : (c.is(":file") || c.is("select")) && c.removeData("_styler").off(".styler refresh").removeAttr("style").parent().before(c).remove()
        }
    };
    b.fn.styler = function(c) {
        var a = arguments;
        if (void 0 === c || "object" === typeof c) return this.each(function() {
            b.data(this, "_styler") || b.data(this, "_styler", new k(this, c))
        }).promise().done(function() {
            var a = b(this[0]).data("_styler");
            a && a.options.onFormStyled.call()
        }), this;
        if ("string" === typeof c && "_" !== c[0] && "init" !== c) {
            var e;
            this.each(function() {
                var g = b.data(this, "_styler");
                g instanceof k && "function" === typeof g[c] && (e = g[c].apply(g, Array.prototype.slice.call(a, 1)))
            });
            return void 0 !== e ? e : this
        }
    };
    e.registered = !1
});