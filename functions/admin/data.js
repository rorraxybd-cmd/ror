export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB_ADMIN;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO system_logs (action, admin_id, details, created_at) VALUES (?, ?, ?, ?)")
                  .bind(data.action, data.adminId, JSON.stringify(data.details), new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Admin log inserted!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM system_logs ORDER BY id DESC LIMIT 100").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
