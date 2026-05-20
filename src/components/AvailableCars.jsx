import CarCard from "@/components/CarCard";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function AvailableCars({ cars = [] }) {
  const displayCars = cars.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Available Cars</h2>
          <p className="mt-2 text-slate-600">
            Browse our latest fleet — book your favorite today.
          </p>
        </div>
        <Link href="/explore-cars">
          <Button variant="outline">View All Cars</Button>
        </Link>
      </header>
      {displayCars.length === 0 ? (
        <p className="text-center text-slate-500">No cars available right now.</p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {displayCars.map((car) => (
            <li key={car._id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
