// ToastContext.tsx
import React, { createContext, useState, useContext } from "react";
import Toast from "@/components/ui/Toast";

interface ToastContextProps {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<string>("");

  const addToast = (message: string) => {
    setToast(message);
  };

  const removeToast = () => {
    setToast("");
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toast && <Toast message={toast} onClose={removeToast} />}
    </ToastContext.Provider>
  );
};
