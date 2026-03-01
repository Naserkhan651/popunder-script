(function () {
    'use strict';

    // Tum apna API key yahan daalo (ipinfo.io, iplocate.io, etc.)
    const API_KEY = '2caad5d9a22f86';
    const CHECK_URL = `https://ipinfo.io/json?token=${API_KEY}`; // ya IPLocate uska URL

    // Agar VPN / proxy detect ho, to page block kare
    function blockPage() {
        document.body.innerHTML = `
            <div style="
                font-family: Arial, sans-serif;
                text-align: center;
                padding-top: 100px;
                color: #333;
            ">
                <h2>Access Blocked</h2>
                <p>VPN or proxy connection detected.</p>
                <p>Please disable VPN/proxy and reload the page.</p>
            </div>
        `;
        // Block further loading
        document.head.innerHTML = '';
    }

    // VPN / proxy detect karne ka function
    async function checkVpnOrProxy() {
        try {
            const res = await fetch(CHECK_URL);
            const data = await res.json();

            // Example: ipinfo.io style
            if (
                data.privacy &&
                (data.privacy.vpn || data.privacy.proxy || data.privacy.tor || data.privacy.relay)
            ) {
                blockPage();
                return;
            }

            // Agar VPN/proxy nahi mila, to koi issue nahi, page normal chale
        } catch (err) {
            // API fail hua, tum chaho to block bhi kar sakte ho, ya ignore
            console.warn('Failed to check VPN/proxy:', err);
        }
    }

    // Page load ho jaye ke turant
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkVpnOrProxy);
    } else {
        checkVpnOrProxy();
    }

})();