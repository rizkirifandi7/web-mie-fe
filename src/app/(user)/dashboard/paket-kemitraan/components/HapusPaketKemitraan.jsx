import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const HapusPaketKemitraan = ({ id, fetchData }) => {
  const [openHapus, setOpenHapus] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan/${selectedId}`
      );
      if (response.status === 204) {
        toast.success("Paket kemitraan berhasil dihapus");
        setOpenHapus(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting paket kemitraan:", error);
      toast.error("Gagal menghapus paket kemitraan");
    }
  };

  return (
    <div>
      <Dialog open={openHapus} onOpenChange={setOpenHapus}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shadow-none "
            onClick={() => {
              setSelectedId(id);
            }}
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Menu</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menghapus menu ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleDelete()}
            >
              Hapus
            </Button>
            <div className="w-full" onClick={() => setOpenHapus(false)}>
              <Button variant="outline" className="w-full">
                Batal
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HapusPaketKemitraan;