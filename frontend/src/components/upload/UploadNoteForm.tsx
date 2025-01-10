"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "./FileUpload"
import { addFilesToDB, uploadFileToUT } from "@/actions/upload"
import { toast } from "sonner"
import { api } from "@/lib/axios"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  level: z.string({
    required_error: "Please select a level.",
  }),
  file: z
    .instanceof(File, {
      message: "Please upload a file.",
    })
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB.",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    }),
})

export function UploadNoteForm({setOpen}: {setOpen: (open: boolean) => void}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.reset();
      setOpen(false);;
      toast("Your file will be uploaded in the background...");
      const {fileUrl, fileName, success: uploadSuccess } = await uploadFileToUT(values.file);

      if (!uploadSuccess) {
        toast("Failed to upload file");
        return;
      } 

      // store url and other details in database
      const {id, success: dbSuccess} = await addFilesToDB({
        fileUrl: fileUrl as string,
        title: values.title,
        subject: values.subject,
        level: values.level,
      });

      if (!dbSuccess) {
        toast("Failed to add file to database");
        return;
      } 

      // preprocess pdf contents, creating embeddings, and store in vector database
      const res = await api.post("/upload", {
        id: id,
        fileUrl: fileUrl
      });

      toast("File uploaded successfully");
    } catch (error : any) {
      console.log("ERROR", error)
      toast(`Failed to upload file, please try again. Error: ${error.message}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="P1">P1</SelectItem>
                  <SelectItem value="P2">P2</SelectItem>
                  <SelectItem value="P3">P3</SelectItem>
                  <SelectItem value="P4">P4</SelectItem>
                  <SelectItem value="P5">P5</SelectItem>
                  <SelectItem value="P6">P6</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FileUpload
              onChange={(file) => field.onChange(file)}
              value={field.value}
              accept="application/pdf"
            />
          )}
        />
        <Button type="submit" >
          Submit</Button>
      </form>
    </Form>
  )
}

