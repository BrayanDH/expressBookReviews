const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // check if username already exists in the database
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  // check if username and password match the database records
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  // get username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // check if username and password are provided in the request body and if they match the database records and if they match, generate a JWT token and send it back to the client in the response header
  if (!username || !password) {
    return res.status(404).json({ message: 'Error logging in' });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      'access',
      { expiresIn: 60 * 60 },
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send('User successfully logged in');
  } else {
    return res.status(208).json({ message: 'Invalid Login. Check username and password' });
  }
});

regd_users.put('/auth/review/:isbn', (req, res) => {
  // Get the ISBN from the request parameters and the review from the request body and the username from the session object
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  // Check if the review is provided in the request body
  if (!review) {
    return res.status(400).json({ message: 'No review provided' });
  }

  // Check if the book exists in the database
  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Get the reviews for the book
  let reviews = books[isbn].reviews;

  // Check if the user has already posted a review for the book and update the review if the user has already posted a review for the book
  if (reviews[username]) {
    res.status(200).json({ message: 'Review updated' });
    reviews[username] = review;
  } else {
    reviews[username] = review;
  }

  // Update the database and send a response to the client
  books[isbn].reviews = reviews;
  res.status(200).json({ message: 'Review successfully published' });
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  // Get the ISBN from the request parameters and the username from the session object
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  // verified if the book exists in the database
  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // get the reviews for the book
  let reviews = books[isbn].reviews;

  // check if the user has posted a review for the book and delete the review if the user has posted a review for the book
  if (reviews[username]) {
    delete reviews[username];
    books[isbn].reviews = reviews;
    res.status(200).json({ message: 'Review successfully deleted' });
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
