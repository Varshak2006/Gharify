const mongoose=require("mongoose");
const bookingSchema=new mongoose.Schema(
    {
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        serviceId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service",
            required:true
        },
        serviceGroup: {
    type: String
},

subService: {
    type: String
},
        providerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        bookingDate:{
            type:Date,
            required:true
        },
      bookingEndDate:{
    type:Date
},  
        address:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:[
                "pending","accepted","completed","cancelled"
            ],
            default:"pending"
        },
       trackingStatus: {
    type: String,
    enum: [
        "confirmed",
        "on_the_way",
        "arrived",
        "started",
        "completed"
    ],
    default: "confirmed"
}, 
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model(
    "Booking",
    bookingSchema
);