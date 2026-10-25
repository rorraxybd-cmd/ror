export async function onRequest(context) {
    const { request, env } = context;
    const db = env.retail; // Cloudflare D1 Database Binding

    // ১. প্রোডাক্ট ডেটা জমা নেওয়া (POST Request)
    if (request.method === "POST") {
        try {
            const data = await request.json();
            
            await db.prepare(
                `INSERT INTO products (title, price, category, stock, image_url, video_url, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            ).bind(
                data.title, 
                data.price, 
                data.category, 
                data.stock, 
                data.imageUrl || "", 
                data.videoUrl || "", 
                new Date().toISOString()
            ).run();

            return new Response(JSON.stringify({ success: true, message: "Retail product saved successfully!" }), { 
                headers: { "Content-Type": "application/json" } 
            });
        } catch (err) {
            return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
        }
    }

    // ২. প্রোডাক্ট লিস্ট ফেচ করা (GET Request)
    try {
        const { results } = await db.prepare("SELECT * FROM products ORDER BY id DESC").all();
        return new Response(JSON.stringify(results), { 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
