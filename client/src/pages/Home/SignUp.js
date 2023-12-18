import React, { useState } from "react";
import "./form.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/features/userSlice";
function SignUpForm() {
  const dispatch=useDispatch(); 
  const navigate=useNavigate();
  const {status,error}=useSelector((state)=>state.user)
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    domain: '',
    email: '',
    branch: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    homeTown: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    let updatedErrors = { ...errors };
    let updatedFormData = { ...formData };
  // Input Validation
    if (name === 'fullName') {
      const alphabeticalValue = value.replace(/[^A-Za-z ]/g, '');
      updatedFormData[name] = alphabeticalValue;
      updatedErrors.fullName = alphabeticalValue.trim() === '' ? 'Please write your real name' : '';
    }
    else if (name === 'email') {
      updatedFormData[name] = value;
      updatedErrors.email = value !== '' && !validateEmail(value) ? 'Invalid email format' : '';
    } else {
      updatedFormData[name] = value;
      updatedErrors[name] = value.trim() === '' ? `${name} is required` : '';
    }
  
    setFormData(updatedFormData);
    setErrors(updatedErrors);
  };
  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  



  const branchOptions = [
    'CS',
    'AIADS',
    'CE',
    'IT',
    'ME',
    'IP',
    'MT',
    'EE',
    'EC',
  ];
  const DomainOptions = [
    'Technical',
    'Management',
    'Sports',
    'General Awareness',
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if there are any errors before submitting
    if (Object.values(errors).some((error) => error !== '')) {
      // Handle errors, maybe display a message or prevent the form submission
      return;
    }

    // Prepare data for the POST request
    const requestData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      branch: formData.branch,
      domain: formData.domain,
    };

    // Make the POST request
    try {
      await dispatch(registerUser(requestData));

      // Registration successful, you can navigate or perform other actions
      console.log("Registration successful!");
      navigate("/quiz"); // Example: Navigate to a success page
    } catch (error) {
      // Registration failed, handle the error
      console.error("Error during registration:", error.message);
    }
  };
  

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
      <input
          required
          className={`w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:animate-pulse transition-all`}
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
        />
     
         {errors.fullName && <p className="text-red-500 text-center bg-yellow-50 p-2 border rounded-md animate-bounce ">{errors.fullName}</p>}

      <input
          required
          className={`w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:animate-pulse transition-all`}
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleInputChange}
        />
     
          <input
          required
          className={`w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:animate-pulse transition-all`}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />

          {errors.email && <p className="text-red-500 text-center bg-yellow-50 p-2 border rounded-md animate-bounce">{errors.email}</p>}


        <select
          required
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleInputChange}
        >  
              <option value="" disabled >Select Your Branch</option>
                  {branchOptions.sort().map((branch) => (
                    
                    <option key={branch} value={branch} >
                      {branch}
                    </option>
    
                  ))}
        </select>
        <select
          required
          type="text"
          name="domain"
          placeholder="Domain"
          value={formData.domain}
          onChange={handleInputChange}
        >  
              <option value="" disabled >Select Your Domain</option>
                  {DomainOptions.sort().map((branch) => (
                    
                    <option key={branch} value={branch} >
                      {branch}
                    </option>
    
                  ))}
        </select>
  
  
  
  
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
