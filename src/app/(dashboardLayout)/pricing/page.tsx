"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PricingOption from "./item";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import API from "@/api";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PricingPage = () => {
  const { mutate } = useMutation({
    mutationFn: (plan: "BASIC" | "PREMIUM") =>
      API.post<undefined, { redirectURL: string }>(
        "/api/stripe/create-checkout-session",
        {
          plan,
        },
      ),
    onSuccess: ({ redirectURL }) => {
      window.location.href = redirectURL;
    },
  });

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready.",
      );
    }
  }, []);

  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Pricing" />

      <div className="flex grid-cols-2 flex-col place-items-stretch items-center gap-6 lg:grid">
        <PricingOption
          id="01"
          type="FREE"
          pricing="$0"
          description="Unlock the essentials of cybersecurity with our Free AI Risk Assessment. Gain a high-level overview of your organization's security posture, identifying key vulnerabilities and compliance gaps"
          features={[
            "High-Level Risk Analysis",
            "Quick Turnaround Reporting: 5 - 10 minutes",
            "Security Vulnerability Detection",
            "Regulatory Compliance Check",
            "Data Privacy Evaluation",
            "Basic Mitigation Strategies",
          ]}
          buttonText="Start Now"
          onButtonClick={() => mutate("BASIC")}
        />

        <PricingOption
          id="02"
          type="PREMIUM"
          pricing="$500"
          featured
          description="Get a comprehensive cybersecurity evaluation with our Premium AI Risk Assessment, featuring in-depth analysis reviewed and signed off by certified security professionals."
          features={[
            "Expert Analysis and Sign off",
            "Quick Turnaround Reporting: 1-3 days. (5x faster than traditional consulting firms)",
            "Advanced Vulnerability Detection",
            "Comprehensive Compliance Assessment",
            "Highly Customized Mitigation Strategies",
            "Detailed Reporting",
          ]}
          onButtonClick={() => mutate("PREMIUM")}
          buttonText="Upgrade to premium"
        />
      </div>
    </div>
  );
};

export default PricingPage;
