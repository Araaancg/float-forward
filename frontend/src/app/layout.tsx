"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      {/* <head>
        <title>
          SL Sirococinas Diseños | diseño y fabricación de cocinas modernas y
          dinámicas en Madrid.
        </title>
        <meta
          name="description"
          content="SL Sirococinas es una empresa con base en Madrid, especializada en el diseño de cocinas atemporales con estilos modernos tanto para tu hogar como para tu negocio, con su amplia gama de acabados, colores y estilos podrás crear la cocina que mejor se adapta a tus necesidades."
        />
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/sl-cocilux/image/upload/v1719837328/LOGOTIPOS/FONDO_NEGRO_rbax4k.png" />
      </head> */}
      <body className={`${inter.className} relative`}>
    
      </body>
    </html>
  );
}
