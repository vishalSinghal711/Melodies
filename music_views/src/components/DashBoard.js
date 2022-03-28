import React, { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Singers } from "./Singers";
import { Song } from "./Song";

import "./dashboard.css";
import { doAjax } from "../utils/ajax";
import { SearchComponent } from "./SearchComponent";
export const DashBoard = ({ msg }) => {
  const searchName = useRef("");
  const searchArtist = useRef("");
  const [searchSongs, setSearchSongs] = useState([]);
  let history = useHistory();
  let match = useRouteMatch();

  const searchSong = async (val) => {
    let json = JSON.stringify({
      song: val === "name" ? "" : `${searchName.current.value}`,
      singer: val === "artist" ? "" : `${searchArtist.current.value}`,
    });
    let promise = doAjax(process.env.REACT_APP_SEARCH, "POST", json);
    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            setSearchSongs(data);
            history.push("/searches");
          })
          .catch((err) => {
            alert("json error", err);
          });
      })
      .catch((err) => {
        alert("response error", err);
      });
  };

  const routeToSong = (singer) => {
    history.push(`/songs/${singer}`);
  };

  return (
    <>
      <div id="dashboard">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
            Deep well of Songs
          </a>
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container">
            <input
              ref={searchName}
              className="form-control form-control-dark w-100"
              type="text"
              placeholder="Search Song By Song Name..."
              aria-label="Search"
            />
            <button
              className="btn btn-danger"
              onClick={() => {
                searchSong("artist");
              }}
            >
              Submit
            </button>
          </div>
          <div className="container">
            <input
              ref={searchArtist}
              className="form-control form-control-dark w-100"
              type="text"
              placeholder="Search Song By Artist..."
              aria-label="Search"
            />
            <button
              className="btn btn-danger"
              onClick={() => {
                searchSong("name");
              }}
            >
              Submit
            </button>
          </div>
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3" href="#"></a>
            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block position-fixed h-100 sidebar collapse"
            >
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="current"
                      className="nav-link active"
                      aria-current="page"
                      to="/singers"
                    >
                      <span data-feather="home"></span>
                      <div>
                        <h5>Singers</h5>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/songs/Arijit singh"
                      activeClassName="current"
                    >
                      <span data-feather="file"></span>
                      <div>
                        <h5>Arijit Singh Songs</h5>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/songs/Shaan"
                      activeClassName="current"
                    >
                      <span data-feather="file"></span>
                      <div>
                        <h5>Shaan Songs</h5>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>

            <main
              className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
              style={{
                height: "69.1vh",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 id="dashboard-heading" className="h2">
                  Welcome {JSON.parse(msg)["name"]}
                </h1>
                <button
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    setSearchSongs([]);
                    searchName.current.value = "";
                    searchArtist.current.value = "";
                  }}
                  className="btn btn-outline-danger"
                >
                  Clear Searches
                </button>
              </div>

              <Switch>
                <>
                  <Route path="/" exact>
                    <Redirect to="/singers" />
                  </Route>
                  <Route
                    path="/singers"
                    render={(props) => (
                      <Singers callback={routeToSong}></Singers>
                    )}
                  />
                  <Route
                    path="/songs/:singerName"
                    render={(props) => (
                      <Song
                        props={{
                          singerName: `${props.match.params.singerName.replace(
                            "%20",
                            " "
                          )}`,
                        }}
                      />
                    )}
                  />
                  <Route
                    path="/searches"
                    render={(props) => (
                      <SearchComponent songs={searchSongs}></SearchComponent>
                    )}
                  />
                </>
              </Switch>
            </main>
          </div>
        </div>
      </div>

      <div className="audio-back"></div>

      <audio
        id="audio"
        controls="controls"
        className="audioStyle bottomPlaylerStyle"
      >
        <source id="audioSource" src=""></source>
      </audio>
    </>
  );
};
