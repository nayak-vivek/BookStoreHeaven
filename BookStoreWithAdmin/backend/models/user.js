// creating schemas, hume isliye mongoose ko require krna padta h kyunki wo saare functions hume provide krta h jin functions ki hume need padti h schemas create krne ke liye
const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },          
    
    role:{
        type:String,
        default:"user",
        enum:["user","admin"] // agr hum use database me jakr change kr denge to wo hamara admin ho jaega role
    },
    
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order"
    },
],

},
    {timestamps:true} //Jab mongoose schema me timestamps: true lagata hai, to automatically do extra fields create ho jaati hain: 1) createdAt — Ye batata hai ki document kab create hua 2) updatedAt — Ye batata hai ki document last time kab update hua 
); 
module.exports = mongoose.model("user",user); // Ye schema ko MongoDB collection me convert karta hai, Ye ek model (class) banata hai, jiska use karke database me CRUD operations kar sakta hai