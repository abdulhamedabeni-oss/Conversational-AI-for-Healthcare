import { services } from "../data/hospitalData";
import "./Services.css";

function Services() {
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
          <div className="service-card" key={service.id}>
            <h2>{service.title}</h2>

            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Services;