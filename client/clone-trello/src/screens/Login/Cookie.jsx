import Cookies from 'js-cookie';

export const setUserIdCookie = (userId) => {
    Cookies.set("userId", userId, { expires: 1 });
  };
   
  export const getUserIdCookie = () => {
    return Cookies.get("userId");
  };
   