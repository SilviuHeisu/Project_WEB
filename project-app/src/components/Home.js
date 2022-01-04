import { useLocation } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Rate  from "./Rate";

function Average(props){
 // debugger;
  let avg=0;
  for(let i=0;i<props.team.length;i++){
avg+=props.team[i];
  }
  return(<div>{avg/props.team.length}</div>);

}


function TeamList(props) {
  const styles = {
    border: "1px solid black",
  };
  const [team1,setTeam1]=useState([]);
  const [team2,setTeam2]=useState([]);
  const [team3,setTeam3]=useState([]);
//   let path1 = `http://localhost:7000/rate/1`;
//   let path2 = `http://localhost:7000/rate/2`;
//   let path3 = `http://localhost:7000/rate/3`;
// axios.get(path1).then((response) => {
// console.log("*****")
// setTeam1(response.data);

// console.log(response.data);     
// });
// axios.get(path2).then((response) => {
// console.log("*****")
// setTeam2(response.data);
//      console.log(response.data);     

// });
// axios.get(path3).then((response) => {
// console.log("*****")
// setTeam3(response.data);

//      console.log(response.data);     

// });
 
  const teams = props.teams;
  for (let i = 0; i < teams.length; i++) {
    console.log(teams[i].teamId);
    console.log(teams[i].teamName);
  }

  const listItems = teams.map((team) => {
    const path = `/home/TeamInfo/${team.teamId}`;
    const pathRate = `/home/rate/${team.teamId}`;

    return (
      <tr className="Div2">
        <td style={styles}>
          <ul>{team.teamId}</ul>
        </td>
        <td style={styles}>
          {" "}
          <ul>{team.teamName}</ul>
        </td>
        <td style={styles}>
          <a href={path}>
            <Button> Team Info </Button>
          </a>
        </td>

        <td style={styles}>
          <a href={pathRate}>
            <Button> Rate </Button>
          </a>
        </td>
        <td style={styles}>
      
{/* <Average team={ team.teamId=1?team1:(team.teamId=2)?team2:team3 }/> */}
        </td>
        <br></br>
      </tr>
    );
  });
  return (
    <table style={styles}>
      <tr style={styles}>
        <th>Team ID</th>
        <th style={styles}>Team Name</th>
        <th>Team Info</th>
        <th>Rate</th>
        <th>Current Rating</th>
      </tr>
      <tbody>{listItems}</tbody>
    </table>
  );
}

const Home = () => {
 
  const search = useLocation().search;

  const [teams, setTeams] = useState([]);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const user = sessionStorage.getItem("user");
  const isProfessor = sessionStorage.getItem("isProfessor");

  useEffect(() => {
    axios.get("http://localhost:7000/team").then((response) => {
      setTeams(response.data);
      
    });
    //setIsProfessor(sessionStorage.getItem("isProfessor"));
  }, []);

  console.log(teams);
  console.log(isLoggedIn);
  console.log(user);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {" "}
          <h2>Hello there!</h2>
          <TeamList teams={teams} />
        </div>
      ) : null}
      
    </div>
  );
        
};

export default Home;
