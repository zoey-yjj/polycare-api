# PolyCare

PolyCare is the server component of our healthcare clinic management system, built using Node.js and Express.js. It utilizes MongoDB to store user and clinic staff details, provides CRUD (Create, Read, Update, Delete) operations through RESTful APIs, encrypts passwords, and secures routes using JWT (JSON Web Tokens).

## Technologies Used

- Node.js: A JavaScript runtime for building server-side applications.
- Express.js: A fast, unopinionated, and minimalist web framework for Node.js.
- MongoDB: A NoSQL database for storing user and clinic staff information.
- JWT (JSON Web Tokens): Used for secure authentication and authorization.
- Bcrypt.js: Library for hashing and encrypting passwords.

## Features

### User and Clinic Staff Management

PolyCare allows for the creation, retrieval, updating, and deletion of user and clinic staff details. Users can be categorized into different roles, such as patients and clinic staff.

### Secure Authentication and Authorization

- Passwords are securely encrypted using Bcrypt.js before being stored in the database.
- JWT tokens are generated and used for secure authentication, ensuring that only authorized users can access protected routes.

### API Endpoints

The provides a set of RESTful API endpoints for user and clinic staff management. Detailed API documentation can be found in the API documentation file.
Testing

PolyCare includes a comprehensive suite of tests to ensure the reliability and functionality of the APIs. You can run the tests using:

### Contributing

Welcome contributions from the community. If you'd like to contribute to PolyCare, please follow our contribution guidelines.