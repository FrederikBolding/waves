import React, { useEffect, useState, useRef } from "react";
import { Text, Button, Input } from "@chakra-ui/react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { ABI } from "../lib";
import Reward from "react-rewards";

// @todo Setup

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID", // @todo
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

export const PurchaseForm = () => {
  const [web3, setWeb3] = useState(undefined);
  const [amountMinted, setAmountMinted] = useState(0);
  const [input, setInput] = useState("");

  const selfRewardRef = useRef();
  const friendRewardRef = useRef();

  const provider = web3 && new Web3Provider(web3);
  const signer = provider && provider.getSigner();
  const contract =
    signer &&
    // @todo Use actual contract
    new Contract("0xc3f5e8a98b3d97f19938e4673fd97c7cfd155577", ABI, signer);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      handleConnect();
    }
  }, []);

  const handleConnect = () => {
    web3Modal.connect().then(setWeb3);
  };

  useEffect(() => {
    if (contract) {
      contract.totalSupply().then((res) => setAmountMinted(res.toString(10)));
    }
  }, [web3]);

  const handleMint = () => {
    if (contract) {
      contract.mintForSelf().then(() => selfRewardRef.current.rewardMe());
    }
  };

  const handleInputChange = (event) => setInput(event.target.value);

  const handleMintForFriend = () => {
    if (contract) {
      contract
        .mintForFriend(input)
        .then(() => friendRewardRef.current.rewardMe());
    }
  };

  return web3 ? (
    <>
      <Text>Waves are 0.01 ETH each</Text>
      <Text>{amountMinted}/1000 minted</Text>
      <Reward ref={selfRewardRef} type="confetti">
        <Button onClick={handleMint}>Mint for yourself</Button>
      </Reward>
      <Text fontStyle="italic">or</Text>
      <Input
        placeholder="A friend's address or ENS name"
        value={input}
        onChange={handleInputChange}
      />
      <Reward ref={friendRewardRef} type="confetti">
        <Button onClick={handleMintForFriend}>Mint for a friend</Button>
      </Reward>
    </>
  ) : (
    <>
      <Button onClick={handleConnect}>Connect</Button>
    </>
  );
};
