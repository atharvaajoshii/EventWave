# EventWave

## Overview

EventWave is a College Event Registration Portal that allows administrators to create and manage events while enabling students to register for available events. The platform enforces role-based access control using JWT authentication and prevents overbooking through capacity validation.

---
Project Source Code Location:

EventWave/
├── backend/
└── frontend/

---
## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MariaDB

---

## Features

### Admin

* Secure Login
* Create Events
* View All Events
* View Registration Counts
* View Registered Students for Each Event

### Student

* Secure Login
* Browse Available Events
* Register for Events
* Prevent Duplicate Registrations
* View Personal Registrations

### Security

* JWT Authentication
* Protected Routes
* Role-Based Access Control
* Event Capacity Validation

---

## Database Schema

### Users

| Field    | Type    |
| -------- | ------- |
| uid      | INT     |
| name     | VARCHAR |
| username | VARCHAR |
| password | VARCHAR |
| role     | VARCHAR |

### Events

| Field     | Type    |
| --------- | ------- |
| eid       | INT     |
| eventname | VARCHAR |
| date      | DATE    |
| venue     | VARCHAR |
| capacity  | INT     |

### Registrations

| Field | Type |
| ----- | ---- |
| regid | INT  |
| uid   | INT  |
| eid   | INT  |

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eventwave

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

POST /api/login

### Events

GET /api/events

GET /api/events/:id

POST /api/events

GET /api/events/:eventId/registrations

### Registrations

POST /api/register/:eventId

GET /api/my-registrations

---

## Future Improvements

* Email Notifications
* Event Categories
* QR Code Check-In
* Event Search and Filters
* Waitlist System
