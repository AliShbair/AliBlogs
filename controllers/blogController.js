const Blog = require("../models/blog");

// get blogs data from DB then inject it to index page
const blog_index = (req, res) => {
 Blog.find()
   .sort({ createdAt: -1 })
   .then((result) =>
     res.render("blogs/index", { title: "All Blogs", blogs: result })
   )
   .catch((err) => console.log(err));
}

// open a specific blog in details
const blog_details = (req, res) => {
 const id = req.params.id;
 Blog.findById(id)
   .then((result) => {
     res.render("blogs/details", { title: "Blog Details", blog: result });
   })
   .catch((err) => res.status(404).render("404", { title: "404" }));
}

// get form page, put it above the id codes, otherwise code will read 'create' as an id
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create Blog" });
}

// receive data 'Form' and save it to DB
const blog_create_post = (req, res) => {
const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

// get delete method then delete it from DB, then send the redirect obj to be used later
const blog_delete = (req, res) => {
const id = req.params.id;
Blog.findByIdAndDelete(id)
  .then((result) => res.json({ redirect: "/blogs" }))
  .catch((err) => console.log(err));
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};