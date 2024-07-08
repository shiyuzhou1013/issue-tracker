"use client";

import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField, TextFieldInput } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createIssueSchema } from "@/app/validationSchemas";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      reset();
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}
        <Button disabled={isSubmitting}>
          Submit {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
