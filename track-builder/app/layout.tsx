import type { Metadata } from "next";
import "./style/main.css";

export const metadata: Metadata = {
  title: "track-builder",
  description: "build your own tracks and let cars drive on it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
      <script src="https://kit.fontawesome.com/058434cd7c.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
