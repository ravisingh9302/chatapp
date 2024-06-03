import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register";
export default function App() {
  
  if (process.env.REACT_APP_NODE_STATE === 'production') {
    console.log = function () { }
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/setAvatar" element={<SetAvatar />} /> */}
        <Route path="/" element={<Chat />} />
      </Routes>
      <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </BrowserRouter>
  );
}
