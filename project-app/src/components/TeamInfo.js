import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const TeamInfo = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  let navigate = useNavigate();
  const styles = {
    border: "1px solid black",
  };
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  let listStudents;
  const lista1 = [1, 2];
  useEffect(() => {
    let path = `http://localhost:7000/student/${props.teamId}`;
    axios.get(path).then((response) => {
      setTeams(response.data);
      setStudents(response.data);
      console.log(response.data);
    });
    let teamIdUser = sessionStorage.getItem("teamId");
    let isProfessor = sessionStorage.getItem("isProfessor");
    debugger;
    if (props.teamId != teamIdUser && isProfessor == "false") {
      navigate("/home");
    }
  }, []);

  listStudents = students.map((student) => (
    //     <tr className="Div2">
    //       <td style={styles}>
    //         <ul>{team.teamId}</ul>
    //       </td>
    //       <td style={styles}>
    //         {" "}
    //         <ul>{team.teamName}</ul>
    //       </td>
    //       <td style={styles}>
    //         <a href={path}>
    //           <Button> Team Info </Button>
    //         </a>
    //       </td>
    //       <td style={styles}>
    //         <a href="/home/Rate">
    //           <Button> Rate </Button>
    //         </a>
    //       </td>

    //       <br></br>
    //     </tr>
    <div className="Div2">
      <tr>
        <td style={styles}>
          <ul>{student.firstName}</ul>
        </td>
        <td style={styles}>
          {" "}
          <ul>{student.lastName}</ul>
        </td>
        <td style={styles}>
          {" "}
          <ul>{student.yearOfStudy}</ul>
        </td>
      </tr>

      <br></br>
    </div>
  ));
  console.log(listStudents);

  return (
    <div>
      {listStudents}
      <div></div>
    </div>
  );
};

export default TeamInfo;

// function TeamList(props) {
//   const styles = {
//     border: "1px solid black",
//   };

//   const teams = props.teams;
//   for (let i = 0; i < teams.length; i++) {
//     console.log(teams[i].teamId);
//     console.log(teams[i].teamName);
//   }
//   const listItems = teams.map((team) =>{
//     const path = `/home/TeamInfo/${team.teamId}`;
//     return(
//     <tr className="Div2">
//       <td style={styles}>
//         <ul>{team.teamId}</ul>
//       </td>
//       <td style={styles}>
//         {" "}
//         <ul>{team.teamName}</ul>
//       </td>
//       <td style={styles}>
//         <a href={path}>
//           <Button> Team Info </Button>
//         </a>
//       </td>
//       <td style={styles}>
//         <a href="/home/Rate">
//           <Button> Rate </Button>
//         </a>
//       </td>

//       <br></br>
//     </tr>
//   )
// });
//   return (
//     <table style={styles}>
//       <tr style={styles}>
//         <th>Team ID</th>
//         <th style={styles}>Team Name</th>
//         <th>Team Info</th>
//         <th>Rate</th>
//       </tr>
//       <tbody>{listItems}</tbody>
//     </table>
//   );
// }

// const Home = () => {
//   const search = useLocation().search;
//   const teamId = localStorage.getItem("teamId");
//   const [teams, setTeams] = useState([]);
//   const isLoggedIn = sessionStorage.getItem("isLoggedIn");
//   const user = sessionStorage.getItem("user");
//   const isProfessor = sessionStorage.getItem("isProfessor");
//   useEffect(() => {
//     axios.get("http://localhost:7000/team").then((response) => {
//       setTeams(response.data);
//     });
//     //setIsProfessor(sessionStorage.getItem("isProfessor"));
//   }, []);

//   console.log(teams);
//   console.log(isLoggedIn);
//   console.log(user);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           {" "}
//           <h2>Hello there!</h2>
//           <TeamList teams={teams} />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Home;
