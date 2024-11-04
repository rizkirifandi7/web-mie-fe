"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/services/api/auth";
import { removeCookie } from "@/actions/cookies";

const NavbarDashboard = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const response = await Logout();
			if (response.success === true) {
				removeCookie("auth_session");
				router.push("/auth/signin");
			}
		} catch (error) {
			console.error("An error occurred during logout", error);
		}
	};

	return (
		<nav className="border-b-2">
			<div className="flex justify-between items-center py-4 px-10">
				<div className="flex items-center gap-10 text-base font-medium">
					<p>Selamat Datang, Admin</p>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Keluar</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-fit me-10">
						<DropdownMenuItem onClick={() => handleLogout()}>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default NavbarDashboard;
