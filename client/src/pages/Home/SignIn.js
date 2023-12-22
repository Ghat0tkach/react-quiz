import React, { useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/features/userSlice";
import Loader from "../../components/Loader";

function SignInForm({toggleSignUp}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoader]=useState(false);
  const { status, error } = useSelector((state) => state.user);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    setFormSubmitted(true);
    evt.preventDefault();
    setLoader(true);

    const { email, password } = state;

    // Dispatch the loginUser action
    try {
      await dispatch(loginUser({ email, password }));

      // Login successful, you can navigate or perform other actions
      // console.log("Login successful!");
      setLoader(false);
      navigate("/start"); // Example: Navigate to the dashboard
    } catch (error) {
      // Login failed, handle the error
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="sign-in">Sign in</h1>

        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        
        {loading?<Loader statement="Signing You In"/>:
     <button type="submit">Sign In</button>}
     <p className="error">{error}</p>
      </form>
     
      <div className="toggle-button">
          <p>Are you not a user?</p>
          <button className="toggle-btn" type="button" onClick={toggleSignUp} disabled={formSubmitted}>
            Register here
          </button>
        </div>
    </div>
  );
}

export default SignInForm;
