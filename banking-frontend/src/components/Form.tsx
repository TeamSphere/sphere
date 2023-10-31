import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Form = ({ submitText, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button colorScheme="teal" type="submit">
        {submitText}
      </Button>
    </form>
  );
};

export default Form;