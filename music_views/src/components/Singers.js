import React, { useEffect, useState } from "react";
import { NavLink, useRouteMatch, Route, useHistory } from "react-router-dom";
import { Song } from "./Song";
export const Singers = ({ callback }) => {
  let match = useRouteMatch();
  const [singers, setSinger] = useState([]);
  let history = useHistory();
  const [sname, setSingerName] = useState("");
  const getSongsBySinger = (singerName) => {
    callback(singerName);
  };

  useEffect(() => {
    const promise = fetch(process.env.REACT_APP_SINGER_URL);
    promise.then((response) => {
      console.log("Response ", response);
      response
        .json()
        .then((singers) => {
          console.log("::::: Singers are ", singers);
          setSinger(singers["singers"]);
        })
        .catch((err) => console.log("Invalid JSON ", err))
        .catch((err) => console.log("Error During Server Call ", err));
    });
  }, []);
  return (
    <div className="row">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {singers.map((singer) => {
          return (
            <div
              onClick={() => {
                getSongsBySinger(singer.name);
              }}
              className="card"
              style={{
                width: "10rem",
                height: "10rem",
                margin: "2rem 2rem",
                borderRadius: "80px",
                backgroundImage: `url(${singer.photo})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
