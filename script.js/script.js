/* =========================================
   1. GLOBAL CONFIG & SETTINGS
   ========================================= */

// --- CONTROL CENTER: TRENDING COUNTRIES ---
// These names must match the <h3> text in destinations.html EXACTLY
const trendingCountries = [
    "United States", 
    "Europe", 
    "Turkey", 
    "Japan"
];

// WHATSAPP NUMBER
const waNumber = "17184729093"; 

document.addEventListener("DOMContentLoaded", function() {
    // 1. Init WhatsApp
    const waBtn = document.getElementById('wa-btn');
    if(waBtn) waBtn.href = `https://wa.me/${waNumber}`;
    
    // 2. Init Date Picker (Checkout)
    const dateInput = document.getElementById('travelDate');
    if(dateInput) { dateInput.min = new Date().toISOString().split("T")[0]; }
    
    // 3. Init Ticker
    if(typeof updateTicker === "function") {
        updateTicker();
        setInterval(updateTicker, 60000);
    }

    // 4. Init Destinations Filter (If on destinations page)
    if (window.location.pathname.includes('destinations.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region');
        const search = urlParams.get('q');

        // If URL has region, use it. Otherwise default to 'all' (Trending)
        if (region) { runFilter(region); } 
        else { runFilter('all'); }

        // If URL has search term, run search
        if (search) { 
            const searchInput = document.getElementById('searchInput');
            if(searchInput) {
                searchInput.value = search; 
                filterDestinations(); 
            }
        }
    }
});


/* =========================================
   2. NAVIGATION & LINKS
   ========================================= */

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

function searchFromHome() {
    const query = document.getElementById('homeSearch').value.trim();
    if(query) { 
        window.location.href = `destinations.html?q=${encodeURIComponent(query)}`; 
    } else { 
        window.location.href = 'destinations.html'; 
    }
}

function scrollToTop() { 
    window.scrollTo({top: 0, behavior: 'smooth'}); 
    if(document.getElementById('searchInput')) {
        document.getElementById('searchInput').focus(); 
    }
}

function goToCheckout(name, price, flag) {
    const url = `checkout.html?country=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&flag=${encodeURIComponent(flag)}`;
    window.location.href = url;
}


/* =========================================
   3. DESTINATIONS PAGE LOGIC
   ========================================= */

