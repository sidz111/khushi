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
    hours: "[Add office hours]",
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
  const PRACTICE_LINKS = [
    ["Criminal Law", "Criminal defense and legal guidance"],
    ["Civil Law", "Civil disputes and representation"],
    ["Family Law", "Guidance for family matters"],
    ["Property Law", "Property and documentation matters"],
    ["Corporate Law", "Business and commercial matters"],
    ["Consumer Law", "Consumer rights and complaints"],
    ["Cyber Law", "Digital and cyber related concerns"],
    ["Contract Law", "Contract review and drafting"],
  ];

  function practiceLinksHTML() {
    return PRACTICE_LINKS.map(([title, description]) => `
      <a class="practice-dropdown-link" href="practice-areas.html" role="menuitem">
        <span class="dropdown-icon" aria-hidden="true">${icon.scale}</span>
        <span><strong>${title}</strong><small>${description}</small></span>
        <span class="dropdown-arrow" aria-hidden="true">&rarr;</span>
      </a>`).join("");
  }

  function navLinksHTML(mobile = false) {
    return NAV_ITEMS.map((item) => {
      const active = item.href === currentPage ? "active" : "";
      const current = active ? ' aria-current="page"' : "";
      if (item.label !== "Practice Areas") {
        return `<a href="${item.href}" class="${active}"${current}>${item.label}</a>`;
      }
      if (mobile) {
        return `<div class="mobile-nav-group">
          <button class="mobile-nav-accordion" type="button" aria-expanded="false" aria-controls="mobilePracticeMenu">Practice Areas <span aria-hidden="true">&#9662;</span></button>
          <div class="mobile-subnav" id="mobilePracticeMenu" hidden>
            <a href="practice-areas.html" class="mobile-subnav-all">View all practice areas</a>
            ${PRACTICE_LINKS.map(([title]) => `<a href="practice-areas.html">${title}</a>`).join("")}
          </div>
        </div>`;
      }
      return `<div class="nav-dropdown">
        <a href="${item.href}" class="nav-dropdown-link ${active}"${current}>${item.label}</a>
        <button class="dropdown-toggle" type="button" aria-label="Open practice areas menu" aria-expanded="false" aria-controls="desktopPracticeMenu"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg></button>
        <div class="practice-dropdown" id="desktopPracticeMenu" role="menu">
          <div class="dropdown-heading"><span>Explore Practice Areas</span><a href="practice-areas.html">View all <span aria-hidden="true">&rarr;</span></a></div>
          <div class="dropdown-grid">${practiceLinksHTML()}</div>
        </div>
      </div>`;
    }).join("");
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.classList.toggle("is-home-header", currentPage === "index.html");
    el.innerHTML = `
      <div class="navbar ${currentPage === "index.html" ? "navbar--over-hero" : ""}" id="navbar">
        <div class="container navbar-inner">
          <a href="index.html" class="brand" aria-label="${SITE.lawyerName} — Home">
            <span class="brand-name"><span>${SITE.lawyerName}</span></span>
            <span class="brand-sub">${SITE.tagline}</span>
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
          ${navLinksHTML(true)}
          <a href="contact.html" class="btn btn-primary">Book Consultation</a>
        </div>
      </div>
    `;
  }

  /* ---------- FOOTER TEMPLATE ---------- */
  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const socialLinks = [
      [SITE.linkedin, "LinkedIn", icon.linkedin],
      [SITE.instagram, "Instagram", icon.instagram],
      [SITE.facebook, "Facebook", icon.facebook],
    ].filter(([href]) => href && href !== "#").map(([href, label, graphic]) =>
      `<a href="${href}" aria-label="${label} profile">${graphic}</a>`
    ).join("");
    el.innerHTML = `
      <div class="container footer-top">
        <div class="footer-brand">
          <span class="brand-name">${SITE.lawyerName}</span>
          <p>${SITE.tagline}. Thoughtful consultation focused on clarity, preparation, and client needs.</p>
          ${socialLinks ? `<div class="social-row">${socialLinks}</div>` : ""}
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
      <div class="container footer-bottom">
        <span>&copy; 2026 ${SITE.lawyerName}. All Rights Reserved.</span>
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
    const accordion = menu.querySelector(".mobile-nav-accordion");
    const subnav = document.getElementById("mobilePracticeMenu");
    if (accordion && subnav) {
      accordion.addEventListener("click", () => {
        const expanded = accordion.getAttribute("aria-expanded") === "true";
        accordion.setAttribute("aria-expanded", String(!expanded));
        if (expanded) {
          subnav.classList.remove("is-expanded");
          const hideSubnav = () => {
            if (accordion.getAttribute("aria-expanded") === "false") subnav.hidden = true;
          };
          subnav.addEventListener("transitionend", hideSubnav, { once: true });
          window.setTimeout(hideSubnav, 320);
        } else {
          subnav.hidden = false;
          window.requestAnimationFrame(() => subnav.classList.add("is-expanded"));
        }
      });
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  function initPracticeDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    const toggle = dropdown && dropdown.querySelector(".dropdown-toggle");
    if (!dropdown || !toggle) return;
    const close = () => {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        toggle.focus();
      }
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
    initPracticeDropdown();
    initScrollShadow();
    initReveal();
    initCounters();
  });
})();
