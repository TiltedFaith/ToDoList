import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomDropdown from "./components/dropdown.js";
import ConfirmationModal from "./components/ConfirmationModal";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import PopUpModal from "./components/PopUpModal.js";

function App() {
  const defaultTasks = [];
  const getInitialData = () => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    const savedLastId = JSON.parse(localStorage.getItem("lastId")) || 3;
    return { tasks: savedData || [...defaultTasks], lastId: savedLastId };
  };

  const [data, setData] = useState(getInitialData().tasks);
  const [lastId, setLastId] = useState(getInitialData().lastId);
  const [activeTab, setActiveTab] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [showPopUpModal, setShowPopUpModal] = useState(false);   
  const [showDateErrorModal, setShowDateErrorModal] = useState(false);
  const [showTimeErrorModal, setShowTimeErrorModal] = useState(false);
  const [showDeleteOneModal, setShowDeleteOneModal] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("lastId", JSON.stringify(lastId));
  }, [data, lastId]);

  const updateTaskField = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const toggleEdit = (index) => {
    const updatedData = [...data];
    const task = updatedData[index];
    
    if (!task.task || !task.owner || !task.date || !task.time) {
      setShowPopUpModal(true);
      return; 
    }
  
    const selectedDate = new Date(task.date);
    const currentDate = new Date();
    
    
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    
    if (selectedDate < currentDate) {
      setShowDateErrorModal(true);
      return; 
    }
    
    
    const selectedTime = new Date(`${task.date}T${task.time}`);
    const currentTime = new Date();
  
    if (selectedDate.getTime() === currentDate.getTime() && selectedTime < currentTime) {
      setShowTimeErrorModal(true);
      return; 
    }
  
    task.editable = !task.editable; 
    setData(updatedData);
  };
  

  const updateStatus = (index, newStatus) => {
    console.log("Updating status for task", index, "to", newStatus);
    const updatedData = [...data];
    const task = updatedData[index];
  
    if (task.editable && newStatus === "Completed") {
      
      console.log("Completed status is not allowed while editing");
      return;
    }
  
    task.status = newStatus;
    setData(updatedData);
  };
  
  
  const addTask = () => {
    const newId = lastId + 1;
    setData([
      ...data,
      { id: newId, task: "", status: "Not Started", owner: "", date: "", time: "", editable: true },
    ]);
    setLastId(newId);
  };

  const deleteTask = (index) => {
    setTaskToDeleteIndex(index);  // Set the task index to be deleted
    setShowDeleteOneModal(true);   // Show the delete confirmation modal
  };

  const confirmDeleteOne = () => { 
    if (taskToDeleteIndex !== null) {
      setData(data.filter((_, i) => i !== taskToDeleteIndex)); // Delete the task from data
      setTaskToDeleteIndex(null); // Reset task index
      setShowDeleteOneModal(false); // Close the modal
    }
  };

  const completeAllTasks = () => {
    
    const isAnyTaskEditable = data.some(task => task.editable);
    
    if (isAnyTaskEditable) {
      return; 
    }
  
    const updatedData = data.map((task) => ({ ...task, status: "Completed" }));
    setData(updatedData);
  };
  

  const deleteAllTasks = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAll = () => {
    setData([]);
    setLastId(3);
    localStorage.removeItem("data");
    localStorage.removeItem("lastId");
    setShowDeleteModal(false);
  };

  const filteredTasks = activeTab === "All" ? data : data.filter((task) => task.status === activeTab);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <img
          src="/assets/logo.png"
          alt="LexMeet Logo"
          className="me-3 mb-1"
          style={{
            height: "3.4pc",
            filter: "brightness(0) invert(1)",
          }}
        />
        <h2 className="mt-2">LexMeet</h2>
      </div>

      <div className="container mt-4">
        <h1 className="text-center mb-3">To-Do List</h1>

        <Nav variant="tabs">
          {["All", "Not Started", "Blocked", "In Progress", "Completed"].map((status) => (
            <Nav.Item key={status}>
              <Nav.Link active={activeTab === status} onClick={() => setActiveTab(status)}>
                {status}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Due Date</th>
              <th>Due Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>
                  <input
                    type="text"
                    value={task.task}
                    onChange={(e) => updateTaskField(index, "task", e.target.value)}
                    className={`form-control task-input ${task.status === "Completed" ? "completed-task" : ""}`}
                    disabled={!task.editable}
                  />
                </td>
                <td>
                <CustomDropdown
                  key={task.id + task.status}
                  id={task.id}
                  initialStatus={task.status}
                  onChange={(newStatus) => updateStatus(index, newStatus)}
                  editable={task.editable} 
                  className="status-dropdown"
                />

                </td>
                <td>
                  <input
                    type="text"
                    value={task.owner}
                    onChange={(e) => updateTaskField(index, "owner", e.target.value)}
                    className="form-control task-input"
                    disabled={!task.editable}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={task.date}
                    onChange={(e) => updateTaskField(index, "date", e.target.value)}
                    className="form-control date-picker"
                    disabled={!task.editable}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={task.time}
                    onChange={(e) => updateTaskField(index, "time", e.target.value)}
                    className="form-control time-picker"
                    disabled={!task.editable}
                  />
                </td>
                <td className="text-center">

                  {task.status !== "Completed" && (
                    <button
                      onClick={() => toggleEdit(index)}
                      className={`btn ${task.editable ? "btn-success mx-1 btn-complete" : "btn-warning mx-1 btn-edit"}`}
                    >
                      <i className={`bi ${task.editable ? "bi-check-lg" : "bi-pencil"}`}></i>
                    </button>
                  )}
                  <button onClick={() => deleteTask(index)} className="btn btn-danger mx-1">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex gap-2 mt-2">
          <button onClick={addTask} className="btn btn-primary">
            + Add Task
          </button>
          <div className="ms-auto">
          <button
            onClick={completeAllTasks}
            className="btn complete-all-btn btn-success mx-2"
            disabled={data.some(task => task.editable)}
          >
            <i className="bi bi-check-circle"></i> Complete All
          </button>

          <button onClick={deleteAllTasks} className="btn delete-all-btn btn-danger mx-2">
            <i className="bi bi-trash"></i> Delete All
          </button></div>
        </div>
      </div>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteAll}
        title="Delete All Tasks"
        message="Are you sure you want to delete all tasks? This action cannot be undone."
      />

      <ConfirmationModal
        show={showDeleteOneModal}
        onHide={() => setShowDeleteOneModal(false)}
        onConfirm={confirmDeleteOne}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />

      <PopUpModal
        show={showPopUpModal}
        onHide={() => setShowPopUpModal(false)}
        title="Empty inputs"
        message="Please fill in all fields before saving the task."
      />

      <PopUpModal
        show={showDateErrorModal}
        onHide={() => setShowDateErrorModal(false)}
        title="Invalid Date"
        message="Please input a valid date"
      />

      <PopUpModal
        show={showTimeErrorModal}
        onHide={() => setShowTimeErrorModal(false)}
        title="Invalid Time"
        message="Please input a valid time"
      />

      
    </div>
  );
}

export default App;
