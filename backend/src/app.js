// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
//fronted is running on port 5173 and backend is running on port 3000
//so we need to allow cors from frontend to backend
// credentials: true allows cookies to be sent from frontend to backend
// origin: "http://localhost:5173" allows only this origin to access the backend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());//it use bring data to req.body. since server cant read the data directly we do get the data from frontend it just it cant directly read it so we use this middleware to convert it into json format so that we can read it in req.body

app.get("/", (req, res) => {
    res.send("Hello World");
})

// routes for authentication 
app.use('/api/auth', authRoutes);

app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;