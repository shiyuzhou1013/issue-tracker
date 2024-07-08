import prisma from "@/prisma/client";
import { Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Text>{issue.title}</Text>
      <Text>{issue.status}</Text>
      <Text>{issue.description}</Text>
    </div>
  );
};

export default IssueDetailPage;
