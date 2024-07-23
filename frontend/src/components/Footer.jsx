"use client";

import { Footer } from "flowbite-react";

export function CustomFooter() {
    return (
        <Footer container>
            <Footer.Copyright href="#" by="Johnican Investments™" year={2024} />
            <Footer.LinkGroup>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Licensing</Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    );
}
export default CustomFooter;
