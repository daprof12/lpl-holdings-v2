document.addEventListener('DOMContentLoaded', () => {
    // 1. Asset Mapping (WordPress to Local Assets)
    const assetMap = {
        'Logo-white-bg.png': '/assets/a5623bb6f620503b9182df0a84e99ac0d67b1705b48426902caa906dcf614a77.png',
        'u-s_securities_and_exchange_commission.png': '/assets/eafb7a5f7d4e7acce90d59065a61c9e2a322382f9ffda1155f3a128dd917f5c0.png',
        'brokercheck.png': '/assets/fdf0ef76e92534fac8ba069e1a53cf41d598a611c5e987685b7c1bffbb873fd9.png',
        'lei-lookup': '/assets/5b0f36ab4ff7e17c45aabea09154c3f7ae6521e9377b9d67ec986c94b9634c51.svg'
    };

    // 2. DOM Normalization (Links & Images) - Process the whole document
    const processElements = (root = document) => {
        // Fix Links
        root.querySelectorAll('a').forEach(link => {
            let href = link.getAttribute('href') || '';
            const text = link.innerText.trim().toLowerCase();

            // Normalize WordPress absolute URLs
            if (href.includes('prucosecurities.com')) {
                href = href.replace(/https?:\/\/(www\.)?prucosecurities\.com/g, '');
            }

            // Clean URL handling (ensure trailing slash for static pages, but NOT for SPA routes)
            const isSPARoute = text === 'login' || text === 'start trading' || text === 'open web trading' || href.includes('/to-platform/');
            
            if (isSPARoute) {
                href = '/login';
            } else if (href && !href.endsWith('/') && !href.includes('.') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                href += '/';
            }
            
            if (href === '' || href === '/') href = '/landing/';

            link.setAttribute('href', href);

            // Active State
            const path = window.location.pathname;
            if (href === path || (path === '/' && href === '/landing/')) {
                link.classList.add('eael-item-active');
            }
        });

        // Fix Broken Images
        root.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src') || '';
            for (const [key, localPath] of Object.entries(assetMap)) {
                if (src.includes(key)) {
                    img.setAttribute('src', localPath);
                    img.removeAttribute('srcset');
                    break;
                }
            }
        });
    };

    // Run on whole body to catch buttons in main content
    processElements(document.body);

    // 3. Attach Mobile Toggle to EXISTING Element
    const toggleBtn = document.querySelector('.eael-simple-menu-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = toggleBtn.closest('.eael-simple-menu-container');
            if (container) {
                const isActive = container.classList.toggle('eael-simple-menu-active');
                const menu = container.querySelector('.eael-simple-menu');
                if (menu) {
                    if (isActive) {
                        menu.style.setProperty('display', 'block', 'important');
                        menu.classList.add('eael-simple-menu-responsive');
                    } else {
                        menu.style.removeProperty('display');
                        menu.classList.remove('eael-simple-menu-responsive');
                    }
                }
            }
        });
    }

    // 4. Global Scroll Logic for header
    const header = document.querySelector('#header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // 5. Pixel-Perfect CSS Overrides (targeting original classes)
    const styleFix = document.createElement('style');
    styleFix.innerHTML = `
        /* Desktop: Ensure justify-between inside same div */
        #header.e-con {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 10px 4% !important;
            box-sizing: border-box !important;
            gap: 20px !important;
        }

        /* Logo Size Constraint */
        #header .hfe-site-logo-container img {
            width: auto !important;
            max-width: 110px !important; /* Reduced from 140px */
            height: auto !important;
            display: block !important;
        }

        /* Responsive Layout Overrides */
        @media screen and (min-width: 1025px) {
            #header .elementor-widget-site-logo {
                flex: 0 1 auto !important;
            }
            #header .elementor-widget-eael-simple-menu {
                flex: 1 1 auto !important;
                display: flex !important;
                justify-content: flex-end !important;
            }
            #header .eael-simple-menu-horizontal {
                display: flex !important;
                gap: 5px !important;
            }
        }

        /* Mobile Adjustments */
        @media screen and (max-width: 1024px) {
            #header {
                padding: 15px 5% !important;
            }
            
            #header .elementor-widget-site-logo {
                flex: 0 1 auto !important;
                max-width: 60% !important;
            }

            #header .elementor-widget-eael-simple-menu {
                flex: 0 0 auto !important;
                display: flex !important;
                justify-content: flex-end !important;
                align-items: center !important;
            }

            #header .eael-simple-menu-horizontal {
                display: none !important;
            }

            #header .eael-simple-menu-toggle {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: transparent !important;
                border: none !important;
                padding: 5px !important;
                cursor: pointer !important;
                flex-shrink: 0 !important;
            }

            #header .eael-simple-menu-toggle svg {
                width: 24px !important;
                height: 24px !important;
                fill: #000 !important;
            }
            
            /* Dark Theme Dropdown Enhancement */
            #header .eael-simple-menu-active .eael-simple-menu-horizontal {
                display: block !important;
                position: fixed !important; /* Fixed to prevent scroll issues */
                top: 70px !important; /* Height of header */
                left: auto !important;
                right: 0 !important;
                width: 40% !important;
                min-width: 180px !important; /* Ensure it's not too narrow on very small screens */
                background: #000 !important;
                z-index: 9999 !important;
                padding: 10px 0 !important;
                box-shadow: -10px 10px 30px rgba(0,0,0,0.5) !important;
                border-top: 1px solid #222 !important;
            }

            #header .eael-simple-menu-active .eael-simple-menu-horizontal li {
                width: 100% !important;
                text-align: left !important;
                list-style: none !important;
            }

            #header .eael-simple-menu-active .eael-simple-menu-horizontal li a {
                color: #fff !important;
                display: block !important;
                padding: 10px 20px !important; /* Reduced vertical padding */
                font-size: 15px !important;
                text-decoration: none !important;
                border-bottom: 1px solid #111 !important;
                transition: background 0.3s !important;
            }

            #header .eael-simple-menu-active .eael-simple-menu-horizontal li a:hover {
                background: #111 !important;
            }

            /* Active Item in Dropdown */
            #header .eael-simple-menu-active .eael-simple-menu-horizontal li a.eael-item-active {
                color: #528AF3 !important; /* Matching blue accent */
                font-weight: bold !important;
            }
        }
    `;
    document.head.appendChild(styleFix);
});
