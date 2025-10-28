import React from "react";

const ProductCard = ({ patient, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border">
      <h2 className="text-xl font-bold">{patient.name}</h2>
      <p className="text-gray-600"> ID: {patient.id}</p>
      <p className="text-gray-700"> Disease: {patient.disease}</p>
      <button
        onClick={() => onRemove(patient.id)}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
