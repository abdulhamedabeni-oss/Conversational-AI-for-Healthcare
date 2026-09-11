import API_BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import {
  FaHospital,
  FaBullseye,
  FaEye,
  FaRobot,
} from "react-icons/fa";
import "./About.css";

function About() {
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await fetchfetch(`${API_BASE_URL}/api/hospital`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch hospital information."
          );
        }

        setHospitalInfo(data);
      } catch (error) {
        console.error(
          "Error fetching hospital information:",
          error
        );

        setError(
          "Unable to load hospital information at the moment."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalInfo();
  }, []);

  if (loading) {
    return (
      <main className="about-page">
        <p>Loading hospital information...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="about-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="about-page">
      {/* Header */}
      <section className="about-hero">
        <p className="about-tag">ABOUT US</p>

        <h1>Healthcare Information Made Easier</h1>

        <p className="about-intro">
          Learn more about our healthcare information system and how
          HealthAI helps users access important hospital information quickly.
        </p>
      </section>

      {/* Hospital Information */}
      <section className="about-section">
        <div className="about-icon">
          <FaHospital />
        </div>

        <div className="about-content">
          <h2>About {hospitalInfo.name}</h2>

          <p>{hospitalInfo.tagline}</p>

          <p>
            Our healthcare information system is designed to make it easier
            for patients, visitors, and members of the public to access
            important information about hospital services and facilities.
          </p>

          <p>
            <strong>Location:</strong> {hospitalInfo.address}
          </p>

          <p>
            <strong>Opening Hours:</strong>{" "}
            {hospitalInfo.openingHours}
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <div className="about-card">
          <FaBullseye className="about-card-icon" />

          <h2>Our Mission</h2>

          <p>
            To provide users with quick, reliable, and accessible healthcare
            information through a simple and intelligent digital platform.
          </p>
        </div>

        <div className="about-card">
          <FaEye className="about-card-icon" />

          <h2>Our Vision</h2>

          <p>
            To improve access to healthcare information and create a better
            digital experience for patients and hospital visitors.
          </p>
        </div>
      </section>

      {/* HealthAI */}
      <section className="healthai-section">
        <div className="healthai-icon">
          <FaRobot />
        </div>

        <div>
          <h2>Meet HealthAI 🤖</h2>

          <p>
            HealthAI is a conversational healthcare information assistant
            designed to answer common questions about hospital services,
            departments, contact information, location, and opening hours.
          </p>

          <p>
            Our goal is to make healthcare information easier to find,
            understand, and access.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;