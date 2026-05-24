function MoonRating({ rating, size = "text-xl" }) {
    if (!rating) return null;
    return (
        <div className={`flex gap-0.5 ${size}`} aria-label={`${rating} out of 5 moons`}>
            {[1, 2, 3, 4, 5].map((i) =>
                i <= rating ? (
                    <span
                        key={i}
                        className="inline-block motion-safe:animate-star-pop"
                        style={{ animationDelay: `${(i - 1) * 60}ms` }}
                    >
                        🌙
                    </span>
                ) : (
                    <span key={i} className="opacity-25">🌙</span>
                )
            )}
        </div>
    );
}

export default MoonRating;
