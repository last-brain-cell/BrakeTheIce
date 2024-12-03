import React from "react";
import Generator from "./components/Generator";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md px-4 py-6 bg-white shadow-md rounded-lg overflow-y-scroll">
        <h1 className="text-2xl font-bold text-center mb-4">
        </h1>
        <Generator />
      </div>
    </div>
  );
};

export default App;
