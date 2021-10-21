import React, { useEffect, useState, useRef } from "react";
import { Text, Button, Input, Link } from "@chakra-ui/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Contract, utils } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { ABI } from "../lib";
import Reward from "react-rewards";

// Hack to fix build
const Web3Modal = typeof window !== `undefined` ? require("web3modal") : null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "854b581018fe44a59897b53ee6a19551",
    },
  },
};

const MAINNET_CHAINID = 1;

const web3Modal =
  Web3Modal &&
  new Web3Modal.default({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });

export const PurchaseForm = () => {
  const [web3, setWeb3] = useState(undefined);
  const [amountMinted, setAmountMinted] = useState(0);
  const [input, setInput] = useState("");
  const [address, setAddress] = useState(undefined);
  const [network, setNetwork] = useState(undefined);
  const [txHash, setTxHash] = useState(undefined);

  const selfRewardRef = useRef();
  const friendRewardRef = useRef();

  const provider = web3 && new Web3Provider(web3, "any");
  const signer = provider && provider.getSigner();
  const contract =
    signer &&
    new Contract("0x9f2817015caF6607C1198fB943A8241652EE8906", ABI, signer);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      handleConnect();
    }
  }, []);

  const handleConnect = () => {
    web3Modal.connect().then(setWeb3);
  };

  const updateInfo = () => {
    signer.getChainId().then((res) => setNetwork(res));
    signer.getAddress().then((res) => setAddress(res));
    contract.totalSupply().then((res) => setAmountMinted(res.toString(10)));
  };

  useEffect(() => {
    if (contract) {
      updateInfo();
      web3.on("accountsChanged", updateInfo);
      web3.on("chainChanged", updateInfo);
    }
  }, [web3]);

  const handleMint = () => {
    if (contract) {
      contract.mintForSelf({ value: utils.parseEther("0.01") }).then((tx) => {
        selfRewardRef.current.rewardMe();
        setTxHash(tx.hash);
      });
    }
  };

  const handleInputChange = (event) => setInput(event.target.value);

  const handleMintForFriend = () => {
    if (contract) {
      contract
        .mintForFriend(input, { value: utils.parseEther("0.01") })
        .then((tx) => {
          friendRewardRef.current.rewardMe();
          setTxHash(tx.hash);
        });
    }
  };

  const correctNetwork = network === MAINNET_CHAINID;

  return web3 ? (
    correctNetwork ? (
      <>
        <Text>Waves are 0.01 ETH each - limited to 1 per tx</Text>
        <Text fontWeight="bold">{amountMinted}/1000 minted</Text>
        <Text fontStyle="italic" textAlign="center">
          For your safety, please wait for your first tx to be mined before
          doing further transactions.
        </Text>
        {txHash && (
          <Text textAlign="center" fontWeight="bold">
            Thanks for purchasing!
            <br />
            <Link isExternal href={`https://etherscan.io/tx/${txHash}`}>
              View TX on Etherscan
            </Link>
          </Text>
        )}
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
        {address && <Text textAlign="center">Connected Address {address}</Text>}
      </>
    ) : (
      <>Please make sure you connect to Mainnet</>
    )
  ) : (
    <>
      <Button onClick={handleConnect}>Connect</Button>
    </>
  );
};
