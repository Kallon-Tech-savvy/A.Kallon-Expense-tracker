import { useState } from "react";
import { CATEGORIES } from "../utils/categories";

/**
 * Form to add a new expense.
 * Validates inline and clears on successful submit.
 */
export default function ExpenseForm({ onAdd }) {
    const today = new Date().toISOString().split("T")[0];

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(today);
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        const result = onAdd({ amount, category, date });

        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        // Reset on success
        setAmount("");
        setCategory("");
        setDate(today);
        setErrors({});
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit} noValidate>
            <h2 className="form-title">Add Expense</h2>

            <div className="form-group">
                <label htmlFor="expense-amount">Amount ($)</label>
                <input
                    id="expense-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={errors.amount ? "input-error" : ""}
                />
                {errors.amount && <span className="error-msg">{errors.amount}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="expense-category">Category</label>
                <select
                    id="expense-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={errors.category ? "input-error" : ""}
                >
                    <option value="">Select category…</option>
                    {CATEGORIES.map((c) => (
                        <option key={c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <span className="error-msg">{errors.category}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="expense-date">Date</label>
                <input
                    id="expense-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={errors.date ? "input-error" : ""}
                />
                {errors.date && <span className="error-msg">{errors.date}</span>}
            </div>

            <button type="submit" className="btn-add">
                Add Expense
            </button>
        </form>
    );
}
