import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

import { FaCalendarDays, FaTag, FaUser, FaClipboard } from "react-icons/fa6";

function formatBookingDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;
  let bookings = [];

  if (user?.id) {
    try {
      const res = await apiFetch(`/bookings/${user.id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        bookings = await res.json();
      }
    } catch {
      bookings = [];
    }
  }

  if (!Array.isArray(bookings)) {
    bookings = [];
  }

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">View and manage your rental bookings.</p>

      {bookings.length === 0 ? (
        <p className="mt-12 text-center text-slate-500 dark:text-slate-400">You have no bookings yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const bookingDate =
              booking.bookingDate || booking.createdAt || booking.date;
            const totalPrice =
              booking.totalPrice ?? booking.dailyRentPrice ?? "—";
            const carId = booking.carId || booking._id;

            return (
              <article
                key={booking._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Cancel Button - Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <BookingCancelAlert booking={booking} />
                </div>

                {/* Image Section - Left */}
                {booking.imageUrl && (
                  <div className="relative sm:w-64 sm:flex-shrink-0 h-48 sm:h-auto">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.carName}
                      width={300}
                      height={240}
                      className="h-48 sm:h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
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
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
