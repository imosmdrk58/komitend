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
import Input from "../custom/input";
import Button from "../custom/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

const inputs = [
  {
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
  },
];

const LoginForm = () => {
  const { login } = useAuth();
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
      password: "",
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
        {inputs.map((input, index) => (
          <FormField
            control={form.control}
            name={input.name as keyof z.infer<typeof formSchema>}
            key={index}
            render={({ field }) => (
              <>
                <FormControl>
                  <Input
                    {...field}
                    id={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-[#444444] dark:text-[#9ca9b9]" />
              </>
            )}
          />
        ))}
        <Button type="submit" disabled={loading}>
          LOGIN
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
