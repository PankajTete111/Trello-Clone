import logo from './logo.svg';
import './App.css';
import CustomSingleButton from './components/CustomButton/CustomSingleButton';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { _COLORS } from './Themes/CommonColors/CommonColor';
import Signup from '../src/screens/SignUp/Signup';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
const  App = (props)=> {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
           <Route path="/Login" element={<Login />} />
           <Route path="/Home" element={<Home/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
