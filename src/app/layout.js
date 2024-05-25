import "./globals.css";

export const metadata = {
  title: "Qube Cinema",
  description: "Appliance Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#F5F8FA] w-[100%] h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
