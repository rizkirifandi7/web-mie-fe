import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const OrderPaymentMethod = ({ tipePayment, handlePaymentChange }) => {
	return (
		<div className="bg-white">
			<div className="p-4 border-b">
				<h1 className="font-semibold text-base mb-2">Metode Pembayaran</h1>
				<RadioGroup value={tipePayment} onValueChange={handlePaymentChange}>
					<div className="flex justify-between items-center hover:bg-slate-100 rounded-lg py-0.5 w-full">
						<label
							htmlFor="r1"
							className="flex justify-between items-center w-full cursor-pointer"
						>
							<span className="text-base">Cash</span>
							<RadioGroupItem value="Cash" id="r1" className="w-6 h-6" />
						</label>
					</div>
					<div className="flex justify-between items-center hover:bg-slate-100 rounded-lg py-0.5 w-full">
						<label
							htmlFor="r2"
							className="flex justify-between items-center w-full cursor-pointer"
						>
							<span className="text-base">Transfer</span>
							<RadioGroupItem value="Transfer" id="r2" className="w-6 h-6" />
						</label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
};

export default OrderPaymentMethod;
