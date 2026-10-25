// admin/wholesale-admin/main.js
import { RorraxyFetch } from '../../fetch.js';
import { renderOrderTable } from '../shared/order-tracker.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("হোলসেল অ্যাডমিন প্যানেল লোড হচ্ছে...");
    
    try {
        // হোলসেলের তথ্য তুলে আনা
        const response = await RorraxyFetch('/api/admin/wholesale-orders', { method: 'GET' });
        const data = await response.json();

        if (data.success) {
            renderOrderTable(data.orders, 'wholesaleOrdersTableBody');
        }
    } catch (error) {
        console.error("হোলসেল অর্ডার ডাটা লোড করতে সমস্যা হয়েছে:", error);
    }
});
