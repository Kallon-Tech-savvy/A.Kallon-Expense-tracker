/**
 * Default expense categories with display metadata.
 * Each category has a name, a lucide-react icon name, and an accent color.
 */
export const CATEGORIES = [
    { name: "Food & Dining", icon: "Utensils", color: "#f59e0b" },
    { name: "Transport", icon: "Car", color: "#3b82f6" },
    { name: "Entertainment", icon: "Film", color: "#8b5cf6" },
    { name: "Shopping", icon: "ShoppingBag", color: "#ec4899" },
    { name: "Bills & Utilities", icon: "Zap", color: "#10b981" },
    { name: "Health", icon: "Heart", color: "#ef4444" },
    { name: "Other", icon: "MoreHorizontal", color: "#6b7280" },
];

/**
 * Look up a category object by name. Returns the "Other" fallback if not found.
 */
export function getCategoryMeta(name) {
    return (
        CATEGORIES.find((c) => c.name === name) ||
        CATEGORIES[CATEGORIES.length - 1]
    );
}
