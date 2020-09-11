import React, {createContext, useState, useEffect} from 'react';
  
export const userContext = createContext({
    user: {},
    login: function () {},
    loggedIn: false,
    getUserInfo: function () {},
    logout: function(){}
  });

 
 export const UserProvider = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    function updateUserInfo() {
        fetch(`${process.env.REACT_APP_URL}/userinfo`, { credentials: "include" })
          .then((res) => res.json())
          .then((res) => setUserInfo(res));
      }
      function login(user, pass, fromRegister, money) {
        if (fromRegister) {
          setLoggedIn(true);
          setUserInfo({ username: user, money: money });
          return;
        }
        fetch(`${process.env.REACT_APP_URL}/login`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ username: user, password: pass }),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((data) => {
            setUserInfo({ username: data.username, money: data.money });
            setLoggedIn(true);
          })
          .catch((_) => alert("issue logging in"));
      }
    
      function logout(){
        setLoggedIn(false);
        setUserInfo({});
      } 

      useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/userinfo`, { credentials: "include" })
          .then((res) => res.json())
          .then((data) => {
            setUserInfo({ username: data.username, money: data.money });
            setLoggedIn(true);
          })
          .catch((_) => console.log("not logged in"));
      }, []);

    return (
    <userContext.Provider value={{
        userInfo,
        loggedIn,
        updateUserInfo,
        login,
        logout
    }}>
        {props.children}
    </userContext.Provider>
    );
}