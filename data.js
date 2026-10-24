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
            return { success: false, error: err.message };
        }
    },
    async fetch(moduleName) {
        try {
            const res = await fetch(`/${moduleName}/data`);
            return await res.json();
        } catch (err) {
            return [];
        }
    }
};
window.RorraxyData = RorraxyData;
