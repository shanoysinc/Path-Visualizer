import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  content: string;
  onClick?: () => void;
  visualizingAlgo: boolean;
}
const SmallButton = ({ content, onClick, visualizingAlgo }: Props) => {
  return (
    <Button
      size="sm"
      color="white"
      variant="outline"
      colorScheme="pink"
      fontWeight="normal"
      _hover={{ bg: "#6D28D9", borderColor: "#6D28D9" }}
      onClick={onClick}
      disabled={visualizingAlgo}
    >
      {content}
    </Button>
  );
};

export default SmallButton;
