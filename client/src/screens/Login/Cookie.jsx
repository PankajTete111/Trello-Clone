// import Cookies from 'js-cookie';

// export const setUserIdCookie = (userId) => {
//     Cookies.set("userId", userId, { expires: 1 });
//   };
   
//   export const getUserIdCookie = () => {
//     return Cookies.get("userId");
//   };
   
import Cookies from 'js-cookie';

export const setUserIdCookie = (userId, userName) => {
  const setData={"userId":userId,"userName":userName};
  console.log(setData,"saasa");
  Cookies.set("userId", userId, { expires: 1 });
  Cookies.set("userName", userName, { expires: 1 });
};

export const getUserIdCookie = () => {
  const userId = Cookies.get("userId");
  const userName = Cookies.get("userName");
  return { userId, userName };
};
