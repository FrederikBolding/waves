import React from "react";
import { Box, Link } from "@chakra-ui/react";

export const Footer = () => (
  <Box mt="2">
    <Link isExternal href="https://etherscan.io/address/0x9f2817015caf6607c1198fb943a8241652ee8906">
      Etherscan
    </Link>
    {" | "}
    <Link isExternal href="https://opensea.io/collection/waves-by-frederik">
      OpenSea
    </Link>
    {" | "}
    <Link isExternal href="https://twitter.com/FrederikBolding">
      Twitter
    </Link>
    {" | "}
    <Link isExternal href="https://github.com/FrederikBolding/waves">
      GitHub
    </Link>
  </Box>
);
