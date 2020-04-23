const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    cityName = req.body.cityName;
    appKey = "465098935845298f3f5b906efe433a33";
    units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units="+ units + "&appid=" + appKey;
    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherDes);
            res.write("<h1>The Weather in Fremont, CA  is " + temp + " C.</h1>");
            res.write("<p>The Weather current is <img src=\"" + iconUrl + "\">" + weatherDes + ".</p>");
            res.send();
        });
    });
});

    

app.listen(3000, function() {
    console.log("Server started at port 3000!");
});