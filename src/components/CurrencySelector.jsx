/**
 * Simple currency selector pill.
 */
export default function CurrencySelector({ currentCurrency, onSelect }) {
    const currencies = ["USD", "EUR", "GBP", "JPY"];

    return (
        <div className="currency-selector">
            {currencies.map((c) => (
                <button
                    key={c}
                    className={`currency-btn ${currentCurrency === c ? "active" : ""}`}
                    onClick={() => onSelect(c)}
                >
                    {c}
                </button>
            ))}
        </div>
    );
}
