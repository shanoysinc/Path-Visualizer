import React, { memo } from "react";
import { useRecoilState } from "recoil";
import { NodeAtom } from "../../../../state/pathFinder/atoms";

import {
  useGridFunc,
  GridFuncProps,
} from "../../../../state/pathFinder/useGridFunc";
import {
  useSelectedNode,
  useSelectedNodeProps,
  SelectedType,
} from "../../../../state/pathFinder/useSelectedNode";
import {
  useRoutePos,
  useRoutePosProps,
} from "../../../../state/pathFinder/useRoutePos";

interface Props {
  row: number;
  col: number;
}

const gridFuncSelector = (state: GridFuncProps) => ({
  isMouseDown: state.isMouseDown,
  gridFunc: state.updateFunc,
});
const selectedNodeSelector = (state: useSelectedNodeProps) => ({
  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
});
const routePosSelector = (state: useRoutePosProps) => ({
  setRoutePos: state.setRoutePos,
});

export const Node = memo(({ col, row }: Props) => {
  const [currentNode, setCurrentNode] = useRecoilState(NodeAtom({ row, col }));

  const { isMouseDown, gridFunc } = useGridFunc(gridFuncSelector);
  const { setRoutePos } = useRoutePos(routePosSelector);
  const { selectedNode, setSelectedNode } =
    useSelectedNode(selectedNodeSelector);
  const nodeIndex = `${row}-${col}`;

  const notStartNodeOrEndNode = !currentNode.startNode && !currentNode.endNode;

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
      gridFunc({ isMouseDown: true });
    }
    if (currentNode.startNode) {
      setSelectedNode(SelectedType.startNode);
    }
    if (currentNode.endNode) {
      setSelectedNode(SelectedType.endNode);
    }
  };

  const mouseUpHandler = () => {
    if (isMouseDown) {
      gridFunc({ isMouseDown: false });
    }
    if (selectedNode) {
      setSelectedNode(null);
    }
    if (selectedNode === SelectedType.startNode) {
      setRoutePos({ sourceIndex: nodeIndex });
    }
    if (selectedNode === SelectedType.endNode) {
      setRoutePos({ destinationIndex: nodeIndex });
    }
  };

  const onMouseEnter = () => {
    if (isMouseDown && notStartNodeOrEndNode) {
      if (currentNode.isWall) {
        setCurrentNode((node) => ({ ...node, isWall: false }));
      }
      if (!currentNode.isWall && notStartNodeOrEndNode) {
        setCurrentNode((node) => ({ ...node, isWall: true }));
      }
      return;
    }
    if (selectedNode === SelectedType.startNode) {
      setCurrentNode((node) => ({ ...node, startNode: true, isWall: false }));
    }
    if (selectedNode === SelectedType.endNode) {
      setCurrentNode((node) => ({ ...node, endNode: true, isWall: false }));
    }
  };

  const onMouseOut = () => {
    if (selectedNode === SelectedType.startNode) {
      setCurrentNode((node) => ({ ...node, startNode: false, isWall: false }));
    }
    if (selectedNode === SelectedType.endNode) {
      setCurrentNode((node) => ({ ...node, endNode: false, isWall: false }));
    }
  };

  const isStartNode = currentNode.startNode ? "startNode" : "";
  const isEndNode = currentNode.endNode ? "endNode" : "";
  const wall = currentNode.isWall ? "wall" : "";
  // const isVisited = currentNode.isVisited ? "visitedNode" : "";
  return (
    <div
      id={nodeIndex}
      onClick={handleCurrentNode}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseOut={onMouseOut}
      onMouseEnter={onMouseEnter}
      className={`grid__node ${isStartNode} ${isEndNode} ${wall}`}
    ></div>
  );
});
