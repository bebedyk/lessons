(() => {
    var __webpack_modules__ = {
        144: function(module) {
            !function(e, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                const e = "undefined" != typeof window, t = e && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), a = e && window.devicePixelRatio > 1, n = {
                    elements_selector: ".lazy",
                    container: t || e ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, s = e => Object.assign({}, n, e), l = function(e, t) {
                    let a;
                    const n = "LazyLoad::Initialized", s = new e(t);
                    try {
                        a = new CustomEvent(n, {
                            detail: {
                                instance: s
                            }
                        });
                    } catch (e) {
                        a = document.createEvent("CustomEvent"), a.initCustomEvent(n, !1, !1, {
                            instance: s
                        });
                    }
                    window.dispatchEvent(a);
                }, o = "src", r = "srcset", i = "sizes", d = "poster", c = "llOriginalAttrs", _ = "data", u = "loading", g = "loaded", b = "applied", h = "error", m = "native", p = "data-", f = "ll-status", v = (e, t) => e.getAttribute(p + t), E = e => v(e, f), I = (e, t) => ((e, t, a) => {
                    const n = p + t;
                    null !== a ? e.setAttribute(n, a) : e.removeAttribute(n);
                })(e, f, t), y = e => I(e, null), k = e => null === E(e), A = e => E(e) === m, L = [ u, g, b, h ], w = (e, t, a, n) => {
                    e && "function" == typeof e && (void 0 === n ? void 0 === a ? e(t) : e(t, a) : e(t, a, n));
                }, x = (t, a) => {
                    e && "" !== a && t.classList.add(a);
                }, C = (t, a) => {
                    e && "" !== a && t.classList.remove(a);
                }, O = e => e.llTempImage, M = (e, t) => {
                    if (!t) return;
                    const a = t._observer;
                    a && a.unobserve(e);
                }, z = (e, t) => {
                    e && (e.loadingCount += t);
                }, N = (e, t) => {
                    e && (e.toLoadCount = t);
                }, T = e => {
                    let t = [];
                    for (let a, n = 0; a = e.children[n]; n += 1) "SOURCE" === a.tagName && t.push(a);
                    return t;
                }, R = (e, t) => {
                    const a = e.parentNode;
                    a && "PICTURE" === a.tagName && T(a).forEach(t);
                }, G = (e, t) => {
                    T(e).forEach(t);
                }, D = [ o ], H = [ o, d ], V = [ o, r, i ], F = [ _ ], j = e => !!e[c], B = e => e[c], J = e => delete e[c], S = (e, t) => {
                    if (j(e)) return;
                    const a = {};
                    t.forEach((t => {
                        a[t] = e.getAttribute(t);
                    })), e[c] = a;
                }, P = (e, t) => {
                    if (!j(e)) return;
                    const a = B(e);
                    t.forEach((t => {
                        ((e, t, a) => {
                            a ? e.setAttribute(t, a) : e.removeAttribute(t);
                        })(e, t, a[t]);
                    }));
                }, U = (e, t, a) => {
                    x(e, t.class_applied), I(e, b), a && (t.unobserve_completed && M(e, t), w(t.callback_applied, e, a));
                }, $ = (e, t, a) => {
                    x(e, t.class_loading), I(e, u), a && (z(a, 1), w(t.callback_loading, e, a));
                }, q = (e, t, a) => {
                    a && e.setAttribute(t, a);
                }, K = (e, t) => {
                    q(e, i, v(e, t.data_sizes)), q(e, r, v(e, t.data_srcset)), q(e, o, v(e, t.data_src));
                }, Q = {
                    IMG: (e, t) => {
                        R(e, (e => {
                            S(e, V), K(e, t);
                        })), S(e, V), K(e, t);
                    },
                    IFRAME: (e, t) => {
                        S(e, D), q(e, o, v(e, t.data_src));
                    },
                    VIDEO: (e, t) => {
                        G(e, (e => {
                            S(e, D), q(e, o, v(e, t.data_src));
                        })), S(e, H), q(e, d, v(e, t.data_poster)), q(e, o, v(e, t.data_src)), e.load();
                    },
                    OBJECT: (e, t) => {
                        S(e, F), q(e, _, v(e, t.data_src));
                    }
                }, W = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], X = (e, t) => {
                    !t || (e => e.loadingCount > 0)(t) || (e => e.toLoadCount > 0)(t) || w(e.callback_finish, t);
                }, Y = (e, t, a) => {
                    e.addEventListener(t, a), e.llEvLisnrs[t] = a;
                }, Z = (e, t, a) => {
                    e.removeEventListener(t, a);
                }, ee = e => !!e.llEvLisnrs, te = e => {
                    if (!ee(e)) return;
                    const t = e.llEvLisnrs;
                    for (let a in t) {
                        const n = t[a];
                        Z(e, a, n);
                    }
                    delete e.llEvLisnrs;
                }, ae = (e, t, a) => {
                    (e => {
                        delete e.llTempImage;
                    })(e), z(a, -1), (e => {
                        e && (e.toLoadCount -= 1);
                    })(a), C(e, t.class_loading), t.unobserve_completed && M(e, a);
                }, ne = (e, t, a) => {
                    const n = O(e) || e;
                    ee(n) || ((e, t, a) => {
                        ee(e) || (e.llEvLisnrs = {});
                        const n = "VIDEO" === e.tagName ? "loadeddata" : "load";
                        Y(e, n, t), Y(e, "error", a);
                    })(n, (s => {
                        ((e, t, a, n) => {
                            const s = A(t);
                            ae(t, a, n), x(t, a.class_loaded), I(t, g), w(a.callback_loaded, t, n), s || X(a, n);
                        })(0, e, t, a), te(n);
                    }), (s => {
                        ((e, t, a, n) => {
                            const s = A(t);
                            ae(t, a, n), x(t, a.class_error), I(t, h), w(a.callback_error, t, n), a.restore_on_error && P(t, V), 
                            s || X(a, n);
                        })(0, e, t, a), te(n);
                    }));
                }, se = (e, t, n) => {
                    (e => W.indexOf(e.tagName) > -1)(e) ? ((e, t, a) => {
                        ne(e, t, a), ((e, t, a) => {
                            const n = Q[e.tagName];
                            n && (n(e, t), $(e, t, a));
                        })(e, t, a);
                    })(e, t, n) : ((e, t, n) => {
                        (e => {
                            e.llTempImage = document.createElement("IMG");
                        })(e), ne(e, t, n), (e => {
                            j(e) || (e[c] = {
                                backgroundImage: e.style.backgroundImage
                            });
                        })(e), ((e, t, n) => {
                            const s = v(e, t.data_bg), l = v(e, t.data_bg_hidpi), r = a && l ? l : s;
                            r && (e.style.backgroundImage = `url("${r}")`, O(e).setAttribute(o, r), $(e, t, n));
                        })(e, t, n), ((e, t, n) => {
                            const s = v(e, t.data_bg_multi), l = v(e, t.data_bg_multi_hidpi), o = a && l ? l : s;
                            o && (e.style.backgroundImage = o, U(e, t, n));
                        })(e, t, n), ((e, t, a) => {
                            const n = v(e, t.data_bg_set);
                            if (!n) return;
                            let s = n.split("|").map((e => `image-set(${e})`));
                            e.style.backgroundImage = s.join(), U(e, t, a);
                        })(e, t, n);
                    })(e, t, n);
                }, le = e => {
                    e.removeAttribute(o), e.removeAttribute(r), e.removeAttribute(i);
                }, oe = e => {
                    R(e, (e => {
                        P(e, V);
                    })), P(e, V);
                }, re = {
                    IMG: oe,
                    IFRAME: e => {
                        P(e, D);
                    },
                    VIDEO: e => {
                        G(e, (e => {
                            P(e, D);
                        })), P(e, H), e.load();
                    },
                    OBJECT: e => {
                        P(e, F);
                    }
                }, ie = (e, t) => {
                    (e => {
                        const t = re[e.tagName];
                        t ? t(e) : (e => {
                            if (!j(e)) return;
                            const t = B(e);
                            e.style.backgroundImage = t.backgroundImage;
                        })(e);
                    })(e), ((e, t) => {
                        k(e) || A(e) || (C(e, t.class_entered), C(e, t.class_exited), C(e, t.class_applied), 
                        C(e, t.class_loading), C(e, t.class_loaded), C(e, t.class_error));
                    })(e, t), y(e), J(e);
                }, de = [ "IMG", "IFRAME", "VIDEO" ], ce = e => e.use_native && "loading" in HTMLImageElement.prototype, _e = (e, t, a) => {
                    e.forEach((e => (e => e.isIntersecting || e.intersectionRatio > 0)(e) ? ((e, t, a, n) => {
                        const s = (e => L.indexOf(E(e)) >= 0)(e);
                        I(e, "entered"), x(e, a.class_entered), C(e, a.class_exited), ((e, t, a) => {
                            t.unobserve_entered && M(e, a);
                        })(e, a, n), w(a.callback_enter, e, t, n), s || se(e, a, n);
                    })(e.target, e, t, a) : ((e, t, a, n) => {
                        k(e) || (x(e, a.class_exited), ((e, t, a, n) => {
                            a.cancel_on_exit && (e => E(e) === u)(e) && "IMG" === e.tagName && (te(e), (e => {
                                R(e, (e => {
                                    le(e);
                                })), le(e);
                            })(e), oe(e), C(e, a.class_loading), z(n, -1), y(e), w(a.callback_cancel, e, t, n));
                        })(e, t, a, n), w(a.callback_exit, e, t, n));
                    })(e.target, e, t, a)));
                }, ue = e => Array.prototype.slice.call(e), ge = e => e.container.querySelectorAll(e.elements_selector), be = e => (e => E(e) === h)(e), he = (e, t) => (e => ue(e).filter(k))(e || ge(t)), me = function(t, a) {
                    const n = s(t);
                    this._settings = n, this.loadingCount = 0, ((e, t) => {
                        ce(e) || (t._observer = new IntersectionObserver((a => {
                            _e(a, e, t);
                        }), (e => ({
                            root: e.container === document ? null : e.container,
                            rootMargin: e.thresholds || e.threshold + "px"
                        }))(e)));
                    })(n, this), ((t, a) => {
                        e && (a._onlineHandler = () => {
                            ((e, t) => {
                                var a;
                                (a = ge(e), ue(a).filter(be)).forEach((t => {
                                    C(t, e.class_error), y(t);
                                })), t.update();
                            })(t, a);
                        }, window.addEventListener("online", a._onlineHandler));
                    })(n, this), this.update(a);
                };
                return me.prototype = {
                    update: function(e) {
                        const a = this._settings, n = he(e, a);
                        var s, l;
                        N(this, n.length), t ? this.loadAll(n) : ce(a) ? ((e, t, a) => {
                            e.forEach((e => {
                                -1 !== de.indexOf(e.tagName) && ((e, t, a) => {
                                    e.setAttribute("loading", "lazy"), ne(e, t, a), ((e, t) => {
                                        const a = Q[e.tagName];
                                        a && a(e, t);
                                    })(e, t), I(e, m);
                                })(e, t, a);
                            })), N(a, 0);
                        })(n, a, this) : (l = n, (e => {
                            e.disconnect();
                        })(s = this._observer), ((e, t) => {
                            t.forEach((t => {
                                e.observe(t);
                            }));
                        })(s, l));
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), e && window.removeEventListener("online", this._onlineHandler), 
                        ge(this._settings).forEach((e => {
                            J(e);
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(e) {
                        const t = this._settings;
                        he(e, t).forEach((e => {
                            M(e, this), se(e, t, this);
                        }));
                    },
                    restoreAll: function() {
                        const e = this._settings;
                        ge(e).forEach((t => {
                            ie(t, e);
                        }));
                    }
                }, me.load = (e, t) => {
                    const a = s(t);
                    se(e, a);
                }, me.resetStatus = e => {
                    y(e);
                }, e && ((e, t) => {
                    if (t) if (t.length) for (let a, n = 0; a = t[n]; n += 1) l(e, a); else l(e, t);
                })(me, window.lazyLoadOptions), me;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    lockPaddingElements.forEach((lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    }));
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                }));
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    const headerElement = document.querySelector(headerItem);
                    if (!headerElement.classList.contains("_header-scroll")) {
                        headerElement.style.cssText = `transition-duration: 0s;`;
                        headerElement.classList.add("_header-scroll");
                        headerItemHeight = headerElement.offsetHeight;
                        headerElement.classList.remove("_header-scroll");
                        setTimeout((() => {
                            headerElement.style.cssText = ``;
                        }), 0);
                    } else headerItemHeight = headerElement.offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
            } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
        };
        function formRating() {
            const ratings = document.querySelectorAll("[data-rating]");
            if (ratings) ratings.forEach((rating => {
                const ratingValue = +rating.dataset.ratingValue;
                const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
                formRatingInit(rating, ratingSize);
                ratingValue ? formRatingSet(rating, ratingValue) : null;
                document.addEventListener("click", formRatingAction);
            }));
            function formRatingAction(e) {
                const targetElement = e.target;
                if (targetElement.closest(".rating__input")) {
                    const currentElement = targetElement.closest(".rating__input");
                    const ratingValue = +currentElement.value;
                    const rating = currentElement.closest(".rating");
                    const ratingSet = rating.dataset.rating === "set";
                    ratingSet ? formRatingGet(rating, ratingValue) : null;
                }
            }
            function formRatingInit(rating, ratingSize) {
                let ratingItems = ``;
                for (let index = 0; index < ratingSize; index++) {
                    index === 0 ? ratingItems += `<div class="rating__items">` : null;
                    ratingItems += `\n\t\t\t\t<label class="rating__item">\n\t\t\t\t\t<input class="rating__input" type="radio" name="rating" value="${index + 1}">\n\t\t\t\t</label>`;
                    index === ratingSize ? ratingItems += `</div">` : null;
                }
                rating.insertAdjacentHTML("beforeend", ratingItems);
            }
            function formRatingGet(rating, ratingValue) {
                const resultRating = ratingValue;
                formRatingSet(rating, resultRating);
            }
            function formRatingSet(rating, value) {
                const ratingItems = rating.querySelectorAll(".rating__item");
                const resultFullItems = parseInt(value);
                const resultPartItem = value - resultFullItems;
                rating.hasAttribute("data-rating-title") ? rating.title = value : null;
                ratingItems.forEach(((ratingItem, index) => {
                    ratingItem.classList.remove("rating__item--active");
                    ratingItem.querySelector("span") ? ratingItems[index].querySelector("span").remove() : null;
                    if (index <= resultFullItems - 1) ratingItem.classList.add("rating__item--active");
                    if (index === resultFullItems && resultPartItem) ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
                }));
            }
        }
        var lazyload_min = __webpack_require__(144);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                            let valueOfThreshold;
                            if (item.clientHeight > 2) {
                                valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                                if (valueOfThreshold > 1) valueOfThreshold = 1;
                            } else valueOfThreshold = 1;
                            item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                        }
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                    return;
                }
                if (paramsWatch.threshold === "prx") {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                console.log(configWatcher);
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        modules_flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if (e.type === "click") {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        if (modules_flsModules.fullpage) {
                            const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                            const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                            if (fullpageSectionId !== null) {
                                modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                            }
                        } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        e.preventDefault();
                    }
                } else if (e.type === "watcherCallback" && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if (targetElement.dataset.watch === "navigator") {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        document.addEventListener("DOMContentLoaded", (function() {
            const svgFrames = document.querySelectorAll(".svg-frame");
            const itemsContainer = document.querySelector(".umiejetnosci__box");
            const items = Array.from(document.querySelectorAll(".item"));
            const bubbleContainer = document.querySelector(".bubble-container");
            const rays = document.querySelector(".rays");
            const ray = rays.querySelector(".ray");
            const form = document.getElementById("contact-form");
            const meteorSection = document.querySelector(".meteor-section");
            const animeItems = document.querySelectorAll(".info__anime-scrol");
            const container = document.querySelector(".info__text");
            const content = document.querySelector(".info__fon");
            const carousel = document.querySelector(".carousel__cards");
            const cards = document.querySelectorAll(".carousel__card");
            const next = document.querySelector(".carousel__btn--next");
            const back = document.querySelector(".carousel__btn--back");
            const section = document.querySelector(".oferty__block-star");
            const starCount = 7;
            const widthRange = section.clientWidth;
            const heightRange = section.clientHeight;
            let starsCreated = false;
            function createStars() {
                if (window.innerWidth <= 1023) {
                    clearStars();
                    starsCreated = false;
                    return;
                }
                if (!starsCreated) {
                    for (let i = 0; i < starCount; i++) {
                        const star = document.createElement("div");
                        star.className = "star";
                        randomizePosition(star, widthRange, heightRange);
                        star.style.animationDelay = Math.random() * 3 + "s";
                        section.appendChild(star);
                        star.addEventListener("animationiteration", (() => {
                            randomizePosition(star, widthRange, heightRange);
                        }));
                    }
                    starsCreated = true;
                }
            }
            function clearStars() {
                const stars = section.querySelectorAll(".star");
                stars.forEach((star => star.remove()));
            }
            function randomizePosition(star, widthRange, heightRange) {
                const offsetX = Math.random() * widthRange;
                const offsetY = Math.random() * heightRange;
                star.style.left = `${offsetX}px`;
                star.style.top = `${offsetY}px`;
            }
            createStars();
            window.addEventListener("resize", createStars);
            svgFrames.forEach((svgFrame => {
                svgFrame.addEventListener("mouseenter", (() => svgFrame.classList.add("hover-effect")));
                svgFrame.addEventListener("mouseleave", (() => svgFrame.classList.remove("hover-effect")));
            }));
            function updateLayout() {
                const fragment = document.createDocumentFragment();
                itemsContainer.innerHTML = "";
                if (window.innerWidth <= 1125) {
                    const rows = [ [ 0, 3, 4 ], [ 1, 5, 6 ], [ 2, 7, 8 ] ];
                    rows.forEach((indices => {
                        fragment.appendChild(items[indices[0]]);
                        const row = document.createElement("div");
                        row.classList.add("small-items-wrapper");
                        row.append(...indices.slice(1).map((i => items[i])));
                        fragment.appendChild(row);
                    }));
                } else items.forEach((item => fragment.appendChild(item)));
                itemsContainer.appendChild(fragment);
            }
            window.addEventListener("resize", updateLayout);
            updateLayout();
            let bubblesCreated = false;
            function createBubbles() {
                if (window.matchMedia("(max-width: 1125px)").matches) {
                    if (bubblesCreated) {
                        bubbleContainer.innerHTML = "";
                        bubblesCreated = false;
                    }
                    return;
                }
                if (!bubblesCreated) {
                    const fragment = document.createDocumentFragment();
                    for (let i = 0; i < 20; i++) {
                        const bubble = document.createElement("div");
                        bubble.classList.add("bubble");
                        randomizeBubble(bubble);
                        fragment.appendChild(bubble);
                    }
                    bubbleContainer.appendChild(fragment);
                    bubblesCreated = true;
                }
            }
            function randomizeBubble(bubble) {
                const randomLeft = `${Math.random() * 100}%`;
                const randomDelay = `${Math.random() * 10}s`;
                const randomDuration = `${Math.random() * 5 + 8}s`;
                bubble.style.left = randomLeft;
                bubble.style.animationDelay = randomDelay;
                bubble.style.animationDuration = randomDuration;
                bubble.style.width = `${Math.random() * 25 + 35}px`;
                bubble.style.height = bubble.style.width;
                bubble.style.animation = `rise ${randomDuration} ease-in ${randomDelay} infinite`;
            }
            createBubbles();
            window.addEventListener("resize", createBubbles);
            function resetBubble(bubble) {
                bubble.classList.remove("pop");
                bubble.style.animation = "none";
                bubble.style.transform = "translateY(0)";
                setTimeout((() => {
                    randomizeBubble(bubble);
                }), 50);
            }
            function randomPop() {
                const bubbles = document.querySelectorAll(".bubble");
                const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
                if (randomBubble) {
                    randomBubble.classList.add("pop");
                    setTimeout((() => {
                        resetBubble(randomBubble);
                    }), 300);
                }
            }
            createBubbles();
            bubbleContainer.addEventListener("animationend", (event => {
                if (event.target.classList.contains("bubble")) resetBubble(event.target);
            }));
            setInterval(randomPop, 350);
            let isDragging = false;
            let startX;
            let currentAngle = 0;
            const step = 45;
            const threshold = 10;
            function updateCarousel() {
                carousel.style.transform = `translateZ(-30rem) rotateX(-10deg) rotateY(${currentAngle}deg)`;
                cards.forEach(((card, index) => {
                    card.style.transform = `rotateY(${index * step}deg) translateZ(35rem)`;
                }));
            }
            function roundToNearestStep(angle) {
                return Math.round(angle / step) * step;
            }
            carousel.addEventListener("mousedown", (e => {
                isDragging = true;
                startX = e.pageX;
                carousel.style.cursor = "grabbing";
                e.preventDefault();
            }));
            document.addEventListener("mouseup", (() => {
                if (isDragging) {
                    isDragging = false;
                    currentAngle = roundToNearestStep(currentAngle);
                    updateCarousel();
                    carousel.style.cursor = "grab";
                }
            }));
            document.addEventListener("mousemove", (e => {
                if (!isDragging) return;
                const dx = e.pageX - startX;
                if (Math.abs(dx) < threshold) return;
                currentAngle += dx * .4;
                startX = e.pageX;
                window.requestAnimationFrame(updateCarousel);
            }));
            document.addEventListener("mouseleave", (() => {
                if (isDragging) {
                    isDragging = false;
                    currentAngle = roundToNearestStep(currentAngle);
                    updateCarousel();
                    carousel.style.cursor = "grab";
                }
            }));
            next.addEventListener("click", (() => {
                currentAngle -= step;
                updateCarousel();
            }));
            back.addEventListener("click", (() => {
                currentAngle += step;
                updateCarousel();
            }));
            updateCarousel();
            function handleScroll() {
                const windowHeight = window.innerHeight;
                animeItems.forEach((item => {
                    const itemTop = item.getBoundingClientRect().top;
                    const scrollPercentage = Math.min(Math.max((windowHeight - itemTop) / windowHeight, 0), 1);
                    const speed = parseFloat(item.dataset.speed) || 1;
                    const adjustedScroll = Math.min(scrollPercentage * speed, 1);
                    const startXPercent = parseFloat(item.dataset.startX) || 0;
                    const startYPercent = parseFloat(item.dataset.startY) || 0;
                    const endXPercent = parseFloat(item.dataset.endX) || 0;
                    const endYPercent = parseFloat(item.dataset.endY) || 0;
                    const translateX = startXPercent + adjustedScroll * (endXPercent - startXPercent);
                    const translateY = startYPercent + adjustedScroll * (endYPercent - startYPercent);
                    item.style.transform = `translate(${translateX}%, ${translateY}%)`;
                    item.style.opacity = adjustedScroll;
                }));
            }
            window.addEventListener("scroll", handleScroll);
            handleScroll();
            window.addEventListener("scroll", (() => {
                const scrollPosition = window.scrollY;
                const maxOffset = 15;
                const rotationSpeed = .01;
                const translateSpeed = .1;
                const rotationAngle = Math.min(scrollPosition * rotationSpeed, 20);
                const offsetY = Math.min(scrollPosition * translateSpeed, maxOffset);
                ray.style.transform = `rotate(${28 + rotationAngle}deg) translateY(${offsetY}px)`;
                ray.style.opacity = scrollPosition > 50 ? .5 : 0;
            }));
            form.addEventListener("submit", (function(event) {
                let valid = true;
                const requiredFields = form.querySelectorAll("[required]");
                requiredFields.forEach((field => {
                    if (!field.value) {
                        valid = false;
                        field.style.borderColor = "red";
                    } else field.style.borderColor = "#ccc";
                }));
                if (!valid) {
                    event.preventDefault();
                    alert("Proszę uzupełnić wszystkie wymagane pola.");
                }
            }));
            function createMeteor() {
                const meteor = document.createElement("div");
                meteor.classList.add("meteor");
                const delay = Math.random() * 3;
                const duration = Math.random() * 2 + 3;
                const startX = Math.random() * 70;
                const size = Math.random() * 3.2 + .4;
                const tailLength = Math.random() * 80 + 50;
                const zIndex = Math.floor(Math.random() * 2);
                meteor.style.left = `${startX}%`;
                meteor.style.width = `${size}px`;
                meteor.style.height = `${tailLength}px`;
                meteor.style.animationDelay = `${delay}s`;
                meteor.style.animationDuration = `${duration}s`;
                meteor.style.zIndex = zIndex;
                meteorSection.appendChild(meteor);
                setTimeout((() => {
                    meteor.remove();
                }), (delay + duration) * 1e3);
            }
            function generateMeteors(number) {
                for (let i = 0; i < number; i++) setTimeout(createMeteor, i * 500);
            }
            setInterval((() => {
                generateMeteors(7);
            }), 4e3);
            container.addEventListener("mouseenter", (() => content.classList.add("scroll-active")));
            container.addEventListener("mouseleave", (() => content.classList.remove("scroll-active")));
        }));
        (function() {
            function checkZoomLevel() {
                let zoomLevel = window.devicePixelRatio * 100;
                let element = document.querySelector(".page__label-item");
                if (zoomLevel > 150) element.style.display = "none"; else element.style.display = "flex";
            }
            window.addEventListener("resize", checkZoomLevel);
            window.addEventListener("load", checkZoomLevel);
        })();
        document.addEventListener("DOMContentLoaded", (() => {
            const defaultLang = localStorage.getItem("selectedLang") || "pl";
            const langButtons = document.querySelectorAll(".lang-dropdown__lang-button");
            langButtons.forEach((button => {
                if (button.getAttribute("data-lang") === defaultLang) button.classList.add("active"); else button.classList.remove("active");
            }));
            document.querySelectorAll(".lang").forEach((element => {
                if (element.classList.contains("lang-" + defaultLang)) element.style.display = element.dataset.initialDisplay || "block"; else element.style.display = "none";
            }));
            langButtons.forEach((button => {
                button.addEventListener("click", (function() {
                    langButtons.forEach((btn => {
                        btn.classList.remove("active");
                    }));
                    this.classList.add("active");
                    const selectedLang = this.getAttribute("data-lang");
                    localStorage.setItem("selectedLang", selectedLang);
                    document.querySelectorAll(".lang").forEach((element => {
                        if (element.classList.contains("lang-" + selectedLang)) element.style.display = element.dataset.initialDisplay || "block"; else element.style.display = "none";
                    }));
                }));
            }));
        }));
        const butterflies = document.querySelectorAll(".butterfly-effect__element");
        function getDistance(butterfly1, butterfly2) {
            const rect1 = butterfly1.getBoundingClientRect();
            const rect2 = butterfly2.getBoundingClientRect();
            const dx = rect1.left - rect2.left;
            const dy = rect1.top - rect2.top;
            return Math.sqrt(dx * dx + dy * dy);
        }
        function getRandomTrajectory() {
            const randomX = Math.random() * 130 - 120;
            const randomY = Math.random() * -55 - 90;
            const rotation = Math.random() * -60 - 20;
            return {
                randomX,
                randomY,
                rotation
            };
        }
        function getRandomZIndex() {
            return Math.random() > .5 ? 1 : 0;
        }
        function animateButterfly(butterfly, targetButterfly) {
            let {randomX, randomY, rotation} = getRandomTrajectory();
            let speed = Math.random() * 850 + 2050;
            butterfly.style.zIndex = getRandomZIndex();
            const distance = targetButterfly ? getDistance(butterfly, targetButterfly) : 40;
            if (distance < 40) speed /= 1.6;
            butterfly.style.transition = `transform ${speed}ms ease-in-out`;
            butterfly.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg)`;
            const flapSpeed = Math.max(.05, speed / 6700);
            butterfly.querySelectorAll(".wing").forEach((wing => {
                wing.style.animationDuration = `${flapSpeed}s`;
            }));
            setTimeout((() => {
                animateButterfly(butterfly, targetButterfly);
            }), speed);
        }
        if (butterflies.length === 2) {
            animateButterfly(butterflies[0], butterflies[1]);
            animateButterfly(butterflies[1], butterflies[0]);
        } else butterflies.forEach((butterfly => {
            animateButterfly(butterfly, null);
        }));
        const block = document.getElementById("block");
        if (block) {
            const particles = [];
            const particleCount = 100;
            const particleSize = 3.5;
            const arrowShape = [ {
                x: 0,
                y: -2
            }, {
                x: 0,
                y: -6
            }, {
                x: 0,
                y: -10
            }, {
                x: 0,
                y: -14
            }, {
                x: 7.5,
                y: -13
            }, {
                x: 4,
                y: -16
            }, {
                x: 0,
                y: -19
            }, {
                x: -4,
                y: -16
            }, {
                x: -7.5,
                y: -13
            } ];
            const initialPositions = [];
            function createParticles() {
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement("div");
                    particle.classList.add("particle");
                    const segmentIndex = i % arrowShape.length;
                    const {x, y} = arrowShape[segmentIndex];
                    particle.style.width = `${particleSize}px`;
                    particle.style.height = `${particleSize}px`;
                    particle.style.position = "absolute";
                    particle.style.left = `${100 + x}px`;
                    particle.style.top = `${100 + y}px`;
                    initialPositions.push({
                        x: 100 + x,
                        y: 100 + y
                    });
                    block.appendChild(particle);
                    particles.push(particle);
                }
            }
            function animateParticles(scrollY) {
                particles.forEach(((particle, index) => {
                    const speedFactor = index / particles.length;
                    const maxDistance = 100;
                    const pulseFactor = Math.sin(scrollY / 50 + index) * 70;
                    const angle = (scrollY / 100 + speedFactor * Math.PI * 2) % (Math.PI * 2);
                    const x = Math.cos(angle) * (maxDistance + pulseFactor);
                    const yOffset = scrollY * .013;
                    const y = Math.sin(angle) * (maxDistance + pulseFactor) + yOffset;
                    if (scrollY <= 0) particle.style.transform = `translate(${initialPositions[index].x - 100}px, ${initialPositions[index].y - 100}px)`; else particle.style.transform = `translate(${x}px, ${y}px)`;
                }));
            }
            let scrollTimeout;
            window.addEventListener("scroll", (() => {
                const scrollY = window.scrollY;
                animateParticles(scrollY);
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout((() => {
                    animateParticles(0);
                }), 100);
            }));
            createParticles();
        } else console.error("Блок не знайдено");
        const blockKofElements = document.querySelectorAll(".block-kof");
        if (blockKofElements.length > 0) blockKofElements.forEach((blockKof => {
            const elements = [];
            const elementCountX = 10;
            const elementCountY = 10;
            const elementSizeX = blockKof.offsetWidth / elementCountX;
            const elementSizeY = blockKof.offsetHeight / elementCountY;
            const delay = blockKof.getAttribute("data-delay") || 0;
            function createElements() {
                for (let i = 0; i < elementCountX; i++) for (let j = 0; j < elementCountY; j++) {
                    const element = document.createElement("div");
                    element.classList.add("element");
                    element.style.width = `${elementSizeX}px`;
                    element.style.height = `${elementSizeY}px`;
                    element.style.left = `${i * elementSizeX}px`;
                    element.style.top = `${j * elementSizeY}px`;
                    blockKof.appendChild(element);
                    elements.push(element);
                }
            }
            function explode() {
                elements.forEach(((element, index) => {
                    const offsetX = Math.random() * 400 - 200;
                    const offsetY = Math.random() * 400 - 200;
                    const rotation = Math.random() * 360;
                    setTimeout((() => {
                        element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
                        element.style.opacity = 0;
                        element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
                    }), index * 5);
                }));
            }
            function triggerExplosion() {
                setTimeout((() => {
                    explode();
                }), delay);
            }
            window.addEventListener("scroll", (() => {
                if (window.scrollY > 100) triggerExplosion();
            }));
            createElements();
        })); else console.error("Блоки не знайдено");
        window["FLS"] = true;
        menuInit();
        formRating();
        pageNavigation();
        headerScroll();
    })();
})();