"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section 
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-900 px-6 py-20 text-white transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1 
          className="text-4xl font-bold tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          DriveFleet — Rent Your Dream Car
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-cyan-100 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore premium vehicles, book in minutes, and hit the road with
          confidence. SUVs, sedans, luxury cars, and more — all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 inline-block"
        >
          <Link href="/explore-cars">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 font-semibold text-white">
                Explore Cars
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
