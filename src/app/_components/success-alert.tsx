import { useEffect } from "react";

type SuccessAlertProps = {
  show: boolean;
  onClose: () => void;
};

export default function SuccessAlert({ show, onClose }: SuccessAlertProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white transition-all duration-500 ease-in-out ${
        show
          ? "bg-green-500 transform translate-y-0 opacity-100"
          : "bg-transparent transform -translate-y-full opacity-0"
      }`}
    >
      <p>Your message has been sent!</p>
    </div>
  );
}
