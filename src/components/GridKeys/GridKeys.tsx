import React from "react";
import { Flex, Center, Text, Box, Link } from "@chakra-ui/react";

import { ArrowRightIcon, StarIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const GridKeys = () => {
  return (
    <>
      <Flex flexWrap="wrap" justify="center" direction="column" align="center">
        <Flex
          justify="space-between"
          h="full"
          marginTop={5}
          flexWrap="wrap"
          gridGap={4}
        >
          <Center>
            <div className="arrow-right"></div>

            <Text
              paddingLeft={2}
              fontWeight="semibold"
              fontSize={17}
              color={"#374151"}
            >
              Start Node
            </Text>
          </Center>
          <Center>
            <span className="star"> ⭐</span>{" "}
            {/* <StarIcon w={8} h={5} color="#34D399" /> */}
            <Text
              fontWeight="semibold"
              paddingLeft={2}
              fontSize={17}
              color={"#374151"}
            >
              Target Node
            </Text>
          </Center>
          <Center>
            <Box w={6} h={6} border="2px dashed hsla(208, 97%, 55%, 0.349)" />

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
            <Box w={6} h={6} bg="hsl(208, 97%, 15%)" />
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
            <Box w={6} h={6} bg="hsla(148, 97%, 50%, 0.719)" />
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
            <Box w={6} h={6} bg="#1e96fc" />
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
        <Flex justify="center" direction="column" align="center" marginTop={8}>
          <Text
            fontWeight="semibold"
            paddingLeft={2}
            fontSize={16}
            color="gray.600"
            marginTop={-10}
            order={1}
          >
            See how algorithm's make their decisions!
          </Text>
          <Text
            // fontWeight="semibold"
            paddingLeft={2}
            fontSize={14}
            color="gray.500"
            marginTop={-4}
          >
            Designed and Built by{" "}
            <Link
              href="https://shanoysinc.vercel.app"
              isExternal
              fontWeight="semibold"
              color="teal.400"
            >
              Shanoy Sinc
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
