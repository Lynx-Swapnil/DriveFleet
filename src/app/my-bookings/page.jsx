"use client";

import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarDays, FaTag, FaUser, FaClipboard } from "react-icons/fa6";
import { motion } from "framer-motion";
import SignInRequired from "@/components/SignInRequired";

function formatBookingDateTime(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} at ${timeStr}`;
}

export default function MyBookingsPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSessionPending) {
      return;
    }

    if (!session?.user?.id) {
      // Avoid synchronous setState inside effect to prevent cascading renders
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await apiFetch(`/bookings/${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          setBookings(Array.isArray(data) ? data : []);
        } else {
          toast.error("Failed to fetch bookings");
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Error fetching bookings");
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isSessionPending, session?.user?.id]);

  if (!session?.user) {
    return <SignInRequired message="Please sign in to view your bookings." />;
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 transition-colors duration-300">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">View and manage your rental bookings.</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg">You have no bookings yet.</p>
        </motion.div>
      ) : (
        <motion.div
          className="mt-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {bookings.map((booking) => {
            const bookingDate =
              booking.bookingDate || booking.createdAt || booking.date;
            const totalPrice =
              booking.totalPrice ?? booking.dailyRentPrice ?? "—";

            return (
              <motion.article
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-linear-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 shadow-md dark:shadow-lg transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Cancel Button - Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <BookingCancelAlert booking={booking} />
                </div>

                {/* Image Section - Left */}
                {booking.imageUrl && (
                  <div className="relative sm:w-64 sm:shrink-0 h-48 sm:h-auto">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.carName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Details Section - Right */}
                <div className="flex flex-1 flex-col justify-between p-6 pr-16">
                  {/* Top: Car Name and Key Info */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{booking.carName}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Rental booking</p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {/* Total Price */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                          <FaTag className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Total Price</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">৳{totalPrice}</p>
                        </div>
                      </div>

                      {/* Booking Date */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                          <FaCalendarDays className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Booked On</p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formatBookingDateTime(bookingDate)}
                          </p>
                        </div>
                      </div>

                      {/* Driver Status */}
                      {booking.driverNeeded !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                            <FaUser className="text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Driver</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {booking.driverNeeded ? "Included" : "Not needed"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Special Note */}
                      {booking.specialNote && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                            <FaClipboard className="text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Note</p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 truncate">
                              {booking.specialNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </main>
  );
}
