"use client";
import { useEffect, useState } from "react";

export default function Reviews(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/product/${props.id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    const payload = { name, text };

    fetch(`/api/product/${props.id}/reviews`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((responseData) => {
        setName("");
        setText("");
        setData(responseData);
      })
      .catch((err) => {
        console.err(err);
      });
  };

  if (!data) return <p>No reviews</p>;

  if (isLoading)
    return (
      <div className="w-6/12 lg:w-1/2 py-6 md:py-12 lg:py-16">
        Loading reviews...
      </div>
    );

  return (
    <section className="w-6/12 lg:w-1/2 py-6 md:py-12 lg:py-16">
      <div className="container grid items-start gap-8 lg:grid-cols-1 px-4 md:px-6">
        {data.map((r) => {
          return (
            <div key={r.id} className="border-2 rounded-lg p-2 border-gray-500">
              <p className="">{r.name}</p>
              <p className="text-zinc-400">{r.text}</p>
            </div>
          );
        })}
      </div>
      <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-4">
        Post a review
      </p>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <br />
        <textarea
          placeholder="Write a review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        ></textarea>
        <button
          onClick={submitForm}
          className="bg-transparent text-white font-semibold hover:text-white py-2 px-4 border border-white rounded mt-5"
        >
          Save
        </button>
      </form>
    </section>
  );
}
