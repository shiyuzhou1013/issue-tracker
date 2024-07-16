import { issue_status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueStatistics = ({ open, inProgress, closed }: Props) => {
  const statistics: { label: string; value: number; status: issue_status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statistics.map((statistic) => (
        <Card key={statistic.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${statistic.status}`}
            >
              {statistic.label}
            </Link>
            <Text size="5" className="font-bold">
              {statistic.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueStatistics;
