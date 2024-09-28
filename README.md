# Ediary Backend

Welcome to the backend of the Ediary Learning Management System (LMS) platform. This README provides an overview of the project, setup instructions, and other essential information.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Ediary is a comprehensive LMS platform designed to facilitate online learning. The backend of Ediary handles all server-side operations, including user authentication, course management, and data storage.

## Features

- User authentication and authorization
- Course creation and management
- Assignment submission and grading
- Real-time notifications
- RESTful API for frontend integration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Socket.io for real-time features

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ediary-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ediary-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The backend server will be running at `http://localhost:5000`.

## API Documentation

For detailed API documentation, refer to the [API Docs](./docs/api.md).

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
