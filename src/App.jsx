import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MedicationForm from "./components/MedicationForm";
import MedicationList from "./components/MedicationList";
import "./App.css";

function App() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Blood Pressure Medicine",
      dosage: "1 Tablet",
      time: "8:00 AM",
      status: "Taken",
    },
    {
      id: 2,
      name: "Vitamin D",
      dosage: "1 Capsule",
      time: "12:00 PM",
      status: "Taken",
    },
    {
      id: 3,
      name: "Heart Medication",
      dosage: "1 Tablet",
      time: "9:00 PM",
      status: "Pending",
    },
  ]);

  function addMedication(newMedication) {
    setMedications([...medications, newMedication]);
  }

  function deleteMedication(id) {
    setMedications(
      medications.filter((medication) => medication.id !== id)
    );
  }

  return (
    <div className="app">
      <Header />

      <Navbar />

      <section className="welcome-card">
        <h2>Welcome Back!</h2>
        <p>
          Here is your daily healthcare reminder dashboard. Manage your
          medications, appointments, and caregiver information all in one
          place.
        </p>
      </section>

      <MedicationForm addMedication={addMedication} />

      <div id="medications">
        <MedicationList
          medications={medications}
          deleteMedication={deleteMedication}
        />
      </div>

      <section id="appointments" className="appointment-card">
        <h2>Upcoming Appointment</h2>

        <p>
          <strong>Doctor:</strong> Dr. Smith
        </p>

        <p>
          <strong>Date:</strong> June 30, 2026
        </p>

        <p>
          <strong>Time:</strong> 2:00 PM
        </p>

        <p>
          <strong>Location:</strong> Family Health Clinic
        </p>
      </section>

      <footer className="footer">
        <p>© 2026 SeniorCare Connect</p>
        <p>Helping Seniors Stay Healthy & Organized</p>
      </footer>
    </div>
  );
}

export default App;