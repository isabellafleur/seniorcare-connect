import MedicationCard from "./MedicationCard";

function MedicationList({ medications, deleteMedication }) {
  return (
    <section>
      <h2>Today's Medications</h2>

      {medications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          deleteMedication={deleteMedication}
        />
      ))}
    </section>
  );
}

export default MedicationList;