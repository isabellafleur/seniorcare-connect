import MedicationCard from "./MedicationCard";

function MedicationList({
  medications,
  deleteMedication,
  markAsTaken,
  editMedication,
}) {
  const morningMeds = medications.filter((med) => med.category === "Morning");
  const afternoonMeds = medications.filter((med) => med.category === "Afternoon");
  const eveningMeds = medications.filter((med) => med.category === "Evening");

  function renderMedicationGroup(title, medicationGroup) {
    return (
      <section className="medication-group">
        <h2>{title}</h2>

        {medicationGroup.length === 0 ? (
          <p className="empty-message">No medications in this section.</p>
        ) : (
          medicationGroup.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              deleteMedication={deleteMedication}
              markAsTaken={markAsTaken}
              editMedication={editMedication}
            />
          ))
        )}
      </section>
    );
  }

  return (
    <section>
      <h2>Today's Medications</h2>

      {medications.length === 0 ? (
        <p className="empty-message">No medications found.</p>
      ) : (
        <>
          {renderMedicationGroup("🌅 Morning", morningMeds)}
          {renderMedicationGroup("☀️ Afternoon", afternoonMeds)}
          {renderMedicationGroup("🌙 Evening", eveningMeds)}
        </>
      )}
    </section>
  );
}

export default MedicationList;