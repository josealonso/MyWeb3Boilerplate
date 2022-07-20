import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
  DisclaimerComponent,
  lightTheme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createClient,
  WagmiConfig,
  chain
}
  from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// import { avalancheChain } from '../constants';
// import '../styles/globals.css'

const alchemyId = process.env.ALCHEMY_ID;
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygon, chain.polygonMumbai
  ],
  [
    alchemyProvider({ alchemyId }),
    publicProvider(),
  ],
  // The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
  // publicProvider(),

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

const { wallets } = getDefaultWallets({
  appName: 'Rainbowkit Demo',
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    Page created by
    <Link href='https://josealonso.github.io/About-Me/'> JR </Link>
  </Text>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}
        showRecentTransactions={true}
        // initialChain={chain.mainnet}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
