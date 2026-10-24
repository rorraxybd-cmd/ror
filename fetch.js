// /fetch.js (Master Output Bridge)
export const RorraxyFetch = {
    // ১. যেকোনো নির্দিষ্ট মডিউল (retail, wholesale, academy ইত্যাদি) থেকে ডাটা আনার জন্য
    async getModuleData(moduleName, params = {}) {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await fetch(`/${moduleName}/data?${query}`);
            return await res.json();
        } catch (err) {
            console.error("Data fetch error:", err);
            return [];
        }
    },

    // ২. একক কোনো নির্দিষ্ট প্রোডাক্টের ডিটেইলস আনার জন্য
    async getSingleItem(moduleName, itemId) {
        try {
            const res = await fetch(`/${moduleName}/data?id=${itemId}`);
            return await res.json();
        } catch (err) {
            console.error("Item fetch error:", err);
            return null;
        }
    }
};

window.RorraxyFetch = RorraxyFetch;
