// FAQ page content — derived from support.html FAQ section
export const bodyHtml =
  '<header>\n' +
  '        <div class="container nav-wrapper">\n' +
  '            <a href="/" class="logo-text">\n' +
  '                Noor<span style="color: var(--accent);">Link</span><sup class="logo-tm">TM</sup>\n' +
  '            </a>\n' +
  '            <nav class="nav-links" id="navLinks">\n' +
  '                <a href="/about">About</a>\n' +
  '                <a href="/destinations">Destinations</a>\n' +
  '                <a href="/faq" style="color: var(--primary);">FAQ</a>\n' +
  '                <a href="/support">Support</a>\n' +
  '                <a href="/dashboard" class="btn-nav">My eSIMs</a>\n' +
  '            </nav>\n' +
  '            <div class="mobile-toggle" onclick="toggleMenu()"><i class="fas fa-bars"></i></div>\n' +
  '        </div>\n' +
  '    </header>\n' +
  '\n' +
  '    <section class="support-hero">\n' +
  '        <div class="container">\n' +
  '            <h1>Frequently Asked Questions</h1>\n' +
  '            <p>Quick answers about eSIM setup, delivery, refunds, and device compatibility.</p>\n' +
  '        </div>\n' +
  '    </section>\n' +
  '\n' +
  '    <div class="container">\n' +
  '        <div class="faq-section" style="margin-top: 40px;">\n' +
  '            <h2 class="faq-title">Common Questions</h2>\n' +
  '            <div class="faq-grid">\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>Where is my QR Code?</h4>\n' +
  '                    <p>Your QR code is sent to your email immediately after purchase. Please check your Spam/Junk folder.</p>\n' +
  '                </div>\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>Will this work on my phone?</h4>\n' +
  '                    <p>Most modern phones (iPhone XR+, Samsung S20+, Pixel 3+) support eSIM. Check your settings to be sure.</p>\n' +
  '                </div>\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>Can I get a refund?</h4>\n' +
  '                    <p>If the eSIM code fails to work due to a technical error, we offer a full refund. See our <a href="/refund" style="color: var(--accent); font-weight: 700;">Refund Policy</a>.</p>\n' +
  '                </div>\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>Do I keep my WhatsApp number?</h4>\n' +
  '                    <p>Yes! You can use NoorLink for data while keeping your main number active for WhatsApp and calls.</p>\n' +
  '                </div>\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>When does my plan start?</h4>\n' +
  '                    <p>Your data plan typically activates when you install the eSIM and connect to a supported network in your destination country.</p>\n' +
  '                </div>\n' +
  '                <div class="faq-item">\n' +
  '                    <h4>Need more help?</h4>\n' +
  '                    <p>Our support team is available 24/7. Visit the <a href="/support" style="color: var(--accent); font-weight: 700;">Support page</a> to send us a message.</p>\n' +
  '                </div>\n' +
  '            </div>\n' +
  '        </div>\n' +
  '    </div>\n' +
  '\n' +
  '    <footer>\n' +
  '        <div class="container footer-grid">\n' +
  '            <div>\n' +
  '                <a href="/" class="logo-text" style="color:white !important;">\n' +
  '                    Noor<span style="color:var(--accent);">Link</span><sup class="logo-tm">TM</sup>\n' +
  '                </a>\n' +
  '                <p style="margin-top: 20px; line-height: 1.8;">\n' +
  '                    Making global travel simple.<br>\n' +
  '                    📍 MOUNTAIN ROAD PL NE, Suite R<br>\n' +
  '                    ALBUQUERQUE, NM 87110\n' +
  '                </p>\n' +
  '            </div>\n' +
  '            <div>\n' +
  '                <h4>Company</h4>\n' +
  '                <div class="footer-list">\n' +
  '                    <a href="/about">About Us</a>\n' +
  '                    <a href="/support">Contact Support</a>\n' +
  '                    <a href="#">Partner Program</a>\n' +
  '                </div>\n' +
  '            </div>\n' +
  '            <div>\n' +
  '                <h4>Legal</h4>\n' +
  '                <div class="footer-list">\n' +
  '                    <a href="/privacy">Privacy Policy</a>\n' +
  '                    <a href="/terms">Terms of Service</a>\n' +
  '                    <a href="/refund">Refund Policy</a>\n' +
  '                </div>\n' +
  '            </div>\n' +
  '        </div>\n' +
  '        <div class="footer-bottom">\n' +
  '            &copy; 2026 NoorLink.co. All rights reserved.\n' +
  '        </div>\n' +
  '    </footer>\n' +
  '\n' +
  '    <a href="https://wa.me/15551234567" class="whatsapp-float" target="_blank" title="Chat on WhatsApp"></a>';

export const scripts = [
  "function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }",
];

export const extraScripts: string[] = [];
