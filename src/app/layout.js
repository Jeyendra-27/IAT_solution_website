import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "IAT Solutions — Custom Software & AI Solutions",
  description:
    "Custom software and AI solutions for businesses that have outgrown off-the-shelf tools.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Globally shared, persists across routes (no re-animation on nav) */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
