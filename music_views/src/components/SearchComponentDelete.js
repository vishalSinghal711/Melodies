import React, { useEffect, useState } from "react";
import "./song-card.css";
import { doAjax } from "../utils/ajax";
export const SearchComponentDelete = ({ music, user }) => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const [songs, setSongs] = useState(music);

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
            console.log("error in json is ", err);
          });
      })
      .catch((err) => {
        console.log("error in response is ", err);
      });
  };

  return (
    <>
      <h4 style={{ color: "rgba(231, 82, 107, 0.8)" }}>Searched Songs</h4>
      {music.length == 0 ? (
        <h5 style={{ color: "azure" }}>No Match Found</h5>
      ) : (
        <></>
      )}

      <div style={{ width: "100%", height: "100%" }}>
        <div style={containerStyle}>
          {music.map((song) => {
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
                        <p className="category_list_cardTagName">{song.name}</p>
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
          })}
        </div>
      </div>
    </>
  );
};
