# Khushi Khabiya — Lawyer / Advocate Portfolio Website

A complete, production-quality, multi-page portfolio website for a lawyer/advocate, built with **only HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step.

---

## 1. Folder Structure

```
lawyer-portfolio/
│
├── index.html              Home page
├── about.html               About page and editable professional details
├── practice-areas.html      Full practice-area listing
├── cases.html                Case/legal-experience listing with category filters
├── case-details.html         Dynamic case detail page (reads ?id= from URL)
├── services.html             Legal services offered
├── contact.html               Contact page + consultation request form
│
├── css/
│   ├── style.css             Design tokens, layout, all components
│   ├── responsive.css         Breakpoints: 320 / 375 / 414 / 768 / 1024 / 1440 / 1920
│   └── animations.css          Keyframes, scroll-reveal, reduced-motion support
│
├── js/
│   ├── main.js                Navbar + footer rendering, mobile menu, active link,
│   │                          sticky header shadow, scroll-reveal, stat counters
│   ├── cases.js                Case data (demo/fictional), category filtering,
│   │                          and case-details rendering from the URL ?id=
│   └── contact.js              Consultation form validation (frontend only)
│
├── assets/
│   ├── images/
│   │   ├── hero/               Hero illustration (SVG)
│   │   ├── profile/             Advocate portrait placeholders (SVG)
│   │   ├── cases/                One illustration per demo case (SVG)
│   │   └── office/                Office illustration (SVG)
│   ├── icons/                    Reserved for any additional icon assets
│   └── documents/                Reserved for downloadable PDFs (e.g. brochures)
│
└── README.md
```

Placeholder images are locally hosted SVGs. Replace the profile illustrations with Khushi's approved professional photo before publishing. Case examples are fictional demo content and must not be presented as real.

---

## 2. Editing Content

- **Site-wide details** (name, phone, email, address, office hours, social links):
  edit the `SITE` object at the top of `js/main.js`. This single object powers the
  navbar brand, footer, and contact page details. Replace bracketed contact values with verified information before publishing.
- **Case studies**: edit the `CASE_DATA` array in `js/cases.js`. Each object becomes
  both a card on `cases.html` and the full page on `case-details.html?id=<id>`.
  All case content shipped with this project is **fictional/demo data** — replace it
  with real (non-confidential) summaries before publishing.
- **Practice areas / services / timeline / education**: edit the relevant HTML blocks
  directly in `practice-areas.html`, `services.html`, and `about.html`.

---

## 3. Running the Project Locally

No Node.js, no framework, and no build step is required — it's a static site.

### Option A — VS Code Live Server
1. Open the `lawyer-portfolio` folder in VS Code.
2. Install the "Live Server" extension if you don't already have it.
3. Right-click `index.html` → **Open with Live Server**.

### Option B — Python static server
```bash
cd lawyer-portfolio
python -m http.server 5500
```
Then open **http://localhost:5500** in your browser.

---

## 4. Contact Form — Connecting a Real Backend

`js/contact.js` performs full client-side validation (name, email format, 10-digit
Indian mobile number, legal matter, date, and a minimum-length message) and shows a
success/error message — **but it does not send data anywhere**. To connect a real
backend:

1. In `js/contact.js`, locate the comment:
   ```js
   // NOTE: No backend is connected. This is where a fetch() call to a
   // real API endpoint would go. See README.md for integration guidance.
   ```
2. Replace the `setTimeout(...)` block with an actual request, e.g.:
   ```js
   fetch("https://your-api.example.com/consultation-requests", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: fields.name.value,
       email: fields.email.value,
       phone: fields.phone.value,
       matter: fields.matter.value,
       date: fields.date.value,
       message: fields.message.value,
     }),
   })
     .then((res) => {
       if (!res.ok) throw new Error("Request failed");
       showMessage("success", "Thank you. Your consultation request has been received.");
       form.reset();
     })
     .catch(() => showMessage("error", "Something went wrong. Please try again or call us directly."))
     .finally(() => { submitBtn.disabled = false; submitBtn.textContent = "Request Consultation"; });
   ```
3. Any backend works (Node/Express, PHP, a serverless function, a form service such
   as Formspree, etc.) as long as it accepts a JSON POST with the fields above.

---

## 5. Design System

| Token          | Hex       |
|----------------|-----------|
| Primary (Navy) | `#14213D` |
| Secondary (Royal Blue) | `#1F4E79` |
| Accent (Gold)  | `#C9A227` |
| Light (Cream)  | `#F7F5EF` |
| White          | `#FFFFFF` |
| Text           | `#20242A` |

Typography: **Playfair Display** (headings) + **Inter** (body), loaded from Google Fonts.

---

## 6. Accessibility & Performance Notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible
  focus states, and labelled form fields are included throughout.
- All decorative icons are inline SVG (no icon-font or extra HTTP requests).
- Animations respect `prefers-reduced-motion`.
- No external JS libraries are loaded — only two Google Fonts requests per page.

---

## 7. Legal Disclaimers Included

- A general **informational disclaimer** appears in the footer of every page.
- The **case-details page** includes an explicit note that case studies are
  illustrative/demo unless stated otherwise, and that results vary by matter.
- No page claims a guaranteed legal outcome.

---

## 8. Deployment

Because this is a fully static site, it can be deployed as-is to any static host:
GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a traditional web server —
simply upload the contents of `lawyer-portfolio/` (no build step needed).
