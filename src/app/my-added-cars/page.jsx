"use client";

import MyCarCard from "@/components/MyCarCard";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SignInRequired from "@/components/SignInRequired";

export default function MyAddedCarsPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSessionPending) return;

    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    const fetchMyCars = async () => {
      try {
        const res = await apiFetch("/cars/my");
        if (res.ok) {
          const data = await res.json();
          setCars(Array.isArray(data) ? data : []);
        } else {
          toast.error("Failed to fetch your cars");
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

    fetchMyCars();
  }, [isSessionPending, session?.user]);

  if (!session?.user) {
    return <SignInRequired message="Please sign in to view your added cars." />;
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Added Cars</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Manage your listed vehicles.</p>
      </motion.div>

      {cars.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            You have not added any cars yet.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="mt-8 grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {cars.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MyCarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
