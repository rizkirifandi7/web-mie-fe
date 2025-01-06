import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import TentangKamiDashboard from "./components/TentangKamiDashboard";

const PageInformasi = () => {
	return (
		<>
			<h1 className="">Dashboard Tentang Kami</h1>
			<div className="flex flex-col items-center justify-center gap-6 w-full h-full">
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="text-lg font-semibold">
							Tentang Kami
						</CardTitle>
						<CardDescription>
							Informasi mengenai perusahaan dan visi misi yang dimiliki
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TentangKamiDashboard />
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default PageInformasi;
