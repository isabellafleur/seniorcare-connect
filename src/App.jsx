import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MedicationForm from "./components/MedicationForm";
import MedicationList from "./components/MedicationList";
import "./App.css";

function App() {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedications();
  }, []);

  function fetchMedications() {
    fetch("http://localhost:3001/api/medications")
      .then((response) => response.json())
      .then((data) => setMedications(data))
      .catch((error) => console.error("Error loading medications:", error));
  }

  function addMedication(newMedication) {
    fetch("http://localhost:3001/api/medications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMedication),
    })
      .then((response) => response.json())
      .then((data) => setMedications([...medications, data]))
      .catch((error) => console.error("Error adding medication:", error));
  }

  function deleteMedication(id) {
    fetch(`http://localhost:3001/api/medications/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMedications(
          medications.filter((medication) => medication.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting medication:", error));
  }

  function markAsTaken(id) {
    const medicationToUpdate = medications.find(
      (medication) => medication.id === id
    );

    const updatedMedication = {
      ...medicationToUpdate,
      status: "Taken",
    };

    fetch(`http://localhost:3001/api/medications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMedication),
    })
      .then((response) => response.json())
      .then((data) => {
        setMedications(
          medications.map((medication) =>
            medication.id === id ? data : medication
          )
        );
      })
      .catch((error) => console.error("Error updating medication:", error));
  }

  function editMedication(id, updatedMedicationInfo) {
    const currentMedication = medications.find(
      (medication) => medication.id === id
    );

    const updatedMedication = {
      ...currentMedication,
      ...updatedMedicationInfo,
    };

    fetch(`http://localhost:3001/api/medications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMedication),
    })
      .then((response) => response.json())
      .then((data) => {
        setMedications(
          medications.map((medication) =>
            medication.id === id ? data : medication
          )
        );
      })
      .catch((error) => console.error("Error editing medication:", error));
  }

  const filteredMedications = medications.filter((medication) =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMedications = medications.length;
  const takenMedications = medications.filter(
    (medication) => medication.status === "Taken"
  ).length;
  const pendingMedications = medications.filter(
    (medication) => medication.status === "Pending"
  ).length;

  return (
    <div className="app">
      <Header />
      <Navbar />

      <section className="welcome-card" id="home">
        <h2>Welcome Back!</h2>
        <p>
          Here is your daily healthcare reminder dashboard. Manage medications,
          appointments, and caregiver information all in one place.
        </p>
      </section>

      <section className="summary-section">
        <div className="summary-card">
          <h3>💊 Total Medications</h3>
          <p>{totalMedications}</p>
        </div>

        <div className="summary-card">
          <h3>✅ Taken Today</h3>
          <p>{takenMedications}</p>
        </div>

        <div className="summary-card">
          <h3>⏰ Pending</h3>
          <p>{pendingMedications}</p>
        </div>

        <div className="summary-card">
          <h3>📅 Appointments</h3>
          <p>2</p>
        </div>
      </section>

      <MedicationForm addMedication={addMedication} />

      <section className="search-card">
        <h2>Search Medications</h2>
        <input
          type="text"
          placeholder="Search by medication name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <div id="medications">
        <MedicationList
          medications={filteredMedications}
          deleteMedication={deleteMedication}
          markAsTaken={markAsTaken}
          editMedication={editMedication}
        />
      </div>

      <section id="appointments" className="section-card">
        <h2>Upcoming Appointments</h2>

        <div className="appointment-card">
          <h3>Dr. Smith</h3>
          <p><strong>Date:</strong> June 30, 2026</p>
          <p><strong>Time:</strong> 2:00 PM</p>
          <p><strong>Location:</strong> Family Health Clinic</p>
          <p><strong>Reason:</strong> Wellness Checkup</p>
        </div>

        <div className="appointment-card">
          <h3>Dr. Adams</h3>
          <p><strong>Date:</strong> July 8, 2026</p>
          <p><strong>Time:</strong> 9:30 AM</p>
          <p><strong>Location:</strong> Heart Care Center</p>
          <p><strong>Reason:</strong> Cardiology Follow-Up</p>
        </div>
      </section>

      <section id="caregivers" className="section-card">
        <h2>Caregiver Support</h2>

        <div className="caregiver-card">
          <h3>Primary Caregiver</h3>
          <p><strong>Name:</strong> Sarah Johnson</p>
          <p><strong>Relationship:</strong> Daughter</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> sarah@email.com</p>
        </div>

        <div className="caregiver-card emergency">
          <h3>Emergency Contact</h3>
          <p><strong>Name:</strong> John Johnson</p>
          <p><strong>Phone:</strong> (555) 222-1111</p>
          <p><strong>Relationship:</strong> Son</p>
        </div>
      </section>

      <section className="section-card">
        <h2>Today's Health Tip</h2>
        <p>
          Remember to drink water throughout the day and take medications at the
          scheduled times. Keeping a consistent routine can help improve daily
          health management.
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