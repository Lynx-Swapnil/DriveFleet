"use client";

import { EditModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";

export default function MyCarCard({ car }) {
  const {
    carName,
    carType,
    seatCapacity,
    pickupLocation,
    imageUrl,
    dailyRentPrice,
    availabilityStatus,
  } = car;

  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-md">
      <Image
        src={imageUrl}
        alt={carName}
        width={400}
        height={240}
        className="h-48 w-full rounded-lg object-cover"
      />
      <h2 className="mt-4 text-xl font-semibold">{carName}</h2>
      <p className="text-slate-600">Type: {carType}</p>
      <p className="text-slate-600">Seats: {seatCapacity}</p>
      <p className="text-slate-600">Pickup: {pickupLocation}</p>
      <p className="mt-1 font-medium text-cyan-700">
        ৳{dailyRentPrice}{" "}
        <span className="text-sm font-normal text-slate-500">/ day</span>
      </p>
      <span
        className={`mt-2 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-medium ${
          availabilityStatus === "Available"
            ? "bg-green-100 text-green-800"
            : "bg-amber-100 text-amber-800"
        }`}
      >
        {availabilityStatus}
      </span>
      <div className="mt-4 flex flex-wrap gap-2">
        <EditModal car={car} />
        <DeleteAlert car={car} redirectTo="/my-added-cars" />
      </div>
    </article>
  );
}
