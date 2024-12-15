import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
	title: "Dmiehan",
	description: "Dmiehan",
	icons: {
		icon: "logobrand.png",
	},
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Toaster position="top-center"/>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
