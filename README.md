# Airbnb – Backend

A full-stack Airbnb-style accommodation booking platform currently under development.

This repository contains the backend application built using **Node.js, Express.js, MongoDB, and Mongoose**.

The goal is to build a real-world accommodation platform where users can discover properties, become hosts, manage property listings, and make reservations.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Docker | MongoDB containerization |
| Thunder Client | API testing |

---

## Project Structure

```text
Airbnb/
│
├── Backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── checkAuth.js
│   │   ├── errorHandler.js
│   │   └── logger.js
│   │
│   ├── models/
│   │   └── Property.js
│   │
│   ├── compose.yaml
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── README.md
```

---

## Features Implemented

- Express.js server setup
- REST API fundamentals
- Custom middleware for request logging
- Basic authentication middleware
- Centralized error handling
- MongoDB integration using Mongoose
- Property schema and model
- GET API for retrieving properties from MongoDB
- Docker Compose configuration for MongoDB

---

## Getting Started

Follow these steps to run the backend application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ganesh23-jsp/Airbnb.git
cd Airbnb/Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB Using Docker

Make sure Docker Desktop is running.

```bash
docker compose up -d
```

This starts MongoDB inside a Docker container.

### 4. Start the Backend Server

```bash
node server.js
```

The backend server will run at:

```text
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/about` | Backend information |
| GET | `/api/properties` | Retrieve properties from MongoDB |
| GET | `/test-error` | Test centralized error handling |

---

## Authentication Header

The property GET endpoint currently uses a basic authentication middleware that checks whether an `Authorization` header exists.

For testing with Thunder Client, add the following header:

```http
Authorization: Bearer test123
```

**Note:** This is only a temporary learning implementation. Proper JWT authentication and token verification will be implemented later.

---

## Database Configuration

MongoDB runs inside a Docker container using the `mongo:8` image.

The application connects to:

```text
mongodb://127.0.0.1:27017/airbnb
```

Docker Compose uses a named volume to persist database data, ensuring that data is retained even when the MongoDB container is restarted or recreated.

---

## Planned Features

- [ ] User registration and login
- [ ] JWT-based authentication and authorization
- [ ] Host registration and property management
- [ ] Admin approval system
- [ ] Property search and filtering
- [ ] Booking and reservation management
- [ ] Booking cancellation and modification
- [ ] Razorpay payment integration
- [ ] Production deployment

---

## Project Status

**Under Active Development**

This project is being developed incrementally with a focus on real-world backend architecture, database design, authentication, security, and deployment.

The current implementation establishes the backend foundation, MongoDB integration, middleware, and initial property APIs. Further features will be added as development progresses.

---

*Built as a hands-on full-stack development project with a focus on real-world application design and engineering practices.*
