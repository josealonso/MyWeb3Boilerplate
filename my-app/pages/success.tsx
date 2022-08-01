import { useRouter } from 'next/router';
import { Box, Container, Divider, Flex, Link, Text } from '@chakra-ui/react';
import MyConnectButton from '../components/MyConnectButton';
import SuccessMessage from '../components/SuccessMessage';
import { userAgent } from 'next/server';

export default function Success(tokenAddress: string, tokenSymbol: string) {
  const { query } = useRouter();
  const router = useRouter();
  console.log("============================ success page ==== ");
  // console.log("The hash for the tx is: ", tx.blockHash);
  // https://goerli.etherscan.io/token/${tokenAddress}#balances
  // let ethereum;
  let tokenAdr = query.tokenAddress as string;
  let tokenSymb = query.tokenSymbol as string;

  importToken(tokenAdr, tokenSymb);

  async function importToken(tokenAddress: string, tokenSymbol: string, tokenDecimals = 18) {
    // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
    if (typeof window !== "undefined") {
      const { ethereum } = window as any;

      const tokenImage = 'http://placekitten.com/200/300';
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
          router.push({
            pathname: '/',
          });
        } else {
          console.log('The token COULD NOT be imported');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Container maxW="container.xl" p={0}>
      <MyConnectButton />
      {/* <NetworkSwitcher /> */}
      <Divider p={5} />
      {/* <Link href="/">
          <a>Back to home</a>
        </Link> */}
      <Box>
        <SuccessMessage />
      </Box>
    </Container >
  )
}
