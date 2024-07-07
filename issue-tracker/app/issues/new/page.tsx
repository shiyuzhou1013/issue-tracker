"use client";

import axios from "axios";
import "easymde/dist/easymde.min.css";
import {
  Button,
  Callout,
  Text,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createIssueSchema } from "@/app/validationSchemas";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import z from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextFieldInput placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
