import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import GenreFilter from "../components/GenreFilter";
import { reviews as staticReviews } from "../data/books";
import api from "../api";

function Reviews() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState("All");

    useEffect(() => {
        api.get("/api/goodreads/reviews")
            .then((res) => {
                const data = Array.isArray(res.data) && res.data.length > 0
                    ? res.data
                    : staticReviews;
                setBooks(data);
            })
            .catch(() => {
                setBooks(staticReviews);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const genres = ["All", ...new Set(books.map((b) => b.genre).filter((g) => g && g !== "All"))];

    const filtered = selectedGenre === "All"
        ? books
        : books.filter((b) => b.genre === selectedGenre);

    return (
        <div className="min-h-screen bg-cream dark:bg-navy text-gray-800 dark:text-cream px-4 py-12">
            <div className="container mx-auto max-w-5xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="text-4xl mb-3 select-none" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-4xl text-ember dark:text-gold mb-3">Book Reviews</h1>
                    <p className="text-gray-600 dark:text-parchment font-sans max-w-xl mx-auto">
                        Honest thoughts from a lifelong reader. Every book here has earned its place on my shelf.
                    </p>
                    <div className="mt-4 text-gold/40 tracking-widest select-none" aria-hidden="true">✦ ✦ ✦</div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading reviews">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="rounded-xl border border-gold/20 bg-white/80 dark:bg-navy-light shadow-md shadow-gold/5 p-5 flex flex-col gap-3 animate-pulse">
                                <div className="w-full h-64 rounded-lg bg-parchment/60 dark:bg-navy" />
                                <div className="h-5 w-20 rounded-full bg-parchment/60 dark:bg-navy" />
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 rounded bg-parchment/60 dark:bg-navy" />
                                    <div className="h-3 w-1/2 rounded bg-parchment/40 dark:bg-navy/60" />
                                </div>
                                <div className="flex gap-1">{[1,2,3,4,5].map((i) => <div key={i} className="h-4 w-4 rounded-full bg-parchment/60 dark:bg-navy" />)}</div>
                                <div className="space-y-1.5">
                                    <div className="h-3 rounded bg-parchment/40 dark:bg-navy/60" />
                                    <div className="h-3 w-5/6 rounded bg-parchment/40 dark:bg-navy/60" />
                                    <div className="h-3 w-4/6 rounded bg-parchment/40 dark:bg-navy/60" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Genre Filter */}
                        <GenreFilter
                            genres={genres}
                            selected={selectedGenre}
                            onSelect={setSelectedGenre}
                        />

                        {/* Grid */}
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((book, idx) => (
                                    <div
                                        key={book.id}
                                        className="motion-safe:animate-card-enter"
                                        style={{ animationDelay: `${idx * 75}ms` }}
                                    >
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-400 dark:text-parchment/40 font-sans">
                                No reviews yet for this genre. Check back soon! 🌙
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Reviews;
