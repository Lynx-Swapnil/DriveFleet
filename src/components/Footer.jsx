"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { motion } from "framer-motion";

const usefulLinks = [
  { href: "/", label: "Home" },
  { href: "/explore-cars", label: "Explore Cars" },
  { href: "/add-car", label: "Add Car" },
  { href: "/my-bookings", label: "My Bookings" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-auto border-t border-slate-200 dark:border-slate-700 bg-slate-900 dark:bg-slate-950 px-6 py-12 text-slate-300 dark:text-slate-400 transition-colors duration-300"
    >
      <motion.div 
        className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white dark:text-slate-100">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Email: support@drivefleet.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white dark:text-slate-100">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white dark:text-slate-100">Follow Us</h3>
          <div className="mt-4 flex gap-4 text-2xl">
            <motion.a 
              href="https://facebook.com" 
              aria-label="Facebook" 
              className="text-slate-300 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a 
              href="https://x.com" 
              aria-label="X (Twitter)" 
              className="text-slate-300 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaX />
            </motion.a>
            <motion.a 
              href="https://instagram.com" 
              aria-label="Instagram" 
              className="text-slate-300 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.section>
      </motion.div>

      <motion.p 
        className="mx-auto mt-10 max-w-7xl border-t border-slate-700 dark:border-slate-800 pt-6 text-center text-sm"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} DriveFleet. All rights reserved.
      </motion.p>
    </motion.footer>
  );
}
