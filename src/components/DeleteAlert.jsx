"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function DeleteAlert({ car, redirectTo = "/explore-cars" }) {
  const { _id, carName } = car;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/cars/${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Car deleted successfully.");
        setIsOpen(false);
        router.push(redirectTo);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to delete car.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-linear-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 text-white font-semibold rounded-lg px-4 py-2.5 transition-all duration-200"
      >
        Delete
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
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete {carName}?</h3>
            </div>

            {/* Body */}
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              This will permanently delete <strong>{carName}</strong>. This action cannot be undone.
            </p>

            {/* Footer */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="flex-1 rounded-lg border-2 border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : `Delete ${carName}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
