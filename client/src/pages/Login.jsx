import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginApi } from "../utils/apiservice/ApiAuth";
import {  useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [values, setValues] = useState({ username: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    else {
      loginApi(username, password, navigate,dispatch);
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center  bg-[#202020]">

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
            min="3"
            className="bg-transparent p-2 rounded-lg text-white  w-[100%] border border-[#3DAE43]"
            />
          <input
            className="bg-transparent p-2 rounded-lg text-white   w-[100%] border border-[#3DAE43]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />


          <button type="submit" className="bg-[#3DAE43] text-white p-1 cursor-pointer font-semibold rounded-lg hover:bg-[]">Log In</button>
          <span className=" text-white">
            Don't have an account ? <Link to="/register" className=" font-semibold text-lg text-[#3DAE43]">Create One.</Link>
          </span>
        </form>
      </div>

    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
