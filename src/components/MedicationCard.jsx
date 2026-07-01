import { useState } from "react";

function MedicationCard({
  medication,
  deleteMedication,
  markAsTaken,
  editMedication,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(medication.name);
  const [editedDosage, setEditedDosage] = useState(medication.dosage);
  const [editedTime, setEditedTime] = useState(medication.time);
  const [editedCategory, setEditedCategory] = useState(medication.category);

  function handleSave() {
    editMedication(medication.id, {
      name: editedName,
      dosage: editedDosage,
      time: editedTime,
      category: editedCategory,
    });

    setIsEditing(false);
  }

  return (
    <div className="medication-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />

          <input
            type="text"
            value={editedDosage}
            onChange={(e) => setEditedDosage(e.target.value)}
          />

          <input
            type="text"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
          />

          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>

          <button onClick={handleSave}>Save</button>

          <button
            className="secondary-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{medication.name}</h3>
          <p><strong>Dosage:</strong> {medication.dosage}</p>
          <p><strong>Time:</strong> {medication.time}</p>
          <p><strong>Category:</strong> {medication.category}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${medication.status.toLowerCase()}`}>
              {medication.status}
            </span>
          </p>

          <button onClick={() => markAsTaken(medication.id)}>
            Mark as Taken
          </button>

          <button
            className="secondary-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => deleteMedication(medication.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default MedicationCard;