/**
 * rorraxy - Single-Domain SPA Router Manager
 * Description: Handles client-side navigation across ecosystem hubs 
 * without full page reloads for lightning-fast PWA performance.
 */

class RorraxyRouter {
    constructor() {
        this.routes = {
            "/": "/index.html",
            "/retail": "/retail/index.html",
            "/wholesale": "/wholesale/index.html",
            "/solutions": "/solutions/index.html",
            "/academy": "/academy/index.html",
            "/management/managing.html": "/management/managing.html"
        };
        
        this.initRouter();
    }

    initRouter() {
        document.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            if (targetLink && targetLink.href && targetLink.origin === window.location.origin) {
                const path = new URL(targetLink.href).pathname;
                
                if (this.routes[path] || path.startsWith('/management/')) {
                    e.preventDefault();
                    this.navigateTo(path);
                }
            }
        });

        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }

    async navigateTo(path) {
        window.history.pushState({}, '', path);
        await this.handleRoute(path);
    }

    async handleRoute(path) {
        console.log(`rorraxy Router: Navigating to -> ${path}`);
        try {
            const response = await fetch(path);
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                const newMainContent = doc.querySelector('main') || doc.body;
                const currentMain = document.querySelector('main') || document.body;
                
                if (newMainContent && currentMain) {
                    currentMain.innerHTML = newMainContent.innerHTML;
                    window.scrollTo(0, 0);
                }
            }
        } catch (error) {
            console.warn("rorraxy Router: Network request failed, falling back to PWA cache.", error);
        }
    }
}

const rorraxyRouter = new RorraxyRouter();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxyRouter;
}
