const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });

      return res.status(200).json({ message: 'User successfully registred. Now you can login' });
    } else {
      return res.status(404).json({ message: 'User already exists!' });
    }
  }
  return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByTitle = {};

  // Obtain all the keys for the ‘books’ object.
  const bookKeys = Object.keys(books);

  // Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.
  for (let iter = 0; iter < bookKeys.length; iter++) {
    const bookKey = bookKeys[iter];
    const book = books[bookKey];
    if (book.author === author) {
      booksByTitle[bookKey] = book;
    }
  }

  res.send(booksByTitle);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  let booksByTitle = {};

  // Obtain all the keys for the ‘books’ object.
  const bookKeys = Object.keys(books);

  // Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.
  for (let iter = 0; iter < bookKeys.length; iter++) {
    const bookKey = bookKeys[iter];
    const book = books[bookKey];
    if (book.title === title) {
      booksByTitle[bookKey] = book;
    }
  }

  res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;

/*
Code for consume the API

const axios = require('axios');

//Api url
const url = 'http://localhost:5000/';

// get all books
async function getBooks(url) {
  try {
    const response = await axios.get(url);
    console.table(response.data);
  } catch (error) {
    console.error(error);
  }
}
getBooks(url);

// get data by isbn
async function getByIsbn(url, isbn) {
  finalUrl = url + 'isbn/' + isbn;
  try {
    const response = await axios.get(finalUrl);
    console.table(response.data);
  } catch (error) {
    console.error(error);
  }
}
getByIsbn(url, 3);

// get data by author
async function getByAuthor(url, author) {
  finalUrl = url + 'author/' + author;
  try {
    const response = await axios.get(finalUrl);
    console.table(response.data);
  } catch (error) {
    console.error(error);
  }
}
getByAuthor(url, 'Hans Christian Andersen');

// get data by title
async function getByTitle(url, title) {
  finalUrl = url + 'title/' + title;
  try {
    const response = await axios.get(finalUrl);
    console.table(response.data);
  } catch (error) {
    console.error(error);
  }
}
getByTitle(url, 'The Book Of Job');
*/
