/**
 * Simple confetti explosion using standard DOM elements.
 * Creates particles, animates them, and cleans them up.
 */
export function triggerConfetti() {
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.classList.add("confetti");

        // Random properties
        const bg = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * window.innerWidth;
        const y = -10; // start above screen
        // Actually burst from center or random?
        // Let's burst from center-bottom or just rain down?
        // "Alive" usually implies feedback. Burst from center is good.
        // Let's do a burst from the mouse position? No, easy is center.

        // Better: burst from center of screen
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const tx = Math.cos(angle) * 200 * Math.random();
        const ty = Math.sin(angle) * 200 * Math.random();

        p.style.backgroundColor = bg;
        p.style.left = "50%";
        p.style.top = "50%";
        p.style.setProperty("--tx", `${tx}px`);
        p.style.setProperty("--ty", `${ty}px`);

        document.body.appendChild(p);

        // Remove after animation
        setTimeout(() => {
            p.remove();
        }, 1000);
    }
}
