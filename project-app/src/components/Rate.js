import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
const Rate = (props) => {
  let path;
  const [grade, setGrade] = useState();

  sessionStorage.setItem("TeamRated", props.teamId);

  return (
    <div>
      <form>
        <p>Please input a grade!</p>
        <input
          value={grade}
          type="number"
          max={10}
          onChange={(e) => {
            setGrade(e.target.value);
            sessionStorage.setItem("CurrentRating", e.target.value);
            console.log(grade);
          }}
        ></input>
        <a href={"/home"}>
          <Button>Submit</Button>
        </a>
      </form>
    </div>
  );
};

export default Rate;
