import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LucyLeague",
  description: "cool ass league dood",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body style={{height: '100vh'}}  className={inter.className}>{children} </body>
    </html>
  );
}
 