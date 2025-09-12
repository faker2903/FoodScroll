const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// for user registration
async function registerUser(req, res) {

    const { fullName, email, password } = req.body;
    //check if user already exists using email
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    //if user already exists return error 400 for bad request
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    //hash the password so that it is not stored in plain text in the database and get hacked easily

    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user in the database
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })
//creating this token so if user again login we can verify using this id that it is the same user

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
     httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production for HTTPS
  sameSite: 'none',   // important for cross-site cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/"
})

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}
//for user login checking email and password already exists or not if not exist then return error
async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    //compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production for HTTPS
  sameSite: 'none',   // important for cross-site cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/"
})

//never send password back to the frontend
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

//for user logout just clear the cookie
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

//for food partner registration
async function registerFoodPartner(req, res) {

    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production for HTTPS
  sameSite: 'none',   // important for cross-site cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/"
})


    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    })

}
//for food partner login
async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production for HTTPS
  sameSite: 'none',   // important for cross-site cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/"
})


    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}
//for food partner logout just clear the cookie
function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}

