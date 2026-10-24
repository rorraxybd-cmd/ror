export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB_ACADEMY;

    if (request.method === "POST") {
        const data = await request.json();
        await db.prepare("INSERT INTO enrollments (student_name, email, course_id, created_at) VALUES (?, ?, ?, ?)")
                  .bind(data.name, data.email, data.courseId, new Date().toISOString()).run();
        return new Response(JSON.stringify({ success: true, message: "Enrolled successfully!" }), { headers: { "Content-Type": "application/json" } });
    }

    const { results } = await db.prepare("SELECT * FROM enrollments ORDER BY id DESC LIMIT 50").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}
