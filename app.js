let allBlogPosts = [];

document.addEventListener('DOMContentLoaded', () => {
    // Add JSONP script for Blogger feed
    const script = document.createElement('script');
    script.src = 'https://thosho.blogspot.com/feeds/posts/default?alt=json-in-script&callback=handleBlogPosts';
    document.body.appendChild(script);

    // Modal Events
    const modalCloseBtn = document.getElementById('blogModalClose');
    const modalOverlay = document.getElementById('blogModalOverlay');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBlogModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeBlogModal();
        });
    }

    // Mobile Menu Events
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileSidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileSidebar.classList.add('open');
        });
    }

    if (mobileCloseBtn && mobileSidebar) {
        mobileCloseBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    }

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    });
});

function handleBlogPosts(data) {
    const container = document.getElementById('blog-container');
    const posts = data.feed.entry || [];
    container.innerHTML = ''; // Clear loader

    if (posts.length === 0) {
        container.innerHTML = '<p class="error-msg">No posts found.</p>';
        return;
    }

    allBlogPosts = posts.map(post => {
        const title = post.title.$t;
        const content = post.content ? post.content.$t : (post.summary ? post.summary.$t : '');
        const link = post.link.find(l => l.rel === 'alternate').href;
        
        // Try to find first image in content
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const image = imgMatch ? imgMatch[1] : '';

        // Extract clean text snippet
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const excerpt = textContent.substring(0, 120) + '...';

        return { title, content, link, image, excerpt };
    });

    renderBlogPosts();
}

function renderBlogPosts() {
    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    allBlogPosts.forEach((post, index) => {
        const defaultImage = 'https://via.placeholder.com/600x400/1E1E1E/03A9F4?text=Thosho+Tech+Blog';
        const imgUrl = post.image || defaultImage;

        const cardHTML = `
            <article class="blog-card" onclick="openBlogModal(${index})">
                <img src="${imgUrl}" alt="${post.title}" class="blog-thumbnail" loading="lazy">
                <div class="blog-content">
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <span class="read-more">Read More <i class="fas fa-arrow-right"></i></span>
                </div>
            </article>
        `;
        container.innerHTML += cardHTML;
    });
}

function openBlogModal(index) {
    const post = allBlogPosts[index];
    const overlay = document.getElementById('blogModalOverlay');
    const modalBody = document.getElementById('blogModalBody');

    modalBody.innerHTML = `
        <h2 style="font-family: 'Share Tech Mono', monospace; color: var(--accent-color); margin-bottom: 20px;">${post.title}</h2>
        <div class="blog-post-content" style="color: var(--primary-text-color); max-height: 60vh; overflow-y: auto; padding-right: 10px;">
            ${post.content}
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeBlogModal() {
    const overlay = document.getElementById('blogModalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}
