"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import LoadingApi from "../ApiLoading";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, loaded, logOut } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/why-us", label: "Why Us" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="top-0 z-50 sticky bg-orange-100 shadow-md text-black/70">
      <nav className="relative flex justify-between items-center mx-auto px-6 py-4 max-w-[1600px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-orange-600 text-3xl"
        >
          <span className="text-4xl">🚗</span>
          <span>Park Buddy</span>
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="lg:hidden text-orange-600 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "hover:text-orange-600 transition-colors",
                  isActive(href) && "font-semibold text-orange-600"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <LoadingApi loading={!loaded}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="hover:bg-orange-50 px-4 py-2 border border-orange-600 rounded-md text-orange-600 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="hover:bg-orange-50 px-4 py-2 border border-orange-600 rounded-md text-orange-600 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </LoadingApi>
        </ul>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="lg:hidden top-full left-0 z-50 absolute flex flex-col gap-4 bg-orange-100 px-6 py-4 border-t w-full">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "block py-2 text-lg",
                    isActive(href) && "font-semibold text-orange-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <LoadingApi loading={!loaded}>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block bg-orange-600 px-4 py-2 rounded-md text-white text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="hover:bg-orange-50 px-4 py-2 border border-orange-600 rounded-md w-full text-orange-600 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block px-4 py-2 border border-orange-600 rounded-md text-orange-600 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block bg-orange-600 px-4 py-2 rounded-md text-white text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </LoadingApi>
          </ul>
        )}
      </nav>
    </header>
  );
}
