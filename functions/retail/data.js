export async function onRequest(context) {
    const { request, env } = context;
    const db = env.retail;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO products (title, price, category, stock, image_url, video_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
                  .bind(data.title, data.price, data.category, data.stock, data.imageUrl || "", data.videoUrl || "", new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Retail product saved!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM products ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
