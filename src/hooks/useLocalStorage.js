import { useEffect, useState } from "react";

/**
 * Sync a piece of state with localStorage.
 * - Lazy-initializes from storage on mount
 * - Falls back to `initialValue` if storage is empty or corrupted
 * - Writes back on every state change
 */
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored === null) return initialValue;
            const parsed = JSON.parse(stored);
            // Guard: if we expect an array, reject non-array stored data
            if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
                return initialValue;
            }
            return parsed;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or unavailable — silently ignore
        }
    }, [key, value]);

    return [value, setValue];
}
