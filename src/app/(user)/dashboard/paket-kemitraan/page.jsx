"use client";
import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import TambahPaketKemitraan from "./components/TambahPaketKemitraan";
import UpdatePaketKemitraan from "./components/UpdatePaketKemitraan";
import HapusPaketKemitraan from "./components/HapusPaketKemitraan";

const PagePaketKemitraan = () => {
  const [data, setData] = React.useState([]);

  const columns = [
    {
      accessorKey: "jenis_kemitraan",
      header: "Jenis Kemitraan",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("jenis_kemitraan")}</div>
      ),
    },
    {
      accessorKey: "ukuran",
      header: "Ukuran",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ukuran")}</div>
      ),
    },
    {
      accessorKey: "gambar",
      header: "Gambar",
      cell: ({ row }) => (
        <div>
          <Image
            src={row.getValue("gambar")}
            width={50}
            height={50}
            className="w-auto h-auto"
            alt="gambar"
          />
        </div>
      ),
    },
    {
      accessorKey: "harga",
      header: () => <div className="">Harga</div>,
      cell: ({ row }) => {
        const harga = parseFloat(row.getValue("harga"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(harga);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original.id;
        const rowData = row.original;
        return (
          <div className="flex items-center gap-2">
            <UpdatePaketKemitraan fetchData={fetchData} id={id} rowData={rowData} />
            <HapusPaketKemitraan id={id} fetchData={fetchData} />
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <TableView
        columns={columns}
        data={data}
        TambahComponent={() => <TambahPaketKemitraan fetchData={fetchData} />}
        title="Dashboard Menu"
        search="jenis_kemitraan"
        pageSize={5}
      />
    </React.Fragment>
  );
};

export default PagePaketKemitraan;