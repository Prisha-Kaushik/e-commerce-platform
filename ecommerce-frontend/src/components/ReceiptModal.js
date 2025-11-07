import React from 'react';
import './ReceiptModal.css';

function ReceiptModal({ receipt, onClose }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="receipt-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <div className="receipt-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="receipt-subtitle">Thank you for your purchase</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="receipt-info">
              <div className="info-row">
                <span className="info-label">Order ID:</span>
                <span className="info-value">#{receipt.orderId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date:</span>
                <span className="info-value">{formatDate(receipt.timestamp)}</span>
              </div>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <div className="receipt-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{receipt.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{receipt.customerEmail}</span>
              </div>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items Purchased</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div className="receipt-item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-total">
            <span className="total-label">Total Amount:</span>
            <span className="total-amount">${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="receipt-footer">
          <button className="close-receipt-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;

