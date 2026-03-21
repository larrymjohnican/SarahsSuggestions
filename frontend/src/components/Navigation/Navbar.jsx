"use client";

import { useState } from 'react';
import { Navbar, DarkThemeToggle } from "flowbite-react";
import logo from '../../assets/logo.png'; // Import the logo
import CustomContact from "../Contact";

const navbarTheme = {
  root: {
    base: "bg-navy border-b border-gold/20 px-4 py-2.5",
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
    },
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
  },
  link: {
    base: "block py-2 pr-4 pl-3 font-sans text-parchment hover:text-gold transition-colors duration-200 md:p-0",
    active: {
      on: "text-gold",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-parchment hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-gold/30 md:hidden",
  },
};

export const CustomNavbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => setIsContactOpen(true);

  return (
    <>
      <Navbar theme={navbarTheme} fluid>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src={logo} className="mr-3 w-12 h-12 sm:w-16 sm:h-16" alt="SS Logo" />
          <span className="self-center whitespace-nowrap font-serif text-xl font-semibold text-gold">
            Sarah's Suggestions!
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 items-center gap-2">
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="/suggestions">Suggestions</Navbar.Link>
          <Navbar.Link href="/reviews">Reviews</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
          <Navbar.Link onClick={handleContactClick}>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <CustomContact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default CustomNavbar;
