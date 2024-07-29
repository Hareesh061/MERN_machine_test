import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; 
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get('/api/employees');
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employees/${id}`);
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Employee List</h2>
        <div className="employee-header">
          <div className="employee-count">
            Total Count: {employees.length}
          </div>
          <Link to="/create-employee" className="create-button">Create Employee</Link>
        </div>
        <div className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Enter Search Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.uniqueId || 'N/A'}</td>
                <td>
                  <img src={employee.image} alt={employee.name} width="50" height="50" />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit-employee/${employee._id}`}>Edit</Link>
                  <button onClick={() => deleteHandler(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
