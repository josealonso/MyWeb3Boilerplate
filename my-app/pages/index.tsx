import { Box, Button, Container, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import create from 'zustand';
import AddTxButton from '../components/AddTxButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import { BigNumber, ethers } from 'ethers';
import TokenForm from '../components/TokenForm';
import { MyToken } from '../../backend/typechain-types/MyToken';
import { Contract } from 'ethers';
import { ConsumerProps, createContext, useContext, useState } from 'react';
import { contractAddress, contractABI } from '../configs/contract';
import { chain, useAccount, useContractWrite, useNetwork, useProvider, useSigner } from 'wagmi';
import { Account } from '../components/Account';
import { useIsMounted } from '../hooks/useIsMounted';
import { isMumbaiNetwork, MUMBAI_ID, NetworkSwitcher } from '../components/NetworkSwitcher';
import MyConnectButton from '../components/MyConnectButton';
import SuccessMessage from '../components/SuccessMessage';

// export default function Home(props: ConsumerProps<Boolean>) {
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
  const [areTokensCreated, setAreTokensCreated] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // let parentTokenData: TokenData = { name: "", symbol: "", supply: "" };
  const [childData, setChildData] = useState({
    name: "",
    symbol: "",
    supply: ""
  });

  console.log("Inside HOME. ChainContext: ", isMumbaiNetwork);

  const toWei = (amountInEthers: number) => ethers.utils.parseEther(amountInEthers.toString());
  const toEthers = (amountInWeis: BigNumber) => ethers.utils.formatEther(amountInWeis);

  const passData = (data2: any) => {
    setChildData(data2);
    // make sure the wallet is connected to the Mumbai network
    let { name, symbol, supply } = setTokenParameters(data2);
    createToken(name, symbol, supply);
  }

  function setTokenParameters(data: any): { name: string, symbol: string, supply: number } {
    console.log("MINTING: ", data);
    let name = childData.name;
    let symbol = childData.symbol;
    let supply = childData.supply === "" ? 100000 : parseInt(childData.supply);
    return { name: name, symbol: symbol, supply: supply };
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
    console.log("CONVERTED: ");
  }

  async function createToken(name: string, symbol: string, supply: number) {
    let amount = toWei(supply);

    // const contractWrite = useContractWrite({
    //   addressOrName: CONTRACT_ADDRESS,
    //   contractInterface: ABI,
    //   chainId: 80001,
    //   functionName: 'createToken',
    //   args: [name, symbol, amount],
    // overrides: {
    //   gasLimit: calculateGasLimit(),
    // },
    //   onSuccess(data) {
    //     console.log('Success calling createToken ', data)
    //   },
    //   onError(error) {
    //     console.log(' ========= Error calling createToken ', error)
    //   },
    // })

    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_ID);
    const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer || provider) as MyToken;
    const tx = await tokenContract.createToken(name, symbol, amount, { gasLimit: calculateGasLimit() });
    showWaitingMessage(tx);
    // let st= ""; st= tx.blockHash;
    // tx.data;
    console.log("The hash for the tx is: ", tx.blockHash);
    setAreTokensCreated(true);
    // importToken(tokenAddress);
    console.log("El AAA es: ", tx);
  }

  async function showWaitingMessage(tx: any) {
    const NUM_OF_CONFIRMATIONS = 2;
    setLoading(true);
    await tx.wait(NUM_OF_CONFIRMATIONS);
    setLoading(false);
  }

  function calculateGasLimit(): number {
    const provider = ethers.getDefaultProvider();
    // let maxFeeInWei = (await provider.getFeeData()).maxFeePerGas.mul(gasLimit)
    return 3000000;
  }

  async function importToken(tokenAddress: string, tokenSymbol: string, tokenDecimals = 18) {
    // const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
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
      <NetworkSwitcher />
      <Divider p={5} />
      <SuccessMessage />
      <>
        {/* <Button>Botón</Button> */}
      </>

      {isMumbaiNetwork ?
        (
          < Flex width="full" align="center" justifyContent="center">
            {/* <Flex h="100vh" py={10}> */}
            <TokenForm passData={passData} />
            <Text>
              Data from the Child component: {childData.name} AND {childData.symbol}
              AND {childData.supply}
            </Text>
            {loading ?
              (
                <Box>
                  <Text>Transaction in progress</Text>
                  <Spinner label='Transaction in progress' color='red.500' />
                </Box>
              ) : ''
            }
            {
              areTokensCreated && !loading ?
                (
                  <SuccessMessage />
                ) : ''
            }
          </Flex>
        ) : ''
      }
    </Container >
  )

}
