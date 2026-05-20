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
    <article className="flex flex-col h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={carName}
          width={400}
          height={240}
          className="h-48 w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{carName}</h2>
      <p className="text-slate-600 dark:text-slate-300 text-sm">Type: <span className="font-medium">{carType}</span></p>
      <p className="text-slate-600 dark:text-slate-300 text-sm">Seats: <span className="font-medium">{seatCapacity}</span></p>
      <p className="text-slate-600 dark:text-slate-300 text-sm">Pickup: <span className="font-medium">{pickupLocation}</span></p>
      <p className="mt-3 font-semibold text-cyan-700 dark:text-cyan-400 text-lg">
        ৳{dailyRentPrice}{" "}
        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ day</span>
      </p>
      <span
        className={`mt-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          availabilityStatus === "Available"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
        }`}
      >
        {availabilityStatus}
      </span>
      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        <EditModal car={car} />
        <DeleteAlert car={car} redirectTo="/my-added-cars" />
      </div>
    </article>
  );
}
