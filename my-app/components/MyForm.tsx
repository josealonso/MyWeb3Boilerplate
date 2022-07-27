import { Button, Checkbox, FormControl, FormLabel, GridItem, Heading, Input, Select, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react"
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";


const MyForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const [data, setData] = useState();
    // const onSubmit = (data: SetStateAction<undefined>) => {
    const onSubmit = (data: any) => {
        //console.log(data);
        toast({
            title: "Submitted!",
            status: "success",
            duration: 3000,
            isClosable: true
        });

        setData(data);
    };
    console.log("Form component ---> ", data);
    console.log(errors);

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" >
            <VStack spacing={3} alignItems="flex-start" >
                <Heading size="2x1">Token Details</Heading>
                <Text>Select the options you want for your token</Text>
            </VStack>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <FormControl onSubmit={handleSubmit(onSubmit)}>
                    <GridItem colSpan={1}>

                        <FormLabel>Token Name</FormLabel>
                        <Input type="text" placeholder="MyToken"
                            // {...register(“tokenname”)} 
                        />
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={1}>
                        {/* <FormControl> */}
                        <FormLabel>Token Symbol</FormLabel>
                        <Input placeholder="MTK" />
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={2}>
                        {/* <FormControl> */}
                        <FormLabel>Token Address</FormLabel>
                        <Input placeholder="0x......" />
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={1}>
                        {/* <FormControl> */}
                        <FormLabel>Token Supply</FormLabel>
                        <Input placeholder="2000" />
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={1}>
                        {/* <FormControl> */}
                        <FormLabel>Blockchain</FormLabel>
                        <Select>
                            <option value="eth">Ethereum</option>
                            <option value="poly">Polygon</option>
                            <option value="bsc">Binance Smart Chain</option>
                        </Select>
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Checkbox defaultChecked>Burn feature</Checkbox>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button size="lg" w="full" >
                            Mint tokens
                        </Button>
                    </GridItem>
                </FormControl>
            </SimpleGrid >

            {/* </form> */}

        </VStack >
    );
};

export default MyForm;
