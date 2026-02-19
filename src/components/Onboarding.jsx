/**
 * Full-screen onboarding overlay to select currency.
 */
export default function Onboarding({ onSelect }) {
    const currencies = ["USD", "EUR", "GBP", "JPY"];

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card">
                <h1>Welcome to Expense Tracker</h1>
                <p>Select your currency to get started.</p>

                <div className="currency-grid">
                    {currencies.map((c) => (
                        <button key={c} onClick={() => onSelect(c)} className="onboarding-btn">
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
