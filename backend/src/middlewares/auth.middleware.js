const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

//checking whether the food partner is authenticated or not 
//first we will check whether the token is present in the cookie or not if not present then we will return 401 error
//if token is present then we will verify the token using jwt.verify method if token is valid then we will find the food partner using the id present in the token and attach the food partner to the req object and call next() method to pass the control to the next middleware
async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //it have the data u used while creating the token

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner //sending the food partner data to the controller using req object
        //create a new property in req object called foodPartner and assign the food partner data to it

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

//same as above function but for user
async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}