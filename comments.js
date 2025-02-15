// Create web server
const express = require("express");
const app = express();

// Create a server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Comments
const comments = [
  { id: 1, username: "John", comment: "Hello everyone!" },
  { id: 2, username: "Jane", comment: "Hi there!" },
  { id: 3, username: "Tom", comment: "Good morning!" },
];

// Get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// Get a comment by ID
app.get("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: `Comment with ID ${id} not found` });
  }
});

// Create a new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment,
  };

  comments.push(comment);
  res.json(comment);
});

// Update a comment
app.put("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);

  if (comment) {
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.json(comment);
  } else {
    res.status(404).json({ message: `Comment with ID ${id} not found` });
  }
});

// Delete a comment
app.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);

  if (index >= 0) {
    comments.splice(index, 1);
    res.json({ message: `Comment with ID ${id} deleted` });
  } else {
    res.status(404).json({ message: `Comment with ID ${id} not found` });
  }
});
