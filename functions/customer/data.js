export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB_CUSTOMER;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO profiles (name, email, phone, address, updated_at) VALUES (?, ?, ?, ?, ?)")
                  .bind(data.name, data.email, data.phone, data.address, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Profile saved!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM profiles ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
