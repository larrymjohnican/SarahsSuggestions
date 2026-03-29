import { useState, useEffect } from "react";
import api from "../api";

const STATUSES = [
    { value: "currently-reading", label: "Currently Reading", emoji: "📖" },
    { value: "want-to-read", label: "Want to Read", emoji: "🌙" },
    { value: "finished", label: "Finished", emoji: "✦" },
];

function StatusBadge({ status }) {
    const match = STATUSES.find(s => s.value === status);
    const colors = {
        "currently-reading": "bg-gold/20 text-ember dark:text-gold border-gold/30",
        "want-to-read": "bg-navy/10 dark:bg-navy-light text-gray-600 dark:text-parchment border-gold/20",
        "finished": "bg-parchment/40 dark:bg-navy-light text-gray-700 dark:text-parchment/70 border-gold/20",
    };
    return (
        <span className={`text-xs font-sans px-2 py-0.5 rounded-full border ${colors[status] || ""}`}>
            {match?.emoji} {match?.label || status}
        </span>
    );
}

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("currently-reading");

    useEffect(() => { getNotes(); }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then(res => setNotes(res.data))
            .catch(err => console.error(err));
    };

    const createNote = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        api.post("/api/notes/", { title, content: status })
            .then(() => { setTitle(""); getNotes(); })
            .catch(err => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then(() => getNotes())
            .catch(err => alert(err));
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-navy text-gray-800 dark:text-cream px-4 py-12">
            <div className="container mx-auto max-w-4xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl text-ember dark:text-gold mb-2">My Reading Tracker 🌙</h1>
                    <p className="text-gray-500 dark:text-parchment/60 font-sans text-sm">Your private reading list. Just for you.</p>
                </div>

                {/* Add Book Form */}
                <form onSubmit={createNote} className="flex gap-3 mb-10 flex-wrap">
                    <input
                        type="text"
                        placeholder="Book title..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="flex-1 min-w-[180px] px-4 py-2 rounded-lg border border-gold/30 bg-white/80 dark:bg-navy-light text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-gray-400 dark:placeholder:text-parchment/40"
                    />
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gold/30 bg-white/80 dark:bg-navy-light text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                        {STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-gold text-navy font-semibold font-sans text-sm hover:bg-gold-light transition-colors"
                    >
                        Add Book
                    </button>
                </form>

                {/* Reading Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {STATUSES.map(s => {
                        const books = notes.filter(n => n.content === s.value);
                        return (
                            <div key={s.value} className="rounded-xl border border-gold/20 bg-white/60 dark:bg-navy-light p-5">
                                <h2 className="font-serif text-lg text-ember dark:text-gold mb-4 flex items-center gap-2">
                                    <span>{s.emoji}</span> {s.label}
                                    <span className="ml-auto text-xs text-gray-400 dark:text-parchment/40 font-sans font-normal">{books.length}</span>
                                </h2>
                                {books.length === 0 ? (
                                    <p className="text-xs text-gray-400 dark:text-parchment/30 font-sans italic">Nothing here yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {books.map(book => (
                                            <li key={book.id} className="flex items-start justify-between gap-2 bg-cream/50 dark:bg-navy rounded-lg px-3 py-2 border border-gold/10">
                                                <span className="text-sm font-sans text-gray-800 dark:text-cream leading-snug">{book.title}</span>
                                                <button
                                                    onClick={() => deleteNote(book.id)}
                                                    className="text-gray-300 dark:text-parchment/30 hover:text-red-400 transition-colors text-lg leading-none mt-0.5 flex-shrink-0"
                                                    aria-label="Remove"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
