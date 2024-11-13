import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}
