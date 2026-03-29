import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-screen bg-[#f5f0e8] dark:bg-[#0f1729] flex flex-col items-center justify-center px-4 text-center">

            {/* Moon + floating book */}
            <div className="mb-6 select-none text-7xl animate-bounce" aria-hidden="true">
                🌙
            </div>

            {/* 404 */}
            <h1
                className="font-serif text-8xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#c9a84c' }}
            >
                404
            </h1>

            {/* Divider */}
            <div className="text-[#c9a84c]/50 text-xl tracking-widest mb-6 select-none" aria-hidden="true">
                ✦ ✦ ✦
            </div>

            {/* Heading */}
            <h2
                className="font-serif text-2xl md:text-3xl mb-4 text-[#1a1a2e] dark:text-[#f5f0e8]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
                This page seems to have wandered off the shelf.
            </h2>

            {/* Subtext */}
            <p
                className="text-gray-600 dark:text-[#d4c9b0] max-w-md leading-relaxed mb-10"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
                The page you're looking for doesn't exist — or maybe it was never written.
                Either way, there are plenty of good reads waiting for you back home.
            </p>

            {/* Back home button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                    background: '#c9a84c',
                    color: '#1a1a2e',
                    fontFamily: "'Lora', Georgia, serif"
                }}
            >
                📖 Back to the Reading Nook
            </Link>
        </div>
    )
}

export default NotFound
