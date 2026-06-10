/* ============================================
 TRAVELNEST — Main JavaScript
 ============================================ */

// localStorage helpers
function saveToStorage(key, value) {
 try { localStorage.setItem(key, JSON.stringify(value)); }
 catch(e) { console.warn('Storage error:', e); }
}
function loadFromStorage(key, fallback) {
 try {
 const v = localStorage.getItem(key);
 return v !== null ? JSON.parse(v) : (fallback !== undefined ? fallback : null);
 } catch(e) { return fallback !== undefined ? fallback : null; }
}

// Toast notification
function showToast(msg) {
 let toast = document.getElementById('global-toast');
 if (!toast) {
 toast = document.createElement('div');
 toast.id = 'global-toast';
 toast.className = 'toast';
 document.body.appendChild(toast);
 }
 toast.textContent = msg;
 toast.classList.add('show');
 clearTimeout(toast._t);
 toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Navbar active link
function initNavbar() {
 const current = location.pathname.split('/').pop() || 'index.html';
 document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(a => {
 if (a.getAttribute('href') === current) a.classList.add('active');
 });
}

// Hamburger menu
function initHamburger() {
 const btn = document.querySelector('.hamburger');
 const menu = document.querySelector('.mobile-menu');
 if (!btn || !menu) return;
 btn.addEventListener('click', () => menu.classList.toggle('open'));
 menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Newsletter form
function initNewsletter() {
 const form = document.querySelector('.newsletter-form');
 if (!form) return;
 form.addEventListener('submit', function(e) {
 e.preventDefault();
 const email = this.querySelector('input').value.trim();
 if (!email) return;
 const list = loadFromStorage('tn_newsletter', []);
 if (!list.includes(email)) { list.push(email); saveToStorage('tn_newsletter', list); }
 showToast('You are subscribed!');
 this.reset();
 });
}

// Destination data
const DESTINATIONS = [
 { id: 1, name: 'Santorini', country: 'Greece', continent: 'Europe', type: 'relaxation', budget: 'high',
 img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80',
 desc: 'A volcanic island in the Cyclades known for white-washed villages, sunsets, and the Aegean Sea.',
 attractions: ['Oia Village', 'Red Beach', 'Akrotiri Ruins', 'Fira Caldera Walk'],
 costs: [{ item: 'Hotel (per night)', low: 80, high: 200 }, { item: 'Meal', low: 15, high: 60 }, { item: 'Boat Tour', low: 30, high: 90 }],
 sounds: 'ocean' },
 { id: 2, name: 'Kyoto', country: 'Japan', continent: 'Asia', type: 'cultural', budget: 'medium',
 img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
 desc: 'Japan\'s ancient imperial capital with thousands of Buddhist temples, Shinto shrines, and traditional culture.',
 attractions: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Gion District', 'Kinkaku-ji'],
 costs: [{ item: 'Ryokan Stay', low: 100, high: 300 }, { item: 'Ramen', low: 8, high: 15 }, { item: 'Day Tour', low: 40, high: 80 }],
 sounds: 'forest' },
 { id: 3, name: 'Patagonia', country: 'Argentina/Chile', continent: 'South America', type: 'adventure', budget: 'medium',
 img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
 desc: 'A vast wilderness at the tip of South America with glaciers, fjords, and dramatic mountain peaks.',
 attractions: ['Torres del Paine Trek', 'Perito Moreno Glacier', 'Fitz Roy Base Camp', 'Los Glaciares Park'],
 costs: [{ item: 'Hostel', low: 20, high: 60 }, { item: 'Guided Trek', low: 80, high: 200 }, { item: 'Gear Rental', low: 30, high: 70 }],
 sounds: 'wind' },
 { id: 4, name: 'Marrakech', country: 'Morocco', continent: 'Africa', type: 'cultural', budget: 'low',
 img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
 desc: 'Morocco\'s Red City with an ancient medina, vibrant souks, ornate palaces, and Djemaa el-Fna square.',
 attractions: ['Djemaa el-Fna Square', 'Majorelle Garden', 'Bahia Palace', 'Medina Souks'],
 costs: [{ item: 'Riad (per night)', low: 40, high: 150 }, { item: 'Street Food', low: 3, high: 10 }, { item: 'Hammam Spa', low: 15, high: 50 }],
 sounds: 'city' },
 { id: 5, name: 'Bali', country: 'Indonesia', continent: 'Asia', type: 'relaxation', budget: 'low',
 img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
 desc: 'The Island of the Gods — rice terraces, volcanic mountains, Hindu temples, and great surf beaches.',
 attractions: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur Sunrise'],
 costs: [{ item: 'Villa (per night)', low: 30, high: 120 }, { item: 'Warung Meal', low: 2, high: 8 }, { item: 'Surf Lesson', low: 20, high: 40 }],
 sounds: 'ocean' },
 { id: 6, name: 'Reykjavik', country: 'Iceland', continent: 'Europe', type: 'adventure', budget: 'high',
 img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80',
 desc: 'Gateway to geysers, waterfalls, black sand beaches, and the Northern Lights in Iceland.',
 attractions: ['Northern Lights', 'Golden Circle Route', 'Blue Lagoon', 'Hallgrímskirkja Church'],
 costs: [{ item: 'Hotel (per night)', low: 150, high: 350 }, { item: 'Restaurant', low: 25, high: 70 }, { item: 'Northern Lights Tour', low: 80, high: 150 }],
 sounds: 'wind' },
 { id: 7, name: 'Serengeti', country: 'Tanzania', continent: 'Africa', type: 'nature', budget: 'high',
 img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',
 desc: 'Home to the Great Migration — over two million animals moving across golden savanna each year.',
 attractions: ['Great Migration Safari', 'Big Five Game Drive', 'Ngorongoro Crater', 'Hot Air Balloon'],
 costs: [{ item: 'Safari Lodge', low: 200, high: 800 }, { item: 'Park Fees (per day)', low: 60, high: 60 }, { item: 'Balloon Safari', low: 450, high: 600 }],
 sounds: 'forest' },
 { id: 8, name: 'New York City', country: 'USA', continent: 'North America', type: 'cultural', budget: 'high',
 img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
 desc: 'The city that never sleeps — skyscrapers, museums, Broadway, and every cuisine on earth.',
 attractions: ['Central Park', 'Metropolitan Museum', 'Times Square', 'Brooklyn Bridge'],
 costs: [{ item: 'Hotel (per night)', low: 150, high: 400 }, { item: 'Broadway Show', low: 80, high: 300 }, { item: 'Food Tour', low: 30, high: 80 }],
 sounds: 'city' },
 { id: 9, name: 'Queenstown', country: 'New Zealand', continent: 'Oceania', type: 'adventure', budget: 'medium',
 img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80',
 desc: 'The adventure capital of the world — bungee jumping, skiing, and stunning Southern Alps scenery.',
 attractions: ['Bungee Jumping', 'Milford Sound Trip', 'Queenstown Hill', 'Skyline Gondola'],
 costs: [{ item: 'Hotel (per night)', low: 80, high: 220 }, { item: 'Bungee Jump', low: 150, high: 200 }, { item: 'Milford Tour', low: 100, high: 180 }],
 sounds: 'wind' },
 { id: 10, name: 'Havana', country: 'Cuba', continent: 'North America', type: 'cultural', budget: 'low',
 img: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=600&q=80',
 desc: 'A living time capsule of colonial buildings, vintage cars, salsa music, and revolutionary history.',
 attractions: ['Old Havana', 'Malecón Boardwalk', 'Fábrica de Arte Cubano', 'Classic Car Tour'],
 costs: [{ item: 'Casa Particular', low: 25, high: 60 }, { item: 'Restaurant Meal', low: 5, high: 20 }, { item: 'Classic Car Hire', low: 30, high: 60 }],
 sounds: 'city' },
];

// Service worker
if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}

// Navbar, hamburger, and newsletter are initialised in components.js
