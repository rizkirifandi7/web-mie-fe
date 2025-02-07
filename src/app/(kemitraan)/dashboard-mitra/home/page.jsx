"use client";

import * as React from "react";
import { ChartInfo } from "./components/ChartInfo";
import { BarInfo } from "./components/BarInfo";
import { formatRupiah } from "@/lib/formatRupiah";
import DashboardCard from "./components/DashboardCard";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineDocumentReport } from "react-icons/hi";

const PageHomeDashboard = () => {
	const [data, setData] = React.useState({
		infoDataPesanan: [],
		menuData: [],
	});
	const [percentageChange, setPercentageChange] = React.useState({
		orders: 0,
		revenue: 0,
		activeTables: 0,
	});
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	const calculatePercentageChange = React.useCallback((ordersData) => {
		const currentMonth = new Date().getMonth();
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

		const getMonthlyData = (month) =>
			ordersData.filter(
				(order) => new Date(order.order_time).getMonth() === month
			);

		const currentMonthData = getMonthlyData(currentMonth);
		const previousMonthData = getMonthlyData(previousMonth);

		const calculateChange = (current, previous) =>
			previous === 0
				? current > 0
					? 100
					: 0
				: ((current - previous) / previous) * 100;

		setPercentageChange({
			orders: calculateChange(
				currentMonthData.length,
				previousMonthData.length
			),
			revenue: calculateChange(
				currentMonthData.reduce((acc, order) => acc + Number(order.total), 0),
				previousMonthData.reduce((acc, order) => acc + Number(order.total), 0)
			),
			activeTables: calculateChange(
				new Set(currentMonthData.map((order) => order.id_meja)).size,
				new Set(previousMonthData.map((order) => order.id_meja)).size
			),
		});
	}, []);

	const totalRevenue = React.useMemo(
		() =>
			data.infoDataPesanan.reduce((acc, order) => acc + Number(order.total), 0),
		[data.infoDataPesanan]
	);

	const totalRevenueToday = React.useMemo(() => {
		const today = new Date();
		return data.infoDataPesanan
			.filter((order) => {
				const orderDate = new Date(order.order_time);
				return (
					orderDate.getDate() === today.getDate() &&
					orderDate.getMonth() === today.getMonth() &&
					orderDate.getFullYear() === today.getFullYear()
				);
			})
			.reduce((acc, order) => acc + Number(order.total), 0);
	}, [data.infoDataPesanan]);

	const totalReservations = data.menuData.length;

	React.useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [pesananResponse, menuResponse] = await Promise.all([
					fetch(`${process.env.NEXT_PUBLIC_API_URL}/pesanan/user`, {
						headers: {
							Authorization: `Bearer ${Cookies.get("auth_session")}`,
						},
					}),
					fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/user`, {
						headers: {
							Authorization: `Bearer ${Cookies.get("auth_session")}`,
						},
					}),
				]);

				if (!pesananResponse.ok || !menuResponse.ok) {
					throw new Error("Failed to fetch data");
				}

				const pesananData = await pesananResponse.json();
				const menuData = await menuResponse.json();

				const completedOrders = pesananData.data.filter(
					(order) => order.status === "completed"
				);

				setData({
					infoDataPesanan: completedOrders || [],
					menuData: menuData.data || [],
				});
				calculatePercentageChange(completedOrders || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [calculatePercentageChange]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<div className="flex justify-between items-center mb-4">
				<h1 className="font-bold text-2xl">Dashboard Laporan Penjualan</h1>
				<Link href="/dashboard-mitra/pesanan/laporan-pesanan">
					<Button className="w-fit bg-blue-500">
						<HiOutlineDocumentReport />
						Unduh Laporan Pesanan
					</Button>
				</Link>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				<DashboardCard
					title="Order"
					value={data.infoDataPesanan.length}
					percentageChange={percentageChange.orders}
				/>
				<DashboardCard
					title="Pendapatan"
					value={formatRupiah(totalRevenue)}
					percentageChange={percentageChange.revenue}
				/>
				<DashboardCard title="Menu" value={totalReservations} />
				<DashboardCard
					title="Pendapatan Hari Ini"
					value={formatRupiah(totalRevenueToday)}
				/>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-4">
				<ChartInfo orders={data.infoDataPesanan} />
				<BarInfo orders={data.infoDataPesanan} />
			</div>
		</>
	);
};

export default PageHomeDashboard;
