"use client";

import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar, DarkThemeToggle} from "flowbite-react";
import logo from '../../assets/logo.png'; // Import the logo


export const CustomNavbar = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
      <img src={logo} className="mr-3 w-12 h-12 sm:w-16 sm:h-16" alt="SS Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sarah's Suggestions!</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Suggestiions</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
      <DarkThemeToggle />

    </Navbar>
  );
}

export default CustomNavbar;
