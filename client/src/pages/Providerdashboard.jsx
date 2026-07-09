import { useEffect, useState } from "react";
import API from "../services/api";
import "./ProviderDashboard.css";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
const navigate = useNavigate();

const [jobs, setJobs] = useState([]);

useEffect(() => {
fetchJobs();
}, []);

const fetchJobs = async () => {
try {
const token = localStorage.getItem("token");

  const res = await API.get(
    "/bookings/my-jobs",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  setJobs(res.data);

} catch (error) {
  console.log(error);
}


};
const updateTracking=async(status,id)=>{
  try{
    console.log("sending:",status);
    console.log(status);
    console.log(id);
    const token=localStorage.getItem("token");
  const res=  await API.patch(
      `/bookings/${id}/tracking`,
      {
        trackingStatus:status
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    console.log(res.data);
    fetchJobs();
  }
  catch(error){
    console.log("Error");
    console.log(error.response);
    console.log(error);
  }
};
const handleAccept = async (bookingId) => {
  try {

    const token = localStorage.getItem("token");

    await API.patch(
      `/bookings/${bookingId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Job Accepted");

    fetchJobs();

  } catch (error) {
    console.log(error);
    alert("Failed to accept job");
  }
};
const handleComplete = async (bookingId) => {
try {

  const token = localStorage.getItem("token");
await API.patch(
  `/bookings/${bookingId}/tracking`,
  {
    trackingStatus: "completed"
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
  await API.patch(
    `/bookings/${bookingId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Job Completed");
  fetchJobs();

} catch (error) {
  console.log(error);
  alert("Failed to complete job");
}


};

return ( <div className="dashboard-container">


  <h1 className="dashboard-title">
    Provider Dashboard
  </h1>

  <h2 className="welcome-text">
    Welcome {localStorage.getItem("name")}
  </h2>
<button
    className="review-btn"
    onClick={() => navigate("/provider-reviews")}
>
    ⭐ View My Reviews
</button>
  <h3>My Jobs</h3>

  {jobs.length === 0 ? (
    <p>No jobs assigned yet.</p>
  ) : (
    <div className="jobs-grid">

      {jobs.map((job) => (
        <div
          key={job._id}
          className="job-card"
        >

          <h4>{job.serviceId?.serviceName}</h4>

          <p>
            👤 Customer: {job.customerId?.name}
          </p>

          <p>
            📍 {job.address}
          </p>

          <p>
            📅 {new Date(
              job.bookingDate
            ).toLocaleDateString()}
          </p>

          <span
            className={`status ${job.status}`}
          >
            {job.status.toUpperCase()}
          </span>
<p
  style={{
    marginTop: "10px",
    color: "#2563eb",
    fontWeight: "bold"
  }}
>
Current Tracking :
{" "}
{job.trackingStatus
  ?.replaceAll("_", " ")
  .toUpperCase()}
</p>
          <br />
          <br />
    
{job.status === "pending" && (
  <button
    className="accept-btn"
    onClick={() => handleAccept(job._id)}
  >
    Accept Job
  </button>
)}

{job.status === "accepted" && job.trackingStatus === "confirmed" && (
  <button
    className="track-btn"
    onClick={() => updateTracking("on_the_way", job._id)}
  >
    🚗 On The Way
  </button>
)}

{job.status === "accepted" && job.trackingStatus === "on_the_way" && (
  <button
    className="track-btn"
    onClick={() => updateTracking("arrived", job._id)}
  >
    📍 Arrived
  </button>
)}

{job.status === "accepted" && job.trackingStatus === "arrived" && (
  <button
    className="track-btn"
    onClick={() => updateTracking("started", job._id)}
  >
    🛠 Start Work
  </button>
)}

{job.status === "accepted" && job.trackingStatus === "started" && (
  <button
    className="complete-btn"
    onClick={() => handleComplete(job._id)}
  >
    ✅ Complete Job
  </button>
)}
{job.status === "completed" && (
  <p
    style={{
      color: "green",
      fontWeight: "bold"
    }}
  >
     Job Completed
  </p>
)}

        </div>
      ))}

    </div>
  )}

</div>
);
}