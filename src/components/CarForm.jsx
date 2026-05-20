"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCar, FaLocationDot, FaTag, FaUsers, FaCamera, FaCheck, FaArrowRight } from "react-icons/fa6";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Compact", "Van", "Truck", "Coupe"];
const locations = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal"];
const availabilityStatuses = ["Available", "Not Available"];

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

export function CarForm({
  onSubmit,
  isLoading,
  initialData = null,
  mode = "add",
  showSidebar = true,
  containerClassName = "",
  formClassName = "",
  itemVariants = null,
  onCancel = null,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      carName: "",
      carType: "",
      seatCapacity: "",
      dailyRentPrice: "",
      pickupLocation: "",
      availabilityStatus: "",
      imageUrl: "",
      description: "",
    }
  );

  const defaultItemVariants = itemVariants || {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
      !formData.availabilityStatus ||
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit(formData);
  };

  return (
    <div className={containerClassName}>
      <form onSubmit={handleFormSubmit} className={formClassName || "space-y-8"}>
        {/* Vehicle Information Section */}
        <motion.div variants={defaultItemVariants} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
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
              <motion.div variants={defaultItemVariants} className="space-y-2.5">
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
                itemVariants={defaultItemVariants}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seat Capacity */}
              <motion.div variants={defaultItemVariants} className="space-y-2.5">
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
              <motion.div variants={defaultItemVariants} className="space-y-2.5">
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
                itemVariants={defaultItemVariants}
              />

              {/* Availability Status */}
              <CustomSelect
                value={formData.availabilityStatus}
                onChange={(value) => setFormData({ ...formData, availabilityStatus: value })}
                options={availabilityStatuses}
                placeholder="Select status"
                label="Availability Status"
                icon={FaTag}
                itemVariants={defaultItemVariants}
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image URL */}
              <motion.div variants={defaultItemVariants} className="space-y-2.5">
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
            <motion.div variants={defaultItemVariants} className="space-y-2.5">
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
        </motion.div>

        {/* Image Preview */}
        {formData.imageUrl && (
          <motion.div variants={defaultItemVariants}>
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
          variants={defaultItemVariants}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <button
            type="button"
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                // Reset form
                setFormData(
                  initialData || {
                    carName: "",
                    carType: "",
                    seatCapacity: "",
                    dailyRentPrice: "",
                    pickupLocation: "",
                    availabilityStatus: "",
                    imageUrl: "",
                    description: "",
                  }
                );
              }
            }}
            className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            {onCancel ? "Cancel" : "Reset"}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 dark:from-cyan-500 dark:to-cyan-400 dark:hover:from-cyan-600 dark:hover:to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === "add" ? "Adding Car..." : "Updating Car..."}
              </>
            ) : (
              <>
                <FaCheck className="text-lg" />
                {mode === "add" ? "Add Car" : "Update Car"}
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}

export default CarForm;
