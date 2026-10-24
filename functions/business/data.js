export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB_BUSINESS;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO leads (company_name, contact_person, phone, service_req, created_at) VALUES (?, ?, ?, ?, ?)")
                  .bind(data.company, data.contact, data.phone, data.service, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Lead submitted successfully!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM leads ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
