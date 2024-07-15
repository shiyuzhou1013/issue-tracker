import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusSelector from "./IssueStatusSelector";

const IssueActionsField = () => {
  return (
    <Flex justify="between">
      <IssueStatusSelector />
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActionsField;
