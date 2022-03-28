import { Login } from "../components/Login";
import React, { useState } from "react";
import { Register } from "../components/Register";
import "./home.css";

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
        <img
          src="https://image.flaticon.com/icons/png/512/3208/3208679.png"
          alt="logo"
        />
        <h1>Melodies</h1>
      </div>

      <div id="homeContainer">
        <Login register={shouldShowRegister} hide={hideRegister} />
        {isRegister ? <Register id="registerForm" /> : <></>}
      </div>
    </div>
  );
};
