import { AlertTriangle } from "lucide-react";
import React from "react";

interface Props {
  variat: "error" | "success";
  children: React.ReactNode | string;
}

const Alert: React.FC<Props> = ({ variat, children }) => {
  const errorClass = "bg-red-200 text-red-700";
  const successClass = "bg-green-200 text-green-700";

  return (
    <div
      className={`${
        variat === "error" ? errorClass : successClass
      } py-2 px-4 rounded-lg flex gap-2 font-bold`}
    >
      <AlertTriangle className={variat === "error" ? "text-red-500" : "text-green-500"} />{" "}
      {children}
    </div>
  );
};

export default Alert;
