import { Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/expense";
import { getCategoryMeta } from "../utils/categories";
import * as LucideIcons from "lucide-react";
import EmptyState from "./EmptyState";

/**
 * Renders the filtered list of expenses, or an empty-state if none exist.
 * Each row shows date, category (icon + name), amount, and a delete button.
 */
export default function ExpenseList({ expenses, onDelete, currency }) {
    if (expenses.length === 0) {
        return <EmptyState />;
    }

    // Sort by date descending (most recent first), then by createdAt
    const sorted = [...expenses].sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff !== 0) return dateDiff;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className="expense-list">
            <h2 className="list-title">
                Expenses
                <span className="list-count">{expenses.length}</span>
            </h2>

            <ul className="expense-items">
                {sorted.map((exp) => {
                    const meta = getCategoryMeta(exp.category);
                    const Icon = LucideIcons[meta.icon] || LucideIcons.MoreHorizontal;

                    return (
                        <li key={exp.id} className="expense-item">
                            <div
                                className="item-icon"
                                style={{ backgroundColor: meta.color + "22", color: meta.color }}
                            >
                                <Icon size={18} />
                            </div>

                            <div className="item-details">
                                <span className="item-category">{exp.category}</span>
                                <span className="item-date">{formatDate(exp.date)}</span>
                            </div>

                            <span className="item-amount">{formatCurrency(exp.amount, currency)}</span>

                            <button
                                className="btn-delete"
                                onClick={() => onDelete(exp.id)}
                                aria-label={`Delete ${exp.category} expense`}
                                title="Delete expense"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
