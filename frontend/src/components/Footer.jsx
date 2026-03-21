"use client";

import { Footer } from "flowbite-react";

const footerTheme = {
  root: {
    base: "bg-navy border-t border-gold/20 w-full",
    container: "w-full p-6",
  },
  copyright: {
    base: "text-parchment font-sans text-sm",
    href: "text-gold hover:text-gold-light transition-colors duration-200",
    span: "text-parchment",
  },
  groupLink: {
    base: "flex flex-wrap text-sm text-parchment",
    link: {
      base: "me-4 last:me-0",
      href: "text-parchment hover:text-gold transition-colors duration-200",
    },
  },
};

export function CustomFooter() {
    return (
        <Footer theme={footerTheme} container>
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                <Footer.Copyright href="#" by="Johnican Investments™" year={2024} />
                <Footer.LinkGroup>
                    <Footer.Link href="#">About</Footer.Link>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                    <Footer.Link href="#">Licensing</Footer.Link>
                </Footer.LinkGroup>
            </div>
        </Footer>
    );
}
export default CustomFooter;
