const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require('multer');
//express can not handle file upload so we r using multer
//since we r not storing the file in the disk we r using memory storage
const upload = multer({
    storage: multer.memoryStorage(),
})


// POST /api/food/
// it should be protected route so only food partner can create food item . user should not be able to create food item like when u r ordering food only customer can order and list the food items but only food partner can create the food item
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("mama"),
    foodController.createFood)


/* GET /api/food/ [protected] */
// it should be protected route so only authenticated user can see the food items
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)


router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)


router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)



module.exports = router