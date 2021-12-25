import React, { useState } from "react";
import reactDom from "react-dom";
import axios from "axios";
import Student from "../classes/Student";

const Register = () => {
  let [students, setStudents] = useState([]);
  const [password, setPassword] = useState("");
  const bcrypt = require("bcryptjs");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [CNP, setCNP] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [email, setEmail] = useState("");
  const [teamId, setTeamId] = useState("");
  let hashedPassword;

  function handleSubmit(e) {
    e.preventDefault();
    alert({ firstName });

    axios
      .get("http://localhost:7000/student")
      .then((response) => {
        setStudents((students) => [response.data]);
        localStorage.setItem("noStudents", students.length);
        console.log(students);
        hashedPassword = bcrypt.hashSync(
          password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        );
      })
      .then((response) => {
        let body = {
          StudentId: localStorage.getItem("noStudents"),
          firstName: { firstName },
          lastName: this.lastName,
          CNP: this.CNP,
          password: this.hashedPassword,
          yearOfStudy: this.yearOfStudy,
          birthYear: this.birthYear,
          faculty: this.faculty,
          email: this.email,
          teamId: this.teamId,
        };
        axios
          .post("http://localhost:7000/student", body)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={firstName}
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          value={lastName}
          type="text"
          placeholder="last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          value={email}
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={CNP}
          type="text"
          placeholder="First Name"
          onChange={(e) => setCNP(e.target.value)}
        />
        <input
          value={yearOfStudy}
          type="text"
          placeholder="year Of Study"
          onChange={(e) => setYearOfStudy(e.target.value)}
        />
        <input
          value={birthYear}
          type="text"
          placeholder="birth Year"
          onChange={(e) => setBirthYear(e.target.value)}
        />
        <input
          value={faculty}
          type="text"
          placeholder="Faculty"
          onChange={(e) => setFaculty(e.target.value)}
        />
        <input
          value={teamId}
          type="text"
          placeholder="team ID"
          onChange={(e) => setTeamId(e.target.value)}
        />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Register;
