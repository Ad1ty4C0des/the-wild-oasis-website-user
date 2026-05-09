"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="glass-panel-subtle rounded-xl py-8 px-8 flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
          Full name
        </label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <label className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
          Email address
        </label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="nationality"
            className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider"
          >
            Where are you from?
          </label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="nationalID"
          className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider"
        >
          National ID number
        </label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel={"Updating..."}>Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
