const express = require("express")
const { registerController, loginController } = require("./controller/userController")
const { addBookcontroller } = require("./controller/bookController")

// const userController = require("./controller/userController")

const router = express.Router()
// resgister
router.post("/register",   registerController)

// login
router.post("/login",  loginController)
// addbook
router.post("/add-book", addBookcontroller)

module.exports = router