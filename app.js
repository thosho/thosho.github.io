const designedWebsites = [
    "https://clanfit.in",
    "https://moviestory.vercel.app",
    "https://jampictures.in",
    "https://castling.in",
    "https://janakikanagaraj.github.io/demo/",
    "https://janakikanagaraj.github.io/in/",
    "https://ovor.in",
    "https://tamilreaders.github.io/tamil-library-app/",
    "https://hmsfruits.com"
];

let allBlogPosts = [];

document.addEventListener('DOMContentLoaded', () => {
    // Fetch Portfolio Sites
    fetchPortfolioSites();

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
});

function handleBlogPosts(data) {
    const container = document.getElementById('blog-container');
    const posts = data.feed.entry || [];
    container.innerHTML = ''; // Clear loader

    if (posts.length === 0) {
        container.innerHTML = '<p>No blog posts found.</p>';
        return;
    }

    // Display up to 3 latest posts
    const recentPosts = posts.slice(0, 3);

    recentPosts.forEach((post, index) => {
        const title = post.title.$t;
        
        let link = '#';
        if (post.link) {
            const alternateLink = post.link.find(l => l.rel === 'alternate');
            if (alternateLink) link = alternateLink.href;
        }
        
        const published = new Date(post.published.$t).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Extract image and text snippet from content
        const contentHtml = post.content ? post.content.$t : '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentHtml;
        
        // Find first image
        const imgTag = tempDiv.querySelector('img');
        const thumbnailSrc = imgTag ? imgTag.src : 'https://via.placeholder.com/600x400/1E1E1E/03A9F4?text=Thosho+Tech';

        // Extract text snippet (max 120 chars)
        let snippet = tempDiv.textContent || tempDiv.innerText || '';
        snippet = snippet.trim().substring(0, 120) + (snippet.length > 120 ? '...' : '');

        // Store parsed data for modal
        allBlogPosts.push({
            title: title,
            date: published,
            rawContent: contentHtml,
            link: link
        });

        const cardHTML = `
            <article class="blog-card" onclick="openBlogModal(${index})" style="cursor: pointer;">
                <img src="${thumbnailSrc}" alt="${title}" class="blog-thumbnail" loading="lazy">
                <div class="blog-content">
                    <span class="blog-date"><i class="far fa-calendar-alt"></i> ${published}</span>
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-excerpt">${snippet}</p>
                    <span class="read-more">
                        Read Article <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </article>
        `;
        
        container.innerHTML += cardHTML;
    });
}

function openBlogModal(index) {
    const post = allBlogPosts[index];
    if (!post) return;

    const overlay = document.getElementById('blogModalOverlay');
    const contentBody = document.getElementById('blogModalBody');
    const readMoreBtn = document.getElementById('blogModalReadMore');

    contentBody.innerHTML = `
        <h2 style="margin-top:0; color: var(--accent-color);">${post.title}</h2>
        <p style="color: var(--secondary-text-color); margin-bottom: 20px; font-weight: bold;">
            <i class="far fa-calendar-alt"></i> ${post.date}
        </p>
        <div>
            ${post.rawContent}
        </div>
    `;

    readMoreBtn.href = post.link;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeBlogModal() {
    const overlay = document.getElementById('blogModalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

async function fetchPortfolioSites() {
    const container = document.getElementById('portfolio-container');
    if (!container) return;

    container.innerHTML = ''; // Clear loader

    for (const url of designedWebsites) {
        try {
            const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=true&waitForTimeout=5000`);
            const data = await response.json();
            
            if (data.status === 'success') {
                const meta = data.data;
                const title = meta.title || url;
                const desc = meta.description ? meta.description.substring(0, 120) + '...' : 'Visit the website to learn more.';
                
                // Use screenshot if available, otherwise fallback to image/logo
                let img = 'https://via.placeholder.com/600x400/1E1E1E/03A9F4?text=Website+Preview';
                if (meta.screenshot && meta.screenshot.url) {
                    img = meta.screenshot.url;
                } else if (meta.image && meta.image.url) {
                    img = meta.image.url;
                } else if (meta.logo && meta.logo.url) {
                    img = meta.logo.url;
                }

                const cardHTML = `
                    <article class="blog-card">
                        <img src="${img}" alt="${title}" class="blog-thumbnail" loading="lazy" style="object-fit: cover; object-position: top;">
                        <div class="blog-content">
                            <h3 class="blog-title">${title}</h3>
                            <p class="blog-excerpt">${desc}</p>
                            <a href="${url}" target="_blank" rel="noopener noreferrer" class="read-more">
                                Visit Website <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </article>
                `;
                container.innerHTML += cardHTML;
            }
        } catch (error) {
            console.error('Error fetching preview for:', url, error);
        }
    }
}
