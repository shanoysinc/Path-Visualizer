import React, { useRef, memo, useState, useCallback, useMemo } from "react";
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
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
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
    isDragging,
    setIsDragging,
  }: Props) => {
    const setWalls = useSetRecoilState(wallsAtom);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const node = `${row}-${col}`;
    const isStartNode = startNode === node ? "startNode" : "";
    const isEndNode = endNode === node ? "endNode" : "";

    const handleCurrentNode = () => {
      const hasWall = nodeRef.current?.classList.contains("walls");
      const hasStartNode = nodeRef.current?.classList.contains("startNode");
      const hasEndNode = nodeRef.current?.classList.contains("endNode");

      if (hasWall) {
        nodeRef.current?.classList.remove("walls");
        setWalls((walls) => {
          return walls.filter((wall) => wall !== node);
        });
        return;
      }
      if (!hasStartNode && !hasEndNode) {
        nodeRef.current?.classList.add("walls");
        setWalls((walls) => [...walls, node]);
      }
    };

    const mouseDownHandler = () => {
      if (node === startNode) {
        setIsDragging(() => true);
      }
      setIsMouseDown(() => true);
    };

    const mouseUpHandler = () => {
      setIsMouseDown(() => false);
      setIsDragging(() => false);
    };

    const enter = () => {
      const hasStartNode = nodeRef.current?.classList.contains("startNode");
      const hasEndNode = nodeRef.current?.classList.contains("endNode");
      const hasWall = nodeRef.current?.classList.contains("walls");

      if (!isDragging) {
        if (hasWall && isMouseDown) {
          nodeRef.current?.classList.remove("walls");
          setWalls((walls) => {
            return walls.filter((wall) => wall !== node);
          });
          return;
        }
        if (isMouseDown && !hasStartNode && !hasEndNode) {
          nodeRef.current?.classList.add("walls");
          setWalls((walls) => [...walls, node]);
          return;
        }
      }
      if (isDragging && isMouseDown) {
        setStartNode(() => node);
      }
    };

    return (
      <div
        id={node}
        ref={nodeRef}
        onClick={handleCurrentNode}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseEnter={enter}
        className={`grid__node ${isStartNode} ${isEndNode}`}
      ></div>
    );
  }
);
