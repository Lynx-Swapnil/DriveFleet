import BookingCard from "@/components/BookingCard";
import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await apiFetch(`/cars/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    notFound();
  }

  const car = await res.json();
  const {
    carName,
    carType,
    seatCapacity,
    pickupLocation,
    imageUrl,
    dailyRentPrice,
    description,
    availabilityStatus,
  } = car;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Car Details</h1>
      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        <section className="flex-1">
          <Image
            src={imageUrl}
            alt={carName}
            width={700}
            height={450}
            className="w-full rounded-xl object-cover shadow-lg dark:shadow-xl"
          />
          <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">{carName}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
          <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500"></span>
              <span><strong>Type:</strong> {carType}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500"></span>
              <span><strong>Seats:</strong> {seatCapacity}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500"></span>
              <span><strong>Pickup:</strong> {pickupLocation}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500"></span>
              <span className="text-lg font-semibold text-cyan-700 dark:text-cyan-400"><strong>Daily rent:</strong> ৳{dailyRentPrice}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <span><strong>Status:</strong> {availabilityStatus}</span>
            </li>
          </ul>
        </section>
        <aside className="w-full lg:max-w-md">
          <BookingCard car={car} />
        </aside>
      </div>
    </main>
  );
}
