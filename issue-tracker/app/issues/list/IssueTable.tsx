import { IssueStatusBadge } from "@/app/components";
import { Issue, issue_status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

export interface IssueQuery {
  status: issue_status;
  orderBy: keyof Issue;
  orderDirection: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const orderDirection = searchParams.orderDirection === "asc" ? "desc" : "asc";

  return (
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
              {column.value === searchParams.orderBy &&
                searchParams.orderDirection === "asc" && (
                  <TiArrowSortedUp
                    className="inline"
                    style={{ color: "var(--accent-9)" }}
                  />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.orderDirection === "desc" && (
                  <TiArrowSortedDown
                    className="inline"
                    style={{ color: "var(--accent-9)" }}
                  />
                )}
              {!searchParams.orderBy && (
                <TiArrowUnsorted className="inline" color="gray" />
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
