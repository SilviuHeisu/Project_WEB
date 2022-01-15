import { useLocation } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Rate from "./Rate";

function TeamList(props) {
  const styles = {
    border: "1px solid black",
  };
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);

  const teams = props.teams;

  const listItems = teams.map((team) => {
    const path = `/home/TeamInfo/${team.teamId}`;
    const pathRate = `/home/rate/${team.teamId}`;
    const isProfessor = sessionStorage.getItem("isProfessor");
    console.log(props.teamId);
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
            <Button
              disabled={
                props.teamId == team.teamId && isProfessor == false ? 1 : 0
              }
            >
              {" "}
              Rate{" "}
            </Button>
          </a>
        </td>
        <td style={styles}>
          {/* <ul>1</ul> */}
          {team.teamId === 1
            ? props.avg1
            : team.teamId === 2
            ? props.avg2
            : props.avg3}
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
  let teamId = sessionStorage.getItem("teamId");
  console.log(teamId);

  useEffect(() => {
    axios.get("http://localhost:7000/team").then((response) => {
      setTeams(response.data);
    });
    axios.get("http://localhost:7000/rate/1").then((response) => {
      console.log(" hello world 1");
      console.log(response.data);
      let obj = response.data;
      let avg = 0;
      let min = 10;
      let max = 0;
      for (let x in response.data) {
        if (min > response.data[x].mark) min = response.data[x].mark;
        if (max < response.data[x].mark) max = response.data[x].mark;
        if (response.data[x].mark) avg += response.data[x].mark;
      }
      if (response.data.length > 2) {
        avg = avg - min - max;
        avg = avg / (response.data.length - 2);
      } else avg = avg / response.data.length;
      if (teamId != 1 && isProfessor == "false") {
        avg = "**********";
      }
      setAvgGrade1(avg);
    });
    axios.get("http://localhost:7000/rate/2").then((response) => {
      let avg = 0;
      let min = 10;
      let max = 0;
      for (let x in response.data) {
        if (min > response.data[x].mark) min = response.data[x].mark;
        if (max < response.data[x].mark) max = response.data[x].mark;
        avg += response.data[x].mark;
      }
      if (response.data.length > 2) {
        avg = avg - min - max;
        avg = avg / (response.data.length - 2);
      } else avg = avg / response.data.length;
      if (teamId != 2 && isProfessor == "false") {
        avg = "**********";
      }
      console.log(avg);
      setAvgGrade2(avg);
    });
    axios.get("http://localhost:7000/rate/3").then((response) => {
      console.log(" hello world 3");
      console.log(response.data);
      let avg = 0;
      let min = 10;
      let max = 0;
      for (let x in response.data) {
        if (min > response.data[x].mark) min = response.data[x].mark;
        if (max < response.data[x].mark) max = response.data[x].mark;
        avg += response.data[x].mark;
      }
      if (response.data.length > 2) {
        avg = avg - min - max;
        avg = avg / (response.data.length - 2);
      } else avg = avg / response.data.length;
      if (teamId != 3 && isProfessor == "false") {
        avg = "**********";
      }
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
          <TeamList
            teams={teams}
            avg1={avgGrade1}
            avg2={avgGrade2}
            avg3={avgGrade3}
            teamId={teamId}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
