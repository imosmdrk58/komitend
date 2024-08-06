import { z } from "zod";
import { toast } from "sonner";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";
import { createUser, updateUser } from "@/services/userService";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  open: boolean;
  onClose: () => void;
  data?: {
    username: string;
    email: string;
    password?: string;
    role: string;
  } | null;
};

const roles = ["user", "admin", "superadmin"];
const formSchema = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().max(20).optional(),
  role: z.string(),
});

const UserForm: React.FC<Props> = ({ open, onClose, data }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
  });

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
      role: data?.role || "user",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data) {
      if (!values.password) {
        toast.error("Password is required");
        return;
      }

      createUserMutation.mutate(
        {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User created successfully.");
            form.reset();
            onClose();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      updateUserMutation.mutate(
        {
          username: data.username,
          data: {
            ...values,
            password:
              !values.password || values?.password === ""
                ? undefined
                : values.password,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated successfully.");
            form.reset();
            onClose();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>{data ? "Edit User" : "Create User"}</DialogTitle>
              <DialogDescription>
                {data ? "Edit this user" : "Create a new user"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={user?.role !== "superadmin"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
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

export default UserForm;
