document.addEventListener("DOMContentLoaded", () => {
    
    // 1. POPULATE BRAND & USER INFO
    document.title = `${BRAND.name} | ${BRAND.tagline}`;
    document.getElementById("brand-name").textContent = BRAND.name;
    
    // User data
    document.getElementById("ui-user-avatar").src = USER.avatar;
    document.getElementById("ui-user-name").textContent = USER.name;
    document.getElementById("ui-user-exam").textContent = USER.targetExam;
    
    // Dashboard Welcome
    document.getElementById("welcome-name").textContent = USER.name.split(" ")[0];
    document.getElementById("ui-streak").innerHTML = `🔥 ${USER.streak}`;

    // 2. POPULATE VIDEO MOCKUP
    const v = DATA.currentVideo;
    document.getElementById("ui-video-thumb").src = v.thumbnail;
    document.getElementById("ui-video-progress").style.width = v.progress + "%";
    document.getElementById("ui-video-subject").textContent = v.subject;
    document.getElementById("ui-video-duration").innerHTML = `<i class="far fa-clock"></i> ${v.duration}`;
    document.getElementById("ui-video-title").textContent = v.title;
    document.getElementById("ui-video-instructor").innerHTML = `<i class="fas fa-chalkboard-teacher"></i> ${v.instructor}`;

    // 3. RENDER CURRICULUM ACCORDION
    const currContainer = document.getElementById("curriculum-container");
    DATA.curriculum.forEach((mod, index) => {
        let isExpanded = index === 2; // Expand the 3rd one by default
        
        const modEl = document.createElement("div");
        modEl.className = "module";
        
        let lessonsHtml = mod.videos.map(l => {
            let icon = 'fa-lock';
            if(l.status === 'completed') icon = 'fa-check-circle';
            if(l.status === 'watching') icon = 'fa-play-circle';
            
            return `
                <div class="lesson ${l.status}">
                    <div class="lesson-left">
                        <i class="fas ${icon} lesson-icon"></i>
                        <span class="lesson-title">${l.title}</span>
                    </div>
                    <span class="lesson-duration">${l.duration}</span>
                </div>
            `;
        }).join("");

        modEl.innerHTML = `
            <div class="module-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                <span>${mod.title}</span>
                <i class="fas fa-chevron-${isExpanded ? 'down' : 'right'} text-muted" style="font-size:0.8rem"></i>
            </div>
            <div class="module-content" style="display: ${isExpanded ? 'block' : 'none'}">
                ${lessonsHtml}
            </div>
        `;
        currContainer.appendChild(modEl);
    });

    // 4. RENDER ANALYTICS
    document.getElementById("ui-overall-score").textContent = DATA.analytics.overall + "%";
    document.getElementById("ui-radial").style.background = `conic-gradient(var(--primary) ${DATA.analytics.overall}%, var(--bg-elevated) 0)`;

    const barsContainer = document.getElementById("subject-bars-container");
    DATA.analytics.subjects.forEach(sub => {
        const bar = document.createElement("div");
        bar.className = "subject-bar";
        bar.innerHTML = `
            <div class="sb-info">
                <span style="font-weight:600">${sub.name}</span>
                <span>${sub.score}%</span>
            </div>
            <div class="sb-track">
                <div class="sb-fill" style="width: ${sub.score}%; background: ${sub.color}"></div>
            </div>
        `;
        barsContainer.appendChild(bar);
    });

    // 5. RENDER LEADERBOARD
    const lbContainer = document.getElementById("leaderboard-container");
    DATA.leaderboard.forEach(u => {
        let trendIcon = 'fa-minus';
        if(u.change === 'up') trendIcon = 'fa-arrow-up';
        if(u.change === 'down') trendIcon = 'fa-arrow-down';
        
        const init = u.name.charAt(0);
        
        const lbEl = document.createElement("div");
        lbEl.className = "lb-item";
        lbEl.innerHTML = `
            <div class="lb-rank">#${u.rank}</div>
            <div class="lb-avatar">${init}</div>
            <div class="lb-info">
                <div class="lb-name">${u.name}</div>
                <div class="lb-points">${u.points.toLocaleString()} pts</div>
            </div>
            <div class="lb-trend ${u.change}">
                <i class="fas ${trendIcon}"></i>
            </div>
        `;
        lbContainer.appendChild(lbEl);
    });

    // 6. MOBILE MENU TOGGLE
    const menuBtn = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    
    if(menuBtn) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

});
