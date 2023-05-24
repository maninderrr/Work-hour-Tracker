import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css';
import NavBar from './Navigation/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  // const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const empid = urlParams.get('id');

  useEffect(() => {
    axios.get(`http://localhost:8089/employee/getTeam/${empid}`)
      .then(response => setEmployeeData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleAssignProject = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowPopup(true);

    axios.get('http://localhost:8089/project')
      .then(response => setProjectList(response.data))
      .catch(error => console.log(error));
     
      axios.get(`http://localhost:8089/mapping/${employeeId}`)
    .then(response => {
      const projectIds = response.data.map(mapping => mapping.Id);
      setSelectedProjectIds(projectIds);
    })
    .catch(error => console.log(error));
  }

  const handleProjectChange = (event) => {
    const selectedIds = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedProjectIds(selectedIds);
  }

  const handleAddProject = () => {
   
    const data = {
    projectIDs: selectedProjectIds.map(id => ({ projectID: id }))
    };

    axios.post(`http://localhost:8089/mapping/${selectedEmployeeId}`, selectedProjectIds.map(id => ({ projectID: id })))
    .then(response => {
      console.log(response);
      setShowPopup(false);
      toast.success('Projects added successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(error => {
      console.log(error);
      toast.error('Failed to add projects. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    });
    }

    
   
  return (
    <div className="employees-container">
      <NavBar />
      <ToastContainer />
     
      <div className="employees-list">
        <h1 className="employee-heading">
              Employee List
            </h1>
        <div className="grid-container">
          {employeeData.map(employee => (
            <div key={employee.id} className="grid-item">
              <div className="card">
                <div className="card-content">
                  <div className="employee-name">{employee.empName}</div>
                  <div className="employee-email">{employee.email}</div>
                  <div className="employee-manager">{employee.manager}</div>
                  <div className="employee-join-date">Joined on: {employee.DOJ}</div>
                  <button className="assign-project-btn btn-outline-secondary" onClick={() => handleAssignProject(employee.id)}>Assign Project</button>

                  {showPopup && employee.id === selectedEmployeeId &&
                    <div className="popup">
                      <h2>Select projects to add</h2>
                      <select className="project-select" value={selectedProjectIds} onChange={handleProjectChange} multiple>
                        {projectList.map(project => (
                          <option key={project.id} value={project.id}>{project.projectName}</option>
                        ))}
                      </select>
                      <div className="popup-buttons">
                        <button className="add-project-btn" onClick={handleAddProject}>Add Project</button>
                        <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Employees;
