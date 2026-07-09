// Main JS for showcase portal
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    
    // Add background on scroll for nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
        } else {
            nav.classList.remove('shadow-lg');
            nav.style.background = 'rgba(15, 23, 42, 0.4)';
        }
    });
});
