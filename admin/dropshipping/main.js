// admin/dropshipping-admin/main.js
import { RorraxyFetch } from '../../fetch.js';
import { renderOrderTable } from '../shared/order-tracker.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("ড্রপশিপিং অ্যাডমিন প্যানেল লোড হচ্ছে...");
    
    try {
        // ড্রপশিপিংয়ের তথ্য তুলে আনা
        const response = await RorraxyFetch('/api/admin/dropship-orders', { method: 'GET' });
        const data = await response.json();

        if (data.success) {
            renderOrderTable(data.orders, 'dropshipOrdersTableBody');
        }
    } catch (error) {
        console.error("ড্রপশিপিং অর্ডার ডাটা লোড করতে সমস্যা হয়েছে:", error);
    }
});
