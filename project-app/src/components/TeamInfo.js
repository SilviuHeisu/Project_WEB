import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const TeamInfo = (props) => {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const listStudents = students.map((student) => (
    <p>Hello</p>
    // <div className="Div2">
    //   <tr>
    //     <td>
    //       <ul>{student.firstName}</ul>
    //     </td>
    //     <td>
    //       {" "}
    //       <ul>{student.lastName}</ul>
    //     </td>
    //     <td>
    //       {" "}
    //       <ul>{student.yearOfStudy}</ul>
    //     </td>
    //   </tr>

    //   <br></br>
    // </div>
  ));
  useEffect(() => {
    axios
      .get("http://localhost:7000/student", { params: props.teamId })
      .then((response) => {
        setTeams(response.data);
        console.log(response.data);
      });
  }, []);

  return <div>{listStudents}</div>;
};

export default TeamInfo;
