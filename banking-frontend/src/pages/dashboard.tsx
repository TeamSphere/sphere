import useSWR from "swr";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error } = useSWR("/api/user", fetcher);
  const router = useRouter();

  if (error) return <div>Failed to load user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box>
      <Heading as="h1">Dashboard</Heading>
      <Text>
        <strong>Account Number:</strong> {data.accountNumber}
      </Text>
      <Text>
        <strong>Balance:</strong> {data.balance}
      </Text>
      {/* Add more details as needed */}
    </Box>
  );
}