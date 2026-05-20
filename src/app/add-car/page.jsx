"use client";

import { Button, Input, Select, Card } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCar, FaMapMarkerAlt, FaTag, FaUsers, FaCamera, FaInfoCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import SignInRequired from "@/components/SignInRequired";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Compact", "Van", "Truck", "Coupe"];
const locations = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal"];

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

  const handleSelectChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
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

      const res = await apiFetch("/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-6 transition-colors duration-300">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/30">
              <FaCar className="text-2xl text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Add Your Car
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            List your vehicle on DriveFleet and start earning
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div variants={itemVariants}>
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-0 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {/* Vehicle Information Section */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <div className="mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <FaInfoCircle className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Vehicle Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Car Name */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <FaCar className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                      Car Name *
                    </label>
                    <Input
                      type="text"
                      name="carName"
                      placeholder="e.g., Toyota Camry 2023"
                      value={formData.carName}
                      onChange={handleInputChange}
                      className="w-full"
                      radius="lg"
                      classNames={{
                        input: "bg-slate-50 dark:bg-slate-700",
                        inputWrapper:
                          "border-slate-200 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500",
                      }}
                    />
                  </motion.div>

                  {/* Car Type */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <FaTag className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                      Car Type *
                    </label>
                    <Select
                      value={formData.carType}
                      onChange={(e) => handleSelectChange(e, "carType")}
                      placeholder="Select car type"
                      className="w-full"
                      radius="lg"
                      classNames={{
                        trigger:
                          "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                      }}
                    >
                      {carTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </motion.div>

                  {/* Seat Capacity */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <FaUsers className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                      Seat Capacity *
                    </label>
                    <Input
                      type="number"
                      name="seatCapacity"
                      placeholder="e.g., 5"
                      min="1"
                      value={formData.seatCapacity}
                      onChange={handleInputChange}
                      className="w-full"
                      radius="lg"
                      classNames={{
                        input: "bg-slate-50 dark:bg-slate-700",
                        inputWrapper:
                          "border-slate-200 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500",
                      }}
                    />
                  </motion.div>

                  {/* Daily Rent Price */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Daily Rent Price (৳) *
                    </label>
                    <Input
                      type="number"
                      name="dailyRentPrice"
                      placeholder="e.g., 5000"
                      min="0"
                      step="100"
                      value={formData.dailyRentPrice}
                      onChange={handleInputChange}
                      className="w-full"
                      radius="lg"
                      classNames={{
                        input: "bg-slate-50 dark:bg-slate-700",
                        inputWrapper:
                          "border-slate-200 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500",
                      }}
                    />
                  </motion.div>

                  {/* Pickup Location */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <FaMapMarkerAlt className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                      Pickup Location *
                    </label>
                    <Select
                      value={formData.pickupLocation}
                      onChange={(e) => handleSelectChange(e, "pickupLocation")}
                      placeholder="Select location"
                      className="w-full"
                      radius="lg"
                      classNames={{
                        trigger:
                          "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                      }}
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </Select>
                  </motion.div>

                  {/* Image URL */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <FaCamera className="inline mr-2 text-cyan-600 dark:text-cyan-400" />
                      Image URL *
                    </label>
                    <Input
                      type="url"
                      name="imageUrl"
                      placeholder="https://example.com/car.jpg"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full"
                      radius="lg"
                      classNames={{
                        input: "bg-slate-50 dark:bg-slate-700",
                        inputWrapper:
                          "border-slate-200 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Image Preview */}
                {formData.imageUrl && (
                  <motion.div
                    variants={itemVariants}
                    className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                  >
                    <div className="relative w-full h-48 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                      <img
                        src={formData.imageUrl}
                        alt="Car preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e2e8f0' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%2394a3b8'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    placeholder="Add details about your car, features, condition, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-500 transition-colors"
                  />
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex gap-4 flex-col sm:flex-row justify-between"
              >
                <Button
                  variant="bordered"
                  className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  size="lg"
                  onPress={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="bg-linear-to-r from-cyan-600 to-cyan-500 text-white font-semibold hover:from-cyan-700 hover:to-cyan-600 dark:from-cyan-500 dark:to-cyan-400"
                >
                  {isLoading ? "Adding Car..." : "Add Car"}
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Info Box */}
        <motion.div
          variants={itemVariants}
          className="mt-8 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 p-6"
        >
          <h3 className="font-semibold text-cyan-900 dark:text-cyan-200 mb-2">
            Tips for a successful listing:
          </h3>
          <ul className="space-y-2 text-sm text-cyan-800 dark:text-cyan-300">
            <li>✓ Use a clear, high-quality car image</li>
            <li>✓ Provide accurate vehicle information</li>
            <li>✓ Set a competitive daily rental price</li>
            <li>✓ Add a detailed description to attract renters</li>
          </ul>
        </motion.div>
      </motion.div>
    </main>
  );
}
