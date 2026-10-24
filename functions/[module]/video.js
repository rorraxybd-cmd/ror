export async function onRequest(context) {
    const { request, env } = context;
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file) return new Response(JSON.stringify({ error: "No video provided" }), { status: 400 });

        const fileName = `vid-${Date.now()}-${file.name}`;
        await env.video.put(fileName, file.stream(), { httpMetadata: { contentType: file.type } });

        return new Response(JSON.stringify({ success: true, url: `https://media.rorraxy.com/videos/${fileName}` }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
