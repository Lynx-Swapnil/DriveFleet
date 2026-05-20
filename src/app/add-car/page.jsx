"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCar, FaLocationDot, FaTag, FaUsers, FaCamera, FaCheck, FaArrowRight } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import SignInRequired from "@/components/SignInRequired";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Compact", "Van", "Truck", "Coupe"];
const locations = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal"];

// Custom Dropdown Component
function CustomSelect({ value, onChange, options, placeholder, label, icon: Icon, variants, itemVariants }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div variants={itemVariants} className="space-y-2.5">
      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
        {Icon && <Icon className="inline mr-2 text-cyan-600 dark:text-cyan-400" />}
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white text-left font-medium hover:border-cyan-300 dark:hover:border-cyan-600 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
        >
          <span className={value ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}>
            {value || placeholder}
          </span>
        </button>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400">
          <svg className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50"
          >
            <ul className="py-2 max-h-64 overflow-y-auto">
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left font-medium transition-all flex items-center gap-3 ${
                      value === option
                        ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <span className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                      value === option
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {value === option && (
                        <FaCheck className="h-3 w-3 text-white" />
                      )}
                    </span>
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function AddCarPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    carName: "",
    carType: "",
    seatCapacity: "",
    dailyRentPrice: "",
    pickupLocation: "",
    imageUrl: "",
    description: "",
  });

  if (!session?.user) {
    return <SignInRequired message="Please sign in to add a car to your fleet." />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.carName.trim() ||
      !formData.carType ||
      !formData.seatCapacity ||
      !formData.dailyRentPrice ||
      !formData.pickupLocation ||
      !formData.imageUrl.trim()
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (isNaN(formData.seatCapacity) || formData.seatCapacity < 1) {
      toast.error("Seat capacity must be a valid number");
      return false;
    }

    if (isNaN(formData.dailyRentPrice) || formData.dailyRentPrice < 0) {
      toast.error("Daily rent price must be a valid number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        setFormData({
          carName: "",
          carType: "",
          seatCapacity: "",
          dailyRentPrice: "",
          pickupLocation: "",
          imageUrl: "",
          description: "",
        });
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Vehicle Information Section */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <FaCar className="text-xl text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Vehicle Information
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car Name */}
                    <motion.div variants={itemVariants} className="space-y-2.5">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        <FaCar className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                        Car Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="carName"
                        placeholder="e.g., Toyota Camry 2023"
                        value={formData.carName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
                      />
                    </motion.div>

                    {/* Car Type */}
                    <CustomSelect
                      value={formData.carType}
                      onChange={(value) => setFormData({ ...formData, carType: value })}
                      options={carTypes}
                      placeholder="Select car type"
                      label="Car Type"
                      icon={FaTag}
                      itemVariants={itemVariants}
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Seat Capacity */}
                    <motion.div variants={itemVariants} className="space-y-2.5">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        <FaUsers className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                        Seat Capacity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="seatCapacity"
                        placeholder="e.g., 5"
                        min="1"
                        value={formData.seatCapacity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
                      />
                    </motion.div>

                    {/* Daily Rent Price */}
                    <motion.div variants={itemVariants} className="space-y-2.5">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Daily Rent Price (৳) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="dailyRentPrice"
                        placeholder="e.g., 5000"
                        min="0"
                        step="100"
                        value={formData.dailyRentPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
                      />
                    </motion.div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pickup Location */}
                    <CustomSelect
                      value={formData.pickupLocation}
                      onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                      options={locations}
                      placeholder="Select location"
                      label="Pickup Location"
                      icon={FaLocationDot}
                      itemVariants={itemVariants}
                    />

                    {/* Image URL */}
                    <motion.div variants={itemVariants} className="space-y-2.5">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        <FaCamera className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                        Image URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        placeholder="https://example.com/car.jpg"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
                      />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      placeholder="Add details about your car, features, condition, and any special amenities..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all resize-vertical"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Image Preview */}
              {formData.imageUrl && (
                <motion.div variants={itemVariants}>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="relative w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                      <img
                        src={formData.imageUrl}
                        alt="Car preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e2e8f0' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%2394a3b8'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex gap-4 flex-col sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 dark:from-cyan-500 dark:to-cyan-400 dark:hover:from-cyan-600 dark:hover:to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding Car...
                    </>
                  ) : (
                    <>
                      <FaCheck className="text-lg" />
                      Add Car
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Sidebar - Benefits & Tips */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Tips Card */}
            <div className="rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6">
              <h3 className="font-bold text-cyan-900 dark:text-cyan-200 mb-4 text-lg">
                Listing Tips
              </h3>
              <ul className="space-y-3 text-sm text-cyan-800 dark:text-cyan-300">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 text-xs" />
                  <span>Use clear, high-quality car images</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 text-xs" />
                  <span>Provide accurate vehicle details</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 text-xs" />
                  <span>Set competitive rental prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 text-xs" />
                  <span>Add detailed descriptions</span>
                </li>
              </ul>
            </div>

            {/* Why List Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                Why List on DriveFleet?
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0 text-xs" />
                  <span>Earn passive income</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0 text-xs" />
                  <span>Reach thousands of renters</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0 text-xs" />
                  <span>Flexible rental terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0 text-xs" />
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
                Your listing will be reviewed and approved within 24 hours. Once approved, it'll be visible to all renters on DriveFleet.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
