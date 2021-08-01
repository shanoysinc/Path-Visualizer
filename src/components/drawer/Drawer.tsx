import React from "react";
import {
  Drawer as LeftSideDrawer,
  DrawerCloseButton,
  DrawerContent,
} from "@chakra-ui/react";
import { SidebarContent } from "../sidebar/components";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const Drawer = ({ isOpen, setIsOpen }: Props) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <LeftSideDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
      >
        <DrawerContent bg="#111827">
          <DrawerCloseButton color="white" />

          <SidebarContent isOpen={isOpen} setIsOpen={setIsOpen} />
        </DrawerContent>
      </LeftSideDrawer>
    </>
  );
};
