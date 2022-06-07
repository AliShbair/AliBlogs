const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the structure of blogs
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// create a blog instance (model) which is defined by schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;  