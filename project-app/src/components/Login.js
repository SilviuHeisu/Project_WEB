import React, { Component, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


function Login() {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [user, setUser] = useState({});
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [isProfessor, setIsProfessor] = useState(false);
  let password;

  useEffect(() => {
    axios.get("http://localhost:7000/student").then((response) => {
      setStudents(response.data);
    });
    axios.get("http://localhost:7000/user").then((response) => {
      setProfessors(response.data);
    });
  }, []);
  function handleChange(e){
    if(e.target.value === "professor"){
      setIsProfessor(true);
    }
    else{
      setIsProfessor(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(students);

    password = bcrypt.hashSync(
      e.target[2].value,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    console.log(password);

    let ok = false;
    
    if(!isProfessor)
    {for (let i = 0; i < students.length; i++) {
      console.log(students[i]);
      if (students[i].email === e.target[1].value) {
        ok = true;
        if (students[i].password === password) {
          alert(`Successfuly logged in as Student`);
          setUser(students[i]);
          setIsLoggedIn(true);
          navigate("/home", {});
          localStorage.setItem("teamId", students[i].teamId);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("isProfessor", isProfessor);
          sessionStorage.setItem("user", user.name);
        } else {
          alert("Wrong Password");
        }
      }
    }
    if (ok === false) {
      alert("Wrong Email Address");
    }
  }
  else{
    for (let i = 0; i < professors.length; i++) {
      console.log(professors[i]);
      if (professors[i].email === e.target[1].value) {
        ok = true;
        if (professors[i].password === password) {
          alert(`Successfuly logged in as Professor`);
          setUser(professors[i]);
          setIsLoggedIn(true);
          navigate("/home", {});
          localStorage.setItem("teamId", professors[i].teamId);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("isProfessor", isProfessor);
          sessionStorage.setItem("user", user);
        } else {
          alert("Wrong Password");
        }
      }
    }
    if (ok === false) {
      alert("Wrong Email Address");
    }
  }
  }
  return (
    <div className="login">
      <h4>Login_Cata</h4>
      <form onSubmit={handleSubmit}>
      <lable>Choose a type:</lable>
      <select id="type" onChange={handleChange}>
        <option  value="student">Student</option>
        <option  value="professor">Professor</option>
      </select>
      <br></br>
        <input type="text" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {/* {isLoggedIn ? (
        <div>
          <h2>
            {" "}
            Welcome back {user.firstName} {user.lastName}!
          </h2>
          <h3> Email Address: {user.email}</h3>
          <h3> Year of Study: {user.yearOfStudy}</h3>
          <h3> Faculty: {user.faculty}</h3>
        </div>
      ) : null} */}
    </div>
  );
}

export default Login;
