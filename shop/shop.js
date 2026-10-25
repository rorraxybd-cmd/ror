/* ==========================================================
   MR. MASUDAR ENTERPRISE - MASTER SHOP JS
   ================================================---------- */

window.switchSpaView = function(viewId) {
    document.querySelectorAll('.spa-view-section').forEach(sec => {
        sec.classList.remove('active-view');
    });
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active-view');
        window.scrollTo(0, 0);
    }
};

window.openProductDetails = function(productId) {
    window.switchSpaView('productDetailsView');
    const titleEl = document.getElementById('detailsTitle');
    const contentEl = document.getElementById('detailsContentContainer');
    if (titleEl) titleEl.innerText = `Product Details: ${productId}`;
    if (contentEl) contentEl.innerHTML = `<p style="color:var(--text-white);">Loading specifications for ${productId}...</p>`;
};

window.navigateTo = function(url) {
    window.location.href = url;
};

window.openYouMenuModal = function(event) {
    if(event) event.stopPropagation();
    closeAllModals();
    const modal = document.getElementById('youMenuModalOverlay');
    if(modal) modal.style.display = 'flex';
};

window.closeYouMenuModal = function() {
    const modal = document.getElementById('youMenuModalOverlay');
    if(modal) modal.style.display = 'none';
};

window.closeAllModals = function() {
    document.querySelectorAll('.luxury-center-modal-overlay').forEach(m => m.style.display = 'none');
};

// লাইক টগল এবং সর্বাধিক লাইকপ্রাপ্ত প্রোডাক্টগুলো হোমপেজে স্বয়ংক্রিয়ভাবে উপরে নিয়ে আসার সর্টিং লজিক
window.toggleLove = function(event, btn) {
    event.stopPropagation();
    let countSpan = btn.querySelector('.love-count');
    let currentLikes = parseInt(countSpan.innerText);
    let card = btn.closest('.product-card');
    
    if(btn.classList.contains('gold-active')) {
        btn.classList.remove('gold-active');
        currentLikes -= 1;
    } else {
        btn.classList.add('gold-active');
        currentLikes += 1;
    }
    countSpan.innerText = currentLikes;
    if(card) card.setAttribute('data-likes', currentLikes);
    
    sortProductsByLikesAndNewness();
};

window.sortProductsByLikesAndNewness = function() {
    const feedContainer = document.getElementById('productFeed');
    if (!feedContainer) return;

    let cards = Array.from(feedContainer.getElementsByClassName('product-card'));
    cards.sort((a, b) => {
        let likesA = parseInt(a.getAttribute('data-likes')) || 0;
        let likesB = parseInt(b.getAttribute('data-likes')) || 0;
        return likesB - likesA; // বেশি লাইকগুলো প্রথমে দেখাবে
    });

    cards.forEach(card => feedContainer.appendChild(card));
};

// শেয়ার পপআপ হ্যান্ডলার
window.openInlineShare = function(event, btn) {
    event.stopPropagation();
    document.querySelectorAll('.inline-card-share-popup').forEach(p => p.style.display = 'none');
    let card = btn.closest('.product-card');
    let popup = card.querySelector('.inline-card-share-popup');
    if(popup) popup.style.display = 'flex';
};

window.closeInlineShare = function(event, btn) {
    event.stopPropagation();
    let popup = btn.closest('.inline-card-share-popup');
    if(popup) popup.style.display = 'none';
};

window.shareToSocial = function(btn, platform) {
    let card = btn.closest('.product-card');
    let urlInput = card.querySelector('.glass-copy-input');
    let shareUrl = urlInput ? urlInput.value : window.location.href;
    let text = "Check out this luxury craft on Mr. Masudar Enterprise:";

    let shareLink = "";
    if (platform === 'whatsapp') {
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + shareUrl)}`;
    } else {
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }

    if (shareLink) {
        window.open(shareLink, '_blank');
    }
};

window.copyLinkDirectSilent = function(btn) {
    let card = btn.closest('.product-card');
    let inputField = card.querySelector('.glass-copy-input');
    if (inputField && navigator.clipboard) {
        navigator.clipboard.writeText(inputField.value).then(() => {
            let originalText = btn.innerText;
            btn.innerText = "COPIED!";
            setTimeout(() => { 
                btn.innerText = originalText; 
                let popup = btn.closest('.inline-card-share-popup'); 
                if(popup) popup.style.display = 'none'; 
            }, 800);
        });
    }
};

// কার্ট ব্যাজ কাউন্ট আপডেট ফাংশন
window.updateCartBadgeCount = function() {
    let cart = JSON.parse(localStorage.getItem('rorraxy_cart')) || [];
    let totalQty = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0);
    
    let badge = document.getElementById('floatingCartItemCountBadge');
    if(badge) {
        badge.innerText = totalQty;
        if(totalQty > 0) {
            badge.classList.remove('empty-badge');
        } else {
            badge.classList.add('empty-badge');
        }
    }
};

// পেজ লোড হওয়ার পর ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', () => {
    console.log("Mr. Masudar Enterprise Master Shop JS Initialized.");
    sortProductsByLikesAndNewness();
    updateCartBadgeCount();

    // মডালের বাইরে ক্লিক করলে বন্ধ করার লজিক
    document.querySelectorAll('.luxury-center-modal-overlay').forEach(modal => {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeAllModals();
            }
        };
    });

    setInterval(() => {
        updateCartBadgeCount();
    }, 1000);
});
