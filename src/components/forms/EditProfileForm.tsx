import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Input from "../custom/input";
import Button from "../custom/button";

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

const inputs = [
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Username",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
  },
];

const updateUserProfile = async (value: {
  username?: string;
  email?: string;
  password?: string;
}) => {
  const res = await fetch(new URL("/users/me", import.meta.env.VITE_API_URL).href, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};

const EditProfileForm = ({
  data,
}: {
  data: { username: string; email: string };
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username || "",
      email: data.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateUserProfile,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.password && values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutation.mutate(
      {
        username: values.username || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully.");
        },
        onError: () => {
          toast.error("Failed to update profile.");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {inputs.map((input, index) => (
          <FormField
            control={form.control}
            name={input.name as keyof z.infer<typeof formSchema>}
            key={index}
            render={({ field }) => (
              <>
                <FormLabel className="font-semibold text-base text-[#9ca9b9]">
                  {input.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type={input.type}
                    className="dark:bg-[#45475a]"
                    placeholder={input.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        ))}
        <Button className="mt-4" type="submit">
          UPDATE
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
