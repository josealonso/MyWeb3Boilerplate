import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyConnectButton from '../components/MyConnectButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

import styles from '../styles/Home.module.css'
import TokenForm from '../components/TokenForm';
import { LockInterface } from '../../backend/typechain-types/Lock';
import { Contract, providers, Signer } from 'ethers';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { TokenData } from '../interfaces/TokenData';
import { provider } from './_app';
// export default function Home(): AppProps {
export default function Home() {

  const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_unlockTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "when",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unlockTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const CONTRACT_ADDRESS = "0x";
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  // let parentTokenData: TokenData = { name: "", symbol: "", supply: "" };
  const [childData, setChildData] = useState({
    name: "",
    symbol: ""
  });

  const passData = (data) => {
    setChildData(data);
    mintTokens(data);
    // alert(`Data from the Child component: ${childData.name} AND ${childData.symbol}`);
  }

  const mintTokens = (data: any) => {
    console.log("MINTING: ", data);
    callContractFunction();
    // alert("Tokens have been minted !!",);
    // TODO --> check if the supply is "" and convert it to a number
    // return (  // Useless
    //   <Box>
    //     Tokens have been minted !!
    //   </Box>
    // )
  }

  /*
    You can use a signer always, but you may want to use a provider if you want to read from the chain without the user connecting their wallet in which case you can configure wagmi to fall back to rpc url providers directly
    To show certain parts of the dApp without forcinig the user to connect first
  */
  const getSignerOrProvider = async () => {
    const myProvider = provider;
    // const signer = useSigner();  // wagmi hook
    // const web3Provider = new providers.Web3Provider(provider);
    return provider;  // signer;
  }

  const callContractFunction = async () => {
    try {
      const signer = await getSignerOrProvider();
      const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer) as unknown as LockInterface;
      const tx = tokenContract.functions['withdraw()'];
      setLoading(true);
      await tx.wait();
      setLoading(false);
      alert("Solidity function called successfully !!");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <MyConnectButton />
      <MyHeader />
      <Divider p={5} />
      <Flex width="full" align="center" justifyContent="center">
        {/* <Flex h="100vh" py={10}> */}
        <TokenForm passData={passData} />
        <Text>
          Data from the Child component: {childData.name} AND {childData.symbol}
          AND {childData.supply}
        </Text>
      </Flex>
    </Container>
  )
}
