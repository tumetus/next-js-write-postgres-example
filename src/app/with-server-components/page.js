import Reviews from "./Reviews";

export default function ProductPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-5xl tracking-tighter text-center">awesome store</h1>
      <Reviews id={1} />
    </div>
  );
}
