import"./globals.css";
import type { Metadata } from"next";
import AppLayout from"./components/Layout";
import { AuthProvider } from"./components/AuthProvider";
import { ThemeProvider } from"./ThemeContext";
import { Toaster } from "react-hot-toast";
import {GeistSans} from'geist/font/sans';



export const metadata: Metadata = {
 metadataBase: new URL("https://kwizkit.app"),
 title: {
 default:"KwizKit",
 template:"%s | KwizKit",
 },
 description:
"Create, share, and proctor tests with KwizKit.",
 keywords: [
"KwizKit",
"test creation",
"proctoring",
"online assessments",
 ],
 creator:"KwizKit",
 publisher:"KwizKit",
 robots: {
 index: true,
 follow: true,
 },
 icons: {
 icon:"/favicon.ico",
 shortcut:"/favicon-16x16.png",
 apple:"/apple-touch-icon.png",
 },
 openGraph: {
 title:"KwizKit",
 description:"Create, share, and proctor tests with KwizKit.",
 url:"https://kwizkit.app",
 siteName:"KwizKit",
 images: [
 {
 url:"/og-image.png",
 width: 1200,
 height: 630,
 alt:"KwizKit",
 },
 ],
 locale:"en_US",
 type:"website",
 },
 twitter: {
 card:"summary_large_image",
 title:"KwizKit",
 description:"Create, share, and proctor tests with KwizKit.",
 images: ["/og-image.png"],
 },
 alternates: {
 canonical:"https://kwizkit.app",
 },
};

export default async function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en"className={GeistSans.className}>
 <body
 className="theme-bg theme-text min-h-screen flex flex-col antialiased"
 id="home"
 >
 <AuthProvider>
 <ThemeProvider>
 <AppLayout>{children}</AppLayout>
 </ThemeProvider>
 </AuthProvider>
 <Toaster position="bottom-right" />
 </body>
 </html>
 );
}
