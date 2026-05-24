const SPARKLE_DELAYS = [0, 0.35, 0.7, 1.05];

function MoonRating({ rating, size = "text-xl" }) {
    if (!rating) return null;
    const isPerfect = rating === 5;

    return (
        <div className="flex flex-col gap-1">
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

            {isPerfect && (
                <div className="flex gap-2 items-center motion-safe:block hidden" aria-hidden="true">
                    {SPARKLE_DELAYS.map((delay, i) => (
                        <span
                            key={i}
                            className="text-gold text-xs motion-safe:animate-sparkle-twinkle select-none"
                            style={{ animationDelay: `${delay}s` }}
                        >
                            ✦
                        </span>
                    ))}
                    <span className="text-xs font-sans text-gold/70 tracking-wide">perfect read</span>
                </div>
            )}
        </div>
    );
}

export default MoonRating;
