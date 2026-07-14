// =============================================================
// BharatYatra — Main Application Orchestrator
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// ── STATE ──────────────────────────────────────────────────────
let appState = {
    currentStep: 1, totalSteps: 5,
    form: { destination: null, sourceCity: null, travelMode: 'flight', hotelTier: 'standard', mealPref: 'restaurant', adults: 2, children: 0, seniors: 0, nights: 3, checkIn: '', activities: [] },
    result: null,
    exchangeRates: null
};

function initApp() {
    renderDestinationGrid();
    renderDeals();
    renderPackages();
    initCalculator();
    initWeatherWidgets();
    loadExchangeRates();
    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initHeroSearch();
}

// ── NAVBAR ─────────────────────────────────────────────────────
function initNavbar() {
    const nav = document.getElementById('main-nav');
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 80) { nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
        lastY = y;
    });
}

function initMobileMenu() {
    const btn  = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-nav');
    btn?.addEventListener('click', () => { menu.classList.toggle('open'); btn.classList.toggle('active'); });
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); btn.classList.remove('active'); }));
}

// ── SMOOTH SCROLL ──────────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const el = document.querySelector(a.getAttribute('href'));
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ── HERO SEARCH ────────────────────────────────────────────────
function initHeroSearch() {
    const searchBtn = document.getElementById('hero-search-btn');
    const searchInput = document.getElementById('hero-search');
    function doSearch() {
        const q = searchInput?.value.trim().toLowerCase();
        if (!q) return;
        const match = YATRA.DESTINATIONS.find(d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.type.toLowerCase().includes(q));
        if (match) {
            document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => selectDestination(match.id), 600);
        } else {
            showToast('No destination found. Try: Goa, Kerala, Rajasthan...', 'warn');
        }
    }
    searchBtn?.addEventListener('click', doSearch);
    searchInput?.addEventListener('keyup', e => { if (e.key === 'Enter') doSearch(); });
}

