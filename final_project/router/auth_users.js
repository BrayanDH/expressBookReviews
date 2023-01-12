const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
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
  //returns boolean
  //write code to check if username and password match the one we have in records.
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
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

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
  //Write your code here
  // Obtener el ISBN del libro desde los parámetros de la ruta
  const isbn = req.params.isbn;
  // Obtener la reseña enviada en el cuerpo de la solicitud
  const review = req.body.review;
  // Obtener el nombre de usuario almacenado en la sesión
  const username = req.session.authorization.username;

  if (!review) {
    return res.status(400).json({ message: 'No review provided' });
  }
  // Verificar si el libro existe en la base de datos
  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }
  // Obtener las reseñas existentes para ese ISBN
  let reviews = books[isbn].reviews;
  // Verificar si el usuario ya ha publicado una reseña para ese ISBN
  if (reviews[username]) {
    // Si ya ha publicado una reseña, actualizar la reseña existente
    res.status(200).json({ message: 'Review updated' });
    reviews[username] = review;
  } else {
    // Si no ha publicado una reseña, agregar una nueva reseña
    reviews[username] = review;
  }
  // Actualizar la reseña en la base de datos
  books[isbn].reviews = reviews;
  // Responder con un mensaje de éxito
  res.status(200).json({ message: 'Review successfully published' });
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  // Obtener el ISBN del libro desde los parámetros de la ruta
  const isbn = req.params.isbn;
  // Obtener el nombre de usuario almacenado en la sesión
  const username = req.session.authorization.username;
  // Verificar si el libro existe en la base de datos
  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }
  // Obtener las reseñas existentes para ese ISBN

  let reviews = books[isbn].reviews;
  // Verificar si el usuario ya ha publicado una reseña para ese ISBN
  if (reviews[username]) {
    // Si ya ha publicado una reseña, eliminar la reseña existente

    delete reviews[username];
    // Actualizar la reseña en la base de datos
    books[isbn].reviews = reviews;
    // Responder con un mensaje de éxito

    res.status(200).json({ message: 'Review successfully deleted' });
  } else {
    // Si no ha publicado una reseña, enviar un mensaje de error
    res.status(404).json({ message: 'Review not found' });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
