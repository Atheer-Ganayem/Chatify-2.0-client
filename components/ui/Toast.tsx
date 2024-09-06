import { XIcon } from "lucide-react";
import React, { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="custom-toast bg-secondary text-white w-fit fixed top-20 right-2 lg:right-20 min-w-40 flex justify-between gap-5 items-center px-5 py-2 text-lg rounded-lg shadow-xl">
      <p>{message}</p>
      <button onClick={onClose}>
        <XIcon />
      </button>
    </div>
  );
};

export default Toast;
