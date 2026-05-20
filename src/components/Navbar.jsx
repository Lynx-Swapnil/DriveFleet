"use client";

import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FaDoorOpen, FaBars, FaX } from "react-icons/fa6";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const user = session?.user;

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300 relative"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FaX className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-cyan-600 dark:text-cyan-400 z-50"
          >
            DriveFleet
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/")
                  ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-b-2 border-cyan-600 dark:border-cyan-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore-cars"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/explore-cars")
                  ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-b-2 border-cyan-600 dark:border-cyan-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              }`}
            >
              Explore Cars
            </Link>
          </li>
          <li>
            <Link
              href="/add-car"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/add-car")
                  ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-b-2 border-cyan-600 dark:border-cyan-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              }`}
            >
              Add Car
            </Link>
          </li>
          <li>
            <Link
              href="/my-bookings"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/my-bookings")
                  ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-b-2 border-cyan-600 dark:border-cyan-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              }`}
            >
              My Bookings
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
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
                className={`absolute right-0 top-full z-50 mt-3 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-lg transition-colors duration-300 ${
                  menuOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  href="/add-car"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
                    isActive("/add-car")
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-l-3 border-cyan-600 dark:border-cyan-400"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  Add Car
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
                    isActive("/my-bookings")
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-l-3 border-cyan-600 dark:border-cyan-400"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  My Bookings
                </Link>
                <Link
                  href="/my-added-cars"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
                    isActive("/my-added-cars")
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-l-3 border-cyan-600 dark:border-cyan-400"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  My Added Cars
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FaDoorOpen className="text-sm" />
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

      {/* Mobile Navigation Menu - Full Width */}
      {mobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <ul className="flex flex-col gap-0 px-6 py-4 max-w-7xl mx-auto">
            <li>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/")
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore-cars"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/explore-cars")
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
              >
                Explore Cars
              </Link>
            </li>
            <li>
              <Link
                href="/add-car"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/add-car")
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
              >
                Add Car
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/my-bookings")
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
