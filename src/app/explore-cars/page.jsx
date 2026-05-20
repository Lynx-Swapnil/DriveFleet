"use client";

import CarCard from "@/components/CarCard";
import { apiFetch } from "@/lib/api";
import { Input, Select, ListBox, Button } from "@heroui/react";
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

        // Use search endpoint if search or type is provided
        if (search.trim() || selectedType) {
          url = "/cars/search?";
          if (search.trim()) {
            url += `search=${encodeURIComponent(search)}`;
          }
          if (selectedType) {
            url += (search.trim() ? "&" : "") + `type=${selectedType}`;
          }
        }

        const res = await apiFetch(url);
        if (res.ok) {
          const data = await res.json();
          setCars(Array.isArray(data) ? data : []);
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
            <Input
              type="text"
              placeholder="e.g., Toyota, BMW..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
              aria-label="Search by Car Name"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Filter by Type
            </label>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              placeholder="All Types"
              className="w-full"
              aria-label="Filter by Type"
            >
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="" textValue="All Types">
                    All Types
                  </ListBox.Item>
                  {carTypes.map((type) => (
                    <ListBox.Item key={type} id={type} textValue={type}>
                      {type}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Reset Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300"
            >
              Reset
            </Button>
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
