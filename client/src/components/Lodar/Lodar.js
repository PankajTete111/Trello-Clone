// import React, { useEffect } from 'react';
// import { Watch } from 'react-loader-spinner';
// import './Lodar.css';

// const Lodar = ({ visible }) => {
//     useEffect(() => {
//         const body = document.body;

//         if (visible) {
//             body.classList.add('overlay-active');
//         } else {
//             body.classList.remove('overlay-active');
//         }

//         return () => {
//             body.classList.remove('overlay-active');
//         };
//     }, [visible]);

//     return (
//         <div className='loder'>
//             <Watch
//                 visible={true}
//                 height="80"
//                 width="80"
//                 radius="48"
//                 color="#4fa94d"
//                 ariaLabel="watch-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//             />
//         </div>
//     );
// };

// export default Lodar;
