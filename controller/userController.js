const users = require("../model/userModel");
const jwt = require("jsonwebtoken")

exports.registerController = async (req, res) => {
    console.log(`Inside Register Controller`);
    const { username, password, email } = req.body
    console.log(username, password, email);

    // logic
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(404).json(`User Already Exists...Please Login!!!`)
        } else {
            const newUSer = new users({
                username,
                email,
                password
            })
            await newUSer.save()
            res.status(200).json(newUSer)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.loginController = async (req, res) => {
    console.log(`Inside Login Controller`);
    const { password, email } = req.body
    console.log(password, email);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({userMail : existingUser.email},process.env.JWTSecretKey)
                res.status(200).json({existingUser,token})
            } else {
                res.status(401).json(`Invalid Credentials!!!`)
            }
        } else {
            res.status(404).json(`User Not Found...Please Register!!!`)
        }
    } catch (error) {
        res.status(500).json(error)
    }


}