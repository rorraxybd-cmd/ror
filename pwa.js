/**
 * RORRAXY ENTERPRISE - MASTER PWA CORE (pwa.js)
 * File Location: /pwa.js
 */
(function() {
    const domain = "https://rorraxy.com";

    const pwaScripts = [
        `${domain}/pwa/popup.js`,
        `${domain}/pwa/router.js`
    ];

    const fragment = document.createDocumentFragment();

    pwaScripts.forEach(src => {
        try {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            fragment.appendChild(script);
        } catch (e) {
            console.error("[rorraxy PWA Script Load Error]:", src, e);
        }
    });

    if (document.head) {
        document.head.appendChild(fragment);
    }
})();

// সার্ভিস ওয়ার্কার অটো রেজিস্ট্রেশন
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('https://rorraxy.com/pwa/sw.js')
            .catch(err => console.log('SW registration failed:', err));
    });
}
