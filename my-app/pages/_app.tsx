import { ChakraProvider } from '@chakra-ui/react';

import { AppProps } from 'next/app';
import {
  configureChains,
  createClient,
  WagmiConfig,
  defaultChains
}
  from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { avalancheChain } from '../constants';
// import '../styles/globals.css'

const alchemyId = process.env.ALCHEMY_ID;
const { chains, provider, webSocketProvider } = configureChains(
  defaultChains, [
  alchemyProvider({ alchemyId }),
  // The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
  // publicProvider(),
]
  // If a user has their wallet connected to a chain that is unsupported by your app, the provider will use the first chain listed in the chains array.
  // [chain.hardhat, chain.polygonMumbai, chain.polygon],
  // [chain.localhost, chain.polygonMumbai, avalancheChain, chain.polygon],
  // [
  //   alchemyProvider({ alchemyId: process.env.POLYGON_ALCHEMY_ID }),
  //   jsonRpcProvider({
  //     rpc: chain => ({
  //       http: `http://localhost:8545`,  // chain.rpcUrls.default,
  //     }),
  //   }),
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

// const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
//   <Text>
//     Page created by
//     <Link href='https://josealonso.github.io/About-Me/'> JR </Link>
//   </Text>
// );

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
