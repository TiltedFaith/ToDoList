import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import CustomDropdown from "./components/dropdown.js";
import React, { useEffect, useState } from "react";

function App() {
  const getInitialData = () => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    return savedData || [
      { id: 1, task: "Don't do this", status: "Not Started", owner: "Me", date: "Today" },
      { id: 2, task: "Do that", status: "Not Started", owner: "You", date: "Tomorrow" },
      { id: 3, task: "Do This", status: "Not Started", owner: "Us", date: "Yesterday" }
    ];
  };

  const [data, setData] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const updateStatus = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index].status = newStatus;
    setData(updatedData);
  };

  const addTask = () => {
    setData([...data, {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1, 
      task: "",
      status: "Not Started",
      owner: "",
      date: "" }]);
  };

  const deleteTask = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  //  TODO: Complete the remaining functionalities
  //  []: Editable Task name
  //  []: Editable Owner cell
  //  []: Editable Due Date
  //  []: Better Design
  
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task, index) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>
                <CustomDropdown
                  id={task.id}
                  initialStatus={task.status}
                  onChange={(newStatus) => updateStatus(index, newStatus)}
                />
              </td>
              <td>{task.owner}</td>
              <td>{task.date}</td>
              <td>
                <button onClick={() => deleteTask(index)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addTask} className="btn btn-primary mt-2">Add Task</button>
    </div>
  );
}

export default App;
