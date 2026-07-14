// =============================================================
// BharatYatra — Travel Data Engine
// Curated 2025 pricing benchmarks for Indian destinations
// =============================================================

// ── DESTINATIONS ──────────────────────────────────────────────
const DESTINATIONS = [
    {
        id: 'goa', name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.1240, emoji: '🏖️',
        type: 'beach', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop',
        baseHotel: { budget: 900, standard: 2800, premium: 6500, luxury: 14000 },
        baseFlight: { delhi: 4200, mumbai: 1800, bangalore: 1600, chennai: 2100, kolkata: 5800, hyderabad: 2200 },
        baseTrain: { delhi: 1100, mumbai: 600, bangalore: 450, chennai: 550, kolkata: 1400 },
        avgMeal: { street: 180, restaurant: 400, fine: 1200 },
        avgActivity: 900, bestMonths: [11,12,1,2,3], peakMonths: [12,1],
        desc: 'Sun, sand & seafood on India\'s party coast'
    },
    {
        id: 'kerala', name: 'Kerala', state: 'Kerala', lat: 10.8505, lon: 76.2711, emoji: '🌴',
        type: 'nature', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop',
        baseHotel: { budget: 800, standard: 2200, premium: 5500, luxury: 12000 },
        baseFlight: { delhi: 5500, mumbai: 3200, bangalore: 1900, chennai: 1400, kolkata: 6200, hyderabad: 2800 },
        baseTrain: { delhi: 1600, mumbai: 1100, bangalore: 550, chennai: 400, kolkata: 1800 },
        avgMeal: { street: 150, restaurant: 350, fine: 1000 },
        avgActivity: 1200, bestMonths: [10,11,12,1,2], peakMonths: [12,1],
        desc: 'Backwaters, spices & Ayurveda bliss'
    },
    {
        id: 'rajasthan', name: 'Rajasthan', state: 'Rajasthan', lat: 27.0238, lon: 74.2179, emoji: '🏰',
        type: 'heritage', image: 'https://images.unsplash.com/photo-1599661559886-4f40075d9e5b?w=800&auto=format&fit=crop',
        baseHotel: { budget: 700, standard: 1800, premium: 5000, luxury: 18000 },
        baseFlight: { delhi: 1800, mumbai: 3800, bangalore: 6200, chennai: 7000, kolkata: 5500, hyderabad: 5800 },
        baseTrain: { delhi: 350, mumbai: 700, bangalore: 1400, chennai: 1600, kolkata: 1300 },
        avgMeal: { street: 120, restaurant: 300, fine: 900 },
        avgActivity: 800, bestMonths: [10,11,12,1,2,3], peakMonths: [11,12,1],
        desc: 'Palaces, deserts & royal culture'
    },
    {
        id: 'himachal', name: 'Himachal Pradesh', state: 'HP', lat: 31.1048, lon: 77.1734, emoji: '🏔️',
        type: 'hill', image: 'https://images.unsplash.com/photo-1626714486940-0f37c76bc932?w=800&auto=format&fit=crop',
        baseHotel: { budget: 600, standard: 1500, premium: 3500, luxury: 9000 },
        baseFlight: { delhi: 1200, mumbai: 4200, bangalore: 7000, chennai: 7500, kolkata: 6000, hyderabad: 6500 },
        baseTrain: { delhi: 400, mumbai: 1000, bangalore: 2000, chennai: 2200, kolkata: 1500 },
        avgMeal: { street: 100, restaurant: 250, fine: 700 },
        avgActivity: 600, bestMonths: [3,4,5,6,9,10], peakMonths: [5,6],
        desc: 'Snow peaks, apple orchards & monasteries'
    },
    {
        id: 'andaman', name: 'Andaman Islands', state: 'Andaman', lat: 11.7401, lon: 92.6586, emoji: '🤿',
        type: 'island', image: 'https://images.unsplash.com/photo-1589136151740-1ec78b056157?w=800&auto=format&fit=crop',
        baseHotel: { budget: 1200, standard: 3000, premium: 7000, luxury: 16000 },
        baseFlight: { delhi: 7800, mumbai: 6500, bangalore: 5200, chennai: 4200, kolkata: 5800, hyderabad: 6000 },
        baseTrain: null,
        avgMeal: { street: 200, restaurant: 500, fine: 1400 },
        avgActivity: 2200, bestMonths: [10,11,12,1,2,3,4,5], peakMonths: [12,1,2],
        desc: 'Crystal clear waters & pristine coral reefs'
    },
    {
        id: 'ladakh', name: 'Ladakh', state: 'Ladakh', lat: 34.1526, lon: 77.5771, emoji: '🏕️',
        type: 'adventure', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
        baseHotel: { budget: 800, standard: 1800, premium: 4500, luxury: 11000 },
        baseFlight: { delhi: 4200, mumbai: 8500, bangalore: 10000, chennai: 11000, kolkata: 9000, hyderabad: 9500 },
        baseTrain: null,
        avgMeal: { street: 150, restaurant: 300, fine: 800 },
        avgActivity: 1500, bestMonths: [6,7,8,9], peakMonths: [7,8],
        desc: 'High altitude deserts, monasteries & Pangong'
    },
    {
        id: 'coorg', name: 'Coorg', state: 'Karnataka', lat: 12.3375, lon: 75.8069, emoji: '☕',
        type: 'hill', image: 'https://images.unsplash.com/photo-1610214815250-99435b8004f1?w=800&auto=format&fit=crop',
        baseHotel: { budget: 700, standard: 2000, premium: 5000, luxury: 12000 },
        baseFlight: { delhi: 5800, mumbai: 3200, bangalore: 1400, chennai: 1800, kolkata: 7000, hyderabad: 2500 },
        baseTrain: { delhi: 1600, mumbai: 1000, bangalore: 250, chennai: 550, kolkata: 1800 },
        avgMeal: { street: 120, restaurant: 300, fine: 900 },
        avgActivity: 700, bestMonths: [10,11,12,1,2,3,4,5], peakMonths: [10,11,12],
        desc: 'Coffee estates, waterfalls & mist-covered valleys'
    },
    {
        id: 'varanasi', name: 'Varanasi', state: 'UP', lat: 25.3176, lon: 82.9739, emoji: '🪔',
        type: 'spiritual', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop',
        baseHotel: { budget: 500, standard: 1200, premium: 3000, luxury: 8000 },
        baseFlight: { delhi: 1800, mumbai: 4200, bangalore: 5500, chennai: 5000, kolkata: 2200, hyderabad: 4000 },
        baseTrain: { delhi: 400, mumbai: 900, bangalore: 1400, chennai: 1300, kolkata: 600 },
        avgMeal: { street: 80, restaurant: 200, fine: 600 },
        avgActivity: 400, bestMonths: [10,11,12,1,2,3], peakMonths: [10,11],
        desc: 'Ancient ghats, Ganga aarti & spiritual wisdom'
    },
    {
        id: 'ooty', name: 'Ooty', state: 'Tamil Nadu', lat: 11.4102, lon: 76.6950, emoji: '🌸',
        type: 'hill', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop',
        baseHotel: { budget: 600, standard: 1500, premium: 4000, luxury: 9000 },
        baseFlight: { delhi: 6000, mumbai: 3500, bangalore: 1600, chennai: 1200, kolkata: 7000, hyderabad: 2800 },
        baseTrain: { delhi: 1800, mumbai: 1200, bangalore: 550, chennai: 250, kolkata: 2000 },
        avgMeal: { street: 100, restaurant: 250, fine: 700 },
        avgActivity: 500, bestMonths: [3,4,5,6,10,11,12], peakMonths: [5,6],
        desc: 'Queen of hill stations with lush tea gardens'
    },
    {
        id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, emoji: '🌹',
        type: 'heritage', image: 'https://images.unsplash.com/photo-1583091928373-c8d1bb48293e?w=800&auto=format&fit=crop',
        baseHotel: { budget: 600, standard: 1600, premium: 4000, luxury: 15000 },
        baseFlight: { delhi: 1400, mumbai: 3200, bangalore: 5500, chennai: 6500, kolkata: 5000, hyderabad: 5200 },
        baseTrain: { delhi: 280, mumbai: 650, bangalore: 1300, chennai: 1500, kolkata: 1200 },
        avgMeal: { street: 100, restaurant: 280, fine: 800 },
        avgActivity: 600, bestMonths: [10,11,12,1,2,3], peakMonths: [11,12],
        desc: 'The Pink City of forts, palaces and bazaars'
    }
];

