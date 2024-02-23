import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../context/State';
import { getUserIdCookie } from '../Login/Cookie';
// import Lodar from "../../components/Lodar/Lodar";

const Board = ({ showModal, closeModal, reloadBoardDetails }) => {
  const [boardName, setBoardName] = useState('');
  const navigate = useNavigate();
  const { userId } = useDataContext();
  // const [isLoading, setIsLoading] = useState(false);

  const id =getUserIdCookie();

  const handleAddBoard = async () => {
    try {

      const response = await fetch('http://localhost:3050/api/v1/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usiKey: id,
          boardName: boardName,
        }),
      });

       await response.json();
      
      closeModal();
      navigate("/Home");
      console.log("navigated");
      window.location.reload();
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Board</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <label htmlFor="boardName" className="form-label">
                  Board Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="boardName"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddBoard}>
                  Add Board
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {isLoading && <Lodar visible={isLoading} />} */}
    </>
  );
};

export default Board;
