import React, { useRef, useState } from "react";
import { doAjax } from "../utils/ajax";
import { DashBoard } from "./DashBoard";
import { DashBoardAdmin } from "./DashBoardAdmin";
import "./login-style.css";
export const Login = ({ register, hide }) => {
  const userid = useRef("");
  const password = useRef("");
  const [message, setMessage] = useState("");

  // login function
  const doLogin = async () => {
    let uid = userid.current.value;
    let pwd = password.current.value;
    const userObject = { userid: uid, password: pwd };

    const json = JSON.stringify(userObject);

    const response = await doAjax(
      process.env.REACT_APP_LOGIN_URL,
      "POST",
      json
    ).catch((err) => {
      window.alert("Something went wrong due to ", err);
    });

    response
      .json()
      .then((data) => {
        hide();
        setMessage(data.message);
      })
      .catch((err) => {
        window.alert("Something went wrong due to ", err);
      });
  };

  // forms to login
  const form = (
    <div className="container styleCon">
      <h2 style={{ color: "#d11e35" }}>Login</h2>
      <div className="form-group">
        <label className="loginHeading-style">Userid</label>
        <input
          ref={userid}
          className="form-control pad"
          type="text"
          placeholder="Type Userid Here"
        />
      </div>
      <div className="form-group pad">
        <label className="loginHeading-style">Password</label>
        <input
          ref={password}
          className="form-control"
          type="password"
          placeholder="Type Password Here"
        />
      </div>
      <div className="form-group pad">
        <button onClick={doLogin} className="btn btn-danger">
          Login
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-secondary"
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
  const form2 = (
    <div className="container styleCon">
      <h2 style={{ color: "#d11e35" }}>Login</h2>
      <h4 style={{ color: "red" }}>Invalid UserId or Password</h4>
      <div className="form-group">
        <label className="loginHeading-style">Userid</label>
        <input
          ref={userid}
          className="form-control pad"
          type="text"
          placeholder="Type Userid Here"
        />
      </div>
      <div className="form-group pad">
        <label className="loginHeading-style">Password</label>
        <input
          ref={password}
          className="form-control"
          type="password"
          placeholder="Type Password Here"
        />
      </div>
      <div className="form-group pad">
        <button onClick={doLogin} className="btn btn-danger">
          Login
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-secondary"
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );

  // CASES OF SHOWING
  if (message.includes("User")) {
    // if message has user means user login
    return <DashBoard msg={message} />;
  } else if (message.includes("Admin")) {
    // if message has Admin means user login
    return <DashBoardAdmin msg={message} />;
  } else if (message !== "") {
    //invalid details form
    return form2;
  } else {
    //normal form
    return form;
  }
};
