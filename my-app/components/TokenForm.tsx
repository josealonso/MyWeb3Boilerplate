import { useForm } from 'react-hook-form';
import {
    FormErrorMessage, FormLabel, FormControl,
    Box, Flex, Heading, Input, Button,
} from '@chakra-ui/react';

export default function TokenForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Token Details</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form>
                        <FormControl>
                            <FormLabel>Token Name</FormLabel>
                            <Input type="text" placeholder="My Token" />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Token Symbol</FormLabel>
                            <Input type="type" placeholder="MYT" />
                        </FormControl>
                        <Button width="full" mt={4} type="submit">
                            Generate
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}
