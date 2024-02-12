import logo from './logo.svg';
import './App.css';
import CustomSingleButton from './components/CustomButton/CustomSingleButton';
import { _COLORS } from './Themes/CommonColors/CommonColor';
const  App = (props)=> {
  return (
    <div className="App">

      <CustomSingleButton
        _ButtonText='Loginjkbsub'
        Text_Color={_COLORS.Trello_WhiteColor}
      />

    </div>
  );
}

export default App;
