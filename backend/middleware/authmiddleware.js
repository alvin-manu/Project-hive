const jwt = require('jsonwebtoken');
const users = require('../Models/UserSchema');

const jwtmiddleware = async (req, res, next) => {
    console.log("jwtmiddleware")
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token)
    try {
        if (!token) {
            res.send("No token send")
        } else {
            const jwtresponse = jwt.verify(token,"manuskey")
            req.user = await users.findById(jwtresponse.userId)
            req.payload = jwtresponse.userId
            next()
        }
    } catch (error) {
        res.status(401).json({message:"Please Login Again"})
    }
}

module.exports = jwtmiddleware