// ── DESTINATION GRID ───────────────────────────────────────────
function renderDestinationGrid() {
    const grid = document.getElementById('dest-grid');
    if (!grid) return;
    YATRA.DESTINATIONS.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'dest-card';
        card.dataset.id = dest.id;
        card.innerHTML = `
            <div class="dest-img-wrap">
                <img src="${dest.image}" alt="${dest.name}" loading="lazy">
                <div class="dest-overlay">
                    <span class="dest-type">${dest.type}</span>
                </div>
            </div>
            <div class="dest-info">
                <h3>${dest.emoji} ${dest.name}</h3>
                <p>${dest.desc}</p>
                <div class="dest-meta">
                    <span class="dest-budget">From ₹${dest.baseHotel.budget.toLocaleString('en-IN')}/night</span>
                    <button class="btn-plan" onclick="planTo('${dest.id}')">Plan Trip →</button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

window.planTo = function(destId) {
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => selectDestination(destId), 600);
};

// ── DEALS ─────────────────────────────────────────────────────
function renderDeals() {
    const airlineGrid = document.getElementById('airline-deals');
    const hotelGrid   = document.getElementById('hotel-deals');

    YATRA.AIRLINE_DEALS.forEach(deal => {
        const el = document.createElement('div');
        el.className = 'deal-card';
        el.style.setProperty('--deal-color', deal.color);
        el.innerHTML = `
            <div class="deal-header">
                <span class="deal-logo">${deal.logo}</span>
                <div><strong>${deal.airline}</strong><br><small style="color:var(--text-muted)">${deal.validity}</small></div>
                <span class="deal-badge">${deal.discount}</span>
            </div>
            <p class="deal-desc">${deal.desc}</p>
            <div class="deal-footer">
                <span>From <strong>${deal.minFare}</strong></span>
                <span class="deal-save">Save ${deal.saved}</span>
            </div>
            <div class="deal-code">Code: <strong>${deal.code}</strong> <button onclick="copyCode('${deal.code}')">Copy</button></div>`;
        airlineGrid?.appendChild(el);
    });

    YATRA.HOTEL_DEALS.forEach(deal => {
        const el = document.createElement('div');
        el.className = 'deal-card';
        el.style.setProperty('--deal-color', deal.color);
        el.innerHTML = `
            <div class="deal-header">
                <span class="deal-logo">${deal.logo}</span>
                <div><strong>${deal.brand}</strong><br><small style="color:var(--text-muted)">${deal.validity}</small></div>
                <span class="deal-badge">${deal.discount}</span>
            </div>
            <p class="deal-desc">${deal.desc}</p>
            <div class="deal-footer">
                <span>From <strong>${deal.from}</strong></span>
                <span class="deal-save">Save ${deal.saved}</span>
            </div>
            <div class="deal-code">Code: <strong>${deal.code}</strong> <button onclick="copyCode('${deal.code}')">Copy</button></div>`;
        hotelGrid?.appendChild(el);
    });
}

window.copyCode = function(code) {
    navigator.clipboard.writeText(code).then(() => showToast(`Code "${code}" copied!`, 'success'));
};

// ── PACKAGES ──────────────────────────────────────────────────
function renderPackages() {
    const grid = document.getElementById('packages-grid');
    if (!grid) return;
    YATRA.PACKAGES.forEach(pkg => {
        const discount = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
        const el = document.createElement('div');
        el.className = 'pkg-card';
        el.innerHTML = `
            <div class="pkg-img-wrap">
                <img src="${pkg.image}" alt="${pkg.name}" loading="lazy">
                <span class="pkg-badge">${pkg.badge}</span>
            </div>
            <div class="pkg-body">
                <div class="pkg-operator">${pkg.operator}</div>
                <h3>${pkg.name}</h3>
                <p class="pkg-nights">${pkg.nights} Nights • From ${pkg.from}</p>
                <div class="pkg-includes">${pkg.includes.map(i => `<span>✓ ${i}</span>`).join('')}</div>
                <div class="pkg-pricing">
                    <div>
                        <span class="pkg-original">₹${pkg.originalPrice.toLocaleString('en-IN')}</span>
                        <span class="pkg-price">₹${pkg.price.toLocaleString('en-IN')}</span>
                        <span class="pkg-save-tag">${discount}% OFF</span>
                    </div>
                    <button class="btn-book" onclick="showToast('Booking redirected to operator portal', 'info')">Book Now</button>
                </div>
            </div>`;
        grid.appendChild(el);
    });
}

// ── CALCULATOR ─────────────────────────────────────────────────
function initCalculator() {
    renderCalcStep(1);

    document.getElementById('calc-next')?.addEventListener('click', () => {
        if (!validateStep(appState.currentStep)) return;
        if (appState.currentStep < appState.totalSteps) {
            appState.currentStep++;
            if (appState.currentStep === appState.totalSteps) {
                computeAndShowResult();
            } else {
                renderCalcStep(appState.currentStep);
            }
        }
    });

    document.getElementById('calc-prev')?.addEventListener('click', () => {
        if (appState.currentStep > 1) {
            appState.currentStep--;
            document.getElementById('calc-result').style.display = 'none';
            document.getElementById('calc-steps').style.display = '';
            renderCalcStep(appState.currentStep);
        }
    });

    document.getElementById('calc-reset')?.addEventListener('click', () => {
        appState.form = { destination: null, sourceCity: null, travelMode: 'flight', hotelTier: 'standard', mealPref: 'restaurant', adults: 2, children: 0, seniors: 0, nights: 3, checkIn: '', activities: [] };
        appState.currentStep = 1;
        document.getElementById('calc-result').style.display = 'none';
        document.getElementById('calc-steps').style.display = '';
        renderCalcStep(1);
    });
}

function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    if (fill) fill.style.width = `${((appState.currentStep - 1) / (appState.totalSteps - 1)) * 100}%`;
    if (label) label.textContent = `Step ${appState.currentStep} of ${appState.totalSteps}`;
}

function renderCalcStep(step) {
    const container = document.getElementById('step-container');
    if (!container) return;
    updateProgress();

    const nextBtn = document.getElementById('calc-next');
    const prevBtn = document.getElementById('calc-prev');
    if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.textContent = step === appState.totalSteps - 1 ? 'Calculate Budget →' : 'Next →';

    switch (step) {
        case 1: renderStep1(container); break;
        case 2: renderStep2(container); break;
        case 3: renderStep3(container); break;
        case 4: renderStep4(container); break;
    }
}

// STEP 1 — Destination & Dates
function renderStep1(c) {
    const today = new Date().toISOString().split('T')[0];
    c.innerHTML = `
        <div class="step-header"><span class="step-icon">🗺️</span><h2>Where are you going?</h2></div>
        <div class="form-row">
            <div class="form-group">
                <label>Travelling From</label>
                <select id="f-source" class="form-select">
                    <option value="">Select your city</option>
                    ${YATRA.SOURCE_CITIES.map(c => `<option value="${c.id}" ${appState.form.sourceCity===c.id?'selected':''}>${c.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Destination</label>
                <select id="f-dest" class="form-select">
                    <option value="">Select destination</option>
                    ${YATRA.DESTINATIONS.map(d => `<option value="${d.id}" ${appState.form.destination===d.id?'selected':''}>${d.emoji} ${d.name}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Check-In Date</label>
                <input type="date" id="f-checkin" class="form-input" min="${today}" value="${appState.form.checkIn}">
            </div>
            <div class="form-group">
                <label>Number of Nights</label>
                <div class="counter-group">
                    <button class="counter-btn" onclick="changeNights(-1)">−</button>
                    <span id="nights-val" class="counter-val">${appState.form.nights}</span>
                    <button class="counter-btn" onclick="changeNights(1)">+</button>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Adults (18+)</label>
                <div class="counter-group">
                    <button class="counter-btn" onclick="changePax('adults',-1)">−</button>
                    <span id="adults-val" class="counter-val">${appState.form.adults}</span>
                    <button class="counter-btn" onclick="changePax('adults',1)">+</button>
                </div>
            </div>
            <div class="form-group">
                <label>Children (under 12)</label>
                <div class="counter-group">
                    <button class="counter-btn" onclick="changePax('children',-1)">−</button>
                    <span id="children-val" class="counter-val">${appState.form.children}</span>
                    <button class="counter-btn" onclick="changePax('children',1)">+</button>
                </div>
            </div>
            <div class="form-group">
                <label>Senior Citizens (60+)</label>
                <div class="counter-group">
                    <button class="counter-btn" onclick="changePax('seniors',-1)">−</button>
                    <span id="seniors-val" class="counter-val">${appState.form.seniors}</span>
                    <button class="counter-btn" onclick="changePax('seniors',1)">+</button>
                </div>
            </div>
        </div>`;

    document.getElementById('f-source')?.addEventListener('change', e => appState.form.sourceCity = e.target.value);
    document.getElementById('f-dest')?.addEventListener('change', e => appState.form.destination = e.target.value);
    document.getElementById('f-checkin')?.addEventListener('change', e => appState.form.checkIn = e.target.value);
}

window.changeNights = function(d) {
    appState.form.nights = Math.max(1, Math.min(30, appState.form.nights + d));
    document.getElementById('nights-val').textContent = appState.form.nights;
};
window.changePax = function(type, d) {
    if (type === 'adults') { appState.form.adults = Math.max(1, appState.form.adults + d); document.getElementById('adults-val').textContent = appState.form.adults; }
    if (type === 'children') { appState.form.children = Math.max(0, appState.form.children + d); document.getElementById('children-val').textContent = appState.form.children; }
    if (type === 'seniors') { appState.form.seniors = Math.max(0, appState.form.seniors + d); document.getElementById('seniors-val').textContent = appState.form.seniors; }
};

// STEP 2 — Travel Mode
function renderStep2(c) {
    const modes = [
        { id: 'flight', icon: '✈️', label: 'Flight', desc: 'Fastest — IndiGo, Air India, SpiceJet' },
        { id: 'train', icon: '🚂', label: 'Train', desc: 'Comfortable — AC 2-Tier / 3-Tier' },
        { id: 'bus', icon: '🚌', label: 'Bus', desc: 'Budget-friendly — Sleeper/AC Volvo' },
        { id: 'own', icon: '🚗', label: 'Own Vehicle', desc: 'Road trip — cost per km estimate' }
    ];
    const dest = YATRA.DESTINATIONS.find(d => d.id === appState.form.destination);
    c.innerHTML = `
        <div class="step-header"><span class="step-icon">✈️</span><h2>How will you travel?</h2></div>
        ${dest && !dest.baseTrain ? '<div class="info-note">⚠️ Train/bus not available for this destination. Sea/air access only.</div>' : ''}
        <div class="option-grid">
            ${modes.map(m => `
                <div class="option-card ${appState.form.travelMode===m.id?'selected':''}" onclick="selectMode('${m.id}')">
                    <span class="option-icon">${m.icon}</span>
                    <strong>${m.label}</strong>
                    <small>${m.desc}</small>
                </div>`).join('')}
        </div>`;
}
window.selectMode = function(id) {
    appState.form.travelMode = id;
    document.querySelectorAll('#step-container .option-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
};

// STEP 3 — Stay & Meals
function renderStep3(c) {
    const tiers = [
        { id: 'budget', icon: '🏠', label: 'Budget', sub: 'Hostels / OYO / Guesthouses' },
        { id: 'standard', icon: '🏨', label: 'Standard', sub: '3-Star Hotels / Treebo / FabHotels' },
        { id: 'premium', icon: '⭐', label: 'Premium', sub: '4-Star Hotels / Heritage Properties' },
        { id: 'luxury', icon: '👑', label: 'Luxury', sub: '5-Star / Palace Hotels' }
    ];
    const meals = [
        { id: 'street', icon: '🍛', label: 'Street Food', sub: 'Dhabas, local joints & bazaars' },
        { id: 'restaurant', icon: '🍽️', label: 'Restaurant', sub: 'Good mid-range restaurants' },
        { id: 'fine', icon: '🥂', label: 'Fine Dining', sub: 'Upscale restaurants & hotel dining' }
    ];
    c.innerHTML = `
        <div class="step-header"><span class="step-icon">🏨</span><h2>Stay & Food Preferences</h2></div>
        <h4 style="margin-bottom:12px; color:var(--gold)">Accommodation Type</h4>
        <div class="option-grid four-col">
            ${tiers.map(t => `
                <div class="option-card ${appState.form.hotelTier===t.id?'selected':''}" onclick="selectHotel('${t.id}')">
                    <span class="option-icon">${t.icon}</span>
                    <strong>${t.label}</strong>
                    <small>${t.sub}</small>
                </div>`).join('')}
        </div>
        <h4 style="margin:24px 0 12px; color:var(--gold)">Meal Preference</h4>
        <div class="option-grid">
            ${meals.map(m => `
                <div class="option-card ${appState.form.mealPref===m.id?'selected':''}" onclick="selectMeal('${m.id}')">
                    <span class="option-icon">${m.icon}</span>
                    <strong>${m.label}</strong>
                    <small>${m.sub}</small>
                </div>`).join('')}
        </div>`;
}
window.selectHotel = function(id) { appState.form.hotelTier = id; document.querySelectorAll('#step-container .four-col .option-card').forEach(c => c.classList.remove('selected')); event.currentTarget.classList.add('selected'); };
window.selectMeal = function(id) { appState.form.mealPref = id; const cards = document.querySelectorAll('#step-container .option-grid:not(.four-col) .option-card'); cards.forEach(c => c.classList.remove('selected')); event.currentTarget.classList.add('selected'); };

// STEP 4 — Activities
function renderStep4(c) {
    c.innerHTML = `
        <div class="step-header"><span class="step-icon">🎯</span><h2>What do you enjoy?</h2><p style="color:var(--text-muted);font-size:0.9rem">Select all that apply (multi-select)</p></div>
        <div class="option-grid">
            ${YATRA.ACTIVITY_CATEGORIES.map(a => `
                <div class="option-card ${appState.form.activities.includes(a.id)?'selected':''}" onclick="toggleActivity('${a.id}')">
                    <span class="option-icon">${a.icon}</span>
                    <strong>${a.label}</strong>
                    <small>~₹${a.daily.toLocaleString('en-IN')}/day</small>
                </div>`).join('')}
        </div>`;
}
window.toggleActivity = function(id) {
    const idx = appState.form.activities.indexOf(id);
    if (idx === -1) appState.form.activities.push(id);
    else appState.form.activities.splice(idx, 1);
    event.currentTarget.classList.toggle('selected');
};

// ── VALIDATE STEPS ─────────────────────────────────────────────
function validateStep(step) {
    if (step === 1) {
        if (!appState.form.sourceCity) { showToast('Please select your departure city', 'warn'); return false; }
        if (!appState.form.destination) { showToast('Please select a destination', 'warn'); return false; }
        if (!appState.form.checkIn) { showToast('Please select a travel date', 'warn'); return false; }
        if (appState.form.sourceCity === appState.form.destination) { showToast('Source and destination cannot be the same', 'warn'); return false; }
    }
    return true;
}

// ── COMPUTE RESULT ─────────────────────────────────────────────
function computeAndShowResult() {
    const result = YATRA_CALC.calculate(appState.form);
    appState.result = result;

    const stepsEl = document.getElementById('calc-steps');
    const resultEl = document.getElementById('calc-result');
    stepsEl.style.display = 'none';
    resultEl.style.display = '';

    if (!result) {
        resultEl.innerHTML = `<p class="error">Could not calculate. Please go back and fill all fields.</p>`;
        return;
    }

    const { dest, breakdown, total, perPerson, savings, seasonAdvice, totalPax, nights } = result;
    const colors = ['#ff6b35','#f7c59f','#4ecdc4','#45b7d1','#a8e6cf'];
    const labels = ['Transport','Hotel','Meals','Activities','Misc'];
    const values = [breakdown.transport, breakdown.hotel, breakdown.meals, breakdown.activities, breakdown.misc];

    resultEl.innerHTML = `
        <div class="result-hero">
            <div class="result-dest"><span>${dest.emoji}</span>${dest.name}</div>
            <div class="result-big">₹${total.toLocaleString('en-IN')}</div>
            <div class="result-sub">Total for ${totalPax} traveller${totalPax>1?'s':''} · ${nights} night${nights>1?'s':''}</div>
            <div class="result-per">₹${perPerson.toLocaleString('en-IN')} per person</div>
        </div>
        <div class="result-body">
            <div class="result-breakdown">
                <h3>💰 Budget Breakdown</h3>
                <canvas id="budget-chart" width="240" height="240"></canvas>
                <div class="breakdown-list">
                    ${values.map((v, i) => `
                        <div class="breakdown-row">
                            <span class="br-dot" style="background:${colors[i]}"></span>
                            <span class="br-label">${labels[i]}</span>
                            <span class="br-val">₹${v.toLocaleString('en-IN')}</span>
                            <span class="br-pct">${Math.round(v/total*100)}%</span>
                        </div>`).join('')}
                </div>
            </div>
            <div class="result-right">
                <div class="season-advice ${seasonAdvice.type}">
                    ${seasonAdvice.text}
                </div>
                <div class="savings-box">
                    <h3>💡 Smart Savings Tips</h3>
                    ${savings.map(s => `
                        <div class="saving-row">
                            <span class="saving-icon">${s.icon}</span>
                            <div>
                                <div class="saving-text">${s.text}</div>
                                <div class="saving-save">${s.save}</div>
                            </div>
                        </div>`).join('')}
                </div>
                <div id="weather-result" class="weather-result-box">
                    <div class="loading-dots"><span></span><span></span><span></span></div>
                </div>
            </div>
        </div>
        <div class="result-actions">
            <button onclick="printBudget()" class="btn-secondary">🖨️ Save as PDF</button>
            <button onclick="shareBudget()" class="btn-secondary">📱 Share</button>
            <button id="calc-reset" onclick="resetCalc()" class="btn-primary">Plan Another Trip</button>
        </div>`;

    drawPieChart(values, colors);
    fetchResultWeather(dest);
    updateProgress();
}

window.resetCalc = function() {
    appState.form = { destination: null, sourceCity: null, travelMode: 'flight', hotelTier: 'standard', mealPref: 'restaurant', adults: 2, children: 0, seniors: 0, nights: 3, checkIn: '', activities: [] };
    appState.currentStep = 1;
    document.getElementById('calc-result').style.display = 'none';
    document.getElementById('calc-steps').style.display = '';
    renderCalcStep(1);
};

// ── PIE CHART ─────────────────────────────────────────────────
function drawPieChart(values, colors) {
    const canvas = document.getElementById('budget-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const total = values.reduce((a, b) => a + b, 0);
    let start = -Math.PI / 2;
    ctx.clearRect(0, 0, 240, 240);
    values.forEach((v, i) => {
        const slice = (v / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.arc(120, 120, 110, start, start + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.stroke();
        start += slice;
    });
    // Center hole
    ctx.beginPath();
    ctx.arc(120, 120, 60, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
}

// ── WEATHER (RESULT) ──────────────────────────────────────────
async function fetchResultWeather(dest) {
    const box = document.getElementById('weather-result');
    if (!box) return;
    const w = await YATRA_API.getWeather(dest.lat, dest.lon, dest.name);
    if (!w) { box.innerHTML = ''; return; }
    box.innerHTML = `
        <h3>🌤️ Current Weather in ${dest.name}</h3>
        <div class="weather-grid">
            <div class="w-item"><span class="w-icon">${w.icon}</span><span>${w.desc}</span></div>
            <div class="w-item"><span class="w-num">${w.temp}°C</span><span>Now</span></div>
            <div class="w-item"><span class="w-num">${w.high}° / ${w.low}°</span><span>Today High/Low</span></div>
            <div class="w-item"><span class="w-num">${w.humidity}%</span><span>Humidity</span></div>
        </div>`;
}

// ── WEATHER WIDGETS (DESTINATIONS) ────────────────────────────
async function initWeatherWidgets() {
    const boxes = document.querySelectorAll('[data-weather]');
    for (const box of boxes) {
        const id = box.dataset.weather;
        const dest = YATRA.DESTINATIONS.find(d => d.id === id);
        if (!dest) continue;
        const w = await YATRA_API.getWeather(dest.lat, dest.lon, dest.name);
        if (w) box.innerHTML = `${w.icon} ${w.temp}°C · ${w.desc}`;
    }
}

// ── EXCHANGE RATES ────────────────────────────────────────────
async function loadExchangeRates() {
    const rates = await YATRA_API.getRates();
    appState.exchangeRates = rates;
    const el = document.getElementById('currency-strip');
    if (!el || !rates) return;
    const pairs = [
        { code: 'USD', label: '🇺🇸 USD' },
        { code: 'EUR', label: '🇪🇺 EUR' },
        { code: 'GBP', label: '🇬🇧 GBP' },
        { code: 'AED', label: '🇦🇪 AED' }
    ];
    el.innerHTML = pairs.map(p => {
        const val = rates[p.code] ? (1 / rates[p.code]).toFixed(2) : '--';
        return `<span class="rate-item">₹100 = ${p.label} ${(100 * rates[p.code]).toFixed(2)}</span>`;
    }).join('<span class="rate-sep">|</span>');
}

// ── UTILITY ───────────────────────────────────────────────────
window.selectDestination = function(id) {
    appState.form.destination = id;
    const sel = document.getElementById('f-dest');
    if (sel) sel.value = id;
};

window.printBudget = function() {
    window.print();
};

window.shareBudget = function() {
    const r = appState.result;
    if (!r) return;
    const text = `🇮🇳 BharatYatra Budget Plan\n📍 ${r.dest.name} · ${r.nights} nights · ${r.totalPax} travellers\n💰 Total: ₹${r.total.toLocaleString('en-IN')} (₹${r.perPerson.toLocaleString('en-IN')}/person)\nPlan yours at thoshotech.com/web/tours`;
    if (navigator.share) {
        navigator.share({ title: 'BharatYatra Budget', text });
    } else {
        navigator.clipboard.writeText(text).then(() => showToast('Budget details copied!', 'success'));
    }
};

function showToast(msg, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast toast-${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

window.showToast = showToast;
