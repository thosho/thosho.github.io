// ============================================================
// UrbanNest v2.0 — Application Logic
// All interactive features. Reads from config.js + data.js.
// ============================================================

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    applyBrandConfig();
    initHero();
    initFilters();
    renderProperties(PROPERTIES);
    initStats();
    initTestimonials();
    initPartners();
    initNav();
    initDrawer();
    initTourModal();
    initPWA();
    initScrollAnimations();
    initServiceWorker();
});

/* ── BRAND CONFIG APPLICATION ─────────────────────────────── */
function applyBrandConfig() {
    const B = BRAND;
    // Apply CSS color variables
    document.documentElement.style.setProperty('--gold', B.colors.gold);
    document.documentElement.style.setProperty('--gold-light', B.colors.goldLight);
    document.documentElement.style.setProperty('--emerald', B.colors.emerald);

    // Set page title + meta
    document.title = `${B.name} — ${B.tagline}`;
    document.querySelector('meta[name="description"]').content = B.description;
    document.querySelector('meta[property="og:title"]').content = `${B.name} — ${B.tagline}`;
    document.querySelector('meta[property="og:description"]').content = B.description;

    // Brand name in logos
    const logoEls = document.querySelectorAll('#brand-logo, .footer-logo, .nav-logo');
    logoEls.forEach(el => {
        el.innerHTML = `${B.tagName[0]}<span class="accent">${B.tagName[1]}</span>`;
    });
    document.getElementById('footer-tagline').textContent = B.description;

    // Footer copyright
    document.getElementById('footer-copy').innerHTML =
        `&copy; ${B.year} ${B.name} PropTech. All rights reserved. Crafted by <a href="#" style="color:var(--gold)">${B.credit}</a>`;

    // Footer social links
    const socialEl = document.getElementById('footer-social');
    const iconMap = {instagram:'fa-instagram',linkedin:'fa-linkedin',youtube:'fa-youtube',twitter:'fa-x-twitter'};
    Object.entries(B.social).forEach(([key, url]) => {
        if (url) {
            socialEl.innerHTML += `<a href="${url}" class="social-btn" target="_blank" rel="noopener" aria-label="${key}">
                <i class="fab ${iconMap[key] || 'fa-link'}"></i></a>`;
        }
    });

    // Footer contact
    const contactEl = document.getElementById('footer-contact');
    contactEl.innerHTML = `
        <h5>Get In Touch</h5>
        <p><i class="fas fa-phone-volume"></i><a href="tel:${B.phone.replace(/\s/g,'')}" style="color:var(--text-muted)">${B.phone}</a></p>
        <p><i class="fas fa-envelope"></i><a href="mailto:${B.email}" style="color:var(--text-muted)">${B.email}</a></p>
        <p><i class="fas fa-location-dot"></i><span>${B.address}</span></p>
    `;

    // Hero stats row
    const statsRow = document.getElementById('hero-stats-row');
    statsRow.innerHTML = B.stats.map(s => `
        <div class="hero-stat-item">
            <strong>${s.prefix || ''}${s.value}${s.suffix || ''}</strong>
            <span>${s.label}</span>
        </div>
    `).join('');

    // CTA phone number
    document.getElementById('nav-cta').href = `tel:${B.phone.replace(/\s/g,'')}`;
}

/* ── HERO SLIDESHOW + TYPING ──────────────────────────────── */
let heroIdx = 0;
let typingTimeout;
const cities = BRAND.heroSlides.map(s => s.caption) || ['Mumbai', 'Bangalore', 'Gurgaon'];
const cityNames = ['Mumbai', 'Bangalore', 'Gurgaon', 'Pune'];
let cityIdx = 0;

