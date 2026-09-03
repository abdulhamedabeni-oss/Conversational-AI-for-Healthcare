import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSuccessMessage("Please fill in all fields.");
      return;
    }

    // Show success message
    setSuccessMessage(
      "Thank you! Your message has been sent successfully."
    );

    // Clear the form
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Remove the message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <main className="contact-page">
      {/* Header */}
      <section className="contact-header">
        <p className="section-tag">CONTACT US</p>

        <h1>We're Here to Help</h1>

        <p>
          Have a question about our healthcare information services?
          Get in touch with us.
        </p>
      </section>

      <section className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            Contact us for more information about hospital services,
            departments, and healthcare facilities.
          </p>

          <div className="contact-item">
            <FaPhone className="contact-icon" />

            <div>
              <h3>Phone</h3>
              <p>+234 800 000 0000</p>
            </div>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />

            <div>
              <h3>Email</h3>
              <p>info@healthai.com</p>
            </div>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />

            <div>
              <h3>Location</h3>
              <p>Nigeria</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {successMessage && (
            <p className="form-message">
              {successMessage}
            </p>
          )}

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contact;