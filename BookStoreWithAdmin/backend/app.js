const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const path = require("path");

// Static folder for images
app.use("/images", express.static(path.join(__dirname, "public/images")));


//routes handling
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourites = require("./routes/favourites");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(cors({
  origin: "http://localhost:5173", // React URL
  credentials: true
}));

app.use(express.json());
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourites);
app.use("/api/v1",Cart);
app.use("/api/v1/",Order);

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`);
});