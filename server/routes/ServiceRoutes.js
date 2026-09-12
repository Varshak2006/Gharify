const express=require("express");
const router=express.Router();
const{createService,getAllServices,getservicebyId}=require("../controllers/servicecontroller.js");
const protect=require("../middleware/authMiddleware.js");
//const authorizeroles=require("../middleware/rolemiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createService
);
router.get("/",getAllServices);
router.get("/:id",getservicebyId);
module.exports=router;