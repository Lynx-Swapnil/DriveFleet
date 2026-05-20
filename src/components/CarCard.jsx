"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
      className="flex h-full flex-col rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-lg"
      >
        <Image
          src={imageUrl}
          alt={carName}
          width={400}
          height={300}
          className="h-48 w-full rounded-lg object-cover"
        />
      </motion.div>
      <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{carName}</h2>
      <p className="text-slate-600 dark:text-slate-300">Type: {carType}</p>
      <p className="text-slate-600 dark:text-slate-300">Seats: {seatCapacity}</p>
      <p className="text-slate-600 dark:text-slate-300">Pickup: {pickupLocation}</p>
      <p className="mt-1 font-medium text-cyan-700 dark:text-cyan-400">
        ৳{dailyRentPrice}{" "}
        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ day</span>
      </p>
      <span
        className={`mt-2 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-medium ${
          availabilityStatus === "Available"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
        }`}
      >
        {availabilityStatus}
      </span>
      <Link href={`/explore-cars/${_id}`} className="mt-auto pt-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button variant="primary" className="w-full bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white">
            View Details
          </Button>
        </motion.div>
      </Link>
    </motion.article>
  );
};

export default CarCard;
