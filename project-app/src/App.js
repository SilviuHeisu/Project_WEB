import React from "react";
import { ReactDOM } from "react-dom";
import Navigation from "./components/Navigation";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import RegisterProf from "./components/RegisterProf";
import Login from "./components/Login";
import Rate from "./components/Rate";
import Switch from "react-router-dom";

function App() {
  // const getUsers = async () => {
  //   const response = await fetch("http://localhost:7000/user");
  //   const data = await response.json();
  //   console.log(data);
  // };
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />

        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/rate" element={<Rate />}></Route>
          <Route path="/registerProf" element={<RegisterProf />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
