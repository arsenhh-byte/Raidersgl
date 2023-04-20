(function(g) {
    var window = this;
    'use strict';
    var Seb = function(a, b) {
            a.Na("onAutonavCoundownStarted", b)
        },
        C5 = function(a, b, c) {
            g.ko(a.element, "ytp-suggestion-set", !!b.videoId);
            var d = b.playlistId;
            c = b.gg(c ? c : "mqdefault.jpg");
            var e = null,
                f = null;
            b instanceof g.vJ && (b.lengthText ? (e = b.lengthText || null, f = b.Zu || null) : b.lengthSeconds && (e = g.LO(b.lengthSeconds), f = g.LO(b.lengthSeconds, !0)));
            var h = !!d;
            d = h && "RD" === g.tJ(d).type;
            var l = b instanceof g.vJ ? b.isLivePlayback : null,
                m = b instanceof g.vJ ? b.isUpcoming : null,
                n = b.author,
                p = b.shortViewCount,
                q = b.publishedTimeText,
                r = [],
                w = [];
            n && r.push(n);
            p && (r.push(p), w.push(p));
            q && w.push(q);
            c = {
                title: b.title,
                author: n,
                author_and_views: r.join(" \u2022 "),
                aria_label: b.ariaLabel ||
                    g.$L("Watch $TITLE", {
                        TITLE: b.title
                    }),
                duration: e,
                timestamp: f,
                url: b.Do(),
                is_live: l,
                is_upcoming: m,
                is_list: h,
                is_mix: d,
                background: c ? "background-image: url(" + c + ")" : "",
                views_and_publish_time: w.join(" \u2022 "),
                autoplayAlternativeHeader: b.rr
            };
            b instanceof g.uJ && (c.playlist_length = b.playlistLength);
            a.update(c)
        },
        D5 = function(a) {
            var b = a.T(),
                c = b.C;
            g.S.call(this, {
                G: "a",
                N: "ytp-autonav-suggestion-card",
                X: {
                    href: "{{url}}",
                    target: c ? b.Y : "",
                    "aria-label": "{{aria_label}}",
                    "data-is-live": "{{is_live}}",
                    "data-is-list": "{{is_list}}",
                    "data-is-mix": "{{is_mix}}",
                    "data-is-upcoming": "{{is_upcoming}}"
                },
                W: [{
                    G: "div",
                    Ia: ["ytp-autonav-endscreen-upnext-thumbnail", "ytp-autonav-thumbnail-small"],
                    X: {
                        style: "{{background}}"
                    },
                    W: [{
                        G: "div",
                        X: {
                            "aria-label": "{{timestamp}}"
                        },
                        Ia: ["ytp-autonav-timestamp"],
                        qa: "{{duration}}"
                    }, {
                        G: "div",
                        Ia: ["ytp-autonav-live-stamp"],
                        qa: "Live"
                    }, {
                        G: "div",
                        Ia: ["ytp-autonav-upcoming-stamp"],
                        qa: "Upcoming"
                    }, {
                        G: "div",
                        N: "ytp-autonav-list-overlay",
                        W: [{
                            G: "div",
                            N: "ytp-autonav-mix-text",
                            qa: "Mix"
                        }, {
                            G: "div",
                            N: "ytp-autonav-mix-icon"
                        }]
                    }]
                }, {
                    G: "div",
                    Ia: ["ytp-autonav-endscreen-upnext-title", "ytp-autonav-title-card"],
                    qa: "{{title}}"
                }, {
                    G: "div",
                    Ia: ["ytp-autonav-endscreen-upnext-author", "ytp-autonav-author-card"],
                    qa: "{{author}}"
                }, {
                    G: "div",
                    Ia: ["ytp-autonav-endscreen-upnext-author", "ytp-autonav-view-and-date-card"],
                    qa: "{{views_and_publish_time}}"
                }]
            });
            this.F = a;
            this.suggestion =
                null;
            this.j = c;
            this.Pa("click", this.onClick);
            this.Pa("keypress", this.onKeyPress)
        },
        E5 = function(a, b) {
            b = void 0 === b ? !1 : b;
            g.S.call(this, {
                G: "div",
                N: "ytp-autonav-endscreen-countdown-overlay"
            });
            var c = this;
            this.I = b;
            this.D = void 0;
            this.B = 0;
            this.container = new g.S({
                G: "div",
                N: "ytp-autonav-endscreen-countdown-container"
            });
            g.D(this, this.container);
            this.container.Da(this.element);
            b = a.T();
            var d = b.C;
            this.F = a;
            this.suggestion = null;
            this.onVideoDataChange("newdata", this.F.getVideoData());
            this.S(a, "videodatachange", this.onVideoDataChange);
            var e = ["ytp-autonav-endscreen-upnext-thumbnail"];
            b.K("web_rounded_thumbnails") && e.push("rounded-thumbnail");
            this.j = new g.S({
                G: "div",
                N: "ytp-autonav-endscreen-upnext-container",
                X: {
                    "aria-label": "{{aria_label}}",
                    "data-is-live": "{{is_live}}",
                    "data-is-list": "{{is_list}}",
                    "data-is-mix": "{{is_mix}}",
                    "data-is-upcoming": "{{is_upcoming}}"
                },
                W: [{
                    G: "div",
                    N: "ytp-autonav-endscreen-upnext-header"
                }, {
                    G: "div",
                    N: "ytp-autonav-endscreen-upnext-alternative-header",
                    qa: "{{autoplayAlternativeHeader}}"
                }, {
                    G: "a",
                    N: "ytp-autonav-endscreen-link-container",
                    X: {
                        href: "{{url}}",
                        target: d ? b.Y : ""
                    },
                    W: [{
                        G: "div",
                        Ia: e,
                        X: {
                            style: "{{background}}"
                        },
                        W: [{
                            G: "div",
                            X: {
                                "aria-label": "{{timestamp}}"
                            },
                            Ia: ["ytp-autonav-timestamp"],
                            qa: "{{duration}}"
                        }, {
                            G: "div",
                            Ia: ["ytp-autonav-live-stamp"],
                            qa: "Live"
                        }, {
                            G: "div",
                            Ia: ["ytp-autonav-upcoming-stamp"],
                            qa: "Upcoming"
                        }]
                    }, {
                        G: "div",
                        N: "ytp-autonav-endscreen-video-info",
                        W: [{
                            G: "div",
                            N: "ytp-autonav-endscreen-premium-badge"
                        }, {
                            G: "div",
                            N: "ytp-autonav-endscreen-upnext-title",
                            qa: "{{title}}"
                        }, {
                            G: "div",
                            N: "ytp-autonav-endscreen-upnext-author",
                            qa: "{{author}}"
                        }, {
                            G: "div",
                            N: "ytp-autonav-view-and-date",
                            qa: "{{views_and_publish_time}}"
                        }, {
                            G: "div",
                            N: "ytp-autonav-author-and-view",
                            qa: "{{author_and_views}}"
                        }]
                    }]
                }]
            });
            g.D(this, this.j);
            this.j.Da(this.container.element);
            d || this.S(this.j.Ca("ytp-autonav-endscreen-link-container"), "click", this.PP);
            this.F.qb(this.container.element, this, 115127);
            this.F.qb(this.j.Ca("ytp-autonav-endscreen-link-container"), this, 115128);
            this.overlay = new g.S({
                G: "div",
                N: "ytp-autonav-overlay"
            });
            g.D(this, this.overlay);
            this.overlay.Da(this.container.element);
            this.u = new g.S({
                G: "div",
                N: "ytp-autonav-endscreen-button-container"
            });
            g.D(this, this.u);
            this.u.Da(this.container.element);
            this.cancelButton = new g.S({
                G: "button",
                Ia: ["ytp-autonav-endscreen-upnext-button", "ytp-autonav-endscreen-upnext-cancel-button", b.K("web_modern_buttons") ? "ytp-autonav-endscreen-upnext-button-rounded" : ""],
                X: {
                    "aria-label": "Cancel autoplay"
                },
                qa: "Cancel"
            });
            g.D(this, this.cancelButton);
            this.cancelButton.Da(this.u.element);
            this.cancelButton.Pa("click", this.bZ, this);
            this.F.qb(this.cancelButton.element, this, 115129);
            this.playButton = new g.S({
                G: "a",
                Ia: ["ytp-autonav-endscreen-upnext-button",
                    "ytp-autonav-endscreen-upnext-play-button", b.K("web_modern_buttons") ? "ytp-autonav-endscreen-upnext-button-rounded" : ""
                ],
                X: {
                    href: "{{url}}",
                    role: "button",
                    "aria-label": "Play next video"
                },
                qa: "Play Now"
            });
            g.D(this, this.playButton);
            this.playButton.Da(this.u.element);
            this.playButton.Pa("click", this.PP, this);
            this.F.qb(this.playButton.element, this, 115130);
            this.C = new g.Yn(function() {
                Teb(c)
            }, 500);
            g.D(this, this.C);
            this.OP();
            this.S(a, "autonavvisibility", this.OP);
            this.F.K("web_autonav_color_transition") && (this.S(a, "autonavchange", this.aZ), this.S(a, "onAutonavCoundownStarted", this.F4))
        },
        F5 = function(a) {
            var b = a.F.rk(!0, a.F.isFullscreen());
            g.ko(a.container.element, "ytp-autonav-endscreen-small-mode", a.gh(b));
            g.ko(a.container.element, "ytp-autonav-endscreen-is-premium", !!a.suggestion && !!a.suggestion.xH);
            g.ko(a.F.getRootNode(), "ytp-autonav-endscreen-cancelled-state", !a.F.Jf());
            g.ko(a.F.getRootNode(), "countdown-running", a.zk());
            g.ko(a.container.element, "ytp-player-content", a.F.Jf());
            g.pl(a.overlay.element, {
                width: b.width + "px"
            });
            if (!a.zk()) {
                a.F.Jf() ? Ueb(a, Math.round(Veb(a) / 1E3)) : Ueb(a);
                b = !!a.suggestion && !!a.suggestion.rr;
                var c = a.F.Jf() || !b;
                g.ko(a.container.element, "ytp-autonav-endscreen-upnext-alternative-header-only", !c && b);
                g.ko(a.container.element, "ytp-autonav-endscreen-upnext-no-alternative-header", c && !b);
                g.JN(a.u, a.F.Jf());
                g.ko(a.element, "ytp-enable-w2w-color-transitions", Web(a))
            }
        },
        Teb = function(a) {
            var b = Veb(a),
                c = Math,
                d = c.min;
            var e = a.B ? Date.now() - a.B : 0;
            c = d.call(c, e, b);
            Ueb(a, Math.ceil((b - c) / 1E3));
            500 >= b - c && a.zk() ? a.select(!0) : a.zk() && a.C.start()
        },
        Veb = function(a) {
            if (a.F.isFullscreen()) {
                var b;
                a = null == (b = a.F.getVideoData()) ? void 0 : b.qw;
                return -1 === a || void 0 === a ? 8E3 : a
            }
            return 0 <= a.F.Nr() ? a.F.Nr() : g.$G(a.F.T().experiments, "autoplay_time") || 1E4
        },
        Web = function(a) {
            var b;
            return !(null == (b = a.F.getVideoData()) || !b.watchToWatchTransitionRenderer)
        },
        Ueb = function(a, b) {
            b = void 0 === b ? -1 : b;
            a = a.j.Ca("ytp-autonav-endscreen-upnext-header");
            g.Fe(a);
            if (0 <= b) {
                b = String(b);
                var c = "Up next in $SECONDS".match(RegExp("\\$SECONDS", "gi"))[0],
                    d = "Up next in $SECONDS".indexOf(c);
                if (0 <= d) {
                    a.appendChild(g.Be("Up next in $SECONDS".slice(0, d)));
                    var e = g.Ae("span");
                    g.eo(e, "ytp-autonav-endscreen-upnext-header-countdown-number");
                    g.Ke(e, b);
                    a.appendChild(e);
                    a.appendChild(g.Be("Up next in $SECONDS".slice(d + c.length)));
                    return
                }
            }
            g.Ke(a, "Up next")
        },
        G5 = function(a, b) {
            g.S.call(this, {
                G: "div",
                Ia: ["html5-endscreen", "ytp-player-content", b || "base-endscreen"]
            });
            this.created = !1;
            this.player = a
        },
        H5 = function(a) {
            g.S.call(this, {
                G: "div",
                Ia: ["ytp-upnext", "ytp-player-content"],
                X: {
                    "aria-label": "{{aria_label}}"
                },
                W: [{
                    G: "div",
                    N: "ytp-cued-thumbnail-overlay-image",
                    X: {
                        style: "{{background}}"
                    }
                }, {
                    G: "span",
                    N: "ytp-upnext-top",
                    W: [{
                        G: "span",
                        N: "ytp-upnext-header",
                        qa: "Up Next"
                    }, {
                        G: "span",
                        N: "ytp-upnext-title",
                        qa: "{{title}}"
                    }, {
                        G: "span",
                        N: "ytp-upnext-author",
                        qa: "{{author}}"
                    }]
                }, {
                    G: "a",
                    N: "ytp-upnext-autoplay-icon",
                    X: {
                        role: "button",
                        href: "{{url}}",
                        "aria-label": "Play next video"
                    },
                    W: [{
                        G: "svg",
                        X: {
                            height: "100%",
                            version: "1.1",
                            viewBox: "0 0 72 72",
                            width: "100%"
                        },
                        W: [{
                            G: "circle",
                            N: "ytp-svg-autoplay-circle",
                            X: {
                                cx: "36",
                                cy: "36",
                                fill: "#fff",
                                "fill-opacity": "0.3",
                                r: "31.5"
                            }
                        }, {
                            G: "circle",
                            N: "ytp-svg-autoplay-ring",
                            X: {
                                cx: "-36",
                                cy: "36",
                                "fill-opacity": "0",
                                r: "33.5",
                                stroke: "#FFFFFF",
                                "stroke-dasharray": "211",
                                "stroke-dashoffset": "-211",
                                "stroke-width": "4",
                                transform: "rotate(-90)"
                            }
                        }, {
                            G: "path",
                            N: "ytp-svg-fill",
                            X: {
                                d: "M 24,48 41,36 24,24 V 48 z M 44,24 v 24 h 4 V 24 h -4 z"
                            }
                        }]
                    }]
                }, {
                    G: "span",
                    N: "ytp-upnext-bottom",
                    W: [{
                        G: "span",
                        N: "ytp-upnext-cancel"
                    }, {
                        G: "span",
                        N: "ytp-upnext-paused",
                        qa: "Autoplay is paused"
                    }]
                }]
            });
            this.api = a;
            this.cancelButton = null;
            this.D = this.Ca("ytp-svg-autoplay-ring");
            this.B = this.notification = this.j = this.suggestion = null;
            this.C = new g.Yn(this.KE, 5E3, this);
            this.u = 0;
            var b = this.Ca("ytp-upnext-cancel");
            this.cancelButton = new g.S({
                G: "button",
                Ia: ["ytp-upnext-cancel-button", "ytp-button"],
                X: {
                    tabindex: "0",
                    "aria-label": "Cancel autoplay"
                },
                qa: "Cancel"
            });
            g.D(this, this.cancelButton);
            this.cancelButton.Pa("click", this.cZ, this);
            this.cancelButton.Da(b);
            this.cancelButton && this.api.qb(this.cancelButton.element,
                this, 115129);
            g.D(this, this.C);
            this.api.qb(this.element, this, 18788);
            b = this.Ca("ytp-upnext-autoplay-icon");
            this.S(b, "click", this.dZ);
            this.api.qb(b, this, 115130);
            this.QP();
            this.S(a, "autonavvisibility", this.QP);
            this.S(a, "mdxnowautoplaying", this.p5);
            this.S(a, "mdxautoplaycanceled", this.q5);
            g.ko(this.element, "ytp-upnext-mobile", this.api.T().u)
        },
        Xeb = function(a, b) {
            if (b) return b;
            if (a.api.isFullscreen()) {
                var c;
                a = null == (c = a.api.getVideoData()) ? void 0 : c.qw;
                return -1 === a || void 0 === a ? 8E3 : a
            }
            return 0 <= a.api.Nr() ? a.api.Nr() : g.$G(a.api.T().experiments, "autoplay_time") || 1E4
        },
        Yeb = function(a, b) {
            b = Xeb(a, b);
            var c = Math,
                d = c.min;
            var e = (0, g.M)() - a.u;
            c = d.call(c, e, b);
            b = 0 === b ? 1 : Math.min(c / b, 1);
            a.D.setAttribute("stroke-dashoffset", "" + -211 * (b + 1));
            1 <= b && a.zk() && 3 !== a.api.getPresentingPlayerType() ? a.select(!0) : a.zk() && a.j.start()
        },
        I5 = function(a) {
            G5.call(this, a, "autonav-endscreen");
            this.overlay = this.videoData = null;
            this.table = new g.S({
                G: "div",
                N: "ytp-suggestion-panel",
                W: [{
                    G: "div",
                    Ia: ["ytp-autonav-endscreen-upnext-header", "ytp-autonav-endscreen-more-videos"],
                    qa: "More videos"
                }]
            });
            this.J = new g.S({
                G: "div",
                N: "ytp-suggestions-container"
            });
            this.videos = [];
            this.B = null;
            this.D = this.I = !1;
            this.u = new E5(this.player);
            g.D(this, this.u);
            this.u.Da(this.element);
            a.getVideoData().Gc ? this.j = this.u : (this.j = new H5(a), g.UQ(this.player, this.j.element, 4), g.D(this, this.j));
            this.overlay = new g.S({
                G: "div",
                N: "ytp-autonav-overlay-cancelled-state"
            });
            g.D(this, this.overlay);
            this.overlay.Da(this.element);
            this.C = new g.ZF(this);
            g.D(this, this.C);
            g.D(this, this.table);
            this.table.Da(this.element);
            this.table.show();
            g.D(this, this.J);
            this.J.Da(this.table.element);
            this.hide()
        },
        J5 = function(a) {
            var b = a.Jf();
            b !== a.D && (a.D = b, a.player.ea("autonavvisibility"), a.D ? (a.u !== a.j && a.u.hide(), a.table.hide()) : (a.u !== a.j && a.u.show(), a.table.show()))
        },
        K5 = function(a, b) {
            g.S.call(this, {
                G: "button",
                Ia: ["ytp-watch-on-youtube-button", "ytp-button"],
                qa: "{{content}}"
            });
            this.F = a;
            this.buttonType = this.buttonType = b;
            b = this.F.getVideoData();
            if (a.K("embeds_enable_server_driven_watch_again_on_youtube")) {
                var c, d;
                if (c = (a = null == (c = b.kd) ? void 0 : null == (d = c.playerOverlays) ? void 0 : d.playerOverlayRenderer) && g.L(a.watchOnYoutubeButton, g.fLa)) this.j = c
            }
            if (this.j) this.update({
                content: this.j.title
            }), this.F.Ag(this.element, this), this.F.jh(this.element, this.j.trackingParams || null);
            else {
                switch (this.buttonType) {
                    case 1:
                        c =
                            "Watch again on YouTube";
                        d = 156915;
                        break;
                    case 2:
                        c = "Continue watching on YouTube";
                        d = 156942;
                        break;
                    default:
                        c = "Continue watching on YouTube", d = 156942
                }
                this.update({
                    content: c
                });
                this.F.qb(this.element, this, d)
            }
            2 === this.buttonType && g.go(this.element, "ytp-continue-watching-button");
            this.Pa("click", this.onClick);
            g.JN(this, !0)
        },
        L5 = function(a, b) {
            G5.call(this, a, "embeds-lite-endscreen");
            this.F = a;
            this.j = b;
            this.F.qb(this.element, this, 156943);
            this.watchButton = new K5(a, 2);
            g.D(this, this.watchButton);
            this.watchButton.Da(this.element);
            this.hide()
        },
        Zeb = function(a) {
            G5.call(this, a, "subscribecard-endscreen");
            this.j = new g.S({
                G: "div",
                N: "ytp-subscribe-card",
                W: [{
                    G: "img",
                    N: "ytp-author-image",
                    X: {
                        src: "{{profilePicture}}"
                    }
                }, {
                    G: "div",
                    N: "ytp-subscribe-card-right",
                    W: [{
                        G: "div",
                        N: "ytp-author-name",
                        qa: "{{author}}"
                    }, {
                        G: "div",
                        N: "html5-subscribe-button-container"
                    }]
                }]
            });
            g.D(this, this.j);
            this.j.Da(this.element);
            var b = a.getVideoData();
            this.subscribeButton = new g.VS("Subscribe", null, "Unsubscribe", null, !0, !1, b.Xj, b.subscribed, "trailer-endscreen", null, null, a);
            g.D(this, this.subscribeButton);
            this.subscribeButton.Da(this.j.Ca("html5-subscribe-button-container"));
            this.S(a, "videodatachange", this.La);
            this.La();
            this.hide()
        },
        M5 = function(a) {
            var b = a.T(),
                c = g.bG || g.VH ? {
                    style: "will-change: opacity"
                } : void 0,
                d = b.C,
                e = ["ytp-videowall-still"];
            b.u && e.push("ytp-videowall-show-text");
            g.S.call(this, {
                G: "a",
                Ia: e,
                X: {
                    href: "{{url}}",
                    target: d ? b.Y : "",
                    "aria-label": "{{aria_label}}",
                    "data-is-live": "{{is_live}}",
                    "data-is-list": "{{is_list}}",
                    "data-is-mix": "{{is_mix}}"
                },
                W: [{
                    G: "div",
                    N: "ytp-videowall-still-image",
                    X: {
                        style: "{{background}}"
                    }
                }, {
                    G: "span",
                    N: "ytp-videowall-still-info",
                    X: {
                        "aria-hidden": "true"
                    },
                    W: [{
                        G: "span",
                        N: "ytp-videowall-still-info-bg",
                        W: [{
                            G: "span",
                            N: "ytp-videowall-still-info-content",
                            X: c,
                            W: [{
                                    G: "span",
                                    N: "ytp-videowall-still-info-title",
                                    qa: "{{title}}"
                                },
                                {
                                    G: "span",
                                    N: "ytp-videowall-still-info-author",
                                    qa: "{{author_and_views}}"
                                }, {
                                    G: "span",
                                    N: "ytp-videowall-still-info-live",
                                    qa: "Live"
                                }, {
                                    G: "span",
                                    N: "ytp-videowall-still-info-duration",
                                    qa: "{{duration}}"
                                }
                            ]
                        }]
                    }]
                }, {
                    G: "span",
                    Ia: ["ytp-videowall-still-listlabel-regular", "ytp-videowall-still-listlabel"],
                    X: {
                        "aria-hidden": "true"
                    },
                    W: [{
                        G: "span",
                        N: "ytp-videowall-still-listlabel-icon"
                    }, "Playlist", {
                        G: "span",
                        N: "ytp-videowall-still-listlabel-length",
                        W: [" (", {
                            G: "span",
                            qa: "{{playlist_length}}"
                        }, ")"]
                    }]
                }, {
                    G: "span",
                    Ia: ["ytp-videowall-still-listlabel-mix",
                        "ytp-videowall-still-listlabel"
                    ],
                    X: {
                        "aria-hidden": "true"
                    },
                    W: [{
                        G: "span",
                        N: "ytp-videowall-still-listlabel-mix-icon"
                    }, "Mix", {
                        G: "span",
                        N: "ytp-videowall-still-listlabel-length",
                        qa: " (50+)"
                    }]
                }]
            });
            this.suggestion = null;
            this.u = d;
            this.api = a;
            this.j = new g.ZF(this);
            g.D(this, this.j);
            this.Pa("click", this.onClick);
            this.Pa("keypress", this.onKeyPress);
            this.j.S(a, "videodatachange", this.onVideoDataChange);
            a.Ag(this.element, this);
            this.onVideoDataChange()
        },
        N5 = function(a) {
            G5.call(this, a, "videowall-endscreen");
            var b = this;
            this.F = a;
            this.B = 0;
            this.stills = [];
            this.C = this.videoData = null;
            this.D = this.J = !1;
            this.V = null;
            this.u = new g.ZF(this);
            g.D(this, this.u);
            this.Y = a.K("web_rounded_thumbnails");
            this.I = new g.Yn(function() {
                g.go(b.element, "ytp-show-tiles")
            }, 0);
            g.D(this, this.I);
            var c = new g.S({
                G: "button",
                Ia: ["ytp-button", "ytp-endscreen-previous"],
                X: {
                    "aria-label": "Previous"
                },
                W: [g.ON()]
            });
            g.D(this, c);
            c.Da(this.element);
            c.Pa("click", this.hZ, this);
            this.table = new g.GN({
                G: "div",
                N: "ytp-endscreen-content"
            });
            g.D(this, this.table);
            this.table.Da(this.element);
            c = new g.S({
                G: "button",
                Ia: ["ytp-button", "ytp-endscreen-next"],
                X: {
                    "aria-label": "Next"
                },
                W: [g.PN()]
            });
            g.D(this, c);
            c.Da(this.element);
            c.Pa("click", this.gZ, this);
            a.getVideoData().Gc ? this.j = new E5(a, !0) : this.j = new H5(a);
            g.D(this, this.j);
            g.UQ(this.player, this.j.element, 4);
            a.qb(this.element, this, 158789);
            this.hide()
        },
        O5 = function(a) {
            return g.VQ(a.player) && a.FA() && !a.C
        },
        $eb = function(a) {
            var b, c, d, e;
            return (null == (b = a.videoData) ? 0 : null == (c = b.suggestions) ? 0 : c.length) ? null == (d = a.videoData) ? void 0 : d.suggestions : [null == (e = a.videoData) ? void 0 : g.xJ(e)]
        },
        P5 = function(a) {
            var b = a.Jf();
            b !== a.J && (a.J = b, a.player.ea("autonavvisibility"))
        },
        Q5 = function(a) {
            G5.call(this, a, "watch-again-on-youtube-endscreen");
            this.watchButton = new K5(a, 1);
            g.D(this, this.watchButton);
            this.watchButton.Da(this.element);
            g.H6a(a) && (this.j = new g.x2(a, g.CQ(a)), g.D(this, this.j), this.u = new g.S({
                G: "div",
                Ia: ["ytp-watch-again-on-youtube-endscreen-more-videos-container"],
                X: {
                    tabIndex: "-1"
                },
                W: [this.j]
            }), g.D(this, this.u), this.j.Da(this.u.element), this.u.Da(this.element));
            a.qb(this.element, this, 156914);
            this.hide()
        },
        dfb = function(a) {
            g.RR.call(this, a);
            var b = this;
            this.endScreen = null;
            this.u = this.j = this.B = this.C = !1;
            this.listeners = new g.ZF(this);
            g.D(this, this.listeners);
            var c = a.T(),
                d = a.getVideoData();
            d = d && 0 !== d.endSeconds;
            if (g.px(g.nI(c)) && d && !g.RQ(a)) this.u = !0, this.endScreen = new L5(a, g.CQ(a));
            else {
                var e;
                (null == (e = g.CQ(a)) ? 0 : e.xd()) ? this.endScreen = new Q5(a): afb(a) ? (this.C = !0, bfb(this), this.j ? this.endScreen = new I5(a) : this.endScreen = new N5(a)) : c.Wg ? this.endScreen = new Zeb(a) : this.endScreen = new G5(a)
            }
            g.D(this, this.endScreen);
            g.UQ(a, this.endScreen.element,
                4);
            cfb(this);
            this.listeners.S(a, "videodatachange", this.onVideoDataChange, this);
            this.listeners.S(a, g.$B("endscreen"), function(f) {
                b.onCueRangeEnter(f)
            });
            this.listeners.S(a, g.aC("endscreen"), function(f) {
                b.onCueRangeExit(f)
            })
        },
        bfb = function(a) {
            var b = a.player.getVideoData();
            if (!b || a.j === b.Yd && a.B === b.Gc) return !1;
            a.j = b.Yd;
            a.B = b.Gc;
            return !0
        },
        afb = function(a) {
            a = a.T();
            return a.Gd && !a.Wg
        },
        cfb = function(a) {
            a.player.Kf("endscreen");
            var b = a.player.getVideoData();
            b = new g.YB(Math.max(1E3 * (b.lengthSeconds - 10), 0), 0x8000000000000, {
                id: "preload",
                namespace: "endscreen"
            });
            var c = new g.YB(0x8000000000000, 0x8000000000000, {
                id: "load",
                priority: 8,
                namespace: "endscreen"
            });
            a.player.Me([b, c])
        };
    g.GV.prototype.rz = g.ba(36, function(a) {
        this.sN !== a && (this.sN = a, this.Uk())
    });
    g.KT.prototype.Lq = g.ba(35, function(a) {
        this.u !== a && (this.u = a, this.La())
    });
    g.GV.prototype.Lq = g.ba(34, function(a) {
        this.shareButton && this.shareButton.Lq(a)
    });
    g.zT.prototype.Kq = g.ba(33, function(a) {
        this.u !== a && (this.u = a, this.La())
    });
    g.GV.prototype.Kq = g.ba(32, function(a) {
        this.overflowButton && this.overflowButton.Kq(a)
    });
    g.HS.prototype.oD = g.ba(31, function(a) {
        this.tN !== a && (this.tN = a, this.hp())
    });
    g.NQ.prototype.Nr = g.ba(5, function() {
        return this.app.Nr()
    });
    g.cZ.prototype.Nr = g.ba(4, function() {
        return this.getVideoData().cI
    });
    g.v(D5, g.S);
    D5.prototype.select = function() {
        this.F.Fn(this.suggestion.videoId, this.suggestion.sessionData, this.suggestion.playlistId, void 0, void 0, this.suggestion.aB || void 0) && this.F.ub(this.element)
    };
    D5.prototype.onClick = function(a) {
        g.sS(a, this.F, this.j, this.suggestion.sessionData || void 0) && this.select()
    };
    D5.prototype.onKeyPress = function(a) {
        switch (a.keyCode) {
            case 13:
            case 32:
                g.Uz(a) || (this.select(), g.Tz(a))
        }
    };
    g.v(E5, g.S);
    g.k = E5.prototype;
    g.k.YD = function(a) {
        this.suggestion !== a && (this.suggestion = a, C5(this.j, a), this.playButton.updateValue("url", this.suggestion.Do()), F5(this))
    };
    g.k.zk = function() {
        return 0 < this.B
    };
    g.k.Az = function() {
        this.zk() || (this.B = Date.now(), Teb(this), Seb(this.F, Veb(this)), g.ko(this.F.getRootNode(), "countdown-running", this.zk()))
    };
    g.k.Dv = function() {
        this.Oq();
        Teb(this);
        var a = this.j.Ca("ytp-autonav-endscreen-upnext-header");
        a && g.Ke(a, "Up next")
    };
    g.k.Oq = function() {
        this.zk() && (this.C.stop(), this.B = 0)
    };
    g.k.select = function(a) {
        this.F.nextVideo(!1, void 0 === a ? !1 : a);
        this.Oq()
    };
    g.k.PP = function(a) {
        g.sS(a, this.F) && (a.currentTarget === this.playButton.element ? this.F.ub(this.playButton.element) : a.currentTarget === this.j.Ca("ytp-autonav-endscreen-link-container") && (a = this.j.Ca("ytp-autonav-endscreen-link-container"), this.F.Ta(a, !0), this.F.ub(a)), this.select())
    };
    g.k.bZ = function() {
        this.F.ub(this.cancelButton.element);
        g.PQ(this.F, !0);
        this.D && this.F.Na("innertubeCommand", this.D)
    };
    g.k.onVideoDataChange = function(a, b) {
        var c;
        this.D = null == (c = b.hR) ? void 0 : c.command
    };
    g.k.F4 = function(a) {
        if (Web(this)) {
            var b = this.F.getVideoData().watchToWatchTransitionRenderer,
                c = null == b ? void 0 : b.fromColorPaletteDark;
            b = null == b ? void 0 : b.toColorPaletteDark;
            if (c && b) {
                var d = this.element;
                d.style.setProperty("--w2w-start-background-color", g.WO(c.surgeColor));
                d.style.setProperty("--w2w-start-primary-text-color", g.WO(c.primaryTitleColor));
                d.style.setProperty("--w2w-start-secondary-text-color", g.WO(c.secondaryTitleColor));
                d.style.setProperty("--w2w-end-background-color", g.WO(b.surgeColor));
                d.style.setProperty("--w2w-end-primary-text-color", g.WO(b.primaryTitleColor));
                d.style.setProperty("--w2w-end-secondary-text-color", g.WO(b.secondaryTitleColor));
                d.style.setProperty("--w2w-animation-duration", a + "ms")
            }
            g.ko(this.element, "ytp-w2w-animate", !0)
        }
    };
    g.k.aZ = function(a) {
        this.F.K("web_autonav_color_transition") && 2 !== a && g.ko(this.element, "ytp-w2w-animate", !1)
    };
    g.k.OP = function() {
        var a = this.F.Jf();
        this.I && this.tb !== a && g.JN(this, a);
        F5(this);
        this.F.Ta(this.container.element, a);
        this.F.Ta(this.cancelButton.element, a);
        this.F.Ta(this.j.Ca("ytp-autonav-endscreen-link-container"), a);
        this.F.Ta(this.playButton.element, a)
    };
    g.k.gh = function(a) {
        return 400 > a.width || 459 > a.height
    };
    g.v(G5, g.S);
    g.k = G5.prototype;
    g.k.create = function() {
        this.created = !0
    };
    g.k.destroy = function() {
        this.created = !1
    };
    g.k.FA = function() {
        return !1
    };
    g.k.Jf = function() {
        return !1
    };
    g.k.mU = function() {
        return !1
    };
    g.v(H5, g.S);
    g.k = H5.prototype;
    g.k.KE = function() {
        this.notification && (this.C.stop(), this.Fc(this.B), this.B = null, this.notification.close(), this.notification = null)
    };
    g.k.YD = function(a) {
        this.suggestion = a;
        C5(this, a, "hqdefault.jpg")
    };
    g.k.QP = function() {
        g.JN(this, this.api.Jf());
        this.api.Ta(this.element, this.api.Jf());
        this.api.Ta(this.Ca("ytp-upnext-autoplay-icon"), this.api.Jf());
        this.cancelButton && this.api.Ta(this.cancelButton.element, this.api.Jf())
    };
    g.k.y5 = function() {
        window.focus();
        this.KE()
    };
    g.k.Az = function(a) {
        var b = this;
        this.zk() || (g.iA("a11y-announce", "Up Next " + this.suggestion.title), this.u = (0, g.M)(), this.j = new g.Yn(function() {
            Yeb(b, a)
        }, 25), Yeb(this, a), Seb(this.api, Xeb(this, a)));
        g.io(this.element, "ytp-upnext-autoplay-paused")
    };
    g.k.hide = function() {
        g.S.prototype.hide.call(this)
    };
    g.k.zk = function() {
        return !!this.j
    };
    g.k.Dv = function() {
        this.Oq();
        this.u = (0, g.M)();
        Yeb(this);
        g.go(this.element, "ytp-upnext-autoplay-paused")
    };
    g.k.Oq = function() {
        this.zk() && (this.j.dispose(), this.j = null)
    };
    g.k.select = function(a) {
        a = void 0 === a ? !1 : a;
        if (this.api.T().K("autonav_notifications") && a && window.Notification && "function" === typeof document.hasFocus) {
            var b = Notification.permission;
            "default" === b ? Notification.requestPermission() : "granted" !== b || document.hasFocus() || (this.KE(), this.notification = new Notification("Up Next", {
                body: this.suggestion.title,
                icon: this.suggestion.gg()
            }), this.B = this.S(this.notification, "click", this.y5), this.C.start())
        }
        this.Oq();
        this.api.nextVideo(!1, a)
    };
    g.k.dZ = function(a) {
        !g.Je(this.cancelButton.element, g.Pz(a)) && g.sS(a, this.api) && (this.api.Jf() && this.api.ub(this.Ca("ytp-upnext-autoplay-icon")), this.select())
    };
    g.k.cZ = function() {
        this.api.Jf() && this.cancelButton && this.api.ub(this.cancelButton.element);
        g.PQ(this.api, !0)
    };
    g.k.p5 = function(a) {
        this.api.getPresentingPlayerType();
        this.show();
        this.Az(a)
    };
    g.k.q5 = function() {
        this.api.getPresentingPlayerType();
        this.Oq();
        this.hide()
    };
    g.k.ra = function() {
        this.Oq();
        this.KE();
        g.S.prototype.ra.call(this)
    };
    g.v(I5, G5);
    g.k = I5.prototype;
    g.k.create = function() {
        G5.prototype.create.call(this);
        this.C.S(this.player, "appresize", this.gA);
        this.C.S(this.player, "onVideoAreaChange", this.gA);
        this.C.S(this.player, "videodatachange", this.onVideoDataChange);
        this.C.S(this.player, "autonavchange", this.RP);
        this.C.S(this.player, "autonavcancel", this.eZ);
        this.onVideoDataChange()
    };
    g.k.show = function() {
        G5.prototype.show.call(this);
        (this.I || this.B && this.B !== this.videoData.clientPlaybackNonce) && g.PQ(this.player, !1);
        g.VQ(this.player) && this.FA() && !this.B ? (J5(this), 2 === this.videoData.autonavState ? this.player.T().K("fast_autonav_in_background") && 3 === this.player.getVisibilityState() ? this.j.select(!0) : this.j.Az() : 3 === this.videoData.autonavState && this.j.Dv()) : (g.PQ(this.player, !0), J5(this));
        this.gA()
    };
    g.k.hide = function() {
        G5.prototype.hide.call(this);
        this.j.Dv();
        J5(this)
    };
    g.k.gA = function() {
        var a = this.player.rk(!0, this.player.isFullscreen());
        J5(this);
        F5(this.u);
        g.ko(this.element, "ytp-autonav-cancelled-small-mode", this.gh(a));
        g.ko(this.element, "ytp-autonav-cancelled-tiny-mode", this.RF(a));
        g.ko(this.element, "ytp-autonav-cancelled-mini-mode", 400 >= a.width || 360 >= a.height);
        this.overlay && g.pl(this.overlay.element, {
            width: a.width + "px"
        });
        if (!this.D)
            for (a = 0; a < this.videos.length; a++) g.ko(this.videos[a].element, "ytp-suggestion-card-with-margin", 1 === a % 2)
    };
    g.k.onVideoDataChange = function() {
        var a = this.player.getVideoData();
        if (this.videoData !== a && a) {
            this.videoData = a;
            if ((a = this.videoData.suggestions) && a.length || this.player.K("web_player_autonav_empty_suggestions_fix")) {
                var b = g.xJ(this.videoData);
                b && (this.j.YD(b), this.j !== this.u && this.u.YD(b))
            }
            if (a && a.length)
                for (b = 0; b < efb.length; ++b) {
                    var c = efb[b];
                    if (a && a[c]) {
                        this.videos[b] = new D5(this.player);
                        var d = this.videos[b];
                        c = a[c];
                        d.suggestion !== c && (d.suggestion = c, C5(d, c));
                        g.D(this, this.videos[b]);
                        this.videos[b].Da(this.J.element)
                    }
                }
            this.gA()
        }
    };
    g.k.RP = function(a) {
        1 === a ? (this.I = !1, this.B = this.videoData.clientPlaybackNonce, this.j.Oq(), this.tb && this.gA()) : (this.I = !0, this.Jf() && (2 === a ? this.j.Az() : 3 === a && this.j.Dv()))
    };
    g.k.eZ = function(a) {
        a ? this.RP(1) : (this.B = null, this.I = !1)
    };
    g.k.FA = function() {
        return 1 !== this.videoData.autonavState
    };
    g.k.gh = function(a) {
        return (910 > a.width || 459 > a.height) && !this.RF(a) && !(400 >= a.width || 360 >= a.height)
    };
    g.k.RF = function(a) {
        return 800 > a.width && !(400 >= a.width || 360 >= a.height)
    };
    g.k.Jf = function() {
        return this.tb && g.VQ(this.player) && this.FA() && !this.B
    };
    var efb = [1, 3, 2, 4];
    g.v(K5, g.S);
    g.k = K5.prototype;
    g.k.onClick = function(a) {
        this.j ? this.F.Na("innertubeCommand", this.j.onTap) : g.tS(this.getVideoUrl(), this.F, a);
        this.F.ub(this.element)
    };
    g.k.getVideoUrl = function() {
        var a = !0;
        switch (this.buttonType) {
            case 1:
                a = !0;
                break;
            case 2:
                a = !1
        }
        a = this.F.getVideoUrl(a, !1, !1, !0);
        var b = this.F.T();
        if (g.XH(b) || g.fI(b)) {
            var c = {};
            b.ya && g.XH(b) && g.$P(c, b.loaderUrl);
            g.XH(b) && g.zQ(this.F, "addEmbedsConversionTrackingParams", [c]);
            a: {
                switch (this.buttonType) {
                    case 2:
                        b = "emb_ytp_continue_watching";
                        break a
                }
                b = "emb_ytp_watch_again"
            }
            g.ZP(c, b);
            a = g.$h(a, c)
        }
        return a
    };
    g.k.Ta = function() {
        this.F.Ta(this.element, this.tb && this.Aa)
    };
    g.k.show = function() {
        g.S.prototype.show.call(this);
        this.Ta()
    };
    g.k.hide = function() {
        g.S.prototype.hide.call(this);
        this.Ta()
    };
    g.k.jc = function(a) {
        g.S.prototype.jc.call(this, a);
        this.Ta()
    };
    g.v(L5, G5);
    L5.prototype.show = function() {
        3 !== this.player.getPlayerState() && (G5.prototype.show.call(this), this.j.rz(!0), this.j.Lq(!0), this.F.T().Wl || this.j.Kq(!0), this.F.Ta(this.element, !0), this.watchButton.jc(!0))
    };
    L5.prototype.hide = function() {
        G5.prototype.hide.call(this);
        this.j.rz(!1);
        this.j.Lq(!1);
        this.j.Kq(!1);
        this.F.Ta(this.element, !1);
        this.watchButton.jc(!1)
    };
    g.v(Zeb, G5);
    Zeb.prototype.La = function() {
        var a = this.player.getVideoData();
        this.j.update({
            profilePicture: a.profilePicture,
            author: a.author
        });
        this.subscribeButton.channelId = a.Xj;
        var b = this.subscribeButton;
        a.subscribed ? b.j() : b.u()
    };
    g.v(M5, g.S);
    M5.prototype.select = function() {
        this.api.Fn(this.suggestion.videoId, this.suggestion.sessionData, this.suggestion.playlistId, void 0, void 0, this.suggestion.aB || void 0) && this.api.ub(this.element)
    };
    M5.prototype.onClick = function(a) {
        g.sS(a, this.api, this.u, this.suggestion.sessionData || void 0) && this.select()
    };
    M5.prototype.onKeyPress = function(a) {
        switch (a.keyCode) {
            case 13:
            case 32:
                g.Uz(a) || (this.select(), g.Tz(a))
        }
    };
    M5.prototype.onVideoDataChange = function() {
        var a = this.api.getVideoData(),
            b = this.api.T();
        this.u = a.D ? !1 : b.C
    };
    g.v(N5, G5);
    g.k = N5.prototype;
    g.k.create = function() {
        G5.prototype.create.call(this);
        var a = this.player.getVideoData();
        a && (this.videoData = a);
        this.vp();
        this.u.S(this.player, "appresize", this.vp);
        this.u.S(this.player, "onVideoAreaChange", this.vp);
        this.u.S(this.player, "videodatachange", this.onVideoDataChange);
        this.u.S(this.player, "autonavchange", this.vI);
        this.u.S(this.player, "autonavcancel", this.fZ);
        a = this.videoData.autonavState;
        a !== this.V && this.vI(a);
        this.u.S(this.element, "transitionend", this.L6)
    };
    g.k.destroy = function() {
        g.$A(this.u);
        g.Za(this.stills);
        this.stills = [];
        G5.prototype.destroy.call(this);
        g.io(this.element, "ytp-show-tiles");
        this.I.stop();
        this.V = this.videoData.autonavState
    };
    g.k.FA = function() {
        return 1 !== this.videoData.autonavState
    };
    g.k.show = function() {
        var a = this.tb;
        G5.prototype.show.call(this);
        $eb(this);
        g.io(this.element, "ytp-show-tiles");
        this.player.T().u ? g.$n(this.I) : this.I.start();
        (this.D || this.C && this.C !== this.videoData.clientPlaybackNonce) && g.PQ(this.player, !1);
        O5(this) ? (P5(this), 2 === this.videoData.autonavState ? this.player.T().K("fast_autonav_in_background") && 3 === this.player.getVisibilityState() ? this.j.select(!0) : this.j.Az() : 3 === this.videoData.autonavState && this.j.Dv()) : (g.PQ(this.player, !0), P5(this));
        a !== this.tb && this.player.Ta(this.element, !0)
    };
    g.k.hide = function() {
        var a = this.tb;
        G5.prototype.hide.call(this);
        this.j.Dv();
        P5(this);
        a !== this.tb && this.player.Ta(this.element, !1)
    };
    g.k.L6 = function(a) {
        g.Pz(a) === this.element && this.vp()
    };
    g.k.vp = function() {
        var a = $eb(this);
        if (a.length) {
            g.go(this.element, "ytp-endscreen-paginate");
            var b = this.F.rk(!0, this.F.isFullscreen()),
                c = g.CQ(this.F);
            c && (c = c.jg() ? 48 : 32, b.width -= 2 * c);
            var d = b.width / b.height,
                e = 96 / 54,
                f = c = 2,
                h = Math.max(b.width / 96, 2),
                l = Math.max(b.height / 54, 2),
                m = a.length,
                n = Math.pow(2, 2);
            var p = m * n + (Math.pow(2, 2) - n);
            p += Math.pow(2, 2) - n;
            for (p -= n; 0 < p && (c < h || f < l);) {
                var q = c / 2,
                    r = f / 2,
                    w = c <= h - 2 && p >= r * n,
                    x = f <= l - 2 && p >= q * n;
                if ((q + 1) / r * e / d > d / (q / (r + 1) * e) && x) p -= q * n, f += 2;
                else if (w) p -= r * n, c += 2;
                else if (x) p -= q *
                    n, f += 2;
                else break
            }
            e = !1;
            p >= 3 * n && 6 >= m * n - p && (4 <= f || 4 <= c) && (e = !0);
            n = 96 * c;
            p = 54 * f;
            d = n / p < d ? b.height / p : b.width / n;
            d = Math.min(d, 2);
            n = Math.floor(Math.min(b.width, n * d));
            p = Math.floor(Math.min(b.height, p * d));
            b = this.table.element;
            b.ariaLive = "polite";
            g.zl(b, n, p);
            g.pl(b, {
                marginLeft: n / -2 + "px",
                marginTop: p / -2 + "px"
            });
            this.j.YD(g.xJ(this.videoData));
            this.j instanceof E5 && F5(this.j);
            g.ko(this.element, "ytp-endscreen-takeover", O5(this));
            P5(this);
            n += 4;
            p += 4;
            d = 0;
            b.ariaBusy = "true";
            for (h = 0; h < c; h++)
                for (l = 0; l < f; l++)
                    if (q = d, w = 0, e &&
                        h >= c - 2 && l >= f - 2 ? w = 1 : 0 === l % 2 && 0 === h % 2 && (2 > l && 2 > h ? 0 === l && 0 === h && (w = 2) : w = 2), q = g.Td(q + this.B, m), 0 !== w) {
                        r = this.stills[d];
                        r || (r = new M5(this.player), this.stills[d] = r, b.appendChild(r.element));
                        x = Math.floor(p * l / f);
                        var z = Math.floor(n * h / c),
                            B = Math.floor(p * (l + w) / f) - x - 4,
                            E = Math.floor(n * (h + w) / c) - z - 4;
                        g.vl(r.element, z, x);
                        g.zl(r.element, E, B);
                        g.pl(r.element, "transitionDelay", (l + h) / 20 + "s");
                        g.ko(r.element, "ytp-videowall-still-mini", 1 === w);
                        g.ko(r.element, "ytp-videowall-still-large", 2 < w);
                        this.Y && (w = Math.max(E, B), g.ko(r.element,
                            "ytp-videowall-still-round-large", 256 <= w), g.ko(r.element, "ytp-videowall-still-round-medium", 96 < w && 256 > w), g.ko(r.element, "ytp-videowall-still-round-small", 96 >= w));
                        q = a[q];
                        r.suggestion !== q && (r.suggestion = q, w = r.api.T(), x = g.fo(r.element, "ytp-videowall-still-large") ? "hqdefault.jpg" : "mqdefault.jpg", C5(r, q, x), g.XH(w) && (x = q.Do(), z = {}, w.ya && g.$P(z, w.loaderUrl), g.zQ(r.api, "addEmbedsConversionTrackingParams", [z]), x = g.$h(x, g.ZP(z, "emb_rel_end")), r.updateValue("url", x)), (q = (q = q.sessionData) && q.itct) && r.api.jh(r.element,
                            q));
                        d++
                    }
            b.ariaBusy = "false";
            g.ko(this.element, "ytp-endscreen-paginate", d < m);
            for (a = this.stills.length - 1; a >= d; a--) c = this.stills[a], g.He(c.element), g.Ya(c);
            this.stills.length = d
        }
    };
    g.k.onVideoDataChange = function() {
        var a = this.player.getVideoData();
        this.videoData !== a && (this.B = 0, this.videoData = a, this.vp())
    };
    g.k.gZ = function() {
        this.B += this.stills.length;
        this.vp()
    };
    g.k.hZ = function() {
        this.B -= this.stills.length;
        this.vp()
    };
    g.k.mU = function() {
        return this.j.zk()
    };
    g.k.vI = function(a) {
        1 === a ? (this.D = !1, this.C = this.videoData.clientPlaybackNonce, this.j.Oq(), this.tb && this.vp()) : (this.D = !0, this.tb && O5(this) && (2 === a ? this.j.Az() : 3 === a && this.j.Dv()))
    };
    g.k.fZ = function(a) {
        if (a) {
            for (a = 0; a < this.stills.length; a++) this.F.Ta(this.stills[a].element, !0);
            this.vI(1)
        } else this.C = null, this.D = !1;
        this.vp()
    };
    g.k.Jf = function() {
        return this.tb && O5(this)
    };
    g.v(Q5, G5);
    Q5.prototype.show = function() {
        if (3 !== this.player.getPlayerState()) {
            G5.prototype.show.call(this);
            var a = this.u;
            if (a) {
                var b = 0 < this.j.suggestionData.length;
                g.ko(this.element, "ytp-shorts-branded-ui", b);
                b ? a.show() : a.hide()
            }
            var c;
            null == (c = g.CQ(this.player)) || c.oD(!0);
            this.player.Ta(this.element, !0);
            this.watchButton.jc(!0)
        }
    };
    Q5.prototype.hide = function() {
        G5.prototype.hide.call(this);
        var a;
        null == (a = g.CQ(this.player)) || a.oD(!1);
        this.player.Ta(this.element, !1);
        this.watchButton.jc(!1)
    };
    g.v(dfb, g.RR);
    g.k = dfb.prototype;
    g.k.Uv = function() {
        var a;
        if ((null == (a = g.CQ(this.player)) ? 0 : a.xd()) || this.u) return !0;
        a = this.player.getVideoData();
        var b;
        var c = !!((null == a ? 0 : g.xJ(a)) || (null == a ? 0 : null == (b = a.suggestions) ? 0 : b.length));
        b = !afb(this.player) || c;
        c = a.Kj || g.fI(a.B);
        var d = this.player.lB();
        a = a.mutedAutoplay;
        return b && !c && !d && !a
    };
    g.k.Jf = function() {
        return this.endScreen.Jf()
    };
    g.k.n3 = function() {
        return this.Jf() ? this.endScreen.mU() : !1
    };
    g.k.ra = function() {
        this.player.Kf("endscreen");
        g.RR.prototype.ra.call(this)
    };
    g.k.load = function() {
        var a = this.player.getVideoData();
        var b = a.transitionEndpointAtEndOfStream;
        if (b && b.videoId) {
            var c = this.player.vb().Ye.get("heartbeat"),
                d = g.xJ(a);
            !d || b.videoId !== d.videoId || a.MK ? (this.player.Fn(b.videoId, void 0, void 0, !0, !0, b), c && c.XF("HEARTBEAT_ACTION_TRIGGER_AT_STREAM_END", "HEARTBEAT_ACTION_TRANSITION_REASON_HAS_NEW_STREAM_TRANSITION_ENDPOINT"), a = !0) : a = !1
        } else a = !1;
        a || (g.RR.prototype.load.call(this), this.endScreen.show())
    };
    g.k.unload = function() {
        g.RR.prototype.unload.call(this);
        this.endScreen.hide();
        this.endScreen.destroy()
    };
    g.k.onCueRangeEnter = function(a) {
        this.Uv() && (this.endScreen.created || this.endScreen.create(), "load" === a.getId() && this.load())
    };
    g.k.onCueRangeExit = function(a) {
        "load" === a.getId() && this.loaded && this.unload()
    };
    g.k.onVideoDataChange = function() {
        cfb(this);
        this.C && bfb(this) && (this.endScreen && (this.endScreen.hide(), this.endScreen.created && this.endScreen.destroy(), this.endScreen.dispose()), this.j ? this.endScreen = new I5(this.player) : this.endScreen = new N5(this.player), g.D(this, this.endScreen), g.UQ(this.player, this.endScreen.element, 4))
    };
    g.QR("endscreen", dfb);
})(_yt_player);