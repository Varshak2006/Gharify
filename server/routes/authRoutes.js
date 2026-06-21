const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
// router.get("/",(req,res)=>{
//     res.send("Auth Route Working");
// });
const {registerUser,loginUser}=require("../controllers/authcontroller");
//const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,(req,res)=>{
    res.json({
        message:"protected route accessed",
        user:req.user
    });
});
router.get(
    "/admin",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        });
    }
);
router.get(
    "/provider",
    protect,
    authorizeRoles("provider"),
    (req,res)=>{
        res.json({
            message:"welcome provider"
        });
    }
)
module.exports=router;