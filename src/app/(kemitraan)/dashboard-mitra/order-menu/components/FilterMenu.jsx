import { Button } from "@/components/ui/button";
import { Soup } from "lucide-react";
import React from "react";

const FilterMenu = ({ namafilter, onClick, active }) => {
	return (
		<Button
			className={`flex items-center gap-2 w-fit shadow-none ${
				active ? "bg-blue-500 text-white" : ""
			}`}
			variant="outline"
			onClick={onClick}
		>
			{namafilter}
		</Button>
	);
};

export default FilterMenu;
