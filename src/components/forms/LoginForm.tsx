import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

const LoginForm = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successfully. Welcome!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-4 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormControl>
                <input
                  {...field}
                  id="email"
                  type="email"
                  className="px-3 py-2 bg-[#f1f1f1] dark:bg-[#2f303e] text-[#000000] dark:text-[#aaaaaa] rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder:text-[#7b7b7b]"
                  placeholder="Email..."
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage className="text-[#444444] dark:text-[#9ca9b9]" />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormControl>
                <input
                  {...field}
                  id="password"
                  type="password"
                  className="px-3 py-2 bg-[#f1f1f1] dark:bg-[#2f303e] text-[#000000] dark:text-[#aaaaaa] rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder:text-[#7b7b7b]"
                  placeholder="Password..."
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage className="text-[#444444] dark:text-[#9ca9b9]" />
            </>
          )}
        />
        <button
          className="px-5 py-2 bg-[#6e6dfb] text-white rounded-sm font-semibold disabled:cursor-not-allowed disabled:brightness-75"
          type="submit"
          disabled={loading}
        >
          LOGIN
        </button>
      </form>
    </Form>
  );
};

export default LoginForm;
