const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
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

    role:{
        type:String,
        enum:["customer","provider","admin"],
        default:"customer"
    },

    serviceType:{
        type:String
    },

    phone:{
        type:String
    },

    city:{
        type:String
    },

    experience:{
        type:String
    },
profileImage: {
    type: String,
    default: ""
}
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);