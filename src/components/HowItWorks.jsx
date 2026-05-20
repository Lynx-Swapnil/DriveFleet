"use client";

import { motion } from "framer-motion";

const steps = [
  { step: "1", title: "Browse Cars", text: "Explore our fleet and compare prices, types, and locations." },
  { step: "2", title: "Book Online", text: "Sign in, choose your dates, add notes, and confirm your booking." },
  { step: "3", title: "Drive Away", text: "Pick up your car at the listed location and enjoy the ride." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function HowItWorks() {
  return (
    <motion.section 
      className="mx-auto max-w-7xl px-6 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-center text-3xl font-bold text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>
      <motion.p 
        className="mx-auto mt-3 max-w-xl text-center text-slate-600 dark:text-slate-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Rent a car in three simple steps.
      </motion.p>
      <motion.ol 
        className="mt-12 grid gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {steps.map((item) => (
          <motion.li 
            key={item.step} 
            className="text-center"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 dark:bg-cyan-600 text-lg font-bold text-white"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.step}
            </motion.span>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{item.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  );
}
