/**
 * RORRAXY ENTERPRISE - MASTER SYSTEM CORE (core.js)
 * File Location: /core.js
 */
(function() {
    const domain = "https://rorraxy.com";

    const coreScripts = [
        `${domain}/advanced/sanitizer.js`,
        `${domain}/advanced/syncManager.js`,
        `${domain}/advanced/behavioralAnalytics.js`,
        `${domain}/advanced/codeSplit.js`,
        `${domain}/advanced/worker.js`,
        `${domain}/management/formPersist.js`,
        `${domain}/management/storage.js`,
        `${domain}/management/store.js`
    ];

    const fragment = document.createDocumentFragment();

    coreScripts.forEach(src => {
        try {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            fragment.appendChild(script);
        } catch (e) {
            console.error("[rorraxy Core Script Error]:", src, e);
        }
    });

    if (document.head) {
        document.head.appendChild(fragment);
    }
})();
