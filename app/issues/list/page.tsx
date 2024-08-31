import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { issue_status } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import IssueActionsField from "./IssueActionsField";
import IssueStatusSelector from "./IssueStatusSelector";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const issuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(issue_status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true,
    },
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex gap="3" direction="column">
      <IssueActionsField />
      <Flex justify="between" align="center">
        <IssueStatusSelector />
        {issueCount > pageSize ? (
          <Pagination
            itemCount={issueCount}
            pageSize={pageSize}
            currentPage={page}
          />
        ) : (
          <Text size="2">
            {issueCount} of {issueCount}
          </Text>
        )}
      </Flex>
      <IssueTable searchParams={searchParams} issues={issues} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default issuesPage;
