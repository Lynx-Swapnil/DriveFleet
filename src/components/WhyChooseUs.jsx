"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Wide Selection",
    description:
      "Choose from SUVs, sedans, hatchbacks, luxury cars, and more — all verified and ready to rent.",
  },
  {
    title: "Secure Booking",
    description:
      "JWT-protected accounts and encrypted sessions keep your data and bookings safe.",
  },
  {
    title: "Flexible Pickup",
    description:
      "Pick up your vehicle at convenient locations across the city with transparent pricing.",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function WhyChooseUs() {
  return (
    <motion.section 
      className="bg-slate-50 dark:bg-slate-800 px-6 py-16 transition-colors duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2 
          className="text-center text-3xl font-bold text-slate-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose DriveFleet?
        </motion.h2>
        <motion.p 
          className="mx-auto mt-3 max-w-2xl text-center text-slate-600 dark:text-slate-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          We make car rental simple, secure, and affordable for every journey.
        </motion.p>
        <motion.ul 
          className="mt-12 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((item) => (
            <motion.li
              key={item.title}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-6 shadow-sm dark:shadow-lg transition-all duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-400">{item.title}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
