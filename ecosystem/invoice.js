/**
 * rorraxy - Core Trade Invoice Generator
 * Description: Dynamically generates and renders print-ready, luxury-styled 
 * invoices for Retail, Wholesale, and Merchant transactions.
 */

class RorraxyInvoiceManager {
    constructor(config = {}) {
        this.currencySymbol = config.currencySymbol || '৳';
        this.brandName = 'rorraxy'; // ব্র্যান্ডের নাম সর্বদা ছোট হাতের অক্ষরে কার্যকর হবে
    }

    /**
     * Calculate item totals, taxes, and final payable amount
     * @param {Array} items - List of items [{ name, price, qty, discount }]
     * @param {Object} options - Additional options like taxRate, shippingCost
     * @returns {Object}
     */
    calculateInvoiceData(items = [], options = {}) {
        const taxRate = Number(options.taxRate) || 0;
        const shippingCost = Number(options.shippingCost) || 0;

        let subtotal = 0;
        let totalDiscount = 0;

        const processedItems = items.map(item => {
            const itemPrice = Number(item.price) || 0;
            const itemQty = Number(item.qty) || 1;
            const itemDiscount = Number(item.discount) || 0;

            const itemSubtotal = itemPrice * itemQty;
            const itemFinalTotal = Math.max(0, itemSubtotal - itemDiscount);

            subtotal += itemSubtotal;
            totalDiscount += itemDiscount;

            return {
                ...item,
                itemSubtotal,
                itemFinalTotal
            };
        });

        const taxableAmount = Math.max(0, subtotal - totalDiscount);
        const taxAmount = (taxableAmount * taxRate) / 100;
        const grandTotal = taxableAmount + taxAmount + shippingCost;

        return {
            items: processedItems,
            subtotal,
            totalDiscount,
            taxAmount,
            shippingCost,
            grandTotal
        };
    }

    /**
     * Generate HTML layout for printable luxury dark-themed invoice
     * @param {Object} invoiceDetails - { invoiceNo, date, customer, items, options }
     * @returns {string} HTML string
     */
    generateInvoiceHTML(invoiceDetails) {
        const { invoiceNo, date, customer, items, options } = invoiceDetails;
        const calculated = this.calculateInvoiceData(items, options);

        const itemsHTML = calculated.items.map((item, index) => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 10px; text-align: center;">${index + 1}</td>
                <td style="padding: 10px;">${window.RorraxyValidator ? window.RorraxyValidator.prototype.sanitizeInput(item.name) : item.name}</td>
                <td style="padding: 10px; text-align: center;">${item.qty}</td>
                <td style="padding: 10px; text-align: right;">${this.currencySymbol}${item.price}</td>
                <td style="padding: 10px; text-align: right;">${this.currencySymbol}${item.itemFinalTotal}</td>
            </tr>
        `).join('');

        return `
            <div id="rorraxyPrintableInvoice" style="background: #0b0b0b; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.3); max-width: 800px; margin: 0 auto;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 20px;">
                    <div>
                        <h1 style="margin: 0; color: #d4af37; font-size: 28px; letter-spacing: 1px; text-transform: lowercase;">${this.brandName}</h1>
                        <p style="margin: 5px 0 0; font-size: 12px; color: #a0a0a0;">Digital Commerce Ecosystem</p>
                    </div>
                    <div style="text-align: right;">
                        <h3 style="margin: 0; color: #fff; font-size: 18px;">INVOICE</h3>
                        <p style="margin: 3px 0; font-size: 13px; color: #d4af37;">#${invoiceNo}</p>
                        <p style="margin: 0; font-size: 12px; color: #a0a0a0;">Date: ${date}</p>
                    </div>
                </div>

                <!-- Customer Details -->
                <div style="margin-bottom: 25px; font-size: 13px; color: #ccc; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px;">
                    <strong style="color: #d4af37; display: block; margin-bottom: 5px;">Billed To:</strong>
                    <div>Name: ${customer.name || 'N/A'}</div>
                    <div>Phone: ${customer.phone || 'N/A'}</div>
                    <div>Address: ${customer.address || 'N/A'}</div>
                </div>

                <!-- Items Table -->
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
                    <thead>
                        <tr style="background: rgba(212,175,55,0.15); color: #d4af37; text-align: left;">
                            <th style="padding: 10px; text-align: center;">#</th>
                            <th style="padding: 10px;">Item Description</th>
                            <th style="padding: 10px; text-align: center;">Qty</th>
                            <th style="padding: 10px; text-align: right;">Unit Price</th>
                            <th style="padding: 10px; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>

                <!-- Summary Calculation -->
                <div style="display: flex; justify-content: flex-end; font-size: 13px;">
                    <div style="width: 260px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Subtotal:</span>
                            <span>${this.currencySymbol}${calculated.subtotal}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #2ecc71;">
                            <span>Discount:</span>
                            <span>-${this.currencySymbol}${calculated.totalDiscount}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Shipping:</span>
                            <span>${this.currencySymbol}${calculated.shippingCost}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid rgba(212,175,55,0.4); font-weight: bold; font-size: 15px; color: #d4af37;">
                            <span>Grand Total:</span>
                            <span>${this.currencySymbol}${calculated.grandTotal}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Note -->
                <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px;">
                    Thank you for choosing ${this.brandName}. This is a system-generated invoice.
                </div>
            </div>
        `;
    }

    /**
     * Trigger browser window print for the generated invoice
     * @param {string} containerId 
     */
    printInvoice(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const printWindow = window.open('', '_blank', 'width=900,height=700');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Invoice - ${this.brandName}</title>
                    <style>
                        body { background: #0b0b0b; margin: 0; padding: 20px; }
                        @media print {
                            body { background: #fff !important; color: #000 !important; }
                            #rorraxyPrintableInvoice { background: #fff !important; color: #000 !important; border: none !important; }
                            h1, h3, strong, td, th { color: #000 !important; }
                        }
                    </style>
                </head>
                <body>
                    ${container.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    }
}

// Global instance initialization
const rorraxyInvoiceManager = new RorraxyInvoiceManager();

if (typeof window !== 'undefined') {
    window.RorraxyInvoiceManager = RorraxyInvoiceManager;
}

// Module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxyInvoiceManager;
}
