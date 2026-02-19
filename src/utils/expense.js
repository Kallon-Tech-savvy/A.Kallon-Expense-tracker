/**
 * Pure utility functions for expense validation, formatting, and aggregation.
 * Amounts are stored as integers (cents) to avoid floating-point rounding bugs.
 */

/**
 * Validate raw form input before creating an expense.
 * @param {{ amount: string, category: string, date: string }} input
 * @returns {{ valid: boolean, errors: { amount?: string, category?: string, date?: string } }}
 */
export function validateExpense({ amount, category, date }) {
    const errors = {};

    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0 || !isFinite(parsed)) {
        errors.amount = "Enter a positive amount";
    }

    if (!category || category.trim() === "") {
        errors.category = "Select a category";
    }

    if (!date || isNaN(new Date(date).getTime())) {
        errors.date = "Enter a valid date";
    }

    return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Convert a dollar string (e.g. "12.50") to cents integer (1250).
 */
export function dollarsToCents(dollarStr) {
    return Math.round(parseFloat(dollarStr) * 100);
}

/**
 * Format cents integer to a locale currency string.
 * @param {number} cents
 * @param {string} currency - currency code e.g. "USD", "EUR", "GBP"
 * @returns {string} e.g. "$12.50"
 */
export function formatCurrency(cents, currency = "USD") {
    if (currency === null) return "---";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(cents / 100);
}

/**
 * Sum an array of expenses (each with an `amount` in cents).
 * @param {Array<{ amount: number }>} list
 * @returns {number} total in cents
 */
export function sumExpenses(list) {
    return list.reduce((acc, exp) => acc + exp.amount, 0);
}

/**
 * Group expenses by category and return totals.
 * @param {Array<{ category: string, amount: number }>} list
 * @returns {Record<string, number>} e.g. { "Food & Dining": 4500, "Transport": 1200 }
 */
export function groupByCategory(list) {
    return list.reduce((map, exp) => {
        map[exp.category] = (map[exp.category] || 0) + exp.amount;
        return map;
    }, {});
}

/**
 * Format a date string to a human-readable short form.
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "Feb 18, 2026"
 */
export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
