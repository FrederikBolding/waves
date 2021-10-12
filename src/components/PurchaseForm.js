import React from "react";
import { Text, Button, Input } from "@chakra-ui/react";

// @todo Setup

export const PurchaseForm = () => (
  <>
    <Text>Waves are 0.01 ETH each</Text>
    <Text>0/1000 minted</Text>
    <Button>Mint for yourself</Button>
    <Text fontStyle="italic">or</Text>
    <Input placeholder="A friend's address or ENS name" />
    <Button>Mint for a friend</Button>
  </>
);
