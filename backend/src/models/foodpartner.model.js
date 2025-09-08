const mongoose = require('mongoose');
//schema for food partner have name, contactName, phone, address, email, password
const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

module.exports = foodPartnerModel;