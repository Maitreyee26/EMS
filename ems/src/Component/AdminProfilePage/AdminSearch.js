import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AdminSearch.css";
import EmployeeRegistrationForm from '../EmployeeRegistration/EmployeeRegistrationForm'
import { RiSearchLine } from "react-icons/ri"; // search icon

const AdminSearch = () => {
  const [searchBy, setSearchBy] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate


  const handleClickAddEmp = () => {
    navigate("/addEmployee"); // Navigate to the /addEmployee route
  };
  const handleClickAddDept=() =>{
    navigate("/admin/addDepartment")
  }
  
 

  const handleSearch = () => {
    // Implement your search logic here based on searchBy and keyword
    // For demonstration purposes, let's assume you have an array of employees
    const employees = [
      { empid: 1, empname: "John Doe", department: "IT", location: "KOLKATA" },
      { empid: 2, empname: "ABC", department: "HR", location: "INDORE" },
      { empid: 3, empname: "DEF", department: "HR", location: "USA" },
      { empid: 4, empname: "GHI", department: "IT", location: "KOLKATA" },
      // Add more employee data as needed
    ];

    const handleEditClick = () => {
      console.log("Edit Clicked");
    };

    // Filter employees based on the selected criteria
    const filteredEmployees = employees.filter((employee) => {
      if (searchBy === "employeeId") {
        return keyword === "" || employee.empid.toString() === keyword;
      } else if (searchBy === "departmentName") {
        return (
          keyword === "" ||
          employee.department.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (searchBy === "empname") {
        return (
          keyword === "" ||
          employee.empname.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (searchBy === "officelocation") {
        return (
          keyword === "" ||
          employee.location.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      return false;
    });

    setSearchResults(filteredEmployees);
  };

  return (
    <div className="admin-container">
      <div className="button-container">
        <button className="add-buttons button1"
        onClick={ handleClickAddEmp}>Add Employee</button>
     
        <button className="add-buttons button2"
        onClick={ handleClickAddDept}>Add Department</button>
      </div>
      <div className="filter-search">
        <select
          id="searchBy"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="" disabled>
            Select Filter
          </option>
          <option value="employeeId" className="select-option">
            Employee ID
          </option>
          <option value="departmentName" className="select-option">
            Department Name
          </option>
          <option value="empname" className="select-option">
            Employee Name
          </option>
          <option value="officelocation" className="select-option">
            Office Location
          </option>
        </select>
        <input
          type="text"
          id="keyword"
          className="search-field"
          placeholder="Search Employee"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          <RiSearchLine className="search-icon" />
        </button>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th className="tableheader">Emp ID</th>
              <th className="tableheader">Emp Name</th>
              <th className="tableheader">Department</th>
              <th className="tableheader">Office Location</th>
              <th className="tableheader">Edit</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((employee) => (
              <tr key={employee.empid}>
                <td>{`${employee.empid}`}</td>
                <td>{`${employee.empname}`}</td>
                <td>{`${employee.department}`}</td>
                <td>{`${employee.location}`}</td>
                <td>
                  <button className="edit-button search-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSearch;