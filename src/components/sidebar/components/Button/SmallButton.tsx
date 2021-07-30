import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  content: string;
  onClick?: () => void;
  isAlgoVisualizing: boolean;
  beforeClickFn?: () => void;
}
const SmallButton = ({
  content,
  onClick,
  isAlgoVisualizing,
  beforeClickFn,
}: Props) => {
  const clickHandler = () => {
    if (beforeClickFn) {
      beforeClickFn();
    }
    onClick();
  };
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
      onClick={clickHandler}
      disabled={isAlgoVisualizing}
      _focus={{}}
    >
      {content}
    </Button>
  );
};

export default SmallButton;
