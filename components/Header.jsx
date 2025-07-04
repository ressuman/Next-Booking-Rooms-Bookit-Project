"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaBuilding,
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaPlus,
  FaHome,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import destroySession from "@/app/actions/destroySession";
import useAuth from "@/hooks/use-auth.hook";

export default function Header() {
  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: "/", label: "Rooms", icon: FaHome, showWhen: "always" },
    {
      href: "/bookings",
      label: "Bookings",
      icon: FaCalendarAlt,
      showWhen: "authenticated",
    },
    {
      href: "/rooms/add",
      label: "Add Room",
      icon: FaPlus,
      showWhen: "authenticated",
    },
  ];

  const NavLink = ({ href, children, className = "", onClick }) => (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        text-gray-700 hover:text-blue-600 hover:bg-blue-50
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      className="
        flex items-center px-4 py-3 text-base font-medium text-gray-700
        hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      "
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                className="h-10 w-10 transition-transform duration-200 group-hover:scale-105"
                width={40}
                height={40}
                src={logo}
                priority
                alt="Bookit"
              />
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                Bookit
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const shouldShow =
                item.showWhen === "always" ||
                (item.showWhen === "authenticated" && isAuthenticated);

              if (!shouldShow) return null;

              return (
                <NavLink key={item.href} href={item.href}>
                  <Icon className="inline mr-2" size={14} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-2">
            {!isAuthenticated ? (
              <>
                <NavLink href="/login">
                  <FaSignInAlt className="inline mr-2" size={14} />
                  Login
                </NavLink>
                <NavLink
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                >
                  <FaUser className="inline mr-2" size={14} />
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink href="/rooms/my">
                  <FaBuilding className="inline mr-2" size={14} />
                  My Rooms
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    text-red-600 hover:text-red-700 hover:bg-red-50
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  "
                >
                  <FaSignOutAlt className="inline mr-2" size={14} />
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="
                p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200
              "
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
        md:hidden transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        overflow-hidden bg-white border-t border-gray-200
      `}
      >
        <div className="px-4 py-3 space-y-1">
          {/* Mobile Navigation Items */}
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const shouldShow =
              item.showWhen === "always" ||
              (item.showWhen === "authenticated" && isAuthenticated);

            if (!shouldShow) return null;

            return (
              <MobileNavLink
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
              >
                <Icon className="mr-3" size={16} />
                {item.label}
              </MobileNavLink>
            );
          })}

          {/* Mobile Auth Section */}
          <div className="pt-3 border-t border-gray-200">
            {!isAuthenticated ? (
              <>
                <MobileNavLink href="/login" onClick={closeMobileMenu}>
                  <FaSignInAlt className="mr-3" size={16} />
                  Login
                </MobileNavLink>
                <MobileNavLink href="/register" onClick={closeMobileMenu}>
                  <FaUser className="mr-3" size={16} />
                  Register
                </MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink href="/rooms/my" onClick={closeMobileMenu}>
                  <FaBuilding className="mr-3" size={16} />
                  My Rooms
                </MobileNavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="
                    w-full flex items-center px-4 py-3 text-base font-medium
                    text-red-600 hover:text-red-700 hover:bg-red-50
                    rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  "
                >
                  <FaSignOutAlt className="mr-3" size={16} />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