function initHero() {
    const slidesEl  = document.getElementById('hero-slides');
    const dotsEl    = document.getElementById('hero-dots');
    const captionEl = document.getElementById('hero-caption');

    BRAND.heroSlides.forEach((slide, i) => {
        const div = document.createElement('div');
        div.className = 'hero-slide' + (i === 0 ? ' active' : '');
        div.style.backgroundImage = `url('${slide.url}')`;
        slidesEl.appendChild(div);

        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i+1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsEl.appendChild(dot);
    });

    setInterval(() => {
        heroIdx = (heroIdx + 1) % BRAND.heroSlides.length;
        goToSlide(heroIdx);
    }, 5000);

    // Typing animation
    typeCity();
}

function goToSlide(idx) {
    const slides  = document.querySelectorAll('.hero-slide');
    const dots    = document.querySelectorAll('.hero-dot');
    const caption = document.getElementById('hero-caption');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[idx]?.classList.add('active');
    dots[idx]?.classList.add('active');
    if (caption) caption.textContent = '📍 ' + BRAND.heroSlides[idx]?.caption;
    heroIdx = idx;
}

function typeCity() {
    const el = document.getElementById('typed-city');
    if (!el) return;
    const city = cityNames[cityIdx % cityNames.length];
    let i = 0;
    el.textContent = '';

    function type() {
        if (i < city.length) {
            el.textContent += city[i++];
            typingTimeout = setTimeout(type, 80);
        } else {
            typingTimeout = setTimeout(erase, 2200);
        }
    }
    function erase() {
        if (el.textContent.length > 0) {
            el.textContent = el.textContent.slice(0,-1);
            typingTimeout = setTimeout(erase, 45);
        } else {
            cityIdx++;
            typingTimeout = setTimeout(typeCity, 400);
        }
    }
    type();
}

/* ── FILTERS & RENDERING ──────────────────────────────────── */
function initFilters() {
    const cityEl   = document.getElementById('filter-city');
    const typeEl   = document.getElementById('filter-type');
    const statusEl = document.getElementById('filter-status');

    CITIES.forEach(c => {
        const o = new Option(c === 'All' ? 'All Cities' : c, c);
        cityEl.appendChild(o);
    });
    TYPES.forEach(t => {
        const o = new Option(t === 'All' ? 'All Types' : t, t);
        typeEl.appendChild(o);
    });
    STATUSES.forEach(s => {
        const o = new Option(s === 'All' ? 'Any Status' : s, s);
        statusEl.appendChild(o);
    });

    document.getElementById('btn-search').addEventListener('click', filterProperties);
    document.getElementById('sort-select').addEventListener('change', filterProperties);

    // Grid / Map toggle
    document.getElementById('btn-grid').addEventListener('click', () => {
        document.getElementById('grid-view').style.display = 'grid';
        document.getElementById('map-view').classList.remove('active');
        document.getElementById('btn-grid').classList.add('active');
        document.getElementById('btn-map').classList.remove('active');
    });
    document.getElementById('btn-map').addEventListener('click', () => {
        document.getElementById('grid-view').style.display = 'none';
        document.getElementById('map-view').classList.add('active');
        document.getElementById('btn-map').classList.add('active');
        document.getElementById('btn-grid').classList.remove('active');
    });
}

function filterProperties() {
    const city   = document.getElementById('filter-city').value;
    const type   = document.getElementById('filter-type').value;
    const status = document.getElementById('filter-status').value;
    const budget = parseInt(document.getElementById('filter-budget').value);
    const sort   = document.getElementById('sort-select').value;

    let result = PROPERTIES.filter(p => {
        return (city === 'All' || p.city === city)
            && (type === 'All' || p.type === type)
            && (status === 'All' || p.status === status)
            && (p.priceVal <= budget);
    });

    if (sort === 'price-asc')  result.sort((a,b) => a.priceVal - b.priceVal);
    if (sort === 'price-desc') result.sort((a,b) => b.priceVal - a.priceVal);
    if (sort === 'area-desc')  result.sort((a,b) => parseInt(b.area) - parseInt(a.area));

    renderProperties(result);
}

