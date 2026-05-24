import { useState, useEffect } from "react";

/**
 * ReadingProgress — a 2px gold bar fixed at the very top of the viewport.
 * Its width reflects the user's scroll position on the page.
 * Hidden entirely when prefers-reduced-motion: reduce is set.
 */
function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (reducedMotion) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollable = docHeight - viewportHeight;
            if (scrollable <= 0) {
                setProgress(0);
                return;
            }
            setProgress((scrollY / scrollable) * 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initialise on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [reducedMotion]);

    if (reducedMotion) return null;

    return (
        <div
            role="progressbar"
            aria-label="Reading progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "2px",
                width: `${progress}%`,
                backgroundColor: "#c9a227", // gold
                zIndex: 9999,
                transition: "width 0.1s linear",
                pointerEvents: "none",
            }}
        />
    );
}

export default ReadingProgress;
