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
