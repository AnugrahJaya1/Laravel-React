import { useContext } from "react";
import { createContext, useState } from "react";

// have default value
const StateContext = createContext({
    user: null,
    toke: null,
    notification: null,
    setUser: () => {}, // function
    setToken: () => {}, // function
    setNotification: () => {}
})

export const ContextProvider = ({ children }) => {
    //set var
    const [user, setUser] = useState( {} ); //empty object
    const [notification, setNotification] = useState('');
    // get ACCESS_TOKEN, return null if empty
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); 

    // function setToken
    const setToken = (token) => {
        // set token
        _setToken(token)
        // set token in local storage
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={
            // object
            {
                user, // current user
                token, // user token
                notification,
                setUser, // function
                setToken, // function
                setNotification
            }
        }>
        {/* render children */}
        {children}

        </StateContext.Provider>
    )
}

// make it simple for export function
export const useStateContext = () => useContext(StateContext)