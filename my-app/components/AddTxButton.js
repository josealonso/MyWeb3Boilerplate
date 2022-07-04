import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default function AddTxButton() {
    const addRecentTransaction = useAddRecentTransaction();
    return (
        <button
            onClick={() => {
                addRecentTransaction({
                    hash: '0xae00c024696973e74b3758b13fb47511a8c5d261f3d56ebdcb844428e1713e36',   // TODO
                    description: '...',
                    confirmations: 30,
                });
            }}
        >
            Add recent transaction
        </button>
    );
};
