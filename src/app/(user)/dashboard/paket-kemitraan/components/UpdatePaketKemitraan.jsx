/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  jenis_kemitraan: z.string().nonempty("Jenis kemitraan harus diisi."),
  ukuran: z.string().nonempty("Ukuran harus diisi."),
  gambar: z.any(),
  harga: z.any(),
});

const UpdatePaketKemitraan = ({ fetchData, id, rowData }) => {
  const [openTambah, setOpenTambah] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jenis_kemitraan: rowData.jenis_kemitraan,
      ukuran: rowData.ukuran,
      gambar: rowData.gambar,
      harga: rowData.harga,
    },
  });

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("jenis_kemitraan", data.jenis_kemitraan);
      formData.append("ukuran", data.ukuran);
      formData.append("gambar", data.gambar[0]);
      formData.append("harga", data.harga);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan/${id}`, {
        method: "PUT",
        body: formData,
      });

      console.log(response);


      if (response.status === 200) {
        toast.success("Paket kemitraan berhasil ditambahkan");
        form.reset();
        setOpenTambah(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error adding paket kemitraan:", error);
      toast.error("Gagal menambahkan paket kemitraan");
    }
  };

  return (
    <Dialog open={openTambah} onOpenChange={setOpenTambah}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MdOutlineEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Paket Kemitraan</DialogTitle>
          <DialogDescription>Tambahkan paket kemitraan baru.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="jenis_kemitraan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kemitraan</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-none"
                      placeholder="masukkan jenis kemitraan..."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ukuran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ukuran</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-none"
                      placeholder="masukkan ukuran..."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-none"
                      placeholder="masukkan harga..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="">Gambar</Label>
              <Input
                type="file"
                className="shadow-none h-full py-1.5"
                onChange={(e) => form.setValue("gambar", e.target.files)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full mt-2">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePaketKemitraan;
