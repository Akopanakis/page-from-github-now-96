import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "Δεν υπάρχουν δεδομένα",
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-sm text-gray-600">
      {icon ? icon : <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />}
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
