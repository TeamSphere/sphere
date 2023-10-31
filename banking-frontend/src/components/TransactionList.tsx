import { Box, Text } from "@chakra-ui/react";

const TransactionList = ({ transactions }) => {
  return (
    <Box>
      {transactions.map((transaction) => (
        <Box key={transaction.id} bg="gray.100" p={3} my={2}>
          <Text>
            <strong>Transaction ID:</strong> {transaction.id}
          </Text>
          <Text>
            <strong>Amount:</strong> {transaction.amount}
          </Text>
          <Text>
            <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
          </Text>
          {/* Add more details as needed */}
        </Box>
      ))}
    </Box>
  );
}

export default TransactionList;