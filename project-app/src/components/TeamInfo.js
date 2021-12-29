import React from "react";
import { useEffect } from "react";
import axios from "axios";
const TeamInfo = (props) => {
  const [students, setStudents] = useState([]);
  const listStudents = students.map((student) => (
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
    </div>
  ));
  useEffect(() => {
    debugger;
    axios
      .get("http://localhost:7000/student", { params: props.teamId })
      .then((response) => {
        setTeams(response.data);
      });
  });
  return { TeamInfo };
  
};

export default TeamInfo;
