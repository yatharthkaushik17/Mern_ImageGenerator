import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast'; 
import {EyeOff,Eye} from 'lucide-react'



const SignUp = () => {
  const [showPassword,setShowPassword] =  useState(false);
  const [showsPassword,setShowsPassword] =  useState(false);
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [OTP, setOTP] = useState(false);
  const [otpValue, setotpValue] = useState();
  const [disbaleds, setDisbaleds] = useState(true);
  const [editable, setEditable] =useState(true);


  const router = useNavigate();

  const verifyOTP = (e) => {
    e.preventDefault();
    
    const parsedresp = (data) => {
      console.log("User data is : ", data);
      if (data.success) {
        setDisbaleds(false);
        setEditable(false)
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    };

    const response = (resp) => {
      resp.json().then(parsedresp);
    };

    fetch("http://localhost:3000/api/v1/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otpValue,
        email: email,
      }),
    })
      .then(response)
      .catch((e) => {
        console.log(e.message);
      });
  };

  const sendOtp = (e) => {
    e.preventDefault();


    const parsedresp = (data) => {
      console.log("User data is : ", data);
      if (data.success) {
        setOTP(true);
          toast.success(data.message); 
      }else{
        toast.error(data.message);
      }
    };

    const response = (resp) => {
      resp.json().then(parsedresp);
    };

    fetch("http://localhost:3000/api/v1/sendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response)
      .catch((e) => {
        console.log(e.message);
      });
  };

  const RegisterHandeler = (e) => {
    e.preventDefault();


    const parsedresp = (data) => {
      console.log("User data is : ", data);

      if(data.success === false){
        toast.error(data.message);
      }else{
        toast.success(data.message);
        setInterval(() => {
          router('/Login')
        }, 2000);
      }
      
    };
    const response = (resp) => {
      resp.json().then(parsedresp);
    };
    fetch("http://localhost:3000/api/v1/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: Fname + " " + Lname,
        number: phonenumber,
      }),
    })
      .then(response)
      .catch(console.log("Error occurred while posting the data"));
  };
  return (
    <section className="bg-white ">

      
        <Toaster/>
      
      
      <div className="flex flex-col justify-center items-center ">
       

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 mt-9">
          <div className="max-w-xl lg:max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  className="mt-1 w-full border h-10 p-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                  className="mt-1 w-full border h-10 p-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <div>
                  <div className="flex">
                    <input
                      type="email"
                      disabled = {!editable}
                      onChange={(event) => {
                        setemail(event.target.value);
                      }}
                      className={`${ !editable ? "bg-gray-400 text-white cursor-not-allowed rounded-md" : "bg-white"} mt-1 w-full border h-10 p-4 rounded-l-md border-gray-200  text-sm text-gray-700 shadow-sm`}
                    />
                    {OTP ? null:(
                    <button
                      className="border border-black w-32 h-10  mt-1 rounded-r-md bg-gray-900 text-white"
                      onClick={sendOtp}
                    >
                      Verify Email
                    </button>
                  )}
                  </div>

                  {OTP && (
                    <div className="col-span-6">
                      <label
                        className="block text-sm mt-2 font-medium text-gray-700"
                      >
                        OTP
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          autoComplete="new-password"
                          onChange={(event) => {
                            setotpValue(event.target.value);
                          }}
                          className="mt-1 w-full h-10 border p-4 rounded-l-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        />

                        {OTP ? (
                          <button
                            className={`${disbaleds === false? "bg-green-600":"bg-gray-900"} border border-black w-32 mt-1 h-10 rounded-r-md  text-white`}
                            onClick={verifyOTP}
                          >
                            Verify OTP
                          </button>
                        ) : null}

                      </div>
                    </div>
                  )}

                </div>
              </div>

              <div className="col-span-6 relative">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type= {showPassword ? "password":"text"}
                  autoComplete="new-password"
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                  className="mt-1 w-full border h-10 p-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {showPassword===false?<EyeOff onClick={()=>{setShowPassword(true)}} size={22} color='black' className='absolute top-8 right-5'/> : <Eye onClick={()=>{setShowPassword(false)}} size={22} color='black' className='absolute top-8 right-5' /> }
              </div>
              <div className="col-span-6 relative">
                <label
                  htmlFor="Confirm Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Confirm Password{" "}
                </label>

                <input
                  type={showsPassword ? "password":"text"}
                  onChange={(event) => {
                    setconfirmPassword(event.target.value);
                  }}
                  className="mt-1 w-full border h-10 p-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {showsPassword===false?<EyeOff onClick={()=>{setShowsPassword(true)}} size={22} color='black' className='absolute top-8 right-5'/> : <Eye onClick={()=>{setShowsPassword(false)}} size={22} color='black' className='absolute top-8 right-5' /> }
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="PhoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Phone Number{" "}
                </label>

                <input
                  type="text"
                  onChange={(event) => {
                    setphonenumber(event.target.value);
                  }}
                  className="mt-1 w-full border h-10 p-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  disabled={disbaleds}
                  onClick={RegisterHandeler}
                  className={`${
                    disbaleds === true ? "cursor-not-allowed" : null
                  } inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500`}
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="/Login" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignUp;
