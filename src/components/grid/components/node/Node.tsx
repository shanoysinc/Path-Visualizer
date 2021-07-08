import React, { useRef, memo, useState } from "react";

interface Props {
  row: number;
  col: number;
  startNode: string | null;
  endNode: string | null;
  setStartNode: React.Dispatch<React.SetStateAction<string | null>>;
  setEndNode: React.Dispatch<React.SetStateAction<string | null>>;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  walls: string[];
  setWalls: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Node = memo(
  ({
    col,
    row,
    endNode,
    setEndNode,
    setStartNode,
    startNode,
    isMouseDown,
    setIsMouseDown,
    walls,
    setWalls,
  }: Props) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);

    const handleCurrentNode = (node: string) => {
      const hasStartNode = nodeRef.current?.classList.contains("startNode");
      const hasEndNode = nodeRef.current?.classList.contains("endNode");
      if (hasStartNode) {
        setStartNode(null);
        return;
      } else if (!startNode && !hasStartNode && !hasEndNode) {
        setStartNode(node);
        return;
      }

      if (hasEndNode) {
        setEndNode(null);
      } else if (!endNode && !hasEndNode && startNode && !hasStartNode) {
        setEndNode(node);
      }
    };

    const mouseDownHandler = () => {
      setIsMouseDown(true);
    };

    const mouseOverHandler = () => {
      const hasStartNode = nodeRef.current?.classList.contains("startNode");
      const hasEndNode = nodeRef.current?.classList.contains("endNode");

      if (isMouseDown && !hasStartNode && !hasEndNode) {
        nodeRef.current?.classList.add("walls");
        // setWalls([...walls, `${row}-${col}`]);
      }
    };
    const mouseUpHandler = () => {
      setIsMouseDown(false);
    };

    const node = `${row}-${col}`;
    const isStartNode = startNode === node ? "startNode" : "";
    const isEndNode = endNode === node ? "endNode" : "";
    return (
      <div
        id={node}
        ref={nodeRef}
        onClick={() => handleCurrentNode(node)}
        onMouseDown={mouseDownHandler}
        onMouseOver={mouseOverHandler}
        onMouseUp={mouseUpHandler}
        className={`grid__node ${isStartNode} ${isEndNode}`}
      ></div>
    );
  }
);
