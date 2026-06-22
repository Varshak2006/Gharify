const Booking=require("../models/Booking");
const createBooking=async(req,res)=>{
    try{
        const booking=await Booking.create({
            customerId:req.user.id,
            serviceId:req.body.serviceId,
            bookingDate:req.body.bookingDate,
            address:req.body.address
        });
        res.status(201).json(booking);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getmybookings=async(req,res)=>{
    try{
        const bookings=await Booking.find({
            customerId:req.user.id
        }).populate("serviceId");
        res.status(200).json(bookings);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getAllBookings=async (req,res)=>{
    try{
        const bookings=await Booking.find()
        .populate("customerId","namem email")
        .populate("serviceId");
        res.status(200).json(bookings);
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const acceptBooking=async(req,res)=>{
    try{
        const booking=await Booking.findById(req.params.id);
if(!booking){
    return res.status(404).json({
        message:"Booking not found"
    });
}
booking.status="accepted";
booking.providerId=req.user.id;
await booking.save();
res.status(200).json({
    message:"Booking Accepted",
    booking
});
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getMyJobs=async (req,res)=>{
    try{
        const jobs=await Booking.find({
            providerId:req.user.id
        })
        .populate("customerId","name email")
        .populate("serviceId");
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(500).son({
            messagge:error.message
        });
    }
};
const completeBooking=async(req,res)=>{
    try{
        const booking=await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            });
        }
        booking.status="completed";
        await booking.save();
        res.status(200).json({
            message:"Booking Completed",
            booking
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={createBooking,getmybookings,getAllBookings,acceptBooking,getMyJobs,completeBooking};