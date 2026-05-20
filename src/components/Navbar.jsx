"use client";

import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/lib/theme-context";
import { Moon, Sun } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-cyan-600 dark:text-cyan-400"
        >
          DriveFleet
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore-cars"
              className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Explore Cars
            </Link>
          </li>
          <li>
            <Link
              href="/add-car"
              className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Add Car
            </Link>
          </li>
          <li>
            <Link
              href="/my-bookings"
              className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              My Bookings
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </motion.button>

          {/* User Menu */}
          {user ? (
            <div ref={menuRef} className="relative flex items-center">
              <motion.button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-full focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                whileHover={{ scale: 1.05 }}
              >
                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    src={user?.image}
                    alt={user?.name}
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={
                  menuOpen
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -10 }
                }
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-full z-50 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg transition-colors duration-300 ${
                  menuOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  href="/add-car"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Add Car
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  My Bookings
                </Link>
                <Link
                  href="/my-added-cars"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  My Added Cars
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </motion.div>
            </div>
          ) : (
            <Link href="/signIn">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white">
                  Login
                </Button>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
