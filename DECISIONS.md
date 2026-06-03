# Architecture Decisions

## Authentication Strategy

JWT authentication was chosen because it is lightweight, stateless, and integrates well with React applications. Tokens are stored on the client side and verified on protected backend routes.

---

## Database Design

A relational database design was used because events, users, and registrations have clear relationships.

Tables:

* Users
* Events
* Registrations

Foreign key constraints ensure data integrity and prevent orphaned registrations.

---

## Role-Based Access Control

Two user roles were implemented:

### Admin

* Create Events
* View Registrations

### Student

* Register for Events
* View Personal Registrations

Authorization is enforced both on the frontend and backend.

---

## Event Capacity Validation

Capacity validation is performed on the backend before registration is inserted.

Benefits:

* Prevents overbooking
* Prevents client-side bypass attempts
* Maintains consistent event capacity

---

## Frontend Structure

The frontend follows a page-based architecture:

* Login
* Student Dashboard
* Admin Dashboard
* My Registrations

Reusable services are used for API communication.

---

## Tradeoffs

### Hardcoded Credentials

For the internship assignment, user credentials were stored in the database without implementing full user registration.

This reduced complexity and allowed focus on event management functionality.

### Local File-Based Styling

Plain CSS was used instead of component libraries to maintain simplicity and reduce dependencies.

---

## Future Improvements

* User Registration System
* Password Hashing with bcrypt
* Email Verification
* Event Analytics Dashboard
* Notification System
* Cloud Deployment
