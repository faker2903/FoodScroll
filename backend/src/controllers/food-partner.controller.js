const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

// Controller to get food partner by ID along with their food items 
async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }
// what is tooObjct()? it converts mongoose document to plain js object so that we can add more properties to it like foodItems 

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

module.exports = {
    getFoodPartnerById
};