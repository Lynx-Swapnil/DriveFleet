"use client";

import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const user = session?.user;

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

  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-cyan-600">
          DriveFleet
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link href="/" className="hover:text-cyan-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/explore-cars" className="hover:text-cyan-600">
              Explore Cars
            </Link>
          </li>
          <li>
            <Link href="/add-car" className="hover:text-cyan-600">
              Add Car
            </Link>
          </li>
          <li>
            <Link href="/my-bookings" className="hover:text-cyan-600">
              My Bookings
            </Link>
          </li>
        </ul>

        <div>
          {user ? (
            <div ref={menuRef} className="relative flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-full focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    src={user?.image}
                    alt={user?.name}
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
                  <Link
                    href="/add-car"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-gray-100"
                  >
                    Add Car
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/my-added-cars"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-gray-100"
                  >
                    My Added Cars
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signIn">
              <Button className="bg-cyan-500 text-white">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
