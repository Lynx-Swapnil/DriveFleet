"use client";

import { EditModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import { FaCar, FaLocationDot, FaUsers, FaTag, FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

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
    <motion.article 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600">
        <Image
          src={imageUrl}
          alt={carName}
          width={400}
          height={240}
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${
              availabilityStatus === "Available"
                ? "bg-green-500/90 text-white"
                : "bg-amber-500/90 text-white"
            }`}
          >
            {availabilityStatus === "Available" ? (
              <span className="flex items-center gap-1">
                <FaCheck className="h-3 w-3" />
                Available
              </span>
            ) : (
              "Not Available"
            )}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-5">
        {/* Title and Type */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {carName}
          </h2>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
              <FaTag className="text-sm text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
              {carType}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 mb-4 border-y border-slate-200 dark:border-slate-700 py-4">
          {/* Seats */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FaUsers className="text-sm text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">SEATING</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {seatCapacity} {seatCapacity === 1 ? "Seat" : "Seats"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <FaLocationDot className="text-sm text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">PICKUP</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {pickupLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-5 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-1">
            DAILY RATE
          </p>
          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            ৳{dailyRentPrice}
            <span className="text-xs font-normal text-slate-600 dark:text-slate-400 ml-1">
              /day
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <EditModal car={car} />
          <DeleteAlert car={car} redirectTo="/my-added-cars" />
        </div>
      </div>
    </motion.article>
  );
}
