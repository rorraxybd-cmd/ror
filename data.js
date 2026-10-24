/**
 * RORRAXY ENTERPRISE - CENTRAL DATA ORCHESTRATOR (data.js)
 * File Location: /data.js
 */

export const RorraxyData = {
    async send(moduleName, payload) {
        try {
            const res = await fetch(`/${moduleName}/data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            return await res.json();
        } catch (err) {
            console.error(`[rorraxy Data Send Error - ${moduleName}]:`, err);
            return { success: false, error: err.message };
        }
    },

    async fetch(moduleName) {
        try {
            const res = await fetch(`/${moduleName}/data`);
            return await res.json();
        } catch (err) {
            console.error(`[rorraxy Data Fetch Error - ${moduleName}]:`, err);
            return [];
        }
    }
};

// গ্লোবাল এক্সেস সুবিধা
window.RorraxyData = RorraxyData;
