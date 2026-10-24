export async function onRequest(context) {
    const { request, env } = context;
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file) return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });

        const fileName = `img-${Date.now()}-${file.name}`;
        await env.image.put(fileName, file.stream(), { httpMetadata: { contentType: file.type } });

        return new Response(JSON.stringify({ success: true, url: `https://media.rorraxy.com/images/${fileName}` }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
