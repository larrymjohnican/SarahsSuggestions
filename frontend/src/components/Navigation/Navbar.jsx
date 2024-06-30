"use client";

import { Link } from "react-router-dom";
import { Navbar as FlowbiteNavbar } from "@material-tailwind/react";

export const CustomNavbar = () => {
  return (
    <FlowbiteNavbar fluid rounded>
      <FlowbiteNavbar.Brand as={Link} to="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link to="#" active>
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="#">
          About
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link to="#">Services</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link to="#">Pricing</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link to="#">Contact</FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default CustomNavbar;
