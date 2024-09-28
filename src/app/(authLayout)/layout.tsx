import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="grid min-h-screen w-screen dark:bg-boxdark-2 dark:text-bodydark md:place-items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
