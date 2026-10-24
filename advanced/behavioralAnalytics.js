/**
 * rorraxy - Advanced Behavioral Analytics & Smart Recommendation Tracker
 * Description: Monitors user interactions, click flows, scroll depth, session duration, 
 * and tracks user product category preferences for personalized recommendations.
 */

class RorraxyBehavioralAnalytics {
    constructor() {
        this.sessionId = 'rorraxy_session_' + Math.random().toString(36).substring(2, 9);
        this.startTime = Date.now();
        this.eventsQueue = [];
        this.initTracking();
    }

    initTracking() {
        window.addEventListener('beforeunload', () => {
            this.flushAnalytics('session_end');
        });

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (docHeight > 0) {
                Math.round((scrollTop / docHeight) * 100);
            }
        }, { passive: true });

        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-analytics-action]');
            if (target) {
                const actionName = target.getAttribute('data-analytics-action');
                const category = target.getAttribute('data-product-category');
                
                this.logEvent('user_click', { action: actionName, category: category, timestamp: Date.now() });

                if (category) {
                    this.updateUserPreference(category);
                }
            }
        });
    }

    updateUserPreference(category) {
        try {
            let preferences = JSON.parse(localStorage.getItem('rorraxy_user_preferences') || '{}');
            preferences[category] = (preferences[category] || 0) + 1;
            localStorage.setItem('rorraxy_user_preferences', JSON.stringify(preferences));
        } catch (e) {
            // Safe preference storage fallback
        }
    }

    getTopPreferredCategory() {
        try {
            let preferences = JSON.parse(localStorage.getItem('rorraxy_user_preferences') || '{}');
            let topCategory = null;
            let maxClicks = 0;

            for (let cat in preferences) {
                if (preferences[cat] > maxClicks) {
                    maxClicks = preferences[cat];
                    topCategory = cat;
                }
            }
            return maxClicks >= 3 ? topCategory : null;
        } catch (e) {
            return null;
        }
    }

    logEvent(eventName, eventData = {}) {
        const payload = {
            sessionId: this.sessionId,
            event: eventName,
            data: eventData,
            url: window.location.href,
            timeElapsed: Math.round((Date.now() - this.startTime) / 1000)
        };

        this.eventsQueue.push(payload);

        if (this.eventsQueue.length >= 5) {
            this.flushAnalytics('batch_sync');
        }
    }

    flushAnalytics(triggerReason) {
        if (this.eventsQueue.length === 0) return;

        const batchData = {
            reason: triggerReason,
            sessionDuration: Math.round((Date.now() - this.startTime) / 1000),
            events: [...this.eventsQueue]
        };

        try {
            const existingLogs = JSON.parse(localStorage.getItem('rorraxy_analytics_logs') || '[]');
            localStorage.setItem('rorraxy_analytics_logs', JSON.stringify([...existingLogs, batchData].slice(-50)));
            this.eventsQueue = [];
        } catch (e) {
            // Safe analytics log storage fallback
        }
    }
}

const rorraxyAnalytics = new RorraxyBehavioralAnalytics();

if (typeof window !== 'undefined') {
    window.RorraxyBehavioralAnalytics = RorraxyBehavioralAnalytics;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxyBehavioralAnalytics;
}
