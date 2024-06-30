"use server";

import { signIn, signOut } from "./auth";

interface FormDataEntry {
  name?: string | null;
  value?: string | null;
}

type FormData = FormDataEntry[];

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateGuest(formData: FormData) {
  console.log(formData);
}
