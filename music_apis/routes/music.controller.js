const chalk = require("chalk");
const songOperations = require("../db/services/songoperations");
const userOperations = require("../db/services/useroperations");

const musicOperations = {
  // these are user operations
  async getAllSongs(request, response) {
    const songs = await songOperations.readAll();
    response.json(songs);
  },
  async getByArtist(request, response) {
    const singerName = request.query.name;
    const songs = await songOperations.readBySinger(singerName);
    response.json(songs);
  },
  async searchedSong(request, response) {
    console.log(chalk.yellow(`${request.body["singer"]}`));
    const singer = request.body.singer;
    const song = request.body.song;
    console.log(chalk.yellow(`${singer} ${song}`));
    let allSongs = [];
    if (singer) {
      const songs = await songOperations.readByArtist(singer);
      if (songs.length > 0) {
        allSongs.push(...songs);
      }
    }
    if (song) {
      const songs = await songOperations.readBySong(song);
      if (songs.length > 0) {
        allSongs.push(...songs);
      }
    }
    response.json(allSongs);
  },

  //   these are admin operations
  async addASong(request, response) {
    const requestFields = request.body;
    // checking if the request is made by rhe admin so that if api get leaked then security not breach
    const isCurrentUserAdmin = await userOperations.login(
      JSON.parse(requestFields["user"])
    );
    console.log(chalk.yellow(isCurrentUserAdmin));
    if (isCurrentUserAdmin && isCurrentUserAdmin.role === "Admin") {
      console.log(chalk.yellow("Logged in"));
      const result = await songOperations.add(requestFields["song"]);
      response.json(result);
    } else {
      response.json("access denied");
    }
  },
  async deleteASong(request, response) {
    const requestFields = request.body;
    const isCurrentUserAdmin = await userOperations.login(
      JSON.parse(requestFields["user"])
    );
    // checking if the request is made by rhe admin so that if api get leaked then security not breach
    if (isCurrentUserAdmin && isCurrentUserAdmin.role === "Admin") {
      // on checked admin continue the process
      const result = await songOperations.removeSong(requestFields["song"]);
      response.json(result);
    } else {
      response.json("access denied");
    }
  },
};
module.exports = musicOperations;
