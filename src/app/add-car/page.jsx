"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCar, FaCheck, FaArrowRight } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import SignInRequired from "@/components/SignInRequired";
import { CarForm } from "@/components/CarForm";

export default function AddCarPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!session?.user) {
    return <SignInRequired message="Please sign in to add a car to your fleet." />;
  }

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const payload = {
        carName: formData.carName,
        carType: formData.carType,
        seatCapacity: parseInt(formData.seatCapacity),
        dailyRentPrice: parseFloat(formData.dailyRentPrice),
        pickupLocation: formData.pickupLocation,
        imageUrl: formData.imageUrl,
        description: formData.description || "",
      };

      const { data: tokenData } = await authClient.token();
      const res = await apiFetch("/cars", {
        method: "POST",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Car added successfully!");
        router.push("/my-added-cars");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("An error occurred while adding the car");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 transition-colors duration-300">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20">
              <FaCar className="text-3xl text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                Add Your Car
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                List your vehicle and start earning on DriveFleet
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <CarForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              mode="add"
              showSidebar={false}
            />
          </motion.div>

          {/* Sidebar - Benefits & Tips */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Tips Card */}
            <div className="rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6">
              <h3 className="font-bold text-cyan-900 dark:text-cyan-200 mb-4 text-lg">
                Listing Tips
              </h3>
              <ul className="space-y-3 text-sm text-cyan-800 dark:text-cyan-300">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0 text-xs" />
                  <span>Use clear, high-quality car images</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0 text-xs" />
                  <span>Provide accurate vehicle details</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0 text-xs" />
                  <span>Set competitive rental prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0 text-xs" />
                  <span>Add detailed descriptions</span>
                </li>
              </ul>
            </div>

            {/* Why List Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                Why List on DriveFleet?
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-xs" />
                  <span>Earn passive income</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-xs" />
                  <span>Reach thousands of renters</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-xs" />
                  <span>Flexible rental terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-xs" />
                  <span>Secure & protected</span>
                </li>
              </ul>
            </div>

            {/* Status Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sticky top-24">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold">
                  <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                  Ready to List
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your listing will be reviewed and approved within 24 hours. Once approved, it will be visible to all renters on DriveFleet.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
