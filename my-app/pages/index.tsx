import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

import TokenForm from '../components/TokenForm';
import { LockInterface, Lock } from '../../backend/typechain-types/Lock';
import { Contract } from 'ethers';
import { useState } from 'react';
import { contractAddress, contractABI } from '../configs/contract';
import { Connect } from '../components/Connect';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { Account } from '../components/Account';
import { useIsMounted } from '../hooks/useIsMounted';
import { NetworkSwitcher } from '../components/NetworkSwitcher';

// export default function Home(): AppProps {
export default function Home() {

  const CONTRACT_ADDRESS = contractAddress;
  const ABI = contractABI;
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
      const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer || provider) as unknown as Lock;
      // const tx = tokenContract.functions['withdraw()'];
      // setLoading(true);
      const tx = await tokenContract.withdraw();
      await tx.wait();

      setLoading(false);
      alert("Solidity function called successfully !!");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Connect />
      <div>
        {isMounted && isConnected && (
          <>
            <Account />
            <NetworkSwitcher />
          </>
        )}
      </div>
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
