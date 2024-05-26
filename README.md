# E-Learning Site



## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend application is built using Express.js, a Node.js web application framework, to provide RESTful APIs for various functionalities such as user authentication, course management, and more.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Run the server: `npm start`

## Usage

Once the server is running, you can use the provided APIs to interact with the backend. This backend can be integrated with a frontend application to build a complete system for managing courses and user accounts.

## Endpoints

- `/register`: POST request to register a new user.
- `/login`: POST request to authenticate a user and generate a token.
- `/logout`: GET request to log out a user.
- `/courses/createCourse`: POST request to create a new course (requires admin privileges).
- `/users/registerCourse`: POST request to register a user for a course.
- `/getCourses`: GET request to retrieve all courses.
- `/profile`: POST request to retrieve user profile information.
- `/getsingleCourse/:_id`: GET request to retrieve details of a single course.
- `/deleteuser/:userId`: DELETE request to delete a user account (requires admin privileges).
- `/adminlogin`: POST request for admin login.
- `/course/rating`: POST request to submit a rating for a course.

## Authentication

- User authentication is handled using JWT (JSON Web Tokens). Upon successful login, a token is generated and sent in the response, which should be included in the headers of subsequent requests for authentication.
- Certain endpoints require authentication (e.g., `/profile`, `/users/registerCourse`), while others require admin privileges (e.g., `/courses/createCourse`, `/deleteuser/:userId`). Middleware functions (`isAuthenticated` and `isAdmin`) are used to verify user roles and permissions.

## Middleware

- `isAuthenticated`: Middleware function to check if a user is authenticated by verifying the JWT token in the request headers.
- `isAdmin`: Middleware function to check if a user has admin privileges by verifying the JWT token and user role.

## Contributing

Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the [MIT License](link-to-license-file).
