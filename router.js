const express = require("express");
const { registerController, loginController } = require("./controller/userController");
const { addBookcontroller } = require("./controller/bookController");
const jwtMiddleware = require("./db/model/middlewares/jwtMiddleware"); // Import JWT middleware

const router = express.Router();

// Public Routes
router.post("/register", registerController);
router.post("/login", loginController);

// Protected Routes (JWT required)
router.post("/add-book", jwtMiddleware, addBookcontroller);

module.exports = router;
