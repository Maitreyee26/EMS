import React, { useState } from "react";
import "./AdminRegistrationForm.css";


export default function EmployeeRegistrationForm() {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [altcontact, setAltcontact] = useState("");
  const [comemail, setcomemail] = useState("");
  const [context, setContext] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  
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
  const options = [
    { value: "IT", label: "IT" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
  ];
 
  const currentYear = new Date().getFullYear()       ;

  // Set the range for the calendar, e.g., +/- 10 years from the current year
  const minYear = currentYear-50;
  const maxYear = currentYear-20;
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
const validateDate=(value) =>{
  if(!value)
  {
    return 'Please select a date.';
  }
  return null;
};
  const handleInputChange = (e) => {
    const { id, value } = e.target;

   

    if (id === "fname") {
      setFname(value);
      const fnameError = validateFname(value);
      if(fnameError){
        setErrors((prevState) => ({ ...prevState, fname: fnameError }));
      }
      else{
        setErrors((prevState) => ({ ...prevState, fname: null }))
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
      if(contactError ){
        setErrors((prevState) => ({ ...prevState, contact: contactError }));
      }
      else{
        setErrors((prevState) => ({ ...prevState, contact: null }))
      }
      
    }

    if (id === "altcontact") {
      setAltcontact(value);
      const altcontactError = validateAltcontact(value);
      if( altcontactError ){
        setErrors((prevState) => ({ ...prevState, altcontact: altcontactError }));
      }
      else{
        setErrors((prevState) => ({ ...prevState, altcontact: null }))
      }
     
    }

    if (id === "comemail") {
      setcomemail(value);
      const comemailError = validateComemail(value);
      if( comemailError  ){
        setErrors((prevState) => ({ ...prevState, comemail : comemailError  }));
      }
      else{
        setErrors((prevState) => ({ ...prevState, comemail: null }))
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
    if(id==='datepicker')
    {
      setSelectedDate(value);
        const dateError = validateDate(value);
      if(dateError){
        setErrors((prevState) => ({ ...prevState, datepicker: dateError }));
      }
      else{
        setErrors((prevState) => ({ ...prevState, datepicker: null }))
      }
      
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

  const validateComemail = (value) => {
    if (!value) {
      return "Work email is required";
    }

    if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return "Invalid email format";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedErrors = {
      fname: validateFname(fname),
      contact: validateContact(contact),
      altcontact: validateAltcontact(altcontact),
      comemail: validateComemail(comemail),
      ...validatePermanentAddress(permanentAddress),
      ...validateCorrespondenceAddress(correspondenceAddress),
      datepicker:validateDate(selectedDate),
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(updatedErrors).filter(([_, value]) => value !== null)
    );

    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length === 0) {
      // Submit the form data
      setContext(true);

      // Reset context after 3 seconds
      setTimeout(() => {
        setContext(false);
      }, 3000);
    }
  };
  return (
    <div className="container main-div-form">
      <div className="reg-header-admin">
        <h2>REGISTRATION PAGE FOR ADMIN</h2>
      </div>
      <form>
        {/* Name of employees */}
        <div className="label-input">
          <label htmlFor="fname" className="form-label">
            First Name :
          </label>
          <input
            type="text"
            value={fname}
            className="form-control input-css-form"
            id="fname"
            placeholder="Enter Your First Name"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.fname && <div className="form-errors" id="fnameError">{errors.fname}</div>}
        </div>

        <div className="label-input">
          <label htmlFor="mname" className="form-label">
            Middle Name :
          </label>
          <input
            type="text"
            value={mname}
            className="form-control input-css-form"
            id="mname"
            required
            placeholder="Enter Your Middle Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="label-input">
          <label htmlFor="lname" className="form-label">
            Last Name :
          </label>
          <input
            type="text"
            value={lname}
            className="form-control input-css-form"
            id="lname"
            placeholder="Enter Your Last Name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {/* Contact Details of employees */}
        <div className="label-input">
          <label htmlFor="contact" className="form-label">
            Phone Number :
          </label>
          <input
            type="text"
            value={contact}
            className="form-control input-css-form"
            id="contact"
            placeholder="Enter Phone number"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.contact && <div className="form-errors" id="contacterror">{errors.contact}</div>}
        </div>

        <div className="label-input">
          <label htmlFor="altcontact" className="form-label">
            Emergency Phone Number :
          </label>
          <input
            type="text"
            value={altcontact}
            className="form-control input-css-form"
            id="altcontact"
            placeholder="Enter Emergency Phone no"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.altcontact && (
            <div className="form-errors" id="altcontacterror">{errors.altcontact}</div>
          )}
        </div>

        {/* Email id */}
        <div className="label-input">
          <label htmlFor="" className="form-label">
            Work Email id :
          </label>
          <input
            type="email"
            className="form-control input-css-form"
            value={comemail}
            id="comemail"
            placeholder="Enter Work Email id"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.comemail && <div className="form-errors" id="comemailerror">{errors.comemail}</div>}
        </div>
        {/*Permanent Addresses of employees */}
        <p>
        <div className="label-input">
          <label className="form-label">
            Permanent Address :
          </label>
        </div>
        </p>
       
        <div className="label-input">
          <label htmlFor="pad1" className="form-label">
            Address Line 1 :
          </label>
          <input
            type="text"
            value={permanentAddress.address_line_1}
            className="form-control input-css-form"
            id="pad1"
           
            placeholder="Enter Address Line 1"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                address_line_1: event.target.value,
              });
            }}
          />
          {errors.pad1 && <div className="form-errors" id="pad1error">{errors.pad1}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="pad2" className="form-label">
            Address Line 2 :
          </label>
          <input
            type="text"
            value={permanentAddress.address_line_2}
            className="form-control input-css-form"
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
        <div className="label-input">
          <label htmlFor="pcountry" className="form-label">
            Country :
          </label>
          <input
            type="text"
            value={permanentAddress.country}
            className="form-control input-css-form"
            id="pcountry"
           
            placeholder="Enter Country Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                country: event.target.value,
              });
            }}
          />
          {errors.pcountry && <div className="form-errors" id="pcountryerror">{errors.pcountry}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="pstate" className="form-label">
            State :
          </label>
          <input
            type="text"
            value={permanentAddress.state}
            className="form-control input-css-form"
            id="pstate"
           
            placeholder="Enter State Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                state: event.target.value,
              });
            }}
          />
          {errors.pstate && <div className="form-errors" id="pstateerror">{errors.pstate}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="pcity" className="form-label">
            City :
          </label>
          <input
            type="text"
            value={permanentAddress.city}
            className="form-control input-css-form"
            id="pcity"
           
            placeholder="Enter City Name"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                city: event.target.value,
              });
            }}
          />
          {errors.pcity && <div className="form-errors" id="pcityerror">{errors.pcity}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="ppostal" className="form-label">
            Postal Code :
          </label>
          <input
            type="text"
            value={permanentAddress.postal}
            className="form-control input-css-form"
            id="ppostal"
           
            placeholder="Enter Postal Code"
            onChange={(event) => {
              setPermanentAddress({
                ...permanentAddress,
                postal: event.target.value,
              });
            }}
          />
          {errors.ppostal && <div  className="form-errors" id="ppostalerror">{errors.ppostal}</div>}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="sameAddressCheckbox"
            onChange={handleSameAddressChange}
          />
          <label
            className="form-check-label checkbox-label-input check-label"
            htmlFor="sameadd"
          >
            Same as Permanent Address
          </label>
        </div>
        {/* Correspondance address  */}
        <p>
        <div className="label-input">
          <label className="form-label">
            Correspondance Address :
          </label>
        </div>
        </p>
       
        <div className="label-input">
          <label htmlFor="cad1" className="form-label">
            Address Line 1 :
          </label>
          <input
            type="text"
            value={correspondenceAddress.address_line_1}
            className="form-control input-css-form"
            id="cad1"
           
            placeholder="Enter Address Line 1"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                address_line_1: event.target.value,
              });
            }}
          />
          {errors.cad1 && <div className="form-errors"id="cad1error">{errors.cad1}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="cad2" className="form-label">
            Address Line 2 :
          </label>
          <input
            type="text"
            value={correspondenceAddress.address_line_2}
            className="form-control input-css-form"
            id="cad2"
           
            placeholder="Enter Address Line 2"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                address_line_2: event.target.value,
              });
            }}
          />
          {errors.cad2 && <div className="form-errors"id="cad2error">{errors.cad2}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="ccountry" className="form-label">
            Country :
          </label>
          <input
            type="text"
            value={correspondenceAddress.country}
            className="form-control input-css-form"
            id="ccountry"
           
            placeholder="Enter Country Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                country: event.target.value,
              });
            }}
          />
          {errors.ccountry && <div className="form-errors" id="ccountryerror">{errors.ccountry}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="cstate" className="form-label">
            State :
          </label>
          <input
            type="text"
            value={correspondenceAddress.state}
            className="form-control input-css-form"
            id="cstate"
           
            placeholder="Enter State Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                state: event.target.value,
              });
            }}
          />
          {errors.cstate && <div className="form-errors" id="cstateerror">{errors.cstate}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="ccity" className="form-label">
            City :
          </label>
          <input
            type="text"
            value={correspondenceAddress.city}
            className="form-control input-css-form"
            id="ccity"
           
            placeholder="Enter City Name"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                city: event.target.value,
              });
            }}
          />
          {errors.ccity && <div className="form-errors"id="ccityerror">{errors.ccity}</div>}
        </div>
        <div className="label-input">
          <label htmlFor="cpostal" className="form-label">
            Postal Code :
          </label>
          <input
            type="text"
            value={correspondenceAddress.postal}
            className="form-control input-css-form"
            id="cpostal"
           
            placeholder="Enter Postal Code"
            onChange={(event) => {
              setCorrespondenceAddress({
                ...correspondenceAddress,
                postal: event.target.value,
              });
            }}
          />
          {errors.cpostal && <div className="form-errors" id="cpostalerror">{errors.cpostal}</div>}
        </div>

        {/* Date of birth */}

        <div>
          <label className="form-label">
            Date of Birth :
          </label>
           <input
        type="date"
        className="form-control input-css-form date-field"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
        min={`${minYear}-01-01`}
        max={`${maxYear}-12-31`}
        required
      />
        {errors.datepicker && <div className="form-errors" id="dateError">{errors.datepicker}</div>}
    
        </div>
        
      </form>
      <button className="submit-button" onClick={handleSubmit} type="submit">
          Continue
        </button>
        <div className="continue-text">
          {context && <p>Email has been sent succesfully to {comemail}</p>}
        </div>
    </div>
  );
}
// {new Date(format(date, 'dd-MM-yyyy'))} maxDate={new Date()} minDate={}
