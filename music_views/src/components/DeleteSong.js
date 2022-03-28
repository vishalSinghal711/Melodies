import React from "react";
import { useRef } from "react";
import { doAjax } from "../utils/ajax";
import { useEffect, useState } from "react";
import "./song-card.css";
export const DeleteSong = ({ user, props }) => {
  const [songs, setSongs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };
  const deleteSong = async (song, user) => {
    let obj = {
      user: `${user}`,
      song: {
        name: `${song.name}`,
        url: `${song.url}`,
        imageurl: `${song.imageurl}`,
        artistName: `${song.artistName}`,
      },
    };
    let promise = doAjax(
      process.env.REACT_APP_SONGDELETE_URL,
      "POST",
      JSON.stringify(obj)
    );
    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            alert("Successfully Deleted...");
            setSongs(
              songs.filter((currentSong) => {
                return song !== currentSong;
              })
            );
          })
          .catch((err) => {
            alert("json error", err);
          });
      })
      .catch((err) => {
        alert("response error", err);
      });
  };

  let singerName = props.singerName;
  if (!singerName) {
    singerName = props.match.params.singerName;
  }

  useEffect(() => {
    setLoaded(false);
    let url = `${process.env.REACT_APP_SONG_URL}?name=${singerName}`;
    const promise = fetch(url);
    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            setSongs(data);
            setLoaded(true);
          })
          .catch((err) => {
            alert("json error", err);
          });
      })
      .catch((err) => alert("response error", err));
  }, [props.singerName]);

  const sort = (type) => {
    if (type === "asc") {
      let k = [];
      k = [
        ...songs.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        }),
      ];
      setSongs(k);
    } else {
      let k = [];
      k = [
        ...songs.sort((a, b) => {
          return a.name < b.name ? 1 : -1;
        }),
      ];
      setSongs(k);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ color: "azure", opacity: "0.6", marginBottom: "20px" }}>
            Songs of {singerName}
          </h4>
          <div>
            <img
              onClick={() => {
                sort("desc");
              }}
              style={{
                backgroundColor: "azure",
                width: "32px",
                height: "32px",
                margin: "5px",
                padding: "5px",
              }}
              src="https://image.flaticon.com/icons/png/512/475/475288.png"
              alt="filter desc"
            />
            <img
              onClick={() => {
                sort("asc");
              }}
              style={{
                backgroundColor: "azure",
                width: "32px",
                height: "32px",
                margin: "5px",
                padding: "5px",
              }}
              src="https://image.flaticon.com/icons/png/512/714/714525.png"
              alt="filter asc"
            />
          </div>
        </div>

        <div style={containerStyle}>
          {!loaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            songs.map((song) => {
              return (
                <div>
                  <div className="container-fluid" style={{ padding: "20px" }}>
                    <div className="category_list_card">
                      <div id="thumbnailDiv">
                        <img src={song.imageurl} alt="song poster" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p className="category_list_cardTagName">
                            {song.name}
                          </p>
                          <p className="category_list_cardContentName">
                            {song.artistName}
                          </p>
                        </div>
                        <div>
                          <img
                            id="deleteBtn"
                            onClick={() => {
                              deleteSong(song, user);
                            }}
                            src="https://image.flaticon.com/icons/png/512/1632/1632602.png"
                            alt="Remove Song"
                            style={{
                              width: "32px",
                              height: "32px",
                              position: "relative",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
