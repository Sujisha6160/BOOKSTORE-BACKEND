const express = require("express")
const { registerController, loginController, updateUserProfileController } = require("./controller/userController")
const { addBookController, getHomeBooksController, getAllBooksController, getABookController, getUserBooksController, deleteBookController, deleteUserAddedBookController, getUserBroughtBookController } = require("./controller/bookController")
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require("./middlewares/imgMulterMiddleware")

const router = express.Router()

// register
router.post("/register", registerController)

// login
router.post("/login", loginController)

// get home-books
router.get("/home-books",getHomeBooksController)

// ------users----------

// add book
router.post("/add-book",jwtMiddleware, multerConfig.array("uploadImages", 3), addBookController)

// get all books
router.get("/all-books",jwtMiddleware, getAllBooksController)

// get a book
router.get("/view-books/:id",jwtMiddleware,getABookController)

// get user added books
router.get("/user-books", jwtMiddleware, getUserBooksController)

// delete a user added book
router.delete("/delete-book/:id", deleteUserAddedBookController)

// get user brought book
router.get("/user-brought-book", jwtMiddleware, getUserBroughtBookController)

// update user profile
router.put("/update-user-profile", jwtMiddleware, multerConfig.single("profile"), updateUserProfileController)


module.exports = router