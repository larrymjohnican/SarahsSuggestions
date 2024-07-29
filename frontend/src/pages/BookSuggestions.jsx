"use client";
import { Card } from "flowbite-react";

function BookSuggestions() {
    return <div className="h-screen flex flex-col font-serif"> 
    {/* Ensure the page fills the screen height */}
        <h1 className="font-serif hero-title text-4xl  mb-4 text-center ">Featured Posts</h1>
        <div className="flex flex-row justify-center items-center gap-8">
        <Card
      className="max-w-lg h-96  "
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/images/blog/image-1.jpg">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Post Tittle
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
        </Card>

        <Card
      className="max-w-lg h-96"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/images/blog/image-1.jpg">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Post Tittle
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
        </Card>
    </div>
</div>
}

export default BookSuggestions;