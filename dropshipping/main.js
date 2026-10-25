// dropshipping/main.js
import { initHome } from '../shop/home.js';
import { initCategoryFilter } from '../shop/category.js';
import { initProductList } from '../shop/product.js';
import { initCart } from '../shop/cart.js';
import { initCheckout } from '../shop/checkout.js';
import { initDropshipDetails } from './details.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("ড্রপশিপিং মডিউল চালু হয়েছে...");
    
    // কমন শপ ও হোম ফিচার লোড করা
    initHome();
    initCategoryFilter();
    initProductList();
    initCart();
    initCheckout(); // ড্রপশিপিং অর্ডার চেকআউট ও অ্যাডমিন সিঙ্ক
    
    // ড্রপশিপিংয়ের নিজস্ব ডাউনলোড অপশন ও রিসেল ডিটেইলস লোড করা
    initDropshipDetails();
});
