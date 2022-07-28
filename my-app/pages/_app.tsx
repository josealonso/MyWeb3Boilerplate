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
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { providers } from 'ethers';

// import { avalancheChain } from '../constants';
// import '../styles/globals.css'

export const { chains, provider, webSocketProvider } = configureChains(
  // If a user has their wallet connected to a chain that is unsupported by your app, the provider will use the first chain listed in the chains array.
  [
    chain.polygonMumbai, // chain.hardhat, chain.polygon,
  ],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    jsonRpcProvider({
      rpc: chain => ({
        http: `http://localhost:8545`,  // chain.rpcUrls.default,
      }),
    }),
    // The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
    publicProvider(),
  ],
);

const { wallets } = getDefaultWallets({
  appName: 'Rainbowkit Demo',
  chains,
});

// const demoAppInfo = {
//   appName: 'Rainbowkit Demo',
// };

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: 'Recommended',
    wallets: [
      wallet.walletConnect({ chains }), wallet.metaMask({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  // provider(config) {
  //   return new providers.AlchemyProvider(config.chainId, process.env.ALCHEMY_ID)
  // },
  // webSocketProvider,
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    App created by
    <Link href='https://josealonso.github.io/About-Me/'> JR </Link>
  </Text>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}
          showRecentTransactions={true}
          appInfo={{
            learnMoreUrl: 'https://........',
            disclaimer: Disclaimer,
          }}
          // initialChain={chain.mainnet}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig >
    </ChakraProvider>
  );
}

export default MyApp;
