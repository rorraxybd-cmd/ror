export const RorraxyMedia = {
    async uploadImage(moduleName, file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`/${moduleName}/image`, { method: 'POST', body: formData });
        return await res.json();
    },
    async uploadVideo(moduleName, file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`/${moduleName}/video`, { method: 'POST', body: formData });
        return await res.json();
    }
};
window.RorraxyMedia = RorraxyMedia;
