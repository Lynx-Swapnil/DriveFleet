"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <motion.div 
        className="relative min-h-screen flex items-center px-6 py-12 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background curved shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-400 to-cyan-600 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                  DriveFleet
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200">
                  Rent Your Dream Car
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-lg">
                Explore premium vehicles, book in minutes, and hit the road with confidence. SUVs, sedans, luxury cars, and more — all in one place.
              </p>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/explore-cars">
                  <button className="inline-block bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    Explore Cars
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Car Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-96 md:h-[500px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative w-full h-full">
                <Image
                  src="/assets/banner-car.png"
                  alt="Premium Car Rental"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
