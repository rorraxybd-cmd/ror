// /fetch.js - Master Fetch Bridge
export const RorraxyFetch = {
    // ১. যেকোনো নির্দিষ্ট মডিউল থেকে সমস্ত ডাটা টেনে আনা
    async getModuleData(moduleName, params = {}) {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await fetch(`/${moduleName}/data?${query}`);
            return await res.json();
        } catch (err) {
            console.error(`Error fetching data from ${moduleName}:`, err);
            return [];
        }
    },

    // ২. আইডি (ID) দিয়ে একক কোনো নির্দিষ্ট প্রোডাক্ট বা আইটেম ফেচ করা
    async getItemById(moduleName, itemId) {
        try {
            const res = await fetch(`/${moduleName}/data?id=${itemId}`);
            return await res.json();
        } catch (err) {
            console.error(`Error fetching item ${itemId} from ${moduleName}:`, err);
            return null;
        }
    }
};

window.RorraxyFetch = RorraxyFetch;
