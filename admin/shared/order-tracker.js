// admin/shared/order-tracker.js

export function renderOrderTable(orders, tableContainerId) {
    const tableBody = document.getElementById(tableContainerId);
    if (!tableBody) return;

    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${order.orderId}</strong></td>
            <td>${order.date}</td>
            
            <!-- কাস্টমার আইডিতে ক্লিক করলে প্রোফাইলে যাবে -->
            <td><a href="/admin/customers/${order.customerId}" class="link-id">${order.customerId}</a></td>
            
            <!-- সেলার আইডিতে ক্লিক করলে সেলার ড্যাশবোর্ডে যাবে -->
            <td><a href="/admin/sellers/${order.sellerId}" class="link-id">${order.sellerId}</a></td>
            
            <!-- প্রোডাক্ট আইডি -->
            <td><span class="product-id">${order.productId}</span></td>
            
            <!-- অ্যাফিলিয়েট আইডি (থাকলে লিঙ্কে যাবে, না থাকলে N/A) -->
            <td>
                ${order.affiliateId 
                    ? `<a href="/admin/affiliates/${order.affiliateId}" class="link-id">${order.affiliateId}</a>` 
                    : '<span class="text-muted">N/A</span>'}
            </td>
            
            <!-- পেমেন্ট ও অটোমেটিক শিপিং স্ট্যাটাস -->
            <td><span class="badge paid">${order.paymentStatus}</span></td>
            <td><span class="badge shipping">${order.shippingStatus}</span></td>
            
            <!-- বন্টন ও প্রসেস বাটন -->
            <td>
                <button class="btn-process" onclick="processDistribution('${order.orderId}')">বন্টন ও প্রসেস</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}
