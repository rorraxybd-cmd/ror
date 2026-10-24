export async function onRequest(context) {
    const { request, env } = context;
    const db = env.affiliate;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO affiliate_users (user_id, ref_code, earnings, created_at) VALUES (?, ?, ?, ?)")
                  .bind(data.userId, data.refCode, data.earnings || 0, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Affiliate registered!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM affiliate_users ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
