import React from "react";

interface ResponseCardProps {
  response: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ response }) => {
  return (
    <div className="mt-4 p-6 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
      <p className="text-xl font-semibold text-white text-center animate-fade-in">
        {response}
      </p>
    </div>
  );
};

export default ResponseCard;
