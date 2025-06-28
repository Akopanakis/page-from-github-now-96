import React from "react";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmptyStateProps {
  messageKey: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ messageKey, icon }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-sm text-gray-600">
      {icon ? icon : <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />}
      <p>{t(messageKey)}</p>
    </div>
  );
};

export default EmptyState;
