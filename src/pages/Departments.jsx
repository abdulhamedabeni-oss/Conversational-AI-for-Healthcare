import API_BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import "./Departments.css";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/departments`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch departments."
          );
        }

        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);

        setError(
          "Unable to load hospital departments at the moment."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <main className="departments-page">
        <p>Loading departments...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="departments-page">
        <p>{error}</p>
      </main>
    );
  }

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
          <div className="department-card" key={department._id}>
            <h2>{department.name}</h2>

            <p>{department.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Departments;