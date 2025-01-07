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
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  judul: z.string().nonempty("Judul harus diisi."),
  gambar: z.any(),
});

const UpdateBanner = ({ fetchData, id, rowData }) => {
  const [openTambah, setOpenTambah] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      judul: rowData.judul,
      gambar: rowData.gambar,
    },
  });

  const handleUpdate = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("gambar", data.gambar[0]);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status === 200) {
        toast.success("Banner berhasil diupdate");
        form.reset();
        setOpenTambah(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("Gagal menambahkan banner");
    } finally {
      setIsLoading(false);
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
          <DialogTitle>Update Banner</DialogTitle>
          <DialogDescription>Update banner.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-none"
                      placeholder="masukkan judul..."
                      {...field}
                      type="text"
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
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBanner;
