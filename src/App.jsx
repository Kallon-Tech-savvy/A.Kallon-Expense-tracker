import { useExpenses } from "./hooks/useExpenses";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import CategoryFilter from "./components/CategoryFilter";
import CurrencySelector from "./components/CurrencySelector";
import CreditCard3D from "./components/CreditCard3D";
import Chart3D from "./components/Chart3D";
import Onboarding from "./components/Onboarding";
import { ReceiptText } from "lucide-react";
import { triggerConfetti } from "./utils/confetti";

export default function App() {
  const {
    filteredExpenses,
    total,
    categoryTotals,
    usedCategories,
    activeCategory,
    currency,
    setCurrency,
    budget,
    setBudget,
    setActiveCategory,
    addExpense,
    deleteExpense,
  } = useExpenses();

  const handleAddExpense = (data) => {
    const result = addExpense(data);
    if (result.success) {
      triggerConfetti();
    }
    return result;
  };

  return (
    <div className="app">
      {!currency && <Onboarding onSelect={setCurrency} />}

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <ReceiptText size={28} />
          <h1>Expense Tracker</h1>
        </div>
        <p className="header-sub">Track every dollar. Understand your spending.</p>
        <CurrencySelector currentCurrency={currency} onSelect={setCurrency} />
      </header>

      {/* ── Main Grid ── */}
      <main className="app-main">
        {/* Left column: form + visuals */}
        <section className="left-col">
          <CreditCard3D
            total={total}
            currency={currency}
            budget={budget}
            setBudget={setBudget}
          />
          <ExpenseForm onAdd={handleAddExpense} />
          <ExpenseSummary total={total} categoryTotals={categoryTotals} currency={currency} />
          <Chart3D categoryTotals={categoryTotals} />
        </section>

        {/* Right column: filter + list */}
        <section className="right-col">
          <CategoryFilter
            categories={usedCategories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            categoryTotals={categoryTotals}
          />
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} currency={currency} />
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>Built by <strong>A. Kallon</strong> — Expense Tracker v1.0</p>
      </footer>
    </div>
  );
}
