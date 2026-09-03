import { Link } from "react-router-dom";
import { FaRobot, FaHospital, FaArrowRight } from "react-icons/fa";
import { services } from "../data/hospitalData";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FaRobot />
            <span>Your Smart Healthcare Assistant</span>
          </div>

          <h1>
            Healthcare Information
            <span> Made Simple</span>
          </h1>

          <p>
            Get quick and reliable information about hospital services,
            departments, healthcare facilities, and more through our
            intelligent conversational assistant.
          </p>

          <div className="hero-buttons">
            <Link to="/chat" className="primary-btn">
              <FaRobot />
              Chat with AI
            </Link>

            <Link to="/departments" className="secondary-btn">
              <FaHospital />
              Explore Departments
            </Link>
          </div>
        </div>

        {/* CHATBOT PREVIEW */}
        <div className="hero-visual">
          <div className="ai-card">
            <FaRobot className="robot-icon" />

            <h2>HealthAI Assistant</h2>

            <div className="chat-preview">
              <div className="bot-message">
                👋 Hello! How can I assist you today?
              </div>

              <div className="user-message">
                What services does the hospital provide?
              </div>

              <div className="bot-message">
                I can help you find information about our services and
                departments.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="home-services">
        <div className="services-heading">
          <p className="section-tag">OUR SERVICES</p>

          <h2>Healthcare Services Designed for You</h2>

          <p>
            Explore some of the essential healthcare services available
            through our information system.
          </p>
        </div>

        <div className="home-services-grid">
          {services.map((service) => (
            <div className="home-service-card" key={service.id}>
              <h3>{service.title}</h3>

              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <Link to="/services" className="view-services-btn">
          View All Services
          <FaArrowRight />
        </Link>
      </section>
    </main>
  );
}

export default Home;