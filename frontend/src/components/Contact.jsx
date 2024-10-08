"use client";

import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { HiEnvelope } from "react-icons/hi2";

export function CustomContact({ isOpen, onClose }) {

  return (
    <>
      <Drawer open={isOpen} onClose={onClose}>
        <Drawer.Header title="CONTACT US" titleIcon={HiEnvelope} />
        <Drawer.Items>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              <TextInput id="email" name="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:sarahssuggestions@gmail.com" className="hover:underline">
                sarahssuggestions@gmail.com
              </a>
            </p>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default CustomContact;
