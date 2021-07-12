import React from "react";
import { Flex, Button, Select, Heading, Container } from "@chakra-ui/react";

export const SidebarContent = () => {
  return (
    <>
      {/* <Heading as="h3" size="lg">
        DevPath - Algorithm Visualizer
      </Heading> */}
      {/* <Heading as="h4" size="md">
        DevPath - Algorithm Visualizer
      </Heading> */}
      <Flex
        direction="column"
        justify="space-between"
        height="full"
        align="center"
        pt="4"
        pb="4"
        p="5"
      >
        <div>
          <Heading as="h3" size="lg" color="#FCD34D">
            DevPath - Algorithm Visualizer
          </Heading>
          <Select
            placeholder="Dijkstra's Algorithm"
            mt="8"
            variant="filled"
            bg="#6D28D9"
            color="white"
          >
            {/* <option value="option1">Dijkstra's Alogrithm</option> */}
          </Select>
          <Select
            placeholder="Speed: Fast"
            mt="8"
            variant="filled"
            bg="#6D28D9"
            color="white"
            w="fit-content"
          >
            <option value="Fast">Fast</option>
            <option value="Average">Average</option>
            <option value="Slow">Slow</option>
          </Select>

          <Flex
            // justify="space-between"
            gridGap={4}
            pt="10"
            pb="4"
            flexWrap="wrap"
            // align="flex-start"
          >
            <Button
              size="sm"
              color="white"
              variant="outline"
              fontWeight="normal"
              _hover={{ bg: "#6D28D9", borderColor: "#6D28D9" }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              color="white"
              variant="outline"
              colorScheme="pink"
              fontWeight="normal"
              _hover={{ bg: "#6D28D9", borderColor: "#6D28D9" }}
            >
              Clear Walls
            </Button>
            <Button
              size="sm"
              color="white"
              variant="outline"
              colorScheme="pink"
              fontWeight="normal"
              _hover={{ bg: "#6D28D9", borderColor: "#6D28D9" }}
            >
              Clear path
            </Button>
            <Button
              size="sm"
              color="white"
              variant="outline"
              colorScheme="pink"
              fontWeight="normal"
              _hover={{ bg: "#6D28D9", borderColor: "#6D28D9" }}
            >
              Clear Board
            </Button>
          </Flex>
        </div>
        <Container>
          <Button size="lg" w="full" colorScheme="pink">
            Visualize
          </Button>
        </Container>
      </Flex>
    </>
  );
};
