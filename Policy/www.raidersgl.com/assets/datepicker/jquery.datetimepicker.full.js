/*
 @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2016
 @version 1.3.4

 Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 @see http://php.net/manual/en/function.date.php

 For more JQuery plugins visit http://plugins.krajee.com
 For more Yii related demos visit http://demos.krajee.com
 jQuery DateTimePicker
 @homepage http://xdsoft.net/jqplugins/datetimepicker/
 @author Chupurnov Valeriy (<chupurnov@gmail.com>)
 jQuery Mousewheel 3.1.13

 Copyright jQuery Foundation and other contributors
 Released under the MIT license
 http://jquery.org/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(a, g) {
    return Object.prototype.hasOwnProperty.call(a, g)
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, g, p) {
    a != Array.prototype && a != Object.prototype && (a[g] = p.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, g, p, k) {
    if (g) {
        p = $jscomp.global;
        a = a.split(".");
        for (k = 0; k < a.length - 1; k++) {
            var m = a[k];
            m in p || (p[m] = {});
            p = p[m]
        }
        a = a[a.length - 1];
        k = p[a];
        g = g(k);
        g != k && null != g && $jscomp.defineProperty(p, a, {
            configurable: !0,
            writable: !0,
            value: g
        })
    }
};
$jscomp.polyfill("Object.values", function(a) {
    return a ? a : function(a) {
        var g = [],
            k;
        for (k in a) $jscomp.owns(a, k) && g.push(a[k]);
        return g
    }
}, "es8", "es3");
$jscomp.findInternal = function(a, g, p) {
    a instanceof String && (a = String(a));
    for (var k = a.length, m = 0; m < k; m++) {
        var r = a[m];
        if (g.call(p, r, m, a)) return {
            i: m,
            v: r
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, p) {
        return $jscomp.findInternal(this, a, p).v
    }
}, "es6", "es3");
var DateFormatter;
! function() {
    var a = function(a, e) {
        return "string" == typeof a && "string" == typeof e && a.toLowerCase() === e.toLowerCase()
    };
    var g = function(a, e, c) {
        a = a.toString();
        return a.length < e ? g((c || "0") + a, e) : a
    };
    var p = function(a) {
        var e, c;
        a = a || {};
        for (e = 1; e < arguments.length; e++)
            if (c = arguments[e])
                for (var r in c) c.hasOwnProperty(r) && ("object" == typeof c[r] ? p(a[r], c[r]) : a[r] = c[r]);
        return a
    };
    var k = function(a, e) {
        for (var c = 0; c < e.length; c++)
            if (e[c].toLowerCase() === a.toLowerCase()) return c;
        return -1
    };
    var m = {
        dateSettings: {
            days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            daysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            months: "January February March April May June July August September October November December".split(" "),
            monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            meridiem: ["AM", "PM"],
            ordinal: function(a) {
                var e = a % 10,
                    c = {
                        1: "st",
                        2: "nd",
                        3: "rd"
                    };
                return 1 !== Math.floor(a % 100 / 10) && c[e] ? c[e] : "th"
            }
        },
        separators: /[ \-+\/\.T:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g
    };
    DateFormatter = function(a) {
        a = p(m, a);
        this.dateSettings = a.dateSettings;
        this.separators = a.separators;
        this.validParts = a.validParts;
        this.intParts = a.intParts;
        this.tzParts = a.tzParts;
        this.tzClip = a.tzClip
    };
    DateFormatter.prototype = {
        constructor: DateFormatter,
        getMonth: function(a) {
            var e;
            return e = k(a, this.dateSettings.monthsShort) + 1, 0 === e && (e = k(a, this.dateSettings.months) + 1), e
        },
        parseDate: function(k, e) {
            var c, r, g, n, d, v;
            var t = v = !1;
            var x = this.dateSettings,
                b = null,
                p = null,
                m = null,
                q = 0,
                D = 0,
                w = 0;
            if (!k) return null;
            if (k instanceof Date) return k;
            if ("U" === e) return r = parseInt(k), r ? new Date(1E3 * r) : k;
            switch (typeof k) {
                case "number":
                    return new Date(k);
                case "string":
                    break;
                default:
                    return null
            }
            if (c = e.match(this.validParts), !c || 0 === c.length) throw Error("Invalid date format definition.");
            k = k.replace(this.separators, "\x00").split("\x00");
            for (r = 0; r < k.length; r++) switch (g = k[r], e = parseInt(g), c[r]) {
                case "y":
                case "Y":
                    if (!e) return null;
                    v = g.length;
                    b = 2 === v ? parseInt((70 > e ? "20" : "19") + g) : e;
                    v = !0;
                    break;
                case "m":
                case "n":
                case "M":
                case "F":
                    if (isNaN(e)) {
                        if (n =
                            this.getMonth(g), !(0 < n)) return null;
                        p = n
                    } else {
                        if (!(1 <= e && 12 >= e)) return null;
                        p = e
                    }
                    v = !0;
                    break;
                case "d":
                case "j":
                    if (!(1 <= e && 31 >= e)) return null;
                    m = e;
                    v = !0;
                    break;
                case "g":
                case "h":
                    if (d = -1 < c.indexOf("a") ? c.indexOf("a") : -1 < c.indexOf("A") ? c.indexOf("A") : -1, t = k[d], -1 < d) t = a(t, x.meridiem[0]) ? 0 : a(t, x.meridiem[1]) ? 12 : -1, 1 <= e && 12 >= e && -1 < t ? q = e + t - 1 : 0 <= e && 23 >= e && (q = e);
                    else {
                        if (!(0 <= e && 23 >= e)) return null;
                        q = e
                    }
                    t = !0;
                    break;
                case "G":
                case "H":
                    if (!(0 <= e && 23 >= e)) return null;
                    q = e;
                    t = !0;
                    break;
                case "i":
                    if (!(0 <= e && 59 >= e)) return null;
                    D = e;
                    t = !0;
                    break;
                case "s":
                    if (!(0 <= e && 59 >= e)) return null;
                    w = e;
                    t = !0
            }
            if (!0 === v && b && p && m) c = new Date(b, p - 1, m, q, D, w, 0);
            else {
                if (!0 !== t) return null;
                c = new Date(0, 0, 0, q, D, w, 0)
            }
            return c
        },
        guessDate: function(a, e) {
            if ("string" != typeof a) return a;
            var c, k, g, n, d, v = a.replace(this.separators, "\x00").split("\x00");
            e = e.match(this.validParts);
            var t = new Date;
            if (!/^[djmn]/g.test(e[0])) return a;
            for (a = 0; a < v.length; a++) {
                if (g = 2, n = v[a], d = parseInt(n.substr(0, 2)), isNaN(d)) return null;
                switch (a) {
                    case 0:
                        "m" === e[0] || "n" === e[0] ? t.setMonth(d -
                            1) : t.setDate(d);
                        break;
                    case 1:
                        "m" === e[0] || "n" === e[0] ? t.setDate(d) : t.setMonth(d - 1);
                        break;
                    case 2:
                        if (k = t.getFullYear(), c = n.length, g = 4 > c ? c : 4, k = parseInt(4 > c ? k.toString().substr(0, 4 - c) + n : n.substr(0, 4)), !k) return null;
                        t.setFullYear(k);
                        break;
                    case 3:
                        t.setHours(d);
                        break;
                    case 4:
                        t.setMinutes(d);
                        break;
                    case 5:
                        t.setSeconds(d)
                }
                g = n.substr(g);
                0 < g.length && v.splice(a + 1, 0, g)
            }
            return t
        },
        parseFormat: function(a, e) {
            var c, k = this,
                r = k.dateSettings,
                n = /\\?(.?)/gi,
                d = function(a, d) {
                    return c[a] ? c[a]() : d
                };
            return c = {
                d: function() {
                    return g(c.j(),
                        2)
                },
                D: function() {
                    return r.daysShort[c.w()]
                },
                j: function() {
                    return e.getDate()
                },
                l: function() {
                    return r.days[c.w()]
                },
                N: function() {
                    return c.w() || 7
                },
                w: function() {
                    return e.getDay()
                },
                z: function() {
                    var a = new Date(c.Y(), c.n() - 1, c.j()),
                        d = new Date(c.Y(), 0, 1);
                    return Math.round((a - d) / 864E5)
                },
                W: function() {
                    var a = new Date(c.Y(), c.n() - 1, c.j() - c.N() + 3),
                        d = new Date(a.getFullYear(), 0, 4);
                    return g(1 + Math.round((a - d) / 864E5 / 7), 2)
                },
                F: function() {
                    return r.months[e.getMonth()]
                },
                m: function() {
                    return g(c.n(), 2)
                },
                M: function() {
                    return r.monthsShort[e.getMonth()]
                },
                n: function() {
                    return e.getMonth() + 1
                },
                t: function() {
                    return (new Date(c.Y(), c.n(), 0)).getDate()
                },
                L: function() {
                    var a = c.Y();
                    return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400 ? 1 : 0
                },
                o: function() {
                    var a = c.n(),
                        d = c.W();
                    return c.Y() + (12 === a && 9 > d ? 1 : 1 === a && 9 < d ? -1 : 0)
                },
                Y: function() {
                    return e.getFullYear()
                },
                y: function() {
                    return c.Y().toString().slice(-2)
                },
                a: function() {
                    return c.A().toLowerCase()
                },
                A: function() {
                    var a = 12 > c.G() ? 0 : 1;
                    return r.meridiem[a]
                },
                B: function() {
                    var a = 3600 * e.getUTCHours(),
                        d = 60 * e.getUTCMinutes(),
                        c = e.getUTCSeconds();
                    return g(Math.floor((a + d + c + 3600) / 86.4) % 1E3, 3)
                },
                g: function() {
                    return c.G() % 12 || 12
                },
                G: function() {
                    return e.getHours()
                },
                h: function() {
                    return g(c.g(), 2)
                },
                H: function() {
                    return g(c.G(), 2)
                },
                i: function() {
                    return g(e.getMinutes(), 2)
                },
                s: function() {
                    return g(e.getSeconds(), 2)
                },
                u: function() {
                    return g(1E3 * e.getMilliseconds(), 6)
                },
                e: function() {
                    return /\((.*)\)/.exec(String(e))[1] || "Coordinated Universal Time"
                },
                I: function() {
                    var a = new Date(c.Y(), 0),
                        d = Date.UTC(c.Y(), 0),
                        e = new Date(c.Y(), 6),
                        b = Date.UTC(c.Y(), 6);
                    return a - d !==
                        e - b ? 1 : 0
                },
                O: function() {
                    var a = e.getTimezoneOffset(),
                        d = Math.abs(a);
                    return (0 < a ? "-" : "+") + g(100 * Math.floor(d / 60) + d % 60, 4)
                },
                P: function() {
                    var a = c.O();
                    return a.substr(0, 3) + ":" + a.substr(3, 2)
                },
                T: function() {
                    return (String(e).match(k.tzParts) || [""]).pop().replace(k.tzClip, "") || "UTC"
                },
                Z: function() {
                    return 60 * -e.getTimezoneOffset()
                },
                c: function() {
                    return "Y-m-d\\TH:i:sP".replace(n, d)
                },
                r: function() {
                    return "D, d M Y H:i:s O".replace(n, d)
                },
                U: function() {
                    return e.getTime() / 1E3 || 0
                }
            }, d(a, a)
        },
        formatDate: function(a, e) {
            var c, k,
                g, n = "";
            if ("string" == typeof a && (a = this.parseDate(a, e), !a)) return null;
            if (a instanceof Date) {
                var d = e.length;
                for (c = 0; d > c; c++) {
                    var v = e.charAt(c);
                    "S" !== v && "\\" !== v && (0 < c && "\\" === e.charAt(c - 1) ? n += v : (g = this.parseFormat(v, a), c !== d - 1 && this.intParts.test(v) && "S" === e.charAt(c + 1) && (k = parseInt(g) || 0, g += this.dateSettings.ordinal(k)), n += g))
                }
                return n
            }
            return ""
        }
    }
}();
var datetimepickerFactory = function(a) {
    function g(a, e, c) {
        this.date = a;
        this.desc = e;
        this.style = c
    }
    var p = {
            i18n: {
                ar: {
                    months: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a;\u0634\u0628\u0627\u0637;\u0622\u0630\u0627\u0631;\u0646\u064a\u0633\u0627\u0646;\u0645\u0627\u064a\u0648;\u062d\u0632\u064a\u0631\u0627\u0646;\u062a\u0645\u0648\u0632;\u0622\u0628;\u0623\u064a\u0644\u0648\u0644;\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u0623\u0648\u0644;\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u062b\u0627\u0646\u064a;\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644".split(";"),
                    dayOfWeekShort: "\u0646\u062b\u0639\u062e\u062c\u0633\u062d".split(""),
                    dayOfWeek: "\u0627\u0644\u0623\u062d\u062f \u0627\u0644\u0627\u062b\u0646\u064a\u0646 \u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621 \u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621 \u0627\u0644\u062e\u0645\u064a\u0633 \u0627\u0644\u062c\u0645\u0639\u0629 \u0627\u0644\u0633\u0628\u062a \u0627\u0644\u0623\u062d\u062f".split(" ")
                },
                ro: {
                    months: "Ianuarie Februarie Martie Aprilie Mai Iunie Iulie August Septembrie Octombrie Noiembrie Decembrie".split(" "),
                    dayOfWeekShort: "Du Lu Ma Mi Jo Vi S\u00e2".split(" "),
                    dayOfWeek: "Duminic\u0103 Luni Mar\u0163i Miercuri Joi Vineri S\u00e2mb\u0103t\u0103".split(" ")
                },
                id: {
                    months: "Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember".split(" "),
                    dayOfWeekShort: "Min Sen Sel Rab Kam Jum Sab".split(" "),
                    dayOfWeek: "Minggu Senin Selasa Rabu Kamis Jumat Sabtu".split(" ")
                },
                is: {
                    months: "Jan\u00faar Febr\u00faar Mars Apr\u00edl Ma\u00ed J\u00fan\u00ed J\u00fal\u00ed \u00c1g\u00fast September Okt\u00f3ber N\u00f3vember Desember".split(" "),
                    dayOfWeekShort: "Sun M\u00e1n \u00deri\u00f0 Mi\u00f0 Fim F\u00f6s Lau".split(" "),
                    dayOfWeek: "Sunnudagur M\u00e1nudagur \u00deri\u00f0judagur Mi\u00f0vikudagur Fimmtudagur F\u00f6studagur Laugardagur".split(" ")
                },
                bg: {
                    months: "\u042f\u043d\u0443\u0430\u0440\u0438 \u0424\u0435\u0432\u0440\u0443\u0430\u0440\u0438 \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0438\u043b \u041c\u0430\u0439 \u042e\u043d\u0438 \u042e\u043b\u0438 \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438 \u041e\u043a\u0442\u043e\u043c\u0432\u0440\u0438 \u041d\u043e\u0435\u043c\u0432\u0440\u0438 \u0414\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split(" "),
                    dayOfWeekShort: "\u041d\u0434 \u041f\u043d \u0412\u0442 \u0421\u0440 \u0427\u0442 \u041f\u0442 \u0421\u0431".split(" "),
                    dayOfWeek: "\u041d\u0435\u0434\u0435\u043b\u044f \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u044f\u0434\u0430 \u0427\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a \u041f\u0435\u0442\u044a\u043a \u0421\u044a\u0431\u043e\u0442\u0430".split(" ")
                },
                fa: {
                    months: "\u0641\u0631\u0648\u0631\u062f\u06cc\u0646 \u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a \u062e\u0631\u062f\u0627\u062f \u062a\u06cc\u0631 \u0645\u0631\u062f\u0627\u062f \u0634\u0647\u0631\u06cc\u0648\u0631 \u0645\u0647\u0631 \u0622\u0628\u0627\u0646 \u0622\u0630\u0631 \u062f\u06cc \u0628\u0647\u0645\u0646 \u0627\u0633\u0641\u0646\u062f".split(" "),
                    dayOfWeekShort: "\u06cc\u06a9\u0634\u0646\u0628\u0647;\u062f\u0648\u0634\u0646\u0628\u0647;\u0633\u0647 \u0634\u0646\u0628\u0647;\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647;\u067e\u0646\u062c\u0634\u0646\u0628\u0647;\u062c\u0645\u0639\u0647;\u0634\u0646\u0628\u0647".split(";"),
                    dayOfWeek: "\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647 \u062f\u0648\u0634\u0646\u0628\u0647 \u0633\u0647\u200c\u0634\u0646\u0628\u0647 \u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647 \u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647 \u062c\u0645\u0639\u0647 \u0634\u0646\u0628\u0647 \u06cc\u06a9\u200c\u0634\u0646\u0628\u0647".split(" ")
                },
                ru: {
                    months: "\u042f\u043d\u0432\u0430\u0440\u044c \u0424\u0435\u0432\u0440\u0430\u043b\u044c \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0435\u043b\u044c \u041c\u0430\u0439 \u0418\u044e\u043d\u044c \u0418\u044e\u043b\u044c \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u041e\u043a\u0442\u044f\u0431\u0440\u044c \u041d\u043e\u044f\u0431\u0440\u044c \u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
                    dayOfWeekShort: "\u0412\u0441 \u041f\u043d \u0412\u0442 \u0421\u0440 \u0427\u0442 \u041f\u0442 \u0421\u0431".split(" "),
                    dayOfWeek: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u041f\u044f\u0442\u043d\u0438\u0446\u0430 \u0421\u0443\u0431\u0431\u043e\u0442\u0430".split(" ")
                },
                uk: {
                    months: "\u0421\u0456\u0447\u0435\u043d\u044c \u041b\u044e\u0442\u0438\u0439 \u0411\u0435\u0440\u0435\u0437\u0435\u043d\u044c \u041a\u0432\u0456\u0442\u0435\u043d\u044c \u0422\u0440\u0430\u0432\u0435\u043d\u044c \u0427\u0435\u0440\u0432\u0435\u043d\u044c \u041b\u0438\u043f\u0435\u043d\u044c \u0421\u0435\u0440\u043f\u0435\u043d\u044c \u0412\u0435\u0440\u0435\u0441\u0435\u043d\u044c \u0416\u043e\u0432\u0442\u0435\u043d\u044c \u041b\u0438\u0441\u0442\u043e\u043f\u0430\u0434 \u0413\u0440\u0443\u0434\u0435\u043d\u044c".split(" "),
                    dayOfWeekShort: "\u041d\u0434\u043b \u041f\u043d\u0434 \u0412\u0442\u0440 \u0421\u0440\u0434 \u0427\u0442\u0432 \u041f\u0442\u043d \u0421\u0431\u0442".split(" "),
                    dayOfWeek: "\u041d\u0435\u0434\u0456\u043b\u044f \u041f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a \u0412\u0456\u0432\u0442\u043e\u0440\u043e\u043a \u0421\u0435\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0435\u0440 \u041f'\u044f\u0442\u043d\u0438\u0446\u044f \u0421\u0443\u0431\u043e\u0442\u0430".split(" ")
                },
                en: {
                    months: "January February March April May June July August September October November December".split(" "),
                    dayOfWeekShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    dayOfWeek: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
                },
                el: {
                    months: "\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2 \u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2 \u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2 \u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2 \u039c\u03ac\u03b9\u03bf\u03c2 \u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2 \u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2 \u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2 \u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2 \u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2 \u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2 \u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split(" "),
                    dayOfWeekShort: "\u039a\u03c5\u03c1 \u0394\u03b5\u03c5 \u03a4\u03c1\u03b9 \u03a4\u03b5\u03c4 \u03a0\u03b5\u03bc \u03a0\u03b1\u03c1 \u03a3\u03b1\u03b2".split(" "),
                    dayOfWeek: "\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae \u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1 \u03a4\u03c1\u03af\u03c4\u03b7 \u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7 \u03a0\u03ad\u03bc\u03c0\u03c4\u03b7 \u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae \u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split(" ")
                },
                de: {
                    months: "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(" "),
                    dayOfWeekShort: "So Mo Di Mi Do Fr Sa".split(" "),
                    dayOfWeek: "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" ")
                },
                nl: {
                    months: "januari februari maart april mei juni juli augustus september oktober november december".split(" "),
                    dayOfWeekShort: "zo ma di wo do vr za".split(" "),
                    dayOfWeek: "zondag maandag dinsdag woensdag donderdag vrijdag zaterdag".split(" ")
                },
                tr: {
                    months: "Ocak \u015eubat Mart Nisan May\u0131s Haziran Temmuz A\u011fustos Eyl\u00fcl Ekim Kas\u0131m Aral\u0131k".split(" "),
                    dayOfWeekShort: "Paz Pts Sal \u00c7ar Per Cum Cts".split(" "),
                    dayOfWeek: "Pazar Pazartesi Sal\u0131 \u00c7ar\u015famba Per\u015fembe Cuma Cumartesi".split(" ")
                },
                fr: {
                    months: "Janvier F\u00e9vrier Mars Avril Mai Juin Juillet Ao\u00fbt Septembre Octobre Novembre D\u00e9cembre".split(" "),
                    dayOfWeekShort: "Dim Lun Mar Mer Jeu Ven Sam".split(" "),
                    dayOfWeek: "dimanche lundi mardi mercredi jeudi vendredi samedi".split(" ")
                },
                es: {
                    months: "Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre".split(" "),
                    dayOfWeekShort: "Dom Lun Mar Mi\u00e9 Jue Vie S\u00e1b".split(" "),
                    dayOfWeek: "Domingo Lunes Martes Mi\u00e9rcoles Jueves Viernes S\u00e1bado".split(" ")
                },
                th: {
                    months: "\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21 \u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c \u0e21\u0e35\u0e19\u0e32\u0e04\u0e21 \u0e40\u0e21\u0e29\u0e32\u0e22\u0e19 \u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21 \u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19 \u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21 \u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21 \u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19 \u0e15\u0e38\u0e25\u0e32\u0e04\u0e21 \u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19 \u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split(" "),
                    dayOfWeekShort: "\u0e2d\u0e32. \u0e08. \u0e2d. \u0e1e. \u0e1e\u0e24. \u0e28. \u0e2a.".split(" "),
                    dayOfWeek: "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c \u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c \u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23 \u0e1e\u0e38\u0e18 \u0e1e\u0e24\u0e2b\u0e31\u0e2a \u0e28\u0e38\u0e01\u0e23\u0e4c \u0e40\u0e2a\u0e32\u0e23\u0e4c \u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c".split(" ")
                },
                pl: {
                    months: "stycze\u0144 luty marzec kwiecie\u0144 maj czerwiec lipiec sierpie\u0144 wrzesie\u0144 pa\u017adziernik listopad grudzie\u0144".split(" "),
                    dayOfWeekShort: "nd pn wt \u015br cz pt sb".split(" "),
                    dayOfWeek: "niedziela poniedzia\u0142ek wtorek \u015broda czwartek pi\u0105tek sobota".split(" ")
                },
                pt: {
                    months: "Janeiro Fevereiro Mar\u00e7o Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro".split(" "),
                    dayOfWeekShort: "Dom Seg Ter Qua Qui Sex Sab".split(" "),
                    dayOfWeek: "Domingo Segunda Ter\u00e7a Quarta Quinta Sexta S\u00e1bado".split(" ")
                },
                ch: {
                    months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
                    dayOfWeekShort: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split("")
                },
                se: {
                    months: "Januari Februari Mars April Maj Juni Juli Augusti September Oktober November December".split(" "),
                    dayOfWeekShort: "S\u00f6n M\u00e5n Tis Ons Tor Fre L\u00f6r".split(" ")
                },
                km: {
                    months: "\u1798\u1780\u179a\u17b6\u200b \u1780\u17bb\u1798\u17d2\u1797\u17c8 \u1798\u17b7\u1793\u17b6\u200b \u1798\u17c1\u179f\u17b6\u200b \u17a7\u179f\u1797\u17b6\u200b \u1798\u17b7\u1790\u17bb\u1793\u17b6\u200b \u1780\u1780\u17d2\u1780\u178a\u17b6\u200b \u179f\u17b8\u17a0\u17b6\u200b \u1780\u1789\u17d2\u1789\u17b6\u200b \u178f\u17bb\u179b\u17b6\u200b \u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6 \u1792\u17d2\u1793\u17bc\u200b".split(" "),
                    dayOfWeekShort: "\u17a2\u17b6\u1791\u17b7\u200b \u1785\u17d0\u1793\u17d2\u1791\u200b \u17a2\u1784\u17d2\u1782\u17b6\u179a\u200b \u1796\u17bb\u1792\u200b \u1796\u17d2\u179a\u17a0\u200b\u200b \u179f\u17bb\u1780\u17d2\u179a\u200b \u179f\u17c5\u179a\u17cd".split(" "),
                    dayOfWeek: "\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799\u200b \u1785\u17d0\u1793\u17d2\u1791\u200b \u17a2\u1784\u17d2\u1782\u17b6\u179a\u200b \u1796\u17bb\u1792\u200b \u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd\u200b \u179f\u17bb\u1780\u17d2\u179a\u200b \u179f\u17c5\u179a\u17cd".split(" ")
                },
                kr: {
                    months: "1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "),
                    dayOfWeekShort: "\uc77c\uc6d4\ud654\uc218\ubaa9\uae08\ud1a0".split(""),
                    dayOfWeek: "\uc77c\uc694\uc77c \uc6d4\uc694\uc77c \ud654\uc694\uc77c \uc218\uc694\uc77c \ubaa9\uc694\uc77c \uae08\uc694\uc77c \ud1a0\uc694\uc77c".split(" ")
                },
                it: {
                    months: "Gennaio Febbraio Marzo Aprile Maggio Giugno Luglio Agosto Settembre Ottobre Novembre Dicembre".split(" "),
                    dayOfWeekShort: "Dom Lun Mar Mer Gio Ven Sab".split(" "),
                    dayOfWeek: "Domenica Luned\u00ec Marted\u00ec Mercoled\u00ec Gioved\u00ec Venerd\u00ec Sabato".split(" ")
                },
                da: {
                    months: "Januar Februar Marts April Maj Juni Juli August September Oktober November December".split(" "),
                    dayOfWeekShort: "S\u00f8n Man Tir Ons Tor Fre L\u00f8r".split(" "),
                    dayOfWeek: "s\u00f8ndag mandag tirsdag onsdag torsdag fredag l\u00f8rdag".split(" ")
                },
                no: {
                    months: "Januar Februar Mars April Mai Juni Juli August September Oktober November Desember".split(" "),
                    dayOfWeekShort: "S\u00f8n Man Tir Ons Tor Fre L\u00f8r".split(" "),
                    dayOfWeek: "S\u00f8ndag Mandag Tirsdag Onsdag Torsdag Fredag L\u00f8rdag".split(" ")
                },
                ja: {
                    months: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
                    dayOfWeekShort: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
                    dayOfWeek: "\u65e5\u66dc \u6708\u66dc \u706b\u66dc \u6c34\u66dc \u6728\u66dc \u91d1\u66dc \u571f\u66dc".split(" ")
                },
                vi: {
                    months: "Th\u00e1ng 1;Th\u00e1ng 2;Th\u00e1ng 3;Th\u00e1ng 4;Th\u00e1ng 5;Th\u00e1ng 6;Th\u00e1ng 7;Th\u00e1ng 8;Th\u00e1ng 9;Th\u00e1ng 10;Th\u00e1ng 11;Th\u00e1ng 12".split(";"),
                    dayOfWeekShort: "CN T2 T3 T4 T5 T6 T7".split(" "),
                    dayOfWeek: "Ch\u1ee7 nh\u1eadt;Th\u1ee9 hai;Th\u1ee9 ba;Th\u1ee9 t\u01b0;Th\u1ee9 n\u0103m;Th\u1ee9 s\u00e1u;Th\u1ee9 b\u1ea3y".split(";")
                },
                sl: {
                    months: "Januar Februar Marec April Maj Junij Julij Avgust September Oktober November December".split(" "),
                    dayOfWeekShort: "Ned Pon Tor Sre \u010cet Pet Sob".split(" "),
                    dayOfWeek: "Nedelja Ponedeljek Torek Sreda \u010cetrtek Petek Sobota".split(" ")
                },
                cs: {
                    months: "Leden \u00danor B\u0159ezen Duben Kv\u011bten \u010cerven \u010cervenec Srpen Z\u00e1\u0159\u00ed \u0158\u00edjen Listopad Prosinec".split(" "),
                    dayOfWeekShort: "Ne Po \u00dat St \u010ct P\u00e1 So".split(" ")
                },
                hu: {
                    months: "Janu\u00e1r Febru\u00e1r M\u00e1rcius \u00c1prilis M\u00e1jus J\u00fanius J\u00falius Augusztus Szeptember Okt\u00f3ber November December".split(" "),
                    dayOfWeekShort: "Va H\u00e9 Ke Sze Cs P\u00e9 Szo".split(" "),
                    dayOfWeek: "vas\u00e1rnap h\u00e9tf\u0151 kedd szerda cs\u00fct\u00f6rt\u00f6k p\u00e9ntek szombat".split(" ")
                },
                az: {
                    months: "Yanvar Fevral Mart Aprel May Iyun Iyul Avqust Sentyabr Oktyabr Noyabr Dekabr".split(" "),
                    dayOfWeekShort: "B Be \u00c7a \u00c7 Ca C \u015e".split(" "),
                    dayOfWeek: "Bazar;Bazar ert\u0259si;\u00c7\u0259r\u015f\u0259nb\u0259 ax\u015fam\u0131;\u00c7\u0259r\u015f\u0259nb\u0259;C\u00fcm\u0259 ax\u015fam\u0131;C\u00fcm\u0259;\u015e\u0259nb\u0259".split(";")
                },
                bs: {
                    months: "Januar Februar Mart April Maj Jun Jul Avgust Septembar Oktobar Novembar Decembar".split(" "),
                    dayOfWeekShort: "Ned Pon Uto Sri \u010cet Pet Sub".split(" "),
                    dayOfWeek: "Nedjelja Ponedjeljak Utorak Srijeda \u010cetvrtak Petak Subota".split(" ")
                },
                ca: {
                    months: "Gener Febrer Mar\u00e7 Abril Maig Juny Juliol Agost Setembre Octubre Novembre Desembre".split(" "),
                    dayOfWeekShort: "Dg Dl Dt Dc Dj Dv Ds".split(" "),
                    dayOfWeek: "Diumenge Dilluns Dimarts Dimecres Dijous Divendres Dissabte".split(" ")
                },
                "en-GB": {
                    months: "January February March April May June July August September October November December".split(" "),
                    dayOfWeekShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    dayOfWeek: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
                },
                et: {
                    months: "Jaanuar Veebruar M\u00e4rts Aprill Mai Juuni Juuli August September Oktoober November Detsember".split(" "),
                    dayOfWeekShort: "PETKNRL".split(""),
                    dayOfWeek: "P\u00fchap\u00e4ev Esmasp\u00e4ev Teisip\u00e4ev Kolmap\u00e4ev Neljap\u00e4ev Reede Laup\u00e4ev".split(" ")
                },
                eu: {
                    months: "Urtarrila Otsaila Martxoa Apirila Maiatza Ekaina Uztaila Abuztua Iraila Urria Azaroa Abendua".split(" "),
                    dayOfWeekShort: "Ig. Al. Ar. Az. Og. Or. La.".split(" "),
                    dayOfWeek: "Igandea Astelehena Asteartea Asteazkena Osteguna Ostirala Larunbata".split(" ")
                },
                fi: {
                    months: "Tammikuu Helmikuu Maaliskuu Huhtikuu Toukokuu Kes\u00e4kuu Hein\u00e4kuu Elokuu Syyskuu Lokakuu Marraskuu Joulukuu".split(" "),
                    dayOfWeekShort: "Su Ma Ti Ke To Pe La".split(" "),
                    dayOfWeek: "sunnuntai maanantai tiistai keskiviikko torstai perjantai lauantai".split(" ")
                },
                gl: {
                    months: "Xan Feb Maz Abr Mai Xun Xul Ago Set Out Nov Dec".split(" "),
                    dayOfWeekShort: "Dom Lun Mar Mer Xov Ven Sab".split(" "),
                    dayOfWeek: "Domingo Luns Martes M\u00e9rcores Xoves Venres S\u00e1bado".split(" ")
                },
                hr: {
                    months: "Sije\u010danj Velja\u010da O\u017eujak Travanj Svibanj Lipanj Srpanj Kolovoz Rujan Listopad Studeni Prosinac".split(" "),
                    dayOfWeekShort: "Ned Pon Uto Sri \u010cet Pet Sub".split(" "),
                    dayOfWeek: "Nedjelja Ponedjeljak Utorak Srijeda \u010cetvrtak Petak Subota".split(" ")
                },
                ko: {
                    months: "1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "),
                    dayOfWeekShort: "\uc77c\uc6d4\ud654\uc218\ubaa9\uae08\ud1a0".split(""),
                    dayOfWeek: "\uc77c\uc694\uc77c \uc6d4\uc694\uc77c \ud654\uc694\uc77c \uc218\uc694\uc77c \ubaa9\uc694\uc77c \uae08\uc694\uc77c \ud1a0\uc694\uc77c".split(" ")
                },
                lt: {
                    months: "Sausio Vasario Kovo Baland\u017eio Gegu\u017e\u0117s Bir\u017eelio Liepos Rugpj\u016b\u010dio Rugs\u0117jo Spalio Lapkri\u010dio Gruod\u017eio".split(" "),
                    dayOfWeekShort: "Sek Pir Ant Tre Ket Pen \u0160e\u0161".split(" "),
                    dayOfWeek: "Sekmadienis Pirmadienis Antradienis Tre\u010diadienis Ketvirtadienis Penktadienis \u0160e\u0161tadienis".split(" ")
                },
                lv: {
                    months: "Janv\u0101ris;Febru\u0101ris;Marts;Apr\u012blis ;Maijs;J\u016bnijs;J\u016blijs;Augusts;Septembris;Oktobris;Novembris;Decembris".split(";"),
                    dayOfWeekShort: "Sv Pr Ot Tr Ct Pk St".split(" "),
                    dayOfWeek: "Sv\u0113tdiena Pirmdiena Otrdiena Tre\u0161diena Ceturtdiena Piektdiena Sestdiena".split(" ")
                },
                mk: {
                    months: "\u0458\u0430\u043d\u0443\u0430\u0440\u0438 \u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438 \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0438\u043b \u043c\u0430\u0458 \u0458\u0443\u043d\u0438 \u0458\u0443\u043b\u0438 \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438 \u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438 \u043d\u043e\u0435\u043c\u0432\u0440\u0438 \u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split(" "),
                    dayOfWeekShort: "\u043d\u0435\u0434 \u043f\u043e\u043d \u0432\u0442\u043e \u0441\u0440\u0435 \u0447\u0435\u0442 \u043f\u0435\u0442 \u0441\u0430\u0431".split(" "),
                    dayOfWeek: "\u041d\u0435\u0434\u0435\u043b\u0430 \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0440\u0442\u043e\u043a \u041f\u0435\u0442\u043e\u043a \u0421\u0430\u0431\u043e\u0442\u0430".split(" ")
                },
                mn: {
                    months: "1-\u0440 \u0441\u0430\u0440;2-\u0440 \u0441\u0430\u0440;3-\u0440 \u0441\u0430\u0440;4-\u0440 \u0441\u0430\u0440;5-\u0440 \u0441\u0430\u0440;6-\u0440 \u0441\u0430\u0440;7-\u0440 \u0441\u0430\u0440;8-\u0440 \u0441\u0430\u0440;9-\u0440 \u0441\u0430\u0440;10-\u0440 \u0441\u0430\u0440;11-\u0440 \u0441\u0430\u0440;12-\u0440 \u0441\u0430\u0440".split(";"),
                    dayOfWeekShort: "\u0414\u0430\u0432 \u041c\u044f\u0433 \u041b\u0445\u0430 \u041f\u04af\u0440 \u0411\u0441\u043d \u0411\u044f\u043c \u041d\u044f\u043c".split(" "),
                    dayOfWeek: "\u0414\u0430\u0432\u0430\u0430 \u041c\u044f\u0433\u043c\u0430\u0440 \u041b\u0445\u0430\u0433\u0432\u0430 \u041f\u04af\u0440\u044d\u0432 \u0411\u0430\u0430\u0441\u0430\u043d \u0411\u044f\u043c\u0431\u0430 \u041d\u044f\u043c".split(" ")
                },
                "pt-BR": {
                    months: "Janeiro Fevereiro Mar\u00e7o Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro".split(" "),
                    dayOfWeekShort: "Dom Seg Ter Qua Qui Sex S\u00e1b".split(" "),
                    dayOfWeek: "Domingo Segunda Ter\u00e7a Quarta Quinta Sexta S\u00e1bado".split(" ")
                },
                sk: {
                    months: "Janu\u00e1r Febru\u00e1r Marec Apr\u00edl M\u00e1j J\u00fan J\u00fal August September Okt\u00f3ber November December".split(" "),
                    dayOfWeekShort: "Ne Po Ut St \u0160t Pi So".split(" "),
                    dayOfWeek: "Nede\u013ea Pondelok Utorok Streda \u0160tvrtok Piatok Sobota".split(" ")
                },
                sq: {
                    months: "Janar Shkurt Mars Prill Maj Qershor Korrik Gusht Shtator Tetor N\u00ebntor Dhjetor".split(" "),
                    dayOfWeekShort: "Die H\u00ebn Mar M\u00ebr Enj Pre Shtu".split(" "),
                    dayOfWeek: "E Diel;E H\u00ebn\u00eb;E Mart\u0113;E M\u00ebrkur\u00eb;E Enjte;E Premte;E Shtun\u00eb".split(";")
                },
                "sr-YU": {
                    months: "Januar Februar Mart April Maj Jun Jul Avgust Septembar Oktobar Novembar Decembar".split(" "),
                    dayOfWeekShort: "Ned Pon Uto Sre \u010det Pet Sub".split(" "),
                    dayOfWeek: "Nedelja Ponedeljak Utorak Sreda \u010cetvrtak Petak Subota".split(" ")
                },
                sr: {
                    months: "\u0458\u0430\u043d\u0443\u0430\u0440 \u0444\u0435\u0431\u0440\u0443\u0430\u0440 \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0438\u043b \u043c\u0430\u0458 \u0458\u0443\u043d \u0458\u0443\u043b \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440 \u043e\u043a\u0442\u043e\u0431\u0430\u0440 \u043d\u043e\u0432\u0435\u043c\u0431\u0430\u0440 \u0434\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split(" "),
                    dayOfWeekShort: "\u043d\u0435\u0434 \u043f\u043e\u043d \u0443\u0442\u043e \u0441\u0440\u0435 \u0447\u0435\u0442 \u043f\u0435\u0442 \u0441\u0443\u0431".split(" "),
                    dayOfWeek: "\u041d\u0435\u0434\u0435\u0459\u0430 \u041f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a \u0423\u0442\u043e\u0440\u0430\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0440\u0442\u0430\u043a \u041f\u0435\u0442\u0430\u043a \u0421\u0443\u0431\u043e\u0442\u0430".split(" ")
                },
                sv: {
                    months: "Januari Februari Mars April Maj Juni Juli Augusti September Oktober November December".split(" "),
                    dayOfWeekShort: "S\u00f6n M\u00e5n Tis Ons Tor Fre L\u00f6r".split(" "),
                    dayOfWeek: "S\u00f6ndag M\u00e5ndag Tisdag Onsdag Torsdag Fredag L\u00f6rdag".split(" ")
                },
                "zh-TW": {
                    months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
                    dayOfWeekShort: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),
                    dayOfWeek: "\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d".split(" ")
                },
                zh: {
                    months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
                    dayOfWeekShort: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),
                    dayOfWeek: "\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d".split(" ")
                },
                ug: {
                    months: "1-\u0626\u0627\u064a 2-\u0626\u0627\u064a 3-\u0626\u0627\u064a 4-\u0626\u0627\u064a 5-\u0626\u0627\u064a 6-\u0626\u0627\u064a 7-\u0626\u0627\u064a 8-\u0626\u0627\u064a 9-\u0626\u0627\u064a 10-\u0626\u0627\u064a 11-\u0626\u0627\u064a 12-\u0626\u0627\u064a".split(" "),
                    dayOfWeek: "\u064a\u06d5\u0643\u0634\u06d5\u0646\u0628\u06d5 \u062f\u06c8\u0634\u06d5\u0646\u0628\u06d5 \u0633\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5 \u0686\u0627\u0631\u0634\u06d5\u0646\u0628\u06d5 \u067e\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5 \u062c\u06c8\u0645\u06d5 \u0634\u06d5\u0646\u0628\u06d5".split(" ")
                },
                he: {
                    months: "\u05d9\u05e0\u05d5\u05d0\u05e8 \u05e4\u05d1\u05e8\u05d5\u05d0\u05e8 \u05de\u05e8\u05e5 \u05d0\u05e4\u05e8\u05d9\u05dc \u05de\u05d0\u05d9 \u05d9\u05d5\u05e0\u05d9 \u05d9\u05d5\u05dc\u05d9 \u05d0\u05d5\u05d2\u05d5\u05e1\u05d8 \u05e1\u05e4\u05d8\u05de\u05d1\u05e8 \u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8 \u05e0\u05d5\u05d1\u05de\u05d1\u05e8 \u05d3\u05e6\u05de\u05d1\u05e8".split(" "),
                    dayOfWeekShort: "\u05d0' \u05d1' \u05d2' \u05d3' \u05d4' \u05d5' \u05e9\u05d1\u05ea".split(" "),
                    dayOfWeek: "\u05e8\u05d0\u05e9\u05d5\u05df \u05e9\u05e0\u05d9 \u05e9\u05dc\u05d9\u05e9\u05d9 \u05e8\u05d1\u05d9\u05e2\u05d9 \u05d7\u05de\u05d9\u05e9\u05d9 \u05e9\u05d9\u05e9\u05d9 \u05e9\u05d1\u05ea \u05e8\u05d0\u05e9\u05d5\u05df".split(" ")
                },
                hy: {
                    months: "\u0540\u0578\u0582\u0576\u057e\u0561\u0580 \u0553\u0565\u057f\u0580\u057e\u0561\u0580 \u0544\u0561\u0580\u057f \u0531\u057a\u0580\u056b\u056c \u0544\u0561\u0575\u056b\u057d \u0540\u0578\u0582\u0576\u056b\u057d \u0540\u0578\u0582\u056c\u056b\u057d \u0555\u0563\u0578\u057d\u057f\u0578\u057d \u054d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580 \u0540\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580 \u0546\u0578\u0575\u0565\u0574\u0562\u0565\u0580 \u0534\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split(" "),
                    dayOfWeekShort: "\u053f\u056b \u0535\u0580\u056f \u0535\u0580\u0584 \u0549\u0578\u0580 \u0540\u0576\u0563 \u0548\u0582\u0580\u0562 \u0547\u0562\u0569".split(" "),
                    dayOfWeek: "\u053f\u056b\u0580\u0561\u056f\u056b \u0535\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b \u0535\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0549\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0540\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b \u0548\u0582\u0580\u0562\u0561\u0569 \u0547\u0561\u0562\u0561\u0569".split(" ")
                },
                kg: {
                    months: "\u04ae\u0447\u0442\u04af\u043d \u0430\u0439\u044b;\u0411\u0438\u0440\u0434\u0438\u043d \u0430\u0439\u044b;\u0416\u0430\u043b\u0433\u0430\u043d \u041a\u0443\u0440\u0430\u043d;\u0427\u044b\u043d \u041a\u0443\u0440\u0430\u043d;\u0411\u0443\u0433\u0443;\u041a\u0443\u043b\u0436\u0430;\u0422\u0435\u043a\u0435;\u0411\u0430\u0448 \u041e\u043e\u043d\u0430;\u0410\u044f\u043a \u041e\u043e\u043d\u0430;\u0422\u043e\u0433\u0443\u0437\u0434\u0443\u043d \u0430\u0439\u044b;\u0416\u0435\u0442\u0438\u043d\u0438\u043d \u0430\u0439\u044b;\u0411\u0435\u0448\u0442\u0438\u043d \u0430\u0439\u044b".split(";"),
                    dayOfWeekShort: "\u0416\u0435\u043a \u0414\u04af\u0439 \u0428\u0435\u0439 \u0428\u0430\u0440 \u0411\u0435\u0439 \u0416\u0443\u043c \u0418\u0448\u0435".split(" "),
                    dayOfWeek: "\u0416\u0435\u043a\u0448\u0435\u043c\u0431 \u0414\u04af\u0439\u0448\u04e9\u043c\u0431 \u0428\u0435\u0439\u0448\u0435\u043c\u0431 \u0428\u0430\u0440\u0448\u0435\u043c\u0431 \u0411\u0435\u0439\u0448\u0435\u043c\u0431\u0438 \u0416\u0443\u043c\u0430 \u0418\u0448\u0435\u043d\u0431".split(" ")
                },
                rm: {
                    months: "Schaner Favrer Mars Avrigl Matg Zercladur Fanadur Avust Settember October November December".split(" "),
                    dayOfWeekShort: "Du Gli Ma Me Gie Ve So".split(" "),
                    dayOfWeek: "Dumengia Glindesdi Mardi Mesemna Gievgia Venderdi Sonda".split(" ")
                },
                ka: {
                    months: "\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8 \u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8 \u10db\u10d0\u10e0\u10e2\u10d8 \u10d0\u10de\u10e0\u10d8\u10da\u10d8 \u10db\u10d0\u10d8\u10e1\u10d8 \u10d8\u10d5\u10dc\u10d8\u10e1\u10d8 \u10d8\u10d5\u10da\u10d8\u10e1\u10d8 \u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd \u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8 \u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8 \u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8 \u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8".split(" "),
                    dayOfWeekShort: "\u10d9\u10d5 \u10dd\u10e0\u10e8 \u10e1\u10d0\u10db\u10e8 \u10dd\u10d7\u10ee \u10ee\u10e3\u10d7 \u10de\u10d0\u10e0 \u10e8\u10d0\u10d1".split(" "),
                    dayOfWeek: "\u10d9\u10d5\u10d8\u10e0\u10d0 \u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8 \u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8 \u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8 \u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8 \u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8 \u10e8\u10d0\u10d1\u10d0\u10d7\u10d8".split(" ")
                }
            },
            ownerDocument: document,
            contentWindow: window,
            value: "",
            rtl: !1,
            format: "Y/m/d H:i",
            formatTime: "H:i",
            formatDate: "Y/m/d",
            startDate: !1,
            step: 60,
            monthChangeSpinner: !0,
            closeOnDateSelect: !1,
            closeOnTimeSelect: !0,
            closeOnWithoutClick: !0,
            closeOnInputClick: !0,
            openOnFocus: !0,
            timepicker: !0,
            datepicker: !0,
            weeks: !1,
            defaultTime: !1,
            defaultDate: !1,
            minDate: !1,
            maxDate: !1,
            minTime: !1,
            maxTime: !1,
            minDateTime: !1,
            maxDateTime: !1,
            allowTimes: [],
            opened: !1,
            initTime: !0,
            inline: !1,
            theme: "",
            touchMovedThreshold: 5,
            onSelectDate: function() {},
            onSelectTime: function() {},
            onChangeMonth: function() {},
            onGetWeekOfYear: function() {},
            onChangeYear: function() {},
            onChangeDateTime: function() {},
            onShow: function() {},
            onClose: function() {},
            onGenerate: function() {},
            withoutCopyright: !0,
            inverseButton: !1,
            hours12: !1,
            next: "xdsoft_next",
            prev: "xdsoft_prev",
            dayOfWeekStart: 0,
            parentID: "body",
            timeHeightInTimePicker: 25,
            timepickerScrollbar: !0,
            todayButton: !0,
            prevButton: !0,
            nextButton: !0,
            defaultSelect: !0,
            scrollMonth: !0,
            scrollTime: !0,
            scrollInput: !0,
            lazyInit: !1,
            mask: !1,
            validateOnBlur: !0,
            allowBlank: !0,
            yearStart: 1950,
            yearEnd: 2050,
            monthStart: 0,
            monthEnd: 11,
            style: "",
            id: "",
            fixed: !1,
            roundTime: "round",
            className: "",
            weekends: [],
            highlightedDates: [],
            highlightedPeriods: [],
            allowDates: [],
            allowDateRe: null,
            disabledDates: [],
            disabledWeekDays: [],
            yearOffset: 0,
            beforeShowDay: null,
            enterLikeTab: !0,
            showApplyButton: !1,
            insideParent: !1
        },
        k = null,
        m = null,
        r = "en",
        e = {
            meridiem: ["AM", "PM"]
        },
        c = function() {
            var d = p.i18n[r];
            d = {
                days: d.dayOfWeek,
                daysShort: d.dayOfWeekShort,
                months: d.months,
                monthsShort: a.map(d.months, function(a) {
                    return a.substring(0,
                        3)
                })
            };
            "function" === typeof DateFormatter && (k = m = new DateFormatter({
                dateSettings: a.extend({}, e, d)
            }))
        },
        G = {
            moment: {
                default_options: {
                    format: "YYYY/MM/DD HH:mm",
                    formatDate: "YYYY/MM/DD",
                    formatTime: "HH:mm"
                },
                formatter: {
                    parseDate: function(a, e) {
                        if (n(e)) return m.parseDate(a, e);
                        a = moment(a, e);
                        return a.isValid() ? a.toDate() : !1
                    },
                    formatDate: function(a, e) {
                        return n(e) ? m.formatDate(a, e) : moment(a).format(e)
                    },
                    formatMask: function(a) {
                        return a.replace(/Y{4}/g, "9999").replace(/Y{2}/g, "99").replace(/M{2}/g, "19").replace(/D{2}/g,
                            "39").replace(/H{2}/g, "29").replace(/m{2}/g, "59").replace(/s{2}/g, "59")
                    }
                }
            }
        };
    a.datetimepicker = {
        setLocale: function(a) {
            a = p.i18n[a] ? a : "en";
            r !== a && (r = a, c())
        },
        setDateFormatter: function(d) {
            "string" === typeof d && G.hasOwnProperty(d) ? (d = G[d], a.extend(p, d.default_options), k = d.formatter) : k = d
        }
    };
    var z = {
            RFC_2822: "D, d M Y H:i:s O",
            ATOM: "Y-m-dTH:i:sP",
            ISO_8601: "Y-m-dTH:i:sO",
            RFC_822: "D, d M y H:i:s O",
            RFC_850: "l, d-M-y H:i:s T",
            RFC_1036: "D, d M y H:i:s O",
            RFC_1123: "D, d M Y H:i:s O",
            RSS: "D, d M Y H:i:s O",
            W3C: "Y-m-dTH:i:sP"
        },
        n = function(a) {
            return -1 === Object.values(z).indexOf(a) ? !1 : !0
        };
    a.extend(a.datetimepicker, z);
    c();
    window.getComputedStyle || (window.getComputedStyle = function(a) {
        this.el = a;
        this.getPropertyValue = function(d) {
            var e = /(-([a-z]))/g;
            "float" === d && (d = "styleFloat");
            e.test(d) && (d = d.replace(e, function(a, b, d) {
                return d.toUpperCase()
            }));
            return a.currentStyle[d] || null
        };
        return this
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a, e) {
        var d;
        e = e || 0;
        for (d = this.length; e < d; e += 1)
            if (this[e] === a) return e;
        return -1
    });
    Date.prototype.countDaysInMonth = function() {
        return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate()
    };
    a.fn.xdsoftScroller = function(d, e) {
        return this.each(function() {
            var c = a(this),
                k = function(b) {
                    var a = {
                        x: 0,
                        y: 0
                    };
                    if ("touchstart" === b.type || "touchmove" === b.type || "touchend" === b.type || "touchcancel" === b.type) b = b.originalEvent.touches[0] || b.originalEvent.changedTouches[0], a.x = b.clientX, a.y = b.clientY;
                    else if ("mousedown" === b.type || "mouseup" === b.type || "mousemove" === b.type || "mouseover" === b.type || "mouseout" ===
                        b.type || "mouseenter" === b.type || "mouseleave" === b.type) a.x = b.clientX, a.y = b.clientY;
                    return a
                },
                b = 100,
                g = !1,
                n = 0,
                r = 0,
                p = 0,
                w = !1,
                m = 0,
                v = function() {};
            if ("hide" === e) c.find(".xdsoft_scrollbar").hide();
            else {
                if (!a(this).hasClass("xdsoft_scroller_box")) {
                    var h = c.children().eq(0);
                    var H = c[0].clientHeight;
                    var J = h[0].offsetHeight;
                    var K = a('<div class="xdsoft_scrollbar"></div>');
                    var F = a('<div class="xdsoft_scroller"></div>');
                    K.append(F);
                    c.addClass("xdsoft_scroller_box").append(K);
                    v = function(a) {
                        a = k(a).y - n + m;
                        0 > a && (a = 0);
                        a +
                            F[0].offsetHeight > p && (a = p - F[0].offsetHeight);
                        c.trigger("scroll_element.xdsoft_scroller", [b ? a / b : 0])
                    };
                    F.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function(b) {
                        H || c.trigger("resize_scroll.xdsoft_scroller", [e]);
                        n = k(b).y;
                        m = parseInt(F.css("margin-top"), 10);
                        p = K[0].offsetHeight;
                        "mousedown" === b.type || "touchstart" === b.type ? (d.ownerDocument && a(d.ownerDocument.body).addClass("xdsoft_noselect"), a([d.ownerDocument.body, d.contentWindow]).on("touchend mouseup.xdsoft_scroller", function B() {
                            a([d.ownerDocument.body,
                                d.contentWindow
                            ]).off("touchend mouseup.xdsoft_scroller", B).off("mousemove.xdsoft_scroller", v).removeClass("xdsoft_noselect")
                        }), a(d.ownerDocument.body).on("mousemove.xdsoft_scroller", v)) : (w = !0, b.stopPropagation(), b.preventDefault())
                    }).on("touchmove", function(b) {
                        w && (b.preventDefault(), v(b))
                    }).on("touchend touchcancel", function() {
                        w = !1;
                        m = 0
                    });
                    c.on("scroll_element.xdsoft_scroller", function(a, e) {
                        H || c.trigger("resize_scroll.xdsoft_scroller", [e, !0]);
                        e = 1 < e ? 1 : 0 > e || isNaN(e) ? 0 : e;
                        F.css("margin-top", b * e);
                        setTimeout(function() {
                            h.css("marginTop", -parseInt((h[0].offsetHeight - H) * e, 10))
                        }, 10)
                    }).on("resize_scroll.xdsoft_scroller", function(a, e, d) {
                        H = c[0].clientHeight;
                        J = h[0].offsetHeight;
                        a = H / J;
                        var k = a * K[0].offsetHeight;
                        1 < a ? F.hide() : (F.show(), F.css("height", parseInt(10 < k ? k : 10, 10)), b = K[0].offsetHeight - F[0].offsetHeight, !0 !== d && c.trigger("scroll_element.xdsoft_scroller", [e || Math.abs(parseInt(h.css("marginTop"), 10)) / (J - H)]))
                    });
                    c.on("mousewheel", function(b) {
                        var a = Math.abs(parseInt(h.css("marginTop"), 10));
                        a -= 20 * b.deltaY;
                        0 > a && (a = 0);
                        c.trigger("scroll_element.xdsoft_scroller", [a / (J - H)]);
                        b.stopPropagation();
                        return !1
                    });
                    c.on("touchstart", function(b) {
                        g = k(b);
                        r = Math.abs(parseInt(h.css("marginTop"), 10))
                    });
                    c.on("touchmove", function(b) {
                        g && (b.preventDefault(), b = k(b), c.trigger("scroll_element.xdsoft_scroller", [(r - (b.y - g.y)) / (J - H)]))
                    });
                    c.on("touchend touchcancel", function() {
                        g = !1;
                        r = 0
                    })
                }
                c.trigger("resize_scroll.xdsoft_scroller", [e])
            }
        })
    };
    a.fn.datetimepicker = function(e, c) {
        var d = this,
            n = !1,
            b = a.isPlainObject(e) || !e ? a.extend(!0, {}, p, e) : a.extend(!0, {}, p),
            m = 0,
            v = function(b) {
                b.on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                    function W() {
                        b.is(":disabled") || b.data("xdsoft_datetimepicker") || (clearTimeout(m), m = setTimeout(function() {
                            b.data("xdsoft_datetimepicker") || q(b);
                            b.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", W).trigger("open.xdsoft")
                        }, 100))
                    })
            };
        var q = function(c) {
            function d() {
                if (b.startDate) var a = l.strToDate(b.startDate);
                else if (a = b.value || (c && c.val && c.val() ? c.val() : "")) a = l.strToDateTime(a), b.yearOffset && (a = new Date(a.getFullYear() - b.yearOffset, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(),
                    a.getMilliseconds()));
                else if (b.defaultDate && (a = l.strToDateTime(b.defaultDate), b.defaultTime)) {
                    var u = l.strtotime(b.defaultTime);
                    a.setHours(u.getHours());
                    a.setMinutes(u.getMinutes())
                }
                a && l.isValidDate(a) ? h.data("changed", !0) : a = "";
                return a || 0
            }

            function t(b) {
                var f = function(b, a) {
                        b = b.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                        return (new RegExp(b)).test(a)
                    },
                    e =
                    function(a, f) {
                        a = "string" === typeof a || a instanceof String ? b.ownerDocument.getElementById(a) : a;
                        return a ? a.createTextRange ? (a = a.createTextRange(), a.collapse(!0), a.moveEnd("character", f), a.moveStart("character", f), a.select(), !0) : a.setSelectionRange ? (a.setSelectionRange(f, f), !0) : !1 : !1
                    };
                b.mask && c.off("keydown.xdsoft");
                !0 === b.mask && (b.mask = k.formatMask ? k.formatMask(b.format) : b.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g,
                    "59"));
                "string" === a.type(b.mask) && (f(b.mask, c.val()) || (c.val(b.mask.replace(/[0-9]/g, "_")), e(c[0], 0)), c.on("paste.xdsoft", function(u) {
                    var y = (u.clipboardData || u.originalEvent.clipboardData || window.clipboardData).getData("text"),
                        d = this.value,
                        h = this.selectionStart,
                        l = d.substr(0, h);
                    d = d.substr(h + y.length);
                    d = l + y + d;
                    h += y.length;
                    f(b.mask, d) ? (this.value = d, e(this, h)) : "" === a.trim(d) ? this.value = b.mask.replace(/[0-9]/g, "_") : c.trigger("error_input.xdsoft");
                    u.preventDefault();
                    return !1
                }), c.on("keydown.xdsoft", function(u) {
                    var y =
                        this.value,
                        d = u.which,
                        h = this.selectionStart,
                        l = this.selectionEnd,
                        k = h !== l;
                    if (48 <= d && 57 >= d || 96 <= d && 105 >= d || 8 === d || 46 === d) {
                        var N = 8 === d || 46 === d ? "_" : String.fromCharCode(96 <= d && 105 >= d ? d - 48 : d);
                        for (8 === d && h && !k && --h;;) {
                            var g = b.mask.substr(h, 1),
                                m = h < b.mask.length,
                                w = 0 < h;
                            if (!(/[^0-9_]/.test(g) && m && w)) break;
                            h += 8 !== d || k ? 1 : -1
                        }
                        u.metaKey && (h = 0, k = !0);
                        if (k) {
                            k = l - h;
                            var t = b.mask.replace(/[0-9]/g, "_");
                            g = t.substr(h, k).substr(1);
                            l = y.substr(0, h);
                            N += g;
                            y = y.substr(h + k);
                            y = l + N + y
                        } else l = y.substr(0, h), y = y.substr(h + 1), y = l + N + y;
                        if ("" ===
                            a.trim(y)) y = t;
                        else if (h === b.mask.length) return u.preventDefault(), !1;
                        for (h += 8 === d ? 0 : 1;
                            /[^0-9_]/.test(b.mask.substr(h, 1)) && h < b.mask.length && 0 < h;) h += 8 === d ? 0 : 1;
                        f(b.mask, y) ? (this.value = y, e(this, h)) : "" === a.trim(y) ? this.value = b.mask.replace(/[0-9]/g, "_") : c.trigger("error_input.xdsoft")
                    } else if (-1 !== [65, 67, 86, 90, 89].indexOf(d) && n || -1 !== [27, 38, 40, 37, 39, 116, 17, 9, 13].indexOf(d)) return !0;
                    u.preventDefault();
                    return !1
                }))
            }
            var h = a('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
                p = a('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
                w = a('<div class="xdsoft_datepicker active"></div>'),
                m = a('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),
                v = a('<div class="xdsoft_calendar"></div>'),
                x = a('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
                q = x.find(".xdsoft_time_box").eq(0),
                B = a('<div class="xdsoft_time_variant"></div>'),
                z = a('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
                E = a('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
                G = a('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
                M = !1,
                D = 0;
            b.id && h.attr("id", b.id);
            b.style && h.attr("style", b.style);
            b.weeks && h.addClass("xdsoft_showweeks");
            b.rtl && h.addClass("xdsoft_rtl");
            h.addClass("xdsoft_" + b.theme);
            h.addClass(b.className);
            m.find(".xdsoft_month span").after(E);
            m.find(".xdsoft_year span").after(G);
            m.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft", function(f) {
                var u = a(this).find(".xdsoft_select").eq(0),
                    y = 0,
                    e = 0,
                    c = u.is(":visible"),
                    d;
                m.find(".xdsoft_select").hide();
                l.currentTime && (y = l.currentTime[a(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]());
                u[c ? "hide" : "show"]();
                c = u.find("div.xdsoft_option");
                for (d = 0; d < c.length && c.eq(d).data("value") !== y; d += 1) e += c[0].offsetHeight;
                u.xdsoftScroller(b, e / (u.children()[0].offsetHeight -
                    u[0].clientHeight));
                f.stopPropagation();
                return !1
            });
            var L = function(a) {
                a = a.originalEvent;
                var f = a.touches ? a.touches[0] : a;
                this.touchStartPosition = this.touchStartPosition || f;
                a = Math.abs(this.touchStartPosition.clientX - f.clientX);
                f = Math.abs(this.touchStartPosition.clientY - f.clientY);
                Math.sqrt(a * a + f * f) > b.touchMovedThreshold && (this.touchMoved = !0)
            };
            m.find(".xdsoft_select").xdsoftScroller(b).on("touchstart mousedown.xdsoft", function(b) {
                var a = b.originalEvent;
                this.touchMoved = !1;
                this.touchStartPosition = a.touches ?
                    a.touches[0] : a;
                b.stopPropagation();
                b.preventDefault()
            }).on("touchmove", ".xdsoft_option", L).on("touchend mousedown.xdsoft", ".xdsoft_option", function() {
                if (!this.touchMoved) {
                    if (void 0 === l.currentTime || null === l.currentTime) l.currentTime = l.now();
                    var f = l.currentTime.getFullYear();
                    if (l && l.currentTime) l.currentTime[a(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"](a(this).data("value"));
                    a(this).parent().parent().hide();
                    h.trigger("xchange.xdsoft");
                    b.onChangeMonth && a.isFunction(b.onChangeMonth) &&
                        b.onChangeMonth.call(h, l.currentTime, h.data("input"));
                    f !== l.currentTime.getFullYear() && a.isFunction(b.onChangeYear) && b.onChangeYear.call(h, l.currentTime, h.data("input"))
                }
            });
            h.getValue = function() {
                return l.getCurrentTime()
            };
            h.setOptions = function(f) {
                var u = {};
                b = a.extend(!0, {}, b, f);
                f.allowTimes && a.isArray(f.allowTimes) && f.allowTimes.length && (b.allowTimes = a.extend(!0, [], f.allowTimes));
                f.weekends && a.isArray(f.weekends) && f.weekends.length && (b.weekends = a.extend(!0, [], f.weekends));
                f.allowDates && a.isArray(f.allowDates) &&
                    f.allowDates.length && (b.allowDates = a.extend(!0, [], f.allowDates));
                f.allowDateRe && "[object String]" === Object.prototype.toString.call(f.allowDateRe) && (b.allowDateRe = new RegExp(f.allowDateRe));
                f.highlightedDates && a.isArray(f.highlightedDates) && f.highlightedDates.length && (a.each(f.highlightedDates, function(f, c) {
                    f = a.map(c.split(","), a.trim);
                    c = new g(k.parseDate(f[0], b.formatDate), f[1], f[2]);
                    var e = k.formatDate(c.date, b.formatDate);
                    void 0 !== u[e] ? (f = u[e].desc) && f.length && c.desc && c.desc.length && (u[e].desc = f +
                        "\n" + c.desc) : u[e] = c
                }), b.highlightedDates = a.extend(!0, [], u));
                f.highlightedPeriods && a.isArray(f.highlightedPeriods) && f.highlightedPeriods.length && (u = a.extend(!0, [], b.highlightedDates), a.each(f.highlightedPeriods, function(f, c) {
                    var e;
                    if (a.isArray(c)) {
                        f = c[0];
                        var d = c[1];
                        var y = c[2];
                        var h = c[3]
                    } else c = a.map(c.split(","), a.trim), f = k.parseDate(c[0], b.formatDate), d = k.parseDate(c[1], b.formatDate), y = c[2], h = c[3];
                    for (; f <= d;) {
                        c = new g(f, y, h);
                        var l = k.formatDate(f, b.formatDate);
                        f.setDate(f.getDate() + 1);
                        void 0 !== u[l] ?
                            (e = u[l].desc) && e.length && c.desc && c.desc.length && (u[l].desc = e + "\n" + c.desc) : u[l] = c
                    }
                }), b.highlightedDates = a.extend(!0, [], u));
                f.disabledDates && a.isArray(f.disabledDates) && f.disabledDates.length && (b.disabledDates = a.extend(!0, [], f.disabledDates));
                f.disabledWeekDays && a.isArray(f.disabledWeekDays) && f.disabledWeekDays.length && (b.disabledWeekDays = a.extend(!0, [], f.disabledWeekDays));
                !b.open && !b.opened || b.inline || c.trigger("open.xdsoft");
                b.inline && (M = !0, h.addClass("xdsoft_inline"), c.after(h).hide());
                b.inverseButton &&
                    (b.next = "xdsoft_prev", b.prev = "xdsoft_next");
                b.datepicker ? w.addClass("active") : w.removeClass("active");
                b.timepicker ? x.addClass("active") : x.removeClass("active");
                b.value && (l.setCurrentTime(b.value), c && c.val && c.val(l.str));
                isNaN(b.dayOfWeekStart) ? b.dayOfWeekStart = 0 : b.dayOfWeekStart = parseInt(b.dayOfWeekStart, 10) % 7;
                b.timepickerScrollbar || q.xdsoftScroller(b, "hide");
                b.minDate && /^[\+\-](.*)$/.test(b.minDate) && (b.minDate = k.formatDate(l.strToDateTime(b.minDate), b.formatDate));
                b.maxDate && /^[\+\-](.*)$/.test(b.maxDate) &&
                    (b.maxDate = k.formatDate(l.strToDateTime(b.maxDate), b.formatDate));
                b.minDateTime && /^\+(.*)$/.test(b.minDateTime) && (b.minDateTime = l.strToDateTime(b.minDateTime).dateFormat(b.formatDate));
                b.maxDateTime && /^\+(.*)$/.test(b.maxDateTime) && (b.maxDateTime = l.strToDateTime(b.maxDateTime).dateFormat(b.formatDate));
                z.toggle(b.showApplyButton);
                m.find(".xdsoft_today_button").css("visibility", b.todayButton ? "visible" : "hidden");
                m.find("." + b.prev).css("visibility", b.prevButton ? "visible" : "hidden");
                m.find("." + b.next).css("visibility",
                    b.nextButton ? "visible" : "hidden");
                t(b);
                if (b.validateOnBlur) c.off("blur.xdsoft").on("blur.xdsoft", function() {
                    if (b.allowBlank && (!a.trim(a(this).val()).length || "string" === typeof b.mask && a.trim(a(this).val()) === b.mask.replace(/[0-9]/g, "_"))) a(this).val(null), h.data("xdsoft_datetime").empty();
                    else {
                        var f = k.parseDate(a(this).val(), b.format);
                        if (f) a(this).val(k.formatDate(f, b.format));
                        else {
                            f = +[a(this).val()[0], a(this).val()[1]].join("");
                            var c = +[a(this).val()[2], a(this).val()[3]].join("");
                            !b.datepicker && b.timepicker &&
                                0 <= f && 24 > f && 0 <= c && 60 > c ? a(this).val([f, c].map(function(b) {
                                    return 9 < b ? b : "0" + b
                                }).join(":")) : a(this).val(k.formatDate(l.now(), b.format))
                        }
                        h.data("xdsoft_datetime").setCurrentTime(a(this).val())
                    }
                    h.trigger("changedatetime.xdsoft");
                    h.trigger("close.xdsoft")
                });
                b.dayOfWeekStartPrev = 0 === b.dayOfWeekStart ? 6 : b.dayOfWeekStart - 1;
                h.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")
            };
            h.data("options", b).on("touchstart mousedown.xdsoft", function(b) {
                b.stopPropagation();
                b.preventDefault();
                G.hide();
                E.hide();
                return !1
            });
            q.append(B);
            q.xdsoftScroller(b);
            h.on("afterOpen.xdsoft", function() {
                q.xdsoftScroller(b)
            });
            h.append(w).append(x);
            !0 !== b.withoutCopyright && h.append(p);
            w.append(m).append(v).append(z);
            b.insideParent ? a(c).parent().append(h) : a(b.parentID).append(h);
            var l = new function() {
                var f = this;
                f.now = function(a) {
                    var c = new Date;
                    if (!a && b.defaultDate) {
                        var e = f.strToDateTime(b.defaultDate);
                        c.setFullYear(e.getFullYear());
                        c.setMonth(e.getMonth());
                        c.setDate(e.getDate())
                    }
                    c.setFullYear(c.getFullYear());
                    !a && b.defaultTime && (a = f.strtotime(b.defaultTime),
                        c.setHours(a.getHours()), c.setMinutes(a.getMinutes()), c.setSeconds(a.getSeconds()), c.setMilliseconds(a.getMilliseconds()));
                    return c
                };
                f.isValidDate = function(b) {
                    return "[object Date]" !== Object.prototype.toString.call(b) ? !1 : !isNaN(b.getTime())
                };
                f.setCurrentTime = function(a, c) {
                    "string" === typeof a ? f.currentTime = f.strToDateTime(a) : f.isValidDate(a) ? f.currentTime = a : f.currentTime = a || c || !b.allowBlank || b.inline ? f.now() : null;
                    h.trigger("xchange.xdsoft")
                };
                f.empty = function() {
                    f.currentTime = null
                };
                f.getCurrentTime = function() {
                    return f.currentTime
                };
                f.nextMonth = function() {
                    if (void 0 === f.currentTime || null === f.currentTime) f.currentTime = f.now();
                    var c = f.currentTime.getMonth() + 1;
                    12 === c && (f.currentTime.setFullYear(f.currentTime.getFullYear() + 1), c = 0);
                    var e = f.currentTime.getFullYear();
                    f.currentTime.setDate(Math.min((new Date(f.currentTime.getFullYear(), c + 1, 0)).getDate(), f.currentTime.getDate()));
                    f.currentTime.setMonth(c);
                    b.onChangeMonth && a.isFunction(b.onChangeMonth) && b.onChangeMonth.call(h, l.currentTime, h.data("input"));
                    e !== f.currentTime.getFullYear() &&
                        a.isFunction(b.onChangeYear) && b.onChangeYear.call(h, l.currentTime, h.data("input"));
                    h.trigger("xchange.xdsoft");
                    return c
                };
                f.prevMonth = function() {
                    if (void 0 === f.currentTime || null === f.currentTime) f.currentTime = f.now();
                    var c = f.currentTime.getMonth() - 1; - 1 === c && (f.currentTime.setFullYear(f.currentTime.getFullYear() - 1), c = 11);
                    f.currentTime.setDate(Math.min((new Date(f.currentTime.getFullYear(), c + 1, 0)).getDate(), f.currentTime.getDate()));
                    f.currentTime.setMonth(c);
                    b.onChangeMonth && a.isFunction(b.onChangeMonth) &&
                        b.onChangeMonth.call(h, l.currentTime, h.data("input"));
                    h.trigger("xchange.xdsoft");
                    return c
                };
                f.getWeekOfYear = function(f) {
                    if (b.onGetWeekOfYear && a.isFunction(b.onGetWeekOfYear)) {
                        var c = b.onGetWeekOfYear.call(h, f);
                        if ("undefined" !== typeof c) return c
                    }
                    c = new Date(f.getFullYear(), 0, 1);
                    4 !== c.getDay() && c.setMonth(0, 1 + (4 - c.getDay() + 7) % 7);
                    return Math.ceil(((f - c) / 864E5 + c.getDay() + 1) / 7)
                };
                f.strToDateTime = function(a) {
                    var c;
                    if (a && a instanceof Date && f.isValidDate(a)) return a;
                    (c = /^([+-]{1})(.*)$/.exec(a)) && (c[2] = k.parseDate(c[2],
                        b.formatDate));
                    c && c[2] ? (a = c[2].getTime() - 6E4 * c[2].getTimezoneOffset(), c = new Date(f.now(!0).getTime() + parseInt(c[1] + "1", 10) * a)) : c = a ? k.parseDate(a, b.format) : f.now();
                    f.isValidDate(c) || (c = f.now());
                    return c
                };
                f.strToDate = function(a) {
                    if (a && a instanceof Date && f.isValidDate(a)) return a;
                    a = a ? k.parseDate(a, b.formatDate) : f.now(!0);
                    f.isValidDate(a) || (a = f.now(!0));
                    return a
                };
                f.strtotime = function(a) {
                    if (a && a instanceof Date && f.isValidDate(a)) return a;
                    a = a ? k.parseDate(a, b.formatTime) : f.now(!0);
                    f.isValidDate(a) || (a = f.now(!0));
                    return a
                };
                f.str = function() {
                    var a = b.format;
                    b.yearOffset && (a = a.replace("Y", f.currentTime.getFullYear() + b.yearOffset), a = a.replace("y", String(f.currentTime.getFullYear() + b.yearOffset).substring(2, 4)));
                    return k.formatDate(f.currentTime, a)
                };
                f.currentTime = this.now()
            };
            z.on("touchend click", function(a) {
                a.preventDefault();
                h.data("changed", !0);
                l.setCurrentTime(d());
                c.val(l.str());
                h.trigger("close.xdsoft")
            });
            m.find(".xdsoft_today_button").on("touchend mousedown.xdsoft", function() {
                h.data("changed", !0);
                l.setCurrentTime(0, !0);
                h.trigger("afterOpen.xdsoft")
            }).on("dblclick.xdsoft", function() {
                var a = l.getCurrentTime();
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
                var e = l.strToDate(b.minDate);
                e = new Date(e.getFullYear(), e.getMonth(), e.getDate());
                a < e || (e = l.strToDate(b.maxDate), e = new Date(e.getFullYear(), e.getMonth(), e.getDate()), a > e || (c.val(l.str()), c.trigger("change"), h.trigger("close.xdsoft")))
            });
            m.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var c = a(this),
                    e = 0,
                    d = !1;
                (function Q(a) {
                    c.hasClass(b.next) ?
                        l.nextMonth() : c.hasClass(b.prev) && l.prevMonth();
                    b.monthChangeSpinner && (d || (e = setTimeout(Q, a || 100)))
                })(500);
                a([b.ownerDocument.body, b.contentWindow]).on("touchend mouseup.xdsoft", function Q() {
                    clearTimeout(e);
                    d = !0;
                    a([b.ownerDocument.body, b.contentWindow]).off("touchend mouseup.xdsoft", Q)
                })
            });
            x.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var c = a(this),
                    e = 0,
                    d = !1,
                    h = 110;
                (function R(a) {
                    var f = q[0].clientHeight,
                        l = B[0].offsetHeight,
                        k = Math.abs(parseInt(B.css("marginTop"), 10));
                    c.hasClass(b.next) && l - f - b.timeHeightInTimePicker >= k ? B.css("marginTop", "-" + (k + b.timeHeightInTimePicker) + "px") : c.hasClass(b.prev) && 0 <= k - b.timeHeightInTimePicker && B.css("marginTop", "-" + (k - b.timeHeightInTimePicker) + "px");
                    q.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(B[0].style.marginTop, 10) / (l - f))]);
                    h = 10 < h ? 10 : h - 10;
                    d || (e = setTimeout(R, a || h))
                })(500);
                a([b.ownerDocument.body, b.contentWindow]).on("touchend mouseup.xdsoft", function R() {
                    clearTimeout(e);
                    d = !0;
                    a([b.ownerDocument.body, b.contentWindow]).off("touchend mouseup.xdsoft",
                        R)
                })
            });
            var U = 0;
            h.on("xchange.xdsoft", function(f) {
                clearTimeout(U);
                U = setTimeout(function() {
                    if (void 0 === l.currentTime || null === l.currentTime) l.currentTime = l.now();
                    for (var f = "", d = new Date(l.currentTime.getFullYear(), l.currentTime.getMonth(), 1, 12, 0, 0), g = 0, n, t = l.now(), w = !1, p = !1, q = !1, x = !1, z, F, C, H, A = [], D, I = !0, L = "", J; d.getDay() !== b.dayOfWeekStart;) d.setDate(d.getDate() - 1);
                    f += "<table><thead><tr>";
                    b.weeks && (f += "<th></th>");
                    for (n = 0; 7 > n; n += 1) f += "<th>" + b.i18n[r].dayOfWeekShort[(n + b.dayOfWeekStart) % 7] + "</th>";
                    f +=
                        "</tr></thead><tbody>";
                    !1 !== b.maxDate && (w = l.strToDate(b.maxDate), w = new Date(w.getFullYear(), w.getMonth(), w.getDate(), 23, 59, 59, 999));
                    !1 !== b.minDate && (p = l.strToDate(b.minDate), p = new Date(p.getFullYear(), p.getMonth(), p.getDate()));
                    !1 !== b.minDateTime && (q = l.strToDate(b.minDateTime), q = new Date(q.getFullYear(), q.getMonth(), q.getDate(), q.getHours(), q.getMinutes(), q.getSeconds()));
                    !1 !== b.maxDateTime && (x = l.strToDate(b.maxDateTime), x = new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(),
                        x.getSeconds()));
                    var K;
                    for (!1 !== x && (K = 31 * (12 * x.getFullYear() + x.getMonth()) + x.getDate()); g < l.currentTime.countDaysInMonth() || d.getDay() !== b.dayOfWeekStart || l.currentTime.getMonth() === d.getMonth();) {
                        A = [];
                        g += 1;
                        z = d.getDay();
                        n = d.getDate();
                        F = d.getFullYear();
                        C = d.getMonth();
                        H = l.getWeekOfYear(d);
                        J = "";
                        A.push("xdsoft_date");
                        D = b.beforeShowDay && a.isFunction(b.beforeShowDay.call) ? b.beforeShowDay.call(h, d) : null;
                        b.allowDateRe && "[object RegExp]" === Object.prototype.toString.call(b.allowDateRe) && (b.allowDateRe.test(k.formatDate(d,
                            b.formatDate)) || A.push("xdsoft_disabled"));
                        b.allowDates && 0 < b.allowDates.length && -1 === b.allowDates.indexOf(k.formatDate(d, b.formatDate)) && A.push("xdsoft_disabled");
                        var M = 31 * (12 * d.getFullYear() + d.getMonth()) + d.getDate();
                        (!1 !== w && d > w || !1 !== q && d < q || !1 !== p && d < p || !1 !== x && M > K || D && !1 === D[0]) && A.push("xdsoft_disabled"); - 1 !== b.disabledDates.indexOf(k.formatDate(d, b.formatDate)) && A.push("xdsoft_disabled"); - 1 !== b.disabledWeekDays.indexOf(z) && A.push("xdsoft_disabled");
                        c.is("[disabled]") && A.push("xdsoft_disabled");
                        D && "" !== D[1] && A.push(D[1]);
                        l.currentTime.getMonth() !== C && A.push("xdsoft_other_month");
                        (b.defaultSelect || h.data("changed")) && k.formatDate(l.currentTime, b.formatDate) === k.formatDate(d, b.formatDate) && A.push("xdsoft_current");
                        k.formatDate(t, b.formatDate) === k.formatDate(d, b.formatDate) && A.push("xdsoft_today");
                        0 !== d.getDay() && 6 !== d.getDay() && -1 === b.weekends.indexOf(k.formatDate(d, b.formatDate)) || A.push("xdsoft_weekend");
                        void 0 !== b.highlightedDates[k.formatDate(d, b.formatDate)] && (z = b.highlightedDates[k.formatDate(d,
                            b.formatDate)], A.push(void 0 === z.style ? "xdsoft_highlighted_default" : z.style), J = void 0 === z.desc ? "" : z.desc);
                        b.beforeShowDay && a.isFunction(b.beforeShowDay) && A.push(b.beforeShowDay(d));
                        I && (f += "<tr>", I = !1, b.weeks && (f += "<th>" + H + "</th>"));
                        f += '<td data-date="' + n + '" data-month="' + C + '" data-year="' + F + '" class="xdsoft_date xdsoft_day_of_week' + d.getDay() + " " + A.join(" ") + '" title="' + J + '"><div>' + n + "</div></td>";
                        d.getDay() === b.dayOfWeekStartPrev && (f += "</tr>", I = !0);
                        d.setDate(n + 1)
                    }
                    v.html(f + "</tbody></table>");
                    m.find(".xdsoft_label span").eq(0).text(b.i18n[r].months[l.currentTime.getMonth()]);
                    m.find(".xdsoft_label span").eq(1).text(l.currentTime.getFullYear() + b.yearOffset);
                    C = d = L = "";
                    var O = 0;
                    !1 !== b.minTime && (g = l.strtotime(b.minTime), O = 60 * g.getHours() + g.getMinutes());
                    var P = 1440;
                    !1 !== b.maxTime && (g = l.strtotime(b.maxTime), P = 60 * g.getHours() + g.getMinutes());
                    !1 !== b.minDateTime && (g = l.strToDateTime(b.minDateTime), k.formatDate(l.currentTime, b.formatDate) === k.formatDate(g, b.formatDate) && (C = 60 * g.getHours() + g.getMinutes(), C > O && (O = C)));
                    !1 !== b.maxDateTime && (g = l.strToDateTime(b.maxDateTime), k.formatDate(l.currentTime,
                        b.formatDate) === k.formatDate(g, b.formatDate) && (C = 60 * g.getHours() + g.getMinutes(), C < P && (P = C)));
                    f = function(f, d) {
                        var e = l.now(),
                            g = b.allowTimes && a.isArray(b.allowTimes) && b.allowTimes.length;
                        e.setHours(f);
                        f = parseInt(e.getHours(), 10);
                        e.setMinutes(d);
                        d = parseInt(e.getMinutes(), 10);
                        A = [];
                        var n = 60 * f + d;
                        (c.is("[disabled]") || n >= P || n < O) && A.push("xdsoft_disabled");
                        n = new Date(l.currentTime);
                        n.setHours(parseInt(l.currentTime.getHours(), 10));
                        g || n.setMinutes(Math[b.roundTime](l.currentTime.getMinutes() / b.step) * b.step);
                        (b.initTime || b.defaultSelect || h.data("changed")) && n.getHours() === parseInt(f, 10) && (!g && 59 < b.step || n.getMinutes() === parseInt(d, 10)) && (b.defaultSelect || h.data("changed") ? A.push("xdsoft_current") : b.initTime && A.push("xdsoft_init_time"));
                        parseInt(t.getHours(), 10) === parseInt(f, 10) && parseInt(t.getMinutes(), 10) === parseInt(d, 10) && A.push("xdsoft_today");
                        L += '<div class="xdsoft_time ' + A.join(" ") + '" data-hour="' + f + '" data-minute="' + d + '">' + k.formatDate(e, b.formatTime) + "</div>"
                    };
                    if (b.allowTimes && a.isArray(b.allowTimes) &&
                        b.allowTimes.length)
                        for (g = 0; g < b.allowTimes.length; g += 1) d = l.strtotime(b.allowTimes[g]).getHours(), C = l.strtotime(b.allowTimes[g]).getMinutes(), f(d, C);
                    else
                        for (n = g = 0; g < (b.hours12 ? 12 : 24); g += 1)
                            for (n = 0; 60 > n; n += b.step) C = 60 * g + n, C < O || C >= P || (d = (10 > g ? "0" : "") + g, C = (10 > n ? "0" : "") + n, f(d, C));
                    B.html(L);
                    e = "";
                    for (g = parseInt(b.yearStart, 10); g <= parseInt(b.yearEnd, 10); g += 1) e += '<div class="xdsoft_option ' + (l.currentTime.getFullYear() === g ? "xdsoft_current" : "") + '" data-value="' + g + '">' + (g + b.yearOffset) + "</div>";
                    G.children().eq(0).html(e);
                    g = parseInt(b.monthStart, 10);
                    for (e = ""; g <= parseInt(b.monthEnd, 10); g += 1) e += '<div class="xdsoft_option ' + (l.currentTime.getMonth() === g ? "xdsoft_current" : "") + '" data-value="' + g + '">' + b.i18n[r].months[g] + "</div>";
                    E.children().eq(0).html(e);
                    a(h).trigger("generate.xdsoft")
                }, 10);
                f.stopPropagation()
            }).on("afterOpen.xdsoft", function() {
                if (b.timepicker) {
                    var a;
                    B.find(".xdsoft_current").length ? a = ".xdsoft_current" : B.find(".xdsoft_init_time").length && (a = ".xdsoft_init_time");
                    if (a) {
                        var c = q[0].clientHeight;
                        var d = B[0].offsetHeight;
                        a = B.find(a).index() * b.timeHeightInTimePicker + 1;
                        d - c < a && (a = d - c);
                        q.trigger("scroll_element.xdsoft_scroller", [parseInt(a, 10) / (d - c)])
                    } else q.trigger("scroll_element.xdsoft_scroller", [0])
                }
            });
            var S = 0;
            v.on("touchend click.xdsoft", "td", function(f) {
                f.stopPropagation();
                S += 1;
                var d = a(this),
                    e = l.currentTime;
                if (void 0 === e || null === e) l.currentTime = l.now(), e = l.currentTime;
                if (d.hasClass("xdsoft_disabled")) return !1;
                e.setDate(1);
                e.setFullYear(d.data("year"));
                e.setMonth(d.data("month"));
                e.setDate(d.data("date"));
                h.trigger("select.xdsoft", [e]);
                c.val(l.str());
                b.onSelectDate && a.isFunction(b.onSelectDate) && b.onSelectDate.call(h, l.currentTime, h.data("input"), f);
                h.data("changed", !0);
                h.trigger("xchange.xdsoft");
                h.trigger("changedatetime.xdsoft");
                (1 < S || !0 === b.closeOnDateSelect || !1 === b.closeOnDateSelect && !b.timepicker) && !b.inline && h.trigger("close.xdsoft");
                setTimeout(function() {
                    S = 0
                }, 200)
            });
            B.on("touchstart", "div", function(a) {
                this.touchMoved = !1
            }).on("touchmove", "div", L).on("touchend click.xdsoft", "div", function(c) {
                if (!this.touchMoved) {
                    c.stopPropagation();
                    var f = a(this),
                        d = l.currentTime;
                    if (void 0 === d || null === d) l.currentTime = l.now(), d = l.currentTime;
                    if (f.hasClass("xdsoft_disabled")) return !1;
                    d.setHours(f.data("hour"));
                    d.setMinutes(f.data("minute"));
                    h.trigger("select.xdsoft", [d]);
                    h.data("input").val(l.str());
                    b.onSelectTime && a.isFunction(b.onSelectTime) && b.onSelectTime.call(h, l.currentTime, h.data("input"), c);
                    h.data("changed", !0);
                    h.trigger("xchange.xdsoft");
                    h.trigger("changedatetime.xdsoft");
                    !0 !== b.inline && !0 === b.closeOnTimeSelect && h.trigger("close.xdsoft")
                }
            });
            w.on("mousewheel.xdsoft", function(a) {
                if (!b.scrollMonth) return !0;
                0 > a.deltaY ? l.nextMonth() : l.prevMonth();
                return !1
            });
            c.on("mousewheel.xdsoft", function(a) {
                if (!b.scrollInput) return !0;
                if (!b.datepicker && b.timepicker) return I = B.find(".xdsoft_current").length ? B.find(".xdsoft_current").eq(0).index() : 0, 0 <= I + a.deltaY && I + a.deltaY < B.children().length && (I += a.deltaY), B.children().eq(I).length && B.children().eq(I).trigger("mousedown"), !1;
                if (b.datepicker && !b.timepicker) return w.trigger(a, [a.deltaY, a.deltaX, a.deltaY]),
                    c.val && c.val(l.str()), h.trigger("changedatetime.xdsoft"), !1
            });
            h.on("changedatetime.xdsoft", function(c) {
                if (b.onChangeDateTime && a.isFunction(b.onChangeDateTime)) {
                    var d = h.data("input");
                    b.onChangeDateTime.call(h, l.currentTime, d, c);
                    delete b.value;
                    d.trigger("change")
                }
            }).on("generate.xdsoft", function() {
                b.onGenerate && a.isFunction(b.onGenerate) && b.onGenerate.call(h, l.currentTime, h.data("input"));
                M && (h.trigger("afterOpen.xdsoft"), M = !1)
            }).on("click.xdsoft", function(a) {
                a.stopPropagation()
            });
            var I = 0;
            var V = function(a,
                b) {
                do
                    if (a = a.parentNode, !a || !1 === b(a)) break; while ("HTML" !== a.nodeName)
            };
            var T = function() {
                var c = h.data("input");
                var d = c.offset();
                var e = c[0];
                var l = "top";
                var g = d.top + e.offsetHeight - 1;
                var k = d.left;
                var n = "absolute";
                var m = a(b.contentWindow).width();
                var t = a(b.contentWindow).height();
                var p = a(b.contentWindow).scrollTop();
                if (b.ownerDocument.documentElement.clientWidth - d.left < w.parent().outerWidth(!0)) {
                    var q = w.parent().outerWidth(!0) - e.offsetWidth;
                    k -= q
                }
                "rtl" === c.parent().css("direction") && (k -= h.outerWidth() -
                    c.outerWidth());
                if (b.fixed) g -= p, k -= a(b.contentWindow).scrollLeft(), n = "fixed";
                else {
                    var x = !1;
                    V(e, function(a) {
                        if (null === a) return !1;
                        if ("fixed" === b.contentWindow.getComputedStyle(a).getPropertyValue("position")) return x = !0, !1
                    });
                    x && !b.insideParent ? (n = "fixed", g + h.outerHeight() > t + p ? (l = "bottom", g = t + p - d.top) : g -= p) : g + h[0].offsetHeight > t + p && (g = d.top - h[0].offsetHeight + 1);
                    0 > g && (g = 0);
                    k + e.offsetWidth > m && (k = m - e.offsetWidth)
                }
                V(h[0], function(a) {
                    if ("relative" === b.contentWindow.getComputedStyle(a).getPropertyValue("position") &&
                        m >= a.offsetWidth) return k -= (m - a.offsetWidth) / 2, !1
                });
                d = {
                    position: n,
                    left: b.insideParent ? e.offsetLeft : k,
                    top: "",
                    bottom: ""
                };
                d[l] = b.insideParent ? e.offsetTop + e.offsetHeight : g;
                h.css(d)
            };
            h.on("open.xdsoft", function(c) {
                var d = !0;
                b.onShow && a.isFunction(b.onShow) && (d = b.onShow.call(h, l.currentTime, h.data("input"), c));
                if (!1 !== d && (h.show(), T(), a(b.contentWindow).off("resize.xdsoft", T).on("resize.xdsoft", T), b.closeOnWithoutClick)) a([b.ownerDocument.body, b.contentWindow]).on("touchstart mousedown.xdsoft", function N() {
                    h.trigger("close.xdsoft");
                    a([b.ownerDocument.body, b.contentWindow]).off("touchstart mousedown.xdsoft", N)
                })
            }).on("close.xdsoft", function(c) {
                var d = !0;
                m.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide();
                b.onClose && a.isFunction(b.onClose) && (d = b.onClose.call(h, l.currentTime, h.data("input"), c));
                !1 === d || b.opened || b.inline || h.hide();
                c.stopPropagation()
            }).on("toggle.xdsoft", function() {
                h.is(":visible") ? h.trigger("close.xdsoft") : h.trigger("open.xdsoft")
            }).data("input", c);
            D = 0;
            h.data("xdsoft_datetime", l);
            h.setOptions(b);
            l.setCurrentTime(d());
            c.data("xdsoft_datetimepicker", h).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function() {
                c.is(":disabled") || c.data("xdsoft_datetimepicker").is(":visible") && b.closeOnInputClick || !b.openOnFocus || (clearTimeout(D), D = setTimeout(function() {
                    c.is(":disabled") || (M = !0, l.setCurrentTime(d(), !0), b.mask && t(b), h.trigger("open.xdsoft"))
                }, 100))
            }).on("keydown.xdsoft", function(c) {
                c = c.which;
                if (-1 !== [13].indexOf(c) && b.enterLikeTab) return c = a("input:visible,textarea:visible,button:visible,a:visible"),
                    h.trigger("close.xdsoft"), c.eq(c.index(this) + 1).focus(), !1;
                if (-1 !== [9].indexOf(c)) return h.trigger("close.xdsoft"), !0
            }).on("blur.xdsoft", function() {
                h.trigger("close.xdsoft")
            })
        };
        var z = function(c) {
            var d = c.data("xdsoft_datetimepicker");
            d && (d.data("xdsoft_datetime", null), d.remove(), c.data("xdsoft_datetimepicker", null).off(".xdsoft"), a(b.contentWindow).off("resize.xdsoft"), a([b.contentWindow, b.ownerDocument.body]).off("mousedown.xdsoft touchstart"), c.unmousewheel && c.unmousewheel())
        };
        a(b.ownerDocument).off("keydown.xdsoftctrl keyup.xdsoftctrl").off("keydown.xdsoftcmd keyup.xdsoftcmd").on("keydown.xdsoftctrl",
            function(a) {
                17 === a.keyCode && (n = !0)
            }).on("keyup.xdsoftctrl", function(a) {
            17 === a.keyCode && (n = !1)
        }).on("keydown.xdsoftcmd", function(a) {}).on("keyup.xdsoftcmd", function(a) {});
        this.each(function() {
            var g = a(this).data("xdsoft_datetimepicker");
            if (g) {
                if ("string" === a.type(e)) switch (e) {
                    case "show":
                        a(this).select().focus();
                        g.trigger("open.xdsoft");
                        break;
                    case "hide":
                        g.trigger("close.xdsoft");
                        break;
                    case "toggle":
                        g.trigger("toggle.xdsoft");
                        break;
                    case "destroy":
                        z(a(this));
                        break;
                    case "reset":
                        (this.value = this.defaultValue) &&
                        g.data("xdsoft_datetime").isValidDate(k.parseDate(this.value, b.format)) || g.data("changed", !1);
                        g.data("xdsoft_datetime").setCurrentTime(this.value);
                        break;
                    case "validate":
                        g = g.data("input");
                        g.trigger("blur.xdsoft");
                        break;
                    default:
                        g[e] && a.isFunction(g[e]) && (d = g[e](c))
                } else g.setOptions(e);
                return 0
            }
            "string" !== a.type(e) && (!b.lazyInit || b.open || b.inline ? q(a(this)) : v(a(this)))
        });
        return d
    };
    a.fn.datetimepicker.defaults = p
};
(function(a) {
    "function" === typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], a) : "object" === typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
})(datetimepickerFactory);
(function(a) {
    "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports ? module.exports = a : a(jQuery)
})(function(a) {
    function g(g) {
        var d = g || window.event,
            k = r.call(arguments, 1),
            n = 0,
            m = 0,
            b = 0,
            G = 0;
        g = a.event.fix(d);
        g.type = "mousewheel";
        "detail" in d && (m = -1 * d.detail);
        "wheelDelta" in d && (m = d.wheelDelta);
        "wheelDeltaY" in d && (m = d.wheelDeltaY);
        "wheelDeltaX" in d && (n = -1 * d.wheelDeltaX);
        "axis" in d && d.axis === d.HORIZONTAL_AXIS && (n = -1 * m, m = 0);
        var E = 0 === m ? n : m;
        "deltaY" in d && (E = m = -1 * d.deltaY);
        "deltaX" in
        d && (n = d.deltaX, 0 === m && (E = -1 * n));
        if (0 !== m || 0 !== n) {
            if (1 === d.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                E *= q;
                m *= q;
                n *= q
            } else 2 === d.deltaMode && (q = a.data(this, "mousewheel-page-height"), E *= q, m *= q, n *= q);
            q = Math.max(Math.abs(m), Math.abs(n));
            if (!c || q < c) c = q, z.settings.adjustOldDeltas && "mousewheel" === d.type && 0 === q % 120 && (c /= 40);
            z.settings.adjustOldDeltas && "mousewheel" === d.type && 0 === q % 120 && (E /= 40, n /= 40, m /= 40);
            E = Math[1 <= E ? "floor" : "ceil"](E / c);
            n = Math[1 <= n ? "floor" : "ceil"](n / c);
            m = Math[1 <= m ? "floor" : "ceil"](m /
                c);
            z.settings.normalizeOffset && this.getBoundingClientRect && (d = this.getBoundingClientRect(), b = g.clientX - d.left, G = g.clientY - d.top);
            g.deltaX = n;
            g.deltaY = m;
            g.deltaFactor = c;
            g.offsetX = b;
            g.offsetY = G;
            g.deltaMode = 0;
            k.unshift(g, E, n, m);
            e && clearTimeout(e);
            e = setTimeout(p, 200);
            return (a.event.dispatch || a.event.handle).apply(this, k)
        }
    }

    function p() {
        c = null
    }
    var k = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        m = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        r = Array.prototype.slice,
        e, c;
    if (a.event.fixHooks)
        for (var G = k.length; G;) a.event.fixHooks[k[--G]] = a.event.mouseHooks;
    var z = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = m.length; c;) this.addEventListener(m[--c], g, !1);
            else this.onmousewheel = g;
            a.data(this, "mousewheel-line-height", z.getLineHeight(this));
            a.data(this, "mousewheel-page-height", z.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = m.length; c;) this.removeEventListener(m[--c],
                    g, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height");
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(c) {
            c = a(c);
            var d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            d.length || (d = a("body"));
            return parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(c) {
            return a(c).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});