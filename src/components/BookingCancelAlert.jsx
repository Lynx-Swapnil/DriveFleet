"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export function BookingCancelAlert({ booking }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelBooking = async () => {
    setIsLoading(true);
    const { data: tokenData } = await authClient.token();

    const res = await apiFetch(`/bookings/${booking._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    if (res.ok) {
      toast.success("Booking cancelled.");
      setIsOpen(false);
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.message || "Failed to cancel booking.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-600 px-6 py-2 text-sm font-semibold text-red-600 dark:text-red-400 transition-colors duration-200"
      >
        Cancel Booking
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl dark:shadow-2xl max-w-sm w-11/12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">!</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cancel Booking?</h3>
            </div>

            {/* Body */}
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              This will cancel your booking for <strong>{booking.carName}</strong>. This action cannot be undone.
            </p>

            {/* Footer */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="flex-1 rounded-lg border-2 border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200 disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
