import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import { BigNumber, ethers } from 'ethers';
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
import { textSpanContainsPosition } from 'typescript';

// export default function Home(): AppProps {
export default function Home() {
  const NAME = "Largas";
  const SYMBOL = "LRG";
  const SUPPLY = 3000;
  const CONTRACT_ADDRESS = "0x57BDAc09E0f9Ad73F7ffF3288C4Cf5973CF8D19f";  // <--- mumbai TokensFactory 27-July-2022  contractAddress;
  const ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "newContract", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply_", "type": "uint256" }], "name": "createToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  const { data: signer, isError, isLoading } = useSigner();
  const provider2 = useProvider();

  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  // let parentTokenData: TokenData = { name: "", symbol: "", supply: "" };
  const [childData, setChildData] = useState({
    name: "",
    symbol: ""
  });

  const toWei = (amountInEthers: number) => ethers.utils.parseEther(amountInEthers.toString());
  const toEthers = (amountInWeis: BigNumber) => ethers.utils.formatEther(amountInWeis);

  const passData = (data2) => {
    setChildData(data2);
    testing();
    mintTokens(data2);
    // alert(`Data from the Child component: ${childData.name} AND ${childData.symbol}`);
  }

  const mintTokens = (data: any) => {
    console.log("MINTING: ", data);
    createToken();
    // testing();
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

  function testing() {
    // let wei = toWei(SUPPLY.toString());
    let wei = ethers.BigNumber.from("3000");
    console.log("CONVERTED: ", wei);
  }

  async function createToken() {
    try {
      // const signer = await getSignerOrProvider();
      console.log("    ======================= N A M E  is: ", childData.name);
      let amount = toWei(SUPPLY);
      const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_ID);
      const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer || provider) as MyToken;
      // setLoading(true);
      const tx = await tokenContract.createToken(NAME, SYMBOL, amount, { gasLimit: 3000000 });
      await tx.wait();

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

  async function importToken() {
    const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
    const tokenSymbol = 'TUT';
    const tokenDecimals = 18;
    const tokenImage = 'http://placekitten.com/200/300';
    const { ethereum } = window as any;

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('The token has been imported');
      } else {
        console.log('The token COULD NOT be imported');
      }
    } catch (error) {
      console.log(error);
    }
  }

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
