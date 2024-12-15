export const formatHarga = (harga) => {
	if (harga >= 1000) {
		return harga / 1000 + "K";
	}
	return harga;
};

export function formatRupiah(number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
}
