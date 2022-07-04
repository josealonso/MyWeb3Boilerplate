import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider, lightTheme, darkTheme
} from '@rainbow-me/rainbowkit';
import { connectorsForWallets, getDefaultWallets, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css'

const { chains, provider } = configureChains(
  // If a user has their wallet connected to a chain that is unsupported by your app, the provider will use the first chain listed in the chains array.
  // [chain.hardhat, chain.polygonMumbai, chain.polygon],
  [chain.polygonMumbai, chain.polygon],
  [
    alchemyProvider({ alchemyId: process.env.POLYGON_ALCHEMY_ID }),
    // The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
    publicProvider(),
  ]
);
const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit demo',
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    //   groupName: 'Other',
    wallets: [
      //     wallet.argent({ chains }),
      //     wallet.trust({ chains }),
      //     wallet.ledger({ chains }),
      wallet.metaMask({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

// function MyApp({ Component, pageProps }: AppPros) {
function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