function runFilter(region) {
    let cards = document.getElementsByClassName('card');
    let btns = document.getElementsByClassName('filter-btn');

    // 1. Visual Update for Buttons
    // Check if triggered by click
    if(event && event.type === 'click') {
        for (let b of btns) { b.classList.remove('active'); }
        event.target.classList.add('active');
    } else {
        // Triggered by Page Load
        for (let b of btns) {
            if((region === 'all' && b.innerText.includes('Trending')) || b.innerText.includes(region)) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        }
    }

    // 2. Filter Cards
    for (let i = 0; i < cards.length; i++) {
        // Always show the Search Banner
        if (cards[i].classList.contains('search-card-style')) {
            cards[i].style.display = "";
            continue;
        }

        let cardRegion = cards[i].getAttribute('data-region');
        
        // Get name to check against Trending List
        let h3Text = cards[i].querySelector('h3').innerText;
        // Clean name (remove " (Regional)" if present)
        let countryName = h3Text.split(' (')[0].trim();

        if (region === 'all') {
            // TRENDING LOGIC: Only show if name is in the list
            if (trendingCountries.includes(countryName)) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        } 
        else if (cardRegion === region) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Master List for Search Fallback
const globalData = [
    { name: "Argentina", flag: "🇦🇷", price: "7.50", region: "Americas" },
    { name: "Brazil", flag: "🇧🇷", price: "8.00", region: "Americas" },
    { name: "Canada", flag: "🇨🇦", price: "6.00", region: "Americas" },
    { name: "China", flag: "🇨🇳", price: "7.00", region: "Asia" },
    { name: "Colombia", flag: "🇨🇴", price: "7.00", region: "Americas" },
    { name: "Egypt", flag: "🇪🇬", price: "6.50", region: "Middle East" },
    { name: "France", flag: "🇫🇷", price: "4.50", region: "Europe" },
    { name: "Germany", flag: "🇩🇪", price: "4.50", region: "Europe" },
    { name: "India", flag: "🇮🇳", price: "6.00", region: "Asia" },
    { name: "Indonesia", flag: "🇮🇩", price: "5.50", region: "Asia" },
    { name: "Italy", flag: "🇮🇹", price: "4.50", region: "Europe" },
    { name: "Kuwait", flag: "🇰🇼", price: "7.50", region: "Middle East" },
    { name: "Mexico", flag: "🇲🇽", price: "6.00", region: "Americas" },
    { name: "Morocco", flag: "🇲🇦", price: "8.00", region: "Africa" },
    { name: "Oman", flag: "🇴🇲", price: "7.00", region: "Middle East" },
    { name: "Peru", flag: "🇵🇪", price: "7.00", region: "Americas" },
    { name: "Qatar", flag: "🇶🇦", price: "7.00", region: "Middle East" },
    { name: "South Korea", flag: "🇰🇷", price: "6.50", region: "Asia" },
    { name: "Spain", flag: "🇪🇸", price: "4.50", region: "Europe" },
    { name: "Thailand", flag: "🇹🇭", price: "6.00", region: "Asia" },
    { name: "UAE", flag: "🇦🇪", price: "7.50", region: "Middle East" },
    { name: "Vietnam", flag: "🇻🇳", price: "5.00", region: "Asia" },
    { name: "Zimbabwe", flag: "🇿🇼", price: "9.50", region: "Africa" }
];

function filterDestinations() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const cards = document.getElementsByClassName('card');
    const grid = document.getElementById('destGrid');
    let foundInCards = false;

    const existingDynamic = document.getElementById('dynamic-result');
    if (existingDynamic) existingDynamic.remove();

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains('search-card-style')) continue;
        
        let title = cards[i].getElementsByTagName('h3')[0];
        if (title.innerText.toLowerCase().indexOf(input) > -1) {
            cards[i].style.display = "";
            foundInCards = true;
        } else {
            cards[i].style.display = "none";
        }
    }
    
    // Check Master DB if not found in cards
    if (!foundInCards && input.length > 2) {
        const match = globalData.find(item => item.name.toLowerCase().includes(input));
        if (match) {
            const newCard = document.createElement('div');
            newCard.id = 'dynamic-result';
            newCard.className = 'card bg-dynamic';
            
            // Build the card HTML
            newCard.innerHTML = `
                <div class="card-overlay">
                    <span class="flag" style="font-size:4rem; display:block; margin:0 auto 15px;">${match.flag}</span>
                    <h3>${match.name}</h3>
                    <span class="card-price">From $${match.price}</span>
                    <div style="margin-top:10px; color:#FF9500; font-size:0.8rem; font-weight:600;">Click to Buy →</div>
                </div>
            `;
            
            newCard.onclick = function() { 
                goToCheckout(match.name, match.price, match.flag); 
            };
            
            grid.prepend(newCard);
            
            // Hide search banner when searching
            document.getElementById('worldBanner').style.display = 'none';
        }
    } else {
         document.getElementById('worldBanner').style.display = 'flex';
    }
}


/* =========================================
   4. DEVICE CHECKER
   ========================================= */
const compatibleDevices = ["iphone xr", "iphone xs", "iphone 11", "iphone 12", "iphone 13", "iphone 14", "iphone 15", "iphone 16", "iphone se", "samsung s20", "samsung s21", "samsung s22", "samsung s23", "samsung s24", "pixel 3", "pixel 4", "pixel 5", "pixel 6", "pixel 7", "pixel 8"];

function checkDevice() {
    const input = document.getElementById('deviceInput').value.toLowerCase();
    const resultDiv = document.getElementById('result-area');
    
    if(input.length < 3) return;

    const isCompatible = compatibleDevices.some(device => input.includes(device));
    
    resultDiv.style.display = 'block';
    if (isCompatible) {
        resultDiv.className = 'result-yes';
        resultDiv.innerHTML = `✅ Great news! Your device is compatible. <br><a href="destinations.html" style="display:inline-block; margin-top:10px; background:#0F3D3E; color:white; padding:10px 24px; border-radius:50px; text-decoration:none; font-weight:700;">Shop Data Plans</a>`;
    } else {
        resultDiv.className = 'result-no';
        resultDiv.innerHTML = `⚠️ We couldn't confirm this device. <a href="support.html" style="text-decoration:underline;">Contact Support</a>`;
    }
}


