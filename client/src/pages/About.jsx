import "./About.css";
export default function About(){
    return(
        <div className="about-container">
            <section className="about-hero">
                <h1>About Gharify</h1>
                <p>
                    Gharify is a one stop platform that connects customers with trusted home service professionals quickly, safely, and conveniently.
                </p>
            </section>
            <section className="about-section">
                <div className="about-card">
                    <h2>Our Mission</h2>
                    <p>To simplify home service booking by connecting customers with verified professionals through a secure and user-friendly platform.</p>
                </div>
                <div className="about-card">
                    <h2>Our Vision</h2>
                    <p>To become India's most trusted home service marketplace by provdiding reliable, affordable and high-quality services.</p>
                </div>
                <div className="about-card">
                    <h2>Why Gharify?</h2>
                    <ul>
                        <li>Verifed Service Providers</li>
                        <li>Easy online Booking</li>
                        <li>Affordable Pricing</li>
                        <li>Fast & Reliable services</li>
                        <li>Customer Satisfaction</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}