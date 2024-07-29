const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;
  const employee = new Employee({ name, email, mobile, designation, gender, course, image });
  await employee.save();
  res.status(201).json({ message: 'Employee created successfully' });
};

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;
  await Employee.findByIdAndUpdate(id, { name, email, mobile, designation, gender, course, image });
  res.json({ message: 'Employee updated successfully' });
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({ message: 'Employee deleted successfully' });
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };
