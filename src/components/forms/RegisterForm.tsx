import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import Input from "../custom/input";
import Button from "../custom/button";

const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(new URL("/users/register", import.meta.env.VITE_API_URL).href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const { data } = await response.json();
  return data;
};

const formSchema = z
  .object({
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string().min(4).max(20),
    repeatPassword: z.string().min(4).max(20),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["repeatPassword"],
      });
    }
  });

const inputs = [
  {
    type: "text",
    name: "username",
    placeholder: "Username",
  },
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
  {
    type: "password",
    name: "repeatPassword",
    placeholder: "Repeat Password",
  },
];

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("User registered successfully. Please login");
      navigate("/login");
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
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
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
        {inputs.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name as keyof z.infer<typeof formSchema>}
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
          REGISTER
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
