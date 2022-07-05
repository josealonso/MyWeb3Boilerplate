import { Chain } from "@rainbow-me/rainbowkit";

// export const avalancheChain: Chain = {
export const avalancheChain = {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    iconUrl: 'https://example.com/icon.svg',
    iconBackground: '#fff',
    nativeCurrency: {
        decimals: 18,
        name: 'Avalanche',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
        default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
        etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    testnet: false,
};

