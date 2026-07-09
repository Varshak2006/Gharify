const Review=require("../models/Review");
const Booking=require("../models/Booking");
const addReview=async (req,res)=>{
    try{
        const {bookingId,rating,comment}=req.body;
        const booking=await Booking.findById(bookingId);
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            });
        }
        if(booking.status !=="completed"){
            return res.status(400).json({
                message:"Only completed bookings can be reviewed."
            });
        }
        const alreadyaReviewed=await Review.findOne({
            bookingId
        });
        if(alreadyaReviewed){
            return res.status(400).json({
                message:"You alreaddy reviewd this booking."
            });
        }
        const review=await Review.create({
            customerId:req.user.id,
            providerId:booking.providerId,
            bookingId,
            rating,
            comment
        });
        res.status(201).json({
            message:"Review submitted",
            review
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }

};
const getProviderReviews=async(req,res)=>{
    try{
        const reviews=await Review.find({
            providerId:req.params.providerId

        }).populate("customerId","name");
        res.status(200).json(reviews);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getProviderRating = async (req, res) => {

    try {

        const reviews = await Review.find({
            providerId: req.params.providerId
        });

        const totalReviews = reviews.length;

        if (totalReviews === 0) {

            return res.json({
                averageRating: 0,
                totalReviews: 0
            });

        }

        const totalStars = reviews.reduce(

            (sum, review) => sum + review.rating,

            0

        );

        const averageRating = (
            totalStars / totalReviews
        ).toFixed(1);

        res.json({

            averageRating,

            totalReviews

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports={
    addReview,
    getProviderReviews,
    getProviderRating
};