// ── SOURCE CITIES ──────────────────────────────────────────────
const SOURCE_CITIES = [
    { id: 'delhi', name: 'Delhi / NCR', code: 'DEL' },
    { id: 'mumbai', name: 'Mumbai', code: 'BOM' },
    { id: 'bangalore', name: 'Bengaluru', code: 'BLR' },
    { id: 'chennai', name: 'Chennai', code: 'MAA' },
    { id: 'kolkata', name: 'Kolkata', code: 'CCU' },
    { id: 'hyderabad', name: 'Hyderabad', code: 'HYD' }
];

// ── AIRLINE DEALS ──────────────────────────────────────────────
const AIRLINE_DEALS = [
    {
        airline: 'IndiGo', logo: '✈️', discount: '25% OFF', code: 'INDIGO25',
        desc: 'On domestic routes, 45+ days ahead booking', validity: 'Aug 31, 2025',
        minFare: '₹999', saved: '₹800 avg/ticket', color: '#073590'
    },
    {
        airline: 'Air India', logo: '🛫', discount: '20% OFF', code: 'AIFLYSALE',
        desc: 'International & domestic, select routes', validity: 'Sep 15, 2025',
        minFare: '₹1,499', saved: '₹1,200 avg/ticket', color: '#c8102e'
    },
    {
        airline: 'SpiceJet', logo: '🌶️', discount: 'Rs.999 Flash', code: 'SPICE999',
        desc: 'Monday-Tuesday flash sale on 50+ routes', validity: 'Every Monday',
        minFare: '₹999 all-in', saved: 'Up to ₹2,000', color: '#e55c19'
    },
    {
        airline: 'Akasa Air', logo: '☀️', discount: '15% OFF', code: 'AKASANEW',
        desc: 'New routes launch offer, book early', validity: 'Oct 1, 2025',
        minFare: '₹1,299', saved: '₹600 avg/ticket', color: '#ff6a00'
    }
];

