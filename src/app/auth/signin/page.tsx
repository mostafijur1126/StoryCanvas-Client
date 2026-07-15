"use client";

import { Suspense } from "react";
import SignIn from "./signin";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
