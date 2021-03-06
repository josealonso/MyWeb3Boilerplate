import { Box, Heading } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// export default function AddTxButton() {
export default function MyConnectButton() {
    return (
        <Box display={"flex"} padding="1.5rem">
            <ConnectButton label="Connect wallet"
                accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                }}
                chainStatus={{
                    smallScreen: "icon",
                    largeScreen: "full",
                }}
                showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                }} />
            <Heading paddingLeft={"7%"}>Have your own token on the Goerli blockchain</Heading>
        </Box>

    );
};

// export default function MyConnectButton() {
//     return (
//         <ConnectButton.Custom>
//             {({
//                 account,
//                 chain,
//                 openAccountModal,
//                 openChainModal,
//                 openConnectModal,
//                 mounted,
//             }) => {
//                 return (
//                     <div
//                         {...(!mounted && {
//                             'aria-hidden': true,
//                             'style': {
//                                 opacity: 0,
//                                 pointerEvents: 'none',
//                                 userSelect: 'none',
//                             },
//                         })}
//                     >
//                         {(() => {
//                             if (!mounted || !account || !chain) {
//                                 return (
//                                     <button onClick={openConnectModal} type="button">
//                                         Connect Wallet
//                                     </button>
//                                 );
//                             }
//                             if (chain.unsupported) {
//                                 return (
//                                     <button onClick={openChainModal} type="button">
//                                         Wrong network
//                                     </button>
//                                 );
//                             }
//                             return (
//                                 <div style={{ display: 'flex', gap: 12 }}>
//                                     <button
//                                         onClick={openChainModal}
//                                         style={{ display: 'flex', alignItems: 'center' }}
//                                         type="button"
//                                     >
//                                         {chain.hasIcon && (
//                                             <div
//                                                 style={{
//                                                     background: chain.iconBackground,
//                                                     width: 12,
//                                                     height: 12,
//                                                     borderRadius: 999,
//                                                     overflow: 'hidden',
//                                                     marginRight: 4,
//                                                 }}
//                                             >
//                                                 {chain.iconUrl && (
//                                                     <img
//                                                         alt={chain.name ?? 'Chain icon'}
//                                                         src={chain.iconUrl}
//                                                         style={{ width: 12, height: 12 }}
//                                                     />
//                                                 )}
//                                             </div>
//                                         )}
//                                         {chain.name}
//                                     </button>
//                                     <button onClick={openAccountModal} type="button">
//                                         {account.displayName}
//                                         {account.displayBalance
//                                             ? ` (${account.displayBalance})`
//                                             : ''}
//                                     </button>
//                                 </div>
//                             );
//                         })()}
//                     </div>
//                 );
//             }}
//         </ConnectButton.Custom>
//     );
// };
