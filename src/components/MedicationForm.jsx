import { useState } from "react";

function MedicationForm({ addMedication }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !dosage || !time) return;

    addMedication({
      id: Date.now(),
      name,
      dosage,
      time,
      status: "Pending",
    });

    setName("");
    setDosage("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="welcome-card">
      <h2>Add Medication</h2>

      <input
        type="text"
        placeholder="Medication Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button type="submit">
        Add Medication
      </button>
    </form>
  );
}

export default MedicationForm;