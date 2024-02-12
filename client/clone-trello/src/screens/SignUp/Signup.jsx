import React, { useState } from "react";
import "../SignUp/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const[full_name,setFullName]=useState("");
   const[emailId,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[contact_no,setContact]=useState("");
   const navigate=useNavigate("");
  
   const setdata = async () => {
    try {
      const response = await fetch('http://localhost:3050/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: full_name,
          email_id: emailId,
          password: password,
          contact_no: contact_no,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
      navigate("/Login");
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  

  return (
    <section className="signup-section">
      <div className="text-center">
      </div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6" id="card-main">
            <div className="card mt-0">
              <div className="card-header text-center register" id="register">
                <h3 className="h3_registration">Registration Form</h3>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Full Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={full_name}
                    onChange={(e)=>setFullName(e.target.value)}
                  />
                  
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email <span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={emailId}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password <span className="star">*</span>
                    </label>
                    <div className="password-input-container">
                      <input
                        // type={showPassword ? "text" : "password"}
                        className="input form-control" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      <div
                        className="password-icon"
                      >
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Phone Number <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                      value={contact_no}
                      onChange={(e)=>setContact(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary col-12"
                    onClick={setdata}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
