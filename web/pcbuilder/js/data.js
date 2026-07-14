// ================================================================
//  RIGFORGE v2.0 — Data & Config
// ================================================================

const BRAND = {
    name:      "RigForge",
    tagline:   "Build Your Dream Rig. Pixel by Pixel.",
    currency:  "₹",
    whatsapp:  "919876543210",
    address:   "Shop 14, SP Road, Bengaluru — 560002",
    phone:     "+91 98765 43210",
    email:     "builds@rigforge.in"
};

// ── CATEGORIES ─────────────────────────────────────────────────
const CATEGORIES = [
    { id: "cpu",     name: "Processor (CPU)",   icon: "fa-microchip",  socket: ["am5","lga1700"] },
    { id: "mobo",    name: "Motherboard",        icon: "fa-th",         socket: ["am5","lga1700"] },
    { id: "ram",     name: "Memory (RAM)",       icon: "fa-memory",     socket: null },
    { id: "gpu",     name: "Graphics Card",      icon: "fa-tv",         socket: null },
    { id: "storage", name: "Storage",            icon: "fa-hdd",        socket: null },
    { id: "psu",     name: "Power Supply",       icon: "fa-plug",       socket: null },
    { id: "case",    name: "Cabinet (Case)",     icon: "fa-box",        socket: null }
];

// ── PARTS DATABASE ──────────────────────────────────────────────
const PARTS = {
    cpu: [
        {
            id: "cpu1", name: "AMD Ryzen 5 7600X",
            price: 21500,
            tags: ["6 Cores", "4.7GHz", "AM5", "65W"],
            img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop",
            socket: "am5"
        },
        {
            id: "cpu2", name: "Intel Core i5-13600K",
            price: 28500,
            tags: ["14 Cores", "5.1GHz", "LGA1700", "125W"],
            img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&auto=format&fit=crop",
            socket: "lga1700"
        },
        {
            id: "cpu3", name: "AMD Ryzen 7 7800X3D",
            price: 38000,
            tags: ["8 Cores", "3D V-Cache", "AM5", "Gaming King"],
            img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop",
            socket: "am5"
        },
        {
            id: "cpu4", name: "Intel Core i9-14900K",
            price: 54000,
            tags: ["24 Cores", "6.0GHz", "LGA1700", "Extreme"],
            img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&auto=format&fit=crop",
            socket: "lga1700"
        }
    ],
    mobo: [
        {
            id: "mb1", name: "MSI PRO B650M-A WIFI",
            price: 15500,
            tags: ["AM5", "DDR5", "Wi-Fi 6E", "mATX"],
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop",
            socket: "am5"
        },
        {
            id: "mb2", name: "Gigabyte Z790 AORUS ELITE",
            price: 26000,
            tags: ["LGA1700", "DDR5", "PCIe 5.0", "ATX"],
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop",
            socket: "lga1700"
        },
        {
            id: "mb3", name: "ASUS ROG Crosshair X670E",
            price: 48000,
            tags: ["AM5", "DDR5", "PCIe 5.0", "Premium OC"],
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop",
            socket: "am5"
        }
    ],
    ram: [
        {
            id: "r1", name: "Corsair Vengeance 16GB DDR5",
            price: 4800,
            tags: ["16GB", "DDR5", "5200MHz", "CL40"],
            img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "r2", name: "G.Skill Trident Z5 RGB 32GB",
            price: 11500,
            tags: ["32GB (2×16)", "DDR5", "6000MHz", "RGB"],
            img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "r3", name: "Corsair Dominator 64GB",
            price: 28000,
            tags: ["64GB (2×32)", "DDR5", "6400MHz", "Extreme"],
            img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop",
            socket: null
        }
    ],
    gpu: [
        {
            id: "g0", name: "No Dedicated GPU",
            price: 0,
            tags: ["Integrated Only", "Office/Basic Use"],
            img: null, socket: null
        },
        {
            id: "g1", name: "NVIDIA RTX 4060 8GB",
            price: 29000,
            tags: ["8GB GDDR6", "DLSS 3", "1080p Gaming"],
            img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "g2", name: "AMD RX 7800 XT 16GB",
            price: 52000,
            tags: ["16GB GDDR6", "FSR 3", "1440p Beast"],
            img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "g3", name: "NVIDIA RTX 4070 Ti Super",
            price: 82000,
            tags: ["16GB GDDR6X", "DLSS 3.5", "4K Ready"],
            img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "g4", name: "NVIDIA RTX 4090 24GB",
            price: 185000,
            tags: ["24GB GDDR6X", "DLSS 3.5", "Absolute Beast"],
            img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop",
            socket: null
        }
    ],
    storage: [
        {
            id: "s1", name: "Crucial P3 1TB NVMe PCIe 3.0",
            price: 5500,
            tags: ["1TB", "NVMe", "3500MB/s"],
            img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "s2", name: "WD Black SN850X 1TB PCIe 4.0",
            price: 8500,
            tags: ["1TB", "NVMe", "7300MB/s", "PS5 Compatible"],
            img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "s3", name: "Samsung 990 PRO 2TB PCIe 4.0",
            price: 16500,
            tags: ["2TB", "NVMe", "7450MB/s", "Premium"],
            img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "s4", name: "Seagate Barracuda 4TB HDD",
            price: 7500,
            tags: ["4TB", "HDD", "5400RPM", "Mass Storage"],
            img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop",
            socket: null
        }
    ],
    psu: [
        {
            id: "p1", name: "Deepcool PK650D 650W",
            price: 4200,
            tags: ["650W", "80+ Bronze", "Non-Modular"],
            img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "p2", name: "Corsair RM850e 850W",
            price: 10500,
            tags: ["850W", "80+ Gold", "Full Modular", "ATX 3.0"],
            img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "p3", name: "MSI MEG Ai1300P 1300W",
            price: 26000,
            tags: ["1300W", "80+ Platinum", "PCIe 5.0"],
            img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop",
            socket: null
        }
    ],
    case: [
        {
            id: "ca1", name: "Ant Esports ICE-112G",
            price: 3200,
            tags: ["Mid-Tower", "4 ARGB Fans", "Budget Pick"],
            img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "ca2", name: "Lian Li Lancool 216",
            price: 8500,
            tags: ["Mid-Tower", "High Airflow", "2×160mm Fans"],
            img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "ca3", name: "NZXT H9 Flow",
            price: 15500,
            tags: ["Mid-Tower", "Dual Chamber", "Panoramic Glass"],
            img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&auto=format&fit=crop",
            socket: null
        },
        {
            id: "ca4", name: "Hyte Y60 Premium",
            price: 18500,
            tags: ["Mid-Tower", "Corner Glass", "Vertical GPU"],
            img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&auto=format&fit=crop",
            socket: null
        }
    ]
};

