const mongoose=require("mongoose");
const serviceSchema=new mongoose.Schema(
    {
        serviceName:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
//         serviceGroup: {
//     type: String,
//     enum: ["Household", "Commercial"],
// },

// subService: {
//     type: String
// },
serviceGroups: [
    {
        groupName: {
            type: String,
            required: true
        },

        subServices: [
    {
        name: {
            type: String,
            required: true
        },
 price: {
            type: Number,
            required: true
        },
        duration: {
            type: Number
        },

        durationUnit: {
            type: String,
            enum: ["minutes", "days"],
            default: "minutes"
        }
    }
]
    }
]
    },
     
 

    {
        timestamps:true
    }
);
module.exports=mongoose.model("Service",serviceSchema);