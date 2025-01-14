"use client";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { APIProvider } from "@vis.gl/react-google-maps";
import GENERAL_VARIABLES from "@/general";
import { FeedbackProvider } from "@/context/feedbackContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AIDNET | Community-based disaster management platform.</title>
        {/* <meta
          name="description"
          content="SL Sirococinas es una empresa con base en Madrid, especializada en el diseño de cocinas atemporales con estilos modernos tanto para tu hogar como para tu negocio, con su amplia gama de acabados, colores y estilos podrás crear la cocina que mejor se adapta a tus necesidades."
        /> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </head>
      <body className={`${inter.className} relative`}>
        <APIProvider
          apiKey={GENERAL_VARIABLES.googleApiKey!}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <FeedbackProvider>
            <SessionProvider>{children}</SessionProvider>
          </FeedbackProvider>
        </APIProvider>
      </body>
    </html>
  );
}
