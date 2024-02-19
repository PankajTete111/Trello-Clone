import React, { useState, useEffect } from 'react';



const Card = ({ board, data }) => {
  const [card, setCard] = useState([]);

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
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts





  return (
    <div id="board" className={`card m-2 pb-2${data.filter(item => item.UCI_UBI_KEY === board.UBI_KEY).length === 0 ? ' no-cards' : ''}`}>
      <div className="p-3 d-flex justify-content-between">
        {board.UBI_BOARD_NAME}
        <div>
          <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">+</button>
          <i className="fa fa-trash" style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}></i>
        </div>
      </div>
      {data
        .filter((item) => item.UCI_UBI_KEY === board.UBI_KEY)
        .map((item) => (
          <CardItem key={item.UCI_KEY} item={item} />
        ))}
    </div>
  );
};

const CardItem = ({ item }) => (
  <div className='card pb-2 m-2'>
    <div className='p-2 d-flex justify-content-between'>
      <h3>{item.UCI_CARD_TITLE}</h3>
      <p>{item.UCI_CARD_DATE}</p>
    </div>
    <div className='p-1 border-bottom'>
      <h5>{item.UCI_CARD_DESCRIPTION}</h5>
    </div>
    <h4 style={{ paddingLeft: '20px' }}>Task</h4>
    <div className='d-flex p-2 m-1'>
      <div className='label-design m-1 p-2'>{item.UCI_TASK}</div>
    </div>
  </div>
);

export default Card;
