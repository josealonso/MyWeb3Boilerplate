import { Button, VStack } from '@chakra-ui/react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';


function AddTxButton() {
    // const AddTxButton = () => {    // Also valid
    const addRecentTransaction = useAddRecentTransaction();

    return (
        <Button
            onClick={() => {
                addRecentTransaction({
                    hash: '0xae00c024696973e74b3758b13fb47511a8c5d261f3d56ebdcb844428e1713e36',   // TODO
                    description: 'Última transacción',
                    confirmations: 30,
                });
            }}
        >    Add recent transaction
        </Button>
    );
};

export default AddTxButton;
