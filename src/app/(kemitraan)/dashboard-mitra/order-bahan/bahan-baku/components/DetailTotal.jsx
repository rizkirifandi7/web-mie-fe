import { formatRupiah } from "@/lib/formatRupiah";
import React from "react";

const DetailTotal = ({ getCartTotal }) => {
	return (
		<div className="flex flex-col gap-1 mt-4">
			<div className="flex justify-between items-center">
				<h1 className="text-sm text-slate-500">Subtotal</h1>
				<p className="text-sm font-semibold">{formatRupiah(getCartTotal())}</p>
			</div>
			<div className="flex justify-between items-center">
				<h1 className="text-sm text-slate-500">Diskon</h1>
				<p className="text-sm font-semibold">{formatRupiah(0)}</p>
			</div>
			<div className="flex justify-between items-center mb-2">
				<h1 className="text-sm text-slate-500">Pajak</h1>
				<p className="text-sm font-semibold">{formatRupiah(0)}</p>
			</div>
			<div className="flex justify-between items-center border-t py-2">
				<h1 className="text-lg font-bold">Total</h1>
				<p className="text-lg font-bold">{formatRupiah(getCartTotal())}</p>
			</div>
		</div>
	);
};

export default DetailTotal;