/* =========================================
   5. GLOBAL PULSE TICKER
   ========================================= */
const cities = [
    { name: "Mecca", flag: "🇸🇦", tz: "Asia/Riyadh", net: "STC 5G", weather: "32°C 🌙" },
    { name: "New York", flag: "🇺🇸", tz: "America/New_York", net: "T-Mobile 5G", weather: "18°C ☀️" },
    { name: "London", flag: "🇬🇧", tz: "Europe/London", net: "EE 5G", weather: "14°C 🌧️" },
    { name: "Cairo", flag: "🇪🇬", tz: "Africa/Cairo", net: "Vodafone 4G", weather: "29°C ☀️" },
    { name: "Dubai", flag: "🇦🇪", tz: "Asia/Dubai", net: "Du 5G Ultra", weather: "30°C ☀️" },
    { name: "Tokyo", flag: "🇯🇵", tz: "Asia/Tokyo", net: "SoftBank 5G", weather: "22°C ☁️" },
    { name: "Cartagena", flag: "🇨🇴", tz: "America/Bogota", net: "Claro 4G", weather: "28°C 🏖️" },
    { name: "Punta Cana", flag: "🇩🇴", tz: "America/Santo_Domingo", net: "Altice 4G", weather: "29°C ☀️" },
    { name: "Mexico City", flag: "🇲🇽", tz: "America/Mexico_City", net: "Telcel 5G", weather: "24°C ⛅" },
    { name: "Paris", flag: "🇫🇷", tz: "Europe/Paris", net: "Orange 5G", weather: "16°C ⛅" }
];

function updateTicker() {
    const container = document.getElementById('ticker-content');
    if(!container) return;
    
    let html = "";
    cities.forEach(city => {
        const time = new Date().toLocaleTimeString("en-US", { timeZone: city.tz, hour: '2-digit', minute: '2-digit', hour12: false });
        html += `<div class="ticker-item">${city.flag} <strong>${city.name}</strong>: ${time} <span class="t-sep">|</span> ${city.weather} <span class="t-sep">|</span> <span class="ticker-dot"></span> Connected to ${city.net}</div>`;
    });
    // Duplicate list for infinite scroll effect
    container.innerHTML = html + html; 
}


/* =========================================
   6. CHECKOUT & DASHBOARD
   ========================================= */

if (window.location.pathname.includes('checkout.html')) {
    window.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const country = urlParams.get('country');
        const price = urlParams.get('price');
        const flag = urlParams.get('flag');

        if (country && price) {
            document.getElementById('sum-name').innerText = country + " Travel eSIM";
            document.getElementById('sum-flag').innerText = flag ? flag : "🌍";
            let cleanPrice = price.replace('$','');
            document.getElementById('sum-sub').innerText = "$" + cleanPrice;
            document.getElementById('sum-total').innerText = "$" + cleanPrice;
            document.getElementById('pay-btn').innerText = "Pay $" + cleanPrice;
        }
    };
}


function simulatePayment() {
    const btn = document.querySelector('.pay-btn');
    if(btn) {
        btn.innerText = "Processing...";
        btn.style.opacity = "0.7";
        setTimeout(() => {
            window.location.href = "success.html";
        }, 1500);
    }
}

// DASHBOARD MOCK
const mockDatabase = {
    "NL-100": { status: "Active", planName: "Europe Regional Plan", dataTotal: 10, dataLeft: 7.5, expiry: "Feb 28, 2026", color: "#10B981" },
    "NL-300": { status: "Expired", planName: "Turkey Holiday", dataTotal: 3, dataLeft: 0, expiry: "Dec 10, 2025", color: "#EF4444" }
};

