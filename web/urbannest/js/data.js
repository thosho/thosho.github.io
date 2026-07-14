// ============================================================
// UrbanNest — Property Database
// ============================================================
// TO REBRAND: Replace entries below with your own listings.
// Keep the same data shape — all fields are used by the UI.
// ============================================================

const PROPERTIES = [
    {
        id: 'p1',
        title: 'Skyline Penthouse, Worli',
        city: 'Mumbai', neighbourhood: 'Worli Sea Face',
        type: '4 BHK', bedrooms: 4, bathrooms: 5, parking: 2,
        price: '₹ 12.5 Cr', priceVal: 125000000, pricePerSqft: '₹ 39,062',
        area: '3,200 sq.ft.', status: 'Ready to Move',
        tags: ['Premium', 'Sea View'],
        amenities: ['Pool', 'Gym', 'Concierge', 'Spa', 'Terrace', 'EV Charging'],
        developer: 'Lodha Group', rera: 'P51900000012',
        images: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&auto=format&fit=crop'
        ],
        desc: 'Ultra-luxury penthouse commanding panoramic views of the Arabian Sea. Features a private infinity pool, Italian Calacatta marble flooring, Gaggenau kitchen, and a dedicated concierge team. A once-in-a-generation address.',
        lat: 19.0176, lng: 72.8152
    },
    {
        id: 'p2',
        title: 'Luxe Villas, Whitefield',
        city: 'Bangalore', neighbourhood: 'Whitefield',
        type: 'Villa', bedrooms: 5, bathrooms: 6, parking: 3,
        price: '₹ 4.8 Cr', priceVal: 48000000, pricePerSqft: '₹ 10,666',
        area: '4,500 sq.ft.', status: 'Under Construction',
        tags: ['New Launch', 'Smart Home'],
        amenities: ['Pool', 'Gym', 'Garden', 'Solar', 'EV Charging', 'Security'],
        developer: 'Prestige Group', rera: 'PRM/KA/RERA/1251/310',
        images: [
            'images/hero2.jpg',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1613490908592-fd5e16f99e4d?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop'
        ],
        desc: 'A gated community of 40 smart-villas in the heart of Bangalore\'s tech corridor. Each villa features an AI-powered smart home system, private garden, rooftop solar, and a dedicated EV charging bay. Possession: Dec 2025.',
        lat: 12.9698, lng: 77.7499
    },
    {
        id: 'p3',
        title: 'The Crest, DLF Phase 5',
        city: 'Gurgaon', neighbourhood: 'Golf Course Road',
        type: '3 BHK', bedrooms: 3, bathrooms: 3, parking: 2,
        price: '₹ 6.2 Cr', priceVal: 62000000, pricePerSqft: '₹ 22,142',
        area: '2,800 sq.ft.', status: 'Ready to Move',
        tags: ['Luxury', 'Golf View'],
        amenities: ['Pool', 'Gym', 'Concierge', 'Clubhouse', 'Parking', 'Security'],
        developer: 'DLF Ltd.', rera: 'GGM/433/162/2022/90',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=900&auto=format&fit=crop'
        ],
        desc: 'A statement residence with direct views of the DLF Golf & Country Club. Premium Porcelain tile flooring, Häfele modular kitchen, Kohler bathroom fixtures, and central air conditioning throughout. Ready for immediate possession.',
        lat: 28.4458, lng: 77.1022
    },
    {
        id: 'p4',
        title: 'Bandra West Estates',
        city: 'Mumbai', neighbourhood: 'Bandra West',
        type: '2 BHK', bedrooms: 2, bathrooms: 2, parking: 1,
        price: '₹ 3.5 Cr', priceVal: 35000000, pricePerSqft: '₹ 31,818',
        area: '1,100 sq.ft.', status: 'Ready to Move',
        tags: ['Fully Furnished', 'City Heart'],
        amenities: ['Gym', 'Rooftop', 'Security', 'Intercom', 'Power Backup'],
        developer: 'Oberoi Realty', rera: 'P51800000098',
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&auto=format&fit=crop'
        ],
        desc: 'A stunning, move-in ready apartment minutes from Bandstand. Fully furnished with premium appliances, Italian modular kitchen, and two dedicated parking spots. Walk-to-everything lifestyle in Mumbai\'s most coveted address.',
        lat: 19.0596, lng: 72.8295
    },
    {
        id: 'p5',
        title: 'Koramangala Co-Work Hub',
        city: 'Bangalore', neighbourhood: '6th Block, Koramangala',
        type: 'Commercial', bedrooms: 0, bathrooms: 4, parking: 10,
        price: '₹ 85 L', priceVal: 8500000, pricePerSqft: '₹ 5,666',
        area: '1,500 sq.ft.', status: 'Ready to Move',
        tags: ['High ROI', 'Pre-Leased'],
        amenities: ['Parking', 'Security', 'Power Backup', 'CCTV', 'Lift'],
        developer: 'Embassy Group', rera: 'PRM/KA/RERA/1251/210',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop'
        ],
        desc: 'Grade-A commercial space pre-leased to a Fortune 500 MNC at ₹ 95/sq.ft. yielding 9.2% annually. Located in the epicentre of Bangalore\'s startup ecosystem with 100% power backup and basement parking.',
        lat: 12.9350, lng: 77.6244
    },
    {
        id: 'p6',
        title: 'Golf Course Ext. Rowhouse',
        city: 'Gurgaon', neighbourhood: 'Sector 65',
        type: '4 BHK', bedrooms: 4, bathrooms: 4, parking: 2,
        price: '₹ 5.5 Cr', priceVal: 55000000, pricePerSqft: '₹ 14,473',
        area: '3,800 sq.ft.', status: 'Under Construction',
        tags: ['New Launch', 'Aravalli View'],
        amenities: ['Pool', 'Gym', 'Garden', 'Clubhouse', 'EV Charging', 'Security'],
        developer: 'Godrej Properties', rera: 'GGM/433/162/2023/11',
        images: [
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop',
            'images/hero2.jpg'
        ],
        desc: 'Low-density luxury rowhouses offering unobstructed views of the Aravalli hills on one side and the Golf Course Extension on the other. Features a private terrace garden, automated parking, and a dedicated home automation hub.',
        lat: 28.4100, lng: 77.0500
    },
    {
        id: 'p7',
        title: 'One Hiranandani Park, Thane',
        city: 'Mumbai', neighbourhood: 'Hiranandani Estate, Thane',
        type: '3 BHK', bedrooms: 3, bathrooms: 3, parking: 1,
        price: '₹ 2.8 Cr', priceVal: 28000000, pricePerSqft: '₹ 17,500',
        area: '1,600 sq.ft.', status: 'Ready to Move',
        tags: ['Gated Township', 'Green Living'],
        amenities: ['Pool', 'Gym', 'Garden', 'School', 'Hospital', 'Mall'],
        developer: 'Hiranandani Group', rera: 'P51600000147',
        images: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600573472550-8090733a21e0?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop'
        ],
        desc: 'Nestled within Hiranandani\'s iconic township in Thane, this 3BHK offers 40 acres of landscaped greens, a school, hospital, and mall — all within the gates. A true self-sufficient community.',
        lat: 19.2513, lng: 72.9856
    },
    {
        id: 'p8',
        title: 'Sobha City, Sector 108',
        city: 'Gurgaon', neighbourhood: 'Dwarka Expressway',
        type: '2 BHK', bedrooms: 2, bathrooms: 2, parking: 1,
        price: '₹ 1.95 Cr', priceVal: 19500000, pricePerSqft: '₹ 13,000',
        area: '1,500 sq.ft.', status: 'Under Construction',
        tags: ['New Launch', 'Expressway'],
        amenities: ['Pool', 'Gym', 'Clubhouse', 'Jogging Track', 'Security', 'Power Backup'],
        developer: 'Sobha Limited', rera: 'GGM/433/162/2023/88',
        images: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&auto=format&fit=crop'
        ],
        desc: 'A new-age residential community on the booming Dwarka Expressway corridor. Near the upcoming IFFCO Chowk metro extension. Sobha\'s signature quality construction with 94.5% carpet efficiency. Possession Q4 2026.',
        lat: 28.5014, lng: 77.0310
    },
    {
        id: 'p9',
        title: 'Indiranagar Heritage Floors',
        city: 'Bangalore', neighbourhood: 'Indiranagar',
        type: '3 BHK', bedrooms: 3, bathrooms: 3, parking: 2,
        price: '₹ 2.4 Cr', priceVal: 24000000, pricePerSqft: '₹ 20,000',
        area: '1,200 sq.ft.', status: 'Resale',
        tags: ['Resale', 'Prime Location'],
        amenities: ['Terrace', 'Garden', 'Security', 'Intercom', 'Parking'],
        developer: 'Independent Builder', rera: 'PRM/KA/RERA/1251/089',
        images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1597047084897-51e81819a499?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=900&auto=format&fit=crop'
        ],
        desc: 'Premium builder floor in the most sought-after address in Bangalore. Walking distance to 100 Feet Road restaurants, microbreweries, and the MG Road metro. Private terrace garden, independent entry, and no common walls.',
        lat: 12.9716, lng: 77.6412
    },
    {
        id: 'p10',
        title: 'Mahagun Manorialle, Noida',
        city: 'Gurgaon', neighbourhood: 'Sector 128, Noida',
        type: '4 BHK', bedrooms: 4, bathrooms: 5, parking: 2,
        price: '₹ 4.2 Cr', priceVal: 42000000, pricePerSqft: '₹ 15,000',
        area: '2,800 sq.ft.', status: 'Ready to Move',
        tags: ['Sports City', 'Golf View'],
        amenities: ['Golf', 'Pool', 'Gym', 'Tennis', 'Clubhouse', 'Concierge'],
        developer: 'Mahagun Group', rera: 'UPRERAPRJ123456',
        images: [
            'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&auto=format&fit=crop'
        ],
        desc: 'A world-class sports-centric community with a 9-hole golf course, Olympic swimming pool, and 5 sports courts. One of NCR\'s most recognized luxury destinations, offering premium apartments with direct golf course views.',
        lat: 28.5274, lng: 77.3294
    }
];

const CITIES  = ['All', 'Mumbai', 'Bangalore', 'Gurgaon'];
const TYPES   = ['All', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Commercial'];
const STATUSES = ['All', 'Ready to Move', 'Under Construction', 'Resale'];

const AMENITY_ICONS = {
    'Pool':         'fa-water-ladder',
    'Gym':          'fa-dumbbell',
    'Garden':       'fa-leaf',
    'Solar':        'fa-solar-panel',
    'EV Charging':  'fa-charging-station',
    'Security':     'fa-shield-halved',
    'Clubhouse':    'fa-building-columns',
    'Concierge':    'fa-bell-concierge',
    'Spa':          'fa-spa',
    'Terrace':      'fa-umbrella-beach',
    'Parking':      'fa-square-parking',
    'Golf':         'fa-golf-ball-tee',
    'Tennis':       'fa-table-tennis-paddle-ball',
    'Intercom':     'fa-phone',
    'CCTV':         'fa-video',
    'Lift':         'fa-elevator',
    'Power Backup': 'fa-bolt',
    'Jogging Track':'fa-person-running',
    'School':       'fa-school',
    'Hospital':     'fa-hospital',
    'Mall':         'fa-shop',
    'Rooftop':      'fa-city'
};
