
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import reactDom from "react-dom";
import axios from "axios";
import Student from "../classes/Student";
import { useNavigate } from "react-router-dom";

const Rate = (props) => {
  let navigate = useNavigate();
  
 
  let path;
  const [grade, setGrade] = useState();



  sessionStorage.setItem("TeamRated", props.teamId);
  
  function handleSubmit(e) {
    e.preventDefault();
    
    console.log(grade);
        let body = {
          mark: grade,
          person: sessionStorage.getItem("user"),
          teamId:sessionStorage.getItem("TeamRated")
        };
        axios
          .post("http://localhost:7000/rate", body)
          .then((response) => {
            console.log(response.data);
            // localStorage.setItem("Rates",response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/home");
      
  }
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <p>Please input a grade!</p>
        <input
          value={grade}
          type="number"
          max={10}
          onChange={(e) => {
            setGrade(e.target.value);
            sessionStorage.setItem("CurrentRating", e.target.value);
            console.log(grade);
            sessionStorage.getItem("TeamRated");
            console.log(sessionStorage.getItem("TeamRated"));
          }}
        ></input>
        <a href={"/home"}>
        <button type="submit" value="Submit" >
          Submit
        </button>
        </a>
      </form>
    </div>
  );
};

export default Rate;
