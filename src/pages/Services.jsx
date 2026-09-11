import API_BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch services."
          );
        }

        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);

        setError(
          "Unable to load healthcare services at the moment."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <main className="services-page">
        <p>Loading services...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="services-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="services-page">
      <section className="services-header">
        <p className="section-tag">OUR SERVICES</p>

        <h1>Healthcare Services Designed for You</h1>

        <p>
          Explore some of the essential healthcare services available
          through our information system.
        </p>
      </section>

      <section className="services-container">
        {services.map((service) => (
          <div className="service-card" key={service._id}>
            <h2>{service.title}</h2>

            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Services;