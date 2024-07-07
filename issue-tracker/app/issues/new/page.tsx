"use client";

import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Button, TextField, TextFieldInput } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { control, handleSubmit, register } = useForm<IssueForm>();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextFieldInput placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
