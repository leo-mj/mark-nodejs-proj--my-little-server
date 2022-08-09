import express from "express";
import ponyData from "../data/ponies.json";
import helloData from "../data/hello-world.json"
import historyData from "../data/history.json"
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;

app.get("/history", (req, res) => {
  res.json(historyData);
  historyData.routes.push("/history");
})

app.get("/", (req, res) => {
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
  historyData.routes.push("/");
});

app.get("/creation-time", (req, res) => {
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
  historyData.routes.push("/creation-time")
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
  historyData.routes.push("/current-time")
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
  historyData.routes.push("/hits")

});

app.get("/hits-stealth", (req, res) => {
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
  historyData.routes.push("/hits-stealth");

});

app.get("/ponies", (req, res) => {
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
  historyData.routes.push("/ponies")

});

app.get("/ponies/random", (req, res) => {
  res.json({
    message: "Loaded random pony data:",
    data: pickRandom(ponyData.members),
    countedAsHit: false,
  });
  historyData.routes.push("/ponies/random");

})

app.get("/hello-world", (req, res) => {
  res.json({
    message: "Loaded hello world translation data:",
    data: helloData,
    countedAsHit: false,
  });
  historyData.routes.push("/hello-world");

});

app.get("/season-one", (req, res) => {
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
  historyData.routes.push("/season-one");

});

app.get("/season-one/random", (req, res) => {
  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
  historyData.routes.push("/season-one/random");

});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5000;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
