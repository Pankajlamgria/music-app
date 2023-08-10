const express = require("express");
const router = express.Router();
const auth = require("../models/auth.js");
const artist = require("../models/artist.js");
const language = require("../models/language.js");
const song = require("../models/song.js");
const songtype = require("../models/songtype.js");
const fetchuser = require("../connection/fetchuser.js");

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
router.post("/addsong", fetchuser, async (req, res) => {
  let success = false;
  const userdetail = await auth.findById(req.userid);
  const bodydata = req.body;
  bodydata.songname = titleCase(bodydata.songname);
  bodydata.artistname = titleCase(bodydata.artistname);
  bodydata.language = titleCase(bodydata.language);
  bodydata.songtype = titleCase(bodydata.songtype);
  if (userdetail.email === "pankajlamgria@gmail.com") {
    if (
      bodydata.songname === "" ||
      bodydata.artistname === "" ||
      bodydata.imgurl === "" ||
      bodydata.songurl === "" ||
      bodydata.language === "" ||
      bodydata.type === ""
    ) {
      res.json({ success, error: "Please give the appropriate details" });
    }
    if (await song.findOne({ songname: bodydata.songname })) {
      res.json({ success, error: "Song by this name exist already." });
    } else {
      const newsong = await song.create({
        songname: bodydata.songname,
        artistname: bodydata.artistname,
        imgurl: bodydata.imgurl,
        songurl: bodydata.songurl,
        language: bodydata.language,
        songtype: bodydata.songtype,
      });
      if (!(await artist.findOne({ artistname: bodydata.artistname }))) {
        await artist.create({
          imgurl: bodydata.imgurl,
          artistname: bodydata.artistname,
        });
      }

      if (!(await language.findOne({ language: bodydata.language }))) {
        await language.create({
          imgurl: bodydata.imgurl,
          language: bodydata.language,
        });
      }

      if (!(await songtype.findOne({ songtype: bodydata.songtype }))) {
        await songtype.create({
          imgurl: bodydata.imgurl,
          songtype: bodydata.songtype,
        });
      }
      success = true;
      res.json({ success, msg: "Song has been successfully added." });
    }
  } else {
    res.json({ success, error: "Access Denied." });
  }
});

module.exports = router;
