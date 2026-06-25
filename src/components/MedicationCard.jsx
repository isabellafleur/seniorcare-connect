function MedicationCard({ medication, deleteMedication }) {
  return (
    <div className="medication-card">
      <h3>{medication.name}</h3>

      <p><strong>Dosage:</strong> {medication.dosage}</p>
      <p><strong>Time:</strong> {medication.time}</p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={`status-badge ${medication.status.toLowerCase()}`}>
          {medication.status}
        </span>
      </p>

      <button
        className="delete-button"
        onClick={() => deleteMedication(medication.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default MedicationCard;