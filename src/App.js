import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomDropdown from "./components/dropdown.js";
import React, { useEffect, useState } from "react";

function App() {
  const defaultTasks = [];
  const getInitialData = () => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    const savedLastId = JSON.parse(localStorage.getItem("lastId")) || 3; 
    return { tasks: savedData || [...defaultTasks], lastId: savedLastId };
  };

  const [data, setData] = useState(getInitialData().tasks);
  const [lastId, setLastId] = useState(getInitialData().lastId);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("lastId", JSON.stringify(lastId));
  }, [data, lastId]);

  const updateTaskField = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const updateStatus = (index, newStatus) => {
    updateTaskField(index, "status", newStatus);
  };

  const addTask = () => {
    const newId = lastId + 1;
    setData([...data, { id: newId, task: "", status: "Not Started", owner: "", date: "" }]);
    setLastId(newId);
  };

  const deleteTask = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-center mt-0">To-Do List</h1>
      <div className="container mt-4">
        <table className="table table-bordered">
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
                <td>
                  <input
                    type="text"
                    value={task.task}
                    onChange={(e) => updateTaskField(index, "task", e.target.value)}
                    className="form-control task-input"
                  />
                </td>
                <td>
                <CustomDropdown
                  id={task.id}
                  initialStatus={task.status}
                  onChange={(newStatus) => updateStatus(index, newStatus)}
                  className="status-dropdown"
                />
                </td>
                <td>
                  <input
                    type="text"
                    value={task.owner}
                    onChange={(e) => updateTaskField(index, "owner", e.target.value)}
                    className="form-control task-input"
                  />
                </td>
                <td>
                <input
                  type="date"
                  value={task.date}
                  onChange={(e) => updateTaskField(index, "date", e.target.value)}
                  className="form-control date-picker date-picker-input"
                />
                </td>
                <td>
                  <button onClick={() => deleteTask(index)} className="btn btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addTask} className="btn btn-primary mt-2">
          + Add Task
        </button>
      </div>
    </div>
  );
}

export default App;
