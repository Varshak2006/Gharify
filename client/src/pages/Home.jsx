import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {

  const [stats, setStats] = useState({
    services: 0,
    providers: 0,
    customers: 0,
    bookings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const serviceRes = await API.get("/services");

      const userRes = await API.get(
        "/auth/all-users-public"
      );

      const bookingRes = await API.get(
        "/bookings/public-count"
      );

      const providers = userRes.data.filter(
        user => user.role === "provider"
      ).length;

      const customers = userRes.data.filter(
        user => user.role === "customer"
      ).length;

      setStats({
        services: serviceRes.data.length,
        providers,
        customers,
        bookings: bookingRes.data.totalBookings
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <section className="hero">

        <h1>GHARIFY</h1>

        <p>Home Services At Your Doorstep</p>

        <p>
          Book trusted electricians, plumbers,
          tutors, cooks, babysitters and more.
        </p>

        <Link
          to="/services"
          className="hero-btn"
        >
          Explore Services
        </Link>

      </section>

      <section className="stats-section">

        <div className="stats-grid">

          <div className="stats-card">
            <h2>{stats.services}</h2>
            <p>Services</p>
          </div>

          <div className="stats-card">
            <h2>{stats.providers}</h2>
            <p>Providers</p>
          </div>

          <div className="stats-card">
            <h2>{stats.customers}</h2>
            <p>Customers</p>
          </div>

          <div className="stats-card">
            <h2>{stats.bookings}</h2>
            <p>Bookings</p>
          </div>

        </div>

      </section>

      <section className="features">

        <h2>Popular Services</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <img
              src="/images/electrician.jpg"
              alt="Electrician"
              className="feature-image"
            />
            <h3>Electrician</h3>
          </div>

          <div className="feature-card">
            <img
              src="/images/plumber.jpg"
              alt="Plumber"
              className="feature-image"
            />
            <h3>Plumber</h3>
          </div>

          <div className="feature-card">
            <img
              src="/images/babysitter.jpg"
              alt="Baby Sitter"
              className="feature-image"
            />
            <h3>Baby Sitter</h3>
          </div>

          <div className="feature-card">
            <img
              src="/images/cleaning.jpg"
              alt="Cleaning"
              className="feature-image"
            />
            <h3>Cleaning</h3>
          </div>

        </div>

      </section>

      <section className="why-us">

        <h2>Why Choose Gharify?</h2>

        <ul>
          <li>✅ Verified Professionals</li>
          <li>✅ Quick Booking</li>
          <li>✅ Affordable Pricing</li>
          <li>✅ Trusted Services</li>
        </ul>

      </section>
<section className="testimonials">

  <h2 className="ques">What Our Customers Say</h2>

  <div className="testimonial-grid">

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>

      <p>
        "Excellent electrician service. Very professional and arrived on time."
      </p>

      <h4>- Rahul</h4>
    </div>

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>

      <p>
        "Booking was very easy and the cleaner did an amazing job."
      </p>

      <h4>- Varsha</h4>
    </div>

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>

      <p>
        "Affordable prices and trusted professionals. Highly recommended!"
      </p>

      <h4>- Sneha</h4>
    </div>

  </div>
<section className="contact">
  <h2 className="contact-us">Contact us</h2>
  <p>We'd love to hear from you!</p>
  <div className="contact-container">
    <div className="contact-info">
      <h3>Address</h3>
      <p>Nagpur,Maharashtra,India</p>

      <h3>Phone</h3>
      <p>8421161543</p>
      <h3>Email</h3>
      <p>support@gharify.com</p>

    </div>
    <form className="contact-form">
      <input type="text" placeholder="Your Name"/><br/>
      <input type="email" placeholder="Your Email"/><br/>
<textarea rows="5" placeholder="Your Message"></textarea>
<button type="submit">Send Message</button>
    </form>
  </div>
</section>
</section>
      <footer className="footer">
        <h3>© 2026 Gharify</h3>
        <p>All Home Services In One Place</p>
      </footer>

    </div>
  );
}