import { IssueStatusBadge, Link } from "@/app/components";
import { Table } from "@radix-ui/themes";
import IssueActionsField from "./IssueActionsField";
import prisma from "@/prisma/client";
import React, { useState } from "react";
import { Issue, issue_status } from "@prisma/client";
import NextLink from "next/link";
import { BiSort } from "react-icons/bi";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: issue_status;
    orderBy: keyof Issue;
    orderDirection: "asc" | "desc";
    page: string;
  };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const issuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(issue_status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderDirection = searchParams.orderDirection === "asc" ? "desc" : "asc";

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <div>
      <IssueActionsField />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      orderDirection,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <BiSort className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default issuesPage;
