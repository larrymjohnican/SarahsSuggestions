const books = [
    {
        id: 1,
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy Romance",
        rating: 5,
        coverId: 14407898,
        isSuggestion: false,
        shortBlurb: "I genuinely did not sleep the night I started this book. Dragons, war college, and a slow-burn romance that had me completely unhinged — this is everything I didn't know I needed.",
        fullReview: "Fourth Wing swept me off my feet in a way I haven't experienced since discovering fantasy as a kid. Violet Sorrengail is the protagonist I've been waiting for — small but fierce, clever, and utterly compelling. The dragon-bonding lore is intricate and believable, and the romantic tension between Violet and Xaden is the kind that makes you forget to breathe. Rebecca Yarros built a world so vivid I felt like I was at Basgiath War College myself. An absolute 5-moon read — I finished it in one sitting and immediately bought Iron Flame."
    },
    {
        id: 2,
        title: "Iron Flame",
        author: "Rebecca Yarros",
        genre: "Fantasy Romance",
        rating: 5,
        coverId: 14405746,
        isSuggestion: false,
        shortBlurb: "The sequel to Fourth Wing delivered everything I wanted and more. Higher stakes, deeper lore, and that slow-burn finally paying off — I was a wreck by the last page.",
        fullReview: "Iron Flame picks up immediately where Fourth Wing left off and doesn't let up for a single chapter. The world-building expands in ways I genuinely didn't see coming, and the emotional weight of Violet and Xaden's relationship deepens in a way that felt earned rather than manufactured. Yarros has a gift for writing action sequences that are both thrilling and emotionally resonant. I cried twice and cheered out loud at least three times. If you loved Fourth Wing, this is not optional — you need it."
    },
    {
        id: 3,
        title: "A Court of Thorns and Roses",
        author: "Sarah J. Maas",
        genre: "Fantasy Romance",
        rating: 5,
        coverId: 8738585,
        isSuggestion: true,
        shortBlurb: "If Fourth Wing is your entry point into fantasy romance, ACOTAR is your next stop. Fae, magic, and a romance that evolves across the whole series in the most satisfying way.",
        fullReview: "A Court of Thorns and Roses is the book that turned me into a fantasy romance reader for life. Feyre is a hunter who ends up in a world of Fae, and Sarah J. Maas builds that world with breathtaking detail and beauty. The romance is slow, layered, and genuinely surprising in its direction. The first book is a complete story on its own, but the series truly hits its stride in ACOMAF — which is, without exaggeration, one of the best fantasy books I've ever read. Start here and don't look back."
    },
    {
        id: 4,
        title: "From Blood and Ash",
        author: "Jennifer L. Armentrout",
        genre: "Fantasy Romance",
        rating: 4,
        coverId: 14105538,
        isSuggestion: true,
        shortBlurb: "A guilty-pleasure fantasy romance with a forbidden love angle that is absolutely delicious. Poppy and Hawke have chemistry that leaps off the page.",
        fullReview: "From Blood and Ash is the kind of book you read in one weekend and then immediately need to talk to someone about. Poppy is a Maiden — sheltered, controlled, and forbidden from almost everything — and Hawke is her guard with secrets that will blow your mind by the finale. Armentrout writes romance with an intensity that's hard to match, and the world-building gets richer with every book in the series. It's a little spicier than ACOTAR, so keep that in mind, but the plot twists alone are worth the ride."
    },
    {
        id: 5,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        genre: "Epic Fantasy",
        rating: 5,
        coverId: 11480483,
        isSuggestion: true,
        shortBlurb: "If you want to venture beyond fantasy romance into pure epic fantasy, this is the gold standard. Kvothe's story is told with such beauty that the prose itself feels like magic.",
        fullReview: "The Name of the Wind is proof that fantasy can be literary without losing any of its wonder. Kvothe is one of the most compelling protagonists I've ever encountered — a legend telling his own story, aware of the gap between myth and reality. Rothfuss writes with a lyrical precision that makes every chapter feel intentional. The magic system (Sympathy) is one of the most original I've come across, rooted in logic and consequence rather than arbitrary power. This one is slower and more character-driven than Fourth Wing, but it rewards patience with something truly special."
    },
    {
        id: 6,
        title: "Throne of Glass",
        author: "Sarah J. Maas",
        genre: "Fantasy",
        rating: 4,
        coverId: 13312488,
        isSuggestion: false,
        shortBlurb: "Celaena Sardothien is one of the most iconic heroines in fantasy. This series starts strong and only gets bigger — by book four it becomes something truly epic.",
        fullReview: "Throne of Glass introduces Celaena Sardothien, an assassin pulled from a labor camp to compete for her freedom, and I was hooked from the first chapter. The early books have a lighter, more adventurous tone than Maas's ACOTAR series, but by Kingdom of the Wren the scope has expanded into something breathtakingly ambitious. The character development across the series is some of the best I've seen — Celaena's arc is transformative in the truest sense. If you're willing to commit to the full series, it's one of the most rewarding journeys in modern fantasy."
    }
];

export const genres = [...new Set(books.map(b => b.genre))];
export const reviews = books.filter(b => !b.isSuggestion);
export const suggestions = books.filter(b => b.isSuggestion);

export default books;
