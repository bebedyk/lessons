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
        svgFrames.forEach((svgFrame => {
            svgFrame.addEventListener("mouseenter", (() => svgFrame.classList.add("hover-effect")));
            svgFrame.addEventListener("mouseleave", (() => svgFrame.classList.remove("hover-effect")));
        }));
        function updateLayout() {
            itemsContainer.innerHTML = "";
            if (window.innerWidth <= 1125) {
                const rows = [ [ 0, 3, 4 ], [ 1, 5, 6 ], [ 2, 7, 8 ] ];
                rows.forEach((indices => {
                    itemsContainer.appendChild(items[indices[0]]);
                    const row = document.createElement("div");
                    row.classList.add("small-items-wrapper");
                    row.append(...indices.slice(1).map((i => items[i])));
                    itemsContainer.appendChild(row);
                }));
            } else items.forEach((item => itemsContainer.appendChild(item)));
        }
        window.addEventListener("resize", updateLayout);
        updateLayout();
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.animationDelay = `${Math.random() * 10}s`;
            bubble.style.width = `${Math.random() * 40 + 10}px`;
            bubble.style.height = bubble.style.width;
            bubbleContainer.appendChild(bubble);
        }
        document.querySelectorAll(".bubble").forEach((bubble => {
            bubble.addEventListener("animationend", (() => bubble.classList.add("pop")));
        }));
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
            const rotationSpeed = dx * .4;
            currentAngle += rotationSpeed;
            startX = e.pageX;
            updateCarousel();
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
            window.innerHeight;
            animeItems.forEach((item => {
                const itemTop = item.getBoundingClientRect().top;
                const scrollPercentage = Math.min(Math.max((window.innerHeight - itemTop) / window.innerHeight, 0), 1);
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
            const startX = Math.random() * 120;
            const size = Math.random() * 3.2 + .4;
            const tailLength = Math.random() * 100 + 50;
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
            generateMeteors(10);
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
    document.querySelectorAll(".language-switcher button").forEach((button => {
        button.addEventListener("click", (() => {
            const selectedLang = button.getAttribute("data-lang");
            document.querySelectorAll(".lang").forEach((element => {
                if (element.classList.contains("lang-" + selectedLang)) element.style.display = "initial"; else element.style.display = "none";
            }));
        }));
    }));
    document.querySelectorAll(".language-switcher button").forEach((button => {
        button.addEventListener("click", (() => {
            const selectedLang = button.getAttribute("data-lang");
            localStorage.setItem("selectedLang", selectedLang);
            document.querySelectorAll(".lang").forEach((element => {
                if (element.classList.contains("lang-" + selectedLang)) element.style.display = element.dataset.initialDisplay || "block"; else element.style.display = "none";
            }));
        }));
    }));
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
    document.addEventListener("DOMContentLoaded", (() => {
        const section = document.querySelector(".oferty__container");
        const starCount = 7;
        const widthRange = section.clientWidth;
        const heightRange = section.clientHeight;
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
    }));
    function randomizePosition(star, widthRange, heightRange) {
        const offsetX = Math.random() * widthRange;
        const offsetY = Math.random() * heightRange;
        star.style.left = `${offsetX}px`;
        star.style.top = `${offsetY}px`;
    }
    window["FLS"] = true;
    menuInit();
    formRating();
    pageNavigation();
})();