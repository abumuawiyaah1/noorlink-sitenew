// destinations-integration.js
// For the destinations.html page

class DestinationsPage {
  constructor() {
    this.countryCode = this.getCountryFromURL();
    this.region = this.getRegionFromURL();
    this.initializePage();
  }

  getCountryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('country');
  }

  getRegionFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('region');
  }

  initializePage() {
    if (this.countryCode) {
      this.displayCountryPlans(this.countryCode);
    } else if (this.region) {
      this.displayRegionalCountries(this.region);
    } else {
      this.displayAllCountries();
    }
  }

  displayCountryPlans(countryCode) {
    const container = document.getElementById('plans-container') || document.body;
    const data = noorlinkDatabase.getCountryPlans(countryCode);
    
    if (!data) {
      container.innerHTML = this.renderCountryNotFound();
      return;
    }

    container.innerHTML = this.renderCountryPage(data);
    this.addPlanSelectionHandlers(countryCode);
  }

  renderCountryPage(data) {
    const plans = data.plans;
    const isTier1 = data.country.tier === 1;
    
    return `
      <div class="country-plans-container" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="margin-bottom: 40px; text-align: center;">
          <h1 style="font-size: 2.5rem; color: #0F3D3E; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 15px;">
            ${data.country.flag} ${data.country.name} eSIM Plans
            ${isTier1 ? '<span style="background: #FF9500; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">🎯 Your Pricing</span>' : ''}
          </h1>
          <p style="color: #6b7280; font-size: 1.1rem;">Instant activation • No contracts • High-speed data</p>
        </div>

        <!-- Plans Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 50px;">
          ${this.renderPlanCard('basic', plans.basic, data.country.name, isTier1)}
          ${this.renderPlanCard('standard', plans.standard, data.country.name, isTier1, plans.standard.popular)}
          ${this.renderPlanCard('premium', plans.premium, data.country.name, isTier1)}
          ${this.renderPlanCard('family', plans.family, data.country.name, isTier1)}
        </div>

        <!-- Features -->
        <div style="background: white; border-radius: 16px; padding: 30px; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
          <h3 style="color: #0F3D3E; margin-bottom: 20px; font-size: 1.5rem;">What's included:</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
            ${data.features.map(feature => `
              <div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 0;">
                <div style="color: #10B981; font-size: 1.2rem;">✓</div>
                <div style="color: #374151; line-height: 1.5;">${feature}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Flex Data Option -->
        <div style="background: linear-gradient(135deg, #0F3D3E, #05191a); border-radius: 16px; padding: 30px; color: white; margin-bottom: 40px;">
          <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Flex Data - Pay As You Go</h3>
          <p style="opacity: 0.9; margin-bottom: 20px;">Perfect if you're unsure about your data needs. Start with 5GB and add more as needed.</p>
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px;">
            <div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Starting at</div>
              <div style="font-size: 2rem; font-weight: 700;">$25</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">5GB + $5/GB extra</div>
            </div>
            <button onclick="selectFlexData('${data.country.name}')" 
                    style="background: #FF9500; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.3s;"
                    onmouseover="this.style.backgroundColor='#e68600'"
                    onmouseout="this.style.backgroundColor='#FF9500'">
              Choose Flex Data
            </button>
          </div>
        </div>

        <!-- Back to Search -->
        <div style="text-align: center; margin-top: 50px;">
          <a href="index.html" 
             style="color: #0F3D3E; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
            ← Back to Search
          </a>
        </div>
      </div>
    `;
  }

  renderPlanCard(type, plan, countryName, isTier1, isPopular = false) {
    const dataDisplay = plan.sharedData ? `${plan.sharedData} shared` : plan.data;
    const linesDisplay = plan.lines ? `${plan.lines} lines` : '1 line';
    
    return `
      <div style="background: white; border-radius: 16px; padding: 30px; position: relative; 
                  border: ${isPopular ? '2px solid #FF9500' : '1px solid #e5e7eb'}; 
                  box-shadow: 0 4px 20px rgba(0,0,0,0.05); 
                  transition: transform 0.3s, box-shadow 0.3s;
                  ${isTier1 ? 'border-left: 4px solid #0F3D3E;' : ''}">
        ${isPopular ? `
          <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); 
                      background: #FF9500; color: white; padding: 6px 20px; border-radius: 20px; 
                      font-size: 0.8rem; font-weight: 700;">
            Most Popular
          </div>
        ` : ''}
        
        ${isTier1 ? `
          <div style="position: absolute; top: 15px; right: 15px; background: #e3f2fd; color: #0F3D3E; 
                      padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
            🎯 Your Pricing
          </div>
        ` : ''}
        
        <!-- Plan Header -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 1.1rem; color: #6b7280; margin-bottom: 5px;">${plan.name}</div>
          <div style="font-size: 2rem; font-weight: 800; color: #0F3D3E; margin-bottom: 5px;">${dataDisplay}</div>
          <div style="color: #6b7280; font-size: 0.9rem;">${linesDisplay} • ${plan.days} days</div>
        </div>
        
        <!-- Price -->
        <div style="margin-bottom: 25px;">
          <div style="font-size: 2.5rem; font-weight: 800; color: #0F3D3E;">$${plan.price.toFixed(2)}</div>
          <div style="color: #6b7280; font-size: 0.9rem;">one-time payment</div>
        </div>
        
        <!-- Select Button -->
        <button onclick="selectPlan('${countryName}', '${type}', ${plan.price})"
                style="width: 100%; background: #0F3D3E; color: white; border: none; padding: 14px; 
                       border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.3s; margin-bottom: 20px;"
                onmouseover="this.style.backgroundColor='#FF9500'"
                onmouseout="this.style.backgroundColor='#0F3D3E'">
          Select ${plan.name} Plan
        </button>
        
        <!-- Features -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${type === 'premium' ? '<li style="padding: 5px 0; color: #374151;">⭐ Unlimited high-speed data</li>' : ''}
            ${type === 'family' ? '<li style="padding: 5px 0; color: #374151;">👨‍👩‍👧‍👦 Perfect for families/groups</li>' : ''}
            <li style="padding: 5px 0; color: #374151;">📱 Instant eSIM delivery</li>
            <li style="padding: 5px 0; color: #374151;">🌍 Reliable connectivity</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderCountryNotFound() {
    return `
      <div style="text-align: center; padding: 100px 20px;">
        <h2 style="color: #0F3D3E; margin-bottom: 20px;">Country not found</h2>
        <p style="color: #6b7280; margin-bottom: 30px;">We couldn't find the country you're looking for.</p>
        <a href="index.html" 
           style="background: #0F3D3E; color: white; padding: 12px 30px; border-radius: 8px; 
                  text-decoration: none; font-weight: 600; display: inline-block;">
          ← Back to Search
        </a>
      </div>
    `;
  }

  addPlanSelectionHandlers(countryCode) {
    // Handlers are added via inline onclick in the rendered HTML
  }

  displayRegionalCountries(region) {
    // Implement regional display
  }

  displayAllCountries() {
    // Implement all countries display
  }
}

// ====== GLOBAL FUNCTIONS ======
window.selectPlan = function(countryName, planType, price) {
  // Show confirmation modal or redirect to checkout
  alert(`Selected: ${planType.toUpperCase()} plan for ${countryName} - $${price}`);
  // window.location.href = `checkout.html?country=${countryName}&plan=${planType}&price=${price}`;
};

window.selectFlexData = function(countryName) {
  alert(`Selected Flex Data for ${countryName}`);
  // window.location.href = `checkout.html?country=${countryName}&plan=flex&price=25`;
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof noorlinkDatabase !== 'undefined') {
    // Check if we're on a destinations page
    if (window.location.pathname.includes('destinations.html') || 
        document.getElementById('plans-container')) {
      window.destinationsPage = new DestinationsPage();
    }
  }
});