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

// Project drawing lightbox for the static Hostland export.
(function () {
  "use strict";
  var items = Array.prototype.slice.call(document.querySelectorAll(".case-gallery-item"));
  if (!items.length) return;

  var activeIndex = 0;
  var previousOverflow = "";
  var overlay = document.createElement("div");
  overlay.className = "case-lightbox";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Просмотр проектного чертежа");
  overlay.innerHTML =
    '<button class="case-lightbox-close" type="button" aria-label="Закрыть">×</button>' +
    '<button class="case-lightbox-arrow previous" type="button" aria-label="Предыдущее изображение">←</button>' +
    '<figure><img alt=""><figcaption><span></span><b></b></figcaption></figure>' +
    '<button class="case-lightbox-arrow next" type="button" aria-label="Следующее изображение">→</button>';
  document.body.appendChild(overlay);

  var image = overlay.querySelector("figure img");
  var caption = overlay.querySelector("figcaption span");
  var counter = overlay.querySelector("figcaption b");

  function render() {
    var source = items[activeIndex].querySelector("img");
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = source.alt;
    counter.textContent = String(activeIndex + 1) + " / " + String(items.length);
  }

  function open(index) {
    activeIndex = index;
    render();
    overlay.hidden = false;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlay.querySelector(".case-lightbox-close").focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = previousOverflow;
    items[activeIndex].focus();
  }

  function move(step) {
    activeIndex = (activeIndex + step + items.length) % items.length;
    render();
  }

  items.forEach(function (item, index) {
    item.addEventListener("click", function () { open(index); });
  });
  overlay.querySelector(".case-lightbox-close").addEventListener("click", close);
  overlay.querySelector(".previous").addEventListener("click", function (event) { event.stopPropagation(); move(-1); });
  overlay.querySelector(".next").addEventListener("click", function (event) { event.stopPropagation(); move(1); });
  overlay.querySelector("figure").addEventListener("click", function (event) { event.stopPropagation(); });
  overlay.addEventListener("click", close);
  window.addEventListener("keydown", function (event) {
    if (overlay.hidden) return;
    if (event.key === "Tab") {
      var controls = overlay.querySelectorAll("button");
      var first = controls[0];
      var last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
})();

// "Получить умный дом" modal (point 6)
(function () {
  "use strict";
  var triggers = Array.prototype.slice.call(document.querySelectorAll(".smart-home-cta"));
  triggers.forEach(function (btn) {
    var overlay = btn.nextElementSibling;
    if (!overlay || !overlay.classList.contains("modal-overlay")) return;
    var previousOverflow = "";
    function close() {
      overlay.hidden = true;
      document.body.style.overflow = previousOverflow;
      btn.focus();
    }
    btn.setAttribute("aria-haspopup", "dialog");
    btn.addEventListener("click", function () {
      previousOverflow = document.body.style.overflow;
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      overlay.querySelector(".modal-close").focus();
    });
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) close();
    });
    var closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      var controls = overlay.querySelectorAll("button, a[href]");
      var first = controls[0];
      var last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
})();

// Native mobile navigation: close after selection, outside click or Escape.
(function () {
  "use strict";
  document.querySelectorAll(".site-menu").forEach(function (menu) {
    var summary = menu.querySelector("summary");
    menu.addEventListener("toggle", function () {
      summary.setAttribute("aria-label", menu.open ? "Закрыть меню" : "Открыть меню");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { menu.open = false; });
    });
    document.addEventListener("click", function (event) {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.open) { menu.open = false; summary.focus(); }
    });
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
    var objectType = form.querySelector('select[name="object_type"]');
    var honeypot = form.querySelector('input[name="website"]');
    var consent = form.querySelector('input[type="checkbox"]');
    var submitBtn = form.querySelector("button.mail-link");
    var statusOk = form.querySelector(".form-status-ok");
    var statusError = form.querySelector(".form-status-error");
    var requestInfo = form.querySelector(".form-request-id");
    if (!consent || !submitBtn || !nameInput || !contactInput || !messageInput) return;
    var pending = false;
    var sent = false;

    function fieldsFilled() {
      return nameInput.value.trim() !== "" && contactInput.value.trim() !== "" && messageInput.value.trim() !== "";
    }

    function updateState() {
      submitBtn.disabled = pending || sent || !(consent.checked && fieldsFilled());
    }

    [nameInput, contactInput, messageInput].forEach(function (el) {
      el.addEventListener("input", function () {
        if (sent) {
          sent = false;
          submitBtn.textContent = "Отправить заявку";
          if (statusOk) statusOk.hidden = true;
          if (requestInfo) requestInfo.hidden = true;
        }
        updateState();
      });
    });
    consent.addEventListener("change", updateState);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (pending || sent || !consent.checked || !fieldsFilled() || !form.reportValidity()) return;
      if (statusOk) statusOk.hidden = true;
      if (statusError) statusError.hidden = true;
      if (requestInfo) requestInfo.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";
      pending = true;
      form.setAttribute("aria-busy", "true");
      [nameInput, contactInput, messageInput].forEach(function (el) { el.readOnly = true; });
      consent.disabled = true;

      var params = new URLSearchParams();
      params.set("name", nameInput.value);
      params.set("contact", contactInput.value);
      params.set("message", (objectType && objectType.value ? "Тип объекта: " + objectType.value + "\n\n" : "") + messageInput.value);
      params.set("website", honeypot ? honeypot.value : "");
      params.set("consent", "1");

      var controller = new AbortController();
      var timeout = window.setTimeout(function () { controller.abort(); }, 30000);

      fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        signal: controller.signal,
      })
        .then(function (response) {
          return response.json().catch(function () { return null; }).then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (requestInfo && result.data && /^[A-F0-9]{12}$/.test(result.data.request_id || "")) {
            requestInfo.textContent = "Номер обращения: " + result.data.request_id;
            requestInfo.hidden = false;
          }
          if (result.ok && result.data && result.data.ok && result.data.status === "queued") {
            sent = true;
            form.reset();
            submitBtn.textContent = "Отправлено ✓";
            if (statusOk) statusOk.hidden = false;
          } else {
            throw new Error("submit_failed");
          }
        })
        .catch(function () {
          submitBtn.textContent = "Отправить заявку";
          if (statusError) statusError.hidden = false;
        })
        .finally(function () {
          window.clearTimeout(timeout);
          pending = false;
          [nameInput, contactInput, messageInput].forEach(function (el) { el.readOnly = false; });
          consent.disabled = false;
          form.removeAttribute("aria-busy");
          updateState();
        });
    });

    updateState();
  });
})();
