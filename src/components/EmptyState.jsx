/**
 * Friendly empty-state shown when there are no expenses to display.
 * Features a pure CSS 3D floating wallet animation.
 */
export default function EmptyState() {
    return (
        <div className="empty-state">
            <div className="scene-3d">
                <div className="wallet-3d-container">
                    <div className="wallet-3d">
                        <div className="wallet-part wallet-back" />
                        <div className="wallet-part wallet-money" />
                        <div className="wallet-part wallet-front" />
                        <div className="wallet-part wallet-flap" />
                    </div>
                </div>
            </div>
            <h3>No expenses yet</h3>
            <p>Add your first expense above to start tracking your spending.</p>
        </div>
    );
}
