// admin/retail-admin/main.js
import { RorraxyFetch } from '../../fetch.js';
import { renderOrderTable } from '../shared/order-tracker.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("রিটেইল অ্যাডমিন প্যানেল লোড হচ্ছে...");
    
    try {
        // রিটেইলের তথ্য তুলে আনা
        const response = await RorraxyFetch('/api/admin/retail-orders', { method: 'GET' });
        const data = await response.json();

        if (data.success) {
            renderOrderTable(data.orders, 'retailOrdersTableBody');
        }
    } catch (error) {
        console.error("রিটেইল অর্ডার ডাটা লোড করতে সমস্যা হয়েছে:", error);
    }
});
