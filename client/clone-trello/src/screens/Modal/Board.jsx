// Board.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Board = ({ showModal, closeModal, addBoard }) => {
  const [boardName, setBoardName] = useState('');
  const navigate = useNavigate();

  const handleAddBoard =async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3050/api/v1/createBoard', {
      method: 'POST',
      body: JSON.stringify(
        {
          "usiKey": 1,
          "boardName": boardName
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    window.location.reload();
    console.log(result);
  };

  return (
    showModal && (
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Board</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="boardName" className="form-label">Board Name:</label>
              <input
                type="text"
                className="form-control"
                id="boardName"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={(e)=>handleAddBoard(e)}>Add Board</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Board;
