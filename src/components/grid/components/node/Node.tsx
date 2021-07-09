import React, { useRef, memo, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { wallsAtom } from "../../../../state/pathFinder/atoms";

interface Props {
  row: number;
  col: number;
  startNode: string | null;
  endNode: string | null;
  setStartNode: React.Dispatch<React.SetStateAction<string | null>>;
  setEndNode: React.Dispatch<React.SetStateAction<string | null>>;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  // walls: string[];
  // setWalls: React.Dispatch<React.SetStateAction<string[]>>;
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
  }: Props) => {
    const setWalls = useSetRecoilState(wallsAtom);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const node = `${row}-${col}`;
    const isStartNode = startNode === node ? "startNode" : "";
    const isEndNode = endNode === node ? "endNode" : "";

    const hasStartNode = nodeRef.current?.classList.contains("startNode");
    const hasEndNode = nodeRef.current?.classList.contains("endNode");

    const handleCurrentNode = () => {
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
      setIsMouseDown(() => true);
    };

    const mouseOverHandler = () => {
      const hasWall = nodeRef.current?.classList.contains("walls");

      if (hasWall) {
        nodeRef.current?.classList.remove("walls");
        setWalls((walls) => {
          return walls.filter((wall) => wall !== node);
        });
      }

      if (isMouseDown && !hasStartNode && !hasEndNode) {
        nodeRef.current?.classList.add("walls");
        setWalls((walls) => [...walls, node]);
      }
    };
    const mouseUpHandler = () => {
      setIsMouseDown(() => false);
    };

    // const onDrag = useCallback(() => {
    //   setIsMouseDown(false);
    //   setStartNode(null);
    // }, []);
    // const onDragLeave = useCallback(() => {
    //   setStartNode(node);
    // }, []);

    return (
      <div
        id={node}
        ref={nodeRef}
        onClick={handleCurrentNode}
        onMouseDown={mouseDownHandler}
        onMouseOver={mouseOverHandler}
        onMouseUp={mouseUpHandler}
        // onDragStart={onDrag}
        // onDragLeave={onDragLeave}
        className={`grid__node ${isStartNode} ${isEndNode}`}
      ></div>
    );
  }
);
