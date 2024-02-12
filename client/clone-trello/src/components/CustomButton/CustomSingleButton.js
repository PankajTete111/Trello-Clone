// import React from "react";
//  import './CustomeButton.css'
//  import { _COLORS } from "../../Themes/CommonColors/CommonColor";
// const CustomSingleButton = (props) => {
//   return (
//     <div
//       onClick={props?.onPress}
//       className={[
//        " button",
//         {
//           backgroundColor: props?.backgroundColor,
//           borderColor: props.borderColor,
//           marginTop: props.marginTop,
//           height: props.height,
//           marginBottom: props.marginBottom,
//           marginHorizontal: props.marginHorizontal,
//           width: props.width ? props.width : "100%",
//         },
//       ]}
//       disabled={props?.disabled}
//     >
//       {props.isLeftImage ? (
//         <img source={props.leftImage} className='leftIcon' />
//       ) : null}
//       <div
//         className={[
//           "buttonText",
//           { color: props.Text_Color, fontSize: props.text_Size },
//         ]}
//       >
//         {props._ButtonText}
//       </div>
//     </div>
//   );
// };
// CustomSingleButton.defaultProps = {
//   isLeftImage: false,
//   backgroundColor: _COLORS.Trello_BlackColor,
//   Text_Color: _COLORS.Trello_BlueColor,
//   borderColor: _COLORS.Trello_LiteWhiteColor,
//   marginTop: 10,
//   height: 58,
// };
// export default CustomSingleButton;

import React from "react";
import './CustomeButton.css'
import { _COLORS } from "../../Themes/CommonColors/CommonColor";

const CustomSingleButton = (props) => {
  return (
    <div
      onClick={props?.onPress}
      className={`button ${props.isLeftImage ? 'withLeftImage' : ''}`}
      style={{
        backgroundColor: props?.backgroundColor,
        borderColor: props.borderColor,
        marginTop: props.marginTop,
        height: props.height,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        width: props.width ? props.width : "100%",
      }}
      disabled={props?.disabled}
    >
      {props.isLeftImage ? (
        <img src={props.leftImage} className='leftIcon' alt="leftIcon" />
      ) : null}
      <div
        className="buttonText"
        style={{ color: props.Text_Color, fontSize: props.text_Size }}
      >
        {props._ButtonText}
      </div>
    </div>
  );
};

CustomSingleButton.defaultProps = {
  isLeftImage: false,
  backgroundColor: _COLORS.Trello_BlackColor,
  Text_Color: _COLORS.Trello_BlueColor,
  borderColor: _COLORS.Trello_LiteWhiteColor,
  marginTop: 10,
  height: 58,
};

export default CustomSingleButton;
