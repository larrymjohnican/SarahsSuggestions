function MoonRating({ rating, size = "text-xl" }) {
    return (
        <div className={`flex gap-0.5 ${size}`} aria-label={`${rating} out of 5 moons`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= rating ? "opacity-100" : "opacity-25"}>
                    🌙
                </span>
            ))}
        </div>
    );
}

export default MoonRating;
