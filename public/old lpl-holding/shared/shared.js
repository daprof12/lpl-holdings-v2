document.addEventListener('DOMContentLoaded', () => {
    // Inject header
    const headerEl = document.getElementById('masthead');
    if (headerEl) {
        headerEl.outerHTML = `<header id="masthead" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
<style>
    #header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background: #fff;
        z-index: 1000;
        box-sizing: border-box;
    }
    .hfe-site-logo {
        max-width: 150px;
    }
    .hfe-site-logo-img {
        max-height: 40px;
        width: auto;
    }
    #menu-menu-en {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 15px;
    }
    #menu-menu-en li a {
        text-decoration: none;
        color: #334a48;
        font-weight: 500;
        font-size: 14px;
        white-space: nowrap;
    }
    .eael-item-active {
        color: #4abe80 !important;
        font-weight: 700 !important;
    }
    .eael-simple-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
    @media (max-width: 1024px) {
        #menu-menu-en {
            display: none; /* Hide desktop menu */
        }
        .eael-simple-menu-toggle {
            display: block; /* Show hamburger */
        }
        #header.mobile-open #menu-menu-en {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #fff;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    }
    .elementor-invisible, [data-settings*="animation"] {
        opacity: 1 !important;
        visibility: visible !important;
        animation: none !important;
    }
    /* Fix for overflow and cutting off */
    body, html {
        overflow-x: hidden;
        width: 100%;
    }
</style>
<p class="main-title bhf-hidden" itemprop="headline"><a href="../index/" rel="home" title="LPL-HOLDINGS">LPL-HOLDINGS</a></p>
<div class="elementor elementor-123" data-elementor-id="123" data-elementor-type="wp-post">
<div class="elementor-element elementor-element-ff264c7 e-con-full e-grid animated-slow e-con e-parent e-lazyloaded animated slideInDown scrolled" data-e-type="container" data-element_type="container" data-id="ff264c7" data-settings='{"position":"fixed","animation":"slideInDown"}' id="header">
<div class="elementor-element elementor-element-aa989a3 elementor-widget elementor-widget-site-logo" data-e-type="widget" data-element_type="widget" data-id="aa989a3" data-settings='{"align":"left","width":{"unit":"%","size":40,"sizes":[]},"width_tablet":{"unit":"%","size":50,"sizes":[]},"width_mobile":{"unit":"%","size":75,"sizes":[]},"space":{"unit":"%","size":"","sizes":[]},"space_tablet":{"unit":"%","size":"","sizes":[]},"space_mobile":{"unit":"%","size":"","sizes":[]},"image_border_radius":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"image_border_radius_tablet":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"image_border_radius_mobile":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding_tablet":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding_mobile":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_space":{"unit":"px","size":0,"sizes":[]},"caption_space_tablet":{"unit":"px","size":"","sizes":[]},"caption_space_mobile":{"unit":"px","size":"","sizes":[]}}' data-widget_type="site-logo.default">
<div class="elementor-widget-container">
<div class="hfe-site-logo">
<a class="elementor-clickable" data-elementor-open-lightbox="" href="../index/">
<div class="hfe-site-logo-set">
<div class="hfe-site-logo-container">
<img alt="default-logo" class="hfe-site-logo-img elementor-animation-" src="/assets/a5623bb6f620503b9182df0a84e99ac0d67b1705b48426902caa906dcf614a77.png"/>
</div>
</div>
</a>
</div>
</div>
</div>
<div class="elementor-element elementor-element-28ce5f5 eael_simple_menu_hamburger_disable_selected_menu_no eael-simple-menu-hamburger-align-right eael-hamburger--tablet elementor-widget elementor-widget-eael-simple-menu eael-hamburger--not-responsive" data-e-type="widget" data-element_type="widget" data-id="28ce5f5" data-widget_type="eael-simple-menu.default">
 <div class="eael-simple-menu-container eael-simple-menu-align-right eael-simple-menu-dropdown-align-left preset-2" data-dropdown-indicator-icon="" data-hamburger-breakpoints='{"mobile":"Mobile Portrait (&gt; 767px)","tablet":"Tablet Portrait (&gt; 1024px)","desktop":"Desktop (&gt; 2400px)","none":"None"}' data-hamburger-device="tablet" data-hamburger-icon='&lt;svg aria-hidden="true" class="e-font-icon-svg e-fas-bars" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"&gt;&lt;path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"&gt;&lt;/path&gt;&lt;/svg&gt;' data-indicator-icon="">
<span class="eael-simple-menu-toggle-text"></span><ul class="eael-simple-menu eael-simple-menu-dropdown-animate-zoom-in eael-simple-menu-indicator eael-simple-menu-horizontal" id="menu-menu-en"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-10 current_page_item menu-item-165" id="menu-item-165"><a aria-current="page" href="../index/">Home</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-166" id="menu-item-166"><a href="../pricing/">Pricing</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-167" id="menu-item-167"><a href="../platform/">Platform</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-168" id="menu-item-168"><a href="../about/">About</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169" id="menu-item-169"><a href="../trade/">Trade</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-170" id="menu-item-170"><a href="/login">Login</a></li>
</ul> <button class="eael-simple-menu-toggle" id="menu-toggle">
<span class="sr-only">Hamburger Toggle Menu</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fas-bars" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg> </button>
</div>
</div>
</div>
</div>
</div>
</header>`;

        // Add toggle logic
        setTimeout(() => {
            const toggle = document.getElementById('menu-toggle');
            const header = document.getElementById('header');
            if (toggle && header) {
                toggle.addEventListener('click', () => {
                    header.classList.toggle('mobile-open');
                });
            }
        }, 100);
    }

    // Inject footer
    const footerEl = document.getElementById('colophon');
    if (footerEl) {
        footerEl.outerHTML = `<footer id="colophon" itemscope="itemscope" itemtype="https://schema.org/WPFooter" role="contentinfo">
<div class="footer-width-fixer"> <div class="elementor elementor-1003" data-elementor-id="1003" data-elementor-type="wp-post">
<div class="elementor-element elementor-element-eefa178 e-con-full e-flex e-con e-parent" data-e-type="container" data-element_type="container" data-id="eefa178" data-settings='{"background_background":"gradient"}'>
<div class="elementor-element elementor-element-d20bcc3 e-grid e-con-full e-con e-child" data-e-type="container" data-element_type="container" data-id="d20bcc3">
<div class="elementor-element elementor-element-5ddc443 elementor-widget elementor-widget-site-logo" data-e-type="widget" data-element_type="widget" data-id="5ddc443" data-settings='{"align":"left","align_tablet":"center","width_tablet":{"unit":"%","size":45,"sizes":[]},"width_mobile":{"unit":"%","size":100,"sizes":[]},"width":{"unit":"%","size":"","sizes":[]},"space":{"unit":"%","size":"","sizes":[]},"space_tablet":{"unit":"%","size":"","sizes":[]},"space_mobile":{"unit":"%","size":"","sizes":[]},"image_border_radius":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"image_border_radius_tablet":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"image_border_radius_mobile":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding_tablet":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_padding_mobile":{"unit":"px","top":"","right":"","bottom":"","left":"","isLinked":true},"caption_space":{"unit":"px","size":0,"sizes":[]},"caption_space_tablet":{"unit":"px","size":"","sizes":[]},"caption_space_mobile":{"unit":"px","size":"","sizes":[]}}' data-widget_type="site-logo.default">
<div class="elementor-widget-container">
<div class="hfe-site-logo">
<a class="elementor-clickable" data-elementor-open-lightbox="" href="../index/">
<div class="hfe-site-logo-set">
<div class="hfe-site-logo-container">
<img alt="default-logo" class="hfe-site-logo-img elementor-animation-" src="/assets/a5623bb6f620503b9182df0a84e99ac0d67b1705b48426902caa906dcf614a77.png"/>
</div>
</div>
</a>
</div>
</div>
</div>
<div class="elementor-element elementor-element-957069d e-con-full e-flex e-con e-child" data-e-type="container" data-element_type="container" data-id="957069d">
<div class="elementor-element elementor-element-feabe99 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="feabe99" data-widget_type="heading.default">
<p class="elementor-heading-title elementor-size-default">Resources</p> </div>
<div class="elementor-element elementor-element-16c4a55 elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="16c4a55" data-widget_type="text-editor.default">
<p><a href="../privacy-policy/">Privacy Policy</a></p><p><a href="../warnings-document/">Risk Warnings Document</a></p><p><a href="../terms-and-conditions/">Terms and Conditions</a></p><p><a href="../investment-agreement/">Investment Agreement</a></p> </div>
</div>
<div class="elementor-element elementor-element-71f0e64 e-con-full e-flex e-con e-child" data-e-type="container" data-element_type="container" data-id="71f0e64">
<div class="elementor-element elementor-element-5a3f94e elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="5a3f94e" data-widget_type="heading.default">
<p class="elementor-heading-title elementor-size-default">Pricing</p> </div>
<div class="elementor-element elementor-element-4b28b2c elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="4b28b2c" data-widget_type="text-editor.default">
<p><a href="../pricing/#pricing-table-title">All plans</a></p><p><a href="../pricing/#pricing-table">Gold</a></p><p><a href="../pricing/#pricing-sub-table">VIP</a></p> </div>
</div>
<div class="elementor-element elementor-element-5c85414 e-con-full e-flex e-con e-child" data-e-type="container" data-element_type="container" data-id="5c85414">
<div class="elementor-element elementor-element-d80f096 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="d80f096" data-widget_type="heading.default">
<p class="elementor-heading-title elementor-size-default">Platform</p> </div>
<div class="elementor-element elementor-element-6c9c6fd elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="6c9c6fd" data-widget_type="text-editor.default">
<p><a href="../platform/">Web-Trader</a></p> </div>
</div>
<div class="elementor-element elementor-element-9173175 e-con-full e-flex e-con e-child" data-e-type="container" data-element_type="container" data-id="9173175">
<div class="elementor-element elementor-element-9944a2b elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="9944a2b" data-widget_type="heading.default">
<p class="elementor-heading-title elementor-size-default">Trade</p> </div>
<div class="elementor-element elementor-element-daaae3a elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="daaae3a" data-widget_type="text-editor.default">
<p><a href="../trade/">Futures contracts</a></p><p><a href="../trade/">Raw Materials</a></p><p><a href="../trade/">Actions</a></p><p><a href="../trade/">Cryptocurrency CFDs</a></p><p><a href="../trade/">Indices</a></p> </div>
</div>
<div class="elementor-element elementor-element-a28bf22 elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="a28bf22" data-widget_type="text-editor.default">
<p>The company operates under the name: LPL-Holdings<br/>Legal address: 1055 LPL Way, Fort Mill, SC 29715 UNITED STATES<br/>( CRD # 6413 / SEC#: 801-52208, 8-16402 )</p> </div>
<div class="elementor-element elementor-element-8145910 e-grid e-con-full e-con e-child" data-e-type="container" data-element_type="container" data-id="8145910">
<div class="elementor-element elementor-element-d42d07a elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="d42d07a" data-widget_type="image.default">
<a href="https://adviserinfo.sec.gov/firm/summary/6413">
<img alt="" class="attachment-full size-full wp-image-3462" height="316" sizes="(max-width: 1248px) 100vw, 1248px" src="/assets/eafb7a5f7d4e7acce90d59065a61c9e2a322382f9ffda1155f3a128dd917f5c0.png" srcset="assets/eafb7a5f7d4e7acce90d59065a61c9e2a322382f9ffda1155f3a128dd917f5c0.png 1248w, assets/ef26f6b98d5a178958b1ea92b6a2285b6b39214034bca20f7f8eacea4ee51a5b.png 300w, https://lpl-holdings.com/wp-content/uploads/2025/11/u-s_securities_and_exchange_commission-1024x259.png 1024w, https://lpl-holdings.com/wp-content/uploads/2025/11/u-s_securities_and_exchange_commission-768x194.png 768w" width="1248"/> </a>
</div>
<div class="elementor-element elementor-element-3805845 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="3805845" data-widget_type="image.default">
<a href="https://brokercheck.finra.org/firm/summary/6413">
<img alt="" class="attachment-full size-full wp-image-3437" height="135" src="/assets/fdf0ef76e92534fac8ba069e1a53cf41d598a611c5e987685b7c1bffbb873fd9.png" width="264"/> </a>
</div>
<div class="elementor-element elementor-element-1a64404 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="1a64404" data-widget_type="image.default">
<a href="https://www.lei-lookup.com/record/5PRBRS5FEH7NREC8OR45/">
<img alt="" class="attachment-full size-full wp-image-3520" height="30" src="/assets/5b0f36ab4ff7e17c45aabea09154c3f7ae6521e9377b9d67ec986c94b9634c51.svg" width="118"/> </a>
</div>
</div>
<div class="elementor-element elementor-element-083f204 elementor-view-framed elementor-shape-rounded elementor-position-inline-start elementor-mobile-position-block-start elementor-widget elementor-widget-icon-box" data-e-type="widget" data-element_type="widget" data-id="083f204" data-widget_type="icon-box.default" id="mail_link">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-icon">
<a class="elementor-icon elementor-animation-grow" data-email-copy-handler-attached="true" href="mailto:support@lpl-holdings.com" tabindex="-1">
<svg aria-hidden="true" class="e-font-icon-svg e-far-envelope" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> </a>
</div>
<div class="elementor-icon-box-content">
<p class="elementor-icon-box-description">
						support@lpl-holdings.com					</p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-bf99327 elementor-widget elementor-widget-html" data-e-type="widget" data-element_type="widget" data-id="bf99327" data-widget_type="html.default">
<script>
    const header = document.querySelector('#header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
</script> </div>
</div>
</div>
</div> </footer>`;
    }
    // Update active nav menu item
    const currentPathname = window.location.pathname.toLowerCase();
    const menuLinks = document.querySelectorAll('#menu-menu-en a');

    // First, remove active classes from all links
    menuLinks.forEach(link => {
        link.classList.remove('eael-item-active');
        link.removeAttribute('aria-current');
        if (link.parentElement) {
            link.parentElement.classList.remove('current-menu-item', 'page_item', 'page-item-10', 'current_page_item');
        }
    });

    // Then, add active class to the matching link
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        let isMatch = false;
        if (href.includes('../pricing/') && currentPathname.includes('/pricing')) {
            isMatch = true;
        } else if (href.includes('../platform/') && currentPathname.includes('/platform')) {
            isMatch = true;
        } else if (href.includes('../about/') && currentPathname.includes('/about')) {
            isMatch = true;
        } else if (href.includes('../trade/') && currentPathname.includes('/trade')) {
            isMatch = true;
        } else if (href.includes('../index/')) {
            // Check for index/home strictly
            if (currentPathname.includes('/index/') || currentPathname.endsWith('/public/') || currentPathname.endsWith('/public') || currentPathname === '/' || currentPathname === '') {
                isMatch = true;
            } else if ((currentPathname.endsWith('/') || currentPathname.endsWith('.html')) && !currentPathname.includes('/pricing/') && !currentPathname.includes('/platform/') && !currentPathname.includes('/about/') && !currentPathname.includes('/trade/') && !currentPathname.includes('/privacy-policy/') && !currentPathname.includes('/warnings-document/') && !currentPathname.includes('/terms-and-conditions/') && !currentPathname.includes('/investment-agreement/')) {
                // It's an index.html file that's not part of the other folders
                isMatch = true;
            }
        }

        if (isMatch) {
            link.classList.add('eael-item-active');
            link.setAttribute('aria-current', 'page');
            if (link.parentElement) {
                link.parentElement.classList.add('current-menu-item', 'page_item', 'current_page_item');
            }
        }
    });

    // Global click interceptor for login/trading buttons
    // The requirement says: "when the login button or start trading button, or open web trading button from any page inside the public pages is clicked redirect to the dashboard login page"
    document.addEventListener('click', (e) => {
        let anchor = e.target.closest('a');
        if (anchor) {
            const text = anchor.innerText.trim().toLowerCase();
            const href = anchor.getAttribute('href') || '';
            const shouldRedirect =
                href.includes('/to-platform/') ||
                href.includes('dashboard') ||
                text === 'login' ||
                text === 'start trading' ||
                text === 'open web trading';

            if (shouldRedirect) {
                e.preventDefault();
                window.location.href = '/login';
            }
        }
    });

    // CDN Fallbacks for dead WordPress scripts
    const scriptMap = {
        'jquery.min.js': 'https://code.jquery.com/jquery-3.7.1.min.js',
        'jquery-migrate.min.js': 'https://code.jquery.com/jquery-migrate-3.4.1.min.js',
        'frontend-modules.min.js': 'https://unpkg.com/elementor@3.24.0/assets/js/frontend-modules.min.js',
        'frontend.min.js': 'https://unpkg.com/elementor@3.24.0/assets/js/frontend.min.js',
        'elementor-frontend-js': 'https://unpkg.com/elementor@3.24.0/assets/js/frontend.min.js'
    };

    document.querySelectorAll('script[src*="prucosecurities.com"], script[src*="lpl-holdings.com"]').forEach(script => {
        for (const [key, cdn] of Object.entries(scriptMap)) {
            if (script.src.includes(key) || script.id.includes(key)) {
                const newScript = document.createElement('script');
                newScript.src = cdn;
                newScript.async = false;
                script.parentNode.replaceChild(newScript, script);
            }
        }
    });
});
