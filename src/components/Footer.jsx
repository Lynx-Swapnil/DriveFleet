import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const usefulLinks = [
  { href: "/", label: "Home" },
  { href: "/explore-cars", label: "Explore Cars" },
  { href: "/add-car", label: "Add Car" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <section>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Email: support@drivefleet.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-4 text-2xl">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-cyan-400">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-cyan-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-cyan-400">
              <FaInstagram />
            </a>
          </div>
        </section>
      </div>

      <p className="mx-auto mt-10 max-w-7xl border-t border-slate-700 pt-6 text-center text-sm">
        © {new Date().getFullYear()} DriveFleet. All rights reserved.
      </p>
    </footer>
  );
}
