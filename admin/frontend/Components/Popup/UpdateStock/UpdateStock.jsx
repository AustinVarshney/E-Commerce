import { useEffect, useRef, useState } from "react";
import './UpdateStock.css';

export default function UpdateStockPopup({ onClose, onSubmit, currentStock }) {
    const [newStock, setNewStock] = useState(currentStock);
    const popupRef = useRef();

    const handleSubmit = () => {
        if (!isNaN(newStock)) {
            onSubmit(Number(newStock));
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose(); // Close popup if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef} onClick={(e) => e.stopPropagation()} >
                <div>
                    <h3>Update Stock</h3>
                    <input
                        type="number"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        min={0}
                    />
                </div>
                <div className="popup-buttons">
                    <button onClick={onClose} >Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    );
}
