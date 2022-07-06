import { Button, Checkbox, FormControl, FormLabel, GridItem, Heading, Input, Select, SimpleGrid, Text, VStack } from "@chakra-ui/react"

const MyForm = () => {
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start" >
                <Heading size="2x1">Token Details</Heading>
                <Text>Select the options you want for your token</Text>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Token Name</FormLabel>
                        <Input placeholder="MyToken" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Token Symbol</FormLabel>
                        <Input placeholder="MTK" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Token Address</FormLabel>
                        <Input placeholder="0x......" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Token Supply</FormLabel>
                        <Input placeholder="2000" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Blockchain</FormLabel>
                        <Select>
                            <option value="eth">Ethereum</option>
                            <option value="poly">Polygon</option>
                            <option value="bsc">Binance Smart Chain</option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Checkbox defaultChecked>Burn feature</Checkbox>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button size="lg" w="full">
                        Mint tokens
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default MyForm;
