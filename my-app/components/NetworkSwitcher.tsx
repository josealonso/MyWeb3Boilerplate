import { useAccount, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";
import { Text, Alert, AlertIcon, AlertTitle, AlertDescription, Box } from "@chakra-ui/react";
import create from 'zustand';
import { createContext, ProviderProps, useState } from "react";

const ChainContext = createContext(false);

export let isMumbaiNetwork = false;
export const MUMBAI_ID = 80001;
// Make sure the wallet is connected to the Mumbai network.
// If the wallet does not have that network, the wagmi library add it.
export function NetworkSwitcher() { // (props: ProviderProps<Boolean>) {

    const { chain } = useNetwork();
    // let [isMumbaiNetwork, setIsMumbaiNetwork] = useState(false);
    console.log("chain.id", chain?.id);
    if (chain?.id === MUMBAI_ID) {
        console.log("IT is MUMBAI already --------------");
        // setIsMumbaiNetwork(chain?.id === MUMBAI_ID); // Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
        isMumbaiNetwork = true;
    }


    // function chainStatus() {
    //     return props.value;
    // }
    // const { chains, error, isLoading, pendingChainId, switchNetwork } =
    //     useSwitchNetwork();

    return (
        <Box padding="0.5rem">
            {isMumbaiNetwork ?
                (
                    <>
                        <Alert status='success'>
                            <AlertIcon />
                            Connected to the Mumbai chain. You can continue.
                        </Alert>
                    </>
                ) :
                (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Not connected to the Mumbai chain!</AlertTitle>
                        <AlertDescription>Press on the above button to connect to the Mumbai chain.</AlertDescription>
                    </Alert>

                )
            }
        </Box >
    )
}
    //     < div >
    //     Connected to { chain?.name ?? chain?.id }
    // { chain?.unsupported && ' (unsupported)' }
    //         </div >

    //     {
    //     switchNetwork && (
    //         <div>
    //             {chains.map((x) =>
    //                 x.id === chain?.id ? null : (
    //                     <button key={x.id} onClick={() => switchNetwork(x.id)}>
    //                         {x.name}
    //                         {isLoading && x.id === pendingChainId && ' (switching)'}
    //                     </button>
    //                 ),
    //             )}
    //         </div>
    //     )
    // }

    // <div>{error && error.message}</div>

    // )
// }
