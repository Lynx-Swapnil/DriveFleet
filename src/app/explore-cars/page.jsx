"use client";

import CarCard from "@/components/CarCard";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Compact", "Van"];

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cars on mount and when filters change
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        let url = "/cars";

        // Use search endpoint if search is provided
        if (search.trim()) {
          url = `/cars/search?search=${encodeURIComponent(search)}`;
        }

        const res = await apiFetch(url);
        if (res.ok) {
          let data = await res.json();
          data = Array.isArray(data) ? data : [];
          
          console.log("Fetched cars:", data);
          console.log("Selected type:", selectedType);
          
          // Filter by type client-side
          if (selectedType && selectedType.trim() !== "") {
            data = data.filter((car) => {
              console.log("Comparing:", car.carType, "===", selectedType, "=>", car.carType === selectedType);
              return car.carType === selectedType;
            });
          }
          
          console.log("Filtered data:", data);
          setCars(data);
        } else {
          toast.error("Failed to fetch cars");
          setCars([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Error fetching cars");
        setCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchCars();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, selectedType]);

  const handleReset = () => {
    setSearch("");
    setSelectedType("");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Explore Cars</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Browse all vehicles including unavailable listings.
      </p>

      {/* Search and Filter Section */}
      <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition-colors duration-300">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Search by Car Name
            </label>
            <input
              type="text"
              placeholder="e.g., Toyota, BMW..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-11 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="">All Types</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="w-full h-11 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-cyan-500/20 transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
        </div>
      ) : cars.length === 0 ? (
        <p className="mt-12 text-center text-slate-500 dark:text-slate-400">
          {search || selectedType ? "No cars found matching your filters." : "No cars available."}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}
