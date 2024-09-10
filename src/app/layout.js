import "./globals.css";

export const metadata = {
  title: "Shortly - shorten your link",
  description: "Shorten you link",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
