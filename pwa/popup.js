/**
 * rorraxy - Ultimate Luxury & Transparent PWA Installation Popup Manager
 * Description: SVG vector logo integration (zero blur), smooth luxury loop animation,
 * revolving ecosystem tags (B2B, B2C, Solutions, Academy), and draggable session widget.
 */

(function () {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isInstalled = localStorage.getItem('rorraxy_app_installed');
    const isSessionDismissed = sessionStorage.getItem('rorraxy_session_dismissed');

    if (isStandalone || isInstalled === 'true') {
        return;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        :root {
            --gold-gradient: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
            --gold-solid: #d4af37;
            --text-white: #ffffff;
            --font-main: 'Poppins', sans-serif;
        }

        /* Fully Transparent Screen Overlay */
        .rorraxy-pwa-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            padding: 20px;
            box-sizing: border-box;
            animation: rorraxyFadeIn 0.2s ease forwards;
        }

        /* Completely Cardless & Transparent Popup Container */
        .rorraxy-pwa-card {
            width: 100%;
            max-width: 340px;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            text-align: center;
            position: relative;
            font-family: var(--font-main);
            color: var(--text-white);
            padding: 20px;
            cursor: grab;
            user-select: none;
            animation: rorraxyPopScale 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .rorraxy-pwa-card:active {
            cursor: grabbing;
        }

        /* Clean Close Button */
        .rorraxy-pwa-close {
            position: absolute;
            top: -10px;
            right: 5px;
            background: rgba(3, 3, 5, 0.95);
            border: 1.5px solid rgba(212, 175, 55, 0.7);
            color: var(--gold-solid);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
        }

        .rorraxy-pwa-close:hover { 
            background: var(--gold-gradient);
            color: #030305;
            transform: scale(1.12);
        }

        /* Luxury SVG Logo Container with Floating Animation */
        .rorraxy-pwa-logo-container {
            position: relative;
            width: 180px;
            height: 180px;
            margin: 0 auto 15px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: transparent !important;
            animation: rorraxyLuxuryFloat 3s ease-in-out infinite;
        }

        .rorraxy-pwa-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            position: relative;
            z-index: 3;
            background: transparent !important;
            filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.25));
        }

        /* Revolving Ecosystem Orbit Ring (B2B, B2C, Solutions, Academy) */
        .rorraxy-orbit-ring {
            position: absolute;
            width: 175px;
            height: 175px;
            border: 1px dashed rgba(212, 175, 55, 0.35);
            border-radius: 50%;
            animation: rorraxyOrbitSpin 12s linear infinite;
            pointer-events: none;
            z-index: 2;
        }

        .rorraxy-orbit-item {
            position: absolute;
            background: rgba(3, 3, 5, 0.9);
            border: 1px solid rgba(212, 175, 55, 0.6);
            color: var(--gold-solid);
            font-size: 7.5px;
            font-weight: 700;
            padding: 3px 7px;
            border-radius: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }

        /* Positioning Orbit Items around the circle */
        .item-1 { top: -6px; left: 50%; transform: translateX(-50%); }
        .item-2 { bottom: -6px; left: 50%; transform: translateX(-50%); }
        .item-3 { left: -10px; top: 50%; transform: translateY(-50%); }
        .item-4 { right: -10px; top: 50%; transform: translateY(-50%); }

        @media (max-width: 600px) {
            .rorraxy-pwa-logo-container {
                width: 150px;
                height: 150px;
            }
            .rorraxy-orbit-ring {
                width: 145px;
                height: 145px;
            }
            .rorraxy-pwa-logo {
                width: 100px;
                height: 100px;
            }
        }

        /* Slim & Compact Unified Install Button */
        .rorraxy-pwa-btn {
            background: var(--gold-gradient);
            color: #030305;
            border: none;
            padding: 8px 18px;
            font-size: 11px;
            font-weight: 800;
            border-radius: 16px;
            cursor: pointer;
            width: auto;
            min-width: 160px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: transform 0.15s ease, filter 0.15s ease;
            margin: 0 auto 8px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
        }

        .rorraxy-pwa-btn:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }

        .rorraxy-btn-title {
            font-size: 11.5px;
            font-weight: 800;
            letter-spacing: 1px;
        }

        .rorraxy-btn-devices {
            font-size: 7px;
            font-weight: 700;
            color: rgba(3, 3, 5, 0.85);
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        /* Fast Animated Luxury Bottom Line */
        .rorraxy-loop-line {
            width: 80px;
            height: 2px;
            background: var(--gold-gradient);
            margin: 8px auto 0 auto;
            border-radius: 2px;
            animation: rorraxyFastLinePulse 0.8s ease-in-out infinite;
        }

        /* Draggable Top Corner Widget */
        .rorraxy-minimal-widget {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(3, 3, 5, 0.95);
            border: 1px solid rgba(212, 175, 55, 0.4);
            padding: 6px 14px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 998;
            box-shadow: 0 4px 15px rgba(0,0,0,0.6);
            cursor: grab;
            user-select: none;
            font-family: var(--font-main);
        }

        .rorraxy-minimal-widget:active {
            cursor: grabbing;
        }

        .rorraxy-minimal-text {
            font-size: 10px;
            font-weight: 800;
            background: var(--gold-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            pointer-events: none;
        }

        @keyframes rorraxyFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes rorraxyPopScale {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes rorraxyLuxuryFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
        }

        @keyframes rorraxyOrbitSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes rorraxyFastLinePulse {
            0%, 100% { opacity: 0.5; transform: scaleX(0.75); }
            50% { opacity: 1; transform: scaleX(1); }
        }
    `;
    document.head.appendChild(style);

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    const triggerInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                localStorage.setItem('rorraxy_app_installed', 'true');
                const widget = document.getElementById('rorraxyMinimalWidget');
                if (widget) widget.remove();
            }
            deferredPrompt = null;
        } else {
            alert('আপনার ব্রাউজার মেনু থেকে "Add to Home Screen" বা "Install App" সিলেক্ট করুন।');
        }
    };

    const makeDraggable = (elm) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elm.onmousedown = dragMouseDown;
        elm.ontouchstart = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.target.closest('.rorraxy-pwa-close') || e.target.closest('.rorraxy-pwa-btn') || e.target.closest('.rorraxy-pwa-logo-container')) return;
            
            if (e.type === 'touchstart') {
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;
            } else {
                pos3 = e.clientX;
                pos4 = e.clientY;
            }
            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            pos3 = clientX;
            pos4 = clientY;
            elm.style.top = (elm.offsetTop - pos2) + "px";
            elm.style.left = (elm.offsetLeft - pos1) + "px";
            elm.style.right = "auto";
            elm.style.bottom = "auto";
            elm.style.transform = "none";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
        }
    };

    const createMinimalWidget = () => {
        if (document.getElementById('rorraxyMinimalWidget')) return;
        const widget = document.createElement('div');
        widget.id = 'rorraxyMinimalWidget';
        widget.className = 'rorraxy-minimal-widget';
        widget.innerHTML = `
            <span class="rorraxy-minimal-text"><i class="fa-solid fa-download"></i> INSTALL APP</span>
        `;
        
        widget.addEventListener('click', async (e) => {
            if (widget.dataset.dragged === 'true') {
                widget.dataset.dragged = 'false';
                return;
            }
            await triggerInstall();
        });

        let startX, startY;
        widget.addEventListener('mousedown', (e) => { startX = e.clientX; startY = e.clientY; });
        widget.addEventListener('mouseup', (e) => {
            if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
                widget.dataset.dragged = 'true';
            }
        });

        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.position = 'relative';
            mainContainer.appendChild(widget);
        } else {
            document.body.appendChild(widget);
        }

        makeDraggable(widget);
    };

    if (isSessionDismissed === 'true') {
        createMinimalWidget();
        return;
    }

    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.className = 'rorraxy-pwa-overlay';
        overlay.innerHTML = `
            <div class="rorraxy-pwa-card" id="rorraxyPwaCard">
                <button class="rorraxy-pwa-close" id="rorraxyPwaClose">&times;</button>
                <div class="rorraxy-pwa-logo-container" id="rorraxyLogoClick">
                    <div class="rorraxy-orbit-ring">
                        <span class="rorraxy-orbit-item item-1">B2B</span>
                        <span class="rorraxy-orbit-item item-2">B2C</span>
                        <span class="rorraxy-orbit-item item-3">Solutions</span>
                        <span class="rorraxy-orbit-item item-4">Academy</span>
                    </div>
                    <img src="https://rorraxy.com/512svg.svg" alt="rorraxy" class="rorraxy-pwa-logo">
                </div>
                <div>
                    <button id="rorraxyPwaInstallBtn" class="rorraxy-pwa-btn">
                        <span class="rorraxy-btn-title">Install App</span>
                        <span class="rorraxy-btn-devices">Android / iOS / Mac / Windows</span>
                    </button>
                </div>
                <div class="rorraxy-loop-line"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        makeDraggable(document.getElementById('rorraxyPwaCard'));

        const dismissPopup = () => {
            sessionStorage.setItem('rorraxy_session_dismissed', 'true');
            overlay.remove();
            createMinimalWidget();
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                dismissPopup();
            }
        });

        document.getElementById('rorraxyPwaClose').addEventListener('click', (e) => {
            e.stopPropagation();
            dismissPopup();
        });

        document.getElementById('rorraxyLogoClick').addEventListener('click', async (e) => {
            e.stopPropagation();
            await triggerInstall();
        });

        document.getElementById('rorraxyPwaInstallBtn').addEventListener('click', async (e) => {
            e.stopPropagation();
            await triggerInstall();
        });
    }, 500);
})();
