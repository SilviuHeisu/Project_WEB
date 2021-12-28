import { useLocation } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

function TeamList(props) {
  const styles = {
    border: "1px solid black",
  };

  const teams = props.teams;
  for (let i = 0; i < teams.length; i++) {
    console.log(teams[i].teamId);
    console.log(teams[i].teamName);
  }
  const listItems = teams.map((team) => (
    <div className="Div2">
      <tr>
        <td>
          <ul>{team.teamId}</ul>
        </td>
        <td>
          {" "}
          <ul>{team.teamName}</ul>
        </td>
        <td>
          <Button> Team Info </Button>
        </td>
      </tr>

      <br></br>
    </div>
  ));
  return (
    <div className="Div1">
      <table style={styles}>
        <thead></thead>
        <tbody>
          <tr style={styles}>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Team Info</th>
          </tr>
          <ul>{listItems}</ul>
        </tbody>
      </table>
    </div>
  );
}

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
