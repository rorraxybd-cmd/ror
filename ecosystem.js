/**
 * ====================================================================
 * RORRAXY ENTERPRISE - MASTER ECOSYSTEM CORE (ecosystem.js)
 * File Location: /ecosystem.js
 * ====================================================================
 */

(function() {
    const domain = "https://rorraxy.com";

    // Ecosystem folder-er sob mukhjo script-er list
    const ecosystemScripts = [
        `${domain}/ecosystem/aiService.js`,
        `${domain}/ecosystem/countries.js`,
        `${domain}/ecosystem/firebase.js`,
        `${domain}/ecosystem/geo.js`,
        `${domain}/ecosystem/invoice.js`,
        `${domain}/ecosystem/upload.js`
    ];

    const fragment = document.createDocumentFragment();

    ecosystemScripts.forEach(src => {
        try {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            fragment.appendChild(script);
        } catch (e) {
            console.error("[rorraxy Ecosystem Load Error]:", src, e);
        }
    });

    if (document.head) {
        document.head.appendChild(fragment);
    }
})();

/**
 * Global Ecosystem On-Demand Dynamic Bridge
 */
window.rorraxyEcosystem = window.rorraxyEcosystem || {
    async getAI() {
        return await import('./ecosystem/aiService.js');
    },
    async getCountries() {
        return await import('./ecosystem/countries.js');
    },
    async getFirebase() {
        return await import('./ecosystem/firebase.js');
    },
    async getGeo() {
        return await import('./ecosystem/geo.js');
    },
    async getInvoice() {
        return await import('./ecosystem/invoice.js');
    },
    async getUploader() {
        return await import('./ecosystem/upload.js');
    },
    verifyReady() {
        console.log("[rorraxy Ecosystem]: All ecosystem services loaded successfully.");
        return true;
    }
};
