import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../Modal/Board';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Modal/Card';
import "../Home/Home.css"
import { getUserIdCookie } from '../Login/Cookie';
import { Dropdown } from "react-bootstrap";
// import Lodar from '../../components/Lodar/Lodar';
import logo from "../../assets/image/logo-light.png"

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [data, setData] = useState([]);
  const [boardId, setBoardId] = useState();
  //  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedCard, setSelectedCard] = useState(null);

  const modalTitle = modalMode === "add" ? "Add Card" : "Edit Card";

  const id = getUserIdCookie();
  console.log(id, "id")
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceBoardId = result.source.droppableId;
    const destinationBoardId = result.destination.droppableId;

    if (sourceBoardId === destinationBoardId) {
      const updatedData = { ...data };
      const draggedCard = updatedData[1][sourceIndex];
      updatedData[1].splice(sourceIndex, 1);
      updatedData[1].splice(destinationIndex, 0, draggedCard);
      setData(updatedData);
    } else {
      const updatedData = { ...data };
      const draggedCard = updatedData[1][sourceIndex];
      draggedCard.UCI_UBI_KEY = parseInt(destinationBoardId);
      updatedData[1].splice(sourceIndex, 1);

      if (!updatedData[1].some((item) => item.UCI_UBI_KEY === parseInt(destinationBoardId))) {
        updatedData[1].push(draggedCard);
      } else {
        updatedData[1].splice(destinationIndex, 0, draggedCard);
      }

      setData(updatedData);
    }
  };


  const saveCardDetails = () => {
    const requestData = {
      usiKey: id,
      ubiKey: boardId,
      cardTitle: cardName,
      cardDiscp: cardDescription,
      cardDate: cardDate,
      cardLabels: tasks,
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
        console.log('API response:', data);
        setShowModal(false);
      })
      .then(() => { 
        const getBoardDetails = async () => {
          try {
            const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${id}`);
            const responseData = await response.json();
            setData(responseData.data);
            console.log(responseData.data[0], "board data");
          } catch (error) {
            console.error('Error fetching board details:', error);
          }
        };

        getBoardDetails(); 
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };
  useEffect(() => {

  }, [saveCardDetails])

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCardName('');
  };


  const addBoard = (boardName) => {
    setBoards((prevBoards) => [...prevBoards, { name: boardName, id: Date.now() }]);
  };


  useEffect(() => {
    const getBoardDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${id}`);
        const responseData = await response.json();
        setData(responseData.data);
        console.log(responseData.data[0], "board data");
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };
    getBoardDetails();
  }, [id])

  const handleCreateCard = () => {

    if (modalMode === "add") {
      saveCardDetails();
    }
    if (modalMode === "edit") {
      handleEdit();
    }
  }


  const updateCardDetails = async (cardid) => {
    try {
      const requestData = {
        uci_key: cardid,
        usi_key: id,
        cardTitle: cardName,
        cardDiscp: cardDescription,
        cardDate: cardDate,
        cardLabels: tasks,
      };
    
      const updateResponse = await fetch('http://localhost:3050/api/v1/updatecard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      
      if (updateResponse.ok) {
        console.log('API response:', updateResponse);
        setShowModal(false);
  
       
        await getBoardDetails();
      } else {
        console.error('Error updating data:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  
  const getBoardDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${id}`);
      const responseData = await response.json();
      setData(responseData.data);
      console.log(responseData.data[0], "board data");
    } catch (error) {
      console.error('Error fetching board details:', error);
    }
  };

  const handleDelete = (item) => {
    const { UCI_KEY, UCI_UBI_KEY, UCI_CARD_TITLE } = item;
    console.log("iddelded", id);
    const requestData = {
      usi_key: parseInt(id),
      ubi_key: UCI_UBI_KEY,
      card_title: UCI_CARD_TITLE,
    };

    fetch('http://localhost:3050/api/v1/deletecard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        setShowModal(false);
      })
      .then(() => { // Fix: Add an anonymous function here
        const getBoardDetails = async () => {
          try {
            const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${id}`);
            const responseData = await response.json();
            setData(responseData.data);
            console.log(responseData.data[0], "board data");
          } catch (error) {
            console.error('Error fetching board details:', error);
          }
        };

        getBoardDetails(); // Call the function here
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  const handleDeleteBoard = (item) => {
    console.log(item, "ubi");
    console.log(id, "usi");
    // const { UCI_KEY, UCI_UBI_KEY, UCI_CARD_TITLE } = item;
    // console.log("iddelded", id);
    const requestData = {
      usi_key: parseInt(id),
      ubi_key: item
    };

    fetch('http://localhost:3050/api/v1/deleteboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        setShowModal(false);
      })
      .then(() => { // Fix: Add an anonymous function here
        const getBoardDetails = async () => {
          try {
            const response = await fetch(`http://localhost:3050/api/v1/boardDetails/${id}`);
            const responseData = await response.json();
            setData(responseData.data);
            console.log(responseData.data[0], "board data");
          } catch (error) {
            console.error('Error fetching board details:', error);
          }
        };

        getBoardDetails(); // Call the function here
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });

  }


  const handleLogout = () => {
    navigate('/');
    // setIsLoading(true)
  };

  const handleEdit = (cardid) => {
    console.log(cardid, "sdsds");
   
    const selectedCard = data[1].find((item) => item.UCI_KEY === cardid);
    console.log(selectedCard, "selectedCard");

    setModalMode("edit");
    setSelectedCard(selectedCard);

    setCardName(selectedCard.UCI_CARD_TITLE || "");
    setCardDescription(selectedCard.UCI_CARD_DESCRIPTION || "");
    setTasks(selectedCard.UCI_CARD_LABELS || ""); 
    console.log(selectedCard.UCI_CARD_LABELS,"selectedCard.UCI_CARD_LABELS");
    setCardDate(selectedCard.UCI_CARD_DATE || "");

    // Call the updateCardDetails function when editing
    // updateCardDetails(cardid);
  };



  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => {
                if (modalMode === "add") {
                  handleCreateCard();
                } else if (modalMode === "edit") {
                  updateCardDetails(selectedCard.UCI_KEY); // Pass the cardid to handleEdit
                }
              }}>
                {modalMode === "add" ? "Add Card" : "Edit Card"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-info'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              <img className='mainlogo' src={logo} alt="Logo" />
            </a>
            <div className='d-flex'>
              <a className='navbar-brand' href='#'>
                <button className='btn btn-primary mr-2' onClick={openModal}>
                  Add Board
                </button>
              </a>
              <a className='navbar-brand' href='#'>
                <button className='btn btn-danger mr-2' onClick={handleLogout}>
                  Logout
                </button>
              </a>
            </div>
          </div>
        </nav>
        <div className="container-fluid container-boards m-0">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='bind_card_div'>
              <div className='sub_card_div'>
                {data[0] && data[0].map((board, index) => (
                  <Droppable key={board.UBI_KEY} droppableId={board.UBI_KEY.toString()} direction="horizontal" index={index}>
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
                            
                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                              setBoardId(board.UBI_KEY);
                              setModalMode("add");
                              setCardName("");
                              setCardDescription("");
                              setTasks("");
                              setCardDate("");
                            }}>Add Card</button>
                            <i className="fa fa-trash" onClick={(item) => handleDeleteBoard(board.UBI_KEY)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}></i>
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
                                      {/* <p>{item.UCI_CREATED_ON.formateDate()}</p> */}
                                      {/* <p>{new Date(item.UCI_CREATED_ON).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p> */}
                                      <p>{new Date(item.UCI_CREATED_ON).toLocaleDateString()}</p>

                                      <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                          ⋮
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => handleEdit(item.UCI_KEY)} >Edit Card</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleDelete(item)}>Delete Card</Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                    <div className='p-1 border-bottom'>
                                      <h5>{item.UCI_CARD_DESCRIPTION}</h5>
                                    </div>
                                    <h4 style={{ paddingLeft: "20px" }}>{item.UCI_CARD_LABELS}</h4>
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
      {/* {isLoading && <Lodar visible={isLoading} />} */}
    </>
  );
};

export default Home;
