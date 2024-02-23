import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
	const navigate =useNavigate();

	const handleRedirectLogin = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.warn("Please enter your email");
    } else if (!isValidEmail(email)) {
      toast.warn("Please enter a valid email address");
    } else if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast.warn("Please enter both new password and confirm password");
    } else if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match");
    } else {
      try {
        const response = await fetch("http://localhost:3050/api/v1/updatepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: newPassword,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        
        if (responseData.success) {
          toast.success("Password updated successfully");
          // You can navigate or perform any other action here
        } else {
          toast.error("Failed to update password. Please check your input.");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
		<section className="signup-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Forget Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={handleRedirectLogin} className="btn btn-primary btn-block">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="toast-message" />
    </div>
		</section>
  );
};

export default ForgetPassword;
