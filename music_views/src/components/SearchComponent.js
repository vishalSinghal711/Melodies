import React, { useEffect, useState } from "react";
import "./song-card.css";
export const SearchComponent = ({ songs }) => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const playSound = (song) => {
    var audio = document.getElementById("audio");

    var source = document.getElementById("audioSource");
    if (audio.paused && `${song}` === source.src) {
      audio.play();
      return;
    }

    if (!audio.paused && `${song}` === source.src) {
      audio.pause();

      return;
    }
    source.src = `${song}`;

    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
  };

  return (
    <>
      <h4 style={{ color: "rgba(231, 82, 107, 0.8)" }}>Searched Songs</h4>
      {songs.length == 0 ? (
        <h5 style={{ color: "azure" }}>No Match Found</h5>
      ) : (
        <></>
      )}
      <div style={{ width: "100%", height: "100%" }}>
        <div style={containerStyle}>
          {songs.map((song) => {
            return (
              <div>
                <div className="container-fluid">
                  <div className="category_list_card">
                    <div id="thumbnailDiv">
                      <div className="list_card_control" id="dashboardSong">
                        <i
                          className="fa fa-play playBtn_style"
                          onClick={() => {
                            playSound(song.url);
                          }}
                        ></i>
                      </div>

                      <img src={song.imageurl} alt="song poster" />
                    </div>

                    <p className="category_list_cardTagName">{song.name}</p>
                    <p className="category_list_cardContentName">
                      {song.artistName}
                    </p>
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
