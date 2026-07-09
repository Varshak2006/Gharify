const Booking=require("../models/Booking");
const User=require("../models/User");
const Service=require("../models/Services");
const createBooking = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const service = await Service.findById(req.body.serviceId);

        console.log("SERVICE:", service);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        // const provider = await User.findOne({
        //     role: "provider",
        //     serviceType: service.serviceName
        // });
const providers = await User.find({
    role: "provider",
    serviceType: service.serviceName
});

if (providers.length === 0) {
    return res.status(404).json({
        message: "No provider available."
    });
}
        // console.log("PROVIDER:", provider);

        // if (!provider) {
        //     return res.status(404).json({
        //         message: "No provider available for this service."
        //     });
        // }
const bookingTime = new Date(req.body.bookingDate);
let selectedProvider = null;

for (const provider of providers) {

    const existingBooking = await Booking.findOne({
         providerId: provider._id,
        //providerId: selectedProvider._id,
        bookingDate: bookingTime,
        status: {
            $in: ["pending", "accepted"]
        }
    });

    if (!existingBooking) {
        selectedProvider = provider;
        break;
    }
}
if (!selectedProvider) {
    return res.status(400).json({
        message: "No provider available at this time. Please choose another slot."
    });
}

        const booking = await Booking.create({
            customerId: req.user.id,
            // providerId: provider._id,
            providerId: selectedProvider._id,
            serviceId: req.body.serviceId,
            bookingDate: req.body.bookingDate,
            address: req.body.address
        });

        console.log("BOOKING CREATED");

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log("ERROR OCCURRED:");
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};
const getmybookings=async(req,res)=>{
    try{
        const bookings=await Booking.find({
            customerId:req.user.id
        }).populate("serviceId")
        .populate("providerId","name email serviceType phone city experience profileImage")
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
        .populate("customerId","name email profileImage")
        .populate("providerId","name email serviceType phone city experience profileImage")
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
if (booking.providerId.toString() !== req.user.id) {
    return res.status(403).json({
        message: "This booking is not assigned to you."
    });
}
 booking.status="accepted";
// booking.providerId=req.user.id;
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
         console.log("Logged in Provider ID:", req.user.id);
        const jobs=await Booking.find({
            providerId:req.user.id
        })
        .populate("customerId","name email profileImage")
        .populate("serviceId")
        .populate("providerId","name email profileImage");
        console.log("jobs found:",jobs);
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(500).json({
            message:error.message
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
const getAvailableJobs=async (req,res)=>{
    try{
        const jobs=await Booking.find({
            status:"pending",
            // providerId:{$exists:false}
            providerId:req.user.id
        })
        .populate("customerId","name email profileImage")
        .populate("serviceId");
        res.status(200).json(jobs);
    }catch(error){res.status(500).json({
        message:error.message
    });
};
}
const cancelBooking = async (req,res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            });
        }

        if(booking.status !== "pending"){
            return res.status(400).json({
                message:"Only pending bookings can be cancelled"
            });
        }

        booking.status = "cancelled";

        await booking.save();

        res.status(200).json({
            message:"Booking Cancelled",
            booking
        });

    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
 };
const updateTrackingStatus = async (req, res) => {
    try {

        console.log("Booking ID:", req.params.id);
        console.log("New Status:", req.body.trackingStatus);

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        console.log("Before Update:", booking.trackingStatus);

        booking.trackingStatus = req.body.trackingStatus;

        await booking.save();

        // Read again from MongoDB
        const updatedBooking = await Booking.findById(req.params.id);

        console.log("After Update:", updatedBooking.trackingStatus);

        res.json({
            message: "Tracking Updated",
            booking: updatedBooking
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};
const getPublicBookingCount = async (req, res) => {
    try {

        const totalBookings = await Booking.countDocuments();

        res.status(200).json({
            totalBookings
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
module.exports={createBooking,getmybookings,getAllBookings,acceptBooking,getMyJobs,completeBooking,getAvailableJobs,cancelBooking,getPublicBookingCount,
    updateTrackingStatus};