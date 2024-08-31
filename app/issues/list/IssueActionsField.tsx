import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const IssueActionsField = () => {
  return (
    <Flex justify="end">
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActionsField;