function showDashboard() {
    const orderInput = document.querySelector('input[type="text"]').value;
    const data = mockDatabase[orderInput];
    if (data) {
        document.querySelector('.plan-name').innerHTML = `<strong>${data.planName}</strong><br>Order #${orderInput}`;
        document.querySelector('.big-data').textContent = data.dataLeft;
        document.querySelector('.total-data').textContent = `GB left of ${data.dataTotal} GB`;
        const badge = document.querySelector('.status-badge');
        badge.innerHTML = `<span class="pulse-dot" style="background:${data.color}"></span> ${data.status}`;
        badge.style.color = data.color; badge.style.borderColor = data.color;
        const percentage = (data.dataLeft / data.dataTotal) * 100;
        document.querySelector('.progress-bar').style.width = percentage + "%";
        document.querySelector('.progress-bar').style.backgroundColor = data.color;
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'block';
    } else {
        alert("❌ Order ID not found. Try NL-100");
    }
}

function toggleQR() {
    const qrBox = document.getElementById('qr-display');
    if(qrBox) qrBox.style.display = (qrBox.style.display === 'block') ? 'none' : 'block';
}

function subscribeUser(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = 'Subscribing...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
        btn.style.backgroundColor = '#10B981';
        btn.style.color = 'white';
        btn.innerHTML = '<i class="fas fa-check"></i> You are in!';
    }, 1500);
    // MASTER PLAN DATABASE (Add this to your checkout.js or separate file)
