const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')
const path = require("path");
const connectLivereload = require("connect-livereload");
const app = express();

// auto refresh
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 

// connect to MongoDB
const dbUrl =
  "mongodb+srv://ali:123Test456@AliBlogs.fvqa4.mongodb.net/ali-blogs?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
  
mongoose
  .connect(dbUrl, connectionParams)
  .then((result) => app.listen(3000))
  .catch((err) => console.log("Error: ", err));

// register view engine
app.set("view engine", "ejs");
// middleware & Static folders
app.use(express.static("public"));
// to handle all post data (like form) as obj and passes it into req object
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"));
// Middleware, won't be skipped until we assign the next function
// another middleware, will be fired if no response already happened

app.get("/", (req, res) => {
 res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirect
app.get("/about-us", (req, res) => { 
  res.redirect("/about");
});

// forward this line directly to blogRoutes file
app.use('/blogs', blogRoutes)

// 404 page
// last line, coz it will be fired instantly once res reaches it
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
  //   res.status(404).sendFile("./project/404.html", { root: __dirname });
});
