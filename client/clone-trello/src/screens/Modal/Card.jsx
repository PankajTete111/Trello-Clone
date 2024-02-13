// Board.jsx
import React, { useState } from 'react';

const Card = ({ showModal, closeModal, addCard}) => {
  const [cardName, setCardName] = useState('');

  const handleAddCard = () => {
    addCard(cardName);
    setCardName('');
    closeModal();
  };

  return (
    showModal && (
      <div className="modal fade show" tabIndex="-1" id="exampleModal" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Card</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddCard}>Add Board</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Card;
