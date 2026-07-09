const User=require("../models/User");
const Service=require("../models/Services");
const Booking=require("../models/Booking");
const Review=require("../models/Review");

const getAnalytics=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments();
        const totalServices=await Service.countDocuments();
        const totalBookings=await Booking.countDocuments();
        const totalReviews=await Review.countDocuments();
        const completedBookings=await Booking.find({
            status:"completed"

        }).populate("serviceId");
        let revenue=0;
        completedBookings.forEach((booking)=>{
            revenue+=booking.serviceId?.price||0;
        });
        res.json({
            totalUsers,
            totalServices,
            totalBookings,
            totalReviews,
            revenue
        });

    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={getAnalytics};