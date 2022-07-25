const express = require("express");
const urllib = require("urllib");
const app = express();

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};
const port = 3000;

const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.get("/teams/:teamName", (request, response) =>
  urllib.request(
    "http://data.nba.net/10s/prod/v1/2018/players.json",
    function (err, data) {
      if (!err) {
        const teamName = request.params.teamName;
        let teamId = teamToIDs[teamName];
        let myData = JSON.parse(data).league.standard;
        let myPlayers = myData.filter((t) => t.teamId === teamId); //***** */
        myPlayers = myPlayers.map((p) => {
          return {
            firstName: p.firstName,
            lastName: p.lastName,
            posittion: p.pos,
            jersey: p.jersey,
          };
        });
        response.send(myPlayers);
      }
    }
  )
);

//response.send("kk");

app.listen(port);