// ── PRESETS ─────────────────────────────────────────────────────
const PRESETS = [
    {
        id: "gamer",
        name: "The Gamer",
        desc: "Dominate 1080p gaming without breaking the bank.",
        img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop",
        tier: "🎮 Gaming",
        tierColor: "#22c55e",
        parts: { cpu:"cpu1", mobo:"mb1", ram:"r2", gpu:"g1", storage:"s2", psu:"p2", case:"ca2" }
    },
    {
        id: "creator",
        name: "The Creator",
        desc: "Render videos, design graphics, and stream—simultaneously.",
        img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop",
        tier: "🎬 Creator",
        tierColor: "#a855f7",
        parts: { cpu:"cpu3", mobo:"mb1", ram:"r2", gpu:"g2", storage:"s3", psu:"p2", case:"ca3" }
    },
    {
        id: "beast",
        name: "The Beast",
        desc: "No compromises. The absolute pinnacle of PC performance.",
        img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600&auto=format&fit=crop",
        tier: "🏆 Extreme",
        tierColor: "#eab308",
        parts: { cpu:"cpu4", mobo:"mb2", ram:"r3", gpu:"g4", storage:"s3", psu:"p3", case:"ca4" }
    }
];

// ── REVIEWS ─────────────────────────────────────────────────────
const REVIEWS = [
    {
        name: "Karan M.",
        initials: "KM",
        build: "The Gamer Build",
        stars: 5,
        text: "Used RigForge to build my first gaming PC. The interface made it super easy to understand what each part does, and the WhatsApp quote got me a response in minutes!"
    },
    {
        name: "Priya S.",
        initials: "PS",
        build: "Creator Build",
        stars: 5,
        text: "As a video editor, I needed specific specs. The compatibility warnings were a lifesaver — I didn't know my chosen CPU and motherboard wouldn't work together!"
    },
    {
        name: "Arjun T.",
        initials: "AT",
        build: "The Beast Build",
        stars: 5,
        text: "Ordered the Beast build for my studio. Assembly was perfect, delivered in 24 hours, and the machine is an absolute monster. 10/10 will recommend!"
    }
];
