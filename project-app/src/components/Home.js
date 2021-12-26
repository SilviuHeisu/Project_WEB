import { useLocation } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  const search = useLocation().search;
  const teamId = localStorage.getItem("teamId");
  const [teams, setTeams] = useState([]);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    axios.get("http://localhost:7000/team").then((response) => {
      setTeams((teams) => [response.data]);
      console.log(teams);
    });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {teams.map((item, index) => {
            <item key={index} item={item}></item>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
