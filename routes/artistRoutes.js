const { response } = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Album = mongoose.model("albums");
const Artist = mongoose.model("artists");
const Song = mongoose.model("songs");

module.exports = (app) => {


  app.get("/api/artists/:artistUsername", requireLogin, async (req, res) => {
    try {
      const artist = await Artist.findOne({ artistUsername: req.params.artistUsername });
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




  app.get("/api/artists/:artistUsername/albums", requireLogin, async (req, res) => {
    try {

      const artist = await Artist.findOne({ artistUsername: req.params.artistUsername });
      const albums = await Album.find({ _artist: artist._id });
      res.send(albums);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  app.get("/api/artists/:artistUsername/songs", requireLogin, async (req, res) => {
    try {
      const artist = await Artist.findOne({ artistUsername: req.params.artistUsername });
      const songs = await Song.find({ _artist: artist._id, }, null, { sort: { plays: -1 } });
      res.send(songs);
    } catch (err) {
      res.status(404).send(err);
    }
  });


  app.get("/api/search", async (req, res) => {

    try {

      let result = await Artist.aggregate([
        {
          "$search": {
            "index": "searchArtists",
            "autocomplete": {
              "query": `${req.query.term}`,
              "path": "artistName",
              "fuzzy": {
                "maxEdits": 2
              }
             
            }
          }
      
        }
       // ,{ $limit : 1 }
      ]);

      res.send(result);

    } catch (e) {
      res.status(500).send({ message: e.message })
    }

  });

  app.post('/api/artists/create', requireLogin, async (req, res) => {





    try {

      const { artistName, artistUsername } = req.body;


      let errors = []
      if (artistUsername.trim().length === 0) {
        errors.push("Username is required")
      }
      if (artistUsername.trim().length < 5) {
        errors.push("Username must be at least 5 characters")
      }
      if (artistUsername.trim().length > 20) {
        errors.push("Username must be less than 20 characters")
      }
      if (/\s/.test(artistUsername)) {
        errors.push("Username must not contain any whitespace")
      }
      if (artistUsername.trim().length !== 0) {
        const artists = await Artist.find({ artistUsername: req.params.artistUsername });
        if (artists.length !== 0) {
          errors.push("This username is already taken");
        }
      }
      if (artistName.trim().length > 30) {
        errors.push("Artist name must be less than 30 characters")
      }
      if (artistName.trim().length === 0) {
        errors.push("Artist name is required")
      }

      if (errors.length > 0) {
        res.status(401).send({ error: errors });

      }





      if (!req.user.isArtist) {
        const artist = new Artist({
          artistName,
          artistUsername,
          _user: req.user.id
        });
        await artist.save();

        req.user.isArtist = true;
        const user = await req.user.save();

        res.send(user);
      }
      else {
        return res.status(401).send({ error: 'User is already an artist!' });

      }


    }
    catch (err) {
      res.status(422).send(err);

    }



  });



};
