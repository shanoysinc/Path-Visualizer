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

  return (
    <>
      <LeftSideDrawer
        isOpen={isOpen}
        placement="left"
        onClose={() => setIsOpen(false)}
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
