// Song Operations that will talk to Db layer

// required SongModel(instance of Schema so, all db functions already defined and separately we pushed an object whose matchings will be passed to db)
const SongModel = require("../models/song.model");
const chalk = require("chalk");

// operations with song
const songOperations = {
  async add(songObject) {
    return await SongModel.create(songObject);
  },
  async readBySinger(singerName) {
    var regexp = new RegExp("^" + singerName, "i");
    return await SongModel.find({ artistName: regexp });
  },
  async readAll() {
    return await SongModel.find({});
  },
  async removeSong({ name, artistName }) {
    return await SongModel.remove(
      {
        name: `${name}`,
        artistName: `${artistName}`,
      },
      await function (err, docs) {
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log("Deleted Song : ", docs);
          return docs;
        }
      }
    );
  },
  async readByArtist(artist) {
    var regexp = new RegExp("^" + artist, "i");
    return await SongModel.find({ artistName: regexp });
  },
  async readBySong(song) {
    var regexp = new RegExp("^" + song, "i");
    return await SongModel.find({ name: regexp });
  },
};
module.exports = songOperations;
