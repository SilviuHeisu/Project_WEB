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
  console.log(props.team.length)
  return(<div>{avg/1}</div>);

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

          {/* <ul>1</ul> */}
          { team.teamId === 1 ? props.avg1:(team.teamId === 2)?props.avg2:props.avg3 }
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
  const [avgGrade1, setAvgGrade1] = useState(0);
  const [avgGrade2, setAvgGrade2] = useState(0);
  const [avgGrade3, setAvgGrade3] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:7000/team").then((response) => {
      setTeams(response.data);
    });
    axios.get("http://localhost:7000/rate/1").then((response) => {
      console.log(" hello world 1");
      console.log(response.data);
      let obj = response.data;
      let avg = 0;
      for(let x in response.data){
        avg += response.data[x].mark
      }
      avg = avg/response.data.length;
      console.log(avg);
      setAvgGrade1(avg);
    });
    axios.get("http://localhost:7000/rate/2").then((response) => {
      console.log(" hello world 2");
      console.log(response.data);
      let avg = 0;
      for(let x in response.data){
        avg += response.data[x].mark
      }
      avg = avg/response.data.length;
      console.log(avg);
      setAvgGrade2(avg);
    });
    axios.get("http://localhost:7000/rate/3").then((response) => {
      console.log(" hello world 3");
      console.log(response.data);
      let avg = 0;
      for(let x in response.data){
        avg += response.data[x].mark
      }
      avg = avg/response.data.length;
      console.log(avg);
      setAvgGrade3(avg);
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
          <TeamList teams={teams} avg1={avgGrade1} avg2={avgGrade2} avg3={avgGrade3}/>
        </div>
      ) : null}
      
    </div>
  );
        
};

export default Home;