// ── HOTEL DEALS ──────────────────────────────────────────────
const HOTEL_DEALS = [
    {
        brand: 'OYO Hotels', logo: '🏨', discount: '40% OFF', code: 'OYO40NOW',
        desc: 'On budget & standard properties pan-India', validity: 'Sep 30, 2025',
        from: '₹499/night', saved: '₹340 avg/night', color: '#ee2e24'
    },
    {
        brand: 'Treebo Hotels', logo: '🌳', discount: '30% OFF', code: 'TREEBO30',
        desc: 'Weekday bookings on premium properties', validity: 'Aug 31, 2025',
        from: '₹1,299/night', saved: '₹550 avg/night', color: '#00c853'
    },
    {
        brand: 'FabHotels', logo: '⭐', discount: '35% OFF', code: 'FABDEAL35',
        desc: 'All properties, 3+ nights stay', validity: 'Rolling offer',
        from: '₹799/night', saved: '₹430 avg/night', color: '#6200ea'
    },
    {
        brand: 'MakeMyTrip', logo: '🗺️', discount: 'Extra 12%', code: 'MMTHOTEL',
        desc: 'On top of hotel price using HDFC/ICICI card', validity: 'Ongoing',
        from: 'Variable', saved: '₹200-800/night', color: '#e91e63'
    }
];

// ── PACKAGES ──────────────────────────────────────────────────
const PACKAGES = [
    {
        name: 'Goa Weekend Escape', nights: 3, from: 'Multiple cities', operator: 'IRCTC Tourism',
        price: 8999, originalPrice: 12500, includes: ['Hotel', 'Transfers', 'Sightseeing', 'Breakfast'],
        image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&auto=format&fit=crop',
        badge: 'Best Seller'
    },
    {
        name: 'Kerala Backwaters Dream', nights: 5, from: 'Pan India', operator: 'Thomas Cook India',
        price: 19999, originalPrice: 28000, includes: ['Houseboat Stay', 'Flights', 'All Meals', 'Spa'],
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop',
        badge: 'Top Pick'
    },
    {
        name: 'Rajasthan Royal Circuit', nights: 7, from: 'Delhi/Mumbai', operator: 'Cox & Kings',
        price: 24999, originalPrice: 35000, includes: ['Heritage Hotels', 'AC Vehicle', 'Guide', 'Breakfast'],
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop',
        badge: 'Heritage'
    },
    {
        name: 'Ladakh Adventure Camp', nights: 6, from: 'Delhi', operator: 'Club Mahindra',
        price: 29999, originalPrice: 42000, includes: ['Camp Stay', 'Flights', 'All Meals', 'Trekking'],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop',
        badge: 'Adventure'
    }
];

// ── ACTIVITIES ─────────────────────────────────────────────────
const ACTIVITY_CATEGORIES = [
    { id: 'adventure', label: 'Adventure Sports', icon: '🧗', daily: 2500 },
    { id: 'sightseeing', label: 'Sightseeing', icon: '🗺️', daily: 600 },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', daily: 1500 },
    { id: 'spa', label: 'Wellness & Spa', icon: '💆', daily: 3000 },
    { id: 'nightlife', label: 'Nightlife', icon: '🎶', daily: 2000 },
    { id: 'local', label: 'Local Experiences', icon: '🎭', daily: 800 }
];

// ── SEASON MULTIPLIERS ─────────────────────────────────────────
const SEASON_MULTIPLIERS = {
    peak: 1.6, shoulder: 1.0, off: 0.75
};

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getSeasonMultiplier(destination, month) {
    if (!destination) return 1;
    if (destination.peakMonths?.includes(month)) return SEASON_MULTIPLIERS.peak;
    if (destination.bestMonths?.includes(month)) return SEASON_MULTIPLIERS.shoulder;
    return SEASON_MULTIPLIERS.off;
}

window.YATRA = {
    DESTINATIONS, SOURCE_CITIES, AIRLINE_DEALS, HOTEL_DEALS, PACKAGES,
    ACTIVITY_CATEGORIES, MONTH_NAMES, getSeasonMultiplier
};
