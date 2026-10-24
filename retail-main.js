// এই ফাইলটি রিটেইলের ৭টি ছোট ফাইলকে একসাথে কানেক্ট বা ট্র্যাক করবে
import { loadProducts } from './retail-products.js';
import { initCart } from './retail-cart.js';
import { setupSearch } from './retail-search.js';
import { renderUI } from './retail-ui.js';
import { initWishlist } from './retail-wishlist.js';
import { handleDiscount } from './retail-discount.js';
import { syncDatabase } from './retail-sync.js';

// রিটেইল মডিউল চালু হওয়ার সাথে সাথে কোডের মাধ্যমে এই ফাংশনগুলো রান হবে
export function startRetailModule() {
    loadProducts();
    initCart();
    setupSearch();
    renderUI();
    initWishlist();
    handleDiscount();
    syncDatabase();
    
    console.log("রিটেইলের সমস্ত ৭টি সাব-ফাইল সফলভাবে কানেক্ট হয়ে রান হয়েছে!");
}
