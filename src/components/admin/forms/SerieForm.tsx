import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormInput from "../inputs/FormInput";
import FormAction from "../ui/FormAction";
import FormSelect from "../inputs/FormSelect";
import FormUpload from "../inputs/FormUpload";
import FormTextarea from "../inputs/FormTextarea";
import { createSerie, updateSerie } from "@/services/serieService";
import FormActionMobile from "../ui/FormActionMobile";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(1, { message: "Series title is required" }).max(225),
  description: z.string().min(1, { message: "Series description is required" }),
  image: z.string().optional(),
  status: z.string(),
  seriesStatus: z.string(),
  seriesType: z.string(),
  alternative: z.string().max(225).optional(),
  author: z.string().max(225).optional(),
  artist: z.string().max(225).optional(),
  serialization: z.string().max(225).optional(),
  released: z.string().max(225).optional(),
  rating: z.string().max(225).optional(),
  genres: z.string().optional(),
});

const SerieForm = ({ data }: { data?: any }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      image: data?.imageUrl ?? undefined,
      status: data?.status ?? "published",
      seriesStatus: data?.seriesStatus ?? "ongoing",
      seriesType: data?.seriesType ?? "manga",
      alternative: data?.alternative ?? "",
      author: data?.author ?? "",
      artist: data?.artist ?? "",
      serialization: data?.serialization ?? "",
      released: data?.released ?? "",
      rating: data?.rating ?? "",
      genres: data?.genres && data?.genres?.length > 0 ? data?.genres.map((item: any) => item.name).join(",") : "",
    },
  });

  const createSerieMutation = useMutation({
    mutationKey: ["create-serie"],
    mutationFn: createSerie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] })
      toast.success("Serie created successfully.")
      navigate("/admin/series")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const updateSerieMutation = useMutation({
    mutationKey: ["update-serie"],
    mutationFn: updateSerie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] })
      toast.success("Serie updated successfully.")
      navigate("/admin/series")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!data) {
      createSerieMutation.mutate({
        ...values,
        genres: values.genres ? values.genres.split(",").map(item => item.trim()) : undefined,
      })
    } else {
      const req = {
        ...values,
        id: data.id,
        genres: values.genres ? values.genres.split(",").map(item => item.trim()) : undefined,
        image: values.image?.startsWith("data:image") ? values.image : undefined,
        imageUrl: values.image?.startsWith("data:image") ? undefined : values.image,
      }

      console.log(req)
      updateSerieMutation.mutate(req)
    }
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormAction title="New Series" />

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card title="Series Information">
              <CardContent className="grid gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Title"
                      placeholder="Boruto: Naruto Next Generations"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormTextarea
                      field={field}
                      label="Description"
                      placeholder="lorem"
                      className="min-h-32"
                    />
                  )}
                />
              </CardContent>
            </Card>

            <Card title="Series Details">
              <CardContent className="grid gap-x-6 gap-y-4 sm:grid-cols-3 mt-4">
                <FormField
                  control={form.control}
                  name="alternative"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Alternative"
                      placeholder="alternative"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Author"
                      placeholder="author"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Artist"
                      placeholder="artist"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="serialization"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Serialization"
                      placeholder="serialization"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="released"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Released"
                      placeholder="2024"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Rating"
                      placeholder="8.24"
                    />
                  )}
                />
              </CardContent>
            </Card>

            <Card title="Series Genre">
              <CardContent className="grid gap-3 mt-4">
                <FormField
                  control={form.control}
                  name="genres"
                  render={({ field }) => (
                    <FormTextarea
                      field={field}
                      label="Genres"
                      placeholder="Adventure,Comedy,Horror"
                      className="min-h-32"
                    />
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card title="Save As">
              <CardContent className="grid gap-3 mt-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormSelect
                      field={field}
                      placeholder="Select Status"
                      items={[
                        { label: "Draft", value: "draft" },
                        { label: "Publish", value: "published" },
                      ]}
                    />
                  )}
                />
              </CardContent>
            </Card>

            <Card title="Series Type">
              <CardContent className="grid gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="seriesStatus"
                  render={({ field }) => (
                    <FormSelect
                      field={field}
                      label="Status"
                      placeholder="Select Status"
                      items={[
                        { label: "Ongoing", value: "ongoing" },
                        { label: "Completed", value: "completed" },
                      ]}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="seriesType"
                  render={({ field }) => (
                    <FormSelect
                      field={field}
                      label="Type"
                      placeholder="Select Type"
                      items={[
                        { label: "Manga", value: "manga" },
                        { label: "Manhwa", value: "manhwa" },
                        { label: "Manhua", value: "manhua" },
                      ]}
                    />
                  )}
                />
              </CardContent>
            </Card>

            <Card title="Series Cover">
              <CardContent className="grid gap-2 mt-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormUpload value={field.value} onChange={field.onChange} />
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <FormActionMobile />
      </form>
    </Form>
  )
};

export default SerieForm;
