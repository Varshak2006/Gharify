import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";
import {Bar} from "react-chartjs-2";
import{Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function AdminDashboard() {

const [users, setUsers] = useState([]);
const [bookings, setBookings] = useState([]);
const [analytics, setAnalytics] = useState({});
useEffect(() => {
fetchUsers();
fetchBookings();
fetchAnalytics();
}, []);

const fetchUsers = async () => {
      try {
      
        const token = localStorage.getItem("token");
      
        const res = await API.get(
          "/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      
        setUsers(res.data);
      
      } catch (error) {
        console.log(error);
      }
      
};

const fetchBookings = async () => {
    try {
    
    
      const token = localStorage.getItem("token");
    
      const res = await API.get(
        "/bookings/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    
      setBookings(res.data);
    
    } catch (error) {
      console.log(error);
    }
     
};

const fetchAnalytics = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await API.get(
            "/analytics",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setAnalytics(res.data);

    }

    catch (error) {

        console.log(error);

    }

};


const customerCount =
users.filter(
user => user.role === "customer"
).length;

const providerCount =
users.filter(
user => user.role === "provider"
).length;

const bookingCount = bookings.length;
const chartData = {
  labels: [
    "Users",
    "Services",
    "Bookings",
    "Reviews"
  ],
  datasets: [
    {
      label: "Gharify Analytics",
      data: [
        analytics.totalUsers || 0,
        analytics.totalServices || 0,
        analytics.totalBookings || 0,
        analytics.totalReviews || 0
      ],
      backgroundColor: [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444"
      ]
    }
  ]
};
return ( <div className="dashboard-container">
<div className="analytics-grid">

    <div className="analytics-card">
        <h2>{analytics.totalUsers}</h2>
        <p>Total Users</p>
    </div>

    <div className="analytics-card">
        <h2>{analytics.totalServices}</h2>
        <p>Total Services</p>
    </div>

    <div className="analytics-card">
        <h2>{analytics.totalBookings}</h2>
        <p>Total Bookings</p>
    </div>

    <div className="analytics-card">
        <h2>{analytics.totalReviews}</h2>
        <p>Total Reviews</p>
    </div>

    <div className="analytics-card">
        <h2>₹{analytics.revenue}</h2>
        <p>Total Revenue</p>
    </div>

</div>
<div className="chart-container">

  <h2>📊 Gharify Analytics Overview</h2>

  <Bar data={chartData} />

</div>
  <h1 className="dashboard-title">
    Admin Dashboard
  </h1>

  <div className="stats-grid">

    <div className="stat-card">
      <h3>Customers</h3>
      <h2>{customerCount}</h2>
    </div>

    <div className="stat-card">
      <h3>Providers</h3>
      <h2>{providerCount}</h2>
    </div>

    <div className="stat-card">
      <h3>Bookings</h3>
      <h2>{bookingCount}</h2>
    </div>

    <div className="stat-card">
      <h3>Users</h3>
      <h2>{users.length}</h2>
    </div>

  </div>

  <h2 className="section-title">
    All Users
  </h2>

  {users.length === 0 ? (
    <p>No users found.</p>
  ) : (
    <div className="card-grid">

      {users.map((user) => (
        <div
          key={user._id}
          className="info-card"
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}

    </div>
  )}

  <h2 className="section-title">
    All Bookings
  </h2>

  {bookings.length === 0 ? (
    <p>No bookings found.</p>
  ) : (
    <div className="card-grid">

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="info-card"
        >

          <p>
            Customer:
            {booking.customerId?.name}
          </p>

          <p>
            Service:
            {booking.serviceId?.serviceName}
          </p>
{booking.serviceGroup && booking.subService && (
  <div className="booking-service-details">
    <p>
      🔧 <strong>Type:</strong> {booking.serviceGroup}
    </p>

    <p>
      🛠 <strong>Work:</strong> {booking.subService}
    </p>
  </div>
)}
          <p>
            Address:
            {booking.address}
          </p>

          <p>
            📅 {new Date(
              booking.bookingDate
            ).toLocaleDateString()}
          </p>

          <span
            className={`status ${booking.status}`}
          >
            {booking.status.toUpperCase()}
          </span>

        </div>
      ))}

    </div>
  )}

</div>

);
}