const planDatabase = {
    
    /* ====================
       GLOBAL PLANS
    ==================== */
    'Global': {
        plans: [
            { name: 'Global Basic', price: 9.99, data: '1GB', days: 7 },
            { name: 'Global Standard', price: 19.99, data: '3GB', days: 15 },
            { name: 'Global Premium', price: 39.99, data: '10GB', days: 30 },
            { name: 'Global Unlimited', price: 59.99, data: 'Unlimited', days: 30 }
        ],
        description: 'Works in 190+ countries',
        popular: true
    },
    
    /* ====================
       USA PLANS
    ==================== */
    'United States': {
        flag: '🇺🇸',
        plans: [
            { name: 'USA 1GB', price: 4.50, data: '1GB', days: 7 },
            { name: 'USA 3GB', price: 8.99, data: '3GB', days: 7 },
            { name: 'USA 5GB', price: 12.99, data: '5GB', days: 15 },
            { name: 'USA 10GB', price: 19.99, data: '10GB', days: 30 },
            { name: 'USA Unlimited', price: 29.99, data: 'Unlimited', days: 30 }
        ],
        description: 'T-Mobile, AT&T, Verizon 5G',
        networks: ['T-Mobile 5G', 'AT&T 5G', 'Verizon 5G'],
        popular: true
    },
    
    /* ====================
       EUROPE REGIONAL PLANS
    ==================== */
    'Europe': {
        flag: '🇪🇺',
        plans: [
            { name: 'Europe 1GB', price: 5.00, data: '1GB', days: 7 },
            { name: 'Europe 3GB', price: 9.99, data: '3GB', days: 7 },
            { name: 'Europe 5GB', price: 14.99, data: '5GB', days: 15 },
            { name: 'Europe 10GB', price: 24.99, data: '10GB', days: 30 },
            { name: 'Europe Unlimited', price: 34.99, data: 'Unlimited', days: 30 }
        ],
        description: '42 European countries',
        countries: ['France', 'Germany', 'Italy', 'Spain', 'UK', 'etc...'],
        popular: true
    },
    
    /* ====================
       SAUDI ARABIA PLANS
    ==================== */
    'Saudi Arabia': {
        flag: '🇸🇦',
        plans: [
            { name: 'KSA 1GB', price: 5.50, data: '1GB', days: 7 },
            { name: 'KSA 3GB', price: 9.99, data: '3GB', days: 7 },
            { name: 'KSA 5GB', price: 14.99, data: '5GB', days: 15 },
            { name: 'KSA 10GB', price: 21.99, data: '10GB', days: 30 },
            { name: 'KSA Unlimited', price: 29.99, data: 'Unlimited', days: 30 }
        ],
        description: 'STC, Mobily, Zain networks',
        networks: ['STC 5G', 'Mobily 4G+', 'Zain 5G'],
        umrahSpecial: true
    },
    
    /* ====================
       TURKEY PLANS
    ==================== */
    'Turkey': {
        flag: '🇹🇷',
        plans: [
            { name: 'Turkey 1GB', price: 4.50, data: '1GB', days: 7 },
            { name: 'Turkey 3GB', price: 8.50, data: '3GB', days: 7 },
            { name: 'Turkey 5GB', price: 12.99, data: '5GB', days: 15 },
            { name: 'Turkey 10GB', price: 18.99, data: '10GB', days: 30 }
        ],
        description: 'Turkcell, Vodafone TR, Türk Telekom',
        networks: ['Turkcell 5G', 'Vodafone TR', 'Türk Telekom']
    },
    
    /* ====================
       UAE PLANS
    ==================== */
    'UAE': {
        flag: '🇦🇪',
        plans: [
            { name: 'UAE 1GB', price: 7.50, data: '1GB', days: 7 },
            { name: 'UAE 3GB', price: 14.99, data: '3GB', days: 7 },
            { name: 'UAE 5GB', price: 19.99, data: '5GB', days: 15 },
            { name: 'UAE 10GB', price: 29.99, data: '10GB', days: 30 },
            { name: 'UAE Unlimited', price: 39.99, data: 'Unlimited', days: 30 }
        ],
        description: 'Du, Etisalat 5G Ultra',
        networks: ['Etisalat 5G', 'Du 5G'],
        popular: true
    },
    
    /* ====================
       JAPAN PLANS
    ==================== */
    'Japan': {
        flag: '🇯🇵',
        plans: [
            { name: 'Japan 1GB', price: 6.00, data: '1GB', days: 7 },
            { name: 'Japan 3GB', price: 11.99, data: '3GB', days: 7 },
            { name: 'Japan 5GB', price: 17.99, data: '5GB', days: 15 },
            { name: 'Japan 10GB', price: 24.99, data: '10GB', days: 30 }
        ],
        description: 'SoftBank, NTT Docomo, KDDI',
        networks: ['SoftBank 5G', 'NTT Docomo', 'KDDI au']
    }
    
    // Add more countries as needed...
};
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');
    const price = urlParams.get('price');
    const plan = urlParams.get('plan');
    const data = urlParams.get('data');  // New: 10GB
    const days = urlParams.get('days');  // New: 30
    
    if (country && price) {
        // Get country data
        const countryData = planDatabase[country];
        
        // Update display
        document.getElementById('sum-name').innerText = plan;
        document.getElementById('sum-flag').innerText = countryData.flag || '🌍';
        
        // Show data and duration
        const description = `${data || 'High-speed'} • ${days || 'Flexible'} days`;
        document.getElementById('sum-description').innerText = description;
        
        // Update price
        let cleanPrice = price.replace('$','');
        document.getElementById('sum-sub').innerText = "$" + cleanPrice;
        document.getElementById('sum-total').innerText = "$" + cleanPrice;
        document.getElementById('pay-btn').innerText = "Pay $" + cleanPrice;
        
        // Show networks if available
        if (countryData.networks) {
            document.getElementById('network-info').innerHTML = `
                <div style="margin-top:10px; font-size:0.85rem; color:#666;">
                    <i class="fas fa-wifi"></i> ${countryData.networks.join(', ')}
                </div>
            `;
        }
    }
};// noorlink-integration.js
class NoorLinkIntegration {
    constructor() {
        this.API_BASE_URL = 'https://api.noorlink.co';
        this.isConnected = false;
    }

