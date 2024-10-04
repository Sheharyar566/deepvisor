import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

import React from "react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SessionProvider } from "next-auth/react";
import ApiProvider from "@/components/QueryClientProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-dvh dark:bg-boxdark-2 dark:text-bodydark">
          <ApiProvider>
            <SessionProvider session={session}>
              <DefaultLayout>{children}</DefaultLayout>
            </SessionProvider>
          </ApiProvider>
        </div>
      </body>
    </html>
  );
}
