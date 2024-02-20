import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  // Login Api call here ....
  const getData = async (e) => {
    e.preventDefault();
    // alert("1");
    const response = await fetch("http://localhost:3000/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailId,
        password: password,
      }),
    });
    console.log("res", response);
    navigate("/Home");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Response from server:", responseData);
    // alert("123333");
  };

  //... Regex signup email validation
  const validationUserEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };

  const handlesubmit = () => {
    if (emailId.trim() === "") {
      toast.warn("please enter your email !");
      // alert("please enter your email !");
    } else if (!validationUserEmail(emailId)) {
      toast.warn("Please enter a valid email !");
      // alert("Please enter a valid email !");
    } else if (password.trim() === "") {
      toast.warn("Please enter a password !");
      // alert("Please enter a password !");
    } else {
      // getData();
      setEmail("");
      setPassword("");
      navigate("/Home");
    }
  };
  return (
    <section className="signup-section">
      <div className="text-center"></div>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6" id="card-main">
            <div className="card mt-0">
              <div className="card-header text-center register" id="register">
                <h3 className="h3_registration">Login Form</h3>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email <span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={emailId}
                      onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="password-icon"></div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary col-12"
                    // onClick={setdata}
                    onClick={handlesubmit}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="tost-message" />
    </section>
  );
};
export default Login;