    async testConnection() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/health`);
            const data = await response.json();
            this.isConnected = response.ok;
            console.log('✅ Backend connected:', data);
            return data;
        } catch (error) {
            console.error('❌ Cannot connect to backend:', error);
            return null;
        }
    }

    // eSIM Order Lookup
    async lookupOrder(email, orderId) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/orders/lookup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, order_id: orderId })
            });
            
            if (!response.ok) {
                throw new Error(`Order lookup failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Order lookup error:', error);
            return null;
        }
    }

    // Create a simple eSIM management modal
    createESIMManager() {
        const modalHTML = `
            <div id="esim-manager-modal" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); display: none; z-index: 1000;
                align-items: center; justify-content: center;
            ">
                <div style="
                    background: white; padding: 30px; border-radius: 16px;
                    width: 90%; max-width: 500px; position: relative;
                ">
                    <button onclick="this.parentElement.parentElement.style.display='none'" 
                            style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer;">
                        ×
                    </button>
                    
                    <h2 style="color: #0F3D3E; margin-bottom: 20px;">Manage Your eSIM</h2>
                    
                    <div id="esim-login-form">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
                            <input type="email" id="esim-email" placeholder="your@email.com" 
                                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Order ID</label>
                            <input type="text" id="esim-order-id" placeholder="NL-123456" 
                                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                        </div>
                        
                        <button onclick="noorlinkESIM.lookupUserOrder()" 
                                style="background: #0F3D3E; color: white; width: 100%; padding: 14px; 
                                       border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            View My eSIM
                        </button>
                    </div>
                    
                    <div id="esim-dashboard" style="display: none;">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    async lookupUserOrder() {
        const email = document.getElementById('esim-email').value;
        const orderId = document.getElementById('esim-order-id').value;
        
        const orderData = await this.lookupOrder(email, orderId);
        
        if (orderData) {
            this.displayESIMDashboard(orderData);
        } else {
            alert('Order not found. Please check your email and Order ID.');
        }
    }

    displayESIMDashboard(orderData) {
        const dashboardHTML = `
            <div style="margin-top: 20px;">
                <div style="background: linear-gradient(135deg, #0F3D3E 0%, #062223 100%); 
                            color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 12px;">
                            ${orderData.status || 'Active'}
                        </span>
                        <small>Exp: ${orderData.expiry_date || '2026-02-28'}</small>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 36px; font-weight: 800;">${orderData.data_left || '7.5'}</div>
                        <div style="opacity: 0.8;">GB left of ${orderData.data_total || '10'} GB</div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.2); height: 6px; border-radius: 3px; overflow: hidden;">
                        <div style="background: #FFAD5A; height: 100%; width: ${((orderData.data_left || 7.5) / (orderData.data_total || 10)) * 100}%"></div>
                    </div>
                    
                    <div style="margin-top: 15px; font-size: 14px;">
                        <strong>${orderData.plan_name || 'Europe Regional Plan'}</strong><br>
                        Order #${orderData.order_id || 'NL-882910'}
                    </div>
                </div>
                
                <div style="display: grid; gap: 10px;">
                    <button onclick="noorlinkESIM.showQRCode()" 
                            style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; 
                                   border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                        <span style="background: #E0F2F1; color: #0F3D3E; width: 32px; height: 32px; 
                                     border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                            📱
                        </span>
                        Show eSIM QR Code
                    </button>
                    
                    <button onclick="noorlinkESIM.downloadReceipt()" 
                            style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; 
                                   border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                        <span style="background: #E0F2F1; color: #0F3D3E; width: 32px; height: 32px; 
                                     border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                            📄
                        </span>
                        Download Receipt
                    </button>
                    
                    <button onclick="noorlinkESIM.topUpData()" 
                            style="background: #FFAD5A; color: #0F3D3E; padding: 14px; 
                                   border: none; border-radius: 8px; font-weight: 800; cursor: pointer; margin-top: 10px;">
                        Top Up Data (+1GB)
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('esim-login-form').style.display = 'none';
        document.getElementById('esim-dashboard').innerHTML = dashboardHTML;
        document.getElementById('esim-dashboard').style.display = 'block';
    }

    showQRCode() {
        alert('QR Code functionality would connect to: https://api.noorlink.co/esim/qr/{order_id}');
    }

    downloadReceipt() {
        alert('Receipt download would connect to: https://api.noorlink.co/orders/{order_id}/receipt');
    }

    topUpData() {
        const gb = prompt('How many GB would you like to add?', '1');
        if (gb) {
            alert(`Topping up ${gb}GB via API: https://api.noorlink.co/orders/{order_id}/topup`);
        }
    }

    // Initialize
    init() {
        this.createESIMManager();
        this.testConnection();
        
        // Add global access
        window.noorlinkESIM = this;
        
        console.log('NoorLink eSIM Manager initialized');
    }
}

// Start integration when page loads
document.addEventListener('DOMContentLoaded', () => {
    const integration = new NoorLinkIntegration();
    integration.init();
});

}