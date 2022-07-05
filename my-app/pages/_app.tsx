import { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider, lightTheme, darkTheme
} from '@rainbow-me/rainbowkit';
import {
  connectorsForWallets, getDefaultWallets, wallet,
  DisclaimerComponent,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { avalancheChain } from '../constants';
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';

const { chains, provider } = configureChains(
  // If a user has their wallet connected to a chain that is unsupported by your app, the provider will use the first chain listed in the chains array.
  // [chain.hardhat, chain.polygonMumbai, chain.polygon],
  [avalancheChain, chain.polygonMumbai, chain.polygon],
  [
    alchemyProvider({ alchemyId: process.env.POLYGON_ALCHEMY_ID }),
    jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }),
    // The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
    publicProvider(),
  ]
);
const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit demo',
  chains,
});
const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: 'Recommended',
    wallets: [
      wallet.walletConnect({ chains }), wallet.metaMask({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      wallet.coinbase({ chains }), wallet.rainbow({ chains }),
    ],
  },

]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    Page created by
    <Link href='https://josealonso.github.io/About-Me/'> JR </Link>
  </Text>
);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <RainbowKitProvider chains={chains}
          showRecentTransactions={true}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
          appInfo={{
            appName: 'Rainbowkit Tutorial',
            learnMoreUrl: 'https://josealonso.github.io/About-Me/',
            disclaimer: Disclaimer,
          }}
          coolMode
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
