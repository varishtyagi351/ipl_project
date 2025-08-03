require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

//Middleware to handle cors

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connectDB();

//Middleware
app.use(express.json());

//Route
const playerRoutes = require('./routes/playerRoutes');
app.use('/players', playerRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🎉 IPL Player API running!');
});





//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at the port ${PORT}`);
})

