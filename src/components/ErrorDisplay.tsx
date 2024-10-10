// src/components/ErrorDisplay.tsx
import React from "react";
import { AiOutlineWarning } from "react-icons/ai"; // Warning icon

interface ErrorDisplayProps {
  error: string;
  retryAction?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, retryAction }) => {
  return (
    <div
      className="flex flex-col items-center p-6 mb-4 bg-red-50 border-l-4  text-red-700 rounded-lg shadow-md max-w-md mx-auto"
      role="alert"
    >
      <div className="flex items-center mb-4">
        <AiOutlineWarning className="text-red-600 h-8 w-8 mr-2" />
        <h2 className="font-bold text-xl">Error</h2>
      </div>
      <p className="text-center text-sm mb-4">{error}</p>
      {retryAction && (
        <button
          className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 px-4 py-2 rounded-lg transition"
          onClick={retryAction}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
