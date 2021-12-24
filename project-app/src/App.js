import "./App.css";
import React from "react";

function App() {
  const getUsers = async () => {
    const response = await fetch("http://localhost:7000/user");
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="container">
      <div>Hello</div>
      <button onClick={getUsers}>Get Load</button>
    </div>
  );
}

export default App;
