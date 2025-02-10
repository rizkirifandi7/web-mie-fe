import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Demiehan",
	description: "Demiehan",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logobrand.png', sizes: '180x180' }
    ],
  },
  manifest: '/manifest.json'
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<Toaster position="top-center" />
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
