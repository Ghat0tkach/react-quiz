import React, { useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/features/userSlice";
import Loader from "../../components/Loader";

function SignUpForm({toggleSignIn}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoader]=useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    domain: "",
    email: "",
    branch: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
  });

  const { status, error: loginError } = useSelector((state) => state.user);
   const handleInputChange = (event) => {
    const { name, value } = event.target;

    let updatedErrors = { ...errors };
    let updatedFormData = { ...formData };

    if (name === "fullName") {
      updatedFormData[name] = value;
      updatedErrors.fullName = value.trim() === "" ? "Full Name is required" : "";
    } else if (name === "email") {
      updatedFormData[name] = value;
      updatedErrors.email =
        value !== "" && (!validateEmail(value) || !value.endsWith("@gmail.com"))
          ? "Invalid email format or not a Gmail address"
          : "";
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
    setErrors(updatedErrors);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const branchOptions = ["CS", "AIADS", "CE", "IT", "ME", "IP", "MT", "EE", "EC"];
  const DomainOptions = [
    { display: "Technical", value: "technical" },
    { display: "Management", value: "management" },
    { display: "Sports", value: "sports" },
    { display: "General Awareness", value: "aptitude" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    setFormSubmitted(true);
    const requestData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      branch: formData.branch,
      domain: formData.domain,
    };

    try {
      setLoader(true);
      await dispatch(registerUser(requestData));
      setLoader(false);
      navigate("/quiz");
    } catch (error) {
         console.log(error);
    }
  };

  return (
    
    <div className="form-container sign-up-container">
     
      <form onSubmit={handleSubmit}>
      <span className="display"> Register here</span>
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
              {DomainOptions.sort((a, b) => a.display.localeCompare(b.display)).map(
    (option) => (
      <option key={option.value} value={option.value}>
        {option.display}
      </option>
    )
  )}
        </select>
  
  
  
     {loading?<Loader statement="Registering You In"/>:
     <button type="submit">Sign Up</button>}
       
      </form>
     
      <div className="toggle-button">
          <p>Already a user?</p>
          <button className="toggle-btn" type="button" onClick={toggleSignIn}  disabled={formSubmitted} >
            Login Here
          </button>
        </div>
    
    </div>
  );
}

export default SignUpForm;
