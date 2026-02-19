import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import {
    validateExpense,
    dollarsToCents,
    sumExpenses,
    groupByCategory,
} from "../utils/expense";
import { getStartOfMonth, getStartOfWeek, getStartOfBiWeek, isWithinRange } from "../utils/dateHelpers";

const STORAGE_KEY = "expense-tracker-expenses";

/**
 * Central hook that owns the expense list, filtering, and derived totals.
 *
 * Expense shape:
 *   { id: string, amount: number (cents), category: string, date: string, createdAt: string }
 */
export function useExpenses() {
    const [expenses, setExpenses] = useLocalStorage(STORAGE_KEY, []);
    // Initialize currency as null (for onboarding)
    const [currency, setCurrency] = useLocalStorage("expense-tracker-currency", null);
    const [budget, setBudget] = useLocalStorage("expense-tracker-budget", {
        amount: 0,
        cycle: "Monthly",
    });
    const [activeCategory, setActiveCategory] = useState("All");

    // ────────── actions ──────────

    /**
     * Validate and add a new expense.
     * @param {{ amount: string, category: string, date: string }} raw form values
     * @returns {{ success: boolean, errors?: object }}
     */
    function addExpense({ amount, category, date }) {
        const result = validateExpense({ amount, category, date });
        if (!result.valid) return { success: false, errors: result.errors };

        const expense = {
            id: uuidv4(),
            amount: dollarsToCents(amount),
            category,
            date,
            createdAt: new Date().toISOString(),
        };

        setExpenses((prev) => [expense, ...prev]);
        return { success: true };
    }

    /**
     * Remove an expense by id (immutable filter — no mutation).
     */
    function deleteExpense(id) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
    }

    // ────────── derived state ──────────

    // Filter expenses by category AND budget cycle
    const filteredExpenses = useMemo(() => {
        let filtered = expenses;

        // 1. Filter by budget cycle (Timeframe)
        const now = new Date(); // Not strictly needed, but good for context
        let startDate;

        switch (budget.cycle) {
            case "Weekly":
                startDate = getStartOfWeek();
                break;
            case "Bi-weekly":
                startDate = getStartOfBiWeek();
                break;
            case "Monthly":
            default:
                startDate = getStartOfMonth();
                break;
        }

        if (startDate) {
            filtered = filtered.filter(e => isWithinRange(e.date, startDate));
        }

        // 2. Filter by Category
        if (activeCategory !== "All") {
            filtered = filtered.filter((e) => e.category === activeCategory);
        }
        return filtered;
    }, [expenses, activeCategory, budget.cycle]);

    const total = useMemo(() => {
        return filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
    }, [filteredExpenses]);

    // Calculate totals per category (for the filtered list)
    // Calculate totals per category (for the filtered list)
    const categoryTotals = useMemo(() => groupByCategory(filteredExpenses), [filteredExpenses]);

    /** Unique categories that actually have expenses, for the filter UI. */
    const usedCategories = useMemo(() => {
        const set = new Set(expenses.map((e) => e.category));
        return Array.from(set).sort();
    }, [expenses]);

    return {
        expenses,
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
    };
}
