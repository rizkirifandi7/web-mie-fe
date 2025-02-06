import { formatRupiah } from "@/lib/formatRupiah";
import React from "react";

const OrderSummary = ({ totalPrice, discount, tax }) => {
	return (
		<div className="bg-white">
			<div className="p-4 border-b">
				<h1 className="font-semibold text-base mb-2">Detail Pembayaran</h1>
				<div className="flex flex-col gap-1">
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Subtotal</p>
						<p className="text-base font-semibold">{formatRupiah(totalPrice())}</p>
					</div>
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Diskon</p>
						<p className="text-base font-semibold">{formatRupiah(discount)}</p>
					</div>
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Service Charge (5%)</p>
						<p className="text-base font-semibold">{formatRupiah(tax)}</p>
					</div>
					<div className="flex justify-between items-center gap-2 mt-2 border-t">
						<p className="text-base font-bold mt-4">Total</p>
						<p className="font-bold text-base mt-4">
							{formatRupiah(totalPrice())}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
