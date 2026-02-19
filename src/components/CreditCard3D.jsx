import { useState } from "react";
import { formatCurrency } from "../utils/expense";
import { MoveHorizontal } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

/**
 * Interactive 3D Credit Card.
 * Front: Shows Budget Goal.
 * Back: Setting form for Budget & Cycle.
 * Click to flip.
 */
export default function CreditCard3D({ total, currency, budget, setBudget }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [editAmount, setEditAmount] = useState(budget.amount / 100); // display in dollars
    const [editCycle, setEditCycle] = useState(budget.cycle);

    const animatedBudget = useCountUp(budget.amount);
    const animatedTotal = useCountUp(total);

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleSave = (e) => {
        e.stopPropagation();
        setBudget({
            amount: parseFloat(editAmount) * 100, // store in cents
            cycle: editCycle,
        });
        setIsFlipped(false);
    };

    const handleInputClick = (e) => e.stopPropagation();

    // Progress logic
    const colors = {
        green: "linear-gradient(135deg, #10b981, #059669)",
        yellow: "linear-gradient(135deg, #f59e0b, #d97706)",
        red: "linear-gradient(135deg, #ef4444, #b91c1c)",
    };

    const pct = budget.amount > 0 ? (total / budget.amount) * 100 : 0;
    let bg = colors.green;
    if (pct > 80) bg = colors.yellow;
    if (pct > 100) bg = colors.red;

    return (
        <div className="card-scene">
            <div
                className={`card-3d ${isFlipped ? "flipped" : ""}`}
                onClick={handleFlip}
            >
                {/* FRONT FACE */}
                <div className="card-face card-front" style={{ background: bg }}>
                    <div className="card-chip" />
                    <div className="card-logo">VISA</div>
                    <div className="card-number">•••• •••• •••• 1234</div>

                    <div className="card-details-row">
                        <div className="card-details">
                            <span className="card-label">Budget ({budget.cycle})</span>
                            <span className="card-balance">{formatCurrency(animatedBudget, currency)}</span>
                        </div>
                        <div className="card-details" style={{ alignItems: "flex-end" }}>
                            <span className="card-label">Spent</span>
                            <span className="card-balance">{formatCurrency(animatedTotal, currency)}</span>
                        </div>
                    </div>

                    <div className="flip-hint">
                        <MoveHorizontal size={14} /> Flip to Edit
                    </div>
                </div>

                {/* BACK FACE */}
                <div className="card-face card-back">
                    <div className="card-strip" />
                    <div className="card-settings" onClick={handleInputClick}>
                        <h3>Set Budget</h3>

                        <div className="card-field">
                            <label>Amount</label>
                            <input
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        <div className="card-field">
                            <label>Cycle</label>
                            <select
                                value={editCycle}
                                onChange={(e) => setEditCycle(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-weekly">Bi-weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>

                        <button className="btn-save-card" onClick={handleSave}>
                            Save Budget
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
