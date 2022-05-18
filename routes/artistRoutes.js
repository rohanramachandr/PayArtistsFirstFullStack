const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Album = mongoose.model("albums");
const Artist = mongoose.model("artists");
const Song = mongoose.model("songs");

module.exports = (app) => {


  app.get("/api/artists/:artistName", requireLogin, async (req, res) => {
    try {
      const artist = await Artist.findOne({ artistName: req.params.artistName });
      res.send(artist);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //checks if artist username already exists
  app.get("/api/artists/username/isvalid/:artistUsername", requireLogin, async (req, res) => {
    try {
      const artists = await Artist.find({ artistUsername: req.params.artistUsername });
      res.send(artists.length === 0);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  


  app.get("/api/artists/:artistName/albums", requireLogin, async (req, res) => {
    try {
     
      const artist = await Artist.findOne({ artistName: req.params.artistName });
      const albums = await Album.find({ _artist: artist._id });
      res.send(albums);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  app.get("/api/artists/:artistName/songs", requireLogin, async (req, res) => {
    try {
    const artist = await Artist.findOne({ artistName: req.params.artistName });
      const songs = await Song.find({ _artist: artist._id,}, null, {sort: {plays: -1}});
      res.send(songs);
    } catch (err) {
      res.status(404).send(err);
    }
  });


};
