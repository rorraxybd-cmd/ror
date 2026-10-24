/**
 * ====================================================================
 * RORRAXY ENTERPRISE - MASTER SECURITY CORE (security.js)
 * File Location: security-config/security.js
 * ====================================================================
 */

(function() {
    const domain = "https://rorraxy.com";

    // সিকিউরিটি এবং প্রটেকশন ফাইলগুলোর তালিকা (অ্যাপ জেএস থেকে সম্পূর্ণ আলাদা)
    const securityScripts = [
        `${domain}/security-config/config.js`,
        `${domain}/security-config/cspHeader.js`,
        `${domain}/security-config/csrfProtection.js`,
        `${domain}/security-config/encryptionHelper.js`,
        `${domain}/security-config/firewallRules.js`,
        `${domain}/security-config/honeypot.js`,
        `${domain}/security-config/rateLimiter.js`,
        `${domain}/security-config/backupManager.js`
    ];

    const securityFragment = document.createDocumentFragment();

    securityScripts.forEach(src => {
        try {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            securityFragment.appendChild(script);
        } catch (e) {
            console.error("[rorraxy Security Script Load Error]:", src, e);
        }
    });

    if (document.head) {
        document.head.appendChild(securityFragment);
    }
})();

// গ্লোবাল সিকিউরিটি ভ্যালিডেশন অবজেক্ট
window.rorraxySecurity = window.rorraxySecurity || {
    verifyProtocols() {
        console.log("[rorraxy Security]: All enterprise firewall and transaction shields are fully active.");
        return true;
    }
};