function renderProperties(props) {
    const grid = document.getElementById('grid-view');
    const countEl = document.getElementById('results-count');
    grid.innerHTML = '';

    countEl.innerHTML = `Showing <span>${props.length}</span> verified listing${props.length !== 1 ? 's' : ''}`;

    if (props.length === 0) {
        grid.style.display = 'block';
        grid.innerHTML = `
            <div style="text-align:center;padding:5rem 1rem;color:var(--text-muted)">
                <i class="fas fa-building" style="font-size:3rem;opacity:0.2;display:block;margin-bottom:1rem"></i>
                <p style="font-size:1.1rem;margin-bottom:0.5rem">No properties found.</p>
                <p style="font-size:0.9rem">Try adjusting your filters.</p>
            </div>`;
        return;
    }
    grid.style.display = 'grid';

    const wished = getWishlist();
    props.forEach((p, i) => {
        const isWished = wished.includes(p.id);
        const statusClass = p.status === 'Ready to Move' ? 'status-ready'
            : p.status === 'Under Construction' ? 'status-construction' : 'status-resale';

        const badgesHtml = p.tags.map((tag, j) => {
            const cls = tag.toLowerCase().includes('new') ? 'badge-glow' : (j === 0 ? 'badge-gold' : 'badge-green');
            return `<span class="badge ${cls}">${tag}</span>`;
        }).join('');

        const imgsHtml = p.images.map((url, idx) =>
            `<img src="${url}" alt="${p.title} ${idx+1}" loading="${idx === 0 ? 'eager' : 'lazy'}" class="${idx === 0 ? 'active' : ''}">`
        ).join('');

        const dotHtml = p.images.map((_,idx) =>
            `<span class="slide-dot ${idx===0?'active':''}"></span>`
        ).join('');

        const metaHtml = p.type !== 'Commercial'
            ? `<div class="card-meta-item"><i class="fas fa-bed"></i> ${p.bedrooms} Bed</div>
               <div class="card-meta-item"><i class="fas fa-bath"></i> ${p.bathrooms} Bath</div>
               <div class="card-meta-item"><i class="fas fa-car"></i> ${p.parking} Park</div>`
            : `<div class="card-meta-item"><i class="fas fa-vector-square"></i> ${p.area}</div>
               <div class="card-meta-item"><i class="fas fa-chart-line"></i> High ROI</div>`;

        const card = document.createElement('div');
        card.className = 'property-card fade-up';
        card.style.animationDelay = `${i * 60}ms`;
        card.dataset.id = p.id;
        card.innerHTML = `
            <div class="card-badges">${badgesHtml}</div>
            <button class="card-wish ${isWished ? 'wished' : ''}" data-id="${p.id}" aria-label="Save property">
                <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="card-slider" data-idx="0">
                ${imgsHtml}
                <div class="slide-btns">
                    <button class="slide-btn slide-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
                    <button class="slide-btn slide-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="slide-dots">${dotHtml}</div>
            </div>
            <div class="card-body">
                <div class="card-price">${p.price}</div>
                <span class="card-psf">${p.pricePerSqft} / sq.ft. · ${p.area}</span>
                <div class="card-title">${p.title}</div>
                <div class="card-loc"><i class="fas fa-location-dot"></i> ${p.neighbourhood}, ${p.city}</div>
                <div class="card-meta">${metaHtml}</div>
            </div>
            <div class="card-footer">
                <span class="card-status ${statusClass}">${p.status}</span>
                <button class="btn-tour" data-id="${p.id}"><i class="fas fa-cube"></i> Virtual Tour</button>
            </div>`;
        grid.appendChild(card);
    });

    // Attach events after render
    attachCardEvents();
    triggerFadeIn();
}

