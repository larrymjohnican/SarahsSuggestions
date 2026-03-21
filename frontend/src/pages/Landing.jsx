"use client";

import { Card } from "flowbite-react";

const cardTheme = {
  root: {
    base: "flex rounded-lg border border-gold/30 bg-navy-light shadow-lg shadow-gold/10",
  },
};

function Landing() {
    return (
        <div className="bg-navy min-h-screen flex flex-col font-sans text-cream">

            {/* Hero Section */}
            <section className="flex flex-col py-16 px-4 text-center border-b border-gold/20">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-5xl mb-6 select-none" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-4xl md:text-5xl text-gold mb-6 leading-tight">
                        Welcome to Sarah's Suggestions
                    </h1>
                    <p className="text-parchment text-lg leading-relaxed">
                        I'm Sarah, a lifelong book lover with a passion for discovering and sharing captivating reads across all genres.
                        Whether you're into fiction, non-fiction, or something in between, my blog is here to guide you to your next great book.
                        Join me on this literary adventure, and let's explore the world of books together.
                    </p>
                    <div className="mt-8 text-gold/50 text-xl tracking-widest select-none" aria-hidden="true">✦ ✦ ✦</div>
                </div>
            </section>

            {/* Book Image Section */}
            <section className="flex justify-center py-12 px-4">
                <div className="container mx-auto flex justify-center">
                    <Card
                        theme={cardTheme}
                        className="max-w-sm"
                        imgSrc="/images/blog/image-4.jpg"
                    />
                </div>
            </section>

            {/* About Section */}
            <section className="flex-1 py-12 px-4 bg-navy-light/50 border-t border-gold/20">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="font-serif text-2xl text-gold mb-6 flex items-center gap-3">
                        <span aria-hidden="true">✦</span> About Us
                    </h2>
                    <div className="text-parchment leading-relaxed space-y-4">
                        <p>
                            Sarah's Suggestions is a haven for book lovers from all walks of life.
                            We understand that the world of books offers endless possibilities and insights, but finding a space where you can discuss your favorite titles without feeling judged can sometimes be challenging.
                        </p>
                        <p>
                            That's why we created this blog — to foster a community where every bookworm feels welcomed and valued.
                            Whether you are into fantasy, mystery, non-fiction, or any other genre, you'll find like-minded individuals ready to share their thoughts and recommendations.
                        </p>
                        <p>
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
