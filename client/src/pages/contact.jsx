import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you for contacting Gharify! We will get back to you soon.");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="contact-page">

            <section className="contact-hero">
                <h1>Get in Touch</h1>
                <p>
                    Have a question, need help with a booking, or want to know
                    more about Gharify? We're here to help.
                </p>
            </section>

            <section className="contact-section">

                <div className="contact-info">

                    <h2>Contact Us</h2>

                    <p>
                        Whether you need assistance with a service booking or
                        have feedback for us, feel free to reach out.
                    </p>

                    <div className="contact-item">
                        <span>📍</span>
                        <div>
                            <h3>Location</h3>
                            <p>Pune, Maharashtra, India</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span>📧</span>
                        <div>
                            <h3>Email</h3>
                            <p>support@gharify.com</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span>📞</span>
                        <div>
                            <h3>Phone</h3>
                            <p>+91 1800 123 4567</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span>🕐</span>
                        <div>
                            <h3>Working Hours</h3>
                            <p>Monday – Saturday</p>
                            <p>9:00 AM – 6:00 PM</p>
                        </div>
                    </div>

                </div>

                <div className="contact-form-container">

                    <h2>Send Us a Message</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter subject"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="contact-button">
                            Send Message
                        </button>

                    </form>

                </div>

            </section>

            <section className="contact-help">

                <h2>We're Here to Help</h2>

                <p>
                    From finding the right professional to managing your
                    bookings, Gharify makes home services simple, reliable,
                    and convenient.
                </p>

            </section>

        </div>
    );
}