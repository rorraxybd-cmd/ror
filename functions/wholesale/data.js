export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB_WHOLESALE;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO wholesale_orders (buyer_name, bulk_item, quantity, total_amount, created_at) VALUES (?, ?, ?, ?, ?)")
                  .bind(data.buyer, data.item, data.qty, data.total, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Wholesale order placed!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM wholesale_orders ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
