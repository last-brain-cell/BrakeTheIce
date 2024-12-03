import React from "react";

interface ResponseCardProps {
  response: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ response }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <p className="text-lg text-gray-800">{response}</p>
    </div>
  );
};

export default ResponseCard;
