import { Lato } from "next/font/google";
import "react-day-picker/dist/style.css";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Experience The Wild Oasis - a luxury nature retreat in Udaipur offering elegant stays, serene views, and unforgettable hospitality in the heart of Rajasthan's wilderness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
