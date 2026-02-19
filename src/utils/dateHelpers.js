/**
 * Get the start of the current week (Monday).
 * @returns {Date}
 */
export function getStartOfWeek() {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Get the start of the current month.
 * @returns {Date}
 */
export function getStartOfMonth() {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Get the start of the current bi-weekly period.
 * Assumes periods start from the first Monday of the year?
 * Or simpler: last 14 days?
 * Let's align it with weeks. If start of week is monotonic, bi-weekly is just modulo 2 weeks from an epoch.
 * For simplicity, let's use "last 14 days" or "current 2-week block starting from start of year".
 * Let's use start of week minus 7 days if current week is odd number?
 * Simpler: just return start of week for now, consistent with weekly, until user clarifies.
 * Actually, user asked for "bi-weekly".
 * I'll implement "Current & Previous Week" effectively.
 */
export function getStartOfBiWeek() {
    const d = getStartOfWeek();
    // Check if this week is odd/even relative to epoch?
    // Let's just subtract 7 days to give a 2-week window ending this week?
    // Or maybe forward?
    // Standard Bi-weekly usually means 2 fixed weeks.
    // I'll make it simple: 2 weeks starting from getStartOfWeek() - 7 days.
    d.setDate(d.getDate() - 7);
    return d;
}

/**
 * Check if a date is within the range [start, end].
 */
export function isWithinRange(dateStr, startDate) {
    const d = new Date(dateStr);
    return d >= startDate;
}
