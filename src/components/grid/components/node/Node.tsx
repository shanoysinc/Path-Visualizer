import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  NodeAtom,
  RoutePosAtom,
  SelectNodeAtom,
  mouseDownAtom,
} from "../../../../state/pathFinder/atoms";
import {
  GridFuncProps,
  useGridFunc,
} from "../../../../state/pathFinder/useGridFunc";

import { SelectedType } from "../../../../state/types";

interface Props {
  row: number;
  col: number;
}

// const gridFuncSelector = (state: GridFuncProps) => ({
//   isMouseDown: state.isMouseDown,
//   gridFunc: state.updateFunc,
// });

export const Node = ({ col, row }: Props) => {
  const [currentNode, setCurrentNode] = useRecoilState(NodeAtom({ row, col }));
  const [selectedNode, setSelectedNode] = useRecoilState(SelectNodeAtom);
  const [mouseDown, setMouseDown] = useRecoilState(mouseDownAtom);
  const setRoutePos = useSetRecoilState(RoutePosAtom);
  // const { isMouseDown, gridFunc } = useGridFunc(gridFuncSelector);
  // console.log("node", col, row);

  const nodeIndex = `${row}-${col}`;

  const notStartNodeOrEndNode = !currentNode.startNode && !currentNode.endNode;
  const isSelectedNodeStartNode = selectedNode === SelectedType.startNode;
  const isSelectedNodeEndNode = selectedNode === SelectedType.endNode;

  const handleCurrentNode = () => {
    if (notStartNodeOrEndNode) {
      if (currentNode.isWall) {
        setCurrentNode((node) => ({ ...node, isWall: false }));
      } else {
        setCurrentNode((node) => ({ ...node, isWall: true }));
      }
    }
  };

  const mouseDownHandler = () => {
    if (notStartNodeOrEndNode) {
      setMouseDown(true);

      return;
    }
    if (isSelectedNodeStartNode && currentNode.endNode) return;
    if (isSelectedNodeEndNode && currentNode.startNode) return;

    if (currentNode.startNode) {
      setSelectedNode(SelectedType.startNode);
    }
    if (currentNode.endNode) {
      setSelectedNode(SelectedType.endNode);
    }
  };

  const mouseUpHandler = () => {
    if (mouseDown) {
      setMouseDown(false);
      // gridFunc({ isMouseDown: false });
      return;
    }
    if (isSelectedNodeStartNode && currentNode.endNode) return;
    if (isSelectedNodeEndNode && currentNode.startNode) return;

    if (isSelectedNodeStartNode) {
      setRoutePos((pos) => ({ ...pos, sourceIndex: nodeIndex }));
    }
    if (isSelectedNodeEndNode) {
      setRoutePos((pos) => ({ ...pos, destinationIndex: nodeIndex }));
    }

    setSelectedNode(null);
  };

  const onMouseEnter = () => {
    if (mouseDown && notStartNodeOrEndNode) {
      if (currentNode.isWall) {
        setCurrentNode((node) => ({ ...node, isWall: false }));
      }
      if (!currentNode.isWall && notStartNodeOrEndNode) {
        setCurrentNode((node) => ({ ...node, isWall: true }));
      }
      return;
    }
    if (isSelectedNodeStartNode && !currentNode.endNode) {
      setCurrentNode((node) => ({ ...node, startNode: true, isWall: false }));
    }
    if (isSelectedNodeEndNode && !currentNode.startNode) {
      setCurrentNode((node) => ({ ...node, endNode: true, isWall: false }));
    }
  };

  const onMouseOut = () => {
    if (mouseDown) return;
    if (isSelectedNodeStartNode) {
      setCurrentNode((node) => ({
        ...node,
        startNode: false,
        isWall: false,
      }));
    }
    if (isSelectedNodeEndNode) {
      setCurrentNode((node) => ({ ...node, endNode: false, isWall: false }));
    }
  };

  const isStartNode = currentNode.startNode ? "startNode" : "";
  const isEndNode = currentNode.endNode ? "endNode" : "";
  const wall = currentNode.isWall ? "wall" : "";
  return (
    <div
      id={nodeIndex}
      onClick={handleCurrentNode}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={onMouseOut}
      onMouseEnter={onMouseEnter}
      draggable={false}
      className={`grid__node ${isStartNode} ${isEndNode} ${wall}`}
    >
      {isStartNode && <div className="arrow-right"></div>}
      {isEndNode && <div className="star">⭐</div>}
    </div>
  );
};
