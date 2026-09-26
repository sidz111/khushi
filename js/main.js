/* =========================================================
   MAIN.JS
   - Renders shared navbar & footer (kept consistent site-wide)
   - Mobile menu, active-link detection, sticky header shadow
   - Scroll-reveal animations (IntersectionObserver)
   - Animated stat counters
   ========================================================= */

(function () {
  "use strict";

  /* ---------- EDIT THESE VALUES TO CUSTOMISE THE SITE ---------- */
  const SITE = {
    lawyerName: "Khushi Khabiya",
    tagline: "Advocate & Legal Consultant",
    phone: "[Add phone number]",
    email: "[Add email address]",
    address: "[Add office location]",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  };
  window.SITE_CONFIG = SITE;

  const NAV_ITEMS = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Practice Areas", href: "practice-areas.html" },
    { label: "Cases", href: "cases.html" },
    { label: "Services", href: "services.html" },
    { label: "Contact", href: "contact.html" },
  ];

  const currentPage = (location.pathname.split("/").pop() || "index.html").split("?")[0] || "index.html";

  /* ---------- ICONS (inline SVG, no external requests) ---------- */
  const icon = {
    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.5 4.78 5.8V21H18.5v-6c0-1.44-.03-3.3-2.1-3.3-2.1 0-2.42 1.55-2.42 3.15V21H10z"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
    facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 4h-2a4 4 0 0 0-4 4v2H7v3h2v7h3v-7h2.6l.4-3H12V8.5c0-.7.3-1 1.1-1H15V4Z"/></svg>`,
    scale: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M5 7h14M5 7 2.5 13a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7ZM8.5 21h7"/></svg>`,
  };

  /* ---------- NAVBAR TEMPLATE ---------- */
  function navLinksHTML(container) {
    return NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}" class="${item.href === currentPage ? "active" : ""}">${item.label}</a>`
    ).join("");
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = `
      <div class="navbar" id="navbar">
        <div class="container navbar-inner">
          <a href="index.html" class="brand" aria-label="${SITE.lawyerName} — Home">
            <span class="brand-name"><span>${SITE.lawyerName}</span></span>
            <span class="brand-sub">Advocate</span>
          </a>
          <nav class="nav-links" aria-label="Primary">${navLinksHTML()}</nav>
          <div class="nav-actions">
            <a href="contact.html" class="btn btn-primary nav-cta">Book Consultation</a>
            <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
      <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav-inner">
          ${navLinksHTML()}
          <a href="contact.html" class="btn btn-primary">Book Consultation</a>
        </div>
      </div>
    `;
  }

  /* ---------- FOOTER TEMPLATE ---------- */
  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const year = new Date().getFullYear();
    el.innerHTML = `
      <div class="container footer-top">
        <div class="footer-brand">
          <span class="brand-name">${SITE.lawyerName}</span>
          <p>${SITE.tagline}. Providing strategic, ethical and client-focused legal representation.</p>
          <div class="social-row">
            <a href="${SITE.linkedin}" aria-label="LinkedIn profile">${icon.linkedin}</a>
            <a href="${SITE.instagram}" aria-label="Instagram profile">${icon.instagram}</a>
            <a href="${SITE.facebook}" aria-label="Facebook page">${icon.facebook}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            ${NAV_ITEMS.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Practice Areas</h4>
          <ul>
            <li><a href="practice-areas.html">Criminal Law</a></li>
            <li><a href="practice-areas.html">Civil Law</a></li>
            <li><a href="practice-areas.html">Corporate Law</a></li>
            <li><a href="practice-areas.html">Family Law</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>${SITE.phone}</li>
            <li>${SITE.email}</li>
            <li>${SITE.address}</li>
          </ul>
        </div>
      </div>
      <div class="disclaimer-strip container">
        Information on this website is for general informational purposes only and does not constitute legal advice. Viewing this website or contacting the lawyer does not create an advocate-client relationship. For advice on a specific matter, please consult a qualified legal professional.
      </div>
      <div class="container footer-bottom">
        <span>&copy; 2026 ${SITE.lawyerName}. All Rights Reserved.</span>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Legal Disclaimer</a>
        </div>
      </div>
    `;
  }

  /* ---------- MOBILE MENU ---------- */
  function initMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileNav");
    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.classList.remove("is-open");
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    }
    function openMenu() {
      toggle.classList.add("is-open");
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", () => {
      toggle.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- STICKY HEADER SHADOW ---------- */
  function initScrollShadow() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initContactDetails() {
    const fields = {
      contactAddress: SITE.address,
      contactPhone: SITE.phone,
      contactEmail: SITE.email,
      contactHours: SITE.hours,
    };
    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-scale");
    if (!("IntersectionObserver" in window) || !targets.length) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animate(el) {
      const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
      const suffixEl = el.querySelector(".suffix");
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.firstChild.nodeValue = value;
        if (progress < 1) requestAnimationFrame(step);
      }
      // Ensure a text node exists before the suffix span
      if (!el.firstChild || el.firstChild.nodeType !== 3) {
        el.insertBefore(document.createTextNode("0"), el.firstChild);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    initContactDetails();
    initMobileMenu();
    initScrollShadow();
    initReveal();
    initCounters();
  });
})();
