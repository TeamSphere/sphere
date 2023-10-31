import useSWR from "swr";
import { Box, Heading } from "@chakra-ui/react";
import TransactionList from "../components/TransactionList";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Transactions() {
  const { data, error } = useSWR("/api/transactions", fetcher);

  if (error) return <div>Failed to load transactions</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box>
      <Heading as="h1">Transactions</Heading>
      <TransactionList transactions={data.transactions} />
    </Box>
  );
}