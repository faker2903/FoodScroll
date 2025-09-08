const mongoose = require('mongoose');
//food schema have name, video, description, foodPartner(reference to foodpartner), likeCount, savesCount
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,// storing url of video and saving the video on cloudinary or imagekit
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"// reference to foodpartner model storing the id of foodpartner who added the food
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})


const foodModel = mongoose.model("food", foodSchema);


module.exports = foodModel;