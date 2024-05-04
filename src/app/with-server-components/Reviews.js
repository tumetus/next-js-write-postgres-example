import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const getReviews = async (id) => {
  const reviews = await sql`select * from reviews where ref_product = ${id}`;
  return reviews.rows ? reviews.rows : [];
};

export default async function Reviews(props) {
  const submitForm = async (formData) => {
    "use server";
    await sql`insert into reviews (name, text, ref_product) values (${formData.get(
      "name"
    )}, ${formData.get("text")}, ${formData.get("id")})`;

    revalidatePath("/with-server-components");
  };

  const data = await getReviews(props.id);

  return (
    <section className="w-6/12 lg:w-1/2 py-6 md:py-12 lg:py-16">
      <div className="container grid items-start gap-8 lg:grid-cols-1 px-4 md:px-6">
        {data &&
          data.map(({ id, name, text }) => {
            return (
              <div key={id} className="border-2 rounded-lg p-2 border-gray-500">
                <p className="">{name}</p>
                <p className="text-zinc-400">{text}</p>
              </div>
            );
          })}
      </div>
      <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Post a review
      </p>
      <form action={submitForm}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <br />
        <textarea
          placeholder="Write a review..."
          name="text"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        ></textarea>
        <input type="hidden" value={props.id} name="id" />
        <button
          type="submit"
          className="bg-transparent text-white font-semibold hover:text-white py-2 px-4 border border-white rounded mt-5"
        >
          Save
        </button>
      </form>
    </section>
  );
}
