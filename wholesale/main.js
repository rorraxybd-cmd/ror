// wholesale/main.js
import { initHome } from '../shop/home.js';
import { initCategoryFilter } from '../shop/category.js';
import { initProductList } from '../shop/product.js';
import { initCart } from '../shop/cart.js';
import { initCheckout } from '../shop/checkout.js';
import { initWholesaleDetails } from './details.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("হোলসেল মডিউল চালু হয়েছে...");
    
    // কমন শপ ও হোম ফিচার লোড করা
    initHome();
    initCategoryFilter();
    initProductList();
    initCart();
    initCheckout(); // পাইকারি অর্ডার চেকআউট ও অ্যাডমিন সিঙ্ক
    
    // হোলসেলের নিজস্ব টায়ার প্রাইসিং ও লট কোয়ান্টিটি ডিটেইলস লোড করা
    initWholesaleDetails();
});
