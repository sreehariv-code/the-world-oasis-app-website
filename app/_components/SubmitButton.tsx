"use client";
import { useFormStatus } from "react-dom";
//Usage of useFormStatus
//useFormStatus is a react-dom hook, not a react hook

//It is now in experimental state
export default function SubmitButton({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel?: string; //optional prop for pending label when the form is pending submission
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
