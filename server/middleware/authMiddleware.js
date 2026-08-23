// const jwt=require("jsonwebtoken");
// const protect = (req,res,next)=>{
//     let token;
//     if(
//         req.headers.authorization && 
//         req.headers.authorization.startsWith("Bearer")
//     ){
//         token=req.headers.authorization.split(" ")[1];
//         try{
//             const decoded=jwt.verify(
//                 token,
//                 process.env.JWT_SECRET
//             );
//             req.user=decoded;
//             console.log("Decoded Token:",decoded);
//             next();
//         }
//         catch(error){
//             return res.status(401).json({
//                 message:"Inavlid token"
//             });
//         }
//     }
//     if(!token){
//         return res.status(401).json({
//             message:"no token provided"
//         });
//     }
// };
// module.exports=protect;

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        console.log("Decoded Token:", decoded);

        next();

    } catch (error) {

        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = protect;