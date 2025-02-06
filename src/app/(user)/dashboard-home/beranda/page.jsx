import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import TentangKamiDashboard from "./components/TentangKamiDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BerandaDashboard from "./components/BerandaDashboard";

const PageInformasi = () => {
	return (
		<>
			<h1 className="text-center">Dashboard Homepage</h1>
			<Tabs defaultValue="beranda" className="max-w-screen-lg mx-auto mt-4">
				<TabsList className="w-full">
					<TabsTrigger value="beranda" className="w-full">
						Beranda
					</TabsTrigger>
					<TabsTrigger value="tentang" className="w-full">
						Tentang Kami
					</TabsTrigger>
				</TabsList>
				<TabsContent value="beranda">
					<Card className="w-full">
						<CardHeader>
							<CardTitle className="text-lg font-semibold">Beranda</CardTitle>
							<CardDescription>
								Informasi mengenai halaman beranda
							</CardDescription>
						</CardHeader>
						<CardContent>
							<BerandaDashboard />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="tentang">
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
				</TabsContent>
			</Tabs>
		</>
	);
};

export default PageInformasi;
