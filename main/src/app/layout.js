import "./globals.scss";

export const metadata = {
  title: "Main",
  description: "Main next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>{children}</main>
      </body>
    </html>
  )
}