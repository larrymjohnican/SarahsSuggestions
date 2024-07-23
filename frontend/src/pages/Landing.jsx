"use client";

import { Card } from "flowbite-react";


function Landing() {
    return (
        <div className=" bg-gradient-to-r from-gray-400 via-gray-100 to-black h-screen flex flex-col font-serif"> {/* Ensure the page fills the screen height */}
            {/* Hero Section */}
            <section className=" flex flex-col hero">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="hero-title text-4xl  mb-4 text-center">Welcome to Sarah's Suggestions!</h2>
                    <p className="hero-subtitle text-lg ">
                        I'm Sarah, a lifelong book lover with a passion for discovering and sharing captivating reads across all genres.
                        Whether you're fiction, non-fiction, or something in between, my blog is here to guide you to your next great book.
                        Join me on this literary adventure, and let's explore the world of books together!
                    </p>
                </div>
            </section>
            {/*img section*/}
            <section id="bookimg" className="flex hero">
                <div className="container mx-auto ">
                    <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" >
                    </Card>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="flex-1 about">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold ">About Us</h2>
                    <div className="about-content mt-4">
                        <p>Sarah's Suggestions is a haven for book lovers from all walks of life.
                            We understand that the world of books offers endless possibilities and insights, but finding a space where you can discuss your favorite titles without feeling judged can sometimes be challenging.
                            That's why we created this blog - to foster a community where every bookworm feels welcomed and valued.
                            Whether you are into fantasy, mystery, non-fiction, or any other genre, you’ll find like-minded individuals ready to share their thoughts and recommendations.
                            Our mission is to create an inclusive environment where passionate discussions about books can thrive.
                            Dive into our curated content, engage in thought-provoking conversations, and discover your next great read here at Sarah's Suggestions.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;
