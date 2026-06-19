document.addEventListener('DOMContentLoaded', () => {
    // Add JSONP script for Blogger feed
    const script = document.createElement('script');
    script.src = 'https://thosho.blogspot.com/feeds/posts/default?alt=json-in-script&callback=handleBlogPosts';
    document.body.appendChild(script);
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

    recentPosts.forEach(post => {
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

        const cardHTML = `
            <article class="blog-card">
                <img src="${thumbnailSrc}" alt="${title}" class="blog-thumbnail" loading="lazy">
                <div class="blog-content">
                    <span class="blog-date"><i class="far fa-calendar-alt"></i> ${published}</span>
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-excerpt">${snippet}</p>
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="read-more">
                        Read Article <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
        
        container.innerHTML += cardHTML;
    });
}
