// // const express=require("express");
// // const router=express.Router();
// // const authMiddleware=require("../middleware/authMiddleware");
// // const{
// //     addReview,
// //     getProviderReviews,
// //     getProviderRating
// // }=require("../controllers/reviewController");
// // router.post(
// //     "/",
// //     authMiddleware,
// //     addReview
// // );
// // router.get(
// //     "/provider/:providerId",
// //     getProviderReviews
// // );
// // router.get("/provider/:providerId/rating",
// //     getProviderRating
// // );
// // module.exports=router;
// const express = require("express");
// console.log("✅ reviewRoutes loaded");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");

// const {
//     addReview,
//     getProviderReviews,
//     getProviderRating
// } = require("../controllers/reviewController");

// router.post(
//     "/",
//     authMiddleware,
//     addReview
// );

// router.get(
//     "/provider/:providerId",
//     getProviderReviews
// );
// router.get("/:providerId", (req, res, next) => {
//     console.log("Reviews route hit:", req.params.providerId);
//     next();
// }, getProviderReviews);

// router.get(
//     "/provider/:providerId/rating",
//     getProviderRating
// );
// module.exports = router;


const express = require("express");
console.log("✅ reviewRoutes loaded");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addReview,
    getProviderReviews,
    getProviderRating
} = require("../controllers/reviewController");

router.post(
    "/",
    authMiddleware,
    addReview
);

router.get(
    "/provider/:providerId",
    (req, res, next) => {
        // console.log("Reviews route hit:", req.params.providerId);
        next();
    },
    getProviderReviews
);

router.get(
    "/provider/:providerId/rating",
    (req, res, next) => {
        // console.log("Rating route hit:", req.params.providerId);
        next();
    },
    getProviderRating
);

module.exports = router;