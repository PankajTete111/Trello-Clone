import React, { useState, useEffect , useParams} from 'react';
import Board from '../Modal/Board';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Modal/Card';
import "../Home/Home.css"
import { useDataContext } from '../../context/State';
import Lodar from '../../components/Lodar/Lodar';

const Home = () => {
  const [post, setPost] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [boards, setBoards] = useState([]);
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [card, setCard] = useState([]);
  const [data, setData] = useState([]);
  // const { user_id, user_name } = useParams();
  const [isLoading , setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true); 
  const {userId,userName} = useDataContext();


  const onDragEnd = (result) => {
    // TODO: Handle the drag and drop logic here
  };

  const saveCardDetails = () => {
    const requestData = {
      usiKey: 1,
      ubiKey: 1,
      cardTitle: cardName,
      cardDiscp: cardDescription,
      cardDate: cardDate,
      cardLabels: "Label1",
    };

    fetch('http://localhost:3050/api/v1/createCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
        console.log('API response:', data);
        setShowModal(false);
        // Close the modal or perform any other actions as needed
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting data:', error);
      });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCardName('');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addBoard = (boardName) => {
    setBoards((prevBoards) => [...prevBoards, { name: boardName, id: Date.now() }]);
  };

  const getCardDetails = async () => {
    try {
      const response = await fetch('http://localhost:3050/api/v1/cardDetails', {
        method: 'POST',
        body: JSON.stringify({
          "ubiKey": 1,
          "usiKey": 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      setCard(result.data);
      console.log("card", card);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []); 

  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${userId}`);
        const responseData = await response.json();
        setData(responseData.data);
        setIsLoading(false);
        console.log(responseData, "data");
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

 

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
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
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
                <input type="date" cardDate value={cardDate} onChange={(e) => setCardDate(e.target.value)}></input>
              </div>
              <div>

              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={saveCardDetails}>
                Add Card
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-info'>
          <div className='container'>
            <a className='navbar-brand' href='#'>
              <h1 className='mb-0'>React Board App</h1>
            </a>
            <a className='navbar-brand' href='#'>
              <button className='btn btn-primary' onClick={openModal}>
                Add Board
              </button>
            </a>
          </div>
        </nav>
        <div className="container-fluid container-boards m-0">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='bind_card_div'>
          <div className='sub_card_div'>
            {data[0] && data[0].map((board) => (
              <Droppable key={board.UBI_KEY} droppableId={board.UBI_KEY.toString()} direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    id="board"
                    className={`card m-2 pb-2${data[1].filter((item) => item.UCI_UBI_KEY === board.UBI_KEY).length === 0 ? ' no-cards' : ''}`}
                  >
                    <div className=" p-3 d-flex justify-content-between ">
                      {board.UBI_BOARD_NAME}
                      <div>
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
                        <i className="fa fa-trash" style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}></i>
                      </div>
                    </div>
                    {data[1] &&
                      data[1]
                        .filter((item) => item.UCI_UBI_KEY === board.UBI_KEY)
                        .map((item, index) => (
                          <Draggable key={item.UCI_KEY} draggableId={item.UCI_KEY.toString()} index={index}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="card pb-2 m-2"
                              >
                                <div className='p-2 d-flex justify-content-between'>
                                  <h3>{item.UCI_CARD_TITLE}</h3>
                                  <p>19/02/2000</p>
                                </div>
                                <div className='p-1 border-bottom'>
                                  <h5>{item.UCI_CARD_DESCRIPTION}</h5>
                                </div>
                                <h4 style={{ paddingLeft: "20px" }}>Task</h4>
                                <div className='d-flex p-2 m-1'>
                                  <div className='label-design m-1 p-2'>
                                    Work
                                  </div>
                                  <div className='label-design m-1 p-2'>
                                    Work
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
        <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} />
        <div className='bind_card_div'>
          <div className='sub_card_div'>
            {boards.map((board) => (
              <Card key={board.id} board={board} data={data[1]} />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
      </div>
      {isLoading && <Lodar  visible={isLoading}/>}
    </>
  );
};

export default Home;
