import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import './Employeeform.css';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    number: '',
    skills: '',
    phone: '',
    permanentAddress: '',
    pemail: '',
    location: '',
    email: '',
    correspondenceAddress: '',
    reportingManager: '-',
    department: '-',
    shift: '-'
  });
  const { empId,jobId,employeeId } = useAuth();
  const [isEditMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [reportingManagers, setReportingManagers] = useState([]);
  // const [empId, setEmpId] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
 
  
 
  const handleDeleteClick = () => {
    setFormData({
      id: '',
      name: '',
      number: '',
      skills: '',
      phone: '',
      permanentAddress: '',
      pemail: '',
      location: '',
      email: '',
      correspondenceAddress: '',
      reportingManager: '-',
      department: '-',
      shift: '-'
    });
    setIsChecked(false);
 
    Swal.fire({
      icon: 'success',
      title: 'Record deleted',
      showConfirmButton: false,
      timer: 1500
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditMode(false);
  
    try {
      const response = await axios.put(`http://localhost:8080/editEmployee/${empId}`, {
        // Assuming your backend expects the data in this format
        id: formData.id,
        name: formData.name,
        number: formData.number,
        skills: formData.skills,
        phone: formData.phone,
        permanentAddress: formData.permanentAddress,
        pemail: formData.pemail,
        location: formData.location,
        email: formData.email,
        correspondenceAddress: formData.correspondenceAddress,
        reportingManager: formData.reportingManager,
        department: formData.department,
        shift: formData.shift
      });
  
      const updatedEmployeeDetails = response.data;
  
      setFormData({
        id: updatedEmployeeDetails.empId,
        name: updatedEmployeeDetails.emp_name,
        number: updatedEmployeeDetails.contact_no,
        skills: updatedEmployeeDetails.skills || '',
        phone: updatedEmployeeDetails.alternate_contact_no,
        permanentAddress: updatedEmployeeDetails.permanent_address || '',
        pemail: updatedEmployeeDetails.personalEmail || '',
        location: updatedEmployeeDetails.correspondence_address || '',
        email: updatedEmployeeDetails.email || '',
        correspondenceAddress: updatedEmployeeDetails.correspondence_address || '',
        reportingManager: updatedEmployeeDetails.reportingManagerId || '-',
        department: updatedEmployeeDetails.departmentEntity ? updatedEmployeeDetails.departmentEntity.dept_name : '-',
        shift: updatedEmployeeDetails.shift || '-'
      });
  
      toast.success('Details updated successfully');
    } catch (error) {
      console.error('Error updating details:', error);
      toast.error('Failed to update details. Please try again later.');
    }
  };
  
const findByEmployeeByEmpId = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/findEmployeeById/${empId}`);
      const employeeData = response.data;
 
      setFormData({
        id: employeeData.empId,
        name: employeeData.emp_name,
        number: employeeData.contact_no,
        skill: employeeData.skills || '',
        phone: employeeData.alternate_contact_no,
        permanentAddress: employeeData.permanent_address || '',
        pemail: employeeData.personalEmail || '',
        location: employeeData.correspondence_address || '',
        email: employeeData.email || '',
        correspondenceAddress: employeeData.correspondence_address || '',
        reportingManager: employeeData.reportingManagerId || '-',
        department: employeeData.departmentEntity ? employeeData.departmentEntity.dept_name : '-',
        shift: employeeData.shift || '-'
      });
 
      setIsChecked(employeeData.reportingManagerId === 4);
 
      setEditMode(true);
 
      try {
        const managersResponse = await axios.get('http://localhost:8080/findAllManagers');
        setReportingManagers(managersResponse.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    findByEmployeeByEmpId();
  }, []);
 
  return (
    <form className="employee-form-custom" onSubmit={handleSubmit}>
      <ToastContainer />
      <div>
        <p className="styledParagraph-custom">Employee's Details</p>
      </div>
      <button type="button" className="employee-button-custom" onClick={findByEmployeeByEmpId}>
        Edit Employee
      </button>
      <label>
        <input
          className='EmployeeId-custom'
          type="text"
          name="id"
          placeholder='Emp ID'
          value={formData.id}
          onChange={handleChange}
          disabled={!isEditMode}
        />
        <button type="button" className='delete-button-custom' onClick={handleDeleteClick}>Delete Employee</button>
      </label>
      <div className="form-row-custom">
        <div className="form-column-custom">
          <label className="label-custom">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
          <label className="label-custom">
            Contact Number:
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
          <label className="label-custom">
            Address:
            <input
              type="text"
              name="address"
              value={formData.permanentAddress}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
        </div>
        <div className="form-column-custom">
          <label className="label-custom">
            Skills:
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
          <label className="label-custom">
            Alternate Contact Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
        </div>
      </div>
      <div className="form-row-custom">
        <div className="form-column-custom">
          <label className="label-custom">
            Permanent Address:
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
          <label className="label-custom">
            Personal Email Id:
            <input
              type="email"
              name="pemail"
              value={formData.pemail}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
        </div>
        <div className="form-column-custom">
          <label className="label-custom">
            Correspondence Address:
            <input
              type="text"
              name="correspondenceAddress"
              value={formData.correspondenceAddress}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
          <label className="label-custom">
            Email Id:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditMode}
              className="input-custom"
            />
          </label>
        </div>
      </div>
      <div className="form-row-custom">
        <label className="label-custom">
          Reporting Manager:
          <select
            name="reportingManager"
            className="employee-dropdown-custom"
            value={formData.reportingManager}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <option value="select">-</option>
            {reportingManagers.map(manager => (
              <option key={manager.empId} value={manager.emp_name}>{manager.emp_name}</option>
            ))}
          </select>
        </label>
        <div className="checkbox-container-custom">
          <label className="checkbox-label-custom">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={!isEditMode}
              className="checkbox-input-custom"
            />
            <span className="custom-checkbox-custom"></span>
            Set As Manager
          </label>
        </div>
      </div>
      <div className="form-row-custom">
        <label className="label-custom">
          Departments:
          <select
            name="department"
            className="employee-dropdown-custom"
            value={formData.department}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <option value="-">-</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Account">Account</option>
          </select>
        </label>
        <label className="label-custom">
          Shift:
          <select
            name="shift"
            className="employee-dropdown-custom"
            value={formData.shift}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <option value="-">-</option>
            <option value="9:30 AM - 6:30 PM">9:30 AM - 6:30 PM</option>
            <option value="6:30 PM - 3:30 AM">6:30 PM - 3:30 AM</option>
          </select>
        </label>
      </div>
      <button type="submit" className='Submit-button-custom' onClick={handleSubmit}>Submit</button>
    </form>
  );
};
 
export default EmployeeForm;