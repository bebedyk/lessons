(() => {
    "use strict";
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
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        const nozzle = document.getElementById("nozzle");
        const hosePath = document.getElementById("hose-path");
        const startStopButton = document.getElementById("start-stop");
        const litersDisplay = document.getElementById("liters");
        const totalPriceDisplay = document.getElementById("total-price");
        const fuelElement = document.getElementById("fuel");
        const canister = document.getElementById("canister");
        const sensor = document.getElementById("sensor");
        let selectedFuelPrice = 0;
        let totalLiters = 0;
        let totalPrice = 0;
        let isPumping = false;
        let dropInterval;
        let counterInterval;
        const fuelData = {
            "A-92": {
                liters: 0,
                price: 4.5
            },
            "A-95": {
                liters: 0,
                price: 4.9
            },
            "A-98": {
                liters: 0,
                price: 5.3
            }
        };
        const gasButtons = document.querySelectorAll(".gas");
        gasButtons.forEach((button => {
            button.addEventListener("click", (function() {
                selectedFuelPrice = parseFloat(this.getAttribute("data-price"));
                gasButtons.forEach((btn => btn.classList.remove("_thre")));
                this.classList.add("_thre");
            }));
        }));
        startStopButton.addEventListener("click", (function() {
            fuelElement.classList.add("liquid");
            if (!isSensorInCanister()) {
                alert("Увага,Увага! Пістолет повинен бути в каністрі для подальшої заправки! будь ласка перевірте правильність використання, якщо виникають проблеми, перегляньте інструкцію))");
                return;
            }
            if (isPumping) stopPumping(); else if (selectedFuelPrice > 0) startPumping(); else alert("Виберіть який тип бензину вам підходить та натисніть заправити! будьте уважні сьогодні в нас тільки бензин але завтра може бути й дизель))");
        }));
        function startPumping() {
            isPumping = true;
            startStopButton.textContent = "Зупинити";
            fuelElement.classList.remove("still");
            dropInterval = setInterval((() => {
                createDrop();
            }), 18);
            counterInterval = setInterval((() => {
                totalLiters += .1;
                const selectedFuelButton = document.querySelector(".gas._thre");
                if (selectedFuelButton) {
                    const selectedFuelType = selectedFuelButton.textContent.split(" ")[0].trim();
                    if (fuelData[selectedFuelType]) fuelData[selectedFuelType].liters += .1; else console.error(`Fuel data not found for ${selectedFuelType}`);
                } else console.error("No fuel type selected");
                totalPrice = 0;
                for (const fuelType in fuelData) totalPrice += fuelData[fuelType].liters * fuelData[fuelType].price;
                litersDisplay.textContent = totalLiters.toFixed(1);
                totalPriceDisplay.textContent = totalPrice.toFixed(2) + " zl";
                const fuelHeight = totalLiters / 20 * 100;
                fuelElement.style.height = `${fuelHeight}%`;
                const sensorRect = sensor.getBoundingClientRect();
                const fuelRect = fuelElement.getBoundingClientRect();
                if (sensorRect.bottom >= fuelRect.top && sensorRect.bottom <= fuelRect.bottom && sensorRect.left >= fuelRect.left && sensorRect.right <= fuelRect.right) {
                    stopPumping();
                    alert('Каністра заповнена! Бо це розумна заправка)) коли рівень палива доходить до кінця трубки пістолету на якій розташований "датчик" він припиняє подачу палива');
                }
                if (isSensorPartiallyOutOfCanister()) {
                    stopPumping();
                    alert("Пістолет вийнятий з каністри. Зупинено заправку. Пістолет повинен бути в каністрі для подальшої заправки! будь ласка перевірте правильність використання, якщо виникають проблеми, перегляньте інструкцію");
                }
            }), 100);
        }
        function stopPumping() {
            clearInterval(dropInterval);
            clearInterval(counterInterval);
            isPumping = false;
            startStopButton.textContent = "Заправити";
            fuelElement.classList.add("still");
        }
        function isSensorPartiallyOutOfCanister() {
            const sensorRect = sensor.getBoundingClientRect();
            const canisterRect = canister.getBoundingClientRect();
            const margin = sensorRect.height * -.15;
            return sensorRect.bottom - margin > canisterRect.bottom || sensorRect.top + margin < canisterRect.top || sensorRect.right - margin > canisterRect.right || sensorRect.left + margin < canisterRect.left;
        }
        function isSensorInCanister() {
            const sensorRect = sensor.getBoundingClientRect();
            const canisterRect = canister.getBoundingClientRect();
            return sensorRect.bottom >= canisterRect.top && sensorRect.top <= canisterRect.bottom && sensorRect.right >= canisterRect.left && sensorRect.left <= canisterRect.right;
        }
        function createDrop() {
            const drop = document.createElement("div");
            drop.className = "drop";
            drop.style.left = `120px`;
            drop.style.top = "16px";
            drop.style.rotate = "-65deg";
            nozzle.appendChild(drop);
            drop.style.animation = `fall 0.4s linear forwards`;
            drop.addEventListener("animationend", (() => {
                drop.remove();
            }));
            checkCollision(drop);
        }
        function checkCollision(drop) {
            const dropInterval = setInterval((() => {
                const dropRect = drop.getBoundingClientRect();
                const canisterRect = canister.getBoundingClientRect();
                if (dropRect.top >= canisterRect.top && dropRect.bottom <= canisterRect.bottom && dropRect.left >= canisterRect.left && dropRect.right <= canisterRect.right) {
                    if (!isSensorPartiallyOutOfCanister()) {
                        drop.remove();
                        clearInterval(dropInterval);
                    }
                } else {
                    drop.remove();
                    clearInterval(dropInterval);
                }
            }), 70);
        }
        let isDragging = false;
        nozzle.addEventListener("mousedown", (e => {
            isDragging = true;
            nozzle.style.cursor = "grabbing";
        }));
        document.addEventListener("mousemove", (e => {
            if (isDragging) {
                const left = e.clientX - nozzle.offsetWidth / 2;
                const top = e.clientY - nozzle.offsetHeight / 2;
                nozzle.style.left = `${left}px`;
                nozzle.style.top = `${top}px`;
                hosePath.setAttribute("d", `M 130,100 Q ${(left + 100) / 2},${(top + 100) / 2} ${left + 30},${top + 20}`);
            }
        }));
        document.addEventListener("mouseup", (() => {
            isDragging = false;
            nozzle.style.cursor = "pointer";
        }));
    }));
    window["FLS"] = true;
    formRating();
})();