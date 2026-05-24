import { useState } from "react";
import MoonRating from "./MoonRating";

const AMAZON_TAG = "sarahssugge0e-20";

function getAmazonUrl(title, author) {
    const query = encodeURIComponent(`${title} ${author}`);
    return `https://www.amazon.com/s?k=${query}&tag=${AMAZON_TAG}`;
}

function BookCard({ book }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="rounded-xl border border-gold/20 bg-white/80 dark:bg-navy-light shadow-md shadow-gold/5 p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold/20 hover:shadow-xl">
            {/* Book Cover */}
            <div className="w-full aspect-[2/3] rounded-lg overflow-hidden border border-gold/10 bg-parchment/40 dark:bg-navy flex items-center justify-center">
                {(book.coverUrl || book.coverId) ? (
                    <img
                        src={book.coverUrl || `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    />
                ) : null}
                <div className={`text-5xl ${(book.coverUrl || book.coverId) ? "hidden" : "flex"} items-center justify-center w-full h-full flex-col gap-2`}>
                    <span>📖</span>
                    <span className="text-xs font-sans text-parchment/60 dark:text-parchment/40">No cover</span>
                </div>
            </div>

            {/* Genre Badge */}
            <span className="text-xs font-sans uppercase tracking-widest text-ember dark:text-gold border border-gold/30 rounded-full px-3 py-0.5 self-start">
                {book.genre}
            </span>

            {/* Title & Author */}
            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-cream leading-snug">{book.title}</h3>
                <p className="text-sm text-gray-500 dark:text-parchment/70 font-sans">{book.author}</p>
            </div>

            {/* Rating */}
            <MoonRating rating={book.rating} size="text-lg" />

            {/* Blurb */}
            <p className="text-sm text-gray-700 dark:text-parchment leading-relaxed font-sans">
                {expanded ? book.fullReview : book.shortBlurb}
            </p>

            {/* Toggle */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-ember dark:text-gold hover:underline self-start font-sans mt-auto"
            >
                {expanded ? "Read less ↑" : "Read more ↓"}
            </button>

            {/* Affiliate Buy Button */}
            <a
                href={getAmazonUrl(book.title, book.author)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md font-sans"
                style={{ background: '#c9a84c', color: '#1a1a2e' }}
            >
                🛒 Buy on Amazon
            </a>
        </div>
    );
}

export default BookCard;
