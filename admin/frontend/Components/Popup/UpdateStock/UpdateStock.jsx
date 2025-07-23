import { useState } from "react";
import './UpdateStock.css';

export default function UpdateStockPopup({ onClose, onSubmit, currentStock }) {
    const [newStock, setNewStock] = useState(currentStock);

    const handleSubmit = () => {
        if (!isNaN(newStock)) {
            onSubmit(Number(newStock));
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Update Stock</h3>
                <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    min={0}
                />
                <div className="popup-buttons">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
