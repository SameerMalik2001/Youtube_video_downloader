const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// Endpoint to download YouTube video
app.post("/download", async (req, res) => {
  const { ytUrl } = req.body;
  const info = await ytdl.getInfo(ytUrl);

  const obj = {
    title: info.player_response.videoDetails.title,
    lenghtSecond: info.player_response.videoDetails.lengthSeconds,
    views: info.player_response.videoDetails.viewCount,
    author: info.player_response.videoDetails.author,
    isPrivate: info.player_response.videoDetails.isPrivate,
    isLive: info.player_response.videoDetails.isLiveContent,
    isFamilySafe: info.videoDetails.isFamilySafe,
    category: info.videoDetails.category,
    publishedDate: info.videoDetails.publishDate,
    age_restricted: info.videoDetails.age_restricted,
  };

  let formats = [];
  let formats_obj = info.formats;

  for (let i = 0; i < formats_obj.length; i++) {
    let json_obj = formats_obj[i];
    if (json_obj?.hasVideo === true && json_obj?.hasAudio === true) {
      if (json_obj?.qualityLabel?.indexOf("240") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 240,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("360") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 360,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("480") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 480,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("720") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 720,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("1080") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 1080,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("1440") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 1440,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("2160") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 2160,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("3840") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 3840,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      } else if (json_obj?.qualityLabel?.indexOf("4320") !== -1) {
        if (json_obj?.fps !== undefined) {
          formats.push({
            resolution : 4320,
            fps: json_obj.fps,
            url: json_obj.url,
            hasVideo: json_obj.hasVideo,
            hasAudio: json_obj.hasAudio,
          });
        }
      }
    }
  }
  
  obj.formats = formats

  res.send({
    data : {
      message : "fetch 200A",
      data : obj
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});