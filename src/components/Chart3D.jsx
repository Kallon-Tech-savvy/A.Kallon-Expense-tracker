import { getCategoryMeta } from "../utils/categories";

/**
 * 3D Bar Chart showing expenses by category.
 * Each bar is a 3D pillar.
 */
export default function Chart3D({ categoryTotals }) {
    const entries = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a).slice(0, 5);
    const max = entries.length > 0 ? entries[0][1] : 0;

    if (entries.length === 0) return null;

    return (
        <div className="chart-3d-container">
            <div className="chart-floor">
                {entries.map(([cat, amt], i) => {
                    const meta = getCategoryMeta(cat);
                    const heightPct = max > 0 ? (amt / max) * 100 : 0;

                    return (
                        <div key={cat} className="pillar-group" style={{ "--i": i }}>
                            <div
                                className="pillar-3d"
                                style={{
                                    height: `${Math.max(heightPct, 5)}%`,
                                    "--color": meta.color
                                }}
                            >
                                <div className="pillar-face pillar-front" />
                                <div className="pillar-face pillar-right" />
                                <div className="pillar-face pillar-top" />
                            </div>
                            <div className="pillar-label">{cat}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
