import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Demiehan",
	description: "Demiehan",
	icons: {
		icon: "logobrand.png",
	},
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
