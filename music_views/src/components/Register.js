import React, { useRef, useState } from "react";
import { doAjax } from "../utils/ajax";
import { DashBoard } from "./DashBoard";
import "./login-style.css";
export const Register = () => {
  const styleCon = {
    width: "50vw",
    padding: "50px",
    margin: "10px auto",
    // backdropFilter: `blur(20px)`,
  };
  const pad = {
    // marginTop: "10px",
    // marginBottom: "18px",
  };
  const userid = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [message, setMessage] = useState("");
  const doRegister = () => {
    console.log(userid, password);
    let uid = userid.current.value;
    let pwd = password.current.value;
    let uname = name.current.value;
    const userObject = { userid: uid, password: pwd, name: uname };
    // console.log('URL is ', process.env.REACT_APP_LOGIN_URL);
    const json = JSON.stringify(userObject);
    console.log("JSON is ", json, " Object is ", userObject);
    const promise = doAjax(process.env.REACT_APP_REGISTER_URL, "POST", json);
    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            console.log("Data Rec From Server ", data);
            setMessage(data.message);
          })
          .catch((err) => {
            console.log("Invalid JSON ", err);
          });
      })
      .catch((err) => {
        console.log("Error During Server Call ", err);
      });
  };

  return (
    <div className="container styleCon">
      <h2 style={{ color: "#d11e35" }}>Register</h2>
      {message === "Record added SuccessFully" ? (
        <h4 style={{ color: "lightGreen" }}>Successfully Registered</h4>
      ) : message === "" ? (
        <></>
      ) : (
        <h4 style={{ color: "red" }}>Something Went Wrong</h4>
      )}
      <div className="form-group">
        <label className="form-group loginHeading-style">Userid</label>
        <input
          ref={userid}
          className="form-control pad"
          type="text"
          placeholder="Type Userid Here"
        />
      </div>
      <div className="form-group">
        <label className="form-group loginHeading-style">Password</label>
        <input
          ref={password}
          className="form-control pad"
          type="password"
          placeholder="Type Password Here"
        />
      </div>
      <div className="form-group">
        <label className="form-group loginHeading-style">Name</label>
        <input
          ref={name}
          className="form-control pad"
          type="text"
          placeholder="Type Name Here"
        />
      </div>
      <div className="form-group" style={pad}>
        <button onClick={doRegister} className="btn btn-danger">
          Register
        </button>
      </div>
    </div>
  );
};
