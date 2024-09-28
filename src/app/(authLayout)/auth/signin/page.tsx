import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInPage from ".";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Deepvisor",
  description: "Create an account at Deepvisor",
};

const SignIn: React.FC = async () => {
  const isLoggedIn = await auth();

  if (isLoggedIn) {
    redirect("/");
  }

  return <SignInPage />;
};

export default SignIn;
