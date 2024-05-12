import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GlobalProvider } from "./providers/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Comentando Peliculas",
  description: "Una web para comentar peliculas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
        <Navbar />
        <div className="content">{children}</div>
        <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}