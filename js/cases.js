/* =========================================================
   CASES.JS
   - Fictional/demo case data (edit CASE_DATA to customise)
   - Category filtering on cases.html
   - Reads ?id= from URL and renders case-details.html
   ========================================================= */

(function () {
  "use strict";

  const CASE_DATA = [
    {
      id: 1,
      title: "Property Dispute Resolution",
      category: "Property",
      year: 2025,
      status: "Resolved",
      type: "Civil Suit",
      summary:
        "Assisted a family in resolving a long-standing ancestral property boundary dispute through structured negotiation and documentation review.",
      overview:
        "The client's family faced a boundary disagreement with a neighbouring landowner that had stalled a property sale for over a year. The matter required careful review of survey records, sale deeds and revenue documents spanning three decades.",
      challenge:
        "Conflicting survey records and an absence of updated mutation entries made it difficult to establish a clear title, while both parties were keen to avoid a prolonged court battle.",
      approach:
        "A detailed title-chain review was conducted, followed by coordination with the local revenue office to correct mutation records. Structured mediation sessions were held between both parties with clear documentation of every proposal.",
      considerations:
        "Key considerations included verifying the authenticity of historical documents, protecting the client's ownership rights, and reaching a settlement that both parties could formalise legally.",
      outcome:
        "The dispute was resolved through a registered settlement deed, allowing the client to proceed with the property sale. (Demo case for illustrative purposes.)",
    },
    {
      id: 2,
      title: "Criminal Defense — Bail Application",
      category: "Criminal",
      year: 2024,
      status: "Resolved",
      type: "Criminal Proceeding",
      summary:
        "Represented a client in securing bail in a criminal matter, ensuring due process and protection of the client's legal rights throughout.",
      overview:
        "The client was named in a criminal complaint and required immediate legal representation to file for bail while the broader investigation was ongoing.",
      challenge:
        "Time was limited, and the case required a rapid but thorough review of the FIR, procedural compliance, and applicable bail provisions.",
      approach:
        "A bail application was drafted with supporting affidavits, procedural irregularities were highlighted, and the matter was argued before the relevant court with a focus on the client's rights and circumstances.",
      considerations:
        "Considerations included the nature of the allegations, flight risk factors, and ensuring the client's continued cooperation with the ongoing investigation.",
      outcome:
        "Bail was granted subject to standard conditions. The underlying matter proceeded through the regular judicial process. (Demo case for illustrative purposes.)",
    },
    {
      id: 3,
      title: "Corporate Contract Restructuring",
      category: "Corporate",
      year: 2025,
      status: "Ongoing",
      type: "Corporate Advisory",
      summary:
        "Advised a growing small business on restructuring vendor and employment contracts to reduce legal exposure and improve compliance.",
      overview:
        "A small manufacturing business sought a full review of its vendor and employment agreements after rapid growth exposed gaps in its existing contracts.",
      challenge:
        "Several contracts lacked clear termination clauses, dispute-resolution mechanisms, and confidentiality provisions, creating exposure for the business.",
      approach:
        "Contracts were audited clause-by-clause, standardised templates were created for future agreements, and key risk clauses were renegotiated with existing vendors.",
      considerations:
        "The advisory work balanced legal protection for the client with maintaining healthy, ongoing vendor relationships and minimal business disruption.",
      outcome:
        "Revised contract templates are being rolled out in phases; the engagement is currently ongoing. (Demo case for illustrative purposes.)",
    },
    {
      id: 4,
      title: "Family Matrimonial Settlement",
      category: "Family",
      year: 2024,
      status: "Resolved",
      type: "Family Law Matter",
      summary:
        "Guided a client through an amicable separation and settlement process, prioritising a fair outcome and minimal conflict.",
      overview:
        "The client sought legal guidance for a mutual separation, including matters relating to asset division and future arrangements.",
      challenge:
        "Both parties wished to avoid prolonged litigation, requiring a settlement approach that was both legally sound and mutually acceptable.",
      approach:
        "Structured discussions were facilitated between both parties' counsel, with a clear settlement memorandum drafted covering all agreed terms.",
      considerations:
        "Key considerations included fairness in asset division, clarity of terms, and ensuring the settlement met all applicable legal formalities.",
      outcome:
        "A mutual settlement was formalised and approved through the appropriate legal process. (Demo case for illustrative purposes.)",
    },
    {
      id: 5,
      title: "Consumer Complaint — Defective Goods",
      category: "Consumer",
      year: 2023,
      status: "Resolved",
      type: "Consumer Protection",
      summary:
        "Represented a client in a consumer complaint against a retailer regarding a defective product and denied warranty claim.",
      overview:
        "The client purchased an appliance that developed a manufacturing defect within the warranty period, but the retailer declined a replacement or refund.",
      challenge:
        "The retailer disputed the defect's cause, requiring evidence gathering including service records and an independent inspection report.",
      approach:
        "A formal complaint was filed before the consumer forum along with supporting documentation, and the matter was argued with reference to applicable consumer protection provisions.",
      considerations:
        "Considerations included timelines for filing, the strength of documentary evidence, and the appropriate relief to seek on the client's behalf.",
      outcome:
        "The forum ruled in the client's favour, directing a full refund. (Demo case for illustrative purposes.)",
    },
    {
      id: 6,
      title: "Civil Recovery Suit",
      category: "Civil",
      year: 2023,
      status: "Resolved",
      type: "Civil Suit",
      summary:
        "Handled a civil recovery suit on behalf of a small business owner seeking to recover outstanding dues from a client.",
      overview:
        "The client, a small business owner, had an outstanding invoice that remained unpaid despite repeated follow-ups over several months.",
      challenge:
        "The opposing party disputed the amount owed, requiring careful presentation of invoices, communication records and delivery proof.",
      approach:
        "A legal notice was issued first, followed by a civil suit for recovery once informal resolution attempts were unsuccessful, supported by organised documentary evidence.",
      considerations:
        "Considerations included the cost-effectiveness of litigation relative to the amount owed, and exploring settlement at each stage of the process.",
      outcome:
        "The matter was resolved through a court-recorded settlement with a structured repayment plan. (Demo case for illustrative purposes.)",
    },
  ];

  window.CASE_DATA = CASE_DATA;

  /* ---------- CASES LISTING PAGE ---------- */
  function renderCaseCard(c) {
    return `
      <article class="case-card reveal" data-category="${c.category}">
        <div class="case-thumb">
          <img src="assets/images/cases/case-${c.id}.svg" alt="Illustration for ${c.title}" loading="lazy" width="480" height="300">
        </div>
        <div class="case-body">
          <div class="case-tags">
            <span class="tag tag-cat">${c.category} Law</span>
            <span class="tag tag-status">${c.status}</span>
          </div>
          <h3>${c.title}</h3>
          <p class="case-year">${c.year} · ${c.type}</p>
          <p>${c.summary}</p>
          <a class="card-link" href="case-details.html?id=${c.id}">View Case
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>
    `;
  }

  function initCasesListing() {
    const grid = document.getElementById("casesGrid");
    if (!grid) return;

    grid.innerHTML = CASE_DATA.map(renderCaseCard).join("");
    const emptyState = document.getElementById("casesEmpty");
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        let visibleCount = 0;

        grid.querySelectorAll(".case-card").forEach((card) => {
          const match = filter === "All" || card.getAttribute("data-category") === filter;
          card.style.display = match ? "" : "none";
          if (match) visibleCount++;
        });

        if (emptyState) emptyState.style.display = visibleCount === 0 ? "block" : "none";
      });
    });

    // Re-run reveal for freshly injected cards
    if (window.reInitReveal) window.reInitReveal();
    else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    } else {
      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ---------- CASE DETAILS PAGE ---------- */
  function getCaseIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    return Number.isFinite(id) ? id : 1;
  }

  function initCaseDetails() {
    const root = document.getElementById("caseDetails");
    if (!root) return;

    const id = getCaseIdFromURL();
    const c = CASE_DATA.find((item) => item.id === id) || CASE_DATA[0];

    document.title = `${c.title} | Case Details`;

    root.innerHTML = `
      <div class="case-hero section--tight">
        <div class="container">
          <a class="card-link" href="cases.html" style="margin-bottom:18px;display:inline-flex;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
            Back to Cases
          </a>
          <span class="tag tag-cat" style="margin-bottom:14px;display:inline-block;">${c.category} Law</span>
          <h1>${c.title}</h1>
          <div class="case-meta-grid">
            <div class="meta-box"><div class="label">PRACTICE AREA</div><div class="value">${c.category} Law</div></div>
            <div class="meta-box"><div class="label">CASE TYPE</div><div class="value">${c.type}</div></div>
            <div class="meta-box"><div class="label">YEAR</div><div class="value">${c.year}</div></div>
            <div class="meta-box"><div class="label">STATUS</div><div class="value">${c.status}</div></div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="container">
          <div class="case-content">
            <div>
              <h2>Case Overview</h2>
              <p>${c.overview}</p>
            </div>
            <div>
              <h2>Legal Challenge</h2>
              <p>${c.challenge}</p>
            </div>
            <div>
              <h2>Approach</h2>
              <p>${c.approach}</p>
            </div>
            <div>
              <h2>Key Legal Considerations</h2>
              <p>${c.considerations}</p>
            </div>
            <div>
              <h2>Outcome / Current Status</h2>
              <p>${c.outcome}</p>
            </div>
            <div class="disclaimer-box">
              Case studies shown on this website are for illustrative/demo purposes unless otherwise stated. Results vary depending on the facts and circumstances of each matter.
            </div>
            <a href="cases.html" class="btn btn-navy" style="align-self:flex-start;">Back to Cases</a>
          </div>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCasesListing();
    initCaseDetails();
  });
})();
