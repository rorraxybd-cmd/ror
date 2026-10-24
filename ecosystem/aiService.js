/* ==========================================================================
   RORRAXY GLOBAL ECOSYSTEM - ADVANCED AI SERVICE & CORE CONTROLLER
   Hybrid Search Engine, Localization, Secure PWA & Gemini AI Gateway
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLocalization();
    initPWAHandlers();
    initHybridSearchEngine();
});

function initLocalization() {
    const userLang = navigator.language || navigator.userLanguage || 'en';
    if (userLang.startsWith('bn')) {
        document.documentElement.setAttribute('lang', 'bn');
    } else {
        document.documentElement.setAttribute('lang', 'en');
    }
}

function initPWAHandlers() {
    let deferredPrompt = null;
    const modal = document.getElementById('rorraxyPwaModal');
    const persistentContainer = document.getElementById('persistentInstallContainer');
    const persistentBtn = document.getElementById('persistentInstallBtn');
    const installBtn = document.getElementById('rorraxyInstallBtn');
    const closeBtn = document.getElementById('rorraxyCloseBtn');
    const timerBar = document.getElementById('rorraxyTimerBar');

    let timerTimeout, barTimeout;

    function isAlreadyInstalled() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
        try {
            return isStandalone || localStorage.getItem('rorraxy_installed') === 'true';
        } catch(e) {
            return isStandalone;
        }
    }

    if (isAlreadyInstalled()) {
        if (persistentContainer) persistentContainer.style.display = 'none';
        return;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    setTimeout(() => {
        if (modal && !isAlreadyInstalled()) {
            modal.style.display = 'flex';
            if (timerBar) {
                timerBar.style.width = '100%';
                barTimeout = setTimeout(() => { timerBar.style.width = '0%'; }, 50);
            }
            timerTimeout = setTimeout(hidePopup, 15000);
        }
    }, 3000);

    function hidePopup() {
        if (!modal) return;
        modal.style.display = 'none';
        clearTimeout(timerTimeout);
        clearTimeout(barTimeout);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            saveInstallState();
            hidePopup();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                saveInstallState();
                hidePopup();
            }
        });
    }

    async function triggerInstall() {
        saveInstallState();
        hidePopup();
        if (persistentContainer) persistentContainer.style.display = 'none';

        if (deferredPrompt) {
            deferredPrompt.prompt();
            let choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    }

    if (installBtn) installBtn.addEventListener('click', triggerInstall);
    if (persistentBtn) persistentBtn.addEventListener('click', triggerInstall);

    function saveInstallState() {
        try {
            localStorage.setItem('rorraxy_installed', 'true');
        } catch(e) {}
    }
}

function initHybridSearchEngine() {
    window.rorraxySearchQuery = async function(queryText) {
        if (!queryText || typeof queryText !== 'string') {
            return { source: 'error', data: 'Invalid query input.' };
        }
        
        let localResult = await searchInLocalDatabase(queryText);
        if (localResult) {
            return { source: 'local', data: localResult };
        }

        let aiResult = await fetchGeminiAIResponse(queryText);
        return { source: 'ai', data: aiResult };
    };
}

async function searchInLocalDatabase(keyword) {
    try {
        let response = await fetch('/data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        let db = await response.json();
        
        const cleanKeyword = keyword.toLowerCase().trim();

        let matchedItem = db.rules?.find(r => r.keyword.toLowerCase().includes(cleanKeyword));
        if (matchedItem) return matchedItem;

        let matchedProduct = db.products?.find(p => p.name.toLowerCase().includes(cleanKeyword));
        if (matchedProduct) return matchedProduct;

    } catch (e) {
        // Safe local fallback
    }
    return null;
}

async function fetchGeminiAIResponse(promptText) {
    try {
        const response = await fetch('https://api.rorraxy.com/v1/ai-gateway', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Ecosystem-Client': 'rorraxy-pwa'
            },
            body: JSON.stringify({ prompt: promptText, timestamp: Date.now() })
        });

        if (!response.ok) {
            throw new Error(`AI Gateway error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.output || "Rorraxy AI: Processing completed successfully.";

    } catch (error) {
        return {
            fallback: true,
            message: "Rorraxy AI Gateway: You are currently offline or the AI service is unreachable. Showing standard ecosystem results."
        };
    }
}
