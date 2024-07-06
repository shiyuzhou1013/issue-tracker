import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const issuesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </div>
  );
};

export default issuesPage;
