import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  content: string;
  onClick?: () => void;
  isAlgoVisualizing: boolean;
}
const SmallButton = ({ content, onClick, isAlgoVisualizing }: Props) => {
  return (
    <Button
      size="sm"
      color="white"
      variant="outline"
      fontWeight="normal"
      _hover={{
        bg: "#fc371d",
        borderColor: "#fc371d",
      }}
      onClick={onClick}
      disabled={isAlgoVisualizing}
      _focus={{}}
    >
      {content}
    </Button>
  );
};

export default SmallButton;
