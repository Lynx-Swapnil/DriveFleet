"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCar, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

const CarCard = ({ car }) => {
  const {
    _id,
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
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
        <Image
          src={imageUrl}
          alt={carName}
          width={400}
          height={300}
          className="h-full w-full object-cover"
          priority={false}
        />
        {/* Availability Badge */}
        <div className="absolute right-4 top-4">
          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold shadow-md backdrop-blur-sm ${
              availabilityStatus === "Available"
                ? "bg-green-500/90 text-white dark:bg-green-600/90"
                : "bg-amber-500/90 text-white dark:bg-amber-600/90"
            }`}
          >
            {availabilityStatus}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-4 p-6">
        {/* Header */}
        <div>
          <h2 className="line-clamp-2 text-2xl font-bold text-slate-900 dark:text-white">
            {carName}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
            {carType}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
          {/* Seats */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
              <FaUsers className="text-lg text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Seats</p>
              <p className="font-semibold text-slate-900 dark:text-white">{seatCapacity}</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
              <FaCar className="text-lg text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Type</p>
              <p className="line-clamp-1 font-semibold text-slate-900 dark:text-white">{carType}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
              <FaMapMarkerAlt className="text-lg text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Location</p>
              <p className="line-clamp-1 text-xs font-semibold text-slate-900 dark:text-white">
                {pickupLocation.split(",")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
            ৳{dailyRentPrice}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            per day
          </span>
        </div>

        {/* CTA Button */}
        <Link href={`/explore-cars/${_id}`} className="mt-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-800"
            >
              View Details
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
};

export default CarCard;
