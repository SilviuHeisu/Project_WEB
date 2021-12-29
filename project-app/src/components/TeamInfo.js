import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const TeamInfo = (props) => {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  let listStudents;
  const lista1 = [1,2];
  useEffect(() => {
    let path = `http://localhost:7000/student/${props.teamId}`
    axios
      .get(path)
      .then((response) => {
        setTeams(response.data);
        setStudents(response.data);
        console.log(response.data);
      });
      
  }, []);

  listStudents = students.map((student) => (
    <div className="Div2">
      <tr>
        <td>
          <ul>{student.firstName}</ul>
        </td>
        <td>
          {" "}
          <ul>{student.lastName}</ul>
        </td>
        <td>
          {" "}
          <ul>{student.yearOfStudy}</ul>
        </td>
      </tr>

      <br></br>
    </div>));
    console.log(listStudents);
    
 

  return <div>{listStudents}</div>;
};

export default TeamInfo;