function attachCardEvents() {
    // Open drawer on card click
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.card-wish') || e.target.closest('.slide-btn') || e.target.closest('.btn-tour')) return;
            openDrawer(card.dataset.id);
        });
    });
    // Wishlist toggle
    document.querySelectorAll('.card-wish').forEach(btn => {
        btn.addEventListener('click', e => { e.stopPropagation(); toggleWishlist(btn.dataset.id, btn); });
    });
    // Image sliders
    document.querySelectorAll('.card-slider').forEach(slider => {
        const imgs = slider.querySelectorAll('img');
        const dots = slider.querySelectorAll('.slide-dot');
        slider.querySelector('.slide-prev').addEventListener('click', e => { e.stopPropagation(); slide(slider, imgs, dots, -1); });
        slider.querySelector('.slide-next').addEventListener('click', e => { e.stopPropagation(); slide(slider, imgs, dots, 1); });
    });
    // Virtual tour buttons on cards
    document.querySelectorAll('.btn-tour').forEach(btn => {
        btn.addEventListener('click', e => { e.stopPropagation(); openTour(btn.dataset.id); });
    });
}

function slide(slider, imgs, dots, dir) {
    let idx = parseInt(slider.dataset.idx || 0);
    imgs[idx].classList.remove('active');
    dots[idx]?.classList.remove('active');
    idx = (idx + dir + imgs.length) % imgs.length;
    slider.dataset.idx = idx;
    imgs[idx].classList.add('active');
    dots[idx]?.classList.add('active');
}

/* ── WISHLIST ─────────────────────────────────────────────── */
function getWishlist() {
    return JSON.parse(localStorage.getItem('un_wishlist') || '[]');
}
function saveWishlist(list) {
    localStorage.setItem('un_wishlist', JSON.stringify(list));
    const countEl = document.getElementById('wish-count');
    countEl.textContent = list.length;
    countEl.classList.toggle('show', list.length > 0);
}
function toggleWishlist(id, btn) {
    let list = getWishlist();
    const inList = list.includes(id);
    list = inList ? list.filter(x => x !== id) : [...list, id];
    saveWishlist(list);
    btn.classList.toggle('wished', !inList);
    btn.innerHTML = `<i class="${!inList ? 'fas' : 'far'} fa-heart"></i>`;
}
// Init badge count
(function initWishBadge() {
    const list = getWishlist();
    const countEl = document.getElementById('wish-count');
    if (countEl) {
        countEl.textContent = list.length;
        countEl.classList.toggle('show', list.length > 0);
    }
})();

