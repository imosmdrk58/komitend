import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGenre, updateGenre } from "@/services/genreService";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  data?: {
    id: number;
    name: string;
  } | null;
};

const formSchema = z.object({
  name: z.string().min(3).max(20),
});

const GenreForm: React.FC<Props> = ({ open, onClose, data }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const createGenreMutation = useMutation({
    mutationKey: ["create-genre"],
    mutationFn: createGenre,
  });

  const updateGenreMutation = useMutation({
    mutationKey: ["update-genre"],
    mutationFn: updateGenre,
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!data) {
        createGenreMutation.mutate(values.name, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["genres"] });
            toast.success("Genre created successfully.");
            form.reset();
            onClose();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        })
    } else {
        updateGenreMutation.mutate({ id: data.id, name: values.name }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["genres"] });
                toast.success("Genre updated successfully.");
                form.reset();
                onClose();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>{data ? "Edit Genre" : "Create Genre"}</DialogTitle>
              <DialogDescription>
                {data ? "Edit this genre" : "Create a new genre"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GenreForm