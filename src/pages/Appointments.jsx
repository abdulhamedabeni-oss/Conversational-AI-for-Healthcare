import "./Appointments.css";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";


function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/doctors/available`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load doctors."
          );
        }

        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);

        setMessage(
          "Unable to load available doctors at the moment."
        );
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;

    const doctor = doctors.find(
      (item) => item._id === doctorId
    );

    setSelectedDoctor(doctor || null);

    setFormData((previousData) => ({
      ...previousData,
      timeSlot: "",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDoctor) {
      setMessage("Please select a doctor.");
      return;
    }

    if (
      !formData.patientName.trim() ||
      !formData.patientEmail.trim() ||
      !formData.patientPhone.trim() ||
      !formData.appointmentDate ||
      !formData.timeSlot
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            doctorId: selectedDoctor._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to book appointment."
        );
      }

      setMessage(data.message);

      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        appointmentDate: "",
        timeSlot: "",
        reason: "",
      });

      setSelectedDoctor(null);
    } catch (error) {
      console.error("Appointment error:", error);

      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="appointments-page">
      <section className="appointments-header">
        <p className="section-tag">APPOINTMENTS</p>

        <h1>Book a Doctor Appointment</h1>

        <p>
          Select an available doctor, choose a suitable date and
          time, and submit your appointment request.
        </p>
      </section>

      <section className="appointments-container">
        <div className="doctor-panel">
          <h2>Available Doctors</h2>

          <select
            onChange={handleDoctorChange}
            value={selectedDoctor?._id || ""}
          >
            <option value="">
              Select a doctor
            </option>

            {doctors.map((doctor) => (
              <option
                key={doctor._id}
                value={doctor._id}
              >
                {doctor.name} - {doctor.department}
              </option>
            ))}
          </select>

          {selectedDoctor && (
            <div className="doctor-details">
              <h3>{selectedDoctor.name}</h3>

              <p>
                <strong>Department:</strong>{" "}
                {selectedDoctor.department}
              </p>

              <p>
                <strong>Specialization:</strong>{" "}
                {selectedDoctor.specialization}
              </p>

              <p>
                <strong>Available Days:</strong>{" "}
                {selectedDoctor.availableDays.join(", ")}
              </p>

              <p>
                <strong>Available Time Slots:</strong>
              </p>

              <div className="time-slots">
                {selectedDoctor.availableTimeSlots.map(
                  (slot) => (
                    <button
                      type="button"
                      key={slot}
                      className={
                        formData.timeSlot === slot
                          ? "time-slot selected"
                          : "time-slot"
                      }
                      onClick={() =>
                        setFormData((previousData) => ({
                          ...previousData,
                          timeSlot: slot,
                        }))
                      }
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >
          <h2>Appointment Details</h2>

          <div className="form-group">
            <label htmlFor="patientName">
              Full Name
            </label>

            <input
              id="patientName"
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientEmail">
              Email
            </label>

            <input
              id="patientEmail"
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientPhone">
              Phone Number
            </label>

            <input
              id="patientPhone"
              type="text"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">
              Appointment Date
            </label>

            <input
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Selected Time</label>

            <input
              type="text"
              value={formData.timeSlot}
              placeholder="Select a time slot"
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">
              Reason for Appointment
            </label>

            <textarea
              id="reason"
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Optional reason for the appointment"
            ></textarea>
          </div>

          {message && (
            <p className="appointment-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="book-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Booking..."
              : "Book Appointment"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Appointments;