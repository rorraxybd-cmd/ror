/**
 * ====================================================================
 * RORRAXY ENTERPRISE - MASTER UI UTILITIES CORE (ui.js)
 * File Location: ui/ui.js
 * ====================================================================
 */

(function() {
    const domain = "https://rorraxy.com";

    // UI এবং মেটা ইন্টারফেস ফাইলগুলোর পূর্ণাঙ্গ তালিকা
    const uiScripts = [
        `${domain}/ui/imageHelper.js`,
        `${domain}/ui/loader.js`,
        `${domain}/ui/skeleton.js`,
        `${domain}/ui/toast.js`,
        `${domain}/ui/validator.js`,
        `${domain}/ui/videoEmbedSanitizer.js`,
        `${domain}/ui/videoHelper.js`
    ];

    const uiFragment = document.createDocumentFragment();

    uiScripts.forEach(src => {
        try {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            uiFragment.appendChild(script);
        } catch (e) {
            console.error("[rorraxy UI Script Load Error]:", src, e);
        }
    });

    if (document.head) {
        document.head.appendChild(uiFragment);
    }
})();

/**
 * গ্লোবাল UI টেমপ্লেট ও অফলাইন পেজ লোডার
 */
window.rorraxyUI = window.rorraxyUI || {
    async loadOfflineTemplate(containerId = 'main-content') {
        try {
            const response = await fetch('https://rorraxy.com/ui/offline.html');
            if (!response.ok) throw new Error('Offline template fetching failed');
            const html = await response.text();
            const target = document.getElementById(containerId) || document.body;
            target.innerHTML = html;
        } catch (err) {
            console.error("[rorraxy UI]: Failed to render offline page", err);
        }
    },
    verifyUIReady() {
        console.log("[rorraxy UI]: All UI modules and helper utilities loaded successfully.");
        return true;
    }
};
