import React, { useState, useEffect } from "react";
import "./EmployeeRegistrationForm.css";
export default function EmployeeRegistrationForm() {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [altcontact, setAltcontact] = useState("");
  const [altcontactname, setAltcontactname] = useState("");
  const [comemail, setcomemail] = useState("");
  const [context, setContext] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  // State to track the selected value
  const [departmentOptions, setDepartmentOptions] = useState([]);
 
  // const [fdropdown, setFdropdown] = useState("");
  const [fdropdown, setFdropdown] = useState("");
  //permenant address usestate
  const [permanentAddress, setPermanentAddress] = useState({
    address_line_1: "",
    address_line_2: "",
    country: "",
    state: "",
    city: "",
    postal: "",
  });

  const [correspondenceAddress, setCorrespondenceAddress] = useState({
    address_line_1: "",
    address_line_2: "",
    country: "",
    state: "",
    city: "",
    postal: "",
  });

  // Options for the dropdown
  // const options = [
  //   { value: "IT", label: "IT" },
  //   { value: "Sales", label: "Sales" },
  //   { value: "Marketing", label: "Marketing" },
  // ];
  const [genderDropdown, setGenderDropdown] = useState("");
  const [maritalStatusDropdown, setMaritalStatusDropdown] = useState("");
  const [isReportingManager, setIsReportingManager] = useState(false);
  const [reportingManagers, setReportingManagers] = useState([]);
  const [reportingManager, setReportingManager] = useState("");
  const currentYear = new Date().getFullYear();

  // Set the range for the calendar, e.g., +/- 10 years from the current year
  const minYear = currentYear - 50;
  const maxYear = currentYear - 20;
  //permanent address validation
  const validatePermanentAddress = (permanentAddress) => {
    const errors = {};

    if (!permanentAddress.address_line_1) {
      errors.pad1 = "Address line 1 is required";
    }

    if (!permanentAddress.country) {
      errors.pcountry = "Country is required";
    }

    if (!permanentAddress.state) {
      errors.pstate = "State is required";
    }

    if (!permanentAddress.city) {
      errors.pcity = "City is required";
    }

    if (!permanentAddress.postal) {
      errors.ppostal = "Postal code is required";
    } else if (permanentAddress.postal.length === 10) {
      if (!/^\d{5}(-\d{4})?$/.test(permanentAddress.postal)) {
        errors.ppostal =
          "Must be 5 digits or 5 digits with a hyphen and 4 more digits.";
      }
    } else if (permanentAddress.postal.length === 6) {
      if (!/^\d{6}$/.test(permanentAddress.postal)) {
        errors.ppostal = "Must be exactly 6 digits.";
      }
    } else {
      errors.ppostal = "Invalid Format";
    }
    return errors;
  };

  //correspondance address validation
  const validateCorrespondenceAddress = (correspondenceAddress) => {
    const errors = {};

    if (!correspondenceAddress.address_line_1) {
      errors.cad1 = "Address line 1 is required";
    }
    if (!correspondenceAddress.country) {
      errors.ccountry = "Country is required";
    }

    if (!correspondenceAddress.state) {
      errors.cstate = "State is required";
    }

    if (!correspondenceAddress.city) {
      errors.ccity = "City is required";
    }

    if (!correspondenceAddress.postal) {
      errors.cpostal = "Postal code is required";
    } else if (correspondenceAddress.postal.length === 10) {
      if (!/^\d{5}(-\d{4})?$/.test(correspondenceAddress.postal)) {
        errors.cpostal =
          "Must be 5 digits or 5 digits with a hyphen and 4 more digits.";
      }
    } else if (correspondenceAddress.postal.length === 6) {
      if (!/^\d{6}$/.test(correspondenceAddress.postal)) {
        errors.cpostal = "Must be exactly 6 digits.";
      }
    } else {
      errors.cpostal = "Invalid Format";
    }
    return errors;
  };

  //handle dropdown
  const validateDropdown = (value) => {
    if (!value) {
      return "Please select an option";
    }
    return null;
  };

  ///
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/getAllDepartments");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Modify the data to include both department and location
        const modifiedData = data.map((item) => ({
          value: `${item.deptId}`, // Use "deptId" as the key
          // value: `${item.dept_name} (${item.location})`,
          label: `${item.dept_name} (${item.location})`,
        }));

        console.log("Received department data:", modifiedData);
        setDepartmentOptions(modifiedData);
      } catch (error) {
        console.error("Error fetching department data:", error.message);
      }
    };

    // Call the fetchDepartmentData function when the component mounts
    fetchDepartmentData();
  }, []);
  const fetchReportingManagers = async () => {
    try {
      const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/findAllManagers"
        
      );
      const data = await response.json();
      const reportingManagersOptions = data.map(manager => ({
        value: manager.empId,
        label: manager.emp_name
    }));

    // Assuming setReportingManagers function sets the options for the dropdown
    setReportingManagers(reportingManagersOptions);
    console.log(reportingManagersOptions)
      // setReportingManagers(data); // Assuming data is an array of objects with value and label properties
    } catch (error) {
      console.error("Error fetching reporting managers:", error);
    }
  };

  useEffect(() => {
    fetchReportingManagers();
  }, []); // Fetch reporting managers on component mount
  ///
  const handleSameAddressChange = (event) => {
    if (event.target.checked) {
      setCorrespondenceAddress({
        address_line_1: permanentAddress.address_line_1,
        address_line_2: permanentAddress.address_line_2,
        country: permanentAddress.country,
        state: permanentAddress.state,
        city: permanentAddress.city,
        postal: permanentAddress.postal,
      });
    } else {
      setCorrespondenceAddress({
        address_line_1: "",
        address_line_2: "",
        country: "",
        state: "",
        city: "",
        postal: "",
      });
    }
    // Validate correspondence address only when checkbox is unchecked
    if (!event.target.checked) {
      const updatedErrors = validateCorrespondenceAddress(
        correspondenceAddress
      );
      setErrors(updatedErrors);
    }
  };
  const validateFname = (value) => {
    if (!value) {
      return "First Name is required";
    }
    if (!/^[a-zA-Z\p{L}\s]+$/.test(value)) {
      return "First name can only contain letters and spaces.";
    }
    return null;
  };
  //date validation
  const validateDate = (value) => {
    if (!value) {
      return "Please select a date.";
    }
    return null;
  };
  const validateReportingManager=(value)=>{
    if(!value){
      return "Please Select A reporting Manager";
    }
    return null;
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "fname") {
      setFname(value);
      const fnameError = validateFname(value);
      if (fnameError) {
        setErrors((prevState) => ({ ...prevState, fname: fnameError }));
      } else {
        setErrors((prevState) => ({ ...prevState, fname: null }));
      }
    }
    if (id === "mname") {
      setMname(value);
    }
    if (id === "lname") {
      setLname(value);
    }
    if (id === "contact") {
      setContact(value);
      const contactError = validateContact(value);
      if (contactError) {
        setErrors((prevState) => ({ ...prevState, contact: contactError }));
      } else {
        setErrors((prevState) => ({ ...prevState, contact: null }));
      }
    }

    if (id === "altcontact") {
      setAltcontact(value);
      const altcontactError = validateAltcontact(value);
      if (altcontactError) {
        setErrors((prevState) => ({
          ...prevState,
          altcontact: altcontactError,
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, altcontact: null }));
      }
    }
    if (id === "altcontactname") {
      setAltcontactname(value);
      const altcontactnameError = validateAltcontactname(value);
      if (altcontactnameError) {
        setErrors((prevState) => ({
          ...prevState,
          altcontactname: altcontactnameError,
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, altcontactname: null }));
      }
    }
    if (id === "comemail") {
      setcomemail(value);
      const comemailError = validateComemail(value);
      if (comemailError) {
        setErrors((prevState) => ({ ...prevState, comemail: comemailError }));
      } else {
        setErrors((prevState) => ({ ...prevState, comemail: null }));
      }
    }
    if (id.startsWith("p")) {
      const fieldName = id.substring(1);

      setPermanentAddress((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }

    if (id.startsWith("c")) {
      const fieldName = id.substring(1);
      setCorrespondenceAddress((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (id === "datepicker") {
      setSelectedDate(value);
      const dateError = validateDate(value);
      if (dateError) {
        setErrors((prevState) => ({ ...prevState, datepicker: dateError }));
      } else {
        setErrors((prevState) => ({ ...prevState, datepicker: null }));
      }
    }
    if (id === "fdropdown") {
      setFdropdown(value);
      console.log("the data is:", value);
      const dropdownError = validateDropdown(value);
      setErrors((prevState) => ({ ...prevState, fdropdown: dropdownError }));
    }
    if (id === "reportingManagerDropdown") {
      setReportingManager(value);
      console.log("the data is:", value);
      const reportingError = validateReportingManager(value);
      setErrors((prevState) => ({ ...prevState, reportingManager: reportingError }));
    }
    if (id === "maritalStatusDropdown") {
      setMaritalStatusDropdown(value);
      console.log("the marital status is:", value);
      const maritalStatusError = validateMaritalStatus(value);
      setErrors((prevState) => ({
        ...prevState,
        maritalStatusDropdown: maritalStatusError,
      }));
    }
    if (id === "genderDropdown") {
      setGenderDropdown(value);
      console.log("the gender is:", value);
      const genderError = validateGender(value);
      setErrors((prevState) => ({ ...prevState, genderDropdown: genderError }));
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // You can perform additional actions when the date changes
  };
  const validateContact = (value) => {
    if (!value) {
      return "Phone number is required";
    }

    if (!/^\d{10}$/.test(value)) {
      return "Invalid phone number format";
    }

    return null;
  };

  const validateAltcontact = (value) => {
    if (!value) {
      return "Emergency Phone number is required";
    }

    if (!/^\d{10}$/.test(value)) {
      return "Invalid phone number format";
    }

    return null;
  };
  const validateAltcontactname = (value) => {
    if (!value) {
      return "Emergency Name is required";
    }
    return null;
  };

  const validateComemail = (value) => {
    if (!value) {
      return "Work email is required";
    }

    if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return "Invalid email format";
    }

    return null;
  };

  const validateMaritalStatus = (value) => {
    if (!value) return "Marital status is required";
    return null;
  };

  const validateGender = (value) => {
    if (!value) return "Gender is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedErrors = {
      fname: validateFname(fname),
      contact: validateContact(contact),
      altcontact: validateAltcontact(altcontact),
      altcontactname:validateAltcontactname(altcontactname),
      comemail: validateComemail(comemail),
      ...validatePermanentAddress(permanentAddress),
      ...validateCorrespondenceAddress(correspondenceAddress),
      datepicker: validateDate(selectedDate),
      fdropdown: validateDropdown(fdropdown),
      maritalStatusDropdown: validateMaritalStatus(maritalStatusDropdown),
      genderDropdown: validateGender(genderDropdown),
      reportingManagerDropdown:validateReportingManager(reportingManagers),
     
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(updatedErrors).filter(([_, value]) => value !== null)
    );

    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length === 0) {
  

      try {
      
        const dob = selectedDate + " 00:00:00.00000";

        const data = {
          emp_name: `${fname} ${mname} ${lname}`,
          contact_no: contact !== "" ? parseInt(contact, 10) : null,
          alternate_contact_no: altcontact,
          alternate_contact_name:altcontactname,
          email: comemail,
          permanent_address: `${permanentAddress.address_line_1} ${permanentAddress.address_line_2} ${permanentAddress.country} ${permanentAddress.state} ${permanentAddress.city} ${permanentAddress.postal}`,
          correspondence_address: `${correspondenceAddress.address_line_1} ${correspondenceAddress.address_line_2} ${correspondenceAddress.country} ${correspondenceAddress.state} ${correspondenceAddress.city} ${correspondenceAddress.postal}`,
          departmentEntity: {
            deptId: fdropdown,
          },
          maritalStatus: maritalStatusDropdown,
          gender: genderDropdown,
          dob: dob, // Assign the formatted date of birth here
          employeeType: {
            employeeTypeId: isReportingManager ? 1 : 2, // Set employee type based on the checkbox
          },
          reportingManagerId:reportingManager,

        };

        console.log(data);
        // console.log(fdropdown.value);

        // Send a POST request to the backend with the modified form data
        const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/addEmployee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
        
          setContext(true);

          // Reset context after 3 seconds
          setTimeout(() => {
            setContext(false);
          }, 3000);

          console.log("Form data submitted successfully");
        } else {
          // Handle errors, e.g., show an error message to the user
          console.error(
            "Failed to submit form data. Server returned:",
            response.status,
            response.statusText
          );

          // If you want to see the response body, you can log it as well
          const responseBody = await response.text();
          console.error("Response body:", responseBody);
        }
      } catch (error) {
        // Handle network errors
        console.error("Error submitting form data:", error);
      }
    }
  };
  return (
    <div className="container employee-registration-main-div-form">
      <div className="employee-registration-reg-header-emp">
        <h2>REGISTRATION PAGE FOR EMPLOYEE</h2>
      </div>
      <form>
        {/* Name of employees */}
        <div className="employee-registration-label-input">
          <label htmlFor="fname" className="employee-registration-form-label">
            First Name : <span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={fname}
            className="form-control employee-registration-input-css-form"
            id="fname"
            placeholder="Enter Your First Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.fname && <div id="fnameError">{errors.fname}</div>}
        </div>

        <div className="employee-registration-label-input">
          <label htmlFor="mname" className="employee-registration-form-label">
            Middle Name :
          </label>
          <input
            type="text"
            value={mname}
            className="form-control employee-registration-input-css-form"
            id="mname"
            required
            placeholder="Enter Your Middle Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors"></div>
        <div className="employee-registration-label-input">
          <label htmlFor="lname" className="employee-registration-form-label">
            Last Name : <span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={lname}
            className="form-control employee-registration-input-css-form"
            id="lname"
            placeholder="Enter Your Last Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors"></div>
        {/* Contact Details of employees */}
        <div className="employee-registration-label-input">
          <label htmlFor="contact" className="employee-registration-form-label">
            Phone Number :<span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={contact}
            className="form-control employee-registration-input-css-form"
            id="contact"
            placeholder="Enter Phone number"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.contact && <div id="contacterror">{errors.contact}</div>}
        </div>

        <div className="employee-registration-label-input">
          <label htmlFor="altcontact" className="employee-registration-form-label">
            Emergency Phone Number :<span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={altcontact}
            className="form-control employee-registration-input-css-form"
            id="altcontact"
            placeholder="Enter Emergency Phone no"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.altcontact && (
            <div id="altcontacterror">{errors.altcontact}</div>
          )}
        </div> 
        {/* <div className="employee-registration-form-errors">
          {errors.altcontact && (
            <div id="altcontacterror">{errors.altcontact}</div>
          )}
        </div>
 <div className="employee-registration-label-input">
          <label htmlFor="altcontact" className="employee-registration-form-label">
            Emergency Phone Number :<span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={altcontact}
            className="form-control employee-registration-input-css-form"
            id="altcontact"
            placeholder="Enter Emergency Phone no"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.altcontact && (
            <div id="altcontacterror">{errors.altcontact}</div>
          )}
        </div> */}
        {/* emergency contact name */}
        <div className="employee-registration-label-input">
          <label htmlFor="altcontact" className="employee-registration-form-label">
            Emergency Contact Name :<span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="text"
            value={altcontactname}
            className="form-control employee-registration-input-css-form"
            id="altcontactname"
            placeholder="Enter Emergency Contact Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.altcontactname && (
            <div id="altcontactnameerror">{errors.altcontactname}</div>
          )}
        </div>
        {/* Email id */}
        <div className="employee-registration-label-input">
          <label htmlFor="" className="employee-registration-form-label">
            Work Email id :<span className="employee-registration-mandatory">*</span>
          </label>
          <input
            type="email"
            className="form-control employee-registration-input-css-form"
            value={comemail}
            id="comemail"
            placeholder="Enter Work Email id"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.comemail && <div id="comemailerror">{errors.comemail}</div>}
        </div>
        {/* Gender dropdown */}
        <div className="employee-registration-label-input">
          <label htmlFor="genderDropdown" className="employee-registration-form-label">
            Gender:<span className="employee-registration-mandatory">*</span>
          </label>
          <select
            className="employee-registration-dropdown-toggle employee-registration-input-css-form employee-registration-form-placeholder"
            id="genderDropdown"
            value={genderDropdown}
            onChange={(e) => setGenderDropdown(e.target.value)}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="employee-registration-form-errors">
          {errors.genderDropdown && (
            <div id="genderDropdownError">{errors.genderDropdown}</div>
          )}
        </div>
        {/* Marital status dropdown */}
        <div className="employee-registration-label-input">
          <label htmlFor="maritalStatusDropdown" className="employee-registration-form-label">
            Marital Status:<span className="employee-registration-mandatory">*</span>
          </label>
          <select
            className="employee-registration-dropdown-toggle employee-registration-input-css-form employee-registration-form-placeholder"
            id="maritalStatusDropdown"
            value={maritalStatusDropdown}
            onChange={(e) => setMaritalStatusDropdown(e.target.value)}
          >
            <option value="" disabled>
              Select Marital Status
            </option>
            <option value="Unmarried">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="employee-registration-form-errors">
          {errors.maritalStatus && (
            <div id="maritalStatusError">{errors.maritalStatus}</div>
          )}
        </div>
        {/*Permanent Addresses of employees */}

        <div className="employee-registration-label-input employee-registration-label-only">
          <label className="employee-registration-form-label">
            Permanent Address :<span className="employee-registration-mandatory">*</span>
          </label>
        </div>

        <div className="employee-registration-label-input">
          <label htmlFor="pad1" className="employee-registration-form-label">
            Address Line 1 :
          </label>
          <input
            type="text"
            value={permanentAddress.address_line_1}
            className="form-control employee-registration-input-css-form"
            id="pad1"
            placeholder="Enter Address Line 1"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                address_line_1: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.pad1 && <div id="pad1error">{errors.pad1}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="pad2" className="employee-registration-form-label">
            Address Line 2 :
          </label>
          <input
            type="text"
            value={permanentAddress.address_line_2}
            className="form-control employee-registration-input-css-form"
            id="pad2"
            placeholder="Enter Address Line 2"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                address_line_2: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors"></div>
        <div className="employee-registration-label-input">
          <label htmlFor="pcountry" className="employee-registration-form-label">
            Country :
          </label>
          <input
            type="text"
            value={permanentAddress.country}
            className="form-control employee-registration-input-css-form"
            id="pcountry"
            placeholder="Enter Country Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                country: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {" "}
          {errors.pcountry && <div id="pcountryerror">{errors.pcountry}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="pstate" className="employee-registration-form-label">
            State :
          </label>
          <input
            type="text"
            value={permanentAddress.state}
            className="form-control employee-registration-input-css-form"
            id="pstate"
            placeholder="Enter State Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                state: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.pstate && <div id="pstateerror">{errors.pstate}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="pcity" className="employee-registration-form-label">
            City :
          </label>
          <input
            type="text"
            value={permanentAddress.city}
            className="form-control employee-registration-input-css-form"
            id="pcity"
            placeholder="Enter City Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                city: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.pcity && <div id="pcityerror">{errors.pcity}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="ppostal" className="employee-registration-form-label">
            Postal Code :
          </label>
          <input
            type="text"
            value={permanentAddress.postal}
            className="form-control employee-registration-input-css-form"
            id="ppostal"
            placeholder="Enter Postal Code"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                postal: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.ppostal && <div id="ppostalerror">{errors.ppostal}</div>}
        </div>
        <div className="employee-registration-mb-3 employee-registration-form-check employee-registration-checkbox-label-input ">
          <input
            type="checkbox"
            id="sameAddressCheckbox"
            onChange={handleSameAddressChange}
          />
          <label className="employee-registration-form-check-label employee-registration-check-label" htmlFor="sameadd">
            Same as Permanent Address
          </label>
        </div>
        {/* Correspondance address  */}

        <div className="employee-registration-label-input employee-registration-label-only">
          <label className="employee-registration-form-label">Correspondance Address :</label>
        </div>

        <div className="employee-registration-label-input">
          <label htmlFor="cad1" className="employee-registration-form-label">
            Address Line 1 :
          </label>
          <input
            type="text"
            value={correspondenceAddress.address_line_1}
            className="form-control employee-registration-input-css-form"
            id="cad1"
            placeholder="Enter Address Line 1"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                address_line_1: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {" "}
          {errors.cad1 && <div id="cad1error">{errors.cad1}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="cad2" className="employee-registration-form-label">
            Address Line 2 :
          </label>
          <input
            type="text"
            value={correspondenceAddress.address_line_2}
            className="form-control employee-registration-input-css-form"
            id="cad2"
            placeholder="Enter Address Line 2"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                address_line_2: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.cad2 && <div id="cad2error">{errors.cad2}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="ccountry" className="employee-registration-form-label">
            Country :
          </label>
          <input
            type="text"
            value={correspondenceAddress.country}
            className="form-control employee-registration-input-css-form"
            id="ccountry"
            placeholder="Enter Country Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                country: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {" "}
          {errors.ccountry && <div id="ccountryerror">{errors.ccountry}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="cstate" className="employee-registration-form-label">
            State :
          </label>
          <input
            type="text"
            value={correspondenceAddress.state}
            className="form-control employee-registration-input-css-form"
            id="cstate"
            placeholder="Enter State Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                state: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.cstate && <div id="cstateerror">{errors.cstate}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="ccity" className="employee-registration-form-label">
            City :
          </label>
          <input
            type="text"
            value={correspondenceAddress.city}
            className="form-control employee-registration-input-css-form"
            id="ccity"
            placeholder="Enter City Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                city: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.ccity && <div id="ccityerror">{errors.ccity}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="cpostal" className="employee-registration-form-label">
            Postal Code :
          </label>
          <input
            type="text"
            value={correspondenceAddress.postal}
            className="form-control employee-registration-input-css-form"
            id="cpostal"
            placeholder="Enter Postal Code"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                postal: event.target.value,
              });
            }}
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.cpostal && <div id="cpostalerror">{errors.cpostal}</div>}
        </div>
        {/*option*/}
        <div className="employee-registration-label-input">
          <label htmlFor="fdropdown" className="employee-registration-form-label">
            Department Name :<span className="employee-registration-mandatory">*</span>
          </label>

          <select
            className="employee-registration-dropdown-toggle employee-registration-input-css-form employee-registration-form-placeholder"
            id="fdropdown"
            value={fdropdown}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Department
            </option>
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* </select> */}
        </div>
        <div className="employee-registration-form-errors">
          {errors.fdropdown && (
            <div id="dropdownError">{errors.fdropdown} </div>
          )}
        </div>
        {/* Date of birth */}

        <div>
          <label className="employee-registration-form-label">Date of Birth :</label>
          <input
            type="date"
            className="form-control employee-registration-input-css-form employee-registration-date-field"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
            min={`${minYear}-01-01`}
            max={`${maxYear}-12-31`}
            required
          />
        </div>
        <div className="employee-registration-form-errors">
          {errors.datepicker && <div id="dateError">{errors.datepicker}</div>}
        </div>
        <div className="employee-registration-label-input">
          <label htmlFor="reporting_manager" className="employee-registration-form-label">
           Reporting Manager :<span className="employee-registration-mandatory">*</span>
          </label>
        <select
        className="employee-registration-dropdown-toggle employee-registration-input-css-form employee-registration-form-placeholder"
        id="reportingManagerDropdown"
        value={reportingManager}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select Reporting Manager
        </option>
        {reportingManagers.map((manager) => (
          <option key={manager.value} value={manager.value}>
            {manager.label}
          </option>
        ))}
      </select> 
       </div>
        {/* Checkbox for reporting manager */}
        <div className="employee-registration-mb-3 employee-registration-form-check employee-registration-checkbox-label-input employee-registration-reportingmanager-div">
          <input
            type="checkbox"
            id="isReportingManagerCheckbox"
            checked={isReportingManager}
            onChange={(e) => setIsReportingManager(e.target.checked)}
          />
          <label
            className="employee-registration-form-check-label employee-registration-check-label employee-registration-reportingmanngerlabel"
            htmlFor="isReportingManagerCheckbox"
          >
            Set as Manager
          </label>
        </div>
      </form>
      <button className="employee-registration-submit-button" onClick={handleSubmit} type="submit">
        Continue
      </button>
      <div className="employee-registration-continue-text">
        {context && <p>Email has been sent succesfully to {comemail}</p>}
      </div>
    </div>
  );
}
