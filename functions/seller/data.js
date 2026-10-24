export async function onRequest(context) {
    const { request, env } = context;
    const db = env.seller;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO store_details (seller_name, shop_title, nid_verified, created_at) VALUES (?, ?, ?, ?)")
                  .bind(data.seller, data.shopTitle, data.verified ? 1 : 0, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Seller store updated!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM store_details ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
