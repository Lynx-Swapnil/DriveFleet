"use client";

import { EditModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import {
  FaLocationDot,
  FaUsers,
  FaTag,
  FaCheck,
} from "react-icons/fa6";
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
      className="w-full flex flex-col sm:flex-row h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-md dark:shadow-lg transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-96 h-48 sm:h-auto bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 flex-shrink-0 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl">
        
        <Image
          src={imageUrl}
          alt={carName}
          width={400}
          height={300}
          className="h-full w-full object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
        />

        {/* Availability Badge */}
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
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
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

        {/* Details */}
        <div className="flex gap-4 mb-4 flex-wrap">
          
          {/* Seats */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FaUsers className="text-sm text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                SEATS
              </p>

              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {seatCapacity}
              </p>
            </div>
          </div>

          {/* Pickup */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <FaLocationDot className="text-sm text-orange-600 dark:text-orange-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                PICKUP
              </p>

              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {pickupLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
          
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-1">
            DAILY RATE
          </p>

          <p className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            ৳{dailyRentPrice}

            <span className="text-xs font-normal text-slate-600 dark:text-slate-400 ml-1">
              /day
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <EditModal car={car} />
          <DeleteAlert car={car} redirectTo="/my-added-cars" />
        </div>
      </div>
    </motion.article>
  );
}