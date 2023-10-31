import { useState } from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Form from "../components/Form";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Make API call to login
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Form submitText="Login" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Form>
    </Box>
  );
}