const { PORT, APIKEY } = require("./config/config");
const express = require("express");
const fetch = require("node-fetch");
const cors = require('cors')
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//GET route to load the HTML and
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//GET route to call the IP apid route and send data to the frontend
app.get("/ip/info", async (req, res) => {
  try {

    const INFOIPURL = `https://api.ipgeolocation.io/ipgeo?apiKey=${APIKEY}`

    //fetching the api that gets the all the data about the api
    const infoData = await fetch(INFOIPURL);
    const loadedData = await infoData.json();

    //returning the json object
    return res.status(200).json({ success: true, data: loadedData });
  } catch (e) {
    res.status(400).json({ success: false, data: e });
  }
});

//server routing port for production or development
const serverPort = PORT || process.env.PORT;

app.listen(serverPort, (err) => {
  if (err) console.log("Error connecting to server");
  console.log(`Server is running on port ${serverPort}`);
});
