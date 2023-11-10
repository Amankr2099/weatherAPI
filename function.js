const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const { log } = require('console')
var object = {}
var temp = ""
var city = ""
var description = ""

app = express()
app.set('view engine', 'ejs');
app.use(express.static("stylings"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/layout.html")
})

app.post("/", function (req, res) {
    const cityName = String(req.body.city_name)
    const apikey = "77b4f3bcb3c3ce22a8801e75c74e4975&"
    const baseurl = "https://api.openweathermap.org/data/2.5/weather?"
    const units = "metric"
    https.get(baseurl + "q=" + cityName + "&appid=" + apikey + "&units=" + units, function (response) {
        console.log(response.statusCode)
        response.on("data", function (data) {
            object = JSON.parse(data)
            // icon = object.weather[0].icon
            // img_url = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            temp = object.main.temp
            city = object.name
            description = object.weather[0].description
            res.render("update_layout", { 
                cityname: city,
                temperature: temp,
                view_descript: description
             })
        })
    })

})

app.post("/successful",function (req,res) {
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Server Initiated");
})