/**
 * rorraxy - Advanced Offline-First Sync Manager
 * Description: Automatically detects network status, queues offline actions, 
 * and securely syncs data to the backend once connection is restored.
 */

class RorraxySyncManager {
    constructor() {
        this.syncQueueKey = 'rorraxy_offline_sync_queue';
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    initListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    enqueueTask(taskData) {
        try {
            const queue = JSON.parse(localStorage.getItem(this.syncQueueKey) || '[]');
            queue.push({
                ...taskData,
                timestamp: Date.now()
            });
            localStorage.setItem(this.syncQueueKey, JSON.stringify(queue));

            if (this.isOnline) {
                this.processQueue();
            }
        } catch (e) {
            // Safe error handler
        }
    }

    async processQueue() {
        if (!this.isOnline) return;

        try {
            const queue = JSON.parse(localStorage.getItem(this.syncQueueKey) || '[]');
            if (queue.length === 0) return;

            const response = await fetch('https://api.rorraxy.com/v1/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Ecosystem-Client': 'rorraxy-pwa'
                },
                body: JSON.stringify({ items: queue })
            });

            if (response.ok) {
                localStorage.removeItem(this.syncQueueKey);
            }
        } catch (error) {
            // Graceful retry handling on unstable network
        }
    }
}

const rorraxySyncManager = new RorraxySyncManager();

if (typeof window !== 'undefined') {
    window.RorraxySyncManager = RorraxySyncManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxySyncManager;
}
