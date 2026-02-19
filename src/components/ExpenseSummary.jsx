import { formatCurrency } from "../utils/expense";
import { getCategoryMeta } from "../utils/categories";
import { useCountUp } from "../hooks/useCountUp";

/**
 * Displays the total spending and a per-category breakdown bar chart.
 * Features a 3D animated coin and hover interaction on the total.
 */
export default function ExpenseSummary({ total, categoryTotals, currency }) {
    const animatedTotal = useCountUp(total);

    const categoryEntries = Object.entries(categoryTotals).sort(
        ([, a], [, b]) => b - a
    );

    const maxAmount = categoryEntries.length > 0 ? categoryEntries[0][1] : 0;

    return (
        <div className="expense-summary">
            <div className="summary-header">
                <div className="scene-3d">
                    <div className="coin-3d">
                        <div className="coin-face">{currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "JPY" ? "¥" : "$"}</div>
                        <div className="coin-edge"></div>
                        <div className="coin-face back">{currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "JPY" ? "¥" : "$"}</div>
                    </div>
                </div>

                <div className="summary-total-text">
                    <span className="total-label">Total Spending</span>
                    <div className="perspective-wrapper">
                        <span className={`total-amount ${total > 100000 ? "over-budget" : ""}`}>
                            {formatCurrency(animatedTotal, currency)}
                        </span>
                    </div>
                </div>
            </div>

            {categoryEntries.length > 0 && (
                <div className="category-breakdown">
                    <h3 className="breakdown-title">By Category</h3>
                    <ul className="breakdown-bars">
                        {categoryEntries.map(([cat, amt]) => {
                            const meta = getCategoryMeta(cat);
                            const pct = maxAmount > 0 ? (amt / maxAmount) * 100 : 0;

                            return (
                                <li key={cat} className="bar-row">
                                    <div className="bar-label">
                                        <span className="bar-dot" style={{ backgroundColor: meta.color }} />
                                        <span className="bar-name">{cat}</span>
                                        <span className="bar-amount">{formatCurrency(amt, currency)}</span>
                                    </div>
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${pct}%`,
                                                backgroundColor: meta.color,
                                            }}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
