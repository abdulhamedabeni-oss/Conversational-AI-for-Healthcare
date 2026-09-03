import { departments } from "../data/hospitalData";
import "./Departments.css";

function Departments() {
  return (
    <main className="departments-page">
      <section className="departments-header">
        <p className="section-tag">OUR DEPARTMENTS</p>

        <h1>Find the Right Department</h1>

        <p>
          Explore the different hospital departments and learn about the
          healthcare services they provide.
        </p>
      </section>

      <section className="departments-grid">
        {departments.map((department) => (
          <div className="department-card" key={department.id}>
            <h2>{department.name}</h2>

            <p>{department.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Departments;