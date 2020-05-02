const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode=require("./utils/geocode")
const forecast = require("./utils/forecast");
//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handle bars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to save
app.use(express.static(publicDirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kavish Pandit",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need Help",
    age: 27,
    help: "This is some helpful text",
    name: "Kavish Pandit",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the website",
    about: "About the website",
    name: "Kavish Pandit",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, long, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, long, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if(!req.query.search){
    return res.send({
      error:"You must provide a search term"
    })
  }  
  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404help",
    name: "Kavish Pandit",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kavish Pandit",
    errorMessage: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on part 300");
})
