import { Login } from "../components/Login";
import React, { useState } from "react";
import { Register } from "../components/Register";
import "./home.css";
import logo from "../assets/logo.png";
// import { ReactComponent as Logo } from "../assets/logo.png";

export const Home = () => {
  const [isRegister, setRegister] = useState(false);

  const shouldShowRegister = () => {
    setRegister(true);
  };
  const hideRegister = () => {
    setRegister(false);
  };

  return (
    <div id="homeMain">
      <div id="heading">
        <img src={logo} alt="logo" />
        {/* <Logo></Logo> */}
        <h1>Melodies</h1>
      </div>

      <div id="homeContainer">
        <Login register={shouldShowRegister} hide={hideRegister} />
        {isRegister ? <Register id="registerForm" /> : <></>}
      </div>
    </div>
  );
};
