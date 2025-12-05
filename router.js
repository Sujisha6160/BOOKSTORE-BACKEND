const express = require("express");
const { registerController, loginController } = require("./controller/userController");
const { addBookcontroller } = require("./controller/bookController");
const jwtMiddleware = require("./middlewares/jwtMiddleware"); // Import JWT middleware
const multerConfig = require("./middlewares/imgMulterMiddleware");

// const userController = require("./controller/userController")

const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// add book
router.post("/add-book", jwtMiddleware, multerConfig.array("uploadImages",3), addBookcontroller);

module.exports = router;
