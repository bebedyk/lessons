(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
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
    const cartItemsContainer = document.querySelector(".cart__items");
    const cartTotalPrice = document.querySelector(".cart__total-price");
    const cartContainer = document.querySelector(".cart");
    const cartIcon = document.querySelector(".cart__icon");
    const addCartButtons = document.querySelectorAll(".add-cart");
    const checkoutButton = document.querySelector(".cart__checkout-btn");
    const paymentForm = document.getElementById("paymentForm");
    const visaMastercardRadio = document.getElementById("visa-mastercard");
    const googlePayRadio = document.getElementById("google-pay");
    const confirmPaymentButton = document.querySelector(".btn");
    checkoutButton.addEventListener("click", (function(event) {
        if (!visaMastercardRadio.checked && !googlePayRadio.checked) {
            event.preventDefault();
            alert("Please select a payment method.");
        }
    }));
    function validateCardDetails() {
        const cardNumberElement = document.getElementById("cardNumber");
        const cardNameElement = document.getElementById("cardName");
        const expiryDateElement = document.getElementById("expiryDate");
        const cvvElement = document.getElementById("cvv");
        if (!cardNumberElement || !cardNameElement || !expiryDateElement || !cvvElement) return false;
        const cardNumber = cardNumberElement.value;
        const cardName = cardNameElement.value;
        const expiryDate = expiryDateElement.value;
        const cvv = cvvElement.value;
        if (cardNumber.trim() === "" || cardName.trim() === "" || expiryDate.trim() === "" || cvv.trim() === "") return false;
        return true;
    }
    paymentForm.addEventListener("submit", (function(event) {
        event.preventDefault();
        if (!visaMastercardRadio.checked && !googlePayRadio.checked) {
            alert("Please select a payment method.");
            return;
        }
        if (visaMastercardRadio.checked && !validateCardDetails()) {
            alert("Please fill in all card details.");
            return;
        }
        sendDataToServer(cart);
    }));
    const paymentButton = document.querySelector(".btn.payment-methods__button");
    paymentButton.addEventListener("click", (function(event) {
        event.preventDefault();
        if (validateCardDetails()) {
            const cardNumber = document.getElementById("cardNumber").value;
            const cardName = document.getElementById("cardName").value;
            const expiryDate = document.getElementById("expiryDate").value;
            const cvv = document.getElementById("cvv").value;
            const cardDetails = {
                cardNumber,
                cardName,
                expiryDate,
                cvv
            };
            savedCards.push(cardDetails);
            paymentButton.disabled = true;
            sendDataToServer(cardDetails);
        } else alert("Please fill in all card details correctly.");
    }));
    function sendDataToServer(productData) {
        if (!visaMastercardRadio.checked && !googlePayRadio.checked) {
            console.log("No payment method selected.");
            return;
        }
        fetch("https://httpbin.org/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products: productData
            })
        }).then((response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })).then((data => {
            console.log("Server response:", data);
        })).catch((error => {
            console.error("There was a problem with your fetch operation:", error);
        }));
    }
    const visaMasterCardInput = document.getElementById("visa-mastercard");
    let isCardDetailsVisible = false;
    visaMasterCardInput.addEventListener("click", handleVisaMasterCardSelection);
    function handleVisaMasterCardSelection() {
        const cardDetails = document.getElementById("cardDetails");
        if (!isCardDetailsVisible) {
            cardDetails.style.display = "block";
            isCardDetailsVisible = true;
            document.addEventListener("click", handleDocumentClick);
        } else if (!visaMasterCardInput.checked) {
            cardDetails.style.display = "none";
            document.removeEventListener("click", handleDocumentClick);
            isCardDetailsVisible = false;
        }
    }
    function handleDocumentClick(event) {
        const cardDetails = document.getElementById("cardDetails");
        if (!cardDetails.contains(event.target) && event.target !== visaMasterCardInput) {
            cardDetails.style.display = "none";
            document.removeEventListener("click", handleDocumentClick);
            isCardDetailsVisible = false;
        }
    }
    confirmPaymentButton.addEventListener("click", (event => {
        if (event.target === confirmPaymentButton) return;
        event.stopPropagation();
    }));
    let cart = [];
    const checkoutForm = document.getElementById("checkoutForm");
    const deliveryAddressSection = document.getElementById("delivery-address");
    const deliveryAddressInfo = document.getElementById("delivery-address-info");
    const editAddressButton = document.getElementById("edit-address-button");
    let formData;
    checkoutForm.addEventListener("submit", (function(event) {
        event.preventDefault();
        formData = new FormData(checkoutForm);
        processFormData(formData);
    }));
    function processFormData(formData) {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const address = formData.get("address");
        const apartment = formData.get("apartment");
        const postalCode = formData.get("postalCode");
        const city = formData.get("city");
        const phoneNumber = formData.get("phoneNumber");
        const deliveryAddress = `${firstName}  ${lastName}<br>${address},<br>${apartment ? apartment + ",<br>" : ""}${postalCode} ${city},<br>${phoneNumber}`;
        deliveryAddressInfo.innerHTML = deliveryAddress;
        deliveryAddressSection.style.display = "flex";
    }
    editAddressButton.addEventListener("click", (function() {
        document.querySelectorAll(".checkoutForm__info").forEach((input => {
            const fieldName = input.getAttribute("name");
            const fieldValue = formData.get(fieldName);
            input.value = fieldValue;
        }));
        const firstInput = document.querySelector(".checkoutForm__info");
        firstInput.focus();
    }));
    function addToCart(event) {
        const productBox = event.target.closest(".product");
        const title = productBox.querySelector(".product__title").textContent;
        const existingProduct = cart.find((item => item.title === title));
        if (existingProduct) existingProduct.quantity += 1; else {
            const image = productBox.querySelector(".product__image").src;
            const price = productBox.querySelector(".product__price").textContent;
            const product = {
                image,
                title,
                price,
                quantity: 1
            };
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        sendDataToServer(productBox);
        updateCartIcon();
    }
    function updateCartIcon() {
        const cartIcon = document.querySelector(".cart__icon");
        const cartItemCount = cart.reduce(((total, item) => total + item.quantity), 0);
        let cartItemCountElement = cartIcon.querySelector(".cart__item-count");
        if (!cartItemCountElement) {
            cartItemCountElement = document.createElement("span");
            cartItemCountElement.classList.add("cart__item-count");
            cartIcon.appendChild(cartItemCountElement);
        }
        cartItemCountElement.textContent = cartItemCount;
        if (cartItemCount > 0) cartIcon.classList.add("non-empty-cart"); else cartIcon.classList.remove("non-empty-cart");
    }
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartIcon();
    }
    function displayCart() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;
        cart.forEach(((item, idx) => {
            const productCard = document.createElement("div");
            productCard.classList.add("cart__item");
            productCard.innerHTML = `\n            <img class="cart__item-image" src="${item.image}" alt="Product Image">\n            <div class="cart__item-details">\n                <h3 class="cart__item-title">${item.title}</h3>\n                <span class="cart__item-price">${item.price}</span>\n                <button class="cart__item-remove" data-index="${idx}"></button>  \n            </div>\n            <div class="cart__item-quantity">\n                <button class="quantity-button quantity-button--decrease">-</button>\n                <span class="quantity-value">${item.quantity}</span>\n                <button class="quantity-button quantity-button--increase">+</button>\n            </div>\n        `;
            const removeButton = productCard.querySelector(".cart__item-remove");
            removeButton.addEventListener("click", (() => {
                removeFromCart(idx);
            }));
            cartItemsContainer.appendChild(productCard);
            totalPrice += parseFloat(item.price.replace("$", "")) * item.quantity;
        }));
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        const increaseButtons = document.querySelectorAll(".quantity-button--increase");
        increaseButtons.forEach((button => {
            button.addEventListener("click", (() => {
                const index = parseInt(button.closest(".cart__item").querySelector(".cart__item-remove").getAttribute("data-index"));
                changeQuantity(index, 1);
            }));
        }));
        const decreaseButtons = document.querySelectorAll(".quantity-button--decrease");
        decreaseButtons.forEach((button => {
            button.addEventListener("click", (() => {
                const index = parseInt(button.closest(".cart__item").querySelector(".cart__item-remove").getAttribute("data-index"));
                changeQuantity(index, -1);
            }));
        }));
    }
    function changeQuantity(index, increment) {
        if (cart[index] && cart[index].quantity) {
            cart[index].quantity += increment;
            if (cart[index].quantity < 1) removeFromCart(index); else displayCart();
        }
    }
    addCartButtons.forEach((button => {
        button.addEventListener("click", addToCart);
    }));
    checkoutButton.addEventListener("click", (() => {
        sendDataToServer(cart);
    }));
    window.addEventListener("DOMContentLoaded", (() => {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        displayCart();
    }));
    cartIcon.addEventListener("click", toggleCart);
    function toggleCart() {
        cartContainer.classList.toggle("show-cart");
    }
    const toggleAddressFormButton = document.getElementById("toggleAddressForm");
    const addressForm = document.getElementById("checkoutForm");
    addressForm.style.display = "none";
    toggleAddressFormButton.addEventListener("click", (function() {
        if (addressForm.style.display === "none" || addressForm.style.display === "") {
            addressForm.style.display = "block";
            toggleAddressFormButton.textContent = "Zamkni";
        } else {
            addressForm.style.display = "none";
            toggleAddressFormButton.textContent = "Dodaj Adres";
        }
    }));
    window["FLS"] = true;
    isWebp();
})();