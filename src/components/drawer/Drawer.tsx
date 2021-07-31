import React from "react";
import {
  Drawer as LeftSideDrawer,
  DrawerCloseButton,
  DrawerContent,
} from "@chakra-ui/react";
import { SidebarContent } from "../sidebar/components";
import {
  DrawerStateProps,
  useDrawerState,
} from "../../state/UI/useDrawerDisplay";

const drawerSelector = (state: DrawerStateProps) => ({
  isOpen: state.isOpen,
  setIsOpen: state.setIsOpen,
});

export const Drawer = () => {
  const { setIsOpen, isOpen } = useDrawerState(drawerSelector);

  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <LeftSideDrawer
        isOpen={isOpen}
        placement="left"
        onClose={close}
        size="xs"
      >
        <DrawerContent bg="#111827">
          <DrawerCloseButton color="white" />

          <SidebarContent />
        </DrawerContent>
      </LeftSideDrawer>
    </>
  );
};
