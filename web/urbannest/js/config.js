// ============================================================
// UrbanNest — Brand Configuration
// ============================================================
// HOW TO REBRAND:
//   1. Change every value in this file to match your brand.
//   2. Replace /icons/icon-192.png and /icons/icon-512.png.
//   3. Update /js/data.js with your property listings.
//   That's it. No other files need to be touched.
// ============================================================

const BRAND = {
    // ── Core Identity
    name:        'UrbanNest',
    tagName:     ['Urban', 'Nest'],     // Split for logo colouring
    tagline:     "India's Premium Property Platform",
    description: 'Discover verified luxury apartments, villas & commercial spaces in India\'s top cities.',
    year:        2026,
    credit:      'Thosho Tech',

    // ── Contact Details
    phone:       '+91 98765 43210',
    email:       'hello@urbannest.in',
    address:     'DLF Cyber City, Gurgaon, Haryana 122002',

    // ── Social Links
    social: {
        instagram: 'https://instagram.com',
        linkedin:  'https://linkedin.com',
        youtube:   'https://youtube.com',
        twitter:   'https://twitter.com'
    },

    // ── Animated Stats (value = target number, suffix/prefix optional)
    stats: [
        { value: 1200, suffix: '+',   label: 'Verified Listings',     icon: 'fa-building' },
        { value: 2800, prefix: '₹', suffix: ' Cr+', label: 'Property Value Sold', icon: 'fa-indian-rupee-sign' },
        { value: 98,   suffix: '%',   label: 'RERA Compliant',         icon: 'fa-shield-halved' },
        { value: 4.9,  suffix: '★',   label: 'Customer Rating',        icon: 'fa-star' }
    ],

    // ── Testimonials
    testimonials: [
        {
            name:     'Aditya Khanna',
            location: 'Bought 4BHK, Worli, Mumbai',
            avatar:   'https://i.pravatar.cc/80?img=12',
            rating:   5,
            text:     'UrbanNest made finding our dream penthouse effortless. The virtual tours saved us weeks of physical visits. The team\'s transparency and RERA verification gave us complete peace of mind.'
        },
        {
            name:     'Priya Menon',
            location: 'Invested in Villa, Whitefield, Bangalore',
            avatar:   'https://i.pravatar.cc/80?img=47',
            rating:   5,
            text:     'As an NRI investor, I needed a platform I could trust completely. UrbanNest\'s detailed listings, verified documents, and instant agent connect made my investment seamless from Dubai.'
        },
        {
            name:     'Rohit Singhania',
            location: 'Leased Office, Gurgaon',
            avatar:   'https://i.pravatar.cc/80?img=33',
            rating:   5,
            text:     'Found the perfect pre-leased commercial space with excellent yield within 48 hours. The EMI calculator and market insights helped me make an informed decision quickly.'
        }
    ],

    // ── Developer / Builder Partners
    partners: [
        'Godrej Properties', 'DLF', 'Prestige Group',
        'Lodha', 'Sobha', 'Embassy Group',
        'Brigade Group', 'Puravankara', 'Oberoi Realty', 'Mahindra Lifespaces'
    ],

    // ── Theme Colors (also overrides CSS variables)
    colors: {
        gold:    '#C9A84C',
        goldLight: '#E8C97A',
        emerald: '#10B981',
        bg:      '#0D0F14'
    },

    // ── Hero Slideshow (Unsplash URLs — replace with your own)
    heroSlides: [
        {
            url:     'images/hero1.jpg',
            caption: 'Worli, Mumbai'
        },
        {
            url:     'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&auto=format&fit=crop',
            caption: 'Whitefield, Bangalore'
        },
        {
            url:     'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop',
            caption: 'DLF Phase 5, Gurgaon'
        },
        {
            url:     'https://images.unsplash.com/photo-1613490908592-fd5e16f99e4d?w=1600&auto=format&fit=crop',
            caption: 'Koregaon Park, Pune'
        }
    ]
};
