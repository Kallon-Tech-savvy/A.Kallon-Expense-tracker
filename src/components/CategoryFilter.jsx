import { getCategoryMeta } from "../utils/categories";

/**
 * Horizontal pill filter bar.
 * Shows "All" plus each category that has ≥ 1 expense.
 */
export default function CategoryFilter({
    categories,
    activeCategory,
    onSelect,
    categoryTotals,
}) {
    if (categories.length === 0) return null;

    return (
        <div className="category-filter">
            <button
                className={`filter-pill ${activeCategory === "All" ? "active" : ""}`}
                onClick={() => onSelect("All")}
            >
                All
            </button>

            {categories.map((cat) => {
                const meta = getCategoryMeta(cat);
                const count = categoryTotals[cat] ? 1 : 0; // used only for styling
                return (
                    <button
                        key={cat}
                        className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                        onClick={() => onSelect(cat)}
                        style={{
                            "--pill-color": meta.color,
                        }}
                    >
                        <span
                            className="bar-dot"
                            style={{ backgroundColor: meta.color }}
                        />
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}
