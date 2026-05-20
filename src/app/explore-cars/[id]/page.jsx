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
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Car Details</h1>
      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        <section className="flex-1">
          <Image
            src={imageUrl}
            alt={carName}
            width={700}
            height={450}
            className="w-full rounded-lg object-cover"
          />
          <h2 className="mt-6 text-2xl font-semibold">{carName}</h2>
          <p className="mt-2 text-slate-600">{description}</p>
          <ul className="mt-6 space-y-2 text-slate-700">
            <li>
              <strong>Type:</strong> {carType}
            </li>
            <li>
              <strong>Seats:</strong> {seatCapacity}
            </li>
            <li>
              <strong>Pickup:</strong> {pickupLocation}
            </li>
            <li>
              <strong>Daily rent:</strong> ৳{dailyRentPrice}
            </li>
            <li>
              <strong>Status:</strong> {availabilityStatus}
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
