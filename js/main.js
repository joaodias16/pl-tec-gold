(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const whatsappNumber = "5551989138224";

  function handleScroll() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("header__nav--open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll(".header__nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("header__nav--open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
        document.body.style.overflow = "";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const aparelho = document.getElementById("aparelho").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
      const consentimento = document.getElementById("consentimento").checked;

      if (!nome || !telefone || !aparelho || !mensagem || !consentimento) {
        formNote.textContent = "Preencha todos os campos e aceite a política de privacidade.";
        formNote.className = "form-note form-note--error";
        return;
      }

      const whatsappMsg = encodeURIComponent(
        "Olá, meu nome é " + nome + ".\n" +
        "WhatsApp: " + telefone + "\n" +
        "Aparelho: " + aparelho + "\n\n" +
        mensagem
      );

      window.open("https://wa.me/" + whatsappNumber + "?text=" + whatsappMsg, "_blank");
      formNote.textContent = "Abrindo o WhatsApp...";
      formNote.className = "form-note form-note--success";
      contactForm.reset();
    });
  }

  document.querySelectorAll(".faq__item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!this.open) return;
      document.querySelectorAll(".faq__item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
