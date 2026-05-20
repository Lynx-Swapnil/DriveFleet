"use client";

import BookingCard from "@/components/BookingCard";
import { apiFetch } from "@/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCar, FaUsers, FaLocationDot, FaTag } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import SignInRequired from "@/components/SignInRequired";

export default function CarDetailsPage() {
  const params = useParams();
  const { data: session } = authClient.useSession();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const fetchCarDetails = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const res = await apiFetch(`/cars/${params.id}`, {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCar(data);
        }
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [params?.id]);

  if (!session?.user) {
    return <SignInRequired message="Please sign in to view car details and make bookings." />;
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Car Not Found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">The car you are looking for does not exist.</p>
        </div>
      </main>
    );
  }

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

  const isAvailable = availabilityStatus === "Available";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Car Details
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Complete information about this premium vehicle
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Section - Image and Details */}
        <section className="lg:col-span-2 space-y-6">
          {/* Image Card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl">
            <div className="relative h-96 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
              <Image
                src={imageUrl}
                alt={carName}
                width={800}
                height={400}
                className="h-full w-full object-cover"
                loading="eager"
                priority
              />
            </div>

            {/* Status Badge */}
            <div className="absolute right-4 top-4">
              <div
                className={`rounded-full px-4 py-2 font-semibold text-white shadow-lg backdrop-blur-sm ${
                  isAvailable
                    ? "bg-green-500/90"
                    : "bg-amber-500/90"
                }`}
              >
                {availabilityStatus}
              </div>
            </div>
          </div>

          {/* Car Info Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl">
            {/* Title and Description */}
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {carName}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {description}
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

            {/* Details Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Type */}
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                  <FaCar className="text-lg text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Type
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {carType}
                  </p>
                </div>
              </div>

              {/* Seats */}
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                  <FaUsers className="text-lg text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Seats
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {seatCapacity} Persons
                  </p>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                  <FaLocationDot className="text-lg text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Pickup Location
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {pickupLocation}
                  </p>
                </div>
              </div>

              {/* Daily Price */}
              <div className="flex items-center gap-4 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 p-4 dark:from-cyan-900/20 dark:to-blue-900/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                  <FaTag className="text-lg text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Daily Rate
                  </p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    ৳{dailyRentPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section - Booking Card */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingCard car={car} />
          </div>
        </aside>
      </div>
    </main>
  );
}
