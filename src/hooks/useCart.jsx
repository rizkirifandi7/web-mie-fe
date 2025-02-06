"use client";

import React, {
	createContext,
	useEffect,
	useState,
	useContext,
	useMemo,
	useCallback,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) setCart(JSON.parse(storedCart));
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = useCallback((item) => {
		setCart((prevCart) => {
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
		setCart((prevCart) => {
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
		setCart([]);
	}, []);

	const getTotalPrice = useCallback(
		() => cart.reduce((total, item) => total + item.harga * item.quantity, 0),
		[cart]
	);

	const contextValue = useMemo(
		() => ({
			cart,
			addToCart,
			removeFromCart,
			getTotalPrice,
			setCart,
			clearCart,
		}),
		[cart, addToCart, removeFromCart, getTotalPrice, setCart, clearCart]
	);

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
