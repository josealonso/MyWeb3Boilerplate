import {
    FormErrorMessage, FormLabel, FormControl, Select,
    Box, Flex, Heading, Input, Button, Alert, CircularProgress,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AppProps } from 'next/app';
import { processsTransaction } from '../utils/mockTx';
import { TokenData } from '../interfaces/TokenData';

// References   https://blog.logrocket.com/how-to-create-forms-with-chakra-ui-in-react-apps/
//https://www.kindacode.com/article/passing-data-from-a-child-component-to-the-parent-in-react/

export default function TokenForm(props: AppProps) {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [supply, setSupply] = useState("");
    const [blockchain, setBlockchain] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let tokenData: TokenData = {
        name: name,   // "Ficha",
        symbol: symbol,    //"SYM",
        supply: supply,
    };

    // let str = "HOLA DESDE EL HIJO";
    const formToParent = () => {
        // @ts-ignore
        props.passData(tokenData);
    }

    const myForm = useRef(null);
    // https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks
    const resetFields = () => {
        // @ts-ignore
        myForm.current.reset();
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsLoading(true);
        //try {
        // await processTransaction();
        // } catch (error) {
        // TODO Notify the error here
        setIsLoading(false);
        // setIsGenerated(true);
        console.log(`From the Chid: Name: ${name} AND Symbol: ${symbol} AND Supply: ${supply} Netw: ${blockchain}`);
        tokenData.name = name; tokenData.symbol = symbol; tokenData.supply = supply === undefined ? "25000" : supply;
        resetFields();
    };
    return (
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
                            <option value="goerli">Goerli Testnet</option>
                            {/* <option value="eth">Ethereum</option>
                            <option value="poly">Polygon</option>
                            <option value="bsc">Binance Smart Chain</option> */}
                        </Select>
                    </FormControl>
                    <Button width="full" variant="outline" color="teal"
                        borderColor="teal" maxWidth="full" mt={4} type="submit"
                        onClick={formToParent}
                    >
                        {isLoading ? (
                            <CircularProgress isIndeterminate size="24px" color="teal" />
                        ) : (
                            'Mint tokens'
                        )}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
