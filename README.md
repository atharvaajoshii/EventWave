# EventWave
What each file does:

server.js → starts Express server.
config/db.js → connects to MariaDB.
authRoutes.js → login APIs.
eventRoutes.js → event APIs.
registrationRoutes.js → registration APIs.
authController.js → login logic.
eventController.js → create/get events logic.
registrationController.js → register/view registrations logic.
authMiddleware.js → checks JWT token before allowing access.
