import { ConnectButton } from '@rainbow-me/rainbowkit';

// export default function AddTxButton() {
const MyConnectButton = () => {
    return (
        <ConnectButton label="Log in web3"
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
    );
};

export default MyConnectButton;
