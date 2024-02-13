import React, { useState } from 'react';
import Board from '../Modal/Board';
import Card from '../Modal/Card';
import Sidebar from '../Sidebar/Sidebar';
import "../Home/Home.css"

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [boards, setBoards] = useState([]);
  const [cardName, setCardName] = useState(''); // Add state for cardName

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCardName(''); // Reset cardName when closing the modal
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addBoard = (boardName) => {
    setBoards([...boards, { name: boardName, id: Date.now() }]);
  };

  const addCard = () => {
    // You may want to associate the card with a specific board, for now, just adding a card to the boards array
    setBoards([...boards, { name: cardName, id: Date.now() }]);
    setCardName(''); // Reset cardName after adding a card
    closeModal(); // Close the modal after adding a card
  };

  const deleteCard = (cardId) => {
    // Implement logic to delete a card based on cardId
    // You might want to filter the boards array to exclude the card to be deleted
    setBoards(boards.filter(board => board.id !== cardId));
  };

  return (
    <>


      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <label htmlFor="cardName" className="form-label">Card Name:</label>
              <input
                type="text"
                className="form-control"
                id="carddName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <div className="container">
            <a className="navbar-brand" href="#">
              <h1 className="mb-0">React Board App</h1>
            </a>
            <a className="navbar-brand" href="#">
              <button className="btn btn-primary" onClick={openModal}>Add Board</button>
            </a>
          </div>
        </nav>

        {/* <div className="container-fluid container-boards m-0">
          <div className='row'>
            <div className='col-md-12 d-flex gap-2'>
              {boards.map((board) => (
                <div key={board.id} className="col-md-3 mt-2 board-card">
                  <div className="border p-3 d-flex justify-content-between">
                    {board.name}
                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} />
        </div> */}
        {/* <div className="container-fluid container-boards m-0">
  <div className='row'>
    <div className='col-md-12 d-flex gap-2'>
      {boards.slice(0, 5).map((board) => ( // Slice the array to only consider the first four elements
        <div key={board.id} className="col-md-3 mt-2 board-card">
          <div className="border p-3 d-flex justify-content-between">
            {board.name}
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} />
</div> */}

<div className="container-fluid container-boards m-0">
        <div className='row'>
          <div className='col-md-12 d-flex gap-2'>
            {boards.slice(0, 4).map((board) => (
              <div key={board.id} className="col-md-3 mt-2 board-card">
                <div className="border p-3 d-flex justify-content-between">
                  {board.name}
                  <div>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
                    <i className="fa fa-trash" onClick={() => deleteCard(board.id)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} deleteCard={deleteCard} />
      </div>

      </div>

    </>

  );
};

export default Home;
