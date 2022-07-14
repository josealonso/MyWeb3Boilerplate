import { useForm } from 'react-hook-form';
import {
    FormErrorMessage, FormLabel, FormControl,
    Box, Flex, Heading, Input, Button,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function TokenForm() {
    // const {
    //     handleSubmit,
    //     register,
    //     formState: { errors, isSubmitting },
    // } = useForm()

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const handleSubmit = event => {
        event.preventDefault();
        alert(`Name: ${name} AND Symbol: ${symbol}`);
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Token Details</Heading>
                </Box>
                <Box p={8} maxW="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <form onSubmit={handleSubmit}>
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
                        <Button width="full" variant="outline" color="teal" borderColor="teal" maxWidth="full" mt={4} type="submit">
                            Generate
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}
