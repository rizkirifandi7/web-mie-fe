"use client";
import {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";

const CartContext = createContext();

export const useCartBahanBaku = () => useContext(CartContext);

export const CartBahanBakuProvider = ({ children }) => {
	const [cartBahanBaku, setCartBahanBaku] = useState([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cartBahanBaku");
		if (storedCart) setCartBahanBaku(JSON.parse(storedCart));
	}, []);

	useEffect(() => {
		localStorage.setItem("cartBahanBaku", JSON.stringify(cartBahanBaku));
	}, [cartBahanBaku]);

	const addToCart = useCallback((item) => {
		setCartBahanBaku((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	}, []);

	const removeFromCart = useCallback((item) => {
		setCartBahanBaku((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem.quantity === 1) {
				return prevCart.filter((cartItem) => cartItem.id !== item.id);
			} else {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				);
			}
		});
	}, []);

	const clearCart = useCallback(() => {
		setCartBahanBaku([]);
	}, []);

	const removeItemFromCart = useCallback((item) => {
		setCartBahanBaku((prevCart) => {
			return prevCart.filter((cartItem) => cartItem.id !== item.id);
		});
	}, []);

	const getCartTotal = useCallback(
		() =>
			cartBahanBaku.reduce(
				(total, item) => total + item.harga * item.quantity,
				0
			),
		[cartBahanBaku]
	);

	return (
		<CartContext.Provider
			value={{
				cartBahanBaku,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
				removeItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
