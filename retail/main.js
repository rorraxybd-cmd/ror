// retail/main.js
import { initHome } from '../shop/home.js';
import { initCategoryFilter } from '../shop/category.js';
import { initProductList } from '../shop/product.js';
import { initCart } from '../shop/cart.js';
import { initCheckout } from '../shop/checkout.js';
import { initRetailDetails } from './details.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("রিটেইল মডিউল চালু হয়েছে...");
    
    // কমন ফিচার ও হোমপেজ (নতুন ও ট্রেন্ডিং প্রোডাক্ট) লোড করা
    initHome();
    
    // ক্যাটাগরি ও সার্চ ফিল্টার সক্রিয় করা
    initCategoryFilter();
    
    // প্রোডাক্ট লিস্ট ও গ্রিড রেন্ডার করা
    initProductList();
    
    // কার্ট এবং চেকআউট সিস্টেম (যা সরাসরি অ্যাডমিন ডাটাবেজে সিঙ্ক হবে)
    initCart();
    initCheckout();
    
    // রিটেইলের নিজস্ব সিঙ্গেল প্রাইস ডিটেইলস পেজ লোড করা
    initRetailDetails();
});
