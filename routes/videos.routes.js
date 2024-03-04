const express = require("express");
const router = express.Router();
const request = require("request");
const convert = require("xml-js");

router.use((req, res, next) => {
  // telling CORS to accept all origins 
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//  GET /api/videos -  Retrieves all videos
router.get("/videos", (req, res, next) => {
  request(
    {
      url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCZB26wdYoexth38wmYzLkbQ",
    },
    (error, response, body) => {
      console.log(body);

      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      // converting xml to JSON 
      res.json(JSON.parse(convert.xml2json(body)));
    }
  );
});

module.exports = router;
