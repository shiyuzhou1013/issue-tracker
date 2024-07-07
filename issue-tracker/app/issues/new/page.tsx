"use client";

import "easymde/dist/easymde.min.css";
import { Button, TextField, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextFieldInput placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
