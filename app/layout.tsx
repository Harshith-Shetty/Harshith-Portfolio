import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Harshith Shetty | Software Engineer",
  description:
    "Software Engineer with 2.5+ years delivering FinTech applications, cloud-native backends, and event-driven systems on Azure and AWS.",
  keywords: [
    "Harshith Shetty",
    "Software Engineer",
    "Portfolio",
    "FinTech",
    "Azure",
    "AWS",
    ".NET Core",
    "FastAPI",
    "Python",
  ],
  authors: [{ name: "Harshith Shetty" }],
  openGraph: {
    type: "website",
    title: "Harshith Shetty | Software Engineer",
    description: "Building scalable backends & cloud-native systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
