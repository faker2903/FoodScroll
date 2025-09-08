const mongoose = require('mongoose');
//user schema
//will have username, email, password and timestamps(when the user was created and updated)
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;