import "../styles/globals.css";

export const metadata = {
  title: "ATSResume | Get hired with an ATS-optimized resume",
  description:
    "ATSResume is a resume builder that helps job seekers create a professional, ATS-friendly resume in minutes.",
  icons: {icon: "/assets/favicon.ico"},
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body>
    <div className={'content'}>
      {children}
    </div>
    </body>
    </html>
  );
}
