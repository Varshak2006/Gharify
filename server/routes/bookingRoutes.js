const express=require("express");
const router=express.Router();
const{createBooking,getmybookings,getAllBookings,acceptBooking,getMyJobs,completeBooking}=require("../controllers/bookingcontroller");
const protect=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/rolemiddleware");
router.post(
    "/",
    protect,
    authorizeRoles("customer"),
    createBooking
);
router.get(
    "/my-bookings",
    protect,
    authorizeRoles("customer"),
    getmybookings
);
router.get(
    "/all",
    protect,
    authorizeRoles("provider","admin"),
    getAllBookings
);
router.patch(
    "/:id/accept",
    protect,
    authorizeRoles("provider"),
    acceptBooking
);
router.get(
    "/my-jobs",
    protect,
    authorizeRoles("provider"),
    getMyJobs
);
router.patch(
    "/:id/complete",
    protect,
    authorizeRoles("provider"),
    completeBooking
);
module.exports=router;