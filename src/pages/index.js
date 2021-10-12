import React from "react";
import { Box, Text, VStack, Heading, Container } from "@chakra-ui/react";
import { Waves, Footer, FAQ, PurchaseForm } from "../components";
import { Color } from "../util/color";

const IndexPage = () => {
  return (
    <Container>
      <Box p="4">
        <VStack>
          <Heading as="h1" size="2xl">
            Waves
          </Heading>
          <Text fontStyle="italic">
            A soothing, colorful & wavy NFT randomly generated on-chain!
          </Text>
          <Box p="4">
            <Waves
              waveCount={5}
              width={800}
              height={400}
              pulseWidth={84}
              amplitude={25}
              slope={2}
              offset={0}
              startColor={new Color(109, 92, 35)}
              endColor={new Color(115, 76, 73)}
            />
          </Box>
          <PurchaseForm />
          <FAQ />
          <Footer />
        </VStack>
      </Box>
    </Container>
  );
};

export default IndexPage;
