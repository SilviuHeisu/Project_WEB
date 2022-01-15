import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoInput from "./VideoInput";
const TeamInfo = (props) => {
  function handleSubmission() {
    let body = {
      nameOfFile: selectedFile.name,
      studentWhoUploaded: user,
      teamId: teamIdUser,
    };
    axios
      .post("http://localhost:7000/deliverable", body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  }
  let navigate = useNavigate();
  const styles = {
    border: "1px solid black",
  };
  let teamIdUser = sessionStorage.getItem("teamId");

  let user = sessionStorage.getItem("user");
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  let listStudents;
  const lista1 = [1, 2];
  useEffect(() => {
    let path = `http://localhost:7000/student/${props.teamId}`;
    axios.get(path).then((response) => {
      setTeams(response.data);
      setStudents(response.data);
      console.log(response.data);
    });

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
      <div>
        <div>Upload your Deliverables</div>

        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div className="App">
          <h1>Video upload</h1>
          <VideoInput width={400} height={300} />
        </div>
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
