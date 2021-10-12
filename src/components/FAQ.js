import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

export const FAQ = () => (
  <Box mt="2">
    <Heading>FAQ</Heading>
    <Heading as="h3" size="md" mt="4">
      Why is it a big deal that the NFT is generated on-chain?
    </Heading>
    <Text>
      All the code needed to draw the NFT is included in the contract itself.
      This means that the NFT will be around as long as the Ethereum network still operates.
    </Text>
    <Heading as="h3" size="md" mt="4">
      Where is the roadmap?
    </Heading>
    <Text>
      There is nothing more planned at the moment. If that changes I'll be sure
      to announce it on Twitter. But the NFT is meant as a cool piece of art for
      your wallet and nothing more.
    </Text>
    <Heading as="h3" size="md" mt="4">
      What was the inspiration for the project?
    </Heading>
    <Text>
      The project was inspired by{" "}
      <Link isExternal href="https://cranes.supply/">
        Cranes
      </Link>{" "}
      and{" "}
      <Link
        isExternal
        href="https://www.uplabs.com/posts/svg-gradient-wave-generator"
      >
        this sweet wave generator.
      </Link>
    </Text>
    <Heading as="h3" size="md" mt="4">
      What about copyright?
    </Heading>
    <Text mb="4">
      The project code, assets, and the NFTs themselves are all Public Domain.
      Do whatever you want with them, only your imagination is the limit!
    </Text>
  </Box>
);
