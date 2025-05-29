const users = require('../Models/UserSchema')

const jwt = require('jsonwebtoken')

// user registration
exports.registerUser = async (req, res) => {
    // logic to resolve requests
    // extract data send from from end in user request
    // 1) find whether the email id is already registered in collection
    // 2) if find send response back to FE, saying "User is already registered"
    // 3) If not found , insert that data into DB

    console.log("Inside Register User Controller");

    console.log(req.body)
    const { name, email, password } = req.body

    try {
        // check whether user already exist using email
        const existinguser = await users.findOne({ email: email })
        if (existinguser) {
            return res.status(409).json("Account already Exists Please Login")
        } else {
            // inseert that user into db
            console.log("User Not Found")
            //  creating an object
            const newUser = new users({
                name: name,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            })
            await newUser.save();
            res.status(201).json(`${name} registered successfully`)
        }
    } catch (err) {
        res.status(401).json('Register request Failed due to', err)
    }
}

// user login

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email, password: password })

        const token = jwt.sign({ userId: existingUser._id }, "manuskey")
        console.log(token)
        if (existingUser) {
            return res.status(200).json({ user_data: existingUser, jwt_token: token })
        }
        else {
            return res.status(404).json("Login failed Due to invalid email or password")
        }
    } catch (err) {
        res.status(401).json("Login Failed due to", err)
    }

}