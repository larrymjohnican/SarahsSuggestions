"use client";

import { useState } from 'react';
import { Navbar, DarkThemeToggle } from "flowbite-react";
import logo from '../../assets/logo.png'; // Import the logo
import CustomContact from "../Contact";

export const CustomNavbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => setIsContactOpen(true);

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src={logo} className="mr-3 w-12 h-12 sm:w-16 sm:h-16" alt="SS Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sarah's Suggestions!</span>
        </Navbar.Brand>
        <div className="flex md:order-2">    
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="/suggestions">Suggestions</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
          <Navbar.Link onClick={handleContactClick}>Contact</Navbar.Link>
        </Navbar.Collapse>
        <DarkThemeToggle />
      </Navbar>
      <CustomContact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default CustomNavbar;
