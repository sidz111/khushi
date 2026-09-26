/* =========================================================
   CONTACT.JS
   - Vanilla JS validation for the consultation request form
   - No backend call is made; see README for API integration notes
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("consultationForm");
    if (!form) return;

    const msgBox = document.getElementById("formMsg");
    const fields = {
      name: form.querySelector("#fullName"),
      email: form.querySelector("#email"),
      phone: form.querySelector("#phone"),
      matter: form.querySelector("#legalMatter"),
      date: form.querySelector("#preferredDate"),
      message: form.querySelector("#message"),
    };

    // Set min date to today so users can't pick the past
    if (fields.date) {
      const today = new Date().toISOString().split("T")[0];
      fields.date.setAttribute("min", today);
    }

    function setError(field, message) {
      const wrapper = field.closest(".field");
      const errorEl = wrapper.querySelector(".field-error");
      wrapper.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(field) {
      const wrapper = field.closest(".field");
      wrapper.classList.remove("has-error");
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    function isValidIndianPhone(value) {
      return /^[6-9]\d{9}$/.test(value.trim().replace(/[\s-]/g, ""));
    }

    function validate() {
      let valid = true;

      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
        setError(fields.name, "Please enter your full name.");
        valid = false;
      } else clearError(fields.name);

      if (!isValidEmail(fields.email.value)) {
        setError(fields.email, "Please enter a valid email address.");
        valid = false;
      } else clearError(fields.email);

      if (!isValidIndianPhone(fields.phone.value)) {
        setError(fields.phone, "Enter a valid 10-digit Indian mobile number.");
        valid = false;
      } else clearError(fields.phone);

      if (!fields.matter.value.trim()) {
        setError(fields.matter, "Please select or describe your legal matter.");
        valid = false;
      } else clearError(fields.matter);

      if (!fields.date.value) {
        setError(fields.date, "Please choose a preferred consultation date.");
        valid = false;
      } else clearError(fields.date);

      if (!fields.message.value.trim() || fields.message.value.trim().length < 20) {
        setError(fields.message, "Please provide at least 20 characters describing your matter.");
        valid = false;
      } else clearError(fields.message);

      return valid;
    }

    function showMessage(type, text) {
      msgBox.textContent = text;
      msgBox.className = `form-msg show ${type}`;
      msgBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Clear individual field errors as the user types/selects
    Object.values(fields).forEach((field) => {
      if (!field) return;
      field.addEventListener("input", () => clearError(field));
      field.addEventListener("change", () => clearError(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msgBox.classList.remove("show", "success", "error");

      if (!validate()) {
        showMessage("error", "Please correct the highlighted fields and try again.");
        return;
      }

      // NOTE: No backend is connected. This is where a fetch() call to a
      // real API endpoint would go. See README.md for integration guidance.
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        showMessage(
          "success",
          "Thank you. Your consultation request has been received. Our office will contact you shortly to confirm your appointment."
        );
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Consultation";
      }, 900);
    });
  });
})();
