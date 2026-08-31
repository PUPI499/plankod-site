(function () {
  "use strict";

  var cartAside = document.querySelector(".catalog-cart");
  var orderForm = document.querySelector(".order-form");
  if (!cartAside || !orderForm) return;

  var cartHeadCount = document.querySelector(".cart-head b");
  var submitBtn = orderForm.querySelector("button");
  var buyButtons = Array.prototype.slice.call(document.querySelectorAll(".catalog-buy button[data-id]"));
  var cart = [];

  function removeIfExists(selector) {
    var el = cartAside.querySelector(selector);
    if (el) el.remove();
  }

  function renderCartList() {
    removeIfExists(".empty-cart");
    removeIfExists(".cart-items");

    if (cart.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty-cart";
      empty.innerHTML =
        "<strong>Пока пусто</strong><p>Добавьте оборудование. Мы проверим совместимость и подтвердим цену перед оплатой.</p>";
      cartAside.insertBefore(empty, orderForm);
    } else {
      var wrap = document.createElement("div");
      wrap.className = "cart-items";
      cart.forEach(function (item) {
        var row = document.createElement("div");
        var span = document.createElement("span");
        span.textContent = item.title;
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.setAttribute("aria-label", "Убрать " + item.title);
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          toggle(item.id, item.title);
        });
        row.appendChild(span);
        row.appendChild(removeBtn);
        wrap.appendChild(row);
      });
      cartAside.insertBefore(wrap, orderForm);
    }

    submitBtn.disabled = cart.length === 0;
  }

  function showNote() {
    removeIfExists(".order-notice");
    if (!cartAside.querySelector(".order-note")) {
      var note = document.createElement("p");
      note.className = "order-note";
      note.textContent =
        "Цены и наличие подтверждаются до списания. Онлайн-оплата подключается после настройки эквайринга.";
      cartAside.appendChild(note);
    }
  }

  function showNotice() {
    removeIfExists(".order-note");
    if (!cartAside.querySelector(".order-notice")) {
      var notice = document.createElement("p");
      notice.className = "order-notice";
      notice.textContent =
        "Демонстрационный режим: заказ собран, но ещё не отправлен. Для запуска нужны рабочие контакты, договор с доставкой, товарный прайс и эквайринг.";
      cartAside.appendChild(notice);
    }
  }

  function toggle(id, title) {
    var index = -1;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { index = i; break; }
    }
    if (index >= 0) {
      cart.splice(index, 1);
    } else {
      cart.push({ id: id, title: title });
    }

    var buyBtn = document.querySelector('.catalog-buy button[data-id="' + id + '"]');
    if (buyBtn) {
      var selected = index < 0;
      buyBtn.classList.toggle("selected-product", selected);
      buyBtn.textContent = selected ? "Добавлено ✓" : "Добавить в заказ +";
    }

    if (cartHeadCount) cartHeadCount.textContent = String(cart.length);
    renderCartList();
    showNote();
  }

  buyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggle(btn.getAttribute("data-id"), btn.getAttribute("data-title"));
    });
  });

  submitBtn.addEventListener("click", function () {
    if (cart.length === 0) return;
    showNotice();
  });

  // Catalog filter chips (point 20)
  var filterChips = Array.prototype.slice.call(document.querySelectorAll(".catalog-filters span"));
  var productCards = Array.prototype.slice.call(document.querySelectorAll(".catalog-card"));
  if (filterChips.length && productCards.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        filterChips.forEach(function (c) { c.classList.remove("active-filter"); });
        chip.classList.add("active-filter");
        var label = chip.textContent.trim();
        productCards.forEach(function (card) {
          var category = card.getAttribute("data-category") || "";
          var show = label === "Всё" || category === label || (label === "Кондиционеры" && category === "Кондиционирование");
          card.style.display = show ? "" : "none";
        });
      });
    });
  }
})();

// "Получить умный дом" modal (point 6)
(function () {
  "use strict";
  var triggers = Array.prototype.slice.call(document.querySelectorAll(".smart-home-cta"));
  triggers.forEach(function (btn) {
    var overlay = btn.nextElementSibling;
    if (!overlay || !overlay.classList.contains("modal-overlay")) return;
    btn.addEventListener("click", function () { overlay.hidden = false; });
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) overlay.hidden = true;
    });
    var closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { overlay.hidden = true; });
  });
})();

// Contact form: consent gate + real submission to contact.php (point 10)
(function () {
  "use strict";
  var forms = Array.prototype.slice.call(document.querySelectorAll(".contact-form"));
  forms.forEach(function (form) {
    var labels = form.querySelectorAll("label");
    var nameInput = labels[0] && labels[0].querySelector("input");
    var contactInput = labels[1] && labels[1].querySelector("input");
    var messageInput = form.querySelector("textarea");
    var honeypot = form.querySelector('input[name="website"]');
    var consent = form.querySelector('input[type="checkbox"]');
    var submitBtn = form.querySelector("button.mail-link");
    var statusOk = form.querySelector(".form-status-ok");
    var statusError = form.querySelector(".form-status-error");
    if (!consent || !submitBtn || !nameInput || !contactInput || !messageInput) return;

    function fieldsFilled() {
      return nameInput.value.trim() !== "" && contactInput.value.trim() !== "" && messageInput.value.trim() !== "";
    }

    function updateState() {
      submitBtn.disabled = !(consent.checked && fieldsFilled());
    }

    [nameInput, contactInput, messageInput].forEach(function (el) {
      el.addEventListener("input", updateState);
    });
    consent.addEventListener("change", updateState);

    submitBtn.addEventListener("click", function () {
      if (submitBtn.disabled) return;
      if (statusOk) statusOk.hidden = true;
      if (statusError) statusError.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";

      var params = new URLSearchParams();
      params.set("name", nameInput.value);
      params.set("contact", contactInput.value);
      params.set("message", messageInput.value);
      params.set("website", honeypot ? honeypot.value : "");

      fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
        .then(function (response) {
          return response.json().catch(function () { return null; }).then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.ok) {
            submitBtn.textContent = "Отправлено ✓";
            if (statusOk) statusOk.hidden = false;
          } else {
            throw new Error("submit_failed");
          }
        })
        .catch(function () {
          submitBtn.textContent = "Отправить заявку";
          submitBtn.disabled = false;
          if (statusError) statusError.hidden = false;
        });
    });

    updateState();
  });
})();
