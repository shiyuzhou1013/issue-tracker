"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssignSelection = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssignValueChange = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
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
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={handleAssignValueChange}
      >
        {/* @ts-ignore */}
        <Select.Trigger placeholder="Assigning..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugesstions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });

export default AssignSelection;
