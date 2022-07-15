import {
    FormErrorMessage, FormLabel, FormControl, Select,
    Box, Flex, Heading, Input, Button, Alert, CircularProgress,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AppProps } from 'next/app';
import { processsTransaction } from '../utils/mockTx';

export interface TokenData {
    name: string;
    symbol: string;
    supply: string;
}

// Reference: https://blog.logrocket.com/how-to-create-forms-with-chakra-ui-in-react-apps/
export default function TokenForm({ formToParent }) {

    let tokenData: TokenData;
    const myForm = useRef(null);
    // https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks
    const resetFields = () => {
        myForm.current.reset();
    }

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [supply, setSupply] = useState("");
    const [blockchain, setBlockchain] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        //try {
        await processsTransaction();
        // } catch (error) {
        // TODO Notify the error here
        setIsLoading(false);
        setIsGenerated(true);
        alert(`Name: ${name} AND Symbol: ${symbol} AND Supply: ${supply} Netw: ${blockchain}`);
        tokenData.name = name; tokenData.symbol = symbol; tokenData.supply = supply === undefined ? "25000" : supply;
        resetFields();
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Token Details</Heading>
                </Box>
                <Box p={8} maxW="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <form ref={myForm} onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Token Name</FormLabel>
                            <Input type="text" placeholder="My Token"
                                size="lg"
                                onChange={event => setName(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
                            <FormLabel>Token Symbol</FormLabel>
                            <Input type="type" placeholder="MYT"
                                size="lg"
                                onChange={event => setSymbol(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Token Supply</FormLabel>
                            <Input type="text" placeholder="2000"
                                size="lg"
                                onChange={event => setSupply(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Blockchain</FormLabel>
                            <Select size="lg"
                                onChange={event => setBlockchain(event.currentTarget.value)} >
                                <option value="eth">Ethereum</option>
                                <option value="poly">Polygon</option>
                                <option value="bsc">Binance Smart Chain</option>
                            </Select>
                        </FormControl>
                        <Button width="full" variant="outline" color="teal" borderColor="teal" maxWidth="full" mt={4} type="submit">
                            {isLoading ? (
                                <CircularProgress isIndeterminate size="24px" color="teal" />
                            ) : (
                                'Mint tokens'
                            )}
                        </Button>
                        <Button onClick={(data) => formToParent()}>
                            Prueba
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}
