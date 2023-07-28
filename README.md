# expressBookReviews API

This project is an API for book reviews developed using Express, a popular web application framework for Node.js. The primary objective of this project is to provide a platform for users to submit and read book reviews.

## Features

- Book Reviews: Users can read and submit book reviews.
- Rating System: Users can rate books and view the overall rating.
- User Authentication: Secure user authentication to manage reviews and ratings.

## Getting Started

To run the Todo App locally using Docker, follow these steps:

Install Docker on your machine: [Docker Installation Guide ](https://docs.docker.com/engine/install/)

1. Clone this repository:

   ```
   git clone https://github.com/BrayanDH/expressBookReviews.git
   ```

2. Navigate to the project directory:

   ```
   cd expressBookReviews
   ```

3. Build the Docker image:

   ```
   docker build -t expressBookReviews .
   ```

   This command will use the Dockerfile in the project directory to build an image named expressBookReviews`.

4. Run the Docker container:

   ```
   docker run -p 5000:5000 expressBookReviews
   ```

   This command will start a Docker container from the `expressBookReviews` image and map port 5000 of the container to port 5000 of the host system.

5. Open a web browser and go to `http://localhost:5000` to access the API.

To run the expressBookReviews locally without docker, follow these steps:

1. Clone this repository:

   ```
   git clone https://github.com/BrayanDH/expressBookReviews.git
   ```

2. Navigate to the project directory:

   ```
   cd expressBookReviews
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the server:

   ```
   npm start
   ```

5. Open your web browser and visit http://localhost:3000 to access the expressBookReviews API.

## Dependencies

The expressBookReviews API utilizes the following dependencies:

- Express
- Cloudant (or any database of your choice for storing book reviews)
- EJS (Embedded JavaScript) templating engine

Please refer to the `package.json` file for the complete list of dependencies and their versions.

## Contributing

Contributions to the expressBookReviews API are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to the creators and maintainers of the libraries and frameworks used in this project.
