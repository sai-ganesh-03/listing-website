const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./modules/listing.js");

const mongo_var = "mongodb://mymongodb:27017/wanderlust";

const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");

app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(mongo_var);
}
app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.get("/listings", async (req, res) => {
  const allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
});
//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
//crrate route
app.post("/listings", async (req, res) => {
  if (req.body.listing.image === "") {
    delete req.body.listing.image;
  }
  let Listing = new listing(req.body.listing);
  await Listing.save();

  res.redirect("/listings");
});
//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  res.render("listings/show.ejs", { Listing });
});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  res.render("listings/edit.ejs", { Listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.Listing });
  res.redirect(`/listings/${id}`);
});
//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const deleted = await listing.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect("/listings");
});
app.listen(3000, () => {
  console.log("its working at 3000");
});
