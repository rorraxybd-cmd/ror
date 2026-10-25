// /admin/shared/order-tracker.js
export function renderOrderTable(orders, tableId) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.date}</td>
            <td><a href="#" onclick="viewCustomer('${order.customerId}')">${order.customerId}</a></td>
            <td><a href="#" onclick="viewSeller('${order.sellerId}')">${order.sellerId}</a></td>
            <td>${order.productId}</td>
            <td>${order.affiliateId ? `<a href="#" onclick="viewAffiliate('${order.affiliateId}')">${order.affiliateId}</a>` : 'N/A'}</td>
            <td><span class="badge paid">${order.paymentStatus}</span></td>
            <td><span class="shipping">${order.shippingStatus}</span></td>
        `;
        tableBody.appendChild(row);
    });
}
