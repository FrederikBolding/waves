import React from "react";
import { Box, Link } from "@chakra-ui/react";

export const Footer = () => (
  <Box mt="2">
    <Link isExternal href="https://twitter.com/FrederikBolding">
      Etherscan
    </Link>
    {" | "}
    <Link isExternal href="https://twitter.com/FrederikBolding">
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
