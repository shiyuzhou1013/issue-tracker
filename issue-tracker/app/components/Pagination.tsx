"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { PerformanceResourceTiming } from "perf_hooks";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params);
  };

  return (
    <Flex gap="3" align="center">
      <Text size="2">
        {currentPage * pageSize < itemCount
          ? `${currentPage * pageSize} of ${itemCount}`
          : `${itemCount} of ${itemCount}`}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(1);
        }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(pageCount);
        }}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
