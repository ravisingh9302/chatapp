import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerApi } from "../utils/apiservice/ApiAuth";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.",);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toast.error( "Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      registerApi(email,username, password,navigate);
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center  bg-[#202020]" >
        <form action="" onSubmit={(event) => handleSubmit(event)} className="flex flex-col justify-center gap-7 p-8 rounded-lg bg-[#222E35] h-[70vh]">
        <div className="brand flex flex-row justify-center  items-center gap-3 text-3xl text-white">
            <img src={Logo}  width={80}  alt="logo" />
            <h1>Uchat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-transparent p-2 rounded-lg text-white  border-[#3DAE43] w-[100%] border"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="bg-transparent p-2 rounded-lg text-white   w-[100%] border border-[#3DAE43]"
        
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="bg-transparent p-2 rounded-lg text-white   w-[100%] border border-[#3DAE43]"
            />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="bg-transparent p-2 rounded-lg text-white  w-[100%] border border-[#3DAE43]"
          />
         <button type="submit" className="bg-[#3DAE43] text-white p-1 cursor-pointer font-semibold rounded-lg hover:bg-[]">Create User</button>
          <span className=" text-white">
            Already have an account ? <Link to="/login" className=" font-semibold text-lg text-[#3DAE43]">Login.</Link>
          </span>
        </form>
      
      </div>

    </>
  );
}

