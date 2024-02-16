import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import './EditEmployeeForm.css';

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

  const [isEditMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [reportingManagers, setReportingManagers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEditClick = () => {
    setEditMode(true);
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
    e.preventDefault();
    setEditMode(false);

    try {
      const response = await axios.put(`http://localhost:8080/editEmployee/2`, {
        // emp_name: "Ram",
        // email: "abc@gmail.com",
        // contact_no: 8899009988,
        // alternate_contact_no: 9999999999,
        // permanent_address: formData.permanentAddress,
        // correspondence_address: formData.correspondenceAddress,
        // departmentEntity: {
        //   deptId: formData.department === '-' ? null : 1
        // },
        // reportingManagerId: formData.reportingManager === '-' ? null : 4,
        // dob: "2024-01-09 12:53:11.44337",
        // materialStatus: "Single",
        // gender: "Male",
        // bloodGroup: "B+",
        // personalEmail: formData.pemail

    });
        const updatedEmployeeDetails = response.data;

      setFormData({
        id: updatedEmployeeDetails.empId,
        name: updatedEmployeeDetails.emp_name,
        number: updatedEmployeeDetails.contact_no,
        skill: updatedEmployeeDetails.skills || '',
        phone: updatedEmployeeDetails.alternate_contact_no,
        permanentAddress: updatedEmployeeDetails.permanent_address || '',
        pemail: updatedEmployeeDetails.personalEmail || '',
        location: updatedEmployeeDetails.correspondence_address || '',
        email: updatedEmployeeDetails.email || '',
        correspondenceAddress: updatedEmployeeDetails.correspondence_address || '',
        //reportingManager: updatedEmployeeDetails.reportingManagerId || '-',
        reportingManager: 9,
        department: updatedEmployeeDetails.departmentEntity ? updatedEmployeeDetails.departmentEntity.dept_name : '-',
        shift: updatedEmployeeDetails.shift || '-'
      });




      

      // const updatedEmployeeDetails = response.data;

      // setFormData({
      //   id: updatedEmployeeDetails.empId,
      //   name: updatedEmployeeDetails.emp_name,
      //   number: updatedEmployeeDetails.contact_no.toString(),
      //   skill: updatedEmployeeDetails.skills || '',
      //   phone: updatedEmployeeDetails.alternate_contact_no.toString(),
      //   permanentAddress: updatedEmployeeDetails.permanent_address || '',
      //   pemail: updatedEmployeeDetails.personalEmail || '',
      //   location: updatedEmployeeDetails.correspondence_address || '',
      //   email: updatedEmployeeDetails.email || '',
      //   correspondenceAddress: updatedEmployeeDetails.correspondence_address || '',
      //   reportingManager: updatedEmployeeDetails.reportingManagerId.toString() || '-',
      //   department: updatedEmployeeDetails.departmentEntity ? updatedEmployeeDetails.departmentEntity.dept_name : '-',
      //   shift: updatedEmployeeDetails.shift || '-'
      // });

      toast.success('Details updated successfully');
    } catch (error) {
      console.error('Error updating details:', error);
      toast.error('Failed to update details. Please try again later.');
    }
  };

  const findByEmployeeByEmpId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/findEmployeeById/2');
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
    <form className="employee-form" onSubmit={handleSubmit}>
      <ToastContainer />
 
      <div>
        <p className="styledParagraph">Employee's Details</p>
      </div>
      <button type="button" className="employee-button" onClick={findByEmployeeByEmpId}>
        Edit Employee
      </button>
 
      <label className="edit-employee-label">
        <input
          className='EmployeeId'
          type="text"
          name="id"
          placeholder='Emp ID'
          value={formData.id}
          onChange={handleChange}
          disabled={!isEditMode}
        />
         <button type="button" className='delete-button' onClick={handleDeleteClick}>Delete Employee</button>
      </label>
     
      <div className="form-row">
        <div className="form-column">
          <label className="edit-employee-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="edit-employee-input"
              disabled={!isEditMode}
            />
          </label>
 
          <label className="edit-employee-label">
            Contact Number:
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="edit-employee-input"
              disabled={!isEditMode}
            />
          </label>
 
          <label className="edit-employee-label">
            Address:
            <input
              type="text"
              name="address"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="edit-employee-input"
              disabled={!isEditMode}
            />
          </label>
        </div>
 
        <div className="form-column">
          <label className="edit-employee-label">
            Skills:
            <input
              type="text"
              name="skills"
              value={formData.skills}
              className="edit-employee-input"
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
 
          <label className="edit-employee-label">
            Alternate Contact Number:
            <input
              type="text"
              name="phone"
              className="edit-employee-input"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
        </div>
      </div>
 
      <div className="form-row">
        <div className="form-column">
          <label className="edit-employee-label">
            Permanent Address:
            <input
              type="text"
              name="permanentAddress"
              className="edit-employee-input"
              value={formData.permanentAddress}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
 
          <label className="edit-employee-label">
            Personal Email Id:
            <input
              type="email"
              name="pemail"
              className="edit-employee-input"
              value={formData.pemail}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
        </div>
 
        <div className="form-column">
          <label className="edit-employee-label">
            Correspondence Address:
            <input
              type="text"
              name="correspondenceAddress"
              className="edit-employee-input"
              value={formData.correspondenceAddress}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
 
          <label className="edit-employee-label">
            Email Id:
            <input
              type="email"
              name="email"
              className="edit-employee-input"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </label>
        </div>
      </div>
 
      <div className='form-row'>
      <label>
          Reporting Manager:
          <select name="reportingManager" className="edit-employee-dropdown" value={formData.reportingManager} onChange={handleChange} disabled={!isEditMode}>
            <option value="select">-</option>
            {reportingManagers.map(manager => (
              <option key={manager.empId} value={manager.emp_name}>{manager.emp_name}</option>
            ))}
          </select>
          </label>
        
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
             
              onChange={handleCheckboxChange}
              disabled={!isEditMode}
              className="edit-employee-checkbox-input"
            />
            <span className="edit-employee-custom-checkbox"></span>
            Set As Manager
          </label>
        </div>
      </div>
 
      <div className='form-row'>
        <label>
          Departments:
          <select name="department" className="edit-employee-dropdown" value={formData.department} onChange={handleChange} disabled={!isEditMode}>
            <option value="-">-</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Account">Account</option>
          </select>
        </label>
 
        <label>
          Shift:
          <select name="shift" className="edit-employee-dropdown" value={formData.shift} onChange={handleChange} disabled={!isEditMode}>
            <option value="-">-</option>
            <option value="9:30 AM - 6:30 PM">9:30 AM - 6:30 PM</option>
            <option value="6:30 PM - 3:30 AM">6:30 PM - 3:30 AM</option>
          </select>
        </label>
      </div>
 
      <button type="submit" className='Submit-button' onClick={handleSubmit}>Submit</button>
    </form>
  );
};
 
export default EmployeeForm;
 
 
