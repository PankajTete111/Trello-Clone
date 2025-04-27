import React, { useContext, useState } from 'react'
import { TrelloContext } from './DataContext';
export const useDataContext = () => {
    return useContext(TrelloContext);
}
const State = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [userName,setUserName]=useState("")
    return (
        <TrelloContext.Provider value={{userId, setUserId,userName,setUserName}}>{children}</TrelloContext.Provider>)
}

export default State