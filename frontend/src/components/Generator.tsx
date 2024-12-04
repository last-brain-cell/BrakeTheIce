import React, { useState } from "react";
import ResponseCard from "./ResponseCard";
import Lottie from "lottie-react";
import factAnimation from "../animations/cat.json"; // Replace with your Lottie JSON file for facts
import pickupAnimation from "../animations/cool.json"; // Replace with your Lottie JSON file for pickup lines

const Generator: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateResponse = async (type: "fact" | "pickup-line") => {
    setLoading(true);
    setResponse("Thinking...");

    try {
      const response = await fetch("https://braketheice.onrender.com/generate", {
      // const response = await fetch("http://localhost:5001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: `short and cool ${type} only return the ${type} and no other text` }),
      });
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Brake the Ice!
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-md">
        <button
          onClick={() => generateResponse("fact")}
          className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:scale-105 transform transition-transform duration-300 focus:outline-none"
        >
          <div className="flex flex-col items-center">
            <Lottie
              animationData={factAnimation}
              loop
              style={{ width: "100px", height: "100px" }}
            />
            <span className="text-xl font-semibold text-gray-700 mt-2">
              Cool Fact
            </span>
          </div>
        </button>
        <button
          onClick={() => generateResponse("pickup-line")}
          className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:scale-105 transform transition-transform duration-300 focus:outline-none"
        >
          <div className="flex flex-col items-center">
            <Lottie
              animationData={pickupAnimation}
              loop
              style={{ width: "100px", height: "100px" }}
            />
            <span className="text-xl font-semibold text-gray-700 mt-2">
              Pickup Line
            </span>
          </div>
        </button>
      </div>
      {loading && (
        <p className="mt-6 text-white text-lg animate-pulse">Loading...</p>
      )}
      {response && (
        <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <ResponseCard response={response} />
        </div>
      )}
    </div>
  );
};

export default Generator;
