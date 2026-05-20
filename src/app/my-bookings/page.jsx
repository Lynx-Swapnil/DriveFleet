import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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
    <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">View and manage your rental bookings.</p>

      {bookings.length === 0 ? (
        <p className="mt-12 text-center text-slate-500 dark:text-slate-400">You have no bookings yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const bookingDate =
              booking.bookingDate || booking.createdAt || booking.date;
            const totalPrice =
              booking.totalPrice ?? booking.dailyRentPrice ?? "—";
            const carId = booking.carId || booking._id;

            return (
              <article
                key={booking._id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
              >
                {booking.imageUrl && (
                  <Image
                    src={booking.imageUrl}
                    alt={booking.carName}
                    width={400}
                    height={240}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                )}
                <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{booking.carName}</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  <strong>Total price:</strong> ৳{totalPrice}
                </p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  <strong>Booking date:</strong>{" "}
                  <Link
                    href={`/explore-cars/${carId}`}
                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    {formatBookingDate(bookingDate)}
                  </Link>
                </p>
                {booking.driverNeeded !== undefined && (
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    Driver needed: {booking.driverNeeded ? "Yes" : "No"}
                  </p>
                )}
                {booking.specialNote && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Note: {booking.specialNote}
                  </p>
                )}
                <BookingCancelAlert booking={booking} />
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
