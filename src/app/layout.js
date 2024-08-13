import { Inter } from "next/font/google";
import "./globals.css";
import "@/components/NavBar"
import Simple from "@/components/NavBar";
import Providers from "./providers";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HurricaneX",
  description: "Prepare for any hurricane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <Simple />
            {children}
        </Providers>
      </body>
    </html>
  );
}
