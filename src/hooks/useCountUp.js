import { useState, useEffect } from "react";

/**
 * Animates a number from 0 (or start) to end value over a duration.
 * @param {number} end - The target value
 * @param {number} duration - Duration in ms (default 1000)
 * @returns {number} The current animated value
 */
export function useCountUp(end, duration = 1000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let startValue = count; // start from current value to handle updates smoothly

        // If jump is too large, maybe reset? No, smooth transition is better.
        // But if we just loaded, startValue is 0.

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const pct = Math.min(progress / duration, 1);

            // Ease out cubic
            const ease = 1 - Math.pow(1 - pct, 3);

            const current = startValue + (end - startValue) * ease;
            setCount(current);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
}
