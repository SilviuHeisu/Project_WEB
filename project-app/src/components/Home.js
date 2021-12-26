import { useLocation } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function TeamList(props){
  const teams = props.teams;
  for(let i=0; i<teams.length;i++)
   { console.log(teams[i].teamId);
    console.log(teams[i].teamName);
   }
   const listItems = teams.map((team) =>
    <div><li>{team.teamId}</li>
   <li>{team.teamName}</li>
   <br></br></div>
 );
 return (
   <ul>{listItems}</ul>
 );}

const Home = () => {
  const search = useLocation().search;
  const teamId = localStorage.getItem("teamId");
  const [teams, setTeams] = useState([]);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const user = sessionStorage.getItem("user");
  const isProfessor = sessionStorage.getItem("isProfessor");
  useEffect(() => {
    axios.get("http://localhost:7000/team").then((response) => {
      setTeams(response.data);
    });
    //setIsProfessor(sessionStorage.getItem("isProfessor"));

  },[]);

  console.log(teams);
  console.log(isLoggedIn);
  console.log(user);
  return <div>
    {isLoggedIn ? (
        <div> <h2>Hello there!</h2>
        <TeamList teams={teams}/>
           </div>): null}
      </div>;
};

export default Home;
