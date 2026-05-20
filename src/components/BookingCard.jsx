"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarDays, FaUser, FaNoteSticky } from "react-icons/fa6";

const BookingCard = ({ car }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a car.");
      router.push("/signIn");
      return;
    }

    if (car.availabilityStatus !== "Available") {
      toast.error("This car is not available for booking.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userId: user.id,
      userName: user.name,
      driverNeeded,
      specialNote,
      carId: car._id,
      carName: car.carName,
      carType: car.carType,
      seatCapacity: car.seatCapacity,
      pickupLocation: car.pickupLocation,
      imageUrl: car.imageUrl,
      dailyRentPrice: car.dailyRentPrice,
      description: car.description,
      availabilityStatus: car.availabilityStatus,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await apiFetch("/bookings", {
        method: "POST",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Car booked successfully!");
        router.push("/my-bookings");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Booking failed. Please try again.");
      }
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 p-6 shadow-lg dark:shadow-2xl border border-slate-200 dark:border-slate-700 w-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
          <FaCalendarDays className="text-lg text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Book This Car</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Complete your reservation</p>
        </div>
      </div>

      <form onSubmit={handleBooking} className="space-y-6">
        {/* Driver Needed Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <FaUser className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Driver Needed</span>
          </label>
          <div className="flex gap-3">
            {[
              { label: "No", value: false },
              { label: "Yes", value: true },
            ].map((option) => (
              <label
                key={option.label}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3 px-4 transition-all duration-200 ${
                  driverNeeded === option.value
                    ? "border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-900/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-700/30 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="driver"
                  checked={driverNeeded === option.value}
                  onChange={() => setDriverNeeded(option.value)}
                  className="h-4 w-4 accent-cyan-600 dark:accent-cyan-400"
                />
                <span className={`text-sm font-medium ${
                  driverNeeded === option.value
                    ? "text-cyan-700 dark:text-cyan-300"
                    : "text-slate-700 dark:text-slate-300"
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Special Note Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <FaNoteSticky className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Special Instructions</span>
          </label>
          <textarea
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="Add any special requests or notes (optional)"
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-700/50 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20"
            rows={4}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {specialNote.length}/500 characters
          </p>
        </div>

        {/* Booking Info */}
        <div className="space-y-2 rounded-xl bg-slate-100/50 dark:bg-slate-700/30 p-4">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Booking Summary</p>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Driver Service:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{driverNeeded ? "Included" : "Not needed"}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed dark:from-cyan-600 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-800"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Booking...</span>
            </div>
          ) : (
            "Book Now"
          )}
        </button>

        {/* Security Message */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          ✓ Secure booking • Instant confirmation
        </p>
      </form>
    </div>
  );
};

export default BookingCard;
