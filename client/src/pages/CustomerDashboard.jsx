import { useEffect, useState } from "react";
import API from "../services/api";
import "./CustomerDashboard.css";
// 6a3f9843286686cc96f16e94
export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);

const [reviews,setReviews]=useState({});
const [providerRatings, setProviderRatings] = useState({});
const [providerReviews, setProviderReviews] = useState({});


  useEffect(() => {
    fetchBookings();
  }, []);

const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Bookings from API:",res.data);
      console.log(res.data);
      setBookings(res.data);
      fetchProviderRatings(res.data);
      fetchProviderReviews(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
};
  const fetchProviderRatings = async (bookingsData) => {
  try {

    const ratings = {};

    for (const booking of bookingsData) {

      if (booking.providerId?._id) {

        const res = await API.get(
          `/reviews/provider/${booking.providerId._id}/rating`
        );

        ratings[booking.providerId._id] = res.data;

      }

    }

    setProviderRatings(ratings);

  } catch (error) {

    console.log(error);

  }
};
const fetchProviderReviews = async (bookingsData) => {
  try {

    const reviews = {};

    for (const booking of bookingsData) {

      if (booking.providerId?._id) {

        const res = await API.get(
          `/reviews/provider/${booking.providerId._id}`
        );

        reviews[booking.providerId._id] = res.data;

      }

    }

    setProviderReviews(reviews);

  } catch (error) {

    console.log(error);

  }
};
  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking cancelled");

      fetchBookings();

    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking");
    }
  };
  
  const handleReviewChange = (bookingId, field, value) => {

  setReviews({
    ...reviews,
    [bookingId]: {
      ...reviews[bookingId],
      [field]: value
    }
  });

};
const submitReview = async (bookingId) => {

  try {

    const token = localStorage.getItem("token");

    const review = reviews[bookingId];

    if (!review?.rating) {
      return alert("Please select a rating.");
    }

    const res = await API.post(
      "/reviews",
      {
        bookingId,
        rating: review.rating,
        comment: review.comment || ""
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(res.data.message);
setReviews({
  ...reviews,
  [bookingId]: {
    rating: "",
    comment: ""
  }
});
    fetchBookings();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Review Failed"
    );

  }

};
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Customer Dashboard
      </h1>

      <h2 className="welcome-text">
        Welcome {localStorage.getItem("name")}
      </h2>

      <h3>My Bookings</h3>

      {bookings.length === 0 ? (

        <p>No bookings yet.</p>

      ) : (

        <div className="booking-grid">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="booking-card"
            >

              <h4>{booking.serviceId?.serviceName}</h4>

              <hr />

              <h3>👨‍🔧 Assigned Professional</h3>

              {booking.providerId ? (

                <>

                  <p>
                    <strong>👤 Name:</strong>{" "}
                    {booking.providerId.name}
                  </p>

                  <p>
                    <strong>📧 Email:</strong>{" "}
                    {booking.providerId.email}
                  </p>

                  <p>
                    <strong>📞 Phone:</strong>{" "}
                    {booking.providerId.phone}
                  </p>

                  <p>
                    <strong>📍 City:</strong>{" "}
                    {booking.providerId.city}
                  </p>

                  <p>
                    <strong>⭐ Experience:</strong>{" "}
                    {booking.providerId.experience}
                  </p>

                  <p>
                    <strong>🛠 Service:</strong>{" "}
                    {booking.providerId.serviceType}
                  </p>
{providerRatings[booking.providerId?._id] && (

  <>

    <p>
      ⭐ <strong>Rating:</strong>{" "}
      {providerRatings[booking.providerId._id].averageRating}/5
    </p>

    <p>
      📝 <strong>Reviews:</strong>{" "}
      {providerRatings[booking.providerId._id].totalReviews}
    </p>
{providerReviews[booking.providerId?._id]?.length > 0 && (

  <div className="provider-reviews">

    <h4>Customer Reviews</h4>

    {providerReviews[booking.providerId._id]
      .slice(0, 3)
      .map((review) => (

        <div
          key={review._id}
          className="review-card"
        >

          <p>
            {"⭐".repeat(review.rating)}
          </p>

          <p>
            {review.comment}
          </p>

          <small>
            — {review.customerId?.name}
          </small>

        </div>

      ))}

  </div>

)}
  </>

)}
                </>

              ) : (

                <p>No provider assigned yet.</p>

              )}

              <hr />

              <p>
                📍 <strong>Address:</strong> {booking.address}
              </p>

              <p>
                📅 <strong>Booking Date:</strong>{" "}
                {new Date(
                  booking.bookingDate
                ).toLocaleDateString()}
              </p>

              <span
                className={`status ${booking.status}`}
              >
                {booking.status.toUpperCase()}
              </span>




<p className="tracking-status">
    🚚 {booking.trackingStatus.replaceAll("_", " ").toUpperCase()}
</p>
<div className="booking-progress">

  <div
    className={`progress-step ${
      ["confirmed", "on_the_way", "arrived", "started", "completed"].includes(
        booking.trackingStatus
      )
        ? "completed"
        : ""
    }`}
  >
    ✔ Booking Confirmed
  </div>

  <div
    className={`progress-step ${
      ["on_the_way", "arrived", "started", "completed"].includes(
        booking.trackingStatus
      )
        ? "completed"
        : ""
    }`}
  >
    🚗 Provider On The Way
  </div>

  <div
    className={`progress-step ${
      ["arrived", "started", "completed"].includes(
        booking.trackingStatus
      )
        ? "completed"
        : ""
    }`}
  >
    📍 Provider Arrived
  </div>

  <div
    className={`progress-step ${
      ["started", "completed"].includes(
        booking.trackingStatus
      )
        ? "completed"
        : ""
    }`}
  >
    🛠 Service Started
  </div>

  <div
    className={`progress-step ${
      booking.trackingStatus === "completed"
        ? "completed"
        : ""
    }`}
  >
    ✅ Service Completed
  </div>

</div>


{booking.trackingStatus === "completed" && (

<div className="review-box">

  <h3>⭐ Leave Review</h3>

  <select
    value={reviews[booking._id]?.rating || ""}
    onChange={(e) =>
      handleReviewChange(
        booking._id,
        "rating",
        Number(e.target.value)
      )
    }
  >
    <option value="">Select Rating</option>
    <option value={5}>⭐⭐⭐⭐⭐</option>
    <option value={4}>⭐⭐⭐⭐</option>
    <option value={3}>⭐⭐⭐</option>
    <option value={2}>⭐⭐</option>
    <option value={1}>⭐</option>
  </select>

  <textarea
    placeholder="Write your experience..."
    value={reviews[booking._id]?.comment || ""}
    onChange={(e) =>
      handleReviewChange(
        booking._id,
        "comment",
        e.target.value
      )
    }
  />

  <button
    className="review-btn"
    onClick={() => submitReview(booking._id)}
  >
    Submit Review
  </button>

</div>

)}
              <br />
              <br />

              {booking.status === "pending" && (

                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                >
                  Cancel Booking
                </button>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}