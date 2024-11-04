export const formatHarga = (harga) => {
	if (harga >= 1000) {
		return harga / 1000 + "k";
	}
	return harga;
};
