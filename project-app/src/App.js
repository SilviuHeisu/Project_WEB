import React from "react";
import { ReactDOM } from "react-dom";
import Navigation from "./components/Navigation";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import RegisterProf from "./components/RegisterProf";
import Login from "./components/Login";
import PartialDeliverable from "./components/PartialDeliverable";
import Switch from "react-router-dom";
import axios from "axios";
import TeamInfo from "./components/TeamInfo";
import Rate from "./components/Rate";

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

          <Route
            path="/partialDeliverable"
            element={<PartialDeliverable />}
          ></Route>
          <Route path="/registerProf" element={<RegisterProf />}></Route>
          <Route
            path="/home/teamInfo/1"
            element={<TeamInfo teamId={1} />}
          ></Route>
          <Route
            path="/home/teamInfo/2"
            element={<TeamInfo teamId={2} />}
          ></Route>
          <Route
            path="/home/teamInfo/3"
            element={<TeamInfo teamId={3} />}
          ></Route>
          <Route path="/home/rate/1" element={<Rate teamId={1} />}></Route>
          <Route path="/home/rate/2" element={<Rate teamId={2} />}></Route>
          <Route path="/home/rate/3" element={<Rate teamId={3} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
