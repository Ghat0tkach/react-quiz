import React, { useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/features/userSlice";

function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
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
    evt.preventDefault();

    const { email, password } = state;

    // Dispatch the loginUser action
    try {
      await dispatch(loginUser({ email, password }));

      // Login successful, you can navigate or perform other actions
      console.log("Login successful!");
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
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
