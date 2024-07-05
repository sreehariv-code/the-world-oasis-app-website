"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import { Guest } from "../_lib/types/Profile";
import SubmitButton from "./SubmitButton";

interface FormProps {
  children?: React.ReactNode;
  guest?: Guest;
}

export default function UpdateProfileForm({ children, guest }: FormProps) {
  const [count, setCount] = useState(0);

  const { countryFlag, fullName, email, nationalID, nationality } = guest || {};

  return (
    <form
      action={(formData: FormData) => updateGuest(formData)}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          placeholder="Name"
          defaultValue={fullName}
          disabled
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          placeholder="Email"
          name="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag || ""}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          placeholder="National ID number"
          defaultValue={nationalID || ""}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        {/* useFormStatus can only be used in a component that is rendered inside a form */}
        {/* Only client components have access to useFormStatus hook. So the parent element should be using 'use client' directive. To use it in a form in server component, we have to create the Button as a different export component with 'use client' directive */}
        <SubmitButton pendingLabel="Updating....">Update profile</SubmitButton>
      </div>
    </form>
  );
}
