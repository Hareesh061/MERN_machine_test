import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';  
import './EditEmployee.css';  

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data } = await axios.get(`/api/employees/${id}`);
      setFormData(data);
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked ? value : '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const { data } = await axios.put(`/api/employees/${id}`, formDataToSend, config);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-employee-container">
      <Header />
      <div className="edit-employee-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />

          <label htmlFor="email">Enter Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

          <label htmlFor="mobile">Enter Mobile No</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" />

          <label htmlFor="designation">Enter Designation</label>
          <select id="designation" name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <fieldset>
            <legend>Gender</legend>
            <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
            <label htmlFor="female">Female</label>
          </fieldset>

          <fieldset>
            <legend>Course</legend>
            <input type="checkbox" id="mca" name="course" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} />
            <label htmlFor="mca">MCA</label>
            <input type="checkbox" id="bca" name="course" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} />
            <label htmlFor="bca">BCA</label>
            <input type="checkbox" id="bsc" name="course" value="BSC" checked={formData.course.includes('BSC')} onChange={handleChange} />
            <label htmlFor="bsc">BSC</label>
          </fieldset>

          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" onChange={handleChange} />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