/* ── PROPERTY DETAIL DRAWER ──────────────────────────────── */
function openDrawer(id) {
    const p = PROPERTIES.find(x => x.id === id);
    if (!p) return;
    const inner = document.getElementById('drawer-inner');

    const galImgs = p.images.map((url, i) => i === 0
        ? `<img src="${url}" alt="${p.title}" class="drawer-main-img" id="drawer-main">`
        : `<img src="${url}" alt="${p.title}" class="drawer-thumb" onclick="document.getElementById('drawer-main').src='${url}'">`
    ).join('');

    const amenHtml = p.amenities.map(a =>
        `<span class="amenity-chip"><i class="fas ${AMENITY_ICONS[a] || 'fa-check'}"></i> ${a}</span>`
    ).join('');

    const statusClass = p.status === 'Ready to Move' ? 'status-ready'
        : p.status === 'Under Construction' ? 'status-construction' : 'status-resale';

    inner.innerHTML = `
        <div class="drawer-gallery">${galImgs}</div>
        <div class="drawer-header">
            <div>
                <div class="card-status ${statusClass}" style="display:inline-block;margin-bottom:0.5rem">${p.status}</div>
                <div class="drawer-title">${p.title}</div>
                <div class="drawer-loc-line"><i class="fas fa-location-dot" style="color:var(--emerald)"></i> ${p.neighbourhood}, ${p.city}</div>
            </div>
            <div style="text-align:right">
                <div class="drawer-price">${p.price}</div>
                <div class="drawer-psf">${p.pricePerSqft} per sq.ft.</div>
            </div>
        </div>

        <div class="drawer-meta-row">
            <div class="drawer-meta-item"><i class="fas fa-bed"></i><strong>${p.bedrooms || '—'}</strong><span>Bedrooms</span></div>
            <div class="drawer-meta-item"><i class="fas fa-bath"></i><strong>${p.bathrooms}</strong><span>Bathrooms</span></div>
            <div class="drawer-meta-item"><i class="fas fa-car"></i><strong>${p.parking}</strong><span>Parking</span></div>
            <div class="drawer-meta-item"><i class="fas fa-vector-square"></i><strong style="font-size:0.8rem">${p.area}</strong><span>Carpet Area</span></div>
            <div class="drawer-meta-item"><i class="fas fa-building"></i><strong style="font-size:0.7rem">${p.developer}</strong><span>Developer</span></div>
            <div class="drawer-meta-item"><i class="fas fa-shield-halved"></i><strong style="font-size:0.65rem">${p.rera}</strong><span>RERA No.</span></div>
        </div>

        <p class="drawer-desc">${p.desc}</p>

        <p class="drawer-section-title">Amenities</p>
        <div class="amenity-chips">${amenHtml}</div>

        <p class="drawer-section-title">EMI Calculator</p>
        <div class="emi-calc">
            <div class="emi-inputs">
                <div class="emi-field">
                    <label>Loan Amount (₹)</label>
                    <input type="number" id="emi-loan" value="${Math.round(p.priceVal * 0.8)}" oninput="calcEMI()">
                </div>
                <div class="emi-field">
                    <label>Interest Rate (%)</label>
                    <input type="number" id="emi-rate" value="8.5" step="0.1" oninput="calcEMI()">
                </div>
                <div class="emi-field">
                    <label>Tenure (Years)</label>
                    <input type="number" id="emi-tenure" value="20" oninput="calcEMI()">
                </div>
            </div>
            <div class="emi-result" id="emi-result">
                <strong id="emi-output">₹ —</strong>
                <small>Estimated Monthly EMI</small>
            </div>
        </div>

        <div class="drawer-ctas">
            <button class="btn btn-gold" onclick="openTour('${p.id}')">
                <i class="fas fa-cube"></i> Virtual Tour
            </button>
            <a href="tel:${BRAND.phone.replace(/\s/g,'')}" class="btn btn-ghost">
                <i class="fas fa-phone-volume"></i> Contact Agent
            </a>
            <a href="https://wa.me/${BRAND.phone.replace(/[\s+]/g,'').replace(/^0/,'91')}" class="btn btn-ghost" style="color:#25D366;border-color:#25D366">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>
        <p class="drawer-rera">RERA Reg: ${p.rera} · ${p.developer} · All prices are indicative</p>
    `;

    document.getElementById('drawer-overlay').classList.add('open');
    document.getElementById('detail-drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
    calcEMI();
}

function closeDrawer() {
    document.getElementById('drawer-overlay').classList.remove('open');
    document.getElementById('detail-drawer').classList.remove('open');
    document.body.style.overflow = '';
}

function initDrawer() {
    document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
    const drawer = document.getElementById('detail-drawer');
    let startY = 0;
    drawer.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
    drawer.addEventListener('touchend', e => {
        if (e.changedTouches[0].clientY - startY > 80) closeDrawer();
    }, {passive:true});
}

// EMI Calculator
function calcEMI() {
    const P = parseFloat(document.getElementById('emi-loan')?.value) || 0;
    const annualRate = parseFloat(document.getElementById('emi-rate')?.value) || 8.5;
    const years = parseFloat(document.getElementById('emi-tenure')?.value) || 20;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? P/n : P * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
    const el = document.getElementById('emi-output');
    if (el) el.textContent = '₹ ' + Math.round(emi).toLocaleString('en-IN');
}

/* ── VIRTUAL TOUR MODAL ──────────────────────────────────── */
function openTour(id) {
    const p = PROPERTIES.find(x => x.id === id);
    const modal = document.getElementById('tour-modal');
    const img = document.getElementById('tour-img');
    if (p && img) img.src = p.images[0];
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function initTourModal() {
    const modal = document.getElementById('tour-modal');
    document.getElementById('tour-close').addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', e => {
        if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
    });
    // Hero tour button
    document.getElementById('hero-tour-btn')?.addEventListener('click', () => openTour('p1'));
}

