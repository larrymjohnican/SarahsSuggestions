"use client";

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkThemeToggle } from "flowbite-react";
import logo from '../../assets/logo.svg';
import CustomContact from "../Contact";
import { ACCESS_TOKEN } from '../../constants';
import { jwtDecode } from 'jwt-decode';

export const CustomNavbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Show just the part before @ for a clean display
        const emailDisplay = decoded.email ? decoded.email.split('@')[0] : decoded.username;
        setLoggedInUser(emailDisplay);
        setIsLoggedIn(true);
      } catch {
        setLoggedInUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setLoggedInUser(null);
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Suggestions", href: "/suggestions" },
    { label: "Reviews", href: "/reviews" },
  ];

  return (
    <>
      <nav className="bg-cream dark:bg-navy border-b border-gold/20 px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} className="w-12 h-12 sm:w-14 sm:h-14" alt="SS Logo" />
            <span className="font-serif text-xl font-semibold text-ember dark:text-gold whitespace-nowrap">
              Sarah's Suggestions!
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 font-sans text-sm">
              {links.map(link => (
                <a key={link.href} href={link.href} className="text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors">
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors"
              >
                Contact
              </button>
              <button
                onClick={handleAuthClick}
                className="text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors"
              >
                {isLoggedIn ? `${loggedInUser} · Logout` : "Login"}
              </button>
            </div>

            <DarkThemeToggle className="text-gray-700 dark:text-parchment" />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block h-0.5 w-6 bg-ember dark:bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-ember dark:bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-ember dark:bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="mt-3 pb-2 border-t border-gold/20 pt-3 flex flex-col gap-3 font-sans text-sm">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setIsContactOpen(true); }}
              className="text-left text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors py-1"
            >
              Contact
            </button>
            {isLoggedIn && (
              <span className="text-xs text-gold font-sans font-medium">Signed in as {loggedInUser}</span>
            )}
            <button
              onClick={() => { setMenuOpen(false); handleAuthClick(); }}
              className="text-left text-gray-700 dark:text-parchment hover:text-ember dark:hover:text-gold transition-colors py-1"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>

      <CustomContact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default CustomNavbar;
