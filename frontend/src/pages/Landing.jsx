import useScrollReveal from "../hooks/useScrollReveal";

function Landing() {
    const [aboutRef, aboutRevealed] = useScrollReveal(0.15);
    return (
        <div className="bg-cream dark:bg-navy min-h-screen flex flex-col font-sans text-gray-800 dark:text-cream">

            {/* Hero Section */}
            <section className="flex flex-col py-20 px-4 text-center border-b border-gold/20 animate-fade-in">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-6xl mb-6 select-none drop-shadow-sm motion-safe:animate-moon-float" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-ember dark:text-gold mb-5 leading-tight tracking-tight">
                        Sarah's Suggestions
                    </h1>
                    <p className="text-gray-600 dark:text-parchment text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                        A lifelong reader's honest takes — spanning literary fiction, fantasy, and everything in between.
                        Find your next favourite book.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="/reviews"
                            className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-amber-500 transition-all duration-200 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5"
                        >
                            📚 Browse Reviews
                        </a>
                        <a
                            href="/suggestions"
                            className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-ember dark:text-gold text-sm font-semibold hover:bg-gold/10 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            ✨ Book Suggestions
                        </a>
                    </div>
                    <div className="mt-10 text-gold/40 text-xl tracking-widest select-none" aria-hidden="true">✦ ✦ ✦</div>
                </div>
            </section>

            {/* About Section */}
            <section className="flex-1 py-12 px-4 bg-parchment/30 dark:bg-navy-light/50 border-t border-gold/20">
                <div
                    ref={aboutRef}
                    className="container mx-auto max-w-3xl transition-all duration-700 ease-out"
                    style={{
                        opacity: aboutRevealed ? 1 : 0,
                        transform: aboutRevealed ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    <h2 className="font-serif text-2xl text-ember dark:text-gold mb-6 flex items-center gap-3">
                        <span aria-hidden="true">✦</span> About Us
                    </h2>
                    <div className="text-gray-700 dark:text-parchment leading-relaxed space-y-4">
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
