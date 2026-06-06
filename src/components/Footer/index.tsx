'use client'
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function Footer() {

  
const handleNewsletterSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  toast.success("You've been subscribed to our newsletter!");
};
  return (
    <footer className="bg-orange-100 px-4 pt-16 pb-10 text-black/70">
      <div className="gap-12 grid md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-[1500px]">
        {/* Newsletter Subscription */}
        <div className="col-span-2 bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl">
          <h3 className="mb-4 font-semibold text-black/70 text-2xl">
            Join Our Newsletter
          </h3>
          <p className="mb-4 text-black/80">
            Stay up to date with our latest updates and offerings.
          </p>
          <form className="flex sm:flex-row flex-col items-center gap-4 text-black/70" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              className="sm:flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
            />
            <button
              type="submit"
              className="bg-orange-400 hover:brightness-125 px-6 py-3 rounded-xl font-semibold text-black/70 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-bold text-xl">Quick Links</h4>
          <ul className="space-y-2 text-black/80 text-sm">
            <li>
              <Link href="/" className="hover:text-black/70 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black/70 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-black/70 transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black/70 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="mb-4 font-bold text-xl">Follow Us</h4>
          <div className="flex gap-4 mb-6 text-2xl">
            <Link
              href="/"
              className="hover:text-purple-300 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="/"
              className="hover:text-purple-300 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </Link>
            <Link
              href="/"
              className="hover:text-purple-300 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="/"
              className="hover:text-purple-300 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
          </div>
          <div className="space-y-1 text-black/80 text-sm">
            <p>Email: support@ParkBuddy.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Location: New York, USA</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-white/20 border-t text-black/90 text-sm text-center">
        © {new Date().getFullYear()} Park Buddy. All rights reserved.
      </div>
    </footer>
  );
}
