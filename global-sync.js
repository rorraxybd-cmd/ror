// global-sync.js (সেন্ট্রাল ডাটা ও নোটিফিকেশন সিঙ্ক)
import { RorraxyFetch } from './fetch.js';

export async function notifySystemUpdate(moduleName, actionType, data) {
    console.log(`সিস্টেম আপডেট হয়েছে: [${moduleName}] মডিউলে নতুন [${actionType}] ঘটেছে।`);

    // ১. যদি অ্যাডমিন প্যানেল খোলা থাকে, তবে অ্যাডমিন ফিড অটোমেটিক আপডেট হবে
    if (document.getElementById('admin-feed-container')) {
        updateAdminLiveFeed(moduleName, data);
    }

    // ২. যদি সেলারের ড্যাশবোর্ড খোলা থাকে, তবে তার কাউন্ট রিফ্রেশ হবে
    if (moduleName === 'seller' && document.getElementById('seller-stats')) {
        refreshSellerDashboardStats(data.sellerId);
    }

    // ৩. যদি অ্যাফিলিয়েটের লিংক থেকে কোনো সেল হয়, তবে তার কমিশন আপডেট হবে
    if (actionType === 'affiliate_conversion') {
        updateAffiliateEarnings(data.refCode, data.commission);
    }
}