/* ── STATS COUNTERS ──────────────────────────────────────── */
function initStats() {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = BRAND.stats.map(s => `
        <div class="stat-card fade-up">
            <div class="stat-icon"><i class="fas ${s.icon}"></i></div>
            <div class="stat-number" data-target="${s.value}" data-prefix="${s.prefix||''}" data-suffix="${s.suffix||''}">
                ${s.prefix || ''}0${s.suffix || ''}
            </div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join('');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.stat-number').forEach(animateCounter);
                observer.unobserve(e.target);
            }
        });
    }, {threshold: 0.3});
    observer.observe(grid);
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isFloat = target % 1 !== 0;
    const duration = 1600;
    const start = performance.now();

    function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const current = target * ease;
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString('en-IN')) + suffix;
        if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

/* ── TESTIMONIALS ────────────────────────────────────────── */
function initTestimonials() {
    const track = document.getElementById('testi-track');
    track.innerHTML = BRAND.testimonials.map(t => `
        <div class="testi-card fade-up">
            <div class="testi-stars">${'<i class="fas fa-star"></i>'.repeat(t.rating)}</div>
            <p class="testi-text">"${t.text}"</p>
            <div class="testi-author">
                <img src="${t.avatar}" alt="${t.name}" class="testi-avatar" loading="lazy">
                <div>
                    <div class="testi-name">${t.name}</div>
                    <div class="testi-loc">${t.location}</div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ── DEVELOPER PARTNERS MARQUEE ──────────────────────────── */
function initPartners() {
    const track = document.getElementById('marquee-track');
    // Duplicate for seamless loop
    const chips = [...BRAND.partners, ...BRAND.partners].map(p =>
        `<span class="partner-chip">${p}</span>`
    ).join('');
    track.innerHTML = chips;
}

/* ── NAVIGATION ──────────────────────────────────────────── */
function initNav() {
    const nav = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');

    // Scroll effect
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, {passive: true});

    // Hamburger
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('open');
        overlay.classList.add('show');
        mobileNav.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
    });
    function closeMobileNav() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('show');
        mobileNav.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
    }
    document.getElementById('mobile-close').addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

    // Wishlist nav button → scroll to properties
    document.getElementById('wishlist-nav-btn').addEventListener('click', () => {
        document.getElementById('properties').scrollIntoView({behavior:'smooth'});
    });

    // Active nav highlight
    const sections = ['home','properties','stats','testimonials','contact-section'];
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {threshold: 0.4});
    sections.forEach(id => { const el = document.getElementById(id); if(el) observer.observe(el); });
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────── */
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.12});
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
function triggerFadeIn() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.1});
    document.querySelectorAll('.property-card.fade-up').forEach(el => observer.observe(el));
}

/* ── PWA INSTALL PROMPT ──────────────────────────────────── */
let deferredPrompt = null;
function initPWA() {
    const banner = document.getElementById('pwa-banner');
    const installBtn = document.getElementById('pwa-install');
    const dismissBtn = document.getElementById('pwa-dismiss');

    if (localStorage.getItem('pwa-dismissed')) return;

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        setTimeout(() => banner.classList.add('show'), 3000);
    });

    installBtn.addEventListener('click', async () => {
        banner.classList.remove('show');
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        }
    });

    dismissBtn.addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('pwa-dismissed', '1');
    });
}

/* ── SERVICE WORKER ──────────────────────────────────────── */
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ SW registered:', reg.scope))
            .catch(err => console.warn('SW failed:', err));
    }
}
