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
      _hover={{ bg: "hsl(208, 97%, 55%)", borderColor: "hsl(208, 97%, 50%);" }}
      onClick={onClick}
      disabled={visualizingAlgo}
      _focus={{}}
    >
      {content}
    </Button>
  );
};

export default SmallButton;
