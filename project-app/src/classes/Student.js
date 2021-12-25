import React from "react";
export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Student: {
        StudentId: props.StudentId,
        firstName: props.firstName,
        lastName: props.lastName,
        CNP: props.CNP,
        yearOfStudy: props.yearOfStudy,
        birthYear: props.birthYear,
        faculty: props.faculty,
        email: props.email,
        teamId: props.teamId,
      },
    };
  }
}
