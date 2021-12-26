import React, { Component, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({});
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let password;

  useEffect(() => {
    axios.get("http://localhost:7000/student").then((response) => {
      setStudents(response.data);
    });
  }, []);
  function UserGreeting(props) {
    return <h1>Welcome back !"</h1>;
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(students);
    password = bcrypt.hashSync(
      e.target[1].value,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    console.log(password);

    let ok = false;
    for (let i = 0; i < students.length; i++) {
      console.log(students[i]);
      if (students[i].email === e.target[0].value) {
        ok = true;
        if (students[i].password === password) {
          alert("Successfuly logged in");
          setUser(students[i]);
          setIsLoggedIn(true);
          navigate("/home", {});
          localStorage.setItem("teamId", students[i].teamId);
          sessionStorage.setItem("isLoggedIn", true);
        } else {
          alert("Wrong Password");
        }
      }
    }
    if (ok === false) {
      alert("Wrong Email Address");
    }
  }
  return (
    <div className="login">
      <h4>Login_Cata</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {isLoggedIn ? (
        <div>
          <h2>
            {" "}
            Welcome back {user.firstName} {user.lastName}!
          </h2>
          <h3> Email Address: {user.email}</h3>
          <h3> Year of Study: {user.yearOfStudy}</h3>
          <h3> Faculty: {user.faculty}</h3>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
