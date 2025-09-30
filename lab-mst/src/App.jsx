
import React, { useState } from "react";
import PatientCard from "./Components/ProductCard.jsx";

const App = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "Jaman", disease: "Flu" },
    { id: 2, name: "Kanan", disease: "Malaria" },
    { id: 3, name: "Rahul", disease: "Diabetes" },
  ]);

  const removePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onRemove={removePatient}
        />
      ))}
    </div>
  );
};

export default App;
