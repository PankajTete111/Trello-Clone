import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/State";
import Lodar from "../../components/Lodar/Lodar";
const Login = () => {
  
 const {setUserId,setUserName} = useDataContext();
 const[emailId,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const navigate=useNavigate("");
 const [isLoading , setIsLoading] = useState(false);

const getData = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:3050/api/v1/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailId,
        password: password
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
   
    console.log(responseData.user_id,"id");
    setUserId(responseData.user_id);
    setUserName(responseData.user_name)
console.log(responseData.user_name,"name")
    if (responseData.success) {
      setTimeout(() => {
       
        navigate("/Home");
        setIsLoading(true);
      }, 5000);
    
    } else {
      // Handle unsuccessful login
      // alert('Login failed. Please check your credentials.');
   
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    // alert('An error occurred. Please try again later.');
  }
  finally{
    setIsLoading(false);
  }
};

  return (
    <>
      <div className="" id="login-container">
        <div className="row pt-5 m-0">
          <div className="col-md-12">
            <div className="container d-flex justify-content-center" id="main1">
              <div className="card mt-4 " id="Card">
                <div className="card-body text-center">
                  <h3>Login</h3>
                  <hr />
                  <form className="text-center" >
                    <div className="d-flex justify-content-center mb-4 mt-5">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={emailId}
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      {/* <div className="input-group-text " id="Email">
                        <i className="fas fa-envelope"></i>
                      </div> */}
                    </div>
                    <div className="d-flex justify-content-center mb-4 mt-2">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      {/* <div className="input-group-text" id="Password">
                        <i className="fas fa-lock"></i>
                      </div> */}
                    </div>
                    <div className="text-center">
                      
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-offset-10">
                        <button
                          className="btn btn-primary col-md-12"
                          type="submit"
                          onClick={getData}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="col-md-offset-10 mt-3">
                        <p>
                          Don't have an Account?
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
      {isLoading && <Lodar visible={isLoading}/>}
    </>
  );
};
export default Login;
