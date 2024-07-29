const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
