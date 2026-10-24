/**
 * ====================================================================
 * PROJECT: RORRAXY (rorraxy.com)
 * MASTER ROUTER & CORE SYSTEM (app.js)
 * ====================================================================
 */

export const CONFIG = {
    domain: "https://rorraxy.com",
    version: "1.0.0"
};

// গ্লোবাল কোর মডিউল (যেগুলো সব পেজে বা ব্যাকগ্রাউন্ডে কমনভাবে লাগবে)
const coreGlobalModules = [
    './security-config/cspHeader.js',
    './management/store.js'
];

// গ্লোবাল সার্ভিস ইনিশিয়ালাইজেশন
async function initCore() {
    try {
        for (const path of coreGlobalModules) {
            await import(path);
        }
    } catch (err) {
        console.error("Core Module Error:", err);
    }
}

// সেন্ট্রাল ডাইনামিক রাউটার
async function handleRouting() {
    const hash = window.location.hash || '#home';
    const container = document.getElementById('main-content') || document.body;

    try {
        switch (true) {
            case hash.startsWith('#retail'):
                const retail = await import('./modules/retail/retail.js');
                if (retail.init) retail.init(container);
                break;

            case hash.startsWith('#wholesale'):
                const wholesale = await import('./modules/wholesale/wholesale.js');
                if (wholesale.init) wholesale.init(container);
                break;

            case hash.startsWith('#seller'):
                const seller = await import('./modules/seller/seller-dashboard.js');
                if (seller.init) seller.init(container);
                break;

            case hash.startsWith('#affiliate'):
                const affiliate = await import('./modules/affiliate/affiliate.js');
                if (affiliate.init) affiliate.init(container);
                break;

            case hash.startsWith('#business'):
                const business = await import('./modules/business/get-solutions.js');
                if (business.init) business.init(container);
                break;

            case hash.startsWith('#academy'):
                const academy = await import('./modules/academy/enroll-course.js');
                if (academy.init) academy.init(container);
                break;

            case hash.startsWith('#checkout'):
                // চেকআউট বা পেমেন্টের ফাইল শুধু যখন চেকআউটে যাবে তখনই লোড হবে
                const checkout = await import('./trade/checkout.js');
                if (checkout.init) checkout.init(container);
                break;

            case hash === '#home':
            default:
                // হোমপেজ রেন্ডারিং
                break;
        }
    } catch (err) {
        console.error("Routing Error:", err);
    }
}

// সার্ভিস ওয়ার্কার রেজিস্ট্রেশন (অফলাইন ও স্পিড অপ্টিমাইজেশন)
function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./pwa/sw.js').catch(() => {});
        });
    }
}

// অ্যাপ রান করা
document.addEventListener('DOMContentLoaded', async () => {
    await initCore();
    registerSW();
    handleRouting();
});

window.addEventListener('hashchange', handleRouting);
