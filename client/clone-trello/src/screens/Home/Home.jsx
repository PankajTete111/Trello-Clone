// // Home.jsx
// import React, { useState } from 'react';
// import Board from '../Modal/Board';
// import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false); // State for sidebar
//   const [boards, setBoards] = useState([]);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   // Function to toggle the sidebar
//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const addBoard = (boardName) => {
//     setBoards([...boards, { name: boardName, id: Date.now() }]);
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-info">
//         <div className="container">
//           <a className="navbar-brand" href="#">
//             <h1 className="mb-0">React Board App</h1>
//           </a>
//           <a className="navbar-brand" href="#">
//           <button className="btn btn-primary" onClick={openModal}>Add Board</button>
//           </a>
//         </div>
//       </nav>

//       <div className="container mt-5 bg-blue">
//        <div className='row '>
//         {boards.map((board) => (
//           <div key={board.id} className="mt-3">{board.name}</div>
//         ))}
//         <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// Home.jsx
import React, { useState } from 'react';
import Board from '../Modal/Board';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [boards, setBoards] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addBoard = (boardName) => {
    setBoards([...boards, { name: boardName, id: Date.now() }]);
  };

  return (
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

      <div className="container mt-5 bg-blue">
        <div className='row'>
          {boards.map((board) => (
            <div key={board.id} className="col-md-4 mt-3">
              <div className="border p-3">
                {board.name}
              </div>
            </div>
          ))}
        </div>
        <Board showModal={showModal} closeModal={closeModal} addBoard={addBoard} />
      </div>
    </div>
  );
};

export default Home;
