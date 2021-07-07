import React, { useRef, useState } from "react";

interface Props {
  row: number;
  col: number;
  startNodeSelected: boolean;
  setStartNodeSelected: (value: boolean) => void;
}

export const Node = ({
  col,
  row,
  setStartNodeSelected,
  startNodeSelected,
}: Props) => {
  let nodeRef = useRef<HTMLDivElement | null>(null);

  const handleCurrentNode = () => {
    if (nodeRef.current?.classList.contains("startNode")) {
      nodeRef.current.classList.remove("startNode");
      setStartNodeSelected(false);
    } else if (!startNodeSelected) {
      nodeRef.current?.classList.add("startNode");
      setStartNodeSelected(true);
    }
  };
  return (
    <div ref={nodeRef} onClick={handleCurrentNode} className="grid__node"></div>
  );
};
