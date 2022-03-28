import React, { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import { AddSong } from "./AddSong";
import "./dashboard.css";
import { DeleteSong } from "./DeleteSong";
import { doAjax } from "../utils/ajax";
import { SearchComponentDelete } from "./SearchComponentDelete";
export const DashBoardAdmin = ({ msg }) => {
  const searchName = useRef("");
  const searchArtist = useRef("");

  const [searchSongs, setSearchSongs] = useState([]);
  let history = useHistory();

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

  return (
    <>
      <div id="dashboard">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
            Deep Well of Songs
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
        </header>

        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block sidebar collapse position-fixed h-100"
            >
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="current"
                      className="nav-link active"
                      aria-current="page"
                      to="/addsong"
                    >
                      <span data-feather="home"></span>
                      <div>
                        <h5>Add Song</h5>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/songs/Neha kakkar"
                      activeClassName="current"
                    >
                      <span data-feather="file"></span>
                      <div>
                        <h5>Neha Kakkar Songs</h5>
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
                </ul>
              </div>
            </nav>

            <main
              className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
              style={{
                height: "78.4vh",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2" id="dashboard-heading">
                  Welcome {JSON.parse(msg)["name"]} {JSON.parse(msg)["role"]}
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
                <Route path="/" exact>
                  <Redirect to="/addsong" />
                </Route>
                <Route path="/addsong" render={() => <AddSong user={msg} />} />
                <Route
                  path="/songs/:singerName"
                  render={(props) => (
                    <DeleteSong
                      user={msg}
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
                    <SearchComponentDelete
                      music={searchSongs}
                      user={msg}
                    ></SearchComponentDelete>
                  )}
                />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
