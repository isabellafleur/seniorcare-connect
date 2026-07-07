import { useState } from "react";

function MedicationForm({ addMedication }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Morning");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !dosage || !time) {
      return;
    }

    addMedication({
      name,
      dosage,
      time,
      status: "Pending",
      category,
    });

    setName("");
    setDosage("");
    setTime("");
    setCategory("Morning");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add Medication</h2>

      <input
        type="text"
        placeholder="Medication Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />

      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <button type="submit">Add Medication</button>
    </form>
  );
}

export default MedicationForm;