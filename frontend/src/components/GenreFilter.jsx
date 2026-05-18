function GenreFilter({ genres, selected, onSelect }) {
    const all = ["All", ...genres];

    return (
        <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter by genre">
            {all.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onSelect(genre)}
                    aria-pressed={selected === genre}
                    className={`px-4 py-1.5 rounded-full text-sm font-sans border transition-colors duration-200
                        ${selected === genre
                            ? "bg-gold dark:bg-gold text-navy border-gold font-semibold"
                            : "bg-transparent border-gold/40 text-gray-600 dark:text-parchment hover:border-gold hover:text-ember dark:hover:text-gold"
                        }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}

export default GenreFilter;
