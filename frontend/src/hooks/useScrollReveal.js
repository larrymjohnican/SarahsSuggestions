import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — returns a ref and a boolean `revealed`.
 * Attach the ref to a container; `revealed` flips true once
 * the element crosses the viewport threshold.
 *
 * @param {number} threshold - IntersectionObserver threshold (default 0.15)
 */
function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    observer.disconnect(); // fire once only
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, revealed];
}

export default useScrollReveal;
