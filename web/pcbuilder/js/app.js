// ================================================================
//  RIGFORGE v2.0 — App Logic
// ================================================================

document.addEventListener("DOMContentLoaded", () => {

    // ── STATE ───────────────────────────────────────────────────
    let selectedParts = {}; // { catId: partObject }
    const TOTAL_CATS = CATEGORIES.length;

    // ── DOM REFS ────────────────────────────────────────────────
    const builderContainer  = document.getElementById("builder-container");
    const summaryList       = document.getElementById("summary-list");
    const uiTotal           = document.getElementById("ui-total");
    const btnQuote          = document.getElementById("btn-quote");
    const partsCount        = document.getElementById("parts-count");
    const progressText      = document.getElementById("progress-text");
    const stepTracker       = document.getElementById("step-tracker");
    const presetsContainer  = document.getElementById("presets-container");
    const reviewsContainer  = document.getElementById("reviews-container");
    const modalOverlay      = document.getElementById("modal-overlay");
    const modalBuildList    = document.getElementById("modal-build-list");
    const modalTotalVal     = document.getElementById("modal-total-val");
    const btnWhatsapp       = document.getElementById("btn-whatsapp");
    const modalClose        = document.getElementById("modal-close");

    // ── 1. RENDER PRESETS ────────────────────────────────────────
    PRESETS.forEach(preset => {
        const totalPrice = Object.values(preset.parts).reduce((sum, partId) => {
            for (const cat in PARTS) {
                const found = PARTS[cat].find(p => p.id === partId);
                if (found) return sum + found.price;
            }
            return sum;
        }, 0);

        const card = document.createElement("div");
        card.className = "preset-card reveal";
        card.innerHTML = `
            <div class="preset-badge-tier" style="color:${preset.tierColor}">${preset.tier}</div>
            <div class="preset-img">
                <img src="${preset.img}" alt="${preset.name}" loading="lazy">
            </div>
            <div class="preset-body">
                <div class="preset-name">${preset.name}</div>
                <div class="preset-price" style="color:${preset.tierColor}">${BRAND.currency} ${totalPrice.toLocaleString()}</div>
                <div class="preset-specs">
                    ${getPresetSpecLines(preset).map(s => `<div class="preset-spec"><i class="fas fa-check"></i> ${s}</div>`).join("")}
                </div>
                <button class="preset-btn preset-btn-accent" onclick="loadPreset('${preset.id}')">
                    <i class="fas fa-bolt"></i> Load This Build
                </button>
            </div>
        `;
        presetsContainer.appendChild(card);
    });

    function getPresetSpecLines(preset) {
        const lines = [];
        const cpuPart = findPart("cpu", preset.parts.cpu);
        const gpuPart = findPart("gpu", preset.parts.gpu);
        const ramPart = findPart("ram", preset.parts.ram);
        if (cpuPart) lines.push(cpuPart.name);
        if (gpuPart) lines.push(gpuPart.name);
        if (ramPart) lines.push(ramPart.name);
        return lines;
    }

    function findPart(catId, partId) {
        return PARTS[catId] ? PARTS[catId].find(p => p.id === partId) : null;
    }

    // ── 2. RENDER STEP TRACKER ───────────────────────────────────
    CATEGORIES.forEach((cat, i) => {
        const item = document.createElement("div");
        item.className = "step-item";
        item.innerHTML = `
            <div class="step-circle" id="step-${cat.id}">${i + 1}</div>
            ${i < CATEGORIES.length - 1 ? `<div class="step-connector" id="connector-${cat.id}"></div>` : ""}
        `;
        stepTracker.appendChild(item);
    });

    // ── 3. RENDER BUILDER ACCORDION ─────────────────────────────
    CATEGORIES.forEach((cat, catIndex) => {
        const catEl = document.createElement("div");
        catEl.className = "category-card";
        catEl.id = `cat-card-${cat.id}`;

        const isFirst = catIndex === 0;
        catEl.innerHTML = `
            <div class="category-header" id="cat-header-${cat.id}" onclick="toggleCat('${cat.id}')">
                <div class="cat-left">
                    <div class="cat-icon-wrap"><i class="fas ${cat.icon}"></i></div>
                    <div>
                        <div class="cat-name">${cat.name}</div>
                        <div class="cat-count">${PARTS[cat.id].length} options available</div>
                    </div>
                </div>
                <div class="cat-right">
                    <div class="cat-status-pill empty" id="pill-${cat.id}">Not Selected</div>
                    <i class="fas fa-chevron-down cat-chevron ${isFirst ? 'open' : ''}" id="chev-${cat.id}"></i>
                </div>
            </div>
            <div class="cat-content ${isFirst ? 'open' : ''}" id="content-${cat.id}">
                <div class="cat-body">
                    <div class="compat-warning" id="compat-${cat.id}">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Incompatible socket. This motherboard doesn't match your chosen CPU socket.</span>
                    </div>
                    <div class="part-grid" id="grid-${cat.id}"></div>
                </div>
            </div>
        `;
        builderContainer.appendChild(catEl);

        // Render part cards
        const grid = document.getElementById(`grid-${cat.id}`);
        PARTS[cat.id].forEach(part => {
            const pCard = document.createElement("div");
            pCard.className = "part-card";
            pCard.id = `part-${part.id}`;

            const imgHTML = part.img
                ? `<img src="${part.img}" alt="${part.name}" loading="lazy">`
                : `<i class="fas ${cat.icon}" style="font-size:2rem;color:var(--muted);opacity:0.4"></i>`;

            const imgClass = part.img ? "" : "no-img";

            pCard.innerHTML = `
                <div class="part-img ${imgClass}">
                    ${imgHTML}
                    <div class="selected-tick"><i class="fas fa-check"></i></div>
                </div>
                <div class="part-body">
                    <div class="part-name">${part.name}</div>
                    <div class="part-spec-tags">
                        ${part.tags.map(t => `<span class="part-tag">${t}</span>`).join("")}
                    </div>
                    <div class="part-price">${part.price === 0 ? "Included" : BRAND.currency + " " + part.price.toLocaleString()}</div>
                </div>
            `;
            pCard.onclick = () => selectPart(cat.id, part);
            grid.appendChild(pCard);
        });
    });

    // ── 4. TOGGLE ACCORDION ──────────────────────────────────────
    window.toggleCat = (catId) => {
        const content = document.getElementById(`content-${catId}`);
        const chev    = document.getElementById(`chev-${catId}`);
        const isOpen  = content.classList.contains("open");

        // Close all
        document.querySelectorAll(".cat-content").forEach(el => el.classList.remove("open"));
        document.querySelectorAll(".cat-chevron").forEach(el => el.classList.remove("open"));
        document.querySelectorAll(".category-card").forEach(el => el.classList.remove("active-cat"));

        if (!isOpen) {
            content.classList.add("open");
            chev.classList.add("open");
            document.getElementById(`cat-card-${catId}`).classList.add("active-cat");
        }
    };

    // ── 5. SELECT PART ───────────────────────────────────────────
    window.selectPart = (catId, part) => {
        selectedParts[catId] = part;

        // Update card UI
        document.querySelectorAll(`#grid-${catId} .part-card`).forEach(el => el.classList.remove("selected"));
        document.getElementById(`part-${part.id}`).classList.add("selected");

        // Update pill
        const pill = document.getElementById(`pill-${catId}`);
        pill.textContent = part.name.length > 20 ? part.name.substring(0, 20) + "…" : part.name;
        pill.className = "cat-status-pill filled";

        // Update category card border
        document.getElementById(`cat-card-${catId}`).classList.add("has-selection");

        // Update step tracker
        document.getElementById(`step-${catId}`).className = "step-circle done";
        document.getElementById(`step-${catId}`).innerHTML = `<i class="fas fa-check" style="font-size:0.7rem"></i>`;

        const catIndex = CATEGORIES.findIndex(c => c.id === catId);
        if (catIndex < CATEGORIES.length - 1) {
            const connId = `connector-${catId}`;
            const conn = document.getElementById(connId);
            if (conn) conn.classList.add("done");

            // Auto-open next category
            const nextCat = CATEGORIES[catIndex + 1];
            window.toggleCat(nextCat.id);
        }

        // Check compatibility
        checkCompatibility();

        // Update summary
        updateSummary();
    };

    // ── 6. COMPATIBILITY CHECK ───────────────────────────────────
    function checkCompatibility() {
        const cpu  = selectedParts["cpu"];
        const mobo = selectedParts["mobo"];

        const warning = document.getElementById("compat-mobo");
        if (cpu && mobo && cpu.socket && mobo.socket && cpu.socket !== mobo.socket) {
            if (warning) warning.classList.add("show");
        } else {
            if (warning) warning.classList.remove("show");
        }
    }

    // ── 7. UPDATE SUMMARY ────────────────────────────────────────
    function updateSummary() {
        const count = Object.keys(selectedParts).length;
        const total = Object.values(selectedParts).reduce((s, p) => s + p.price, 0);

        // Count badge
        partsCount.textContent = `${count} / ${TOTAL_CATS}`;

        // Total
        uiTotal.textContent = `${BRAND.currency}${total.toLocaleString()}`;

        // Summary list
        if (count === 0) {
            summaryList.innerHTML = `
                <div class="summary-empty">
                    <i class="fas fa-laptop-code"></i>
                    <p>Your selected parts will appear here</p>
                </div>`;
        } else {
            summaryList.innerHTML = "";
            CATEGORIES.forEach(cat => {
                if (!selectedParts[cat.id]) return;
                const part = selectedParts[cat.id];
                const item = document.createElement("div");
                item.className = "summary-item";
                item.innerHTML = `
                    <div class="si-left">
                        <div class="si-icon"><i class="fas ${cat.icon}"></i></div>
                        <div class="si-info">
                            <div class="si-cat">${cat.name}</div>
                            <div class="si-name" title="${part.name}">${part.name}</div>
                        </div>
                    </div>
                    <div class="si-right">
                        <span class="si-price">${part.price === 0 ? "—" : BRAND.currency + part.price.toLocaleString()}</span>
                        <button class="si-remove" title="Remove" onclick="removePart('${cat.id}')">
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                `;
                summaryList.appendChild(item);
            });
        }

        // Progress text & quote button
        const remaining = TOTAL_CATS - count;
        if (count === TOTAL_CATS) {
            btnQuote.disabled = false;
            progressText.textContent = "✅ All components selected! Ready to quote.";
            progressText.style.color = "var(--success)";
        } else {
            btnQuote.disabled = true;
            progressText.textContent = `Select ${remaining} more component${remaining > 1 ? "s" : ""} to unlock`;
            progressText.style.color = "";
        }
    }

    // ── 8. REMOVE PART ───────────────────────────────────────────
    window.removePart = (catId) => {
        if (!selectedParts[catId]) return;
        const partId = selectedParts[catId].id;
        delete selectedParts[catId];

        // Reset card
        const card = document.getElementById(`part-${partId}`);
        if (card) card.classList.remove("selected");

        // Reset pill
        const pill = document.getElementById(`pill-${catId}`);
        pill.textContent = "Not Selected";
        pill.className = "cat-status-pill empty";

        // Reset step
        const stepEl = document.getElementById(`step-${catId}`);
        const catIndex = CATEGORIES.findIndex(c => c.id === catId);
        stepEl.className = "step-circle";
        stepEl.textContent = catIndex + 1;

        // Reset connector
        const conn = document.getElementById(`connector-${catId}`);
        if (conn) conn.classList.remove("done");

        // Reset category card border
        document.getElementById(`cat-card-${catId}`).classList.remove("has-selection");

        checkCompatibility();
        updateSummary();
    };

    // ── 9. LOAD PRESET ───────────────────────────────────────────
    window.loadPreset = (presetId) => {
        const preset = PRESETS.find(p => p.id === presetId);
        if (!preset) return;

        // Reset first
        CATEGORIES.forEach(cat => {
            if (selectedParts[cat.id]) removePart(cat.id);
        });

        // Apply preset parts
        setTimeout(() => {
            CATEGORIES.forEach(cat => {
                const partId = preset.parts[cat.id];
                if (!partId) return;
                const part = findPart(cat.id, partId);
                if (part) selectPart(cat.id, part);
            });

            // Scroll to builder
            document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    // ── 10. QUOTE MODAL ──────────────────────────────────────────
    btnQuote.addEventListener("click", () => {
        modalBuildList.innerHTML = "";
        let total = 0;

        CATEGORIES.forEach(cat => {
            const part = selectedParts[cat.id];
            if (!part) return;
            total += part.price;

            const line = document.createElement("div");
            line.className = "modal-line";
            line.innerHTML = `
                <span class="cat">${cat.name}</span>
                <span>${part.name} &nbsp;<span class="price">${part.price === 0 ? "Included" : BRAND.currency + part.price.toLocaleString()}</span></span>
            `;
            modalBuildList.appendChild(line);
        });

        modalTotalVal.textContent = `${BRAND.currency}${total.toLocaleString()}`;
        modalOverlay.classList.add("open");
    });

    modalClose.addEventListener("click", () => modalOverlay.classList.remove("open"));
    modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("open"); });

    btnWhatsapp.addEventListener("click", () => {
        let msg = `*🖥️ New PC Build Request — ${BRAND.name}*%0A%0A`;
        let total = 0;

        CATEGORIES.forEach(cat => {
            const part = selectedParts[cat.id];
            if (!part) return;
            msg += `*${cat.name}:* ${part.name}`;
            if (part.price > 0) msg += ` (${BRAND.currency}${part.price.toLocaleString()})`;
            msg += `%0A`;
            total += part.price;
        });

        msg += `%0A*💰 Estimated Total:* ${BRAND.currency}${total.toLocaleString()}%0A%0A`;
        msg += `Please confirm availability, final pricing & delivery details.`;

        window.open(`https://wa.me/${BRAND.whatsapp}?text=${msg}`, "_blank");
        modalOverlay.classList.remove("open");
    });

    // ── 11. RENDER REVIEWS ───────────────────────────────────────
    REVIEWS.forEach(r => {
        const card = document.createElement("div");
        card.className = "review-card reveal";
        card.innerHTML = `
            <div class="review-stars">${"★".repeat(r.stars)}</div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-author">
                <div class="review-avatar">${r.initials}</div>
                <div>
                    <div class="review-name">${r.name}</div>
                    <div class="review-build">${r.build}</div>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(card);
    });

    // ── 12. SCROLL REVEAL ────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

});
