import type { Metadata } from "next";
import "../styles/globals.css";
// import the fonts file
import "../styles/fonts.css";

export const metadata: Metadata = {
  title: "Nick Bevers",
  description: "My soon to be portfolio with my TreeJS - WebGL projects",
  icons: [
    {
      media: "(prefers-color-scheme: dark)",
      url: "/images/favicon-black.png",
      href: "/images/favicon-black.png",
    },
    {
      media: "(prefers-color-scheme: light)",
      url: "/images/favicon-white.png",
      href: "/images/favicon-white.png",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
