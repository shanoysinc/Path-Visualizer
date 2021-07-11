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
import { TargetIcon } from "../../../../assets/TargetIcon";
import { AirplaneIcon } from "../../../../assets/Airplane";

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
      return gridFunc({ isMouseDown: true });
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
    if (isMouseDown) {
      return gridFunc({ isMouseDown: false });
    }
    if (isSelectedNodeStartNode && currentNode.endNode) return;
    if (isSelectedNodeEndNode && currentNode.startNode) return;

    if (isSelectedNodeStartNode) {
      setRoutePos({ sourceIndex: nodeIndex });
    }
    if (isSelectedNodeEndNode) {
      setRoutePos({ destinationIndex: nodeIndex });
    }

    setSelectedNode(null);
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
    if (isSelectedNodeStartNode) {
      setCurrentNode((node) => ({ ...node, startNode: true, isWall: false }));
    }
    if (isSelectedNodeEndNode) {
      setCurrentNode((node) => ({ ...node, endNode: true, isWall: false }));
    }
  };

  const onMouseOut = () => {
    if (isSelectedNodeStartNode) {
      setCurrentNode((node) => ({ ...node, startNode: false, isWall: false }));
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
      {isEndNode && <TargetIcon color="white" height={25} width={30} />}
      {isStartNode && <AirplaneIcon color="yellow" height={30} width={35} />}
    </div>
  );
});
