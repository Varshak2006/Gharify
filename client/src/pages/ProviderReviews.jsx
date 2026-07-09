import { useEffect, useState } from "react";
import API from "../services/api";
import "./ProviderReviews.css";

export default function ProviderReviews() {

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState({
        averageRating: 0,
        totalReviews: 0
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
const providerId = localStorage.getItem("userId");
console.log("Provider ID:", providerId);

console.log("Review URL:", `/reviews/${providerId}`);
console.log("Rating URL:", `/reviews/rating/${providerId}`);
        try {

            const providerId = localStorage.getItem("userId");

            const reviewRes = await API.get(
                `/reviews/provider/${providerId}`
            );

            const ratingRes = await API.get(
                `/reviews/provider/${providerId}/rating`
            );

            setReviews(reviewRes.data);
            setRating(ratingRes.data);

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div className="reviews-container">

            <h1>⭐ My Ratings</h1>

            <div className="rating-box">

                <h2>
                    Average Rating :
                    {rating.averageRating} ⭐
                </h2>

                <p>
                    {rating.totalReviews} Reviews
                </p>

            </div>

            {reviews.length === 0 ? (

                <p>No Reviews Yet</p>

            ) : (

                reviews.map((review) => (

                    <div
                        key={review._id}
                        className="review-card"
                    >

                        <h3>
                            ⭐ {review.rating}/5
                        </h3>

                        <p>
                            {review.comment}
                        </p>

                        <small>
                            By {review.customerId?.name}
                        </small>

                    </div>

                ))

            )}

        </div>

    );

}