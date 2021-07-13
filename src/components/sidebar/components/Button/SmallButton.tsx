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
      fontWeight="normal"
      _hover={{ bg: "teal.600", borderColor: "teal.600" }}
      onClick={onClick}
      disabled={visualizingAlgo}
    >
      {content}
    </Button>
  );
};

export default SmallButton;
