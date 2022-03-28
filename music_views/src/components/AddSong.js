import React, { useRef, useState } from "react";
import { doAjax } from "../utils/ajax";
export const AddSong = ({ user }) => {
  const eachFieldStyle = {
    padding: "10px",
  };
  const songName = useRef("");
  const songUrl = useRef("");
  const songThumbNailUrl = useRef("");
  const artist = useRef("");

  const addSong = async (obj) => {
    let promise = doAjax(
      process.env.REACT_APP_SONGADD_URL,
      "POST",
      JSON.stringify(obj)
    );
    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            alert("Successfully Added...");
          })
          .catch((err) => {
            console.log("error in json is ", err);
            alert(`Payload is too large or Error in JSON`);
          });
      })
      .catch((err) => {
        console.log("error in response is ", err);
        alert(err);
      });
  };

  var [shouldShow, changeShow] = useState(true);

  const input = () => {
    return (
      <input
        style={{ color: "#f9374c" }}
        type="file"
        id="file-selector"
        accept=".json, .txt"
        multiple
        onChange={(event) => {
          let fileList = event.target.files;
          Array.prototype.forEach.call(fileList, (file) => {
            const reader = new FileReader();
            if (
              file.name.match(/(\w+)$/)[0] === "txt" ||
              file.name.match(/(\w+)$/)[0] === "json"
            ) {
              reader.readAsText(file);
              reader.addEventListener("load", (event) => {
                console.log(JSON.parse(event.target.result));
                addSong({
                  user: `${user}`,
                  song: JSON.parse(event.target.result),
                });
              });
            } else {
              console.log(file.name.match(/(\w+)$/));
              window.alert("only .txt and json files allowed");
            }
          });
          changeShow(false);
          setTimeout(() => {
            changeShow(true);
          }, 300);
        }}
      ></input>
    );
  };

  return (
    <>
      <h3 style={{ marginTop: "30px", color: "#f9374c" }}>Add a Single Song</h3>

      <div className="form-group row" style={eachFieldStyle}>
        <label htmlFor="name" className="col-sm-2 col-form-label bg-light">
          <b>Song Name</b>
        </label>
        <div className="col-sm-10">
          <input
            ref={songName}
            type="text"
            id="name"
            name="name"
            placeholder="Enter Song Name here"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row" style={eachFieldStyle}>
        <label htmlFor="url" className="col-sm-2 col-form-label bg-light">
          <b>Song url</b>
        </label>
        <div className="col-sm-10">
          <input
            type="url"
            id="url"
            name="url"
            ref={songUrl}
            className="form-control"
            placeholder="Enter Song Bucket Url here..."
          />
        </div>
      </div>
      <div className="form-group row" style={eachFieldStyle}>
        <label htmlFor="imageurl" className="col-sm-2 col-form-label bg-light">
          <b>Image url </b>
        </label>
        <div className="col-sm-10">
          <input
            type="url"
            id="imageurl"
            name="imageurl"
            ref={songThumbNailUrl}
            className="form-control"
            placeholder="Enter Song Thumbnail Url here"
          />
        </div>
      </div>
      <div className="form-group row" style={eachFieldStyle}>
        <label
          htmlFor="artistName"
          className="col-sm-2 col-form-label bg-light"
        >
          <b>Artist Name</b>
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="artistName"
            name="artistName"
            ref={artist}
            className="form-control"
            placeholder="Enter Song Name Artist Name here..."
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <button
          className="btn btn-danger"
          onClick={() => {
            addSong({
              user: `${user}`,
              song: {
                name: `${songName.current.value}`,
                url: `${songUrl.current.value}`,
                imageurl: `${songThumbNailUrl.current.value}`,
                artistName: `${artist.current.value}`,
              },
            });
          }}
        >
          Submit
        </button>
      </div>

      <h3 style={{ marginTop: "30px", color: "#f9374c" }}>
        Add Multiple Songs
      </h3>
      <h5 style={{ color: "azure" }}>
        Add a Json File Containing Songs Information
      </h5>
      {shouldShow ? input() : <></>}
    </>
  );
};
