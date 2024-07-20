import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <Navbar />
      <div className="my-10 ">
        <Todo />
      </div>
    </>
  );
}

export default App;
