import { useAccount, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";
import { Text } from "@chakra-ui/react";

const MUMBAI_ID = 80001;
export function NetworkSwitcher() {
    let isMumbaiNetwork = false;
    const { chain } = useNetwork();
    console.log("chain.id", chain?.id);
    if (chain?.id === MUMBAI_ID) {
        console.log("IT is MUMBAI already --------------");
        isMumbaiNetwork = true;
    }



    // const { chains, error, isLoading, pendingChainId, switchNetwork } =
    //     useSwitchNetwork();

    return (
        <div>
            {isMumbaiNetwork ?
                (
                    <Text>Already connected to the Mumbai chain</Text>
                ) :
                (
                    <Text>Not connected</Text>
                )
            }
        </div >
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
