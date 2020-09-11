import React, { createContext, useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import Home from "./Home";
import UploadImage from "./UploadImage";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import MyImages from "./MyImages";
import {UserProvider} from "./userContext"


function App() {

  console.log(UserProvider);

  return (
    <UserProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/upload">
            <UploadImage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/myimages">
            <MyImages />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
