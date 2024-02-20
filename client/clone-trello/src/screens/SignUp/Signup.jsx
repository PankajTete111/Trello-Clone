import React, { useState } from "react";
import "../SignUp/Signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lodar from "../../components/Lodar/Lodar";


const Signup = () => {
   const[full_name,setFullName]=useState("");
   const[emailId,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[contact_no,setContact]=useState("");
   const [isLoading, setIsLoading] = useState(false);

   const navigate=useNavigate("");
   
   const setdata = async () => {
    try {
      const response = await fetch('http://localhost:3050/api/v1/createUser', {
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
      setTimeout(() => {
        navigate("/Login");
        setIsLoading(true);
      }, 2000);
      // navigate("/Login");
    } catch (error) {
      console.error('Error during fetch:', error);
    }

  };
  
    //... Regex signup email validation
    const validationUserEmail = (email) => {
      const emailPattern =
        /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return emailPattern.test(email);
    };

  const handlesubmit = () =>{
    const mobileReg = /^[0-9]+$/;
    if(full_name.trim() === ''){
      toast.warn('please enter your name !');
    }else if(emailId.trim() === ''){
      toast.warn('please enter your email !');
    }else if(!validationUserEmail(emailId)){
      toast.warn("Please enter a valid email !");
    }else if(password.trim() === ''){
      toast.warn("Please enter a password !");
    }else if(contact_no.trim() === ''){
      toast.warn("Please enter phone number !");
    }else if(!mobileReg.test(contact_no)){
      toast.warn("Please enter valid phone number !");
    }else{
      setdata();
      setFullName('');
      setEmail('');
      setPassword('');
      setContact('')
    }
  }

  return (
    <section className="signup-section">
      <div className="text-center">
      </div>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6" id="card-main">
            <div className="signupucard card mt-0">
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
                      maxLength={10}
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                      value={contact_no}
                      onChange={(e)=>setContact(e.target.value)}
                    />
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
      {isLoading && <Lodar visible={isLoading} />}
    </section>
  );
};

export default Signup;

