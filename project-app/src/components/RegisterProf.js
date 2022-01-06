import React, { useState } from "react";
import reactDom from "react-dom";
import axios from "axios";
import Prof from "../classes/Prof";
import { useNavigate } from "react-router-dom";
const RegisterProf = () => {
  let [prof, setProf] = useState([]);
  const [password, setPassword] = useState("");
  //const bcrypt = require("bcryptjs");
  const bcrypt = require("bcryptjs");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  let hashedPassword;
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    alert({ name });

    axios
      .get("http://localhost:7000/user")
      .then((response) => {
        setProf((prof) => [response.data]);
        localStorage.setItem("noProf", prof.length);
        console.log(prof);
        hashedPassword = bcrypt.hashSync(
          password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        );
      })
      .then((response) => {
        let body = {
          userId: localStorage.getItem("noProf"),
          name: String(name),
          email: String(email),
          password: String(hashedPassword),
          subject: String(subject),
        };
        axios
          .post("http://localhost:7000/user", body)
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
          value={name}
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
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
          value={subject}
          type="text"
          placeholder="subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default RegisterProf;
