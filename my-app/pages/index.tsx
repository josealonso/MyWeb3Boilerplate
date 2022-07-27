import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import { BigNumber } from 'ethers';
import TokenForm from '../components/TokenForm';
import { MyToken } from '../../backend/typechain-types/MyToken';
import { Contract } from 'ethers';
import { useState } from 'react';
import { contractAddress, contractABI } from '../configs/contract';
import { Connect } from '../components/Connect';
import { useAccount, useProvider, useSigner, erc20ABI } from 'wagmi';
import { Account } from '../components/Account';
import { useIsMounted } from '../hooks/useIsMounted';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MyConnectButton from '../components/MyConnectButton';

// export default function Home(): AppProps {
export default function Home() {
  const NAME = "Pessate";
  const SYMBOL = "PSST";
  const SUPPLY = 230000;
  const CONTRACT_ADDRESS = contractAddress;
  const ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply_", "type": "uint256" }], "name": "createToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferToUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();

  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  // let parentTokenData: TokenData = { name: "", symbol: "", supply: "" };
  const [childData, setChildData] = useState({
    name: "",
    symbol: ""
  });

  const passData = (data2) => {
    setChildData(data2);
    mintTokens(data2);
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
  // const getSignerOrProvider = async () => {
  // const myProvider = provider;
  // const signer = useSigner();  // wagmi hook
  // const web3Provider = new providers.Web3Provider(provider);
  //   return signer;  // provider;
  // }

  async function callContractFunction() {
    try {
      // const signer = await getSignerOrProvider();
      const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer || provider) as MyToken;
      // const tx = tokenContract.functions['withdraw()'];
      // setLoading(true);
      const tx = await tokenContract.createToken(NAME, SYMBOL, SUPPLY);
      await tx.wait();
      // tokenContract.
      // const unlockTime = tokenContract.unlockTime;   // unlockTime ------> It reverts

      setLoading(false);
      alert("Solidity function called successfully !!");
      console.log("El AAA es: ", tx);
    } catch (error) {
      console.log("Error: ", error);
    }
    // <>
    //   <Connect />
    //   <>
    //     {isMounted && isConnected && (
    //       <>
    //         <Account />
    //         <NetworkSwitcher />
    //       </>
    //     )}
    //   </>

  };

  return (
    <Container maxW="container.xl" p={0}>
      {/* <MyHeader /> */}
      <MyConnectButton />
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
