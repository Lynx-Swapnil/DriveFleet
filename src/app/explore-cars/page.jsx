import CarCard from "@/components/CarCard";
import { apiFetch } from "@/lib/api";

export default async function ExploreCarsPage() {
  let cars = [];
  try {
    const res = await apiFetch("/cars");
    if (res.ok) {
      cars = await res.json();
    }
  } catch {
    cars = [];
  }

  if (!Array.isArray(cars)) {
    cars = [];
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Explore Cars</h1>
      <p className="mt-2 text-slate-600">
        Browse all vehicles including unavailable listings.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
      {cars.length === 0 && (
        <p className="mt-12 text-center text-slate-500">No cars found.</p>
      )}
    </main>
  );
}
