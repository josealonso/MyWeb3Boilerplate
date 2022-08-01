import { Alert, Box, Container, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import create from 'zustand';
import AddTxButton from '../components/AddTxButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import { BigNumber, ethers } from 'ethers';
import TokenForm from '../components/TokenForm';
import { TokensFactory } from '../../backend/typechain-types/TokensFactory';
import { Contract } from 'ethers';
import { ConsumerProps, createContext, useContext, useState } from 'react';
import { contractAddress, contractABI } from '../configs/contract';
import { useProvider, useSigner } from 'wagmi';
import { isMumbaiNetwork, MUMBAI_ID, NetworkSwitcher } from '../components/NetworkSwitcher';
import MyConnectButton from '../components/MyConnectButton';
import SuccessMessage from '../components/SuccessMessage';

// export default function Home(props: ConsumerProps<Boolean>) {
export default function Home() {
  // Tokens Factory Contract Address
  const CONTRACT_ADDRESS = "0x57BDAc09E0f9Ad73F7ffF3288C4Cf5973CF8D19f";  // <--- mumbai TokensFactory 27-July-2022  contractAddress;
  const ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "newContract", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply_", "type": "uint256" }], "name": "createToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  const { data: signer, isError, isLoading } = useSigner();
  const provider2 = useProvider();
  const [areTokensCreated, setAreTokensCreated] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

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
    let [name, symbol, supply] = setTokenParameters(data2);
    console.log("HOME. name, symbol and supply: ", name, symbol, supply);
    createToken(name, symbol, supply);
  }

  function setTokenParameters(data: any): [name: string, symbol: string, supply: number] {
    console.log("MINTING: ", data);
    let name = data.name;
    let symbol = data.symbol;
    let supply = data.supply === undefined ? 100000 : parseInt(data.supply);
    return [name, symbol, supply];
  }

  /*
    You can use a signer always, but you may want to use a provider if you want to read from the chain without the user connecting their wallet in which case you can configure wagmi to fall back to rpc url providers directly
    To show certain parts of the dApp without forcing the user to connect first
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
    const NUM_OF_CONFIRMATIONS = 2;
    let amount = toWei(supply);

    //****** Using the wagmi library to call the contract function ********//
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

    setInterval(() => {
      ;
    }, 2000);

    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_ID);
    const tokenContract = new Contract(CONTRACT_ADDRESS, ABI, signer || provider) as TokensFactory;
    const tx = await tokenContract.createToken(name, symbol, amount, { gasLimit: calculateGasLimit() });
    setLoading(true);
    // setLoading(true);
    const txReceipt = await tx.wait(); // (NUM_OF_CONFIRMATIONS);
    setLoading(false);
    // showWaitingMessage(txReceipt);

    // The token address is the parameter of the emitted event
    console.log(" ------------------- EVENTS: ", txReceipt.events);
    // @ts-ignore
    let tokenAddress = txReceipt.events[0].args.newAddress;
    // @ts-ignore
    console.log("ADDRESS ==== ", txReceipt.events[0].args.newAddress);
    console.log("ADDRESS ==== ", tokenAddress);
    // showWaitingMessage(tx);
    // console.log("The hash for the tx is: ", tx.blockHash);
    setAreTokensCreated(true);
    importToken(tokenAddress, symbol);
    alert(`See your brand new token in https://mumbai.polygonscan.com/token/${tokenAddress}#balances`);
  }

  async function showWaitingMessage(txReceipt: ethers.ContractReceipt) {
    const NUM_OF_CONFIRMATIONS = 2;
    // setLoading(true);
    // await txReceipt.wait(NUM_OF_CONFIRMATIONS);
    setLoading(false);
  }

  function calculateGasLimit(): number {
    const provider = ethers.getDefaultProvider();
    // let maxFeeInWei = (await provider.getFeeData()).maxFeePerGas.mul(gasLimit)
    return 1500000;
  }

  async function importToken(tokenAddress: string, tokenSymbol: string, tokenDecimals = 18) {
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
    <div>
      <Container maxW="container.xl" p={0}>
        {/* <MyHeader /> */}
        <MyConnectButton />
        <NetworkSwitcher />
        <Divider p={5} />

        {isMumbaiNetwork ?
          (
            <div>
              <Flex width="full" align="center" justifyContent="center">
                <TokenForm passData={passData} />
                {/* <Text>
                  Data from the Child component: {childData.name} AND {childData.symbol}
                  AND {childData.supply}
                </Text> */}
                {loading ?
                  (
                    <Box>
                      <Text margin={"3em"}>Transaction in progress</Text>
                      <Spinner borderStyle={"solid"} label='Transaction in progress' color='red.500' />
                    </Box>
                  ) :

                  // {areTokensCreated ?
                  (
                    <Box>
                      <SuccessMessage />
                    </Box>
                  )
                }
              </Flex>
            </div>
          ) : ''
        }
      </Container >
    </div>
  )

}
