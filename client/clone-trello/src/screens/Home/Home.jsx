import React, { useState, useEffect } from 'react';
import Board from '../Modal/Board';
import Card from '../Modal/Card';
import Sidebar from '../Sidebar/Sidebar';
import "../Home/Home.css"

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [boards, setBoards] = useState([]);
  const [cardName, setCardName] = useState('');
  const [cardDiscription, setcardDiscription] = useState(''); // Add state for cardName
  const [tasks, setTasks] = useState('');
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

  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      console.log("hi")
      try {
        const response = await fetch('http://localhost:3050/api/v1/boardDetails/1');
        const data = await response.json();
        setData(data.data);
        console.log(data, "data");
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const [card,setCard]=useState([])
  const getCard_details =async()=>{

    const response = await fetch('http://localhost:3050/api/v1/cardDetails', {
      method: 'POST',
      body: JSON.stringify(
        {
          "ubiKey": 1,
          "usiKey": 1
      }
        ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    setCard(result.data)
    console.log("card",card) 
  }
  useEffect(()=>{
    getCard_details()
  },[])





  return (
    <>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add card</h5>
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
              <label htmlFor="cardName" className="form-label">Card description:</label>
              <input
                type="text"
                className="form-control"
                id="cardDiscription"
                value={cardDiscription}
                onChange={(e) => setcardDiscription(e.target.value)}
              />
              <label htmlFor="cardName" className="form-label">Add Task:</label>
              <div className='d-flex justify-content-between'>
              <input
                type="text"
                className="form-control w-75"
                id="carddName"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
              />
              <button className='btn btn-primary'>Add</button>
              </div>
              <label htmlFor="cardName" className="form-label">Card Date:</label>
              <div>
                <input type="date"></input>
              </div>
              <div>

              </div>
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




        <div className="container-fluid container-boards m-0">
          <div className='row'>
            <div className=' row col-md-12'>
              {data.map((board) => (
                <div className="col-md-3 card m-2 pb-2">
                  <div>
                    <div className="p-3 d-flex justify-content-between ">
                      {board.UBI_BOARD_NAME}
                      <div>
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
                        <i className="fa fa-trash" onClick={() => deleteCard(board.UBI_KEY)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}></i>
                      </div>

                    </div>
               {/* Code For Card */}
               {
                  card.map((item)=>(
                    <div className='card pb-2 m-2'>
                      <div className='p-2 d-flex justify-content-between'>
                        <h4>{item.UCI_CARD_TITLE}</h4>
                        <p>19/02/2000</p>
                      </div>
                      <div>
                        <p style={{padding:"5px"}}>
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt velit eaque dicta perspiciatis iste ad repellat nesciunt ipsum natus, sint harum minus quo facere cum sequi eligendi sunt optio?
                        </p>
                      </div>
                      <h4 style={{paddingLeft:"20px"}}>Task</h4>
                      <div className='d-flex p-2 m-1'>
                      
                      <div className='label-design m-1 p-2'>
                          Work
                      </div>
                      <div className='label-design m-1 p-2'>
                          Work
                      </div>
                      </div>  

                    </div>
               )) }      
               {/* Code For Card Ended */}     
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
