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

    const genres = ["All", ...new Set(books.map((b) => b.genre))];

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
                    <div className="text-center py-20 text-gray-400 dark:text-parchment/40 font-sans">
                        Loading reviews… 🌙
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
                                {filtered.map((book) => (
                                    <BookCard key={book.id} book={book} />
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
