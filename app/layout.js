import { Lora, DM_Sans } from "next/font/google";
import "react-day-picker/dist/style.css";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import { ReservationProvider } from "./_components/ReservationContext";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Experience The Wild Oasis - a luxury nature retreat offering elegant stays, serene views, and unforgettable hospitality surrounded by untamed wilderness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-body antialiased bg-background text-on-surface min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1">
          <main className="w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
