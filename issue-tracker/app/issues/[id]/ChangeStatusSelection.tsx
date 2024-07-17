"use client";

import { Issue, issue_status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const ChangeStatusSelection = ({ issue }: { issue: Issue }) => {
  const issueStatuses: { label: string; value: issue_status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleStatusValueChange = (issueStatus: issue_status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: issueStatus || null,
      })
      .catch(() =>
        toast.error("Changes could not be saved", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#8E8C99",
            color: "#ffffff",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#8E8C99",
          },
        })
      );
    console.log(issueStatus);
  };

  return (
    <Select.Root
      defaultValue={issue.status || ""}
      onValueChange={handleStatusValueChange}
    >
      {/* @ts-ignore */}
      <Select.Trigger placeholder="Change status..." />
      <Select.Content>
        <Select.Group>
          {issueStatuses?.map((issueStatus) => (
            <Select.Item key={issueStatus.value} value={issueStatus.value}>
              {issueStatus.label}
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Separator />
      </Select.Content>
    </Select.Root>
  );
};

export default ChangeStatusSelection;
