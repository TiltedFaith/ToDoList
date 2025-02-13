import "bootstrap/dist/css/bootstrap.min.css";
import './styles/App.css';
import CustomDropdown from './components/dropdown.js';
import React from "react";

function App() {
  const data = [
    { task: "Don't do this", status: 25, city: "Me", date: "Today"},
    { task: "Do that", status: 30, city: "You", date: "Tomorrow" },
    { task: "Do This", status: 27, city: "Us", date: "Yesterday" }
  ];
  return (
    <div>
      <button onclick="myFunction()">Add Task</button>
      <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={index}>
            <td>{person.task}</td>
            <td>{<CustomDropdown />}</td>
            <td>{person.city}</td>
            <td>{person.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default App;
