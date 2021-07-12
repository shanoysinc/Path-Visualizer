import React from "react";
import { Flex, Center, Text, Box } from "@chakra-ui/react";
import { ArrowRightIcon, StarIcon } from "@chakra-ui/icons";

const GridKeys = () => {
  return (
    <>
      <Flex align="center" justify="space-evenly" h="full" marginTop={-5}>
        <Center>
          <ArrowRightIcon w={8} h={5} color="#5b21b6" />
          <Text fontWeight="semibold" fontSize={17} color={"#374151"}>
            {" "}
            Start Node
          </Text>
        </Center>
        <Center>
          <StarIcon w={8} h={5} color="yellow.400" />

          <Text fontWeight="semibold" fontSize={17} color={"#374151"}>
            Target Node
          </Text>
        </Center>
        <Center>
          <Box w={6} h={6} bg="#374151" />

          <Text
            fontWeight="semibold"
            paddingLeft={2}
            fontSize={17}
            color={"#374151"}
          >
            Unvisited Node
          </Text>
        </Center>
        <Center>
          <Box w={6} h={6} bg="#111827" />
          <Text
            fontWeight="semibold"
            paddingLeft={2}
            fontSize={17}
            color={"#374151"}
          >
            {" "}
            Wall Node
          </Text>
        </Center>
        <Center>
          <Box w={6} h={6} bg="#5b21b6" />
          <Text
            fontWeight="semibold"
            paddingLeft={2}
            fontSize={17}
            color={"#374151"}
          >
            Shortest-path Node
          </Text>
        </Center>
        <Center>
          <Box w={6} h={6} bg="#14d696" />
          <Text
            fontWeight="semibold"
            paddingLeft={2}
            fontSize={17}
            color={"#374151"}
          >
            Visited Nodes
          </Text>
        </Center>
      </Flex>
      <Center>
        <Text
          fontWeight="semibold"
          paddingLeft={2}
          fontSize={16}
          color="gray.600"
          marginTop={-5}
        >
          Pick an algorithm and visualize it!
        </Text>
      </Center>
    </>
  );
};

export default GridKeys;
