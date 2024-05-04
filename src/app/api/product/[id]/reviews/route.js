import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  const reviews =
    await sql`select * from reviews where ref_product = ${params.id}`;

  return Response.json(reviews.rows.length > 0 ? reviews.rows : null);
}

export async function POST(req, { params }) {
  const { name, text } = await req.json();

  const insertResponse =
    await sql`insert into reviews (name, text, ref_product) values (${name}, ${text}, ${params.id})`;

  const reviews =
    await sql`select * from reviews where ref_product = ${params.id}`;

  return Response.json(reviews.rows);
}
