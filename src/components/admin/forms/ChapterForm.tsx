import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormInput from "../inputs/FormInput";
import FormAction from "../ui/FormAction";
import FormSelect from "../inputs/FormSelect";
import FormTextarea from "../inputs/FormTextarea";
import FormActionMobile from "../ui/FormActionMobile";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { createChapter, updateChapter } from "@/services/chapterService";
import SeriesCombobox from "../inputs/SeriesCombobox";

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "content is required" }),
  chapter: z.string(),
  status: z.string(),
  serieId: z.number(),
});

const ChapterForm = ({ data }: { data?: any }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      content: data?.content ? data.content.join("\n") : "",
      chapter: data?.chapter ?? "",
      status: data?.status ?? "published",
      serieId: data?.serieId ?? 0,
    },
  });

  const createChapterMutation = useMutation({
    mutationKey: ["create-chapter"],
    mutationFn: createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
      toast.success("Chapter created successfully.");
      navigate("/admin/chapters");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateChapterMutation = useMutation({
    mutationKey: ["update-chapter"],
    mutationFn: updateChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
      toast.success("Chapter updated successfully.");
      navigate("/admin/chapters");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!data) {
      createChapterMutation.mutate({
        title: values.title,
        content: values.content,
        chapter: values.chapter,
        status: values.status,
        serieId: values.serieId,
      });
    } else {
      updateChapterMutation.mutate({
        id: data.id,
        title: values.title,
        content: values.content,
        chapter: values.chapter,
        status: values.status,
        serieId: values.serieId,
      })
    }
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormAction title="New Chapter" />

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card title="Chapter Information">
              <CardContent className="grid gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Title"
                      placeholder="Black Clover Chapter 01"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormTextarea
                      field={field}
                      label="Content"
                      placeholder={`http://example.com/1.jpg\nhttp://example.com/2.jpg`}
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
                  name="serieId"
                  render={({ field }) => (
                    <SeriesCombobox
                      field={field}
                      defaultValue={data ? data.serie.title : undefined}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="chapter"
                  render={({ field }) => (
                    <FormInput field={field} label="Chapter" placeholder="01" />
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <FormActionMobile />
      </form>
    </Form>
  );
};

export default ChapterForm;
