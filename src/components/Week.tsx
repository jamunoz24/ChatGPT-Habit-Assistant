import React from "react";

const Week: React.FC<{ habitPlan: any }> = ({ habitPlan }) => {

  if (!habitPlan) return;

  return (
  <div className="flex justify-center space-x-2 p-4">
    {Object.entries(habitPlan.frequency).map(([day, isActive]) => (
      <div key={day} className="flex flex-col items-center">
        <span className="mb-2 text-white font-medium">{day.toUpperCase()}</span>
        <div className={`w-16 h-16 border border-gray-300 rounded-lg ${isActive ? "bg-blue-500" : ''}`}></div>
      </div>
    ))}
  </div>
  );
}

export default Week;