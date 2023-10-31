import { Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Box pt={10}>
        <Heading>Welcome to Sphere Bank</Heading>
      </Box>
      <Box mt={10}>
        <Link href="/login" passHref>
          <Button colorScheme="teal" mr={4}>
            Login
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button colorScheme="teal">
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}