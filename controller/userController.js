const users = require("../model/userModel")
const jwt = require("jsonwebtoken")


// register
exports.registerController = async (req, res) => {
    console.log(`Inside Register Controller`);
    const { username, email, password } = req.body
    console.log(username, email, password);

    // logic
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(404).json('User Already Exists...Please Login!!! ')
        } else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }

    // console.log(req);
    // res.status(200).send("Register Request Received")

}

// login
exports.loginController = async (req, res) => {
    console.log("Inside Login Controller");
    const { email, password } = req.body
    console.log(password, email);
    // logic
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.JWTSecretKey)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(401).json("Invalid Credentials!!!")
            }
        } else {
            res.status(404).json("User Not Found...Please Register!!!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//update user profile
exports.updateUserProfileController = async (req, res) => {
    console.log("inside update user profile controller");
    const { username, password, bio, role, profile } = req.body
    const updateProfile = req.file ? req.file.filename : profile
    const email = req.payload

    try {
        const updateUser = await users.findOneAndUpdate({ email }, { username, password, bio, role, profile: updateProfile, email }, {new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)

    }
}