import React from "react";
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Prof: {
        userId: props.userId,
        name: props.name,
        email: props.email,
        password:props.password,
        subject: props.subject,
      },
    };
  }
}
