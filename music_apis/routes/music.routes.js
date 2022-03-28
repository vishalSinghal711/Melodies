const express = require('express');
const musicOperations = require('./music.controller');
const routes = express.Router();
routes.get('/singer',musicOperations.getByArtist);
routes.get('/allsongs',musicOperations.getAllSongs);
routes.post('/addsong', musicOperations.addASong);
routes.post("/deletesong", musicOperations.deleteASong);
routes.post("/searchsong" , musicOperations.searchedSong)
module.exports = routes;
