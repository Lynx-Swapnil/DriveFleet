"use client";

import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

export default function SignInRequired({ message = "Please sign in to continue." }) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900/30 dark:bg-amber-900/20 shadow-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/40">
            <FaLock className="text-2xl text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200">
          Sign in required
        </h2>
        <p className="mt-3 text-amber-800 dark:text-amber-300 text-lg">
          {message}
        </p>
      </motion.div>
    </main>
  );
}
