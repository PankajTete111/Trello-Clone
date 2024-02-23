import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/State";
// import Lodar from "../../components/Lodar/Lodar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserIdCookie } from "./Cookie";
import {logo} from "../../assets/image/logo-light.png"

const Login = () => {
  const { setUserId, setUserName } = useDataContext();
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  const handleSignupRedirect = () => {
    navigate('/Signup');
  };

  const handleForgetPassRedirect = () => {
    navigate('/forgetPassword');
  };

  
  const loginUser = async () => {
    try {
      const response = await fetch("http://localhost:3050/api/v1/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailId,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
  
      if (responseData.success) {
        // Successful login
        toast.success("Login successful");
        setUserId(responseData.user_id);
        setUserName(responseData.user_name);
        setUserIdCookie(responseData.user_id);
        navigate("/Home"); // Only navigate when login is successful
      } else {
    
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Invalid email or password");
      // toast.error("An error occurred. Please try again later.");
    } finally {
      // setIsLoading(false);
    }
  };

  // Regex signup email validation
  const validationUserEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
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
      loginUser();
      setEmail("");
      setPassword("");
      // navigate("/Home");
    }
  };

  return (
    <>
    <section className="signup-section">
      <div className="" id="login-container">
        <div className="row pt-5 m-0">
          <div className="col-md-12">
            <div
              className="container d-flex justify-content-center"
              id="main1"
            >
              <div className="card mt-4 " id="Card">
                <div className="card-body text-center">
                  <h3>Login</h3>
                  <hr />
                  <form className="text-center" onSubmit={handlesubmit}>
                    <div className="d-flex justify-content-center mb-4 mt-5">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={emailId}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-center mb-4 mt-2">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-offset-10">
                      <button className="btn btn-primary col-md-12" type="submit">
                          Login
                        </button>
                        <span className="text-primary" onClick={handleForgetPassRedirect} style={{ cursor: 'pointer' }}>
                            Forget Password
                          </span>
                      </div>
                      <div className="col-md-offset-10 mt-3">
                        <p className="">
                          Don't have an Account?{' '}
                          <span className="text-primary" onClick={handleSignupRedirect} style={{ cursor: 'pointer' }}>
                            Sign Up
                          </span>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="toast-message" />
      {/* {isLoading && <Lodar visible={isLoading} />} */}
      </section>
    </>
  );
};

export default Login;

