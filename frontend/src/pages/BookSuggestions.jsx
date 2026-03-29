import { useState } from "react";
import BookCard from "../components/BookCard";
import GenreFilter from "../components/GenreFilter";
import { suggestions, genres } from "../data/books";

function BookSuggestions() {
    const [selectedGenre, setSelectedGenre] = useState("All");

    const filtered = selectedGenre === "All"
        ? suggestions
        : suggestions.filter(b => b.genre === selectedGenre);

    return (
        <div className="min-h-screen bg-cream dark:bg-navy text-gray-800 dark:text-cream px-4 py-12">
            <div className="container mx-auto max-w-5xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="text-4xl mb-3 select-none" aria-hidden="true">✦</div>
                    <h1 className="font-serif text-4xl text-ember dark:text-gold mb-3">Book Suggestions</h1>
                    <p className="text-gray-600 dark:text-parchment font-sans max-w-xl mx-auto">
                        Books I think you'll love — hand-picked recommendations from my shelf to yours.
                    </p>
                    <div className="mt-4 text-gold/40 tracking-widest select-none" aria-hidden="true">✦ ✦ ✦</div>
                </div>

                {/* Genre Filter */}
                <GenreFilter
                    genres={genres}
                    selected={selectedGenre}
                    onSelect={setSelectedGenre}
                />

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 dark:text-parchment/40 font-sans">
                        No suggestions for this genre yet. More coming soon! ✦
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookSuggestions;
