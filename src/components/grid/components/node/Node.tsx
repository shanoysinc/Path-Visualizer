import React, { memo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { NodeAtom } from "../../../../state/pathFinder/atoms";

interface Props {
  row: number;
  col: number;
  // isVisited: boolean;
  // isWall: boolean;
  // startNode: boolean;
  // endNode: boolean;
  // startNode: string | null;
  // endNode: string | null;
  // setStartNode: React.Dispatch<React.SetStateAction<string | null>>;
  // setEndNode: React.Dispatch<React.SetStateAction<string | null>>;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  // isDragging: boolean;
  // setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Node = memo(
  ({
    col,
    row,
    isMouseDown,
    setIsMouseDown,
  }: // endNode,
  // isVisited,
  // isWall,
  // startNode,
  // endNode,
  // setEndNode,
  // setStartNode,
  // startNode,
  // isMouseDown,
  // setIsMouseDown,
  // isDragging,
  // setIsDragging,
  Props) => {
    // const setWalls = useSetRecoilState(wallsAtom);
    // const nodeRef = useRef<HTMLDivElement | null>(null);
    const [currentNode, setCurrentNode] = useRecoilState(
      NodeAtom({ row, col })
    );
    const node = `${row}-${col}`;
    // const isStartNode = startNode === node ? "startNode" : "";
    // const isEndNode = endNode === node ? "endNode" : "";

    const handleCurrentNode = () => {
      if (currentNode.isWall) {
        setCurrentNode((node) => ({ ...node, isWall: false }));
      }

      if (!currentNode.startNode && !currentNode.endNode) {
        setCurrentNode((node) => ({ ...node, isWall: true }));
      }
      return;
    };
    // const handleCurrentNode = () => {
    //   const hasWall = nodeRef.current?.classList.contains("walls");
    //   const hasStartNode = nodeRef.current?.classList.contains("startNode");
    //   const hasEndNode = nodeRef.current?.classList.contains("endNode");

    //   if (hasWall) {
    //     nodeRef.current?.classList.remove("walls");
    //     setWalls((walls) => {
    //       return walls.filter((wall) => wall !== node);
    //     });
    //     return;
    //   }
    //   if (!hasStartNode && !hasEndNode) {
    //     nodeRef.current?.classList.add("walls");
    //     setWalls((walls) => [...walls, node]);
    //   }
    // };
    const mouseDownHandler = () => {
      setIsMouseDown(() => true);

      if (currentNode.startNode) {
      }
    };
    // const mouseDownHandler = () => {
    //   if (node === startNode) {
    //     setIsDragging(() => true);
    //   }
    //   setIsMouseDown(() => true);
    // };

    const mouseUpHandler = () => {
      setIsMouseDown(() => false);
    };

    // const mouseUpHandler = () => {
    //   setIsMouseDown(() => false);
    //   setIsDragging(() => false);
    // };

    const enter = () => {
      if (isMouseDown) {
        if (currentNode.isWall) {
          setCurrentNode((node) => ({ ...node, isWall: false }));
        } else {
          setCurrentNode((node) => ({ ...node, isWall: true }));
        }
      }
    };
    // const enter = () => {
    //   const hasStartNode = nodeRef.current?.classList.contains("startNode");
    //   const hasEndNode = nodeRef.current?.classList.contains("endNode");
    //   const hasWall = nodeRef.current?.classList.contains("walls");

    //   if (!isDragging) {
    //     if (hasWall && isMouseDown) {
    //       nodeRef.current?.classList.remove("walls");
    //       setWalls((walls) => {
    //         return walls.filter((wall) => wall !== node);
    //       });
    //       return;
    //     }
    //     if (isMouseDown && !hasStartNode && !hasEndNode) {
    //       nodeRef.current?.classList.add("walls");
    //       setWalls((walls) => [...walls, node]);
    //       return;
    //     }
    //   }
    //   if (isDragging && isMouseDown) {
    //     setStartNode(() => node);
    //   }
    // };

    const isStartNode = currentNode.startNode ? "startNode" : "";
    const isEndNode = currentNode.endNode ? "endNode" : "";
    const wall = currentNode.isWall ? "wall" : "";
    return (
      <div
        id={node}
        // ref={nodeRef}
        onClick={handleCurrentNode}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseEnter={enter}
        // className={`grid__node`}
        className={`grid__node ${isStartNode} ${isEndNode} ${wall}`}
      ></div>
    );
  }
);
