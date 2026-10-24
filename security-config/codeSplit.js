/**
 * rorraxy - Advanced Dynamic Code Splitting & Lazy Script Loader
 * Description: Dynamically loads JavaScript modules and scripts on-demand, 
 * ensuring zero lag, reduced initial bundle size, and lightning-fast PWA performance.
 */

class RorraxyCodeSplitter {
    constructor() {
        this.loadedScripts = new Set();
    }

    loadScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            if (this.loadedScripts.has(scriptUrl)) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;

            script.onload = () => {
                this.loadedScripts.add(scriptUrl);
                resolve(true);
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${scriptUrl}`));
            };

            document.head.appendChild(script);
        });
    }

    async loadFeature(featureName) {
        switch (featureName) {
            case 'analytics':
                await this.loadScript('/advanced/behavioralAnalytics.js');
                break;
            case 'video':
                await this.loadScript('/ui/videoEmbedSanitizer.js');
                break;
            case 'validator':
                await this.loadScript('/ui/validator.js');
                break;
            case 'skeleton':
                await this.loadScript('/ui/skeleton.js');
                break;
            default:
                break;
        }
    }
}

const rorraxyCodeSplitter = new RorraxyCodeSplitter();

if (typeof window !== 'undefined') {
    window.RorraxyCodeSplitter = RorraxyCodeSplitter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxyCodeSplitter;
}